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
          title: "STO overview",
          module: MODULES.cd,
          description:
            "Learn about the security scanning problems facing developers and how STO provides the solutions they need.",
          link: "/tutorials/security-tests/learn-sto/sto-onboarding",
        },
        {
          title: "Your first STO pipeline",
          module: MODULES.cd,
          description:
            "Set up a simple pipeline, run a scan, analyze the results, and learn about all the key features in STO.",
          link: "/tutorials/security-tests/learn-sto/your-first-sto-pipeline",
        },
        {
            title: "Scan a NodeJS App for security vulnerabilities",
            module: MODULES.cd,
            description:
              "Go through an end-to-end workflow for scanning your code repositories using OWASP.",
            link: "/tutorials/security-tests/learn-about-sto/nodejs-owasp",
          },
      ],
    },
  ];
  /* Define the cards - end */
