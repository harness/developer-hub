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
          link: "/tutorials/build-code/build/kubernetes-build-farm",
        },
        {
          title: "Go application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a Go application.",
          link: "/tutorials/build-code/build/go",
        },
        {
          title: "Java application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of Java HTTP Server application.",
          link: "/tutorials/build-code/build/java",
        },
        {
          title: "NodeJS application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a NodeJS application.",
          link: "/tutorials/build-code/build/nodejs",
        },

        {
          title: "React application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a React application.",
          link: "/tutorials/build-code/build/react",
        },
        {
          title: "Rust application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a multi-architecture Rust application.",
          link: "/tutorials/build-code/build/rust",
        },
        {
          title: "Signed images",
          module: MODULES.ci,
          description:
            "Build a Signed Docker Image of a Go application.",
          link: "/tutorials/build-code/build/signed-image",
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
      ],
    },
  ];
  /* Define the cards - end */