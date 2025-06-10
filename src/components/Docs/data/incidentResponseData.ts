import { CardSections } from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

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
          module: MODULES.ir,
          description:
            "Learn the basics of Harness Incident Response.",
          link: "/docs/incident-response/get-started/overview",
        },
  ],
},
];