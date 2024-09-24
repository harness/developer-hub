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
      name: "Learn more",
      description: "",
      list: [
        {
          title: "Overview",
          module: MODULES.cde,
          description:
            "Learn how to provision pre-configured Cloud Developer Environments for seamless development ",
          link: "/docs/cloud-development-environment/get-started/overview",
        },
        {
          title: "Getting Started with CDE",
          module: MODULES.cde,
          description: "Set up your CDE.",
          link: "/docs/cloud-development-environment/get-started/getting-started-with-cde",
        },
      ],
    },
    {
      name: "Learn CDE fundamentals",
      description: "",
      list: [
        {
          title: "Develop Using CDE",
          module: MODULES.cde,
          description: "Learn how to do seamless development",
          link: "/docs/category/develop-using-cde",
        },
        {
          title: "Manage Your CDE",
          module: MODULES.cde,
          description: "Learn how to configure your git providers and IDEs using CDE",
          link: "/docs/category/manage-gitspace",
        },
      ],
    },
  ];