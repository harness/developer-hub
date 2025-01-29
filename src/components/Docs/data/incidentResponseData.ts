import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */

// Docs
  export const docsCards: CardSections = [
    {
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "Revolutionize incident management by focusing on proactive issue prevention and accelerated resolution",
          module: MODULES.ce,
          description:
            "Learn the basics of Harness Incident Response.",
          link: "/docs/incident-response/getting-started/",
        },
  ],
},
];