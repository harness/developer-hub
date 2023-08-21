import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */

export const K8SList: CardItem[] = [
  {
    title: "Kubernetes Manifest",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Deploy a Kubernetes Manifest onto your Kubernetes cluster.</>
    ),
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/cd-pipelines/kubernetes/manifest",
  },
  {
    title: "Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Helm Chart onto your Kubernetes cluster.</>,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/cd-pipelines/kubernetes/helm-chart",
  },
  {
    title: "Kustomize",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Kubernetes Manifest using Kustomize.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/cd-pipelines/kubernetes/kustomize",
  },
];

export const ServerlessList: CardItem[] = [
  {
    title: "AWS Lambda Function",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy an AWS Lambda Function.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/cd-pipelines/serverless/aws-lambda",
  },
  {
    title: "Google Cloud Function ",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Google Cloud Function.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/cd-pipelines/serverless/gcp-cloud-func",
  },
];

export const VMList: CardItem[] = [
  {
    title: "AWS",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy an app to a Linux or Windows VM in AWS EC2.</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/vm/aws",
  },
  {
    title: "Physical Data Center",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy an app to a Linux or Windows VM in a physical data center.</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/vm/pdc",
  },
];

export const ECSList: CardItem[] = [
  {
    title: "Amazon ECS",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Dockert Image to Amazon ECS.</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/amazon-ecs",
  },
];

export const AdvList: CardItem[] = [
  {
    title: "Trigger CD Pipeline on New Artifact Version",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Trigger CD Pipeline on New Artifact Version</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/trigger",
  },
  {
    title: "Set up an approval step in a CD pipeline",
    module: MODULES.cd,
    icon: "img/icon_cv.svg",
    description: <>Enable Harness user groups to approve or reject a stage in a CD pipeline.</>,
    newDoc: true,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/approvals",
  },
  {
    title: "Continuous Verification with Prometheus",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Verify Deployments with Prometheus & Auto Rollback on Failures</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/continuous-verification/prometheus",
  },
  {
    title: "Unified CI/CD in a Single Pipeline",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Setup CI and CD as two stages of the same pipeline</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/unified-cicd",
  },
];