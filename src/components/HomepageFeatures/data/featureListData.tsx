import React from "react";
import { CardItem, docType } from "../../LandingPage/TutorialCard";
import { MODULES } from "../../../constants";

export const featureList: CardItem[] = [
  {
    title: "Set up CI Pipelines",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: "Automate builds, tests and publishing of artifacts.",
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "tutorials/ci-pipelines",
  },
  {
    title: "Set up CD Pipelines",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: "Automate deployment of application services to your infrastructure.",
    type: [docType.Documentation],
    link: "tutorials/cd-pipelines",
  },
  {
    title: "Manage Feature Flags",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: <>Roll out new features progressively.</>,
    type: [docType.Documentation],
    link: "tutorials/feature-flags",
  },
  {
    title: "Manage Cloud Costs",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs.</>,
    type: [docType.Documentation],
    link: "tutorials/cloud-costs",
  },
  {
    title: "Manage Service Reliability",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: <>Monitor SLOs, track error budgets, debug code errors.</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "tutorials/service-reliability",
  },
  {
    title: "Orchestrate Security Tests",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: <>Scan code, containers and live applications.</>,
    type: [docType.Documentation],
    link: "tutorials/security-tests",
  },
  {
    title: "Run Chaos Experiments",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: <>Ensure application and infrastructure resilience.</>,
    type: [docType.Documentation],
    link: "tutorials/chaos-experiments",
  },
  {
    title: "Administer Harness Platform",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Install a Kubernetes or Docker delegate, Onboard with Terraform
        Provider and more.
      </>
    ),
    type: [docType.Documentation],
    link: "tutorials/platform",
  },
];
