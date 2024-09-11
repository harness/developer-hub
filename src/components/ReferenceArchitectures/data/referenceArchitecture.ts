import { CardSections } from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */


export const ReferenceArchitecturesCards: CardSections = [
  {
    name: "Get started with Reference Architectures",
    description: "",
    list: [
      {
        title: "Cloud Cost Management",
        module: MODULES.platform,
        description:
          "Get started with Cloud Cost Management Reference Architectures.",
        link: "/kb/category/cloud-cost-management",
      },
      {
        title: "Delegate Architecture Best Practices",
        module: MODULES.platform,
        description: "Design considerations for choosing the right Delegate Architecture",
        link: "/kb/reference-architectures/platform/delegate_architecture_bestpractices.md",
      },
    ],
  },
];
/* Define the cards - end */
