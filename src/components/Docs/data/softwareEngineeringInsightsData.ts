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
            link: "/docs/category/get-started-with-sei-20/",
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
        name: "Set up SEI",
        description:
          "",
        list: [
          {
            title: "Configure integrations",
            module: MODULES.sei,
            description:
              "SEI uses integrations to ingest data from your SDLC tools.",
            link: "/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/overview",
          },
          {
            title: "Set up profiles",
            module: MODULES.sei,
            description:
              "Profiles aggregate data for Efficiency, Productivity metrics, and more.",
            link: "/docs/category/set-up-profiles",
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
        ],
      },

      {
        name: "Analytics & reporting",
        description:
          "",
        list: [
          {
            title: "Measure team efficiency",
            module: MODULES.sei,
            description:
              "Use the efficiency dashboard to measure the key DORA metrics for your team.",
            link: "/docs/software-engineering-insights/harness-sei/analytics-and-reporting/efficiency",
          },
          {
            title: "Measure developer productivity",
            module: MODULES.sei,
            description:
              "Use the productivity dashboard to measure the key productivity metrics for your developers.",
            link: "/docs/software-engineering-insights/harness-sei/analytics-and-reporting/productivity",
          },
          {
            title: "Business Alignment",
            module: MODULES.sei,
            description:
              "Track and analyze how engineering initiatives contribute to business outcomes.",
            link: "/docs/software-engineering-insights/harness-sei/analytics-and-reporting/business-alignment",
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