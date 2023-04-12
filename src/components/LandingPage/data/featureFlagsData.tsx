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
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];

export const FFList: CardItem[] = [
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
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];
