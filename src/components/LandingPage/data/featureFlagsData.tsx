import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "TypeScript and React Feature Flags",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/feature-flags/typescript-react",
  },
];

export const FFList: CardItem[] = [
  {
    title: "TypeScript and react feature flags",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/feature-flags/typescript-react",
  },
  {
    title: "Using feature flags for trunk-based development",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: (
      <>
        Achieve trunk-based development with feature flags so your team can ship code to production constantly.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/feature-flags/trunk-based",
  },
  {
    title: "Making flags resilient during a mobile browser refresh",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: (
      <>
        This tutorial walks you through using an SDK method to ensure your application continues working during a mobile browser refresh.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/feature-flags/mobile-browser-refresh",
  },
  {
    title: "Feature Flags best practices",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: (
      <>
        Learn about best practices when leveraging Feature Flags
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/feature-flags/best-practices",
  },
];
