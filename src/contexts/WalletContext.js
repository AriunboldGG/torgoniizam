"use client"

import { createContext, useContext, useState } from "react"
import { fetchWithAuth } from "@/lib/api"

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(0)
  const [heldBalance, setHeldBalance] = useState(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  // Clean up old cache key if present
  if (typeof window !== "undefined") {
    localStorage.removeItem("wallet_balance_cache")
  }

  const fetchBalance = async () => {
    const accessToken = localStorage.getItem("access_token")
    if (!accessToken) return

    setIsLoadingBalance(true)
    try {
      const response = await fetchWithAuth("/api/wallet/balance")
      if (response.status === 401 || response.status === 403) {
        // Token expired/invalid — fetchWithAuth already cleared tokens
        return
      }
      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        console.error("Failed to fetch balance:", response.status, err?.detail)
        return
      }
      const data = await response.json()
      const payload = data?.data ?? data
      setWalletBalance(parseFloat(payload?.available ?? 0))
      setHeldBalance(parseFloat(payload?.held ?? 0))
    } catch (error) {
      console.error("Error fetching wallet balance:", error)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const updateBalance = (newBalance) => setWalletBalance(newBalance)

  const deductAmount = (amount) => {
    const newBalance = walletBalance - amount
    if (newBalance >= 0) {
      updateBalance(newBalance)
      return { success: true, newBalance }
    }
    return { success: false, error: "Insufficient balance" }
  }

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
    refetchBalance: fetchBalance,
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
