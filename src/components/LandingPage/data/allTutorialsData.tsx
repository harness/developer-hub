import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Deploy a Kubernetes Helm Chart",
    module: MODULES.cd,
    icon: "img/icon_cd.svg",
    description: (
      <>
      Deploy a Helm Chart onto your Kubernetes cluster.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "8min",
    link: "/tutorials/deploy-services/kubernetes/helm-chart",
  },
  {
    title: "Get started with the fastest CI on the planet",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Get started with Harness CI and explore some of the features that
        make it four times faster than the leading competitor.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/build-code/fastest-ci",
  },
  {
    title: "Onboard with Terraform",
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
       Terraform Cloud notifications can trigger CI pipelines through custom CI webhooks.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: '9 min',
    link: "/tutorials/build-code/build/tfc-notification",
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
    time: "5 min",
    link: "/tutorials/build-code/fastest-ci",
  },
  {
    title: "Build on a Kubernetes cluster",
    module: MODULES.ci,
    description:
      "Build a Docker Image on a Kubernetes cluster build farm.",
    link: "/tutorials/build-code/build/kubernetes-build-farm",
    type: [docType.Documentation],
    time: "30 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Go application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a Go application.",
    link: "/tutorials/build-code/build/go",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Java application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of Java HTTP Server application.",
    link: "/tutorials/build-code/build/java",
    icon: "img/icon_ci.svg",
    time: "15 min",
    type: [docType.Documentation],
  },
  {
    title: "NodeJS application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a NodeJS application.",
    link: "/tutorials/build-code/build/nodejs",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "React application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a React application.",
    link: "/tutorials/build-code/build/react",
    type: [docType.Documentation],
    time: "20 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Rust application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a multi-architecture Rust application.",
    link: "/tutorials/build-code/build/rust",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Signed images",
    module: MODULES.ci,
    description:
      "Build a signed Docker Image of a Go application.",
    link: "/tutorials/build-code/build/signed-image",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Terraform Cloud notification triggers",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description:
      "Terraform Cloud notifications can trigger CI pipelines through custom CI webhooks.",
    newDoc: true,
    type: [docType.Documentation],
    time: '9 min',
    link: "/tutorials/build-code/build/tfc-notification",
  },
  {
    title: "Amazon ECR",
    module: MODULES.ci,
    description:
      "Publish an Image to an Amazon Elastic Container Registry.",
    link: "/tutorials/build-code/publish/amazon-ecr",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Google GAR",
    module: MODULES.ci,
    description:
      "Publish an Image to a Google Artifact Registry.",
    link: "/tutorials/build-code/publish/google-gar",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Code coverage with CodeCov",
    module: MODULES.ci,
    description:
      "Use a Run step to include CodeCov code coverage.",
    link: "/tutorials/build-code/test/codecov",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: true,
  },
  {
    title: "Publish Allure Report",
    module: MODULES.ci,
    description:
      "Publish an Allure Report.",
    link: "/tutorials/build-code/test/allure-report",
    type: [docType.Documentation],
    time: "5 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Run LocalStack",
    module: MODULES.ci,
    description:
      "Run LocalStack as a Background step.",
    link: "/tutorials/build-code/test/localstack",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Run Sauce Connect Proxy",
    module: MODULES.ci,
    description:
      "Run Sauce Connect Proxy as a Background step.",
    link: "/tutorials/build-code/test/saucelabs-proxy",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
];

export const CDList: CardItem[] = [
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

export const FFList: CardItem[] = [
  {
    title: "TypeScript and React Feature Flags",
    module: MODULES.ff,
    icon: "img/icon_ff.svg",
    description: (
      <>
        Walks you through adding JavaScript Feature Flags to a TypeScript and
        React Application.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-feature-flags/typescript-react-first-feature-flag",
  },
];

export const CCMList: CardItem[] = [
  {
    title: "Optimizing Kubernetes Cloud Costs 101",
    module: MODULES.ccm,
    icon: "img/icon_ccm.svg",
    description: (
      <>
        This guide will walk through how start to optimize your Kubernetes Costs
        on a public cloud provider.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/manage-cloud-costs/ccm-first-kubernetes-tutorial",
  },
];

export const SRMList: CardItem[] = [
  {
    title: "Introduction to SLO Management with Prometheus",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: (
      <>
        Introducing SLOs and how to measure and manage your SLOs leveraging
        Prometheus.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/manage-service-reliability/intro-to-srm",
  },
  {
    title: "Introduction to Java Exception Management",
    module: MODULES.srm,
    icon: "img/icon_srm.svg",
    description: (
      <>
        Finding and fixing caught, uncaught, and swallowed Java exceptions.
        Learn the process and find the right tooling.
      </>
    ),
    newDoc: false,
    type: [docType.Interactive, docType.Video],
    time: "10min",
    link: "/tutorials/manage-service-reliability/intro-java-exception-management",
  },
];

export const STOList: CardItem[] = [
  {
    title: "Scan a NodeJS Application",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Scanning a NodeJS Application and prioritizing scan results.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/orchestrate-security-tests/nodejs-firstscan",
  },
];

export const CEList: CardItem[] = [
  {
    title: "Your First Chaos Experiment on Kubernetes",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>Running a Chaos Experiment on Kubernetes for the first time.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/run-chaos-experiments/first-chaos-engineering",
  },
  {
    title: "Chaos Experiment from a Blank Canvas",
    module: MODULES.ce,
    icon: "img/icon_ce.svg",
    description: (
      <>Create, run, observe and evaluate a custom chaos experiment.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/run-chaos-experiments/chaos-experiment-from-blank-canvas",
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
    link: "/tutorials/run-chaos-experiments/integration-with-harness-cd",
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
    link: "/tutorials/run-chaos-experiments/first-chaos-experiment-via-API",
  },
];

export const PlatformList: CardItem[] = [
  {
    title: "Install CD Community Edition",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>Install the free CD Community Edition.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-cd-community-edition",
  },
  {
    title: "Install Delegate",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>Install a Kubernetes or Docker Delegate on your infrastructure.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
  {
    title: "Customize the delegate to run your favorite third-party tools",

    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Customize the delegate to run your favorite tools, including Helm,
        Terraform, and AWS CLI.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/customize-delegate",
  },
  {
    title: "Onboard with Terraform",
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
    title: "Install Harness Delegate on GKE with Workload Identity",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Deploy Harness Delegate onto Workload Identity-enabled GKE.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/gke-workload-identity",
  },
];
