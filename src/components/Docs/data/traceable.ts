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
          title: "Overview",
          module: MODULES.srm,
          description:
            "Key features and functionality of SRM.",
          link: "/docs/service-reliability-management/get-started/overview",
        },
        {
          title: "Key concepts",
          module: MODULES.srm,
          description:
            "Understand concepts such as SLOs, SLIs, and error budgets.",
          link: "/docs/service-reliability-management/get-started/key-concepts",
        },
        {
          title: "Your first SLO",
          module: MODULES.srm,
          description:
            "Learn how to create, track, and monitor an SLO.",
          link: "/docs/service-reliability-management/get-started/create-first-slo",
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
          module: MODULES.srm,
          description:
            "Explore different types of SLOs, such as composite SLOs and SLO as Code, and learn how to create and use them.",
          link: "/docs/category/slo-types",
        },
        {
          title: "SLO downtime",
          module: MODULES.srm,
          description:
            "Schedule a maintenance window for your service without impacting the SLO.",
          link: "/docs/category/slo-downtime",
        },
        {
          title: "Add SLO annotations",
          module: MODULES.srm,
          description:
            "Add annotations about specific events or changes that affect service performance and the error budgets.",
          link: "/docs/service-reliability-management/manage-slo/slo-annoations",
        },
      ],
    },

    {
      name: "Measure service health and impact of changes",
      description:
        "",
      list: [
         {
          title: "Change impact analysis",
          module: MODULES.srm,
          description:
            "Conduct change impact analysis by tracking health and change events in your service.",
          link: "/docs/category/change-impact-analysis",
        },
        {
          title: "Change source catalog",
          module: MODULES.srm,
          description:
            "Explore the range of change sources supported by Harness and learn how to add them to your monitored service.",
          link: "/docs/category/change-sources-catalog",
        },
        {
          title: "Health source catalog",
          module: MODULES.srm,
          description:
            "Explore the range of health sources supported by Harness and learn how to add them to your monitored service.",
          link: "/docs/category/health-sources-catalog",
        },
      ],
    },
  ];
  /* Define the cards - end */