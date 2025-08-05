import {Outlet} from "react-router-dom";
import {SidebarInset} from "@shared/ui/sidebar";
import {useAppSelector} from "@shared/lib";
import {selectUserType} from "@entities/user";
import {AdminSidebar} from "@shared/ui/adminSidebar";

export const Layout = () => {
  const userType = useAppSelector(selectUserType);

  return (
    <>
      <SidebarInset>
        <main id="app-main" className="h-screen flex items-center justify-center">
          <Outlet/>
        </main>
      </SidebarInset>
      {userType === "admin" ? <AdminSidebar collapsible="icon" className="absolute"/> : <></>}
    </>
  )
}