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
          title: "Build/scan/push workflows with STO",
          module: MODULES.cd,
          description:
            "Learn about the security scanning problems facing developers and how STO provides the solutions they need.",
          link: "/tutorials/security-tests/integrated-workflows/build-scan-push-sto-only",
        },
        {
          title: "Build/scan/push workflows with STO and CI",
          module: MODULES.cd,
          description:
            "Set up a simple pipeline, run a scan, analyze the results, and learn about all the key features in STO.",
          link: "/tutorials/security-tests/integrated-workflows/build-scan-push-sto-and-ci",
        },
      ]
    },
  ];
  /* Define the cards - end */
