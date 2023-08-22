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
        link: "/tutorials/build-code/tfc-notification",
      },
    ];
    */
    
    // Docs
    export const docsCards: CardSections = [
      {
        name: "Start using Harness modules",
        description:
          "",
        list: [
          {
            title: "Tutorials",
            module: MODULES.platform,
            description:
              "New to Harness? Follow these tutorials to go from novice to advanced.",
            link: "/tutorials",
          },
          {
            title: "Start for free",
            module: MODULES.platform,
            description:
              "Use the Harness Software Delivery Platform for free.",
            link: "/docs/getting-started/start-for-free",
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
            link: "/docs/getting-started/harness-ui-overview",
          },
          {
            title: "Harness FirstGen vs Harness NextGen",
            module: MODULES.platform,
            description:
              "Compare the two Harness product suite versions.",
            link: "/docs/getting-started/harness-first-gen-vs-harness-next-gen",
          },
          {
            title: "Harness Platform architecture",
            module: MODULES.platform,
            description:
              "Learn about the Harness components and editions.",
            link: "/docs/getting-started/harness-platform-architecture",
          },
          {
            title: "Harness key concepts",
            module: MODULES.platform,
            description:
              "Learn about the key concepts and terms used in Harness products.",
            link: "/docs/getting-started/learn-harness-key-concepts",
          },
          {
            title: "Supported platforms and technologies",
            module: MODULES.platform,
            description:
              "Review the platforms, methodologies, and related technologies that Harness supports.",
            link: "/docs/getting-started/supported-platforms-and-technologies",
          },
        ],
      },
    ];
    /* Define the cards - end */