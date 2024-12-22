import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Learn more",
    description: "",
    list: [
      {
        title: "Overview",
        module: MODULES.idp,
        description:
          "Get started with Harness IDP",
        link: "/docs/internal-developer-portal/get-started/overview",
      },
      {
        title: "Get started with IDP",
        module: MODULES.idp,
        description: "Set up your software catalog and automation Workflows.",
        link: "/docs/category/get-started-with-idp",
      },
    ],
  },
  {
    name: "Learn IDP fundamentals",
    description: "",
    list: [
      {
        title: "Software catalog",
        module: MODULES.idp,
        description: "Learn how a software catalog works.",
        link: "/docs/internal-developer-portal/catalog/software-catalog",
      },
      {
        title: "Self Service Workflows",
        module: MODULES.idp,
        description: "Learn how to automate service creation.",
        link: "/docs/internal-developer-portal/flows/service-onboarding-pipelines",
      },
      {
        title: "Scorecards",
        module: MODULES.idp,
        description: "Learn how to use Scorecards",
        link: "/docs/internal-developer-portal/scorecards/scorecard",
      },
    ],
  },
];
/* Define the cards - end */
