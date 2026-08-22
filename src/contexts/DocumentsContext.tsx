"use client";

import {
  type ApiAttachmentMetadata,
  type ApiCategory,
  type ApiFileMetadata,
  deleteAttachmentApi,
  deleteFileApi,
  getAttachmentDownloadUrl,
  getAttachmentsApi,
  getCategoriesApi,
  getFilesApi,
  toggleFileStatusApi,
  updateAttachmentApi,
  updateFileApi,
  uploadAttachmentApi,
  uploadFileApi,
} from "@/lib/api";
import type {
  AdminDocument,
  AttachmentUploadPayload,
  DocCategory,
  DocumentAttachment,
} from "@/types/document";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type { DocCategory, AdminDocument, DocumentAttachment };

interface DocumentsContextType {
  documents: AdminDocument[];
  categories: ApiCategory[];
  loading: boolean;
  addDocument: (
    doc: Omit<AdminDocument, "id" | "publishedAt"> & {
      file?: File;
      attachmentFile?: File;
      attachmentFiles?: File[];
      attachmentPayloads?: AttachmentUploadPayload[];
    },
  ) => Promise<void>;
  updateDocument: (
    id: string,
    docData: Partial<AdminDocument>,
    newAttachmentFiles?: File[],
    newAttachmentPayloads?: AttachmentUploadPayload[],
  ) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  addAttachment: (
    documentId: string,
    fileInput: File | File[] | AttachmentUploadPayload | AttachmentUploadPayload[],
  ) => Promise<void>;
  updateAttachment: (
    attachmentId: string,
    data: Partial<AttachmentUploadPayload>,
  ) => Promise<void>;
  deleteAttachment: (attachmentId: string) => Promise<void>;
  refreshDocuments: () => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | null>(null);

function mapFileType(
  contentType: string,
  fileName: string,
): "PDF" | "XLSX" | "DOC" {
  if (contentType.includes("pdf") || fileName.toLowerCase().endsWith(".pdf")) return "PDF";
  if (
    contentType.includes("sheet") ||
    contentType.includes("excel") ||
    fileName.toLowerCase().endsWith(".xlsx") ||
    fileName.toLowerCase().endsWith(".xls")
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
  attachmentsList: ApiAttachmentMetadata[],
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

  const docAttachments: DocumentAttachment[] = attachmentsList
    .filter((att) => att.documentId === file.id)
    .map((att) => ({
      id: att.id,
      documentId: att.documentId,
      name: att.name,
      description: att.description,
      fileType: mapFileType(att.contentType, att.name),
      fileSize: formatBytes(att.size),
      createdAt: new Date(att.createdAt || Date.now()).toLocaleDateString(
        "pt-BR",
      ),
      downloadUrl: getAttachmentDownloadUrl(att.id),
      issuerName: att.issuerName ?? null,
      issuerDoc: att.issuerDoc ?? null,
      invoiceNumber: att.invoiceNumber ?? null,
      amount: att.amount ?? null,
      issueDate: att.issueDate ?? null,
      expenseType: att.expenseType ?? null,
    }));

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
    attachments: docAttachments,
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
      const [catList, fileList, attachmentList] = await Promise.all([
        getCategoriesApi().catch(() => []),
        getFilesApi().catch(() => []),
        getAttachmentsApi().catch(() => []),
      ]);

      setCategories(catList);

      const catMap = new Map<string, string>();
      for (const cat of catList) {
        catMap.set(cat.id, cat.name);
      }

      const mappedDocs = fileList.map((f) =>
        mapApiFileToAdminDoc(f, catMap, attachmentList),
      );
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
    doc: Omit<AdminDocument, "id" | "publishedAt"> & {
      file?: File;
      attachmentFile?: File;
      attachmentFiles?: File[];
      attachmentPayloads?: AttachmentUploadPayload[];
    },
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

        const uploaded = await uploadFileApi({
          fileName: doc.title || doc.file.name,
          description: doc.description,
          contentType: doc.file.type || "application/octet-stream",
          contentBase64,
          categoryId,
          published: doc.status === "published",
        });

        // Collect all attachment payloads
        const payloads: AttachmentUploadPayload[] = doc.attachmentPayloads
          ? [...doc.attachmentPayloads]
          : [];

        if (payloads.length === 0) {
          const files = doc.attachmentFiles || (doc.attachmentFile ? [doc.attachmentFile] : []);
          for (const f of files) {
            payloads.push({ file: f });
          }
        }

        if (uploaded?.id && payloads.length > 0) {
          for (const p of payloads) {
            const attBase64 = await fileToBase64(p.file);
            await uploadAttachmentApi({
              documentId: uploaded.id,
              fileName: p.file.name,
              description: p.description,
              contentType: p.file.type || "application/pdf",
              contentBase64: attBase64,
              issuerName: p.issuerName,
              issuerDoc: p.issuerDoc,
              invoiceNumber: p.invoiceNumber,
              amount: p.amount,
              issueDate: p.issueDate,
              expenseType: p.expenseType,
            });
          }
        }

        await loadData();
        return;
      } catch (error) {
        console.error("Erro ao fazer upload na API:", error);
      }
    }

