"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import {
  clearAuthSession,
  getAuthProfile,
  type AuthProfile,
} from "@klu/auth-session";

export type AuthHeaderUser = {
  name: string;
  roleName: string;
  avatar: string;
};

type AuthContextValue = {
  user: AuthHeaderUser;
  profile: AuthProfile | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const profileToHeaderUser = (p: AuthProfile | null): AuthHeaderUser => {
  const name =
    [p?.firstName, p?.lastName].filter(Boolean).join(" ").trim() ||
    p?.username ||
    p?.email ||
    "Usuario";
  return {
    name,
    roleName: "Sesión activa",
    avatar: p?.image ?? "/avatars/shadcn.jpg",
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [sync, setSync] = useState(0);

  useEffect(() => {
    const handleAuthChanged = () => setSync((n) => n + 1);
    window.addEventListener("klu:auth-changed", handleAuthChanged);
    return () => window.removeEventListener("klu:auth-changed", handleAuthChanged);
  }, []);

  const profile = useMemo(() => {
    void sync;
    return getAuthProfile();
  }, [sync]);

  const user = useMemo(() => profileToHeaderUser(profile), [profile]);

  const logout = useCallback(() => {
    clearAuthSession();
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo(
    (): AuthContextValue => ({
      user,
      profile,
      logout,
    }),
    [user, profile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (ctx == null) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
};
