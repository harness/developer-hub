import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
const PlansList: CardItem[] = [
  {
    title: "Free Plan",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Signup for your free Harness SaaS account</>,
    type: [docType.SaaS],
    link: "https://app.harness.io/auth/#/signup/?module=cd&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=get-started",
  },
  {
    title: "Community Edition",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    type: [docType.SelfManaged],
    description: <>Install on your self-managed Docker or Kubernetes</>,
    link: "/tutorials/platform/install-cd-community-edition",
  },
];

const FeaturedList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Helm Chart onto your Kubernetes cluster.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/deploy-services/kubernetes/helm-chart",
  },
  {
    title: "Deploy a Kubernetes Manifest",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy a Kubernetes Manifest onto your Kubernetes cluster.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/kubernetes/manifest",
  },
];

const CDList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy your first set of Kubernetes Resources in a CD Pipeline with
        Helm, a popular Kubernetes Package Manager.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    time: "10 min",
    link: "/tutorials/deploy-services/kubernetes/helm-chart",
  },
  {
    title: "Deploy a Kubernetes Manifest",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy your first set of Kubernetes Services in a CD Pipeline with
        Kubernetes Manifests.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/kubernetes/manifest",
  },
  {
    title: "Build and Deploy a NodeJS App to Kubernetes",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Build and deploy a simple nodejs application using Harness CI and CD.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    time: "10 min",
    link: "/tutorials/deploy-services/unified-cicd",
  },
  {
    title: "Deploy a Docker Image to Amazon ECS ",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Docker image to Amazon ECS.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/deploy-services/amazon-ecs",
  },
];
