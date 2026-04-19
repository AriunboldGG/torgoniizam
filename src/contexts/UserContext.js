"use client"

import { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext()

const fetchUserInfo = async (accessToken) => {
  const response = await fetch(`/api/auth/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error("Failed to fetch user info")
  const json = await response.json()
  // API wraps user in { module, status_code, data: { ... } }
  return json.data ?? json
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const restore = async () => {
      const accessToken = localStorage.getItem("access_token")
      if (!accessToken) {
        setIsLoading(false)
        return
      }
      // Serve cached user immediately — no loading spinner
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try { setUser(JSON.parse(savedUser)) } catch {}
        setIsLoading(false)
        // Only call userinfo once per browser session
        if (sessionStorage.getItem("userinfo_fetched")) return
      }
      sessionStorage.setItem("userinfo_fetched", "1")
      try {
        const userData = await fetchUserInfo(accessToken)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
      } catch (error) {
        console.error("Error refreshing user session:", error)
      } finally {
        setIsLoading(false)
      }
    }
    restore()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg =
          data?.detail ||
          data?.error_description ||
          data?.non_field_errors?.[0] ||
          "Имэйл эсвэл нууц үг буруу байна"
        return { success: false, error: errorMsg }
      }

      const { access_token, refresh_token } = data

      localStorage.setItem("access_token", access_token)
      if (refresh_token) localStorage.setItem("refresh_token", refresh_token)

      // Fetch real user info with the new token
      const userInfo = await fetchUserInfo(access_token)
      localStorage.setItem("user", JSON.stringify(userInfo))
      setUser(userInfo)
      sessionStorage.setItem("userinfo_fetched", "1")

      return { success: true, user: userInfo }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Серверт холбогдоход алдаа гарлаа. Дахин оролдоно уу." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    sessionStorage.clear()
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isLoggedIn: !!user // Convert user to boolean - true if user exists, false if null
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
