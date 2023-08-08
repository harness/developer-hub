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
          title: "C# (.NET Core)",
          module: MODULES.ci,
          description:
            "Build and test a C# (.NET Core) application.",
          link: "/tutorials/ci-pipelines/build/dotnet",
          newDoc: true,
        },
        {
          title: "Go",
          module: MODULES.ci,
          description:
            "Build and test a Go application.",
          link: "/tutorials/ci-pipelines/build/go",
        },
        {
          title: "Java",
          module: MODULES.ci,
          description:
            "Build and test a Java application.",
          link: "/tutorials/ci-pipelines/build/java",
        },
        {
          title: "NodeJS",
          module: MODULES.ci,
          description:
            "Build and test a NodeJS application.",
          link: "/tutorials/ci-pipelines/build/nodejs",
        },
        {
          title: "Python",
          module: MODULES.ci,
          description:
            "Build and test a Python application.",
          link: "/tutorials/ci-pipelines/build/python",
          newDoc: false,
        },
        {
          title: "Ruby",
          module: MODULES.ci,
          description:
            "Build and test a Ruby application.",
          link: "/tutorials/ci-pipelines/build/ruby",
          newDoc: false,
        },
        {
          title: "iOS and macOS",
          module: MODULES.ci,
          description:
            "Build and test an iOS or macOS application.",
          link: "/tutorials/ci-pipelines/build/ios",
          newDoc: false,
        },
      ],
    },
  ];
  /* Define the cards - end */
