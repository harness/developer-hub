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
      name: "Getting started",
      description: "",
      list: [
        {
          title: "Getting started",
          module: MODULES.fme,
          description:
            "Quickstarts and key concepts",
          link: "/docs/feature-management-experimentation/getting-started",
        },
        {
          title: "What's supported",
          module: MODULES.fme,
          description:
            "At a glance view of FME supported features",
          link: "/docs/feature-management-experimentation/whats-supported",
        },
        {
          title: "Development guides",
          module: MODULES.fme,
          description:
            "Guides for using Harness FME with popular languages and platforms, including mobile development",
          link: "/docs/feature-management-experimentation/sdks-and-infrastructure",
        },
      ],
    },

    {
      name: "FME Fundamentals",
      description:
        "",
      list: [
        {
          title: "Feature management",
          module: MODULES.fme,
          description:
            "Flag variations, canary releases, and gradual rollouts",
          link: "/docs/feature-management-experimentation/feature-management",
        },
        {
          title: "Release monitoring",
          module: MODULES.fme,
          description:
            "Measuring KPIs, performance metrics, and alerting for your feature variations",
          link: "/docs/feature-management-experimentation/release-monitoring",
        },
        {
          title: "Experimentation",
          module: MODULES.fme,
          description:
            "Actionable results analysis for data-driven development",
          link: "/docs/feature-management-experimentation/experimentation",
        },
      ],
    },

    {
      name: "Integrate FME",
      description:
        "",
      list: [
        {
          title: "Integrate & Automate",
          module: MODULES.ff,
          description:
            "Use your current tech stack + FME",
          link: "/docs/feature-management-experimentation/integrations",
        },
      ],
    },

    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "Troubleshoot FME",
          module: MODULES.ff,
          description:
            "Troubleshooting guides for Harness FME",
          link: "/kb/feature-flags/articles/troubleshooting-guide",
        },
        {
          title: "FME FAQs",
          module: MODULES.ff,
          description:
            "Frequently asked questions about Harness FME",
          link: "/docs/faqs/harness-feature-flag-faqs",
        },
        {
          title: "FME Knowledge base",
          module: MODULES.ff,
          description:
            "In-depth knowledge base articles",
          link: "/kb/feature-flags",
        },
      ],
    },

  ];
  /* Define the cards - end */