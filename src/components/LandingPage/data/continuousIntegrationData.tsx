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
    link: "/tutorials/build-code/build/kubernetes-build-farm",
  },
  {
    title: "NodeJS Application",
    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Build a Docker Image of a NodeJS Application.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/build/nodejs",
  },
  {
    title: "Go Application",

    module: MODULES.ci,
    icon: "img/icon_ci.svg",
    description: (
      <>
        Build a Docker Image of a Go Application.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15 min",
    link: "/tutorials/build-code/build/go",
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
    title: "Build on a Kubernetes Cluster",
    module: MODULES.ci,
    description:
      "Build a Docker Image on a Kubernetes Cluster Build Farm.",
    link: "/tutorials/build-code/build/kubernetes-build-farm",
    type: [docType.Documentation],
    time: "30 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Go Application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a Go Application.",
    link: "/tutorials/build-code/build/go",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "JAVA Application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of JAVA HTTP Server Application.",
    link: "/tutorials/build-code/build/java",
    icon: "img/icon_ci.svg",
    time: "15 min",
    type: [docType.Documentation],
  },
  {
    title: "NodeJS Application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a NodeJS Application.",
    link: "/tutorials/build-code/build/nodejs",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },

  {
    title: "React Application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a React Application.",
    link: "/tutorials/build-code/build/react",
    type: [docType.Documentation],
    time: "20 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Rust Application",
    module: MODULES.ci,
    description:
      "Build a Docker Image of a Rust Application.",
    link: "/tutorials/build-code/build/rust",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Signed Image",
    module: MODULES.ci,
    description:
      "Build a Signed Docker Image of a Go Application.",
    link: "/tutorials/build-code/build/signed-image",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg",
  },
  {
    title: "Amazon ECR",
    module: MODULES.ci,
    description:
      "Publish an Image to an Amazon ECR Registry.",
    link: "/tutorials/build-code/publish/amazon-ecr",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Google GAR",
    module: MODULES.ci,
    description:
      "Publish an Image to a Google GAR Registry.",
    link: "/tutorials/build-code/publish/google-gar",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Code coverage with CodeCov",
    module: MODULES.ci,
    description:
      "Wse a Run step to include CodeCov code coverage.",
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
      "Run LocalStack as a Background Step.",
    link: "/tutorials/build-code/test/localstack",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
  },
  {
    title: "Run Sauce Connect Proxy",
    module: MODULES.ci,
    description:
      "Run Sauce Connect Proxy as a Background Step.",
    link: "/tutorials/build-code/test/saucelabs-proxy",
    type: [docType.Documentation],
    time: "15 min",
    icon: "img/icon_ci.svg"
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
];
