import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import "./styles.css";

const ThreeKDocsBanner: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const pathname = location.pathname;
  const is3kDocs = pathname.startsWith("/3k-docs");

  useEffect(() => {
    const isTargetPage =
      pathname.startsWith("/docs") || pathname.startsWith("/3k-docs");

    if (!isTargetPage) {
      setIsVisible(false);
      return;
    }

    const isDismissed = (() => {
      try {
        return localStorage.getItem("3k-docs-banner-dismissed") === "true";
      } catch {
        return false;
      }
    })();

    setIsVisible(!isDismissed);
  }, [pathname]);

  const handleDismiss = () => {
    try {
      localStorage.setItem("3k-docs-banner-dismissed", "true");
    } finally {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="threek-docs-banner">
      <div className="threek-docs-banner-content">
        <div className="threek-docs-banner-text">
          <strong>
            {is3kDocs
              ? "👀 You're viewing the 3K Docs preview experience"
              : "📣 Harness 3.0 Documentation is in preview!"}
          </strong>

          <span>
            {is3kDocs
              ? "This is an early AI-first documentation experience designed for exploration and rapid iteration. It may change frequently and does not represent a final product commitment. You can switch back to standard docs anytime. We welcome feedback from early users."
              : "We're testing a new AI-first documentation experience with redesigned navigation and onboarding flows to improve discoverability and speed of onboarding. This experience is actively evolving based on feedback."}
          </span>
        </div>

        <Link
          to={is3kDocs ? "/docs" : "/3k-docs"}
          className="threek-docs-banner-link"
        >
          {is3kDocs ? "Switch to Standard Docs →" : "Try 3.0 Docs →"}
        </Link>

        <button
          className="threek-docs-banner-close"
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ThreeKDocsBanner;