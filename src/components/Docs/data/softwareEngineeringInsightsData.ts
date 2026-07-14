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
            title: "Get started with Software Engineering Insights",
            module: MODULES.sei,
            description:
              "Learn about Harness Software Engineering Insights and how to get started.",
            link: "/docs/software-engineering-insights/propelo-sei/get-started/overview",
          },
          {
            title: "What's supported",
            module: MODULES.sei,
            description:
              "Software Engineering Insights integrates with a number of third-party providers to provide a centralized visibility on engineering work.",
            link: "/docs/software-engineering-insights/sei-supported-platforms",
          },
          {
            title: "Key concepts",
            module: MODULES.sei,
            description:
              "This topic outlines the core concepts that power Software Engineering Insights.",
            link: "/docs/software-engineering-insights/propelo-sei/get-started/sei-key-concepts",
          },
        ],
      },

      {
        name: "Set up Software Engineering Insights",
        description:
          "",
        list: [
          {
            title: "Configure Integrations",
            module: MODULES.sei,
            description:
              "Software Engineering Insights uses integrations to ingest data from your SDLC tools.",
            link: "/docs/category/configure-integrations",
          },
          {
            title: "Set up the Ingestion Satellite",
            module: MODULES.sei,
            description:
              "Deploy and configure the Ingestion Satellite to securely collect data from your environment.",
            link: "/docs/category/ingestion-satellite",
          },
          {
            title: "Manage Contributors",
            module: MODULES.sei,
            description:
              "Map and manage developer identities across your integrated tools.",
            link: "/docs/category/contributors",
          },
          {
            title: "Projects & Collections",
            module: MODULES.sei,
            description:
              "Organize repositories and engineering work into projects and collections for reporting.",
            link: "/docs/category/projects-and-collections",
          },
        ],
      },

      {
        name: "Configure Software Engineering Insights",
        description:
          "",
        list: [
          {
            title: "Create Profiles",
            module: MODULES.sei,
            description:
              "Configure Profiles to define the engineering groups and metrics you want to analyze.",
            link: "/docs/category/create--manage-profiles",
          },
          {
            title: "Manage Dashboards",
            module: MODULES.sei,
            description:
              "Use dashboards to visualize engineering metrics and trends.",
            link: "/docs/category/analytics--reporting",
          },
          {
            title: "Workflow Automation",
            module: MODULES.sei,
            description:
              "Automate repetitive tasks and streamline your development workflow.",
            link: "/docs/category/workflow-automation",
          },
          {
            title: "Access Control",
            module: MODULES.sei,
            description:
              "Manage and control access to your engineering resources and data.",
            link: "/docs/category/access-control-for-sei",
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
