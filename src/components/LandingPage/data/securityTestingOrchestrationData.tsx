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
    link: "/tutorials/security-tests/learn-about-sto/your-first-sto-pipeline",
  },
  {
    title: "Image scanning quickstart",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a pipeline to scan images using Aqua Trivy.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/quickstarts/container-scan-aqua-trivy",
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
    newDoc: true,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/security-tests/learn-about-sto/sto-onboarding",
  },
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
    link: "/tutorials/security-tests/learn-about-sto/your-first-sto-pipeline",
  },
  {
    title: "Scan a NodeJS Application",
    module: MODULES.sto, 
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a pipeline to scan a NodeJS Application using OWASP.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/learn-about-sto/nodejs-owasp",
  },
  {
    title: "Codebase scans with Semgrep",
    module: MODULES.sto, 
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a pipeline to scan codebases in a wide variety of language.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/quickstarts/sast-scan-semgrep",
  },
  {
    title: "Image scans with Aqua Trivy",
    module: MODULES.sto, 
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a pipeline to scan container images using the open-source Aqua Trivy scanner.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/quickstarts/container-scan-aqua-trivy",
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
    link: "/tutorials/security-tests/quickstarts/gitlab-ci-integration",
  },
];
