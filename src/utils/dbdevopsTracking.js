import mixpanel from "./mixpanel";

const isBrowser = typeof window !== "undefined";

// Check if Mixpanel is properly initialized
function isMixpanelInitialized() {
  if (!isBrowser) return false;

  try {
    // Check if Mixpanel has been initialized by verifying the persistence object exists
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
      // Generate or retrieve a persistent user ID
      let userId = localStorage.getItem('mixpanel_user_id');

      if (!userId) {
        // Create a new anonymous user ID
        userId = `anonymous_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        localStorage.setItem('mixpanel_user_id', userId);
      }

      // Identify the user in Mixpanel
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

export function trackEvent(event, properties = {}) {
  if (!isBrowser) return;

  const currentPath = window.location.pathname;

  if (!currentPath.startsWith("/docs/database-devops")) {
    return;
  }

  if (!isMixpanelInitialized()) {
    return;
  }
  initializeUser();

  try {
    mixpanel.track(event, {
      page_url: window.location.href,
      page_name: document.title,
      pathname: window.location.pathname,
      section: "database-devops",
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