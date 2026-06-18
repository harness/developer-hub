import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import mixpanelLib from "mixpanel-browser";

export function getSessionId() {
  if (typeof sessionStorage === "undefined") return null;
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
}

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      if (!window.__MIXPANEL_INITIALIZED__) {
        window.mixpanel = mixpanelLib;
        window.getAnalyticsSessionId = getSessionId;

        const token = window.__MIXPANEL_TOKEN__;

        if (token && token.length > 0) {
          try {
            mixpanelLib.init(token, {
              debug: false,
              track_pageview: "full-url",
              persistence: "localStorage",
              autocapture: false,
              record_sessions_percent: 2,
            });

            window.__MIXPANEL_INITIALIZED__ = true;
          } catch (e) {
            // Silent failure - token might be invalid or Mixpanel unavailable
          }
        }
      }
    },
  };
})();
