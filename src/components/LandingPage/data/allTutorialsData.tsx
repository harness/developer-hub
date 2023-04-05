import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
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
    title: "Sign application containers",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This build automation guide describes how to sign a container image
        using a CI pipeline.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/build/signed-image",
  },
];

export const CIList: CardItem[] = [
  {
    title: "Node and Docker Pipeline",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This build automation guide walks you through building a NodeJS and
        Docker Application in a CI Pipeline.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-node-docker-quickstart",
  },
  {
    title: "Run LocalStack as a Service",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This build automation guide shows how to run LocalStack as a Background
        step in a CI Pipeline
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-localstack-background-step",
  },
  {
    title: "Build and Push a Container Image to Amazon ECR",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This guide shows how to build, test, and publish a container image to
        AWS ECR
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-build-push-to-ecr",
  },
  {
    title: "Run Sauce Connect Proxy as a Service",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This build automation guide walks you through running Sauce Connect
        Proxy as a Background step in a CI Pipeline
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-saucelabs-background-step",
  },
  {
    title: "Build and publish a Java HTTP Server",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Build, test, and publish a Docker image for a Java HTTP server
        application
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "20 min",
    link: "/tutorials/build-code/ci-java-http-server",
  },
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
    time: "5 min",
    link: "/tutorials/build-code/fastest-ci",
  },
  {
    title: "Build Go application containers",

    module: MODULES.ci,
    icon: "img/logo.svg",
    description: (
      <>
        This build automation guide describes building a Go container image in a
        CI Pipeline.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-tutorial-go-containers",
  },
  {
    title: "Sign Application Containers",
    module: MODULES.ci,
    icon: "img/logo.svg",
    description: (
      <>
        This build automation guide describes how to sign a container image
        using a CI pipeline.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-tutorial-container-signing",
  },
  {
    title:
      "Build, test, and publish a Docker image for a sample React application",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Learn how to build and test a sample React application in a CI pipeline.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "20 min",
    link: "/tutorials/build-code/ci-react-quickstart",
  },
  {
    title: "Push application containers to Google Artifact Registry",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This build automation guide describes how to build and push an
        application container image to Google Artifact Registry using a CI
        pipeline.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-tutorial-push-to-gar",
  },
  {
    title: "Build and Publish a Rust application",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Learn how to build, test and publish multi architecture Rust application
        container image.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-tutorial-rust-container",
  },
  {
    title: "Build and test on a Kubernetes cluster build infrastructure",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Create a two-stage pipeline that builds a codebase and runs integration
        tests on a Kubernetes cluster build infrastructure.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "30 min",
    link: "/tutorials/build-code/ci-tutorial-kubernetes-cluster-build-infra",
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
];
