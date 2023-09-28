import React from "react";
import { CardItem, docType } from "../../LandingPage/TutorialCard";
import { MODULES } from "../../../constants";

export const moduleList: CardItem[] = [
  {
    title: "Continuous Integration",
    module: MODULES.ci,
    // icon: "img/icon_ci.svg",
    description: "Automate builds, tests, and publishing of artifacts.",
    link: "docs/continuous-integration",
  },
  {
    title: "Continuous Delivery",
    module: MODULES.cd,
    // icon: "img/icon_cd.svg",
    description:
      "Automate deployment of application services to your infrastructure.",
    link: "docs/continuous-delivery",
  },
  {
    title: "Feature Flags",
    module: MODULES.ff,
    // icon: "img/icon_ff.svg",
    description: <>Roll out new features progressively.</>,
    link: "docs/feature-flags",
  },
  {
    title: "Cloud Cost Management",
    module: MODULES.ccm,
    // icon: "img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs.</>,
    link: "docs/cloud-cost-management",
  },
  {
    title: "Service Reliability Management",
    module: MODULES.srm,
    // icon: "img/icon_srm.svg",
    description: <>Monitor SLOs, track error budgets, and debug code errors.</>,
    link: "docs/service-reliability-management",
  },
  {
    title: "Security Testing Orchestration",
    module: MODULES.sto,
    // icon: "img/icon_sto.svg",
    description: <>Scan code, containers, and live applications.</>,
    link: "docs/security-testing-orchestration",
  },
  {
    title: "Chaos Engineering",
    module: MODULES.ce,
    // icon: "img/icon_ce.svg",
    description: <>Ensure application and infrastructure resilience.</>,
    link: "docs/chaos-engineering",
  },
  {
    title: "Continuous Error Tracking",
    module: MODULES.cet,
    // icon: "img/icon_cet.svg",
    description: (
      <>Find and fix issues in minutes with code level visibility.</>
    ),
    link: "docs/continuous-error-tracking",
  },
  {
    title: "Internal Developer Portal",
    module: MODULES.idp,
    // icon: "img/icon_idp.svg",
    description: (
      <>
        Streamline software development and knowledge sharing with a
        developer-focused portal.
      </>
    ),
    link: "docs/internal-developer-portal",
  },
];
