const TOKEN_KEY = "frizaski_portfolio_access_token";
const REFRESH_TOKEN_KEY = "frizaski_portfolio_refresh_token";
const USER_KEY = "frizaski_portfolio_user";
const EXPIRY_KEY = "frizaski_portfolio_session_expires_at";
const AUTH_EVENT = "frizaski-auth-change";
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

export interface StoredUser {
  firstName: string;
  lastName: string;
  username: string;
}

function removeStoredSession(): void {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.localStorage.removeItem(EXPIRY_KEY);
}

export function getAuthSessionExpiry(): number | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(EXPIRY_KEY);
  const expiresAt = value ? Number(value) : Number.NaN;

  return Number.isFinite(expiresAt) ? expiresAt : null;
}

export function hasAuthToken(): boolean {
  if (typeof window === "undefined") return false;

  const token = window.localStorage.getItem(TOKEN_KEY);
  const expiresAt = getAuthSessionExpiry();

  if (!token || !expiresAt || expiresAt <= Date.now()) {
    if (token || expiresAt) {
      removeStoredSession();
    }
    return false;
  }

  return true;
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined" || !hasAuthToken()) return null;

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
  window.localStorage.setItem(
    EXPIRY_KEY,
    String(Date.now() + SESSION_DURATION_MS),
  );
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuthSession(): void {
  removeStoredSession();
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
