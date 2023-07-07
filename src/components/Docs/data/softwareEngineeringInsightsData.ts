import {
    CardItem,
    CardSections,
    docType,
  } from "@site/src/components/LandingPage/TutorialCard";
  import { MODULES } from "@site/src/constants"
  
  /* Define the cards - start */
  export const featuredTutorials: CardItem[] = []
  /* Uncomment if you want to show the Featured Tutorials section -->
  // Featured Tutorials
  export const featuredTutorials: CardItem[] = [
      {
        title: "tutorial title",
        module: MODULES.sei,
        icon: "img/icon_sei.svg",
        description: "tutorial description",
        newDoc: true,
        type: [docType.Documentation],
        time: "5min",
        link: "/tutorials/sei/tutorial-slug",
      },
    ];
    */

    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "SEI basics",
            module: MODULES.sei,
            description:
              "Learn about the benefits and features of Harness Software Engineering Insights, as well as how to get started with SEI.",
            link: "/docs/software-engineering-insights/sei-get-started/sei-overview",
          },
        ],
      },

      {
        name: "Configure",
        description:
          "",
        list: [
          {
            title: "Collections",
            module: MODULES.sei,
            description:
              "Collections keep your data organized.",
            link: "/docs/category/collections",
          },
          {
            title: "Connectors and integrations",
            module: MODULES.sei,
            description:
              "SEI uses connectors to ingest data from your SDLC tools.",
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
            link: "/docs/software-engineering-insights/sei-insights",
          },
          {
            title: "Alignment metrics",
            module: MODULES.sei,
            description:
              "Analyze your engineering team's investment efforts and alignment with business needs and strategic initiatives.",
            link: "/docs/software-engineering-insights/sei-metrics-and-reports/alignment-metrics",
          },
          {
            title: "Execution metrics",
            module: MODULES.sei,
            description:
              "Execution metrics include DORA metrics, flow metrics, velocity metrics, and quality and support metrics.",
            link: "/docs/category/execution",
          },
          {
            title: "Planning metrics",
            module: MODULES.sei,
            description:
              "Plan and deliver on sprints more effectively.",
            link: "/docs/software-engineering-insights/sei-metrics-and-reports/planning-sprint-metrics",
          },
          {
            title: "Security metrics",
            module: MODULES.sei,
            description:
              "Security metrics help you analyze anomalies or threats.",
            link: "/docs/software-engineering-insights/sei-metrics-and-reports/security-metrics",
          },
          {
            title: "Trellis Scores",
            module: MODULES.sei,
            description:
              "Trellis Scores are a proprietary scoring mechanism that helps you understand your team's productivity.",
            link: "/docs/software-engineering-insights/sei-metrics-and-reports/trellis-score",
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
        ],
      },
    ];
    /* Define the cards - end */