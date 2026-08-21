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
  contentType: string;
  size: number;
  categoryId: string | null;
  uploadedBy: string;
  publishedAt: string | null;
  createdAt: string;
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

