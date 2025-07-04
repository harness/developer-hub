import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

  // Docs
  export const docsCards: CardSections = [
    {
      name: "Get started",
      description:
        "",
      list: [
        {
          title: "Get started with Chaos Engineering",
          module: MODULES.ce,
          description:
            "Learn about chaos engineering principles, benefits, and how to get started with your first experiments.",
          link: "/docs/chaos-engineering-new/overview",
        },
        {
          title: "Core Concepts",
          module: MODULES.ce,
          description:
            "Understand the fundamental concepts of Harness Chaos Engineering.",
          link: "/docs/chaos-engineering-new/key-concepts",
        },
        {
          title: "Quick Start Guide",
          module: MODULES.ce,
          description:
            "Run your first chaos experiment in minutes with our comprehensive quickstart guide.",
          link: "/docs/chaos-engineering-new/quickstart",
        },
      ],
    },

    {
      name: "Feature highlights",
      description:
        "",
      list: [
        {
          title: "Chaos Experiments",
          module: MODULES.ce,
          description:
            "Create, run, and analyze chaos experiments with comprehensive experiment management.",
          link: "/docs/chaos-engineering-new/guides/chaos-experiments",
        },
        {
          title: "Chaos Faults",
          module: MODULES.ce,
          description:
            "Comprehensive fault library for Kubernetes, AWS, Azure, GCP, and infrastructure chaos.",
          link: "/docs/chaos-engineering-new/faults/chaos-faults",
        },
        {
          title: "Resilience Probes",
          module: MODULES.ce,
          description:
            "Monitor and validate system health during chaos experiments with various probe types.",
          link: "/docs/chaos-engineering-new/guides/probes",
        },
      ],
    },

    {
      name: "Guides & Management",
      description:
        "",
      list: [
        {
          title: "Application Maps",
          module: MODULES.ce,
          description:
            "Visualize and understand your application topology for targeted chaos experiments.",
          link: "/docs/chaos-engineering-new/guides/application-maps",
        },
        {
          title: "GameDays",
          module: MODULES.ce,
          description:
            "Organize and run collaborative chaos engineering exercises with your team.",
          link: "/docs/chaos-engineering-new/guides/gamedays",
        },
        {
          title: "Infrastructure Management",
          module: MODULES.ce,
          description:
            "Set up and manage chaos infrastructure for Kubernetes and on-premises environments.",
          link: "/docs/chaos-engineering-new/guides/infrastructures",
        },
        {
          title: "Custom Faults",
          module: MODULES.ce,
          description:
            "Create custom chaos faults using BYOC, scripts, HTTP calls, and database operations.",
          link: "/docs/chaos-engineering-new/faults/custom-faults",
        },
        {
          title: "On-premises (SMP)",
          module: MODULES.ce,
          description:
            "Deploy and manage Harness Chaos Engineering in self-managed platform environments.",
          link: "/docs/chaos-engineering-new/guides/on-premises-smp",
        },
      ],
    },

    {
      name: "Integrations & Advanced",
      description:
        "",
      list: [
        {
          title: "CI/CD Integration",
          module: MODULES.ce,
          description:
            "Integrate chaos testing into your CI/CD pipelines for continuous resilience validation.",
          link: "/docs/chaos-engineering-new/integrations/cicd",
        },
        {
          title: "Performance Testing Tools",
          module: MODULES.ce,
          description:
            "Integrate with JMeter, Gatling, K6, and other performance testing tools for comprehensive validation.",
          link: "/docs/chaos-engineering-new/integrations/performance-testing",
        },
        {
          title: "Security & Governance",
          module: MODULES.ce,
          description:
            "Implement security best practices, RBAC, and governance policies for chaos engineering.",
          link: "/docs/chaos-engineering-new/security",
        },
      ],
    },

    {
      name: "Help and Resources",
      description:
        "",
      list: [
        {
          title: "Troubleshooting Guide",
          module: MODULES.ce,
          description:
            "Common issues and solutions for infrastructure, experiments, and platform troubleshooting.",
          link: "/docs/chaos-engineering-new/resources/troubleshooting",
        },
        {
          title: "AI Reliability Agent",
          module: MODULES.ce,
          description:
            "Leverage AI-powered insights for intelligent experiment recommendations and analysis.",
          link: "/docs/chaos-engineering-new/guides/ai/ai-reliability-agent",
        },
        {
          title: "Chaos Engineering Knowledge Base",
          module: MODULES.ce,
          description:
            "Comprehensive knowledge base with tutorials, examples, and troubleshooting guides.",
          link: "/kb/chaos-engineering",
        },
      ],
    },
  ];
  /* Define the cards - end */
