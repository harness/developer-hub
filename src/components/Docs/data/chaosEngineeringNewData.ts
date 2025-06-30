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
          link: "/docs/chaos-engineering-new/get-started",
        },
        {
          title: "Core Concepts",
          module: MODULES.ce,
          description:
            "Understand the fundamental concepts of Harness Chaos Engineering.",
          link: "/docs/chaos-engineering-new/concepts",
        },
        {
          title: "Quick Start Tutorial",
          module: MODULES.ce,
          description:
            "Run your first chaos experiment in minutes with our step-by-step guide.",
          link: "/docs/chaos-engineering-new/get-started/quick-start",
        },
      ],
    },

    {
      name: "Feature highlights",
      description:
        "",
      list: [
        {
          title: "Fault Injection",
          module: MODULES.ce,
          description:
            "Simulate various failure scenarios including CPU stress, memory exhaustion, network latency, and service failures.",
          link: "/docs/chaos-engineering-new/concepts/fault-injection",
        },
        {
          title: "Automated Experiments",
          module: MODULES.ce,
          description:
            "Schedule and automate chaos experiments to continuously validate system resilience.",
          link: "/docs/chaos-engineering-new/concepts/automation",
        },
        {
          title: "Multi-Platform Support",
          module: MODULES.ce,
          description:
            "Run chaos experiments on Kubernetes, AWS, Azure, GCP, and on-premises infrastructure.",
          link: "/docs/chaos-engineering-new/integrations",
        },
      ],
    },

    {
      name: "Create experiments",
      description:
        "",
      list: [
        {
          title: "Experiment Design",
          module: MODULES.ce,
          description:
            "Learn how to design effective chaos experiments with proper hypothesis and success criteria.",
          link: "/docs/chaos-engineering-new/tutorials/experiment-design",
        },
        {
          title: "Infrastructure Chaos",
          module: MODULES.ce,
          description:
            "Create experiments targeting infrastructure components like CPU, memory, network, and disk.",
          link: "/docs/chaos-engineering-new/tutorials/infrastructure-chaos",
        },
        {
          title: "Application Chaos",
          module: MODULES.ce,
          description:
            "Test application resilience with service failures, latency injection, and error simulation.",
          link: "/docs/chaos-engineering-new/tutorials/application-chaos",
        },
        {
          title: "Kubernetes Chaos",
          module: MODULES.ce,
          description:
            "Run chaos experiments on Kubernetes clusters with pod, node, and resource-level faults.",
          link: "/docs/chaos-engineering-new/tutorials/kubernetes-chaos",
        },
        {
          title: "Cloud Provider Chaos",
          module: MODULES.ce,
          description:
            "Execute cloud-specific chaos experiments on AWS, Azure, and GCP resources.",
          link: "/docs/chaos-engineering-new/tutorials/cloud-chaos",
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
          title: "Monitoring & Observability",
          module: MODULES.ce,
          description:
            "Connect with monitoring tools like Prometheus, Datadog, and New Relic for comprehensive experiment analysis.",
          link: "/docs/chaos-engineering-new/integrations/monitoring",
        },
        {
          title: "API Reference",
          module: MODULES.ce,
          description:
            "Complete API documentation for programmatic experiment management and automation.",
          link: "/docs/chaos-engineering-new/reference",
        },
      ],
    },

    {
      name: "Help and FAQs",
      description:
        "",
      list: [
        {
          title: "Troubleshooting",
          module: MODULES.ce,
          description:
            "Common issues and solutions for chaos engineering experiments.",
          link: "/docs/chaos-engineering-new/troubleshooting",
        },
        {
          title: "Best Practices",
          module: MODULES.ce,
          description:
            "Learn industry best practices for implementing chaos engineering in your organization.",
          link: "/docs/chaos-engineering-new/concepts/best-practices",
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
