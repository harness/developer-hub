import mixpanel from "./mixpanel";

// Generate or retrieve session-level ID (resets on browser close)
function getSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session_id');

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }

  return sessionId;
}

// Track event sequence within session
let eventSequence = 0;

export function trackEvent(event, properties = {}) {
  const currentPath = window.location.pathname;
  // eslint-disable-next-line no-undef
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log(`[Analytics] trackEvent called:`, {
      event,
      currentPath,
      isDbDevOpsPath: currentPath.startsWith("/docs/database-devops"),
      properties
    });
  }

  if (!currentPath.startsWith("/docs/database-devops")) {
    if (isDev) {
      console.warn(`[Analytics] ❌ Event "${event}" blocked - not on /docs/database-devops path`);
    }
    return;
  }

  if (isDev) {
    console.log(`[Analytics] ✅ Sending event "${event}" to Mixpanel`);
  }

  // Increment event sequence for this session
  eventSequence++;

  mixpanel.track(event, {
    page_url: window.location.href,
    page_name: document.title,
    pathname: window.location.pathname,
    section: "database-devops",
    session_id: getSessionId(),
    event_sequence: eventSequence,
    timestamp: new Date().toISOString(),
    ...properties
  });
}