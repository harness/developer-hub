import {
    CardItem,
    CardSections,
    docType,
  } from "@site/src/components/LandingPage/TutorialCard";
  import { MODULES } from "@site/src/constants"
  
/* Define the cards - start */
// Featured Tutorials
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "Overview",
            module: MODULES.cet,
            description:
              "Learn about Continuous Error Tracking (CET) and how it can benefit you.",
            link: "/tutorials/service-reliability",
          },
          {
            title: "Key concepts",
            module: MODULES.cet,
            description:
              "Understand concepts such as CET Agent.",
            link: "/docs/continuous-error-tracking/getting-started/cet-overview",
          },
          {
            title: "Start tracking errors",
            module: MODULES.cet,
            description:
              "Learn how to install CET Agent and track errors.",
            link: "/docs/continuous-error-tracking/getting-started/cet-setup",
          },
        ],
      },

      {
        name: "Manage events",
        description:
          "",
        list: [
          {
            title: "Explore events",
            module: MODULES.cet,
            description:
              "Learn to work with event types such as critical, resolved, resurfaced, and hidden.",
            link: "/docs/category/event-explorer",
          },
          {
            title: "Create Jira tickets",
            module: MODULES.cet,
            description:
              "Create Jira tickets right from the event.",
            link: "/docs/continuous-error-tracking/create-jira-ticket",
          },
          {
            title: "Setup notifications",
            module: MODULES.cet,
            description:
              "Alert your team whenever new, resurfaced, or critical events occur.",
            link: "/docs/continuous-error-tracking/cet-notifications",
          },
        ],
      },
      
  ];

  // Featured Tutorials
export const featuredTutorials: CardItem[] = [
  {
    title: "Find and fix Java exceptions",
    module: MODULES.cet,
    icon: "img/icon_cet.svg",
    description: "Learn about types of Java exceptions and how to fix them.",
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/service-reliability/slo-prometheus",
  },
];
    /* Define the cards - end */