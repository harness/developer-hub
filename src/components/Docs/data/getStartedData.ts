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
        name: "Start using Harness modules",
        description:
          "",
        list: [
          {
            title: "CD & GitOps onboarding guide",
            module: MODULES.cd,
            description:
              "A self-service onboarding guide for Harness CD & GitOps.",
            link: "/docs/continuous-delivery/cd-onboarding/new-user/onboarding-path",
          },
          {
            title: "Harness Platform onboarding guide",
            module: MODULES.platform,
            description:
              "A self-service onboarding guide for Harness Platform.",
            link: "/docs/platform/get-started/onboarding-guide",
          },
        ],
      },
      {
        name: "Learn Harness fundamentals",
        description:
          "",
        list: [
          {
            title: "Harness UI overview",
            module: MODULES.platform,
            description:
              "Explore the Harness UI and learn how to navigate to different modules.",
            link: "/docs/platform/get-started/harness-ui-overview",
          },
        ],
      },
    ];
    /* Define the cards - end */