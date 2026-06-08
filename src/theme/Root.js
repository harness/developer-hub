import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "@docusaurus/router";
import AnalyticsTracker from "../components/AnalyticsTracker";
import KapaQueryTracker from "../components/KapaQueryTracker";
import { trackEvent } from "../utils/dbdevopsTracking";

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    trackEvent("Docs Page Viewed");
  }, [location.pathname]);

  return (
    <>
      <AnalyticsTracker />
      <KapaQueryTracker />
      {children}
    </>
  );
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};