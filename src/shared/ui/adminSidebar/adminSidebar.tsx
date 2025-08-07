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
import {Airplay, Gauge, MapPinHouse, SquareMenu} from 'lucide-react';
import {Link} from "react-router-dom";
import {NavUser} from "@widgets/navUser";
import {Search} from "@widgets/search";
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
    <Sidebar className="ml-2 pt-4 [&>div[data-sidebar='sidebar']]:!bg-background !border-0" {...props}>
      <SidebarHeader className="space-y-2 p-2">
        <Button variant="ghost" className="w-full mb-4 h-12 flex items-center">
          <Airplay />
          <h3 className="pl-4 scroll-m-20 text-2xl font-semibold tracking-tight">FastFoodCode</h3>
        </Button>
        <Search />
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