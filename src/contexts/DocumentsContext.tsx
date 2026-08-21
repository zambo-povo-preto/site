"use client";

import { initialAdminDocuments } from "@/data/initialDocuments";
import {
  type ApiCategory,
  type ApiFileMetadata,
  deleteFileApi,
  getCategoriesApi,
  getFilesApi,
  toggleFileStatusApi,
  uploadFileApi,
} from "@/lib/api";
import type { AdminDocument, DocCategory } from "@/types/document";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type { DocCategory, AdminDocument };

interface DocumentsContextType {
  documents: AdminDocument[];
  categories: ApiCategory[];
  loading: boolean;
  addDocument: (
    doc: Omit<AdminDocument, "id" | "publishedAt"> & { file?: File },
  ) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  refreshDocuments: () => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | null>(null);

function mapFileType(
  contentType: string,
  fileName: string,
): "PDF" | "XLSX" | "DOC" {
  if (contentType.includes("pdf") || fileName.endsWith(".pdf")) return "PDF";
  if (
    contentType.includes("sheet") ||
    contentType.includes("excel") ||
    fileName.endsWith(".xlsx") ||
    fileName.endsWith(".xls")
  )
    return "XLSX";
  return "DOC";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function mapApiFileToAdminDoc(
  file: ApiFileMetadata,
  categoriesMap: Map<string, string>,
): AdminDocument {
  const catName = file.categoryId
    ? (categoriesMap.get(file.categoryId) as DocCategory)
    : "Prestação de Contas";

  const fileType = mapFileType(file.contentType, file.name);
  const createdDate = new Date(file.createdAt || Date.now());
  const year = createdDate.getFullYear();

  const publishedDateStr = file.publishedAt
    ? new Date(file.publishedAt).toLocaleDateString("pt-BR")
    : createdDate.toLocaleDateString("pt-BR");

  return {
    id: file.id,
    title: file.name,
    category: catName || "Prestação de Contas",
    year,
    description: file.description || "",
    fileType,
    fileSize: formatBytes(file.size),
    fileName: file.name,
    status: file.publishedAt ? "published" : "draft",
    publishedAt: publishedDateStr,
  };
}

// Convert File to Base64 string
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [catList, fileList] = await Promise.all([
        getCategoriesApi().catch(() => []),
        getFilesApi().catch(() => []),
      ]);

      setCategories(catList);

      const catMap = new Map<string, string>();
      for (const cat of catList) {
        catMap.set(cat.id, cat.name);
      }

      const mappedDocs = fileList.map((f) => mapApiFileToAdminDoc(f, catMap));
      setDocuments(mappedDocs);
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: initial load
  useEffect(() => {
    loadData();
  }, []);

  async function addDocument(
    doc: Omit<AdminDocument, "id" | "publishedAt"> & { file?: File },
  ) {
    if (doc.file) {
      try {
        const contentBase64 = await fileToBase64(doc.file);
        let categoryId = categories.find((c) => c.name === doc.category)?.id;

        if (!categoryId && categories.length > 0) {
          categoryId = categories[0].id;
        } else if (!categoryId) {
          categoryId = "cat-prestacao-contas";
        }

        await uploadFileApi({
          fileName: doc.title || doc.file.name,
          description: doc.description,
          contentType: doc.file.type || "application/octet-stream",
          contentBase64,
          categoryId,
          published: doc.status === "published",
        });

        await loadData();
        return;
      } catch (error) {
        console.error("Erro ao fazer upload na API:", error);
      }
    }

    setDocuments((prev) => [
      {
        ...doc,
        id: String(Date.now()),
        publishedAt: new Date().toLocaleDateString("pt-BR"),
      },
      ...prev,
    ]);
  }

  async function deleteDocument(id: string) {
    try {
      await deleteFileApi(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  }

  async function toggleStatus(id: string) {
    try {
      await toggleFileStatusApi(id);
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: d.status === "published" ? "draft" : "published" }
            : d,
        ),
      );
    } catch {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, status: d.status === "published" ? "draft" : "published" }
            : d,
        ),
      );
    }
  }

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        categories,
        loading,
        addDocument,
        deleteDocument,
        toggleStatus,
        refreshDocuments: loadData,
      }}
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
