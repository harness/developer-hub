import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Get started with the fastest CI on the planet",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This tutorial helps you get started with Harness CI and explore some of
        the features that make it four times faster than the leading competitor.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    link: "/docs/continuous-integration/get-started/tutorials",
  },
  {
    title: "Build on a Kubernetes Cluster",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Build a Docker Image on a Kubernetes Cluster Build Farm.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/tutorial-ci-kubernetes-build-infra",
  },
  {
    title: "Development guides",
    module: MODULES.ci,
    description:
      "Guidance for building and testing popular languages and platforms.",
    link: "/docs/category/development-guides",
    type: [docType.Documentation],
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "All documentation",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Explore all Harness CI documentation.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    link: "/docs/continuous-integration",
  },
];

export const DroneList: CardItem[] = [
  {
    title: "Coming Soon",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: <>Drone Tutorials Coming Soon</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "tbd",
  },
];

export const CIList: CardItem[] = [
  {
    title: "Get started with the fastest CI on the planet",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description:
      "Get started with Harness CI and explore some of the features that make it four times faster than the leading competitor.",
    newDoc: false,
    type: [docType.Documentation],
    link: "/docs/continuous-integration/get-started/tutorials",
  },
  {
    title: "Build on a Kubernetes cluster",
    module: MODULES.ci,
    description:
      "Build a Docker Image on a Kubernetes cluster build farm.",
    link: "/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/tutorial-ci-kubernetes-build-infra",
    type: [docType.Documentation],
    icon: "img/icon_ci.svg",
  },
  {
    title: "Development guides",
    module: MODULES.ci,
    description:
      "Guidance for building and testing popular languages and platforms.",
    link: "/docs/category/development-guides",
    type: [docType.Documentation],
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "All documentation",
    module: MODULES.ci,
    description:
      "Explore all Harness CI documentation.",
    link: "/docs/continuous-integration",
    type: [docType.Documentation],
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
];
