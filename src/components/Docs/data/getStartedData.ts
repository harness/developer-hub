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
          {
            title: "Start for free",
            module: MODULES.platform,
            description:
              "Use the Harness Software Delivery Platform for free.",
            link: "/docs/get-started/start-for-free",
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
          {
            title: "Harness FirstGen vs Harness NextGen",
            module: MODULES.platform,
            description:
              "Compare the two Harness product suite versions.",
            link: "/docs/get-started/harness-first-gen-vs-harness-next-gen",
          },
          {
            title: "Harness Platform architecture",
            module: MODULES.platform,
            description:
              "Learn about the Harness components and editions.",
            link: "/docs/get-started/harness-platform-architecture",
          },
          {
            title: "Harness key concepts",
            module: MODULES.platform,
            description:
              "Learn about the key concepts and terms used in Harness products.",
            link: "/docs/get-started/key-concepts",
          },
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