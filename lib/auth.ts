export interface AuthUser {
  name: string;
  email: string;
}

const AUTH_KEY = "mock_auth_user";

export function setUser(user: AuthUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearUser(): void {
  localStorage.removeItem(AUTH_KEY);
}
