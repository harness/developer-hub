import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Generate SBOM and enforce policies",
    module: MODULES.ssca,
    icon: "img/icon_ssca.svg",
    description: (
      <>Use SSCA module steps to generate SBOM and enforce policies in Harness pipelines.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/secure-supply-chain/generate-sbom",
  },
  {
    title: "Generate and verify SLSA provenance",
    module: MODULES.ssca,
    icon: "img/icon_ssca.svg",
    description: (
      <>Use SSCA module steps to generate and verify SLSA provenance in Harness pipelines.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/secure-supply-chain/generate-slsa",
  },
];

export const SSCAList: CardItem[] = [
  {
    title: "Generate SBOM and enforce policies",
    module: MODULES.ssca,
    icon: "img/icon_ssca.svg",
    description: (
      <>Use SSCA module steps to generate SBOM and enforce policies in Harness pipelines.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/secure-supply-chain/generate-sbom",
  },
  {
    title: "Generate and verify SLSA provenance",
    module: MODULES.ssca,
    icon: "img/icon_ssca.svg",
    description: (
      <>Use SSCA module steps to generate and verify SLSA provenance in Harness pipelines.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/secure-supply-chain/generate-slsa",
  },
];
