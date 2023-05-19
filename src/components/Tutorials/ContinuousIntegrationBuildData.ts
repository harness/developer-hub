import {
  CardItem,
  CardSections,
  docType,
} from "../LandingPage/TutorialCard";
import { MODULES } from "../../constants";

/* Define the cards - start */

  // Docs
  export const docsCards: CardSections = [
    {
      name: "",
      description:
        "",
      list: [
        {
          title: "Build on a Kubernetes cluster",
          module: MODULES.ci,
          description:
            "Build a Docker Image on a Kubernetes cluster build farm.",
          link: "/tutorials/ci-pipelines/kubernetes-build-farm",
        },
        {
          title: "Go application",
          module: MODULES.ci,
          description:
            "Build a Go application.",
          link: "/tutorials/ci-pipelines/build/go",
        },
        {
          title: "Java application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of Java application.",
          link: "/tutorials/ci-pipelines/build/java",
        },
        {
          title: "NodeJS application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a NodeJS application.",
          link: "/tutorials/ci-pipelines/build/nodejs",
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
          link: "/tutorials/ci-pipelines/tfc-notification",
        },
      ],
    },
  ];
  /* Define the cards - end */
