"use client"

import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import Image from "next/image"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"

export function MyAccountSidebar() {
  const { user, logout } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    { title: "ХУВИЙН МЭДЭЭЛЭЛ", url: "/my-account", icon: "/svg/my-info.svg", active: true },
    { title: "ХЭТЭВЧ", url: "/my-account/wallet", icon: "/svg/wallet.svg" },
    { title: "ДУУДЛАГА ХУДАЛДАА", url: "/my-account/auctions", icon: "/svg/bid1.svg" },
    { title: "ТОХИРГОО", url: "/my-account/settings", icon: "/svg/settings.svg" },
    { title: "СИСТЕМЭЭС ГАРАХ", action: handleLogout, icon: "/svg/logout.svg" }
  ]

  return (
    <Sidebar className="w-80 border-r bg-white">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{user?.avatar || "ГБ"}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.fullName || "B.GALHUU"}</p>
            <p className="text-sm text-gray-500">Хэрэглэгч</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-3 text-sm font-medium text-gray-700 mb-2">
            Хэрэглэгчийн цэс
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full h-12 transition-all duration-200 ${
                      item.active 
                        ? "bg-orange-500 text-white shadow-sm" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.action ? (
                      <button 
                        onClick={item.action} 
                        className={`flex items-center gap-3 px-4 h-12 rounded-lg w-full text-left transition-colors ${
                          item.active 
                            ? "text-white" 
                            : "hover:text-gray-900"
                        }`}
                      >
                        <Image 
                          src={item.icon} 
                          alt="" 
                          width={20} 
                          height={20} 
                          className={`w-5 h-5 ${
                            item.active ? "filter brightness-0 invert" : ""
                          }`}
                        />
                        <span className="font-medium">{item.title}</span>
                      </button>
                    ) : (
                      <a 
                        href={item.url} 
                        className={`flex items-center gap-3 px-4 h-12 rounded-lg transition-colors ${
                          item.active 
                            ? "text-white" 
                            : "hover:text-gray-900"
                        }`}
                      >
                        <Image 
                          src={item.icon} 
                          alt="" 
                          width={20} 
                          height={20} 
                          className={`w-5 h-5 ${
                            item.active ? "filter brightness-0 invert" : ""
                          }`}
                        />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-6">
        <div className="text-center text-sm text-gray-500 space-y-2">
          <div className="flex items-center justify-center mb-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-bold text-sm">N</span>
            </div>
          </div>
          <p className="font-medium">ТОРГОНЫ ЗАМ</p>
          <p>Дуудлага худалдааны систем</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
