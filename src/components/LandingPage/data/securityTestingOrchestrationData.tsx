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
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/your-first-sto-pipeline",
  },

];

export const STOList: CardItem[] = [
  {
    title: "Your first STO pipeline",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a Pipeline with one scanner, run scans, analyze the results, and learn the key features of STO.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/your-first-sto-pipeline",
  },
  {
    title: "Set up STO integrations with GitLab CI",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Learn how to launch pipeline builds and scans automatically based on GitLab events.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/gitlab-ci-integration",
  },

  {
    title: "Scan a NodeJS Application",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/nodejs-owasp",
  },
];
