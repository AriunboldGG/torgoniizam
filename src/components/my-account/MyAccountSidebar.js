"use client"

import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function MyAccountSidebar() {
  const { user, logout } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuItems = [
    {
      title: "ХУВИЙН МЭДЭЭЛЭЛ",
      url: "/my-account",
      icon: "/svg/my-info.svg",
      active: true
    },
    {
      title: "ХЭТЭВЧ",
      url: "/my-account/wallet",
      icon: "/svg/wallet.svg"
    },
    {
      title: "ДУУДЛАГА ХУДАЛДАА",
      url: "/my-account/auctions",
      icon: "/svg/bid1.svg"
    },
    {
      title: "ТОХИРГОО",
      url: "/my-account/settings",
      icon: "/svg/settings.svg"
    },
    {
      title: "СИСТЕМЭЭС ГАРАХ",
      action: handleLogout,
      icon: "/svg/logout.svg"
    }
  ]

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{user?.avatar || "БА"}</span>
          </div>
          <div>
            <p className="font-semibold">{user?.fullName || "tester"}</p>
            <p className="text-sm text-gray-500">Хэрэглэгч</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Хэрэглэгчийн цэс</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={item.active ? "bg-orange-500 text-white" : ""}
                  >
                    {item.action ? (
                      <button 
                        onClick={item.action}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 w-full text-left"
                      >
                        <img src={item.icon} alt="" className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </button>
                    ) : (
                      <a href={item.url} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                        <img src={item.icon} alt="" className="w-5 h-5" />
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
      
      <SidebarFooter className="border-t p-4">
        <div className="text-center text-sm text-gray-500">
          <p>ТОРГОНЫ ЗАМ</p>
          <p>Дуудлага худалдааны систем</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
