import mixpanel from "./mixpanel";

const isBrowser = typeof window !== "undefined";

// Check if Mixpanel is properly initialized
function isMixpanelInitialized() {
  if (!isBrowser) return false;

  try {
    return mixpanel && mixpanel.persistence && typeof mixpanel.get_distinct_id === 'function';
  } catch (e) {
    console.warn('[Analytics] Mixpanel not properly initialized:', e);
    return false;
  }
}

// Initialize user tracking
function initializeUser() {
  if (!isBrowser || !isMixpanelInitialized()) return;

  try {
    const distinctId = mixpanel.get_distinct_id();
    if (!distinctId || distinctId.startsWith('$device:')) {
      let userId = localStorage.getItem('mixpanel_user_id');

      if (!userId) {
        userId = `anonymous_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        localStorage.setItem('mixpanel_user_id', userId);
      }
      mixpanel.identify(userId);
      mixpanel.people.set({
        $first_visit: new Date().toISOString(),
        user_type: 'anonymous'
      });
    }
  } catch (e) {
    console.warn('[Analytics] Error initializing user:', e);
  }
}

const TRACKED_MODULES = [
  { path: "/docs/database-devops", section: "database-devops" },
  { path: "/3k-docs/database-devops", section: "database-devops" },
  { path: "/docs/infra-as-code-management", section: "infra-as-code-management" },
  { path: "/docs/release-orchestration", section: "release-orchestration" },
];

function getTrackedModule(pathname) {
  return TRACKED_MODULES.find((m) => pathname.startsWith(m.path)) || null;
}

export function trackEvent(event, properties = {}) {
  if (!isBrowser) return;

  const currentPath = window.location.pathname;
  const module = getTrackedModule(currentPath);

  if (!module) return;

  if (!isMixpanelInitialized()) return;
  initializeUser();

  try {
    const sessionId = typeof window.getAnalyticsSessionId === "function"
      ? window.getAnalyticsSessionId()
      : null;
    mixpanel.track(event, {
      page_url: window.location.href,
      page_name: document.title,
      pathname: window.location.pathname,
      section: module.section,
      ...(sessionId ? { session_id: sessionId } : {}),
      ...properties
    });
  } catch (e) {
    console.warn(`[Analytics] Error tracking event "${event}":`, e);
  }
}

export function identifyUser(userId, userProperties = {}) {
  if (!isBrowser || !isMixpanelInitialized()) return;

  try {
    mixpanel.identify(userId);
    localStorage.setItem('mixpanel_user_id', userId);

    mixpanel.people.set({
      ...userProperties,
      user_type: 'authenticated',
      $last_login: new Date().toISOString()
    });
  } catch (e) {
    console.warn('[Analytics] Error identifying user:', e);
  }
}