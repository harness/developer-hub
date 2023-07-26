import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */
export const idpCards: CardItem[] = [
  // Featured Tutorials
  {
    title: "Create your first service onboarding pipeline",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description:
      "Create a basic service onboarding pipeline that provisions an app on demand.",
    newDoc: true,
    type: [docType.Documentation],
    time: "30min",
    link: "/docs/internal-developer-portal/tutorials/service-onboarding-pipeline",
  },
];

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
          "Learn how Harness's developer-centric portal helps platform engineering and development teams improve productivity.",
        link: "/docs/internal-developer-portal/getting-started/overview",
      },
      {
        title: "Get started with IDP",
        module: MODULES.idp,
        description: "Set up your software catalog and software templates.",
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
        link: "/docs/internal-developer-portal/features/software-catalog",
      },
      {
        title: "Service onboarding pipelines",
        module: MODULES.idp,
        description: "Learn how to automate service creation.",
        link: "/docs/internal-developer-portal/features/service-onboarding-pipelines",
      },
    ],
  },
];
/* Define the cards - end */
