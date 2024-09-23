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
            title: "Get started with Harness Open Source",
            module: MODULES.opensource,
            description:
              "Learn the benefits, features, and key concepts of the Harness Open Source.",
            link: "/docs/open-source/installation/quick_start",
          },
          {
            title: "Administration guide",
            module: MODULES.opensource,
            description:
              "Start using Harness Open Source as an admin.",
            link: "/docs/category/administration",
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
            module: MODULES.opensource,
            description:
              "Create and manage repositories.",
            link: "/docs/category/repositories",
          },
          {
            title: "Artifact Registries",
            module: MODULES.opensource,
            description:
              "Host, pull, and push artifacts - all within Harness Open Source.",
            link: "/docs/category/registries",
          },
          {
            title: "Gitspaces",
            module: MODULES.opensource,
            description:
              "Create and manage hosted development environments.",
            link: "/docs/category/gitspaces",
          },
          {
            title: "Pipelines",
            module: MODULES.opensource,
            description:
              "Build, test, and deploy code from Harness Open Source. Use webhooks to automate pipeline runs.",
            link: "/docs/category/pipelines-1",
          },
        ],
      },

    ];
    /* Define the cards - end */