import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the FeaturedList cards here */
/* Module Card lists are defined in the data file for each module */
export const FeaturedList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Helm Chart onto your Kubernetes cluster.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/cd-pipelines/kubernetes/helm-chart",
  },
  {
    title: "Get started with the fastest CI on the planet",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Get started with Harness CI and explore some of the features that make
        it four times faster than the leading competitor.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/ci-pipelines/fastest-ci",
  },
  {
    title: "Onboard with Terraform Provider",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Automate lifecycle management of orgs, projects, services, environments,
        connectors and pipelines using the Harness Terraform Provider.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/onboard-terraform-provider",
  },
  {
    title: "Terraform Cloud notification triggers",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Terraform Cloud notifications can trigger CI pipelines through custom CI
        webhooks.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "9 min",
    link: "/tutorials/ci-pipelines/tfc-notification",
  },
  {
    title: "Code coverage with CodeCov",
    module: MODULES.ci,
    description:
      "Use a Run step to include CodeCov code coverage.",
    link: "/tutorials/ci-pipelines/test/codecov",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "Publish to the Artifacts tab",
    module: MODULES.ci,
    description:
      "Publish any URL to the Artifacts tab.",
    link: "/tutorials/ci-pipelines/publish/artifacts-tab",
    type: [docType.Documentation],
    time: "5 min",
    icon: "img/icon_ci.svg"
  },
];