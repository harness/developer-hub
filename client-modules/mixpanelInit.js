/**
 * Client module to initialize Mixpanel with the token from Docusaurus config
 * This runs on every page load and ensures Mixpanel is properly initialized
 */

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import mixpanelLib from "mixpanel-browser";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      if (!window.__MIXPANEL_INITIALIZED__) {
        // Expose mixpanel globally for console access
        window.mixpanel = mixpanelLib;

        // Get token from global variable (injected via headTags)
        const token = window.__MIXPANEL_TOKEN__;

        if (token && token.length > 0) {
          try {
            mixpanelLib.init(token, {
              debug: false,
              track_pageview: "full-url",
              persistence: "localStorage",
              autocapture: true,
              record_sessions_percent: 100,
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
