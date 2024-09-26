import {
    CardItem,
    CardSections,
    docType,
  } from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants";
  
  /* Define the cards - start */
  
  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get Started",
      description: "",
      list: [
        {
          title: "Overview",
          module: MODULES.ar,
          description:
            "Learn how to create and manage an artifact registry",
          link: "/docs/artifact-registry/overview",
        },
        {
          title: "Manage Artifacts",
          module: MODULES.ar,
          description: "Learn how to manage your artifacts in Artifact Registry.",
          link: "/docs/artifact-registry/artifacts",
        },
      ],
    },
  ];