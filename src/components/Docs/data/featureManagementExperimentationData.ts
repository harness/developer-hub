import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants"

/* Define the cards - start */

  // Docs
  export const docsCards: CardSections = [
    {
      name: "Getting started",
      description: "",
      list: [
        {
          title: "Getting started",
          module: MODULES.fme,
          description:
            "Quickstarts and key concepts",
          link: "/docs/feature-management-experimentation/getting-started/docs/onboarding-guide",
        },
        {
          title: "What's supported",
          module: MODULES.fme,
          description:
            "Platforms and technologies supported in FME",
          link: "/docs/feature-management-experimentation/getting-started/whats-supported",
        },
      ],
    },
    {
      name: "Help and more",
      description: "",
      list: [
        {
          title: "Harness FME support",
          module: MODULES.fme,
          description: "Open a support ticket with us",
          link: "/docs/feature-management-experimentation/fme-support",
        },
      ],
    },
    /* Not sure if we want these because
     - if docs are well written, they may be mostly unneeded
     - if they are needed, they should likely be close to the related instructions/topic
    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "Troubleshoot FME",
          module: MODULES.fme,
          description:
            "Troubleshooting guides for Harness FME",
          link: "/kb/feature-flags/articles/troubleshooting-guide",
        },
        {
          title: "FME FAQs",
          module: MODULES.fme,
          description:
            "Frequently asked questions about Harness FME",
          link: "/docs/faqs/harness-feature-flag-faqs",
        },
        {
          title: "FME Knowledge base",
          module: MODULES.fme,
          description:
            "In-depth knowledge base articles",
          link: "/kb/feature-flags",
        },
      ],
    },
    */
  ];
  /* Define the cards - end */