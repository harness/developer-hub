// import React from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";
import DocVideo from "@site/src/components/DocVideo";
import CTABanner from "@site/src/components/CTABanner";
import DocImage from "@site/src/components/DocImage";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import DocsButton from "../components/DocsButton";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "highlight" tag to our <Highlight /> component!
  // `Highlight` will receive all props that were passed to `highlight` in MDX
  docvideo: DocVideo,
  ctabanner: CTABanner,
  docimage: DocImage,
  accordion: Accordion,
  DocsButton: DocsButton,
};
