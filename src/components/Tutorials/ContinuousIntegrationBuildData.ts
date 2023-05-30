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
          title: "Python application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a Python application.",
          link: "/tutorials/ci-pipelines/build/python",
          newDoc: true,
        },
        {
          title: "Ruby application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a Ruby application.",
          link: "/tutorials/ci-pipelines/build/ruby",
          newDoc: true,
        },
        {
          title: "Swift application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a Swift application.",
          link: "/tutorials/ci-pipelines/build/swift",
          newDoc: true,
        },
      ],
    },
  ];
  /* Define the cards - end */
