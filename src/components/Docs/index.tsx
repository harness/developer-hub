import React from "react";
import { useLocation } from "@docusaurus/router";

import LegacyDocsHome from "./LegacyDocsHome";
import Harness3Home from "./ThreeKHome";

export default function Docs() {
  const location = useLocation();

  const is3kDocs = location.pathname.startsWith("/3k-docs");

  if (is3kDocs) {
    return <Harness3Home />;
  }

  return <LegacyDocsHome />;
}