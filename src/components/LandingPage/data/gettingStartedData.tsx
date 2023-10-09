import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Demystifying Trunk-Based Development",
    module: MODULES.gs,
    icon: "img/logo.svg",
    description: (
      <>
        Getting started with trunk-based development.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/getting-started/trunk-based-development",
  },
];

export const GSList: CardItem[] = [
  {
    title: "Demystifying Trunk-Based Development",
    module: MODULES.gs,
    icon: "img/logo.svg",
    description: (
      <>
        Getting started with trunk-based development.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/getting-started/trunk-based-development",
  }

];
