import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";
  
  /* Define the cards - start */

    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "Get started with AI DLC Insights",
            module: MODULES.sei,
            description:
              "Learn about Harness AI DLC Insights and how to get started.",
            link: "/docs/software-engineering-insights/harness-sei/sei-overview",
          },
          {
            title: "What's supported",
            module: MODULES.sei,
            description:
              "AI DLC Insights integrates with a number of third-party providers to provide a centralized visibility on engineering work.",
            link: "/docs/software-engineering-insights/sei-supported-platforms",
          },
          {
            title: "Key concepts",
            module: MODULES.sei,
            description:
              "This topic outlines the core concepts that power AI DLC Insights.",
            link: "/docs/software-engineering-insights/harness-sei/get-started/sei-key-concepts",
          },
        ],
      },

      {
        name: "Set up AI DLC Insights",
        description:
          "",
        list: [
          {
            title: "Configure Integrations",
            module: MODULES.sei,
            description:
              "AI DLC Insights uses integrations to ingest data from your SDLC tools.",
            link: "/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/",
          },
          {
            title: "Set up Profiles",
            module: MODULES.sei,
            description:
              "Profiles aggregate data for Efficiency, Productivity metrics, and more.",
            link: "/docs/software-engineering-insights/harness-sei/setup-sei/setup-profiles/",
          },
          {
            title: "Set up Org Trees",
            module: MODULES.sei,
            description:
              "Setup the org tree to group developers for performance visibility.",
            link: "/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree",
          },
          {
            title: "Set up & Manage Teams",
            module: MODULES.sei,
            description:
              "Setup Teams that represents a group of developers working together within the organizational hierarchy",
            link: "/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams",
          },
          {
            title: "API",
            module: MODULES.sei,
            description:
              "Programmatically manage developer identities and export productivity and efficiency metrics using the AI DLC Insights API.",
            link: "/docs/software-engineering-insights/harness-sei/api/developer-records",
          },
        ],
      },

      {
        name: "View AI DLC Insights",
        description:
          "",
        list: [
          {
            title: "Measure Engineering Efficiency",
            module: MODULES.sei,
            description:
              "Use the efficiency dashboard to measure key DORA and sprint-based metrics for your team.",
            link: "/docs/software-engineering-insights/harness-sei/insights/efficiency",
          },
          {
            title: "Measure Developer Productivity",
            module: MODULES.sei,
            description:
              "Use the productivity dashboard to measure the key productivity metrics for your developers.",
            link: "/docs/software-engineering-insights/harness-sei/insights/productivity",
          },
          {
            title: "Analyze AI Engineering",
            module: MODULES.sei,
            description:
              "Measure AI coding agent adoption, output, and cost-effectiveness across your engineering organization.",
            link: "/docs/software-engineering-insights/harness-sei/insights/ai-engineering",
          },
          {
            title: "Measure Business Alignment",
            module: MODULES.sei,
            description:
              "Track and analyze how engineering initiatives contribute to business outcomes.",
            link: "/docs/software-engineering-insights/harness-sei/insights/business-alignment",
          },
          {
            title: "Analyze Security Insights",
            module: MODULES.sei,
            description:
              "Identify and analyze security hotspots and trends across your engineering organization.",
            link: "/docs/software-engineering-insights/harness-sei/insights/security",
          },
        ],
      },

      {
        name: "Help and more",
        description:
          "",
        list: [
          {
            title: "Harness Support",
            module: MODULES.sei,
            description:
              "If you believe you have found a bug in Harness AI DLC Insights, please create a Zendesk Support ticket.",
            link: "/docs/software-engineering-insights/sei-support",
          },
          {
            title: "Troubleshooting and FAQs",
            module: MODULES.sei,
            description:
              "Use this for troubleshooting guidelines on Harness AI DLC Insights",
            link: "/docs/category/sei-troubleshooting",
          },
        ],
      },
    ];
    /* Define the cards - end */
