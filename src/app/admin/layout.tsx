"use client";

import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { DocumentsProvider } from "@/contexts/DocumentsContext";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <DocumentsProvider>{children}</DocumentsProvider>
    </AdminAuthProvider>
  );
}
