import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "@docusaurus/router";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { trackEvent } from "../utils/dbdevopsTracking";
import KapaQueryTracker from "../components/KapaQueryTracker";

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