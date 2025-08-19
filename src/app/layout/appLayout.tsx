import React, {useEffect, useMemo} from "react";
import { Outlet } from "react-router-dom";
import {cn, useAppDispatch, useAppSelector} from "@shared/lib";
import {selectShowInto, selectUserBase, setShowIntro} from "@entities/user";
import { SidebarInset } from "@shared/ui/sidebar";
import { AdminSidebar } from "@shared/ui/adminSidebar";
import { Card } from "@shared/ui/card";
import { Header } from "@shared/ui/header";
import {FullscreenIntro} from "@widgets/FullscreenIntro";

export const AppLayout: React.FC = () => {
  const user = useAppSelector(selectUserBase);
  const dispatch = useAppDispatch()
  const showIntro = useAppSelector(selectShowInto)

  useEffect(() => {
    if (showIntro) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showIntro]);

  const appWrapClasses = useMemo(
    () =>
      [
        "transition-opacity duration-300",
        showIntro ? "opacity-0" : "opacity-100",
      ].join(" "),
    [showIntro]
  );

  return (
    <>
      {showIntro && (
        <FullscreenIntro
          stayMs={1700}
          fadeMs={250}
          onDone={() => dispatch(setShowIntro(false))}
        />
      )}

      <div className={cn("w-full flex items-center justify-center", appWrapClasses)}>
        <AdminSidebar side="left" />
        <SidebarInset>
          <div className="min-h-screen flex m-3 overflow-y-auto">
            <Card className="w-full flex flex-col py-4">
              <Header name={user.currentPage}/>
              <div className="w-full flex items-center justify-center">
                <Outlet/>
              </div>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </>

);
};
