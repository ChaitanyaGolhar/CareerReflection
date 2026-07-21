import { create } from "zustand";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReflectionAnswer {
  questionKey: string;
  answer: string;
}

export interface ReflectionState {
  // Chapter 1
  name: string;
  email: string;
  linkedin: string;
  college: string;
  graduationYear: string;
  company: string;
  role: string;

  // Chapter 2–4 answers
  answers: Record<string, string>;

  // Chapter 5
  wantsResearchUpdates: boolean;
  wantsConversation: boolean;
  wantsMentoring: boolean;
  anythingElse: string;

  // Meta
  startedAt: number | null;
  currentChapter: number;
  currentQuestion: number;

  // Actions
  setField: (key: string, value: string) => void;
  setAnswer: (questionKey: string, answer: string) => void;
  setOptIn: (key: "wantsResearchUpdates" | "wantsConversation" | "wantsMentoring", value: boolean) => void;
  setAnythingElse: (value: string) => void;
  setChapter: (chapter: number) => void;
  setQuestion: (question: number) => void;
  startTimer: () => void;
  getElapsedSeconds: () => number;
  reset: () => void;
}

const STORAGE_KEY = "career-reflection-draft";

function loadFromStorage(): Partial<ReflectionState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(state: Partial<ReflectionState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

const saved = loadFromStorage();

export const useReflectionStore = create<ReflectionState>((set, get) => ({
  name: saved.name ?? "",
  email: saved.email ?? "",
  linkedin: saved.linkedin ?? "",
  college: saved.college ?? "",
  graduationYear: saved.graduationYear ?? "",
  company: saved.company ?? "",
  role: saved.role ?? "",
  answers: saved.answers ?? {},
  wantsResearchUpdates: saved.wantsResearchUpdates ?? false,
  wantsConversation: saved.wantsConversation ?? false,
  wantsMentoring: saved.wantsMentoring ?? false,
  anythingElse: saved.anythingElse ?? "",
  startedAt: saved.startedAt ?? null,
  currentChapter: saved.currentChapter ?? 1,
  currentQuestion: saved.currentQuestion ?? 0,

  setField: (key, value) => {
    set((s) => {
      const next = { ...s, [key]: value };
      saveToStorage(next);
      return { [key]: value };
    });
  },

  setAnswer: (questionKey, answer) => {
    set((s) => {
      const answers = { ...s.answers, [questionKey]: answer };
      saveToStorage({ ...s, answers });
      return { answers };
    });
  },

  setOptIn: (key, value) => {
    set((s) => {
      const next = { ...s, [key]: value };
      saveToStorage(next);
      return { [key]: value };
    });
  },

  setAnythingElse: (value) => {
    set((s) => {
      saveToStorage({ ...s, anythingElse: value });
      return { anythingElse: value };
    });
  },

  setChapter: (chapter) => {
    set((s) => {
      saveToStorage({ ...s, currentChapter: chapter });
      return { currentChapter: chapter };
    });
  },

  setQuestion: (question) => {
    set((s) => {
      saveToStorage({ ...s, currentQuestion: question });
      return { currentQuestion: question };
    });
  },

  startTimer: () => {
    const s = get();
    if (s.startedAt === null) {
      const now = Date.now();
      set({ startedAt: now });
      saveToStorage({ ...s, startedAt: now });
    }
  },

  getElapsedSeconds: () => {
    const { startedAt } = get();
    if (!startedAt) return 0;
    return Math.round((Date.now() - startedAt) / 1000);
  },

  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      name: "", email: "", linkedin: "", college: "",
      graduationYear: "", company: "", role: "",
      answers: {}, wantsResearchUpdates: false, wantsConversation: false,
      wantsMentoring: false, anythingElse: "",
      startedAt: null, currentChapter: 1, currentQuestion: 0,
    });
  },
}));
