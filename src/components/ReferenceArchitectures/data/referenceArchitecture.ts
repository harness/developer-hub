import { CardSections } from "@site/src/components/LandingPage/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */


export const ReferenceArchitecturesCards: CardSections = [
  {
    name: "Get started with Reference Architectures",
    description: "",
    list: [
      {
        title: "Infrastructure as Code Management: Best Practices",
        module: MODULES.iacm,
        description:
          "Get started with Infrastructure as Code Management reference architectures.",
        link: "/kb/category/infrastructure-as-code-management",
      },
      {
        title: "Cloud Cost Management",
        module: MODULES.platform,
        description:
          "Get started with Cloud Cost Management Reference Architectures.",
        link: "/kb/category/cloud-cost-management",
      },
      {
        title: "Software Engineering Insights",
        module: MODULES.sei,
        description: "Get started with Software Engineering Insights reference architectures",
        link: "/kb/reference-architectures/sei/sei-architecture",
      },
      {
        title: "Delegate Architecture Best Practices",
        module: MODULES.platform,
        description: "Design considerations for choosing the right Delegate Architecture",
        link: "/kb/reference-architectures/platform/delegate_architecture_bestpractices",
      },
    ],
  },
];
/* Define the cards - end */
