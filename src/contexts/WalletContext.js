"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { fetchWithAuth } from "@/lib/api"

const WalletContext = createContext()

const BALANCE_CACHE_KEY = "wallet_balance_cache"
const BALANCE_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function WalletProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(0)
  const [heldBalance, setHeldBalance] = useState(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(true)

  const fetchBalance = async (skipCache = false) => {
    const accessToken = localStorage.getItem("access_token")
    if (!accessToken) {
      setIsLoadingBalance(false)
      return
    }
    if (!skipCache) {
      try {
        const cached = sessionStorage.getItem(BALANCE_CACHE_KEY)
        if (cached) {
          const { available, held, ts } = JSON.parse(cached)
          if (Date.now() - ts < BALANCE_CACHE_TTL) {
            setWalletBalance(available)
            setHeldBalance(held)
            setIsLoadingBalance(false)
            return
          }
        }
      } catch {}
    }
    try {
      // fetchWithAuth auto-refreshes the token on 401
      const response = await fetchWithAuth("/api/wallet/balance")
      if (!response.ok) throw new Error("Failed to fetch balance")
      const data = await response.json()
      const payload = data?.data ?? data
      const available = parseFloat(payload?.available ?? 0)
      const held = parseFloat(payload?.held ?? 0)
      setWalletBalance(available)
      setHeldBalance(held)
      sessionStorage.setItem(BALANCE_CACHE_KEY, JSON.stringify({ available, held, ts: Date.now() }))
    } catch (error) {
      console.error("Error fetching wallet balance:", error)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  // Update wallet balance
  const updateBalance = (newBalance) => {
    setWalletBalance(newBalance)
  }

  // Deduct amount from wallet (for pledges, bids, etc.)
  const deductAmount = (amount) => {
    const newBalance = walletBalance - amount
    if (newBalance >= 0) {
      updateBalance(newBalance)
      return { success: true, newBalance }
    } else {
      return { success: false, error: "Insufficient balance" }
    }
  }

  // Add amount to wallet (for refunds, deposits, etc.)
  const addAmount = (amount) => {
    const newBalance = walletBalance + amount
    updateBalance(newBalance)
    return { success: true, newBalance }
  }

  const value = {
    walletBalance,
    heldBalance,
    isLoadingBalance,
    updateBalance,
    deductAmount,
    addAmount,
    refetchBalance: () => fetchBalance(true),
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
