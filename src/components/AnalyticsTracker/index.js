import { useEffect } from "react";
import { trackEvent } from "../../utils/dbdevopsTracking";

export default function AnalyticsTracker() {
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";

    // Test event to confirm tracker is loaded
    if (isDev) console.log("[Analytics] Tracker initialized on:", window.location.pathname);
    trackEvent("Analytics Tracker Loaded");

    //
    // TIME ON PAGE TRACKING
    //
    const pageLoadTime = Date.now();

    const trackTimeOnPage = () => {
      const timeSpentSeconds = Math.floor((Date.now() - pageLoadTime) / 1000);
      if (isDev) console.log(`[Analytics] Time on page: ${timeSpentSeconds}s`);
      trackEvent("Page Time Spent", {
        time_seconds: timeSpentSeconds,
        time_minutes: Math.floor(timeSpentSeconds / 60)
      });
    };

    // Track time on page when user leaves (navigation or close)
    const handleBeforeUnload = () => {
      trackTimeOnPage();
    };

    const handleRouteWillChange = () => {
      trackTimeOnPage();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    if (typeof window !== "undefined") {
      window.addEventListener("routeWillUpdate", handleRouteWillChange);
    }

    //
    // SEARCH TRACKING
    //
    const handleSearchFocus = (e) => {
      const el = e.target;

      if (isDev) {
        console.log("[Analytics] Focus event:", {
          tag: el.tagName,
          placeholder: el.placeholder,
          className: el.className,
          id: el.id
        });
      }

      if (
        el.tagName === "INPUT" &&
        (el.placeholder?.toLowerCase().includes("search") ||
         el.className?.includes("search") ||
         el.getAttribute("aria-label")?.toLowerCase().includes("search"))
      ) {
        if (isDev) console.log("[Analytics] Search Opened tracked");
        trackEvent("Search Opened");
      }
    };

    //
    // SEARCH QUERY TRACKING
    //
    const handleSearchEnter = (e) => {
      const el = e.target;

      if (
        el.tagName === "INPUT" &&
        (el.placeholder?.toLowerCase().includes("search") ||
         el.className?.includes("search") ||
         el.getAttribute("aria-label")?.toLowerCase().includes("search")) &&
        e.key === "Enter"
      ) {
        if (isDev) console.log("[Analytics] Search Performed tracked:", el.value);
        trackEvent("Search Performed", {
          query: el.value,
          query_length: el.value?.length || 0,
          search_from_page: window.location.pathname
        });
      }
    };

    //
    // ASK AI TRACKING (Kapa.ai widget)
    //
    const handleAskAIClick = (e) => {
      const button = e.target.closest("button");

      if (isDev && button) {
        console.log("[Analytics] Button clicked:", {
          text: button.innerText,
          className: button.className,
          ariaLabel: button.getAttribute("aria-label")
        });
      }

      if (
        button &&
        (button.innerText?.toLowerCase().includes("ask") ||
         button.innerText?.toLowerCase().includes("ai") ||
         button.className?.includes("kapa") ||
         button.getAttribute("aria-label")?.toLowerCase().includes("ai"))
      ) {
        if (isDev) console.log("[Analytics] Ask AI Opened tracked");
        trackEvent("Ask AI Opened", {
          button_text: button.innerText?.trim() || button.getAttribute("aria-label"),
          button_class: button.className
        });
      }
    };

    //
    // SCROLL TRACKING
    //
    let tracked20 = false;
    let tracked50 = false;
    let tracked90 = false;

    const resetScrollFlags = () => {
      tracked20 = false;
      tracked50 = false;
      tracked90 = false;
      if (isDev) console.log("[Analytics] Scroll flags reset for new page");
    };

    let lastLogTime = 0;
    const handleScroll = () => {
      // Use documentElement instead of body for accurate scroll height in Docusaurus
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercent = (scrollTop + clientHeight) / scrollHeight;

      // Throttle debug logs to every 500ms
      const now = Date.now();
      if (isDev && now - lastLogTime > 500) {
        lastLogTime = now;
        console.log("[Analytics] Scroll debug:", {
          scrollPercent: (scrollPercent * 100).toFixed(1) + "%",
          flags: { tracked20, tracked50, tracked90 }
        });
      }

      if (scrollPercent > 0.2 && !tracked20) {
        tracked20 = true;
        if (isDev) console.log("[Analytics] 🎯 Docs Scrolled 20 tracked");
        trackEvent("Docs Scrolled 20");
      }

      if (scrollPercent > 0.5 && !tracked50) {
        tracked50 = true;
        if (isDev) console.log("[Analytics] 🎯 Docs Scrolled 50 tracked");
        trackEvent("Docs Scrolled 50");
      }

      if (scrollPercent > 0.9 && !tracked90) {
        tracked90 = true;
        if (isDev) console.log("[Analytics] 🎯 Docs Scrolled 90 tracked");
        trackEvent("Docs Scrolled 90");
      }
    };

    // Reset scroll tracking on route change (Docusaurus SPA navigation)
    const handleRouteChange = () => {
      resetScrollFlags();
    };

    // Listen for Docusaurus route updates
    if (typeof window !== "undefined") {
      window.addEventListener("routeDidUpdate", handleRouteChange);
    }

    //
    // COPY TRACKING (Code blocks)
    //
    const handleCopyClick = (e) => {
      const button = e.target.closest("button");

      if (isDev && button) {
        console.log("[Analytics] Potential copy button:", {
          className: button.className,
          title: button.title,
          ariaLabel: button.getAttribute("aria-label")
        });
      }

      if (
        button &&
        (button.className?.toLowerCase().includes("copy") ||
         button.title?.toLowerCase().includes("copy") ||
         button.getAttribute("aria-label")?.toLowerCase().includes("copy"))
      ) {
        // Find position of this copy button on the page
        const allCopyButtons = document.querySelectorAll(
          'button[class*="copy" i], button[title*="copy" i], button[aria-label*="copy" i]'
        );
        const buttonPosition = Array.from(allCopyButtons).indexOf(button) + 1;

        if (isDev) console.log("[Analytics] Code Block Copied tracked");
        trackEvent("Code Block Copied", {
          button_position: buttonPosition,
          total_copy_buttons: allCopyButtons.length
        });
      }
    };

    //
    // CTA TRACKING (Call-to-Action buttons and links)
    //
    const handleCTAClick = (e) => {
      const link = e.target.closest("a");
      const button = e.target.closest("button");

      const element = link || button;
      if (!element) return;

      const text = element.innerText?.trim() || element.textContent?.trim();
      const href = link?.href;
      const className = element.className || "";
      const title = element.title || "";
      const ariaLabel = element.getAttribute("aria-label") || "";

      // Skip elements already tracked by specific handlers
      const isAlreadyTracked =
        className.toLowerCase().includes("copy") ||
        title.toLowerCase().includes("copy") ||
        ariaLabel.toLowerCase().includes("copy") ||
        ariaLabel.toLowerCase().includes("ai") ||
        text?.toLowerCase().includes("ask") ||
        className.toLowerCase().includes("kapa");

      if (isAlreadyTracked) {
        return; // Don't double-track
      }

      if (isDev) {
        console.log("[Analytics] Click on element:", {
          tag: element.tagName,
          text,
          href,
          className
        });
      }

      // Track CTAs based on common patterns
      const isCTA =
        className.toLowerCase().includes("cta") ||
        className.toLowerCase().includes("button") ||
        className.toLowerCase().includes("btn") ||
        text?.toLowerCase().includes("get started") ||
        text?.toLowerCase().includes("sign up") ||
        text?.toLowerCase().includes("try") ||
        text?.toLowerCase().includes("learn more") ||
        text?.toLowerCase().includes("documentation") ||
        text?.toLowerCase().includes("tutorial");

      if (isCTA) {
        if (isDev) console.log("[Analytics] CTA Clicked tracked");
        trackEvent("CTA Clicked", {
          cta_text: text,
          cta_url: href || "button",
          cta_type: link ? "link" : "button"
        });
      }

      // Track external links
      if (link && href && !href.includes(window.location.hostname)) {
        if (isDev) console.log("[Analytics] External Link Clicked tracked");
        trackEvent("External Link Clicked", {
          url: href,
          link_text: text
        });
      }
    };

    //
    // REGISTER LISTENERS
    //
    document.addEventListener(
      "focusin",
      handleSearchFocus
    );

    document.addEventListener(
      "keydown",
      handleSearchEnter
    );

    document.addEventListener(
      "click",
      handleAskAIClick
    );

    document.addEventListener(
      "click",
      handleCopyClick
    );

    document.addEventListener(
      "click",
      handleCTAClick
    );

    // Check initial scroll position (for restored scroll on page load)
    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    //
    // CLEANUP
    //
    return () => {
      document.removeEventListener(
        "focusin",
        handleSearchFocus
      );

      document.removeEventListener(
        "keydown",
        handleSearchEnter
      );

      document.removeEventListener(
        "click",
        handleAskAIClick
      );

      document.removeEventListener(
        "click",
        handleCopyClick
      );

      document.removeEventListener(
        "click",
        handleCTAClick
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );

      if (typeof window !== "undefined") {
        window.removeEventListener(
          "routeDidUpdate",
          handleRouteChange
        );
        window.removeEventListener(
          "routeWillUpdate",
          handleRouteWillChange
        );
      }
    };
  }, []);

  return null;
}