import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Build & Test Code",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: <>Create a CI build pipeline</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/ci-pipelines",
  },
  {
    title: "Deploy Services",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Create a CD deployment</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/cd-pipelines",
  },
  {
    title: "Manage Feature Flags",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: <>Rollout new features progressively</>,
    type: [docType.Documentation, docType.Interactive],
    link: "/tutorials/feature-flags",
  },
  {
    title: "Optimize Cloud Costs",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/cloud-costs",
  },
  {
    title: "Manage SLOs",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: <>Create SLOs. track error budgets, govern pipelines</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/service-reliability",
  },
  {
    title: "Orchestrate Security Testings",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: <>Scan your code, containers and apps</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/security-tests",
  },
  {
    title: "Run Chaos Experiments",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: <>Ensure app and infrastructure resilience</>,
    type: [docType.Documentation, docType.Interactive],
    link: "/tutorials/chaos-experiments",
  },
];
