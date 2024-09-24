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
        name: "Get started",
        description:
          "",
        list: [
          {
            title: "What's supported",
            module: MODULES.code,
            description:
              "Learn what features and functionality are supported by Harness Code.",
            link: "/docs/open-source",
          },
          {
            title: "Get started with Harness Open Source",
            module: MODULES.code,
            description:
              "Learn the benefits, features, and key concepts of the Harness Open Source.",
            link: "/docs/category/get-started-with-opensource",
          },
          {
            title: "Onboarding guide",
            module: MODULES.opensource,
            description:
              "Start using Harness Open Source.",
            link: "/docs/open-source/overview",
          },
        ],
      },

      {
        name: "Feature highlights",
        description:
          "",
        list: [
          {
            title: "Repositories",
            module: MODULES.code,
            description:
              "Create repositories and configure branch rules.",
            link: "/docs/category/manage-repositories",
          },
          {
            title: "Collaboration",
            module: MODULES.code,
            description:
              "Branch, commit, tag, and more.",
            link: "/docs/category/collaborate-and-develop",
          },
          {
            title: "Pull requests",
            module: MODULES.code,
            description:
              "Create, review, and merge PRs.",
            link: "/docs/category/pull-requests",
          },
          {
            title: "Pipelines",
            module: MODULES.code,
            description:
              "Build, test, and deploy code from your Harness Code repositories. Use webhooks to automate pipeline runs.",
            link: "/docs/category/run-pipelines",
          },
        ],
      },

    ];
    /* Define the cards - end */