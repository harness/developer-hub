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
          "Learn more about the features and capabilities of Harness IDP.",
        link: "/docs/internal-developer-portal/get-started/overview",
      },
      {
        title: "Get started with IDP",
        module: MODULES.idp,
        description: "Learn how to configure your software catalog and set up automation workflows.",
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
        description: "Understand how to manage and organize your services and service related entities with a software catalog.",
        link: "/docs/internal-developer-portal/catalog/software-catalog",
      },
      {
        title: "Self Service Workflows",
        module: MODULES.idp,
        description: "Explore how to design workflows for automating engineering process in your organization.",
        link: "/docs/internal-developer-portal/flows/service-onboarding-pipelines",
      },
      {
        title: "Scorecards",
        module: MODULES.idp,
        description: "Track and improve your organizational metrics using Scorecards effectively.",
        link: "/docs/internal-developer-portal/scorecards/scorecard",
      },
    ],
  },
  {
    name: "Customize Your IDP",
    description: "",
    list: [
      {
        title: "Homepage Customization",
        module: MODULES.idp,
        description: "Learn how to customize your IDP homepage for developers' daily requirements.",
        link: "/docs/internal-developer-portal/layout-and-appearance/home-page-customization",
      },
      {
        title: "Customize Catalog Entity Pages",
        module: MODULES.idp,
        description: "Learn how to customize the layout of catalog entity pages to fit your team's requirements.",
        link: "/docs/internal-developer-portal/layout-and-appearance/catalog",
      },
      {
        title: "IDP Sidebar Navigation Customization",
        module: MODULES.idp,
        description: "Learn how to customize the sidebar navigation in Harness IDP to highlight essential tools and pages for your users.",
        link: "/docs/internal-developer-portal/layout-and-appearance/sidenav",
      },
      {
        title: "IDP Sidebar Navigation Customization",
        module: MODULES.idp,
        description: "Learn to customize the Workflows Homepage by grouping and highlighting essential workflows for developers day-to-day operations.",
        link: "/docs/internal-developer-portal/layout-and-appearance/workflows-page-customization",
      },
    ],
  },
];
/* Define the cards - end */
