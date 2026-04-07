"use client";

import { Navigate, Outlet } from "react-router";
import { isAccessTokenValid } from "@klu/auth-session";

export const GuestOnlyRoute = () => {
  if (isAccessTokenValid()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
