"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { fetchWithAuth } from "@/lib/api"

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(0)
  const [heldBalance, setHeldBalance] = useState(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(true)

  const fetchBalance = async () => {
    const accessToken = localStorage.getItem("access_token")
    if (!accessToken) {
      setIsLoadingBalance(false)
      return
    }
    try {
      // fetchWithAuth auto-refreshes the token on 401
      const response = await fetchWithAuth("/api/wallet/balance")
      if (!response.ok) throw new Error("Failed to fetch balance")
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
