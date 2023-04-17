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
          title: "Build on a Kubernetes Cluster",
          module: MODULES.ci,
          description:
            "Build a Docker Image on a Kubernetes Cluster Build Farm",
          link: "/tutorials/build-code/build/kubernetes-build-farm",
        },
        {
          title: "Go Application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a Go Application",
          link: "/tutorials/build-code/build/go",
        },
        {
          title: "JAVA Application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of JAVA HTTP Server Application",
          link: "/tutorials/build-code/build/java",
        },
        {
          title: "NodeJS Application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a NodeJS Application",
          link: "/tutorials/build-code/build/nodejs",
        },
   
        {
          title: "React Application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a React Application",
          link: "/tutorials/build-code/build/react",
        },
        {
          title: "Rust Application",
          module: MODULES.ci,
          description:
            "Build a Docker Image of a Rust Application",
          link: "/tutorials/build-code/build/rust",
        },
        {
          title: "Signed Image",
          module: MODULES.ci,
          description:
            "Build a Signed Docker Image of a Go Application",
          link: "/tutorials/build-code/build/signed-image",
        },
      ],
    },
  ];
  /* Define the cards - end */