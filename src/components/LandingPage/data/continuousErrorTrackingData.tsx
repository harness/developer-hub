import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Java Error Tracking",
    module: MODULES.cet,
    icon: "img/icon_cet.svg",
    description: (
      <>
        Finding and fixing caught, uncaught, and swallowed Java exceptions.
        Learn the process and find the right tooling.
      </>
    ),
    newDoc: false,
    type: [docType.Interactive, docType.Video],
    time: "10min",
    link: "/tutorials/error-tracking/java-error-tracking",
  },
];

export const CETList: CardItem[] = [
  {
    title: "Java Error Tracking",
    module: MODULES.cet,
    icon: "img/icon_cet.svg",
    description: (
      <>
        Finding and fixing caught, uncaught, and swallowed Java exceptions.
        Learn the process and find the right tooling.
      </>
    ),
    newDoc: false,
    type: [docType.Interactive, docType.Video],
    time: "10min",
    link: "/tutorials/error-tracking/java-error-tracking",
  },
];
