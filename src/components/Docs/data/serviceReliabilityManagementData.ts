import {
    CardItem,
    CardSections,
    docType,
} from "../../LandingPage/TutorialCard";
  
/* Define the cards - start */
// Featured Tutorials
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Essentials",
        description:
          "",
        list: [
          {
            title: "Overview",
            module: "srm",
            description:
              "Learn about SRM and how it can benefit you.",
            link: "/docs/service-reliability-management/getting-started/srm-intro",
          },
          {
            title: "Key concepts",
            module: "srm",
            description:
              "Understand concepts such as SLOs, SLIs, and error budgets.",
            link: "/docs/service-reliability-management/getting-started/service-reliability-management-basics",
          },
          {
            title: "Your first SLO",
            module: "srm",
            description:
              "Learn how to create, track, and monitor a SLO.",
            link: "/docs/service-reliability-management/getting-started/create-first-slo",
          },
        ],
      },

      {
        name: "Manage SLOs",
        description:
          "",
        list: [
          {
            title: "SLO types",
            module: "srm",
            description:
              "Explore the different types of SLOs, such as composite SLOs and SLO as Code, and learn how to create and use them.",
            link: "/docs/category/slo-types",
          },
          {
            title: "SLO downtime",
            module: "srm",
            description:
              "Learn how to schedule a maintenance window for your service without impacting the SLO.",
            link: "/docs/category/slo-downtime",
          },
          {
            title: "Change impact analysis",
            module: "srm",
            description:
              "Learn how to conduct change impact analysis by tracking health and change events in your service.",
            link: "/docs/category/change-impact-analysis",
          },
        ],
      },

      {
        name: "Explore health and change sources",
        description:
          "",
        list: [
          {
            title: "Change source catalog",
            module: "srm",
            description:
              "Explore the range of change sources supported by Harness and learn how to add them to your monitored service.",
            link: "/docs/category/change-sources-catalog",
          },
          {
            title: "Health source catalog",
            module: "srm",
            description:
              "Discover the range of health sources supported by Harness and learn how to add them to your monitored service.",
            link: "/docs/category/health-sources-catalog",
          },
        ],
      },
      
  ];

  // Featured Tutorials
export const featuredTutorials: CardItem[] = [
  {
    title: "SLO Management with Prometheus",
    module: MODULES.srm,
    icon: "img/icon_ce.srm",
    description: "Measure and manage your SLOs leveraging Prometheus.",
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/service-reliability/slo-prometheus",
  },
];
    /* Define the cards - end */