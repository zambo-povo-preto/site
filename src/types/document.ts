export type DocCategory =
  | "Prestação de Contas"
  | "Relatório de Atividades"
  | "Plano de Trabalho"
  | "Ata de Reunião"
  | "Edital";

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

export interface TransparencyDocument {
  id: string;
  title: string;
  category: DocCategory;
  description: string;
  fileType: "PDF" | "XLSX" | "DOC";
  fileSize: string;
  date: string;
  downloadUrl?: string;
}

export interface YearGroup {
  year: number;
  documents: TransparencyDocument[];
}
