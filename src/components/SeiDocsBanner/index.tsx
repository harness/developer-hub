import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import "./styles.css";

const SeiDocsBanner: React.FC = () => {
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const [bannerType, setBannerType] = useState<"aidi" | "sei" | null>(null);

  useEffect(() => {
    const isAiDlcInsights =
      location.pathname.startsWith("/docs/ai-dlc-insights");
    
    const isSei =
      location.pathname.startsWith("/docs/software-engineering-insights") ||
      location.pathname.startsWith(
        "/docs/software-engineering-insights/"
      );

    if (!isAiDlcInsights && !isSei) {
      setIsVisible(false);
      return;
    }

    const dismissedKey = isAiDlcInsights
      ? "aidi-banner-dismissed"
      : "sei-banner-dismissed";

    if (localStorage.getItem(dismissedKey) === "true") {
      setIsVisible(false);
      return;
    }

    setBannerType(isAiDlcInsights ? "aidi" : "sei");
    setIsVisible(true);
  }, [location.pathname]);

  const handleDismiss = () => {
    if (!bannerType) return;

    localStorage.setItem(`${bannerType}-banner-dismissed`, "true");
    setIsVisible(false);
  };

  if (!isVisible || !bannerType) {
    return null;
  }

  return (
    <div className={`sei-docs-banner sei-docs-banner-${bannerType}`}>
      <div className="sei-docs-banner-content">
        {bannerType === "aidi" ? (
          <>
            <div className="sei-docs-banner-text">
              <strong>Looking for Software Engineering Insights?</strong>
              <span>
                You're viewing the new AI DLC Insights documentation. Looking
                for the Engineering Insights Classic docs?
              </span>
            </div>

            <Link
              to="/docs/software-engineering-insights"
              className="sei-docs-banner-link"
            >
              View Software Engineering Insights →
            </Link>
          </>
        ) : (
          <>
            <div className="sei-docs-banner-text">
              <strong>AI DLC Insights is now available!</strong>
              <span>
                Harness AI DLC is Harness' engineering insights experience with AI
                engineering analytics and enhanced delivery insights.
              </span>
            </div>

            <Link
              to="/docs/ai-dlc-insights"
              className="sei-docs-banner-link"
            >
              View AI DLC Insights →
            </Link>
          </>
        )}

        <button
          className="sei-docs-banner-close"
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SeiDocsBanner;