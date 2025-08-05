import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@shared/ui/sidebar.tsx";
import {ImagePlus, TableProperties} from 'lucide-react';
import {Link} from "react-router-dom";

const data = {
  menuList: [
    {
      title: "Image",
      items: [
        {
          title: "Upscale",
          url: "/",
          icon: ImagePlus,
        },
        {
          title: "Process list",
          url: "/images",
          icon: TableProperties,
        }
      ]
    },
    // {
    //   title: "Video",
    //   items: [
    //     {
    //       title: "Upscale",
    //       url: "/",
    //       icon: ImagePlus,
    //     },
    //     {
    //       title: "Process list",
    //       url: "/images",
    //       icon: ImagePlus,
    //     }
    //   ]
    // }
  ]
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.menuList.map((menu) => (
          <SidebarGroup key={menu.title}>
            <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
            <SidebarMenu>
              {menu.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link >
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}