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
import {useAppSelector} from "@shared/lib";
import {selectCurrentPlace} from "@entities/place";
import SplitText from "../reactBits/TextAnimations/SplitText/SplitText.tsx";

const baseMenu = [
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
    url: "/",
    icon: SquareMenu,
  },
  {
    title: "Клиенты",
    url: "/clients",
    icon: SquareMenu,
  },
] as const

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const currentPlace = useAppSelector(selectCurrentPlace)
  const menuHref = currentPlace ? `/place/${currentPlace.id}` : "/places"
  const isMenuDisabled = !currentPlace

  return (
    <Sidebar className="ml-2 pt-4 !border-0 [&>div[data-sidebar='sidebar']]:!bg-background" {...props}>
      <SidebarHeader className="space-y-2 p-2">
        <Button variant="ghost" className="w-full mb-4 h-16">
          <Link className="flex items-center gap-4" to="/home">
            <img src="/ffc.png" alt="FastFoodCode" className="w-16 h-16"/>
            <span className="scroll-m-20 text-xl font-semibold tracking-tight"><SplitText text="FastFoodCode" delay={40}/></span>
          </Link>
        </Button>
        <SearchPlace/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarGroupLabel className="text-lg">Разделы</SidebarGroupLabel>
            <SidebarMenu>
              {baseMenu.map((item) => {
                const href = item.title === "Меню" ? menuHref : item.url
                const disabled = item.title === "Меню" || item.title === "Клиенты" ? isMenuDisabled : false

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild aria-disabled={disabled}>
                      <Link
                        to={href}
                        className={disabled ? "pointer-events-none opacity-50" : ""}
                        title={
                          item.title === "Меню" && disabled
                            ? "Сначала выберите заведение"
                            : undefined
                        }
                      >
                        <item.icon />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}