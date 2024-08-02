import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { AnalyticsBrowser } from "@segment/analytics-next";

interface TelemetryProps {
  event: string;
  [key: string]: string;
}

const Telemetry: React.FC<TelemetryProps> = ({ event, ...props }) => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

useEffect(() => {
  const analytics = AnalyticsBrowser.load({
    writeKey: customFields.SEGMENT_API_KEY as string,
  });
  analytics.track(event, props);
}, [event, props]);
  return <></>;
};

export default Telemetry;

// usage
// <Telemetry event ="event1" property_a = "property_a" property_x = "property_x" />
// <Telemetry event ="event2" property_w ="property_w" property_y ="property_y" />
