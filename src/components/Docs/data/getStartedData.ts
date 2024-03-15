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
            link: "/docs/get-started/harness-ui-overview",
          },
          //{
          //  title: "Harness key concepts",
          //  module: MODULES.platform,
          //  description:
          //    "Learn about the key concepts and terms used in Harness products.",
          // link: "/docs/get-started/key-concepts",
          //},
          {
            title: "Supported platforms and technologies",
            module: MODULES.platform,
            description:
              "Review the platforms, methodologies, and related technologies that Harness supports.",
            link: "/docs/get-started/supported-platforms-and-technologies",
          },
        ],
      },
    ];
    /* Define the cards - end */