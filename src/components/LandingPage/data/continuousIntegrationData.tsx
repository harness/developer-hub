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
    link: "/tutorials/ci-pipelines/fastest-ci",
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
    time: "30 min",
    link: "/tutorials/ci-pipelines/kubernetes-build-farm",
  },
  {
    title: "Code coverage with CodeCov",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Use a Run step to include CodeCov code coverage.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/ci-pipelines/test/codecov",
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
    newDoc: false,
    type: [docType.Documentation],
    time: '9 min',
    link: "/tutorials/ci-pipelines/tfc-notification",
  },
  {
    title: "Python application",
    module: MODULES.ci,
    description:
      "Build and test a Python application.",
    link: "/tutorials/ci-pipelines/build/python",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "C# (.NET Core) application",
    module: MODULES.ci,
    description:
      "Build and test a C# (.NET Core) application.",
    link: "/tutorials/ci-pipelines/build/dotnet",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: true,
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
    time: "5 min",
    link: "/tutorials/ci-pipelines/fastest-ci",
  },
  {
    title: "Build on a Kubernetes cluster",
    module: MODULES.ci,
    description:
      "Build a Docker Image on a Kubernetes cluster build farm.",
    link: "/tutorials/ci-pipelines/kubernetes-build-farm",
    type: [docType.Documentation],
    time: "30 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "C# (.NET Core)",
    module: MODULES.ci,
    description:
      "Build and test a C# (.NET Core) application.",
    link: "/tutorials/ci-pipelines/build/dotnet",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: true,
  },
  {
    title: "Go",
    module: MODULES.ci,
    description:
      "Build and test a Go application.",
    link: "/tutorials/ci-pipelines/build/go",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Java",
    module: MODULES.ci,
    description:
      "Build and test a Java application.",
    link: "/tutorials/ci-pipelines/build/java",
    icon: "img/icon_ci.svg",
    time: "15 min",
    type: [docType.Documentation],
  },
  {
    title: "NodeJS",
    module: MODULES.ci,
    description:
      "Build and test a NodeJS application.",
    link: "/tutorials/ci-pipelines/build/nodejs",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Python",
    module: MODULES.ci,
    description:
      "Build and test a Python application.",
    link: "/tutorials/ci-pipelines/build/python",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "Ruby",
    module: MODULES.ci,
    description:
      "Build and test a Ruby application.",
    link: "/tutorials/ci-pipelines/build/ruby",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "iOS and macOS",
    module: MODULES.ci,
    description:
      "Build and test an iOS or macOS application.",
    link: "/tutorials/ci-pipelines/build/ios",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
    newDoc: false,
  },
  {
    title: "Terraform Cloud notification triggers",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description:
      "Terraform Cloud notifications can trigger CI pipelines through custom CI webhooks.",
    newDoc: false,
    type: [docType.Documentation],
    time: '9 min',
    link: "/tutorials/ci-pipelines/tfc-notification",
  },
  {
    title: "Amazon ECR",
    module: MODULES.ci,
    description:
      "Publish an Image to an Amazon Elastic Container Registry.",
    link: "/tutorials/ci-pipelines/publish/amazon-ecr",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Google GAR",
    module: MODULES.ci,
    description:
      "Publish an Image to a Google Artifact Registry.",
    link: "/tutorials/ci-pipelines/publish/google-gar",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
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
  {
    title: "Run LocalStack",
    module: MODULES.ci,
    description:
      "Run LocalStack as a Background step.",
    link: "/tutorials/ci-pipelines/test/localstack",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Run Sauce Connect Proxy",
    module: MODULES.ci,
    description:
      "Run Sauce Connect Proxy as a Background step.",
    link: "/tutorials/ci-pipelines/test/saucelabs-proxy",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Test a FastAPI project",
    module: MODULES.ci,
    description:
      "Use Harness CI to test a FastAPI project.",
    link: "/tutorials/ci-pipelines/test/fastapi",
    type: [docType.Documentation],
    time: "20 min",
    icon: "img/icon_ci.svg",
    newDoc: true,
  },
];
