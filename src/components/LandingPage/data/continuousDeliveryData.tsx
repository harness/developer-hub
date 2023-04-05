import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Get started with Harness GitOps for Argo CD.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
  },
  {
    title: "Deploy a Helm Chart using CD Community Edition",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Use the 100% free, source-available, self-managed Harness CD Community
        Edition to automate Helm Chart deployments.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/kubernetes/helm-chart",
  },
];

export const CDList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Manifest",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploying your first set of Kubernetes Services in a CD Pipline with
        Kubernetes Manifests.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    time: "10 min",
    link: "/tutorials/deploy-services/microservice-manifest-k8s",
  },
  {
    title: "Deploy a Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploying your first set of Kubernetes Resources in a CD Pipeline with
        Helm, a popular Kubernetes Package Manager.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/helm-k8s",
  },
  {
    title: "Deploy a Helm Chart using Harness GitOps for Argo CD",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Learn about GitOps and how to leverage your own GitOps Pipeline.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
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
    link: "/tutorials/deploy-services/harness-cicd-tutorial",
  },
  {
    title: "Deploy a Helm Chart using CD Community Edition",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Use the 100% free, source-available, self-managed Harness CD Community
        Edition to automate Helm Chart deployments.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/deploy-services/helm-argocd-gitops-k8s",
  },
  {
    title: "Deploy a Docker Image to Amazon ECS ",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Docker image to Amazon ECS using a CD Pipeline.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/deploy-services/docker-ecs",
  },
  {
    title: "Deploy a Private Image in Amazon ECR to Kubernetes ",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Deploy a Docker image from a private Amazon ECR Repository to
        Kubernetes.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/deploy-services/docker-ecr-k8s",
  },
];
