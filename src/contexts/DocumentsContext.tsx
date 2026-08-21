"use client";

import { initialAdminDocuments } from "@/data/initialDocuments";
import type { AdminDocument, DocCategory } from "@/types/document";
import { type ReactNode, createContext, useContext, useState } from "react";

export type { DocCategory, AdminDocument };

interface DocumentsContextType {
  documents: AdminDocument[];
  addDocument: (
    doc: Omit<AdminDocument, "id" | "publishedAt">,
  ) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | null>(null);

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<AdminDocument[]>(
    initialAdminDocuments,
  );

  async function addDocument(doc: Omit<AdminDocument, "id" | "publishedAt">) {
    // TODO: POST /api/admin/documents (multipart/form-data with file)
    await new Promise((r) => setTimeout(r, 600));
    setDocuments((prev) => [
      {
        ...doc,
        id: String(Date.now()),
        publishedAt: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  }

  async function deleteDocument(id: string) {
    // TODO: DELETE /api/admin/documents/:id
    await new Promise((r) => setTimeout(r, 400));
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  async function toggleStatus(id: string) {
    // TODO: PATCH /api/admin/documents/:id { status }
    await new Promise((r) => setTimeout(r, 300));
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "published" ? "draft" : "published" }
          : d,
      ),
    );
  }

  return (
    <DocumentsContext.Provider
      value={{ documents, addDocument, deleteDocument, toggleStatus }}
    >
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const ctx = useContext(DocumentsContext);
  if (!ctx)
    throw new Error("useDocuments must be used inside DocumentsProvider");
  return ctx;
}
