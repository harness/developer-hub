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
          title: "What's supported",
          module: MODULES.fme,
          description:
            "Explore the various platforms and technologies supported in Harness FME.",
          link: "/docs/feature-management-experimentation/getting-started/whats-supported",
        },
        {
          title: "Key concepts",
          module: MODULES.fme,
          description:
            "Learn about key concepts in Harness FME, including feature flags, experiments, and more.",
          link: "/docs/feature-management-experimentation/getting-started/key-concepts",
        },
        {
          title: "Overview",
          module: MODULES.fme,
          description:
            "Set up Harness FME and start managing your first features.",
          link: "/docs/feature-management-experimentation/getting-started/overview/",
        },
        {
          title: "SDKs and customer-deployed components",
          module: MODULES.fme,
          description:
            "Integrate Harness FME with your preferred languages and platforms, and configure your environments and infrastructure for seamless feature management.",
          link: "/docs/feature-management-experimentation/sdks-and-infrastructure/",
        },
      ],
    },
    {
      name: "Use Harness FME",
      description: "",
      list: [
        {
          title: "Feature Management",
          module: MODULES.fme,
          description:
            "Control feature rollouts with flags, variations, and canary releases.",
          link: "/docs/feature-management-experimentation/feature-management",
        },
        {
          title: "Release Monitoring",
          module: MODULES.fme,
          description:
            "Track performance, measure KPIs, and receive alerts on feature impact.",
          link: "/docs/feature-management-experimentation/release-monitoring",
        },
        {
          title: "Experimentation",
          module: MODULES.fme,
          description:
            "Run experiments and analyze results for data-driven development.",
          link: "/docs/feature-management-experimentation/experimentation",
        },
        {
          title: "Release Agent",
          module: MODULES.fme,
          description:
            "Use the Release Agent in Harness FME to manage feature flags and experiments.",
          link: "/docs/feature-management-experimentation/release-agent",
        },
      ],
    },
    {
      name: "Management & Administration",
      description: "",
      list: [
        {
          title: "Team Settings",
          module: MODULES.fme,
          description:
            "Manage users, roles and projects to scale your experimentation.",
          link: "/docs/feature-management-experimentation/team-and-project-settings",
        },
        {
          title: "Account Settings",
          module: MODULES.fme,
          description: "Configure account-level settings for your organization.",
          link: "/docs/feature-management-experimentation/account-settings",
        },
        {
          title: "Integrations",
          module: MODULES.fme,
          description: "Connect Harness FME to messaging, monitoring, issue management, customer data platforms, and analytics tools.",
          link: "/docs/feature-management-experimentation/integrations",
        },
        {
          title: "API",
          module: MODULES.fme,
          description: "Access Harness FME programmatically with API references and examples.",
          link: "/docs/feature-management-experimentation/api",
        },
      ],
    },
    {
      name: "Troubleshooting & Resources",
      description: "",
      list: [
        {
          title: "Migrate from Split to Harness FME",
          module: MODULES.fme,
          description:
            "Step-by-step guidance to migrate your account from Split to Harness FME.",
          link: "/docs/feature-management-experimentation/split-to-harness",
        },
        {
          title: "Harness Support",
          module: MODULES.fme,
          description: "Find help and support for Harness FME.",
          link: "/docs/feature-management-experimentation/fme-support",
        },
      ],
    },
  ];
  /* Define the cards - end */