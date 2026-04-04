"use client"

import { useState, useEffect } from "react"
import { fetchWithAuth } from "@/lib/api"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Email section
  const [email, setEmail] = useState("")
  const [isEmailLoading, setIsEmailLoading] = useState(true)
  const [isEmailSaving, setIsEmailSaving] = useState(false)

  // Password section
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await fetchWithAuth("/api/auth/userinfo")
        if (!response.ok) return
        const json = await response.json()
        const data = json?.data ?? json
        setEmail(data?.email ?? "")
      } catch (error) {
        console.error("Failed to load user info:", error)
      } finally {
        setIsEmailLoading(false)
      }
    }
    loadUserInfo()
  }, [])

  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Бүх талбарыг бөглөнө үү")
      return
    }
    if (newPassword !== confirmPassword) {
      alert("Шинэ нууц үг таарахгүй байна")
      return
    }
    setIsPasswordSaving(true)
    try {
      const response = await fetchWithAuth("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ old_password: currentPassword, new_password: newPassword }),
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data?.detail || "Нууц үг шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.")
        return
      }
      alert(data?.message ?? data?.detail ?? "Нууц үг амжилттай шинэчлэгдлээ!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Update password error:", error)
      alert("Серверт холбогдоход алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsPasswordSaving(false)
    }
  }

  const handleEmailSave = async () => {
    if (!email.trim()) {
      alert("И-мэйл хаягаа оруулна уу")
      return
    }
    setIsEmailSaving(true)
    try {
      const response = await fetchWithAuth("/api/user/email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data?.detail || "И-мэйл шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.")
        return
      }
      alert(data?.message ?? data?.detail ?? "И-мэйл амжилттай шинэчлэгдлээ!")
    } catch (error) {
      console.error("Update email error:", error)
      alert("Серверт холбогдоход алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setIsEmailSaving(false)
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">ТОХИРГОО</h1>
        
        {/* Email Address Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-4 lg:mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">И-МЭЙЛ ХАЯГ</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Таны и-мэйл хаяг</label>
              <input
                type="email"
                value={isEmailLoading ? "" : email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isEmailLoading ? "Уншиж байна..." : "И-мэйл хаягаа оруулна уу"}
                disabled={isEmailLoading}
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
            
            <div className="flex justify-center pt-2 lg:pt-4">
              <button
                onClick={handleEmailSave}
                disabled={isEmailSaving || isEmailLoading}
                className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEmailSaving ? "ХАДГАЛЖ БАЙНА..." : "ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ"}
              </button>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 mb-4 lg:mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">НУУЦ ҮГ</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Одоогийн нууц үг</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Нууц үгээ оруулна уу"
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Шинэ нууц үг</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Шинэ нууц үгээ оруулна уу"
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Шинэ нууц үгийг давтах</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Шинэ нууц үгээ давтан оруулна уу"
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex justify-center pt-2 lg:pt-4">
              <button
                onClick={handlePasswordSave}
                disabled={isPasswordSaving}
                className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPasswordSaving ? "ХАДГАЛЖ БАЙНА..." : "ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ"}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">МЭДЭГДЭЛ</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1">
              <p className="text-gray-900 text-sm lg:text-base">
                Дуудлага худалдаа болон бараа хүргэлтийн талаарх мэдэгдэлийг и-мэйл хаягаар хүлээн авах
              </p>
            </div>
            
            {/* Toggle Switch */}
            <div className="flex-shrink-0 flex justify-center sm:justify-end">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  notificationsEnabled ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
