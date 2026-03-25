"use client"

import { useUser } from "@/contexts/UserContext"

export default function MyAccountPage() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 flex justify-center">
        <p className="text-gray-500">Уншиж байна...</p>
      </div>
    )
  }

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
                value={user?.last_name ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Нэр</label>
              <input
                type="text"
                value={user?.first_name ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Бүтэн нэр</label>
              <input
                type="text"
                value={user?.informal ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Регистрийн дугаар</label>
              <input
                type="text"
                value={user?.register_no ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div>
{/* 
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Имэйл</label>
              <input
                type="email"
                value={user?.email ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div> */}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Утасны дугаар</label>
              <input
                type="text"
                value={user?.phone ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Хэрэглэгчийн имэйл хаяг</label>
              <input
                type="text"
                value={user?.username ?? ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Бүртгүүлсэн огноо</label>
              <input
                type="text"
                value={user?.date_joined ? new Date(user.date_joined).toLocaleDateString("mn-MN") : ""}
                readOnly
                className="w-full px-3 py-2 lg:py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