    const localAtts: DocumentAttachment[] = (
      doc.attachmentPayloads?.map((p) => p.file) ||
      doc.attachmentFiles ||
      (doc.attachmentFile ? [doc.attachmentFile] : [])
    ).map((f, i) => ({
      id: String(Date.now() + i + 1),
      documentId: String(Date.now()),
      name: f.name,
      fileType: mapFileType(f.type, f.name),
      fileSize: formatBytes(f.size),
      createdAt: new Date().toLocaleDateString("pt-BR"),
    }));

    setDocuments((prev) => [
      {
        ...doc,
        id: String(Date.now()),
        publishedAt: new Date().toLocaleDateString("pt-BR"),
        attachments: localAtts,
      },
      ...prev,
    ]);
  }

  async function updateDocument(
    id: string,
    docData: Partial<AdminDocument>,
    newAttachmentFiles?: File[],
    newAttachmentPayloads?: AttachmentUploadPayload[],
  ) {
    try {
      let categoryId: string | undefined;
      if (docData.category) {
        categoryId = categories.find((c) => c.name === docData.category)?.id;
      }

      await updateFileApi(id, {
        fileName: docData.title,
        description: docData.description,
        categoryId,
        published:
          docData.status !== undefined
            ? docData.status === "published"
            : undefined,
      });

      const payloads: AttachmentUploadPayload[] = newAttachmentPayloads
        ? [...newAttachmentPayloads]
        : (newAttachmentFiles || []).map((f) => ({ file: f }));

      if (payloads.length > 0) {
        for (const p of payloads) {
          const contentBase64 = await fileToBase64(p.file);
          await uploadAttachmentApi({
            documentId: id,
            fileName: p.file.name,
            description: p.description,
            contentType: p.file.type || "application/pdf",
            contentBase64,
            issuerName: p.issuerName,
            issuerDoc: p.issuerDoc,
            invoiceNumber: p.invoiceNumber,
            amount: p.amount,
            issueDate: p.issueDate,
            expenseType: p.expenseType,
          });
        }
      }

      await loadData();
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, ...docData } : d)),
      );
    }
  }

  async function addAttachment(
    documentId: string,
    fileInput: File | File[] | AttachmentUploadPayload | AttachmentUploadPayload[],
  ) {
    try {
      const inputs = Array.isArray(fileInput) ? fileInput : [fileInput];
      for (const item of inputs) {
        const isPayload = "file" in item && item.file instanceof File;
        const file = isPayload ? (item as AttachmentUploadPayload).file : (item as File);
        const payload = isPayload ? (item as AttachmentUploadPayload) : null;

        const contentBase64 = await fileToBase64(file);
        await uploadAttachmentApi({
          documentId,
          fileName: file.name,
          description: payload?.description,
          contentType: file.type || "application/pdf",
          contentBase64,
          issuerName: payload?.issuerName,
          issuerDoc: payload?.issuerDoc,
          invoiceNumber: payload?.invoiceNumber,
          amount: payload?.amount,
          issueDate: payload?.issueDate,
          expenseType: payload?.expenseType,
        });
      }
      await loadData();
    } catch (error) {
      console.error("Erro ao adicionar anexo:", error);
    }
  }

  async function updateAttachment(
    attachmentId: string,
    data: Partial<AttachmentUploadPayload>,
  ) {
    try {
      await updateAttachmentApi(attachmentId, {
        fileName: data.file?.name,
        description: data.description,
        issuerName: data.issuerName,
        issuerDoc: data.issuerDoc,
        invoiceNumber: data.invoiceNumber,
        amount: data.amount,
        issueDate: data.issueDate,
        expenseType: data.expenseType,
      });
      await loadData();
    } catch (error) {
      console.error("Erro ao atualizar anexo:", error);
    }
  }

  async function deleteAttachment(attachmentId: string) {
    try {
      await deleteAttachmentApi(attachmentId);
      await loadData();
    } catch (error) {
      console.error("Erro ao remover anexo:", error);
    }
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
        updateDocument,
        deleteDocument,
        toggleStatus,
        addAttachment,
        updateAttachment,
        deleteAttachment,
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
