import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Your first chaos experiment on Kubernetes",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>Running a Chaos Experiment on Kubernetes for the first time.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/chaos-experiments/first-chaos-engineering",
  },
];

export const CEList: CardItem[] = [
  {
    title: "Your first chaos experiment on Kubernetes",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>Running a Chaos Experiment on Kubernetes for the first time.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/chaos-experiments/first-chaos-engineering",
  },
  {
    title: "Chaos experiment from a blank canvas",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>Create, run, observe and evaluate a custom chaos experiment.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/chaos-experiments/chaos-experiment-from-blank-canvas",
  },
  {
    title: "Your first chaos experiment execution using APIs",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>
        Executing a chaos experiment on Kubernetes for the first time using
        APIs.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/chaos-experiments/first-chaos-experiment-via-api",
  },
  {
    title: "Running chaos experiments on a GitLab pipeline",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>
        Execute a chaos experiment as part of a GitLab pipeline for
        continuous resilience.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/chaos-experiments/chaos-experiments-on-gitlab",
  },
  {
    title: "Running chaos experiments on a Jenkins pipeline",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>
        Execute a chaos experiment as part of a Jenkins pipeline for
        continuous resilience.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/chaos-experiments/chaos-experiments-on-jenkins",
  },
  {
    title: "Integration with Harness CD",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>
        Execute a chaos experiment as part of a Harness CD pipeline for
        continuous resilience.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/chaos-experiments/integration-with-harness-cd",
  },
];
