import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Your first STO pipeline",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a Pipeline with one scanner, run scans, analyze the results, and learn the key features of STO.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/docs/security-testing-orchestration/get-started/sto-tutorials/tutorials",
  },

];

export const STOList: CardItem[] = [
  {
    title: "STO Overview",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Learn how Harness STO can help you solve your security scanning problems.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/docs/security-testing-orchestration/get-started/sto-tutorials/tutorials",
  },

];
