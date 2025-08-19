"use client"

import { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users data
  const mockUsers = [
    {
      id: 1,
      email: "test@example.com",
      password: "password123",
      firstName: "Ариунболд",
      lastName: "Ганбат",
      fullName: "Ариунболд",
      registrationNumber: "TA99081235",
      avatar: "БА"
    },
    {
      id: 2,
      email: "galhuu@gmail.com",
      password: "Test123",
      firstName: "Galhuu",
      lastName: "B",
      fullName: "B.GALHUU",
      registrationNumber: "TB24031578",
      avatar: "ГБ"
    }
  ]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock authentication - check against all mock users
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return { success: true, user: foundUser }
    } else {
      return { success: false, error: "Имэйл эсвэл нууц үг буруу байна" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    login,
    logout,
    isLoading
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
