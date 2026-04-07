"use client";

import { Navigate, Outlet, useLocation } from "react-router";
import { isAccessTokenValid } from "@klu/auth-session";

export const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAccessTokenValid()) {
    const from = `${location.pathname}${location.search}`;
    return <Navigate to="/" replace state={{ from }} />;
  }

  return <Outlet />;
};
