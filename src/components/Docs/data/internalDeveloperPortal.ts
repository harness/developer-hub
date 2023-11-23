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
    link: "/tutorials/internal-developer-portal/service-onboarding-pipeline",
  },
  {
    title: "How to Register Your Software Components in Catalog ?",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description:
      "Create a Software Component and register it in Software Catalog.",
    newDoc: true,
    type: [docType.Documentation],
    time: "20min",
    link: "/tutorials/internal-developer-portal/register-component-in-catalog", 
  },
  {
    title: "How to use a short-lived secret to trigger a service onboarding pipeline?",
    module: MODULES.idp,
    icon: "img/icon_idp.svg",
    description:
      "Create a secret input field for developers to provide their credentials, and then use the credentials as a runtime input for a service onboarding pipeline.",
    newDoc: true,
    type: [docType.Documentation],
    time: "7min",
    link: "/tutorials/internal-developer-portal/using-secret-as-an-input",   
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
        link: "/docs/internal-developer-portal/get-started/overview",
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
      {
        title: "Scorecards",
        module: MODULES.idp,
        description: "Learn how to use Scorecards",
        link: "/docs/internal-developer-portal/features/scorecard",
      },
    ],
  },
];
/* Define the cards - end */
