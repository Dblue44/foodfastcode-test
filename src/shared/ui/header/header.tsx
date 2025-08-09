import {SidebarTrigger} from "@shared/ui/sidebar.tsx";
import {Separator} from "@shared/ui/separator.tsx";
import type {HeaderProps} from "@shared/ui/header/types.ts";
import {Switch} from "@shared/ui/switch.tsx";
import {useTheme} from "next-themes";
import {Breadcrumbs} from "@shared/ui/header";


export function Header({
  name
} : HeaderProps) {
  const {theme, setTheme} = useTheme()
  const isDark = theme === 'dark'

  const handleToggle = (value: boolean): void => {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 mb-3">
        <SidebarTrigger className="-ml-2"/>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumbs/>

        <span className="sr-only">{name}</span>

        <Switch
          id="theme-switch"
          checked={isDark}
          onCheckedChange={handleToggle}
          className="ml-auto"
        />
      </div>
    </header>
  )
}