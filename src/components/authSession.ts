const TOKEN_KEY = "frizaski_portfolio_access_token";
const REFRESH_TOKEN_KEY = "frizaski_portfolio_refresh_token";
const USER_KEY = "frizaski_portfolio_user";
const AUTH_EVENT = "frizaski-auth-change";

export interface StoredUser {
  firstName: string;
  lastName: string;
  username: string;
}

export function hasAuthToken(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(TOKEN_KEY));
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(USER_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as StoredUser;
  } catch {
    return null;
  }
}

export function storeAuthSession(
  accessToken: string,
  refreshToken: string | undefined,
  user: StoredUser
): void {
  window.localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuthSession(): void {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function subscribeAuthSession(callback: () => void): () => void {
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
