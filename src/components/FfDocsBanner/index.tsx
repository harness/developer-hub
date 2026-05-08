import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import "./styles.css";

const FfDocsBanner: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetPaths = ["/docs/feature-flags", "/release-notes/feature-flags"];
    const isTargetPage = targetPaths.some((path) => location.pathname.startsWith(path));

    if (!isTargetPage) {
      setIsVisible(false);
      return;
    }

    const isDismissed = (() => {
      try {
        return localStorage.getItem("ff-banner-dismissed") === "true";
      } catch {
        return false;
      }
    })();

    setIsVisible(!isDismissed);
  }, [location.pathname]);

  const handleDismiss = () => {
    try {
      localStorage.setItem("ff-banner-dismissed", "true");
      setIsVisible(false);
    } catch (e) {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fme-docs-banner">
      <div className="fme-docs-banner-content">
        <div className="fme-docs-banner-text">
          <strong>
            New Feature Management & Experimentation (FME) Documentation Available
          </strong>
          <span>
            We've launched new Feature Management & Experimentation docs
            covering Feature Management, Release Monitoring, Cloud Experimentation, 
            Warehouse Native Experimentation, and Harness AI.
          </span>
        </div>

        <Link
          to="/docs/feature-management-experimentation/getting-started/overview"
          className="fme-docs-banner-link"
        >
          View New Docs →
        </Link>

        <button
          className="fme-docs-banner-close"
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default FfDocsBanner;
