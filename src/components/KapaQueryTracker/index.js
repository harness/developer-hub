import { useEffect } from "react";
import { trackEvent } from "../../utils/dbdevopsTracking";

/**
 * Kapa.ai Query Tracker
 *
 * Tracks questions asked to the Kapa.ai "Ask AI" widget using multiple detection methods.
 *
 * Methods (in order of reliability):
 * 1. Kapa API callback (onAskAIQuerySubmit) - official API, most reliable
 * 2. PostMessage listener - for iframe-based widgets
 * 3. Network request interception - catch API calls to Kapa backend
 * 4. DOM mutation observer - fallback for non-iframe widgets
 */
export default function KapaQueryTracker() {
  useEffect(() => {
    let mutationObserver = null;
    let checkKapaReady;
    let stopCheckingTimeout;
    let domCheckInterval;
    let domCheckStopTimeout;
    let kapaQueryHandler = null;
    const setupKapaCallback = () => {
      // Wait for Kapa to be fully initialized
      checkKapaReady = setInterval(() => {
        if (typeof window.Kapa === "function") {
          clearInterval(checkKapaReady);

          try {
            // Register callback for question submissions.
            // Kapa event API: https://docs.kapa.ai/integrations/website-widget/javascript-api/events           
            const handler = (data = {}) => {
              const question = data.question || data.query;
              if (question && typeof question === "string") {
                trackEvent("Ask AI Query Submitted", {
                  query: question.substring(0, 500), // Limit to 500 chars
                  query_length: question.length,
                  widget_type: "kapa",
                  detection_method: "kapa_api_callback",
                });
              }
            };
            window.Kapa("onAskAIQuerySubmit", handler);
            kapaQueryHandler = handler;
          } catch (err) {
            // Silently fall back to alternative detection methods.
          }
        }
      }, 100);
      stopCheckingTimeout = setTimeout(() => clearInterval(checkKapaReady), 10000);
    };

    const handleKapaPostMessage = (event) => {
      if (
        event.origin !== "https://widget.kapa.ai" &&
        event.origin !== "https://api.kapa.ai" &&
        !event.origin.includes("kapa")
      ) {
        return;
      }

      if (event.data && typeof event.data === "object") {
        const { type, query, question, message } = event.data;
        const possibleQuery = query || question || message;

        if (
          possibleQuery &&
          typeof possibleQuery === "string" &&
          possibleQuery.length > 0
        ) {
          if (
            type?.includes("query") ||
            type?.includes("question") ||
            type?.includes("ask")
          ) {
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

    let originalFetch = null;

    const interceptKapaRequests = () => {
      originalFetch = window.fetch;

      window.fetch = async function (...args) {
        const [resource, config] = args;
        const url = typeof resource === "string" ? resource : resource.url;

        if (url && (url.includes("kapa.ai") || url.includes("kapa-widget-proxy")) && (url.includes("/query") || url.includes("/chat"))) {
          try {
            if (config?.body && typeof config.body === "string") {
              try {
                const parsed = JSON.parse(config.body);
                const query = parsed.query || parsed.question || parsed.message;

                if (query && typeof query === "string") {
                  trackEvent("Ask AI Query Submitted", {
                    query: query.substring(0, 500),
                    query_length: query.length,
                    widget_type: "kapa",
                    detection_method: "network_intercept",
                  });
                }
              } catch (e) {
              }
            }
          } catch (err) {
          }
        }
        return originalFetch.apply(this, args);
      };
    };

    const observeKapaDOM = () => {
      const trackedInputs = new WeakSet();

      const attachInputTracking = (input) => {
        if (trackedInputs.has(input)) return;
        trackedInputs.add(input);

        // Track on Enter key
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            const query = input.value?.trim();

            if (query && query.length > 0) {
              trackEvent("Ask AI Query Submitted", {
                query: query.substring(0, 500),
                query_length: query.length,
                widget_type: "kapa",
                detection_method: "dom_observer_enter",
              });
            }
          }
        });

        let lastValue = '';
        input.addEventListener("focus", () => {
          lastValue = input.value?.trim() || '';
        });

        input.addEventListener("blur", () => {
          const query = input.value?.trim();
          if (query && query.length > 0 && query !== lastValue) {
            trackEvent("Ask AI Query Submitted", {
              query: query.substring(0, 500),
              query_length: query.length,
              widget_type: "kapa",
              detection_method: "dom_observer_blur",
            });
          }
        });
      };

      const checkForKapaInput = () => {
        const kapaContainer = document.querySelector('#kapa-widget-container');
        if (kapaContainer?.shadowRoot) {
          const shadowInput = kapaContainer.shadowRoot.querySelector('#kapa-ask-ai-input, textarea[placeholder*="Ask"]');
          if (shadowInput) {
            attachInputTracking(shadowInput);
          }
        }

        const kapaInputs = document.querySelectorAll(
          'div[data-kapa] input[type="text"], ' +
          'div[data-kapa] textarea, ' +
          'iframe[src*="kapa"] + * input, ' +
          'iframe[src*="kapa"] + * textarea, ' +
          '[class*="kapa"] input[type="text"], ' +
          '[class*="kapa"] textarea, ' +
          '#kapa-ask-ai-input'
        );

        kapaInputs.forEach(attachInputTracking);
      };

      checkForKapaInput();
      mutationObserver = new MutationObserver(() => {
        checkForKapaInput();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      domCheckInterval = setInterval(checkForKapaInput, 500);
      domCheckStopTimeout = setTimeout(() => clearInterval(domCheckInterval), 10000);
    };

    // Initialize all methods
    setupKapaCallback();
    window.addEventListener("message", handleKapaPostMessage);
    interceptKapaRequests();
    observeKapaDOM();

    // Cleanup
    return () => {
      clearInterval(checkKapaReady);
      clearTimeout(stopCheckingTimeout);
      clearInterval(domCheckInterval);
      clearTimeout(domCheckStopTimeout);
      if (kapaQueryHandler) {
        try {
          // Kapa event listeners are removed by passing the same handler with the "remove" option.
          // The try/catch covers the case where window.Kapa is gone or the widget is unmounted.
          window.Kapa("onAskAIQuerySubmit", kapaQueryHandler, "remove");
        } catch (err) {
          // Ignore — widget may already be unmounted.
        }
      }
      window.removeEventListener("message", handleKapaPostMessage);
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (originalFetch) {
        window.fetch = originalFetch;
      }
    };
  }, []);

  return null;
}

