import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

  // Docs
  export const docsCards: CardSections = [
    {
      name: "Introduction",
      description:
        "",
      list: [
        {
          title: "Overview",
          module: MODULES.ce,
          description:
            "Learn about Harness Chaos Engineering features, use-cases, and benefits.",
          link: "/docs/chaos-engineering/overview",
        },
        {
          title: "Architecture",
          module: MODULES.ce,
          description:
            "Learn about the architecture of Harness Chaos Engineering.",
          link: "/docs/chaos-engineering/key-concepts#harness-chaos-engineering-architecture",
        },
        {
          title: "Getting Started",
          module: MODULES.ce,
          description:
            "Run your first chaos experiment in minutes with our comprehensive quickstart guide.",
          link: "/docs/chaos-engineering/quickstart",
        },
      ],
    },

    {
      name: "Feature highlights",
      description:
        "",
      list: [
        {
          title: "Chaos Faults",
          module: MODULES.ce,
          description:
            "Comprehensive fault library for Kubernetes, AWS, Azure, GCP, and infrastructure chaos.",
          link: "/docs/chaos-engineering/faults/chaos-faults",
        },
        {
          title: "Probes",
          module: MODULES.ce,
          description:
            "Monitor and validate system health during chaos experiments with various probe types.",
          link: "/docs/chaos-engineering/guides/probes",
        },
        {
          title: "Chaos Guard",
          module: MODULES.ce,
          description:
            "Chaos Guard provides additional layer of security to minimize blast radius and mitigate potential security threats.",
          link: "/docs/chaos-engineering/guides/governance/rbac",
        },
      ],
    },
    {
      name: "Integrations",
      description:
        "",
      list: [
        {
          title: "Onboard from Harness CD",
          module: MODULES.ce,
          description:
            "Run chaos experiments from your CD pipelines.",
          link: "/docs/chaos-engineering/integrations/cicd/one-click-cd-onboard",
        },
        {
          title: "Performance Testing Tools",
          module: MODULES.ce,
          description:
            "Combine chaos experiments with performance testing using Gatling and other load testing tools.",
          link: "/docs/chaos-engineering/integrations/performance-testing/gatling",
        },
        {
          title: "APM Tools",
          module: MODULES.ce,
          description:
            "Integrate with APM tools to monitor and validate system health during chaos experiments.",
          link: "/docs/chaos-engineering/guides/probes/apm-probes/",
        },
      ],
    } 
  ];
