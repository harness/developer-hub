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
            title: "Get started with SEI",
            module: MODULES.sei,
            description:
              "Learn about the benefits and features of Harness Software Engineering Insights, as well as how to get started with SEI.",
            link: "/docs/software-engineering-insights/harness-sei/sei-overview",
          },
          {
            title: "What's supported",
            module: MODULES.sei,
            description:
              "SEI integrates with a number of third-party providers to provide a centralized visibility on engineering work.",
            link: "/docs/software-engineering-insights/sei-supported-platforms",
          },
          {
            title: "Key concepts",
            module: MODULES.sei,
            description:
              "This topic outlines the core concepts that power SEI 2.0.",
            link: "/docs/software-engineering-insights/harness-sei/get-started/sei-key-concepts",
          },
        ],
      },

      {
        name: "Set up SEI 2.0",
        description:
          "",
        list: [
          {
            title: "Configure Integrations",
            module: MODULES.sei,
            description:
              "SEI uses integrations to ingest data from your SDLC tools.",
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
              "Programmatically manage developer identities and export productivity and efficiency metrics using the SEI API.",
            link: "/docs/software-engineering-insights/harness-sei/api/developer-records",
          },
        ],
      },

      {
        name: "Insights",
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
            title: "Measure Business Alignment",
            module: MODULES.sei,
            description:
              "Track and analyze how engineering initiatives contribute to business outcomes.",
            link: "/docs/software-engineering-insights/harness-sei/insights/business-alignment",
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
              "If you believe you have found a bug in Harness Software Engineering Insights, please create a Zendesk Support ticket.",
            link: "/docs/software-engineering-insights/sei-support",
          },
          {
            title: "Troubleshooting and FAQs",
            module: MODULES.sei,
            description:
              "Use this for troubleshooting guidelines on Harness Software Engineering Insights",
            link: "/docs/category/sei-troubleshooting",
          },
        ],
      },
    ];
    /* Define the cards - end */
