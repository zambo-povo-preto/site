"use client";

import type { AdminAuthContextType, AdminUser } from "@/types/auth";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// TODO: replace with real API call
const MOCK_CREDENTIALS = { email: "admin@zambo.org.br", password: "zambo2024" };

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: validate session token with API
    const stored = sessionStorage.getItem("zambo_admin_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  async function login(
    email: string,
    password: string,
  ): Promise<{ error: string | null }> {
    // TODO: replace with POST /api/admin/login
    await new Promise((r) => setTimeout(r, 800));
    if (
      email === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password
    ) {
      const adminUser = { email, name: "Administrador Zambô" };
      setUser(adminUser);
      sessionStorage.setItem("zambo_admin_user", JSON.stringify(adminUser));
      return { error: null };
    }
    return { error: "E-mail ou senha incorretos." };
  }

  function logout() {
    // TODO: POST /api/admin/logout to invalidate token
    setUser(null);
    sessionStorage.removeItem("zambo_admin_user");
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
