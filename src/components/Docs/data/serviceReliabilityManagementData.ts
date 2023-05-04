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
      title: "Get started for free with the fastest CI on the planet",
      module: MODULES.ci,
      icon: "img/icon_ci.svg",
      description: "Get started with Harness CI and explore some of the features that make it four times faster than the leading competitor.",
      newDoc: true,
      type: [docType.Documentation],
      time: "5min",
      link: "/tutorials/build-code/fastest-ci",
    },
    {
      title: "Terraform Cloud notification triggers",
      module: MODULES.ci,
      icon: "img/icon_ci.svg",
      description: "Terraform Cloud notifications can automatically trigger CI pipelines.",
      newDoc: true,
      type: [docType.Documentation],
      time: "9min",
      link: "/tutorials/build-code/build/tfc-notification",
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
          title: "Overview",
          module: MODULES.srm,
          description:
            "Learn about SRM and how it can benefit you.",
          link: "/tutorials/service-reliability",
        },
        {
          title: "Key concepts",
          module: MODULES.srm,
          description:
            "Understand concepts such as SLOs, SLIs, and error budgets.",
          link: "/docs/service-reliability-management/getting-started/service-reliability-management-basics",
        },
        {
          title: "Your first SLO",
          module: MODULES.srm,
          description:
            "Learn how to create, track, and monitor an SLO.",
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
          title: "Health source catalog",
          module: MODULES.srm,
          description:
            "Explore the range of health sources supported by Harness and learn how to add them to your monitored service.",
          link: "/docs/category/health-sources-catalog",
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
      ],
    },
  ];
  /* Define the cards - end */