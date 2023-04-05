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
    time: "5 min",
    link: "/tutorials/build-code/fastest-ci",
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
  {
    title: "Node and Docker CI Pipeline",
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
    title: "Build Go application containers using a CI Pipeline",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
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
    title: "Sign application containers using a CI Pipeline",

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
    link: "/tutorials/build-code/ci-tutorial-container-signing",
  },
  {
    title: "Build and Publish a Rust application",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Use a CI pipeline to build, test, and publish a multi-architecture Rust
        application container image.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-tutorial-rust-container",
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
    title: "Node and Docker CI Pipeline",
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
    title: "Build and push a container image to Amazon ECR",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: <>Build, test, and publish a container image to AWS ECR.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-build-push-to-ecr",
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
  {
    title: "Build Go application containers",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
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
    newDoc: true,
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
    title: "Publish an Allure report to the Artifacts tab",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        This tutorial provides an example pipeline that builds a Java Maven
        application and generates an Allure Report that you can view in the
        Harness UI.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/ci-publish-allure-report",
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
];
