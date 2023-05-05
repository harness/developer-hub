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
            title: "CET tutorials",
            module: MODULES.cet,
            description:
              "Dive in with these hands-on tutorials.",
            link: "/tutorials/error-tracking",
          },
          {
            title: "Overview",
            module: MODULES.cet,
            description:
              "Understand concepts and benefits.",
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
            title: "View events",
            module: MODULES.cet,
            description:
              "Get a comprehensive view of all the monitored services and events.",
            link: "/docs/continuous-error-tracking/getting-started/cet-event-dashboard",
          },
          {
            title: "Explore events",
            module: MODULES.cet,
            description:
              "Learn to work with event types such as critical, resolved, resurfaced, and hidden.",
            link: "/docs/category/event-explorer",
          },
          {
            title: "Resolve events",
            module: MODULES.cet,
            description:
              "Get to the root of events in production and staging environments using the Automated Root Cause (ARC) screen.",
            link: "/docs/continuous-error-tracking/getting-started/cet-arc",
          },
          {
            title: "Create Jira tickets",
            module: MODULES.cet,
            description:
              "Create Jira tickets right from the event.",
            link: "/docs/continuous-error-tracking/create-jira-ticket",
          },
          {
            title: "Set up notifications",
            module: MODULES.cet,
            description:
              "Alert your team whenever new, resurfaced, or critical events occur.",
            link: "/docs/continuous-error-tracking/cet-notifications",
          },
        ],
      },
      
  ];

 /* Uncomment if you want to show the Featured Tutorials section -->
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
*/

    /* Define the cards - end */