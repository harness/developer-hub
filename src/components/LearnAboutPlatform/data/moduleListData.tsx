import React from "react";
import { CardItem, docType } from "../../LandingPage/TutorialCard";
import { MODULES } from "../../../constants";

export const moduleList: CardItem[] = [
  {
    title: "Code Repository",
    module: MODULES.code,
    // icon: "img/icon_code.svg",
    description: <>Accelerate development with security at scale.</>,
    link: "docs/code-repository",
  },
  {
    title: "Continuous Integration",
    module: MODULES.ci,
    // icon: "img/icon_ci.svg",
    description: "Automate builds, tests, and publishing of artifacts.",
    link: "docs/continuous-integration",
  },
  {
    title: "Continuous Delivery & GitOps",
    module: MODULES.cd,
    // icon: "img/icon_cd.svg",
    description:
      "Automate deployment of application services to your infrastructure.",
    link: "docs/continuous-delivery",
  },
  {
    title: "Infrastructure as Code Management",
    module: MODULES.iacm,
    // icon: "img/icon_iacm.svg",
    description: <>Manage your Infrastructure as Code End-to-End.</>,
    link: "docs/infrastructure-as-code-management",
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
    title: "Security Testing Orchestration",
    module: MODULES.sto,
    // icon: "img/icon_sto.svg",
    description: <>Scan code, containers, and live applications.</>,
    link: "docs/security-testing-orchestration",
  },
  {
    title: "Supply Chain Security",
    module: MODULES.ssca,
    // icon: "img/icon_ssca.svg",
    description: "Secure your   software supply chain.",
    link: "docs/software-supply-chain-assurance",
  },
  {
    title: "Chaos Engineering",
    module: MODULES.ce,
    // icon: "img/icon_ce.svg",
    description: <>Ensure application and infrastructure resilience.</>,
    link: "docs/chaos-engineering",
  },
  {
    title: "Service Reliability Management",
    module: MODULES.srm,
    // icon: "img/icon_srm.svg",
    description: <>Monitor SLOs, track error budgets, and debug code errors.</>,
    link: "docs/service-reliability-management",
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
  {
    title: "Software Engineering Insights",
    module: MODULES.sei,
    // icon: "img/icon_idp.svg",
    description: <>Use data-led insights to remove bottlenecks and improve productivity.</>,
    link: "docs/software-engineering-insights",
  },

];
