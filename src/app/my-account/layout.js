"use client"

import { MyAccountSidebar } from "@/components/my-account/MyAccountSidebar"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useUser } from "@/contexts/UserContext"
import { useState } from "react"

export default function MyAccountLayout({ children }) {
  const { user } = useUser()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Clean Main Header with Burger Menu */}
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Left: Burger Menu + User Info */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* User Avatar and Name */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{user?.avatar || "ГБ"}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{user?.fullName || "B.АЛТАНЗУЛ"}</p>
                  <p className="text-xs text-gray-500">Хэрэглэгч</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block lg:w-80 lg:flex-shrink-0 fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto`}>
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative z-50 h-full">
              <MyAccountSidebar />
            </div>
          </div>
          
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
