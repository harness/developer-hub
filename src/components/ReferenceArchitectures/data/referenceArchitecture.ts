import { CardSections } from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */


export const ReferenceArchitecturesCards: CardSections = [
  {
    name: "Get started with Reference Architectures",
    description: "",
    list: [
      {
        title: "Delegate Architecture Best Practices",
        module: MODULES.platform,
        description: "Design considerations for choosing the right Delegate Architecture",
        link: "/docs/platform/reference-architectures/delegate-architecture-bestpractices",
      },
    ],
  },
];
/* Define the cards - end */
