import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/* =========================
   Types
========================= */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

/* =========================
   Helpers
========================= */

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    credentials: "include", // important for auth cookies
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Something went wrong");
  }

  return res.json();
}

/* =========================
   Queries
========================= */

// Get logged-in user
export function useMe() {
  return useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: () => fetcher<User>("/auth/me"),
    retry: false,
  });
}

/* =========================
   Mutations
========================= */

// Login
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      fetcher<User>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      // refetch user after login
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

// Register
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      fetcher<User>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}

// Logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher<void>("/auth/logout", {
        method: "POST",
      }),

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
    },
  });
}
