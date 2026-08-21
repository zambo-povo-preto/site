"use client";

import {
  clearTokens,
  getAccessToken,
  loginApi,
  refreshAccessToken,
} from "@/lib/api";
import type { AdminAuthContextType, AdminUser } from "@/types/auth";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const stored = localStorage.getItem("zambo_admin_user");
      const token = getAccessToken();

      if (stored && token) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          clearTokens();
        }
      } else if (stored && !token) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            clearTokens();
          }
        } else {
          clearTokens();
        }
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  async function login(
    email: string,
    password: string,
  ): Promise<{ error: string | null }> {
    try {
      const data = await loginApi(email, password);
      const adminUser: AdminUser = {
        name: data.user.name,
        email: data.user.email,
      };
      setUser(adminUser);
      return { error: null };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao efetuar login.";
      return { error: message };
    }
  }

  function logout() {
    setUser(null);
    clearTokens();
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
