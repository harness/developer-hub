import {
    CardItem,
    CardSections,
    docType,
} from "../../LandingPage/TutorialCard";

  
  /* Define the cards - start */
  export const featuredTutorials: CardItem[] = []
/* Uncomment if you want to show the Featured Tutorials section -->
  // Featured Tutorials
  export const featuredTutorials: CardItem[] = [
      {
        title: "Get started for free with the fastest CI on the planet",
        module: "ci",
        icon: "img/icon_ci.svg",
        description: "Get started with Harness CI and explore some of the features that make it four times faster than the leading competitor.",
        newDoc: true,
        type: [docType.Documentation],
        time: "5min",
        link: "/tutorials/build-code/fastest-ci",
      },
      {
        title: "Terraform Cloud notification triggers",
        module: "ci",
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
        name: "Learn Harness fundamentals",
        description:
          "",
        list: [
          {
            title: "Harness UI overview",
            module: "gs",
            description:
              "Explore the Harness UI and learn how to navigate to different modules.",
            link: "/docs/getting-started/harness-ui-overview",
          },
          {
            title: "Harness FirstGen vs Harness NextGen",
            module: "gs",
            description:
              "Compare the two Harness product suite versions.",
            link: "/docs/getting-started/harness-first-gen-vs-harness-next-gen",
          },
          {
            title: "Harness Platform architecture",
            module: "gs",
            description:
              "Learn about the Harness components and editions.",
            link: "/docs/getting-started/harness-platform-architecture",
          },
          {
            title: "Harness key concepts",
            module: "gs",
            description:
              "Learn about the key concepts and terms used in Harness products.",
            link: "/docs/getting-started/learn-harness-key-concepts",
          },
          {
            title: "Supported platforms and technologies",
            module: "gs",
            description:
              "Review the platforms, methodologies, and related technologies that Harness supports.",
            link: "/docs/getting-started/supported-platforms-and-technologies",
          },
        ],
      },

      {
        name: "Start using Harness modules",
        description:
          "",
        list: [
          {
            title: "Tutorials and quickstart guides",
            module: "gs",
            description:
              "New to Harness? Follow these quickstarts and tutorials to go from novice to advanced.",
            link: "/docs/getting-started/quickstarts",
          },
          {
            title: "Start a free trial",
            module: "gs",
            description:
              "Try the Harness Software Delivery Platform for free.",
            link: "/docs/getting-started/start-a-free-trial",
          },
        ],
      },
    ];
    /* Define the cards - end */