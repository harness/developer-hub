// import React from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import DocVideo from "@site/src/components/DocVideo";
import CTABanner from "@site/src/components/CTABanner";
import DocImage from "@site/src/components/DocImage";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import DocsButton from "../components/DocsButton";
import DocsTag from "../components/DocsTag";
import Telemetry from "../components/Telemetry";
import HarnessApiData from "../components/HarnessApiData";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "highlight" tag to our <Highlight /> component!
  // `Highlight` will receive all props that were passed to `highlight` in MDX
  DocVideo: DocVideo,
  CTABanner: CTABanner,
  DocImage: DocImage,
  Accordion: Accordion,
  DocsButton: DocsButton,
  DocsTag: DocsTag,
  Telemetry: Telemetry,
  HarnessApiData: HarnessApiData,
};
