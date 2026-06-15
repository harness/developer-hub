import { useEffect, useRef } from "react";
import { useLocation } from "@docusaurus/router";
import { trackEvent } from "../../utils/dbdevopsTracking";

export default function AnalyticsTracker() {
  const location = useLocation();
  const scrollMilestones = useRef({ tracked20: false, tracked50: false, tracked90: false });

  useEffect(() => {
    // Track page load
    trackEvent("Analytics Tracker Loaded");

    // SEARCH TRACKING
    const handleSearchFocus = (e) => {
      const el = e.target;

      if (
        el.tagName === "INPUT" &&
        (el.placeholder?.toLowerCase().includes("search") ||
         el.className?.includes("search") ||
         el.getAttribute("aria-label")?.toLowerCase().includes("search"))
      ) {
        trackEvent("Search Opened");
      }
    };

    // SEARCH QUERY TRACKING
    const handleSearchEnter = (e) => {
      const el = e.target;

      if (
        el.tagName === "INPUT" &&
        (el.placeholder?.toLowerCase().includes("search") ||
         el.className?.includes("search") ||
         el.getAttribute("aria-label")?.toLowerCase().includes("search")) &&
        e.key === "Enter"
      ) {
        trackEvent("Search Performed", {
          query: el.value
        });
      }
    };

    // ASK AI TRACKING (Kapa)
    const handleAskAIClick = (e) => {
      const button = e.target.closest("button");

      if (
        button &&
        (button.innerText?.toLowerCase().includes("ask") ||
         button.innerText?.toLowerCase().includes("ai") ||
         button.className?.includes("kapa") ||
         button.getAttribute("aria-label")?.toLowerCase().includes("ai"))
      ) {
        trackEvent("Ask AI Opened");
      }
    };

    // SCROLL TRACKING
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY + window.innerHeight) /
        document.body.scrollHeight;

       if (scrollPercent > 0.2 && !scrollMilestones.current.tracked20) {
        scrollMilestones.current.tracked20 = true;
        trackEvent("Docs Scrolled 20");
      }

      if (scrollPercent > 0.5 && !scrollMilestones.current.tracked50) {
        scrollMilestones.current.tracked50 = true;
        trackEvent("Docs Scrolled 50");
      }

      if (scrollPercent > 0.9 && !scrollMilestones.current.tracked90) {
        scrollMilestones.current.tracked90 = true;
        trackEvent("Docs Scrolled 90");
      }
    };

    // COPY TRACKING (Code blocks ideally, but check for all copy code blocks)
    const handleCopyClick = (e) => {
      const button = e.target.closest("button");

      if (
        button &&
        (button.className?.toLowerCase().includes("copy") ||
         button.title?.toLowerCase().includes("copy") ||
         button.getAttribute("aria-label")?.toLowerCase().includes("copy"))
      ) {
        trackEvent("Code Block Copied");
      }
    };

    // CTA TRACKING (CTA buttons and links)
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
        return;
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
        trackEvent("CTA Clicked", {
          cta_text: text,
          cta_url: href || "button",
          cta_type: link ? "link" : "button"
        });
      }

      // Track external links
      if (link && href && !href.includes(window.location.hostname)) {
        trackEvent("External Link Clicked", {
          url: href,
          link_text: text
        });
      }
    };

    // REGISTER LISTENERS
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

    window.addEventListener(
      "scroll",
      handleScroll
    );

    // CLEANUP
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
    };
  }, []);

  // Reset scroll milestones on navigation
  useEffect(() => {
    scrollMilestones.current = { tracked20: false, tracked50: false, tracked90: false };
  }, [location.pathname]);

  return null;
}