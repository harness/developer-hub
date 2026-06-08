import { useEffect } from "react";
import { trackEvent } from "../../utils/dbdevopsTracking";

/**
 * Kapa.ai Query Tracker
 *
 * Tracks questions asked to the Kapa.ai "Ask AI" widget using multiple detection methods.
 *
 * Methods (in order of reliability):
 * 1. Kapa API callback (onQuestionAsked) - official API, most reliable
 * 2. PostMessage listener - for iframe-based widgets
 * 3. Network request interception - catch API calls to Kapa backend
 * 4. DOM mutation observer - fallback for non-iframe widgets
 */
export default function KapaQueryTracker() {
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    let mutationObserver = null;

    if (isDev) {
      console.log("[Analytics] Kapa Query Tracker initialized");
    }

    //
    // METHOD 1: Kapa API Callback (Official)
    //
    const setupKapaCallback = () => {
      // Wait for Kapa to be fully initialized
      const checkKapaReady = setInterval(() => {
        if (typeof window.Kapa === "function") {
          clearInterval(checkKapaReady);

          try {
            // Register callback for question submissions
            // Kapa.ai API: https://docs.kapa.ai/integrations/website-widget/javascript-api
            window.Kapa("onQuestionAsked", (data) => {
              const query = data?.question || data?.query || data;

              if (query && typeof query === "string") {
                if (isDev) {
                  console.log("[Analytics] ✅ Kapa query (API callback):", query);
                }

                trackEvent("Ask AI Query Submitted", {
                  query: query.substring(0, 500), // Limit to 500 chars
                  query_length: query.length,
                  widget_type: "kapa",
                  detection_method: "kapa_api_callback",
                });
              }
            });

            if (isDev) {
              console.log("[Analytics] Kapa API callback registered successfully");
            }
          } catch (err) {
            if (isDev) {
              console.warn("[Analytics] Kapa API callback registration failed:", err);
              console.log("[Analytics] Falling back to alternative detection methods");
            }
          }
        }
      }, 100);

      // Stop checking after 10 seconds
      setTimeout(() => clearInterval(checkKapaReady), 10000);
    };

    //
    // METHOD 2: PostMessage Listener (for iframes)
    //
    const handleKapaPostMessage = (event) => {
      // Only process messages from Kapa domains
      if (
        event.origin !== "https://widget.kapa.ai" &&
        event.origin !== "https://api.kapa.ai" &&
        !event.origin.includes("kapa")
      ) {
        return;
      }

      if (event.data && typeof event.data === "object") {
        const { type, query, question, message } = event.data;

        // Kapa.ai may use different message formats
        const possibleQuery = query || question || message;

        if (
          possibleQuery &&
          typeof possibleQuery === "string" &&
          possibleQuery.length > 0
        ) {
          // Check if this looks like a query (not a system message)
          if (
            type?.includes("query") ||
            type?.includes("question") ||
            type?.includes("ask")
          ) {
            if (isDev) {
              console.log("[Analytics] ✅ Kapa query (postMessage):", possibleQuery);
            }

            trackEvent("Ask AI Query Submitted", {
              query: possibleQuery.substring(0, 500),
              query_length: possibleQuery.length,
              widget_type: "kapa",
              detection_method: "postMessage",
            });
          }
        }
      }
    };

    //
    // METHOD 3: Network Request Interception
    //
    const interceptKapaRequests = () => {
      const originalFetch = window.fetch;

      window.fetch = async function (...args) {
        const [resource, config] = args;
        const url = typeof resource === "string" ? resource : resource.url;

        // Check if this is a Kapa API request
        if (url && url.includes("kapa.ai") && url.includes("/query")) {
          try {
            // Try to extract query from request body
            if (config?.body) {
              let body = config.body;

              if (typeof body === "string") {
                try {
                  const parsed = JSON.parse(body);
                  const query = parsed.query || parsed.question || parsed.message;

                  if (query && typeof query === "string") {
                    if (isDev) {
                      console.log("[Analytics] ✅ Kapa query (network intercept):", query);
                    }

                    trackEvent("Ask AI Query Submitted", {
                      query: query.substring(0, 500),
                      query_length: query.length,
                      widget_type: "kapa",
                      detection_method: "network_intercept",
                    });
                  }
                } catch (e) {
                  // Failed to parse body, ignore
                }
              }
            }
          } catch (err) {
            // Ignore errors in interception
          }
        }

        // Call original fetch
        return originalFetch.apply(this, args);
      };

      if (isDev) {
        console.log("[Analytics] Network request interception enabled");
      }
    };

    //
    // METHOD 4: DOM Mutation Observer (Fallback)
    //
    const observeKapaDOM = () => {
      const trackedInputs = new WeakSet();

      mutationObserver = new MutationObserver(() => {
        // Look for Kapa input fields
        const kapaInputs = document.querySelectorAll(
          'div[data-kapa] input[type="text"], ' +
          'div[data-kapa] textarea, ' +
          'iframe[src*="kapa"] + * input, ' +
          'iframe[src*="kapa"] + * textarea, ' +
          '[class*="kapa"] input[type="text"], ' +
          '[class*="kapa"] textarea'
        );

        kapaInputs.forEach((input) => {
          if (!trackedInputs.has(input)) {
            trackedInputs.add(input);

            // Track on Enter key
            input.addEventListener("keydown", (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                const query = input.value?.trim();

                if (query && query.length > 0) {
                  if (isDev) {
                    console.log("[Analytics] ✅ Kapa query (DOM observer):", query);
                  }

                  trackEvent("Ask AI Query Submitted", {
                    query: query.substring(0, 500),
                    query_length: query.length,
                    widget_type: "kapa",
                    detection_method: "dom_observer",
                  });
                }
              }
            });

            // Also track on form submission
            const form = input.closest("form");
            if (form && !trackedInputs.has(form)) {
              trackedInputs.add(form);

              form.addEventListener("submit", (e) => {
                const query = input.value?.trim();

                if (query && query.length > 0) {
                  if (isDev) {
                    console.log("[Analytics] ✅ Kapa query (form submit):", query);
                  }

                  trackEvent("Ask AI Query Submitted", {
                    query: query.substring(0, 500),
                    query_length: query.length,
                    widget_type: "kapa",
                    detection_method: "form_submit",
                  });
                }
              });
            }
          }
        });
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });

      if (isDev) {
        console.log("[Analytics] DOM mutation observer started");
      }
    };

    // Initialize all methods
    setupKapaCallback();
    window.addEventListener("message", handleKapaPostMessage);
    interceptKapaRequests();
    observeKapaDOM();

    // Cleanup
    return () => {
      window.removeEventListener("message", handleKapaPostMessage);
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, []);

  return null;
}

