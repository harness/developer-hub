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
            title: "What's supported",
            module: MODULES.cet,
            description:
              "Supported platforms and technologies",
            link: "/docs/continuous-error-tracking/whats-supported",
          },
          {
            title: "Overview",
            module: MODULES.cet,
            description:
              "Understand concepts and benefits.",
            link: "/docs/continuous-error-tracking/get-started/overview",
          },
          {
            title: "Start tracking errors",
            module: MODULES.cet,
            description:
              "Learn how to install CET Agent and track errors.",
            link: "/docs/continuous-error-tracking/get-started/onboarding-guide",
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
            link: "/docs/continuous-error-tracking/get-started/cet-event-dashboard",
          },
          {
            title: "Explore events",
            module: MODULES.cet,
            description:
              "Explore the Event Distribution Graph feature and learn to work with event types such as critical, resolved, resurfaced, and hidden.",
            link: "/docs/category/event-explorer",
          },
          {
            title: "Resolve events",
            module: MODULES.cet,
            description:
              "Get to the root of events in production and staging environments using the Automated Root Cause (ARC) screen.",
            link: "/docs/continuous-error-tracking/get-started/cet-arc",
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

    /* Define the cards - end */