"use client";

import { ReactNode } from "react";
import { AdminAuthProvider } from "./AdminAuthContext";
import { DocumentsProvider } from "./DocumentsContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <DocumentsProvider>{children}</DocumentsProvider>
    </AdminAuthProvider>
  );
}
