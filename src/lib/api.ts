const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: res.statusText }));
    
    let errorMessage = data.error ?? "Request failed";
    if (data.issues && Array.isArray(data.issues)) {
      const issuesText = data.issues.map((i: any) => `${i.field}: ${i.message}`).join(" | ");
      errorMessage = `${errorMessage} (${issuesText})`;
    }
    
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}

// ─── Reflection ───────────────────────────────────────────────────────────────

export interface SubmitReflectionPayload {
  name: string;
  email: string;
  linkedin?: string;
  college: string;
  graduationYear: number;
  company: string;
  role: string;
  answers: { questionKey: string; answer: string }[];
  wantsResearchUpdates: boolean;
  wantsConversation: boolean;
  wantsMentoring: boolean;
  anythingElse?: string;
  completionTime: number;
}

export interface SubmitReflectionResponse {
  success: boolean;
  reflectionId: string;
  message: string;
}

export const api = {
  submitReflection: (payload: SubmitReflectionPayload) =>
    request<SubmitReflectionResponse>("/reflection", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  // ─── Admin ──────────────────────────────────────────────────────────────────

  adminLogin: (email: string, password: string) =>
    request<{ success: boolean; email: string }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  adminLogout: () =>
    request<{ success: boolean }>("/admin/logout", { method: "POST" }),

  adminMe: () =>
    request<{ admin: { adminId: string; email: string } }>("/admin/me"),

  getReflections: (params?: { page?: number; limit?: number; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.page)   qs.set("page",   String(params.page));
    if (params?.limit)  qs.set("limit",  String(params.limit));
    if (params?.search) qs.set("search", params.search);
    return request<{
      data: AdminReflection[];
      meta: { total: number; page: number; limit: number; pages: number };
    }>(`/admin/reflections?${qs}`);
  },

  getReflectionById: (id: string) =>
    request<AdminReflectionDetail>(`/admin/reflection/${id}`),

  exportCsvUrl: () => `${BASE_URL}/admin/reflections/export`,
};

// ─── Admin types ─────────────────────────────────────────────────────────────

export interface AdminReflection {
  id: string;
  submittedAt: string;
  completionTime: number;
  wantsResearchUpdates: boolean;
  wantsConversation: boolean;
  wantsMentoring: boolean;
  contributor: {
    id: string;
    name: string;
    email: string;
    linkedin: string | null;
    college: string;
    graduationYear: number;
    company: string;
    role: string;
  };
}

export interface AdminReflectionDetail extends AdminReflection {
  anythingElse: string | null;
  answers: {
    id: string;
    questionKey: string;
    answer: string;
    createdAt: string;
  }[];
}
