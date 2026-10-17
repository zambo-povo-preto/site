export type DocCategory =
  | "Prestação de Contas"
  | "Relatório de Atividades"
  | "Plano de Trabalho"
  | "Ata de Reunião"
  | "Edital";

export type ExpenseCategory =
  | "Cachê Artístico & Arte-Educadores"
  | "Alimentação"
  | "Transporte & Logística"
  | "Material Didático & Consumo"
  | "Sonorização & Equipamentos"
  | "Serviços Terceiros (PJ/PF)"
  | "Despesas Operacionais & Sede"
  | "Outros";

export interface DocumentAttachment {
  id: string;
  documentId: string | null;
  name: string;
  description?: string | null;
  fileType: "PDF" | "XLSX" | "DOC";
  fileSize: string;
  createdAt: string;
  attachmentType: "invoice" | "document";
  downloadUrl?: string;
  publicObjectKey?: string | null;
  hasPublicFile?: boolean;
  issuerName?: string | null;
  issuerDoc?: string | null; // Disponível apenas no ambiente administrativo autenticado
  cnpj?: string | null; // Disponível publicamente quando for PJ válida
  invoiceNumber?: string | null;
  amount?: number | null;
  issueDate?: string | null;
  expenseType?: string | null;
}

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
  publicObjectKey?: string | null;
  hasPublicFile?: boolean;
  attachments?: DocumentAttachment[];
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
  hasPublicFile?: boolean;
  attachments?: DocumentAttachment[];
}

export interface YearGroup {
  year: number;
  documents: TransparencyDocument[];
}

export interface AttachmentUploadPayload {
  file: File;
  publicFile?: File;
  documentId?: string | null;
  attachmentType?: "invoice" | "document";
  isPublicSafe?: boolean;
  issuerName?: string;
  issuerDoc?: string;
  invoiceNumber?: string;
  amount?: number;
  issueDate?: string;
  expenseType?: string;
  description?: string;
}
