"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

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
                defaultValue="ariunbold.g@gmail.com"
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-center pt-2 lg:pt-4">
              <button className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm lg:text-base">
                ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ
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
              <input
                type="password"
                placeholder="Нууц үгээ оруулна уу"
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Шинэ нууц үг</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Шинэ нууц үгийг давтах</label>
              <input
                type="password"
                defaultValue="••••••••"
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-center pt-2 lg:pt-4">
              <button className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm lg:text-base">
                ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ
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
