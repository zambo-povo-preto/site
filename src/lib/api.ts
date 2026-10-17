const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export interface ApiUser {
  id: string;
  name: string;
  email: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export interface ApiFileMetadata {
  id: string;
  name: string;
  description: string | null;
  objectKey: string;
  publicObjectKey: string | null;
  contentType: string;
  size: number;
  categoryId: string | null;
  uploadedBy?: string;
  publishedAt: string | null;
  createdAt: string;
  hasPublicFile?: boolean;
}

export interface ApiAttachmentMetadata {
  id: string;
  documentId: string | null;
  name: string;
  description: string | null;
  objectKey?: string;
  publicObjectKey: string | null;
  contentType: string;
  size: number;
  attachmentType: "invoice" | "document";
  createdAt: string;
  hasPublicFile?: boolean;
  issuerName?: string | null;
  issuerDoc?: string | null;
  cnpj?: string | null;
  invoiceNumber?: string | null;
  amount?: number | null;
  issueDate?: string | null;
  expenseType?: string | null;
  downloadUrl?: string | null;
}

// Token storage helpers
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("zambo_access_token");
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("zambo_refresh_token");
}

export function setTokens(accessToken: string, refreshToken?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("zambo_access_token", accessToken);
  if (refreshToken) {
    localStorage.setItem("zambo_refresh_token", refreshToken);
  }
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("zambo_access_token");
  localStorage.removeItem("zambo_refresh_token");
  localStorage.removeItem("zambo_admin_user");
}

// Custom Fetch Wrapper with automatic token refresh
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const token = getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response = await fetch(url, { ...options, headers });

  // If 401 Unauthorized, try refreshing token once
  if (response.status === 401 && getRefreshToken()) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newToken = getAccessToken();
      if (newToken) {
        headers.Authorization = `Bearer ${newToken}`;
      }
      response = await fetch(url, { ...options, headers });
    }
  }

  if (!response.ok) {
    let errorMessage = `Erro HTTP ${response.status}`;
    try {
      const errorData = (await response.json()) as { message?: string };
      if (errorData?.message) errorMessage = errorData.message;
    } catch {
      // JSON parse failed
    }
    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}

// Authentication API methods
export async function loginApi(email: string, password: string) {
  const data = await apiFetch<{
    message: string;
    user: ApiUser;
    accessToken: string;
    refreshToken: string;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  setTokens(data.accessToken, data.refreshToken);
  if (typeof window !== "undefined") {
    localStorage.setItem("zambo_admin_user", JSON.stringify(data.user));
  }
  return data;
}

export async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const data = (await res.json()) as { accessToken: string };
    setTokens(data.accessToken);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}

// Categories API methods
export async function getCategoriesApi(): Promise<ApiCategory[]> {
  const data = await apiFetch<{ categories: ApiCategory[] }>("/categories");
  return data.categories;
}

// Transparency files API methods
export async function getFilesApi(
  categoryId?: string,
): Promise<ApiFileMetadata[]> {
  const query = categoryId ? `?categoryId=${categoryId}` : "";
  const data = await apiFetch<{ files: ApiFileMetadata[] }>(
    `/transparency/files${query}`,
  );
  return data.files;
}

export async function uploadFileApi(params: {
  fileName: string;
  description?: string;
  contentType: string;
  contentBase64: string;
  categoryId: string;
  published?: boolean;
}): Promise<ApiFileMetadata> {
  const data = await apiFetch<{ file: ApiFileMetadata }>(
    "/transparency/files/upload",
    {
      method: "POST",
      body: JSON.stringify(params),
    },
  );
  return data.file;
}

export async function deleteFileApi(id: string): Promise<void> {
  await apiFetch(`/transparency/files/${id}`, {
    method: "DELETE",
  });
}

