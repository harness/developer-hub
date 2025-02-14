import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/TutorialCard/TutorialCard";
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
          link: "/docs/feature-management-experimentation/getting-started/docs/onboarding-guide",
        },
        {
          title: "What's supported",
          module: MODULES.fme,
          description:
            "Platforms and technologies supported in FME",
          link: "/docs/feature-management-experimentation/getting-started/whats-supported",
        },
        {
          title: "Development guides",
          module: MODULES.fme,
          description:
            "Use Harness FME with popular languages and platforms, including mobile development",
          link: "/docs/feature-management-experimentation/sdks-and-infrastructure",
        },
      ],
    },

    {
      name: "FME Features",
      description: "",
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
            "Measure KPIs, performance metrics, and alerting for your feature variations",
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
      description: "",
      list: [
        {
          title: "Integrations",
          module: MODULES.fme,
          description:
            "Use your current tech stack + FME",
          link: "/docs/feature-management-experimentation/integrations",
        },
        {
          title: "Split API",
          module: MODULES.fme,
          description:
            "Hit our HTTP API endpoints to interact with FME objects",
          link: "/docs/feature-management-experimentation/http-api",
        },
      ],
    },
    {
      name: "Help and more",
      description: "",
      list: [
        {
          title: "FME knowledge base",
          module: MODULES.fme,
          description: "In-depth knowledge base articles",
          link: "/kb/feature-management-experimentation",
        },
        {
          title: "Harness FME support",
          module: MODULES.fme,
          description: "Open a support ticket with us",
          link: "/docs/feature-management-experimentation/fme-support",
        },
      ],
    },
    /* Not sure if we want these because
     - if docs are well written, they may be mostly unneeded
     - if they are needed, they should likely be close to the related instructions/topic
    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "Troubleshoot FME",
          module: MODULES.fme,
          description:
            "Troubleshooting guides for Harness FME",
          link: "/kb/feature-flags/articles/troubleshooting-guide",
        },
        {
          title: "FME FAQs",
          module: MODULES.fme,
          description:
            "Frequently asked questions about Harness FME",
          link: "/docs/faqs/harness-feature-flag-faqs",
        },
        {
          title: "FME Knowledge base",
          module: MODULES.fme,
          description:
            "In-depth knowledge base articles",
          link: "/kb/feature-flags",
        },
      ],
    },
    */
  ];
  /* Define the cards - end */