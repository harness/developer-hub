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
      name: "Certifications",
      description:
        "Test and validate your knowledge of modern software delivery by becoming a Harness Certified Expert.",
      list: [
        {
          title: "Continuous Integration",
          module: MODULES.ci,
          description:
            "Assess key technical job functions and advanced skills in design, implementation and management of CI.",
          link: "/university/certifications/continuous-integration",
        },
        {
          title: "Continuous Delivery & GitOps",
          module: MODULES.cd,
          description:
            "Assess key technical job functions and advanced skills in design, implementation and management of CD & GitOps",
          link: "/university/certifications/continuous-delivery",
        },
        {
          title: "Feature Flags",
          module: MODULES.ff,
          description:
            "Assess key technical job functions and advanced skills in design, implementation and management of Feature Flags.",
          link: "/university/certifications/feature-flags",
        },
        {
          title: "Cloud Cost Management",
          module: MODULES.ccm,
          description:
            "Assess key technical job functions and advanced skills in design, implementation and management of Cloud Cost Management.",
          link: "/university/certifications/cloud-cost-management",
        },
        {
          title: "Security Testing Orchestration",
          module: MODULES.sto,
          description:
            "Assess key technical job functions and advanced skills in design, implementation and management of Security Testing Orchestration.",
          link: "/university/certifications/sto",
        },
        {
          title: "Chaos Engineering",
          module: MODULES.ce,
          description:
            "Assess key technical job functions and advanced skills in design, implementation and management of Chaos Engineering.",
          link: "university/certifications/chaos-engineering",
        },
      ],
    },
    {
      name: "Instructor Led Training",
      description:
        "Virtual and dedicated courses to accelerate your knowledge.",
      list: [
        {
          title: "Continuous Delivery & GitOps",
          module: MODULES.cd,
          description:
            "Instructor Led Training for Harness Continuous Delivery & GitOps is designed to be delivered over the course of multiple days.",
          link: "/university/instructor-led-training/continuous-delivery",
        },
      ],
  }
];
/* Define the cards - end */
