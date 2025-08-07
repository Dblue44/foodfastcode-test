import React from "react";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@shared/ui/sidebar";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shared/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@shared/ui/avatar";
import {LogOut, UserPen} from "lucide-react";
import {logout, selectUserBase} from "@entities/user";
import type {IUserState} from "@shared/types";
import {useAppDispatch, useAppSelector} from "@shared/lib";
import {Skeleton} from "@shared/ui/skeleton.tsx";

export function NavUser({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  const user: IUserState = useAppSelector(selectUserBase)
  const dispatch = useAppDispatch()
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user.id && user.avatarUrl && user.name
          ?
          <DropdownMenu {...props}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.name}/>
                  <AvatarFallback className="rounded-lg">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{user.telegramId}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatarUrl} alt={user.name}/>
                    <AvatarFallback className="rounded-lg">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">{user.telegramId}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserPen className="mr-2"/> Настройки
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator/>
              <DropdownMenuItem onSelect={() => dispatch(logout())}>
                <LogOut className="mr-2"/> Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          :
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full"/>
            <div className="space-y-2">
              <Skeleton className="h-4 w-40"/>
              <Skeleton className="h-4 w-30"/>
            </div>
          </div>}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}