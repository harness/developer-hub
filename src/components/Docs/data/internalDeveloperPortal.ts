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
    name: "Introduction",
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
        description: "Learn how to configure your IDP and start onboarding.",
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
    name: "Access Control and Governance",
    description: "",
    list: [
      {
        title: "Role-based access control (RBAC)",
        module: MODULES.idp,
        description: "Learn how to use RBAC to manage resource access and actions for users in IDP.",
        link: "/docs/internal-developer-portal/rbac/resources-roles",
      },
      {
        title: "Audit Trail",
        module: MODULES.idp,
        description: "Learn how Audit Trail lets you track changes in IDP.",
        link: "/docs/internal-developer-portal/governance/audit-trails",
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
        title: "Workflows Page Customization",
        module: MODULES.idp,
        description: "Learn to customize the Workflows Homepage by grouping and highlighting essential workflows for developers day-to-day operations.",
        link: "/docs/internal-developer-portal/layout-and-appearance/workflows-page-customization",
      },
    ],
  },
  {
    name: "Dashboard and Metrics",
    description: "",
    list: [
      {
        title: "Scorecards Checks Overview",
        module: MODULES.idp,
        description: "Learn how the checks overview page tracks components and time-sensitive datapoint for migrations and upgrades.",
        link: "/docs/internal-developer-portal/scorecards/checks-datasources#checks-overview",
      },
      {
        title: "Track Adoption using Dashboard",
        module: MODULES.idp,
        description: "Learn how the out-of-the-box adoption dashboard helps track Harness IDP usage in your organization.",
        link: "/docs/internal-developer-portal/get-started/how-to-track-adoption",
      },
    ],
  },
];
/* Define the cards - end */
