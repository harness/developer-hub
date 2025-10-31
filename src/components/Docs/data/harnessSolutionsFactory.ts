import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Get started with Harness Solutions Factory",
    description: "",
    list: [
      {
        title: "Get Started",
        module: MODULES.hsf,
        description: "Get started with Harness Solutions Factory.",
        link: "/docs/harness-solutions-factory/new-to-hsf/get-started",
      },
      {
        title: "Overview & Key concepts",
        module: MODULES.hsf,
        description: "Overview & Key concepts of the Harness Solutions Factory.",
        link: "/docs/harness-solutions-factory/new-to-hsf/overview",
      },
    ],
  },
  {
    name: "Use Harness Solutions Factory",
    description: "",
    list: [
      {
        title: "Resources",
        module: MODULES.hsf,
        description: "Learn how to create and manage common Harness resources.",
        link: "/docs/harness-solutions-factory/use-hsf/created-resources",
      },
      {
        title: "Workflows",
        module: MODULES.hsf,
        description:
          "Learn about how workflows improve your experience on the Harness platform.",
        link: "/docs/harness-solutions-factory/use-hsf/workflows",
      },
      {
        title: "Template Library",
        module: MODULES.hsf,
        description: "Explore template for Developer Environment Setup",
        link: "/docs/category/harness-template-library",
      },
    ],
  },
  {
    name: "Troubleshooting & FAQs",
    description: "",
    list: [
      {
        title: "HSF Best Practices",
        module: MODULES.hsf,
        description:
          "Learn about the best practices for Harness Solutions Factory.",
        link: "/docs/category/best-practices-1",
      },
      {
        title: "FAQs",
        module: MODULES.hsf,
        description:
          "Frequently Asked Questions about Harness Solutions Factory.",
        link: "/docs/harness-solutions-factory/faq",
      },
    ],
  },
];
/* Define the cards - end */
