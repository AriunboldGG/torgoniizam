"use client"

import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import Image from "next/image"

export function MyAccountSidebar() {
  const { user, logout } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    { title: "Хувийн мэдээлэл", url: "/my-account", icon: "/svg/my-info.svg" },
    { title: "Хэтэвч", url: "/my-account/wallet", icon: "/svg/wallet.svg" },
    { title: "Дуудлага худалдаа", url: "/my-account/auctions", icon: "/svg/bid1.svg" },
    { title: "Тохиргоо", url: "/my-account/settings", icon: "/svg/settings.svg" },
    { title: "Системээс гарах", action: handleLogout, icon: "/svg/logout.svg" }
  ]

  const isActive = (url) => {
    if (url === "/my-account" && pathname === "/my-account") return true
    if (url === "/my-account/wallet" && pathname === "/my-account/wallet") return true
    if (url === "/my-account/auctions" && pathname === "/my-account/auctions") return true
    if (url === "/my-account/settings" && pathname === "/my-account/settings") return true
    return false
  }

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg lg:text-xl">{user?.avatar || "ГБ"}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm lg:text-base">{user?.fullName || "B.АЛТАНЗУЛ"}</p>
            <p className="text-xs lg:text-sm text-gray-500">Хэрэглэгч</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-3 lg:p-4">
        <div className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.url)
            return (
              <div key={item.title}>
                {item.action ? (
                  <button
                    onClick={item.action}
                    className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                      active 
                        ? "bg-orange-500 text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Image 
                      src={item.icon} 
                      alt="" 
                      width={18} 
                      height={18} 
                      className={`w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 ${
                        active ? "filter brightness-0 invert" : ""
                      }`}
                    />
                    <span className="font-medium truncate">{item.title}</span>
                  </button>
                ) : (
                  <a
                    href={item.url}
                    className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors text-sm lg:text-base ${
                      active 
                        ? "bg-orange-500 text-white" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Image 
                      src={item.icon} 
                      alt="" 
                      width={18} 
                      height={18} 
                      className={`w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 ${
                        active ? "filter brightness-0 invert" : ""
                      }`}
                    />
                    <span className="font-medium truncate">{item.title}</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 lg:p-6 border-t border-gray-200 mt-auto">
        <div className="text-center text-xs lg:text-sm text-gray-500 space-y-2">
          <div className="flex items-center justify-center mb-2 lg:mb-3">
            <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-bold text-xs lg:text-sm">N</span>
            </div>
          </div>
          <p className="font-medium">ТОРГОНЫ ЗАМ</p>
          <p className="text-xs lg:text-sm">Дуудлага худалдааны систем</p>
        </div>
      </div>
    </div>
  )
}
