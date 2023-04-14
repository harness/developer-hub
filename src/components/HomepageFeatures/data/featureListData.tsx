import React from "react";
import { CardItem, docType } from "../../LandingPage/TutorialCard";
import { MODULES } from "../../../constants";

export const featureList: CardItem[] = [
  {
    title: "Build & Test Code",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: "Create a CI build pipeline.",
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "tutorials/build-code",
  },
  {
    title: "Deploy Services",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: "Create a CD deployment pipeline.",
    type: [docType.Documentation],
    link: "tutorials/deploy-services",
  },
  {
    title: "Manage Feature Flags",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: <>Roll out new features progressively.</>,
    type: [docType.Documentation],
    link: "tutorials/manage-feature-flags",
  },
  {
    title: "Manage Cloud Costs",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs.</>,
    type: [docType.Documentation],
    link: "tutorials/manage-cloud-costs",
  },
  {
    title: "Manage Service Reliability",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: <>Monitor SLOs, track error budgets, debug code errors.</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "tutorials/manage-service-reliability",
  },
  {
    title: "Orchestrate Security Tests",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: <>Scan code, containers and apps.</>,
    type: [docType.Documentation],
    link: "tutorials/orchestrate-security-tests",
  },
  {
    title: "Run Chaos Experiments",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: <>Ensure app and infrastructure resilience.</>,
    type: [docType.Documentation],
    link: "tutorials/run-chaos-experiments",
  },
  {
    title: "Administer Harness Platform",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Install a Kubernetes or Docker delegate, Onboard with Terraform
        Provider.
      </>
    ),
    type: [docType.Documentation],
    link: "tutorials/platform",
  },
];
