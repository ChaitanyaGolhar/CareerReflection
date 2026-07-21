import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST ?? "https://app.posthog.com";

let initialized = false;

export function initAnalytics() {
  if (!POSTHOG_KEY || POSTHOG_KEY === "your-posthog-key-here") return;
  posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST, autocapture: false });
  initialized = true;
}

type EventName =
  | "landing_viewed"
  | "reflection_started"
  | "chapter_started"
  | "question_answered"
  | "question_skipped"
  | "reflection_completed"
  | "exit_before_completion"
  | "conversation_opted_in"
  | "research_update_opted_in";

export function track(event: EventName, properties?: Record<string, unknown>) {
  if (initialized) {
    posthog.capture(event, properties);
  } else {
    // Development: log to console
    console.log(`[Analytics] ${event}`, properties ?? {});
  }
}
