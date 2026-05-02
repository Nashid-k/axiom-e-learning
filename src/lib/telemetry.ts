export type TelemetryEvent =
  | "search_opened"
  | "search_result_opened"
  | "maya_message_sent"
  | "maya_message_sent_revamp"
  | "maya_message_sent_air"
  | "maya_response_completed"
  | "maya_response_completed_revamp"
  | "maya_response_completed_air"
  | "maya_response_failed"
  | "quiz_started"
  | "quiz_completed"
  | "progress_sync_succeeded"
  | "progress_sync_failed";

export function trackEvent(
  event: TelemetryEvent,
  payload: Record<string, string | number | boolean | null | undefined> = {}
) {
  if (typeof window === "undefined") return;

  try {
    const detail = {
      event,
      payload,
      ts: Date.now(),
      path: window.location.pathname,
    };

    window.dispatchEvent(new CustomEvent("axiom:telemetry", { detail }));

    if (process.env.NODE_ENV !== "production") {
      console.info("[telemetry]", detail);
    }
  } catch {
  }
}
