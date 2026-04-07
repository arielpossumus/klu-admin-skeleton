"use client";

import { Outlet } from "react-router";
import { AuthProvider } from "@/context/AuthContext";

const RootLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export default RootLayout;
