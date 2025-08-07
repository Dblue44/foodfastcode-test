import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => (
  <main className="h-screen w-full flex items-center justify-center">
    <Outlet />
  </main>
);
