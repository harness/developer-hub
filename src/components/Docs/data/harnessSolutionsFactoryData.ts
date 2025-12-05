import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get started with Harness Solutions Factory",
      description:
        "",
      list: [
        {
          title: "Onboarding guide",
          module: MODULES.cd,
          description:
            "Learn next steps for pre/post deployment of HSF.",
          link: "/docs/harness-solutions-factory/new-to-hsf/get-started",
        },
        {
          title: "Created Resources",
          module: MODULES.cd,
          description:
            "Understand what gets created when you deploy HSF into your account.",
          link: "/docs/harness-solutions-factory/use-hsf/created-resources",
        },
        {
          title: "HSF 2.3",
          module: MODULES.cd,
          description:
            "Learn about our newest release and how you can upgrade to this version.",
          link: "/docs/harness-solutions-factory/new-to-hsf/hsf2-2",
        },
      ],
    },
    {
      name: "Key features",
      description:
        "",
      list: [ 
        {
          title: "Workflows",
          module: MODULES.cd,
          description:
            "Learn about the best practice workflows that are provided with HSF.",
          link: "/docs/harness-solutions-factory/use-hsf/workflows",

        },
        {
          title: "Mini Factory and Factory Floor",
          module: MODULES.cd,
          description:
            "Understand how to enable fully distributed workspace setup and management",
          link: "/docs/harness-solutions-factory/use-hsf/mini-factory",
 
        }, 
      ],
    },
    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "HSF FAQs",
          module: MODULES.cd,
          description:
            "",
          link: "/docs/harness-solutions-factory/faqs",
        },
      ],
    },
  ];
  /* Define the cards - end */