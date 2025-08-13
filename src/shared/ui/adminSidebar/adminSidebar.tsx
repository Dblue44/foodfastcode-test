import * as React from "react"
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
  SidebarMenuItem
} from "@shared/ui/sidebar";
import {Gauge, MapPinHouse, SquareMenu} from 'lucide-react';
import {Link} from "react-router-dom";
import {NavUser} from "@widgets/navUser";
import {SearchPlace} from "@widgets/search";
import {Button} from "@shared/ui/button.tsx";

const menuList = [
  {
    title: "Image",
    items: [
      {
        title: "Дашборды",
        url: "/home",
        icon: Gauge,
      },
      {
        title: "Заведения",
        url: "/places",
        icon: MapPinHouse,
      },
      {
        title: "Меню",
        url: "/menu",
        icon: SquareMenu,
      }
    ]
  },
]

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="ml-2 pt-4 !border-0 [&>div[data-sidebar='sidebar']]:!bg-background" {...props}>
      <SidebarHeader className="space-y-2 p-2">
        <Button variant="ghost" className="w-full mb-4 h-16">
          <Link className="flex items-center gap-4" to="/home">
            <img src="/ffc.png" alt="FastFoodCode" className="w-16 h-16"/>
            <span className="pl-2 scroll-m-20 text-xl font-semibold tracking-tight">FastFoodCode</span>
          </Link>
        </Button>
        <SearchPlace/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarGroupLabel className="text-lg">Меню</SidebarGroupLabel>
          {menuList.map((menu) => (
            <SidebarMenu key={menu.title}>
              {menu.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon/>
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          ))}
        </SidebarGroupContent>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}