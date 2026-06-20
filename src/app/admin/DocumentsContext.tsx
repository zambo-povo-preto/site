"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type DocCategory = "Prestação de Contas" | "Relatório de Atividades" | "Plano de Trabalho" | "Ata de Reunião" | "Edital";

export interface AdminDocument {
  id: string;
  title: string;
  category: DocCategory;
  description: string;
  year: number;
  fileType: "PDF" | "XLSX" | "DOC";
  fileSize: string;
  fileName: string;
  publishedAt: string;
  status: "published" | "draft";
}

interface DocumentsContextType {
  documents: AdminDocument[];
  addDocument: (doc: Omit<AdminDocument, "id" | "publishedAt">) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | null>(null);

const initialDocs: AdminDocument[] = [
  { id: "1", title: "Prestação de Contas Anual 2024", category: "Prestação de Contas", description: "Demonstrativo financeiro completo do exercício de 2024.", year: 2024, fileType: "PDF", fileSize: "2,4 MB", fileName: "prestacao-contas-2024.pdf", publishedAt: "2025-01-31", status: "published" },
  { id: "2", title: "Relatório de Atividades 2024", category: "Relatório de Atividades", description: "Resumo de todas as ações e eventos realizados em 2024.", year: 2024, fileType: "PDF", fileSize: "5,1 MB", fileName: "relatorio-atividades-2024.pdf", publishedAt: "2025-01-31", status: "published" },
  { id: "3", title: "Plano de Trabalho 2024", category: "Plano de Trabalho", description: "Planejamento anual de projetos e metas para 2024.", year: 2024, fileType: "PDF", fileSize: "1,2 MB", fileName: "plano-trabalho-2024.pdf", publishedAt: "2024-01-15", status: "published" },
  { id: "4", title: "Ata de Assembleia Geral — Mar/2024", category: "Ata de Reunião", description: "Registro da Assembleia Geral Ordinária de março de 2024.", year: 2024, fileType: "PDF", fileSize: "380 KB", fileName: "ata-assembleia-mar-2024.pdf", publishedAt: "2024-03-20", status: "published" },
  { id: "5", title: "Ata de Assembleia Geral — Set/2024", category: "Ata de Reunião", description: "Registro da Assembleia Geral Extraordinária de setembro de 2024.", year: 2024, fileType: "PDF", fileSize: "290 KB", fileName: "ata-assembleia-set-2024.pdf", publishedAt: "2024-09-18", status: "published" },
  { id: "6", title: "Edital de Seleção de Artistas 2024", category: "Edital", description: "Edital para seleção de artistas e educadores para programas do Ponto de Cultura.", year: 2024, fileType: "PDF", fileSize: "650 KB", fileName: "edital-artistas-2024.pdf", publishedAt: "2024-02-05", status: "published" },
  { id: "7", title: "Prestação de Contas Anual 2023", category: "Prestação de Contas", description: "Demonstrativo financeiro completo de 2023.", year: 2023, fileType: "PDF", fileSize: "2,1 MB", fileName: "prestacao-contas-2023.pdf", publishedAt: "2024-01-31", status: "published" },
  { id: "8", title: "Relatório de Atividades 2023", category: "Relatório de Atividades", description: "Resumo das ações realizadas em 2023.", year: 2023, fileType: "PDF", fileSize: "4,8 MB", fileName: "relatorio-atividades-2023.pdf", publishedAt: "2024-01-31", status: "published" },
  { id: "9", title: "Plano de Trabalho 2023", category: "Plano de Trabalho", description: "Planejamento anual para 2023.", year: 2023, fileType: "PDF", fileSize: "1,0 MB", fileName: "plano-trabalho-2023.pdf", publishedAt: "2023-01-10", status: "published" },
  { id: "10", title: "Balanço Patrimonial 2023", category: "Prestação de Contas", description: "Balanço patrimonial e demonstrações contábeis de 2023.", year: 2023, fileType: "XLSX", fileSize: "890 KB", fileName: "balanco-patrimonial-2023.xlsx", publishedAt: "2024-02-28", status: "draft" },
];

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<AdminDocument[]>(initialDocs);

  async function addDocument(doc: Omit<AdminDocument, "id" | "publishedAt">) {
    // TODO: POST /api/admin/documents (multipart/form-data with file)
    await new Promise((r) => setTimeout(r, 600));
    setDocuments((prev) => [{ ...doc, id: String(Date.now()), publishedAt: new Date().toISOString().split("T")[0] }, ...prev]);
  }

  async function deleteDocument(id: string) {
    // TODO: DELETE /api/admin/documents/:id
    await new Promise((r) => setTimeout(r, 400));
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  async function toggleStatus(id: string) {
    // TODO: PATCH /api/admin/documents/:id { status }
    await new Promise((r) => setTimeout(r, 300));
    setDocuments((prev) => prev.map((d) => d.id === id ? { ...d, status: d.status === "published" ? "draft" : "published" } : d));
  }

  return (
    <DocumentsContext.Provider value={{ documents, addDocument, deleteDocument, toggleStatus }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const ctx = useContext(DocumentsContext);
  if (!ctx) throw new Error("useDocuments must be used inside DocumentsProvider");
  return ctx;
}
