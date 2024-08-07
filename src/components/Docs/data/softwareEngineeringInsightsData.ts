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
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "Get started with SEI",
            module: MODULES.sei,
            description:
              "Learn about the benefits and features of Harness Software Engineering Insights, as well as how to get started with SEI.",
            link: "/docs/category/get-started-with-sei/",
          },
          {
            title: "What's supported",
            module: MODULES.sei,
            description:
              "SEI integrates with a number of third-party providers to provide a centralized visibility on engineering work.",
            link: "/docs/software-engineering-insights/sei-supported-platforms",
          },
        ],
      },

      {
        name: "Configure",
        description:
          "",
        list: [
          {
            title: "Projects and Collections",
            module: MODULES.sei,
            description:
              "Collections keep your data organized.",
            link: "/docs/category/projects-and-collections",
          },
          {
            title: "Integrations",
            module: MODULES.sei,
            description:
              "SEI uses integrations to ingest data from your SDLC tools.",
            link: "/docs/software-engineering-insights/sei-integrations/sei-integrations-overview",
          },
          {
            title: "Profiles",
            module: MODULES.sei,
            description:
              "Profiles aggregate data for Trellis Scores, DORA metrics, and more.",
            link: "/docs/category/profiles",
          },
        ],
      },

      {
        name: "Analyze",
        description:
          "",
        list: [
          {
            title: "Insights",
            module: MODULES.sei,
            description:
              "Insights are dashboards that make it easy to visualize and interpret metrics that are captured by SEI.",
            link: "/docs/software-engineering-insights/insights/sei-insights",
          },
          {
            title: "Metrics and reports",
            module: MODULES.sei,
            description:
              "Reports are widgets that you add to your Insights. Reports present data synthesized from metrics ingested by SEI.",
            link: "/docs/category/metrics-and-reports",
          },
          {
            title: "Trellis Scores",
            module: MODULES.sei,
            description:
              "Trellis Scores are a proprietary scoring mechanism that helps you understand your team's productivity.",
            link: "/docs/category/trellis-scores",
          },
        ],
      },

      {
        name: "Help and more",
        description:
          "",
        list: [
          {
            title: "Propels",
            module: MODULES.sei,
            description:
              "Propels are a no-code/low-code way to use SEI to add human-in-the-loop automation to your SDLC.",
            link: "/docs/software-engineering-insights/sei-propels-scripts/propels-overview",
          },
          {
            title: "Troubleshooting and FAQs",
            module: MODULES.sei,
            description:
              "",
            link: "/docs/software-engineering-insights/sei-troubleshooting-faqs",
          },
          {
            title: "SEI Knowledge Base",
            module: MODULES.ci,
            description:
              "",
            link: "/kb/sei",
          },
        ],
      },
    ];
    /* Define the cards - end */