export interface AdminUser {
  email: string;
  name: string;
}

export interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => void;
}
