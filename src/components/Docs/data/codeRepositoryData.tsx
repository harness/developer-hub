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
        link: "/tutorials/ci-pipelines/build/tfc-notification",
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
            title: "Get started with Harness Code Repository",
            module: MODULES.code,
            description:
              "Learn about the benefits, features, and architecture of Harness Code, as well as basic Code concepts.",
            link: "/docs/category/get-started-with-code",
          },
          {
            title: "Onboarding guide",
            module: MODULES.code,
            description:
              "Dive in.",
            link: "/docs/code-repository/get-started/onboarding-guide",
          },
        ],
      },
  
      {
        name: "Feature highlights",
        description:
          "",
        list: [
          {
            title: "Create repositories",
            module: MODULES.ci,
            description:
              "Create repositories for your code.",
            link: "/docs/code-repository/get-started/onboarding-guide",
          },
          {
            title: "Feature 2",
            module: MODULES.ci,
            description:
              "Description 2.",
            link: "/docs/code-repository/get-started/onboarding-guide",
          },
        ],
      },

    ];
    /* Define the cards - end */