export async function updateFileApi(
  id: string,
  params: {
    fileName?: string;
    description?: string;
    categoryId?: string;
    published?: boolean;
    publicObjectKey?: string | null;
  },
): Promise<ApiFileMetadata> {
  const data = await apiFetch<{ file: ApiFileMetadata }>(
    `/transparency/files/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(params),
    },
  );
  return data.file;
}

export async function toggleFileStatusApi(
  id: string,
): Promise<ApiFileMetadata> {
  const data = await apiFetch<{ file: ApiFileMetadata }>(
    `/transparency/files/${id}/status`,
    {
      method: "PATCH",
    },
  );
  return data.file;
}

export function getFileDownloadUrl(id: string): string {
  return `${API_URL}/transparency/files/${id}/download`;
}

export function getFilePreviewUrl(id: string): string {
  return `${API_URL}/transparency/files/${id}/download?inline=true`;
}

// Attachments / Invoices API methods
export async function getAttachmentsApi(options?: {
  documentId?: string;
  searchQuery?: string;
  attachmentType?: "invoice" | "document";
  unlinked?: boolean;
}): Promise<ApiAttachmentMetadata[]> {
  const { documentId, searchQuery, attachmentType, unlinked } = options || {};

  let endpoint = documentId
    ? `/transparency/files/${documentId}/attachments`
    : "/transparency/files/attachments";

  const params = new URLSearchParams();
  if (searchQuery && searchQuery.trim() !== "") {
    params.append("q", searchQuery.trim());
  }
  if (attachmentType) {
    params.append("type", attachmentType);
  }
  if (unlinked) {
    params.append("unlinked", "true");
  }

  const queryStr = params.toString();
  if (queryStr) {
    endpoint += `?${queryStr}`;
  }

  const data = await apiFetch<{ attachments: ApiAttachmentMetadata[] }>(
    endpoint,
  );
  return data.attachments || [];
}

export async function uploadAttachmentApi(params: {
  documentId?: string | null;
  fileName: string;
  description?: string;
  contentType: string;
  contentBase64: string;
  publicContentBase64?: string;
  publicFileName?: string;
  attachmentType?: "invoice" | "document";
  isPublicSafe?: boolean;
  issuerName?: string;
  issuerDoc?: string;
  invoiceNumber?: string;
  amount?: number;
  issueDate?: string;
  expenseType?: string;
}): Promise<ApiAttachmentMetadata> {
  const endpoint = params.documentId
    ? `/transparency/files/${params.documentId}/attachments`
    : "/transparency/files/attachments";

  const data = await apiFetch<{ attachment: ApiAttachmentMetadata }>(
    endpoint,
    {
      method: "POST",
      body: JSON.stringify(params),
    },
  );
  return data.attachment;
}

export async function updateAttachmentApi(
  attachmentId: string,
  params: {
    fileName?: string;
    description?: string;
    documentId?: string | null;
    attachmentType?: "invoice" | "document";
    isPublicSafe?: boolean;
    publicObjectKey?: string | null;
    issuerName?: string;
    issuerDoc?: string;
    invoiceNumber?: string;
    amount?: number;
    issueDate?: string;
    expenseType?: string;
  },
): Promise<ApiAttachmentMetadata> {
  const data = await apiFetch<{ attachment: ApiAttachmentMetadata }>(
    `/transparency/files/attachments/${attachmentId}`,
    {
      method: "PUT",
      body: JSON.stringify(params),
    },
  );
  return data.attachment;
}

export async function linkAttachmentApi(
  attachmentId: string,
  documentId: string | null,
): Promise<ApiAttachmentMetadata> {
  const data = await apiFetch<{ attachment: ApiAttachmentMetadata }>(
    `/transparency/files/attachments/${attachmentId}/link`,
    {
      method: "PATCH",
      body: JSON.stringify({ documentId }),
    },
  );
  return data.attachment;
}

export async function uploadPublicFileApi(params: {
  id?: string;
  attachmentId?: string;
  fileName: string;
  contentType: string;
  contentBase64: string;
}): Promise<void> {
  const endpoint = params.id
    ? `/transparency/files/${params.id}/public-file`
    : `/transparency/files/attachments/${params.attachmentId}/public-file`;

  await apiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      fileName: params.fileName,
      contentType: params.contentType,
      contentBase64: params.contentBase64,
    }),
  });
}

export async function deleteAttachmentApi(
  attachmentId: string,
): Promise<void> {
  await apiFetch(`/transparency/files/attachments/${attachmentId}`, {
    method: "DELETE",
  });
}

export function getAttachmentDownloadUrl(attachmentId: string): string {
  return `${API_URL}/transparency/files/attachments/${attachmentId}/download`;
}

export function getAttachmentPreviewUrl(attachmentId: string): string {
  return `${API_URL}/transparency/files/attachments/${attachmentId}/download?inline=true`;
}
