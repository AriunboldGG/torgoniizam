"use client"

import { createContext, useContext, useState, useEffect } from "react"

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [walletBalance, setWalletBalance] = useState(840000) // Default balance
  const [isLoading, setIsLoading] = useState(false)

  // Load wallet balance from localStorage or API
  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem("walletBalance")
      console.log("WalletContext: Loading balance from localStorage:", savedBalance)
      if (savedBalance) {
        setWalletBalance(parseInt(savedBalance))
      } else {
        // If no saved balance, use default and save it
        console.log("WalletContext: No saved balance, using default 840000")
        setWalletBalance(840000)
        localStorage.setItem("walletBalance", "840000")
      }
    } catch (error) {
      console.error("Error loading wallet balance:", error)
      // Use default balance if localStorage fails
      setWalletBalance(840000)
    }
  }, [])

  // Update wallet balance
  const updateBalance = (newBalance) => {
    setWalletBalance(newBalance)
    localStorage.setItem("walletBalance", newBalance.toString())
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

  // Reset wallet balance to default (for testing/development)
  const resetToDefault = () => {
    updateBalance(840000)
    return { success: true, newBalance: 840000 }
  }

  const value = {
    walletBalance,
    updateBalance,
    deductAmount,
    addAmount,
    resetToDefault,
    isLoading
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
