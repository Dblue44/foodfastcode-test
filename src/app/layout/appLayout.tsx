import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@shared/lib";
import { selectUserBase } from "@entities/user";
import { SidebarInset } from "@shared/ui/sidebar";
import { AdminSidebar } from "@shared/ui/adminSidebar";
import { Card } from "@shared/ui/card";
import { Header } from "@shared/ui/header";

export const AppLayout: React.FC = () => {
  const user = useAppSelector(selectUserBase);

  return (
    <div className="w-full flex items-center justify-center">
      <AdminSidebar side="left" />
      <SidebarInset>
        <div className="h-screen flex m-3">
          <Card className="w-full flex flex-col py-4">
            <Header name={user.currentPage}/>
            <div className="w-full flex items-center justify-center">
              <Outlet/>
            </div>
          </Card>
        </div>
      </SidebarInset>
    </div>
);
};
