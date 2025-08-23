"use client"

import { useUser } from "@/contexts/UserContext"

export default function MyAccountPage() {
  const { user } = useUser()

  return (
    <div className="p-4 lg:p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">ТАНЫ ПРОФАЙЛ</h1>
        
        {/* Profile Information Form */}
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">ТАНЫ ХУВИЙН МЭДЭЭЛЭЛ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Овог</label>
              <input
                type="text"
                defaultValue={user?.lastName || "Ганбат"}
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Нэр</label>
              <input
                type="text"
                defaultValue={user?.firstName || "Ариунболд"}
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Регистрийн дугаар</label>
              <input
                type="text"
                defaultValue={user?.registrationNumber || "TA99081235"}
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Имэйл</label>
              <input
                type="email"
                defaultValue={user?.email || "test@example.com"}
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                disabled
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Бусад хэрэгцээт талбар</label>
              <input
                type="text"
                placeholder="Утга"
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-6 lg:mt-8 flex justify-center">
            <button className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
              ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
