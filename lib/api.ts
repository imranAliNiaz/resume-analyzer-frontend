import type { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

const getAuthHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authFetch = async (
  path: string,
  options: RequestInit,
  getState: () => RootState,
  dispatch: AppDispatch,
) => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const authHeaders = getAuthHeaders();
  Object.entries(authHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    dispatch(logout());
  }

  return response;
};

export const authFetchMultipart = async (
  path: string,
  options: RequestInit,
  getState: () => RootState,
  dispatch: AppDispatch,
) => {
  const headers = new Headers(options.headers);

  const authHeaders = getAuthHeaders();
  Object.entries(authHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const response = await fetch(apiUrl(path), {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    dispatch(logout());
  }

  return response;
};
