import React from "react";
import { CardItem, docType, CardSections } from "../TutorialCard";
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
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/cd-pipelines/kubernetes/kustomize",
  },
  {
    title: "Microservices App",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a microservices app onto Kubernetes.</>,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/cd-pipelines/kubernetes/ownapp",
  },
  {
    title: "Secure Container Image Signing with Cosign and OPA",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Secure container image signing with Cosign and OPA before Kubernetes deployment.</>,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/cd-pipelines/kubernetes/cosign-opa",
  },
];

export const ServerlessList: CardItem[] = [
  {
    title: "AWS Lambda Function",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy an AWS Lambda Function.</>,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/cd-pipelines/serverless/aws-lambda",
  },
  {
    title: "Google Cloud Function ",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy a Google Cloud Function.</>,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/cd-pipelines/serverless/gcp-cloud-func",
  },
];

export const UnifiedCICDList: CardItem[] = [
  {
    title: "End-To-End CI/CD Pipeline",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Set up CI/CD with a GitOps pipeline</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/unified-cicd/e2e-pipeline",
  },
  {
    title: "GAR GKE CI/CD Pipeline",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Build and push to GAR and deploy to GKE.</>,
    type: [docType.Documentation],
    time: "30min",
    link: "/tutorials/cd-pipelines/unified-cicd/gar-gke-pipeline",
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
    title: "Microsoft Azure",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: <>Deploy an app to a Linux or Windows VM in Microsoft Azure.</>,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/vm/azure",
  },
  {
    title: "Physical Data Center",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Deploy an app to a Linux or Windows VM in a physical data center.</>
    ),
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
    title: "Variable Expressions",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Create and use variables in CD pipelines.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/cd-pipelines/variables",
  },
  {
    title: "Trigger CD Pipeline on New Artifact Version",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Enable auto pipeline triggers on every release of Artifact.</>
    ),
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/trigger",
  },
  {
    title: "Create Pipeline Templates",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
        Create reusable pipeline templates for CD pipelines and link them to
        your pipelines{" "}
      </>
    ),
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/templates",
  },
  {
    title: "Set up an approval step in a CD pipeline",
    module: MODULES.cd,
    icon: "img/icon_cv.svg",
    description: (
      <>
        Enable Harness user groups to approve or reject a stage in a CD
        pipeline.
      </>
    ),
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/approvals",
  },
  {
    title: "Continuous Verification with Prometheus",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>Verify Deployments with Prometheus & Auto Rollback on Failures</>
    ),
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/cd-pipelines/continuous-verification/prometheus",
  },
];

export const CDList: CardSections = [
  {
    name: "Automate Kubernetes deployments with a CD Pipeline or GitOps Workflow",
    list: K8SList,
    // description: "optional",
    // module: MODULES.cd, // optional
    // icon: "path/to/img/optional",
  },
  {
    name: "Automate Serverless deployments with a CD Pipeline",
    list: ServerlessList,
    // description: "optional",
    // module: MODULES.cd, // optional
    // icon: "path/to/img/optional",
  },
  {
    name: "Automate Linux or Windows VM deployments with a CD Pipeline",
    list: VMList,
    // description: "optional",
    // module: MODULES.cd, // optional
    // icon: "path/to/img/optional",
  },
  {
    name: "Automate Amazon ECS deployments with a CD Pipeline",
    list: ECSList,
    // description: "optional",
    // module: MODULES.cd, // optional
    // icon: "path/to/img/optional",
  },
  {
    name: "Learn Advanced CD & GitOps",
    list: AdvList,
    // description: "optional",
    // module: MODULES.cd, // optional
    // icon: "path/to/img/optional",
  },
];
