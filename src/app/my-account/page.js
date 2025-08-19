"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { MyAccountSidebar } from "@/components/my-account/MyAccountSidebar"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useUser } from "@/contexts/UserContext"

export default function MyAccountPage() {
  const { user } = useUser()

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50">
          <MyAccountSidebar />
          <main className="lg:pl-80">
            <div className="flex h-16 items-center gap-2 border-b bg-white px-4 lg:hidden">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user?.avatar || "БА"}</span>
                </div>
                <span className="font-medium">{user?.fullName || "tester"}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">ТАНЫ ПРОФАЙЛ</h1>
                
                {/* Profile Information Form */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">ТАНЫ ХУВИЙН МЭДЭЭЛЭЛ</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Овог</label>
                      <input
                        type="text"
                        defaultValue={user?.lastName || "Ганбат"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Нэр</label>
                      <input
                        type="text"
                        defaultValue={user?.firstName || "Ариунболд"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Регистрийн дугаар</label>
                      <input
                        type="text"
                        defaultValue={user?.registrationNumber || "TA99081235"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Имэйл</label>
                      <input
                        type="email"
                        defaultValue={user?.email || "test@example.com"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Бусад хэрэгцээт талбар</label>
                      <input
                        type="text"
                        placeholder="Утга"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                      ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
