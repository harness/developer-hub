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
          module: MODULES.rt,
          description:
            "Learn about Harness Resilience Testing and the three pillars: Chaos, Load, and DR Testing.",
          link: "/docs/resilience-testing/overview",
        },
        {
          title: "Key Concepts",
          module: MODULES.rt,
          description:
            "Understand core resilience testing terminology and concepts.",
          link: "/docs/resilience-testing/key-concepts",
        },
        {
          title: "Architecture",
          module: MODULES.rt,
          description:
            "Learn about the architecture of Harness Resilience Testing.",
          link: "/docs/resilience-testing/architecture",
        },
      ],
    },

    {
      name: "Chaos Testing",
      description:
        "",
      list: [
        {
          title: "Get Started",
          module: MODULES.rt,
          description:
            "Run your first chaos experiment in minutes with step-by-step guidance.",
          link: "/docs/resilience-testing/chaos-testing/get-started",
        },
        {
          title: "Create Experiments",
          module: MODULES.rt,
          description:
            "Build chaos experiments with faults, probes, and actions to test system resilience.",
          link: "/docs/resilience-testing/chaos-testing/experiments",
        },
        {
          title: "Chaos Faults",
          module: MODULES.rt,
          description:
            "Explore 200+ ready-to-use chaos faults for Kubernetes, AWS, Azure, GCP, and more.",
          link: "/docs/chaos-engineering/faults/chaos-faults",
        },
        {
          title: "Resilience Probes",
          module: MODULES.rt,
          description:
            "Validate system behavior and steady state during chaos experiments.",
          link: "/docs/chaos-engineering/guides/probe",
        },
        {
          title: "ChaosHub",
          module: MODULES.rt,
          description:
            "Centralized repository for chaos experiment templates and reusable faults.",
          link: "/docs/resilience-testing/chaos-testing/chaoshub",
        },
      ],
    },
    {
      name: "Load Testing",
      description:
        "",
      list: [
        {
          title: "Get Started with Load Testing",
          module: MODULES.rt,
          description:
            "Simulate realistic user traffic to validate performance under expected and peak demand.",
          link: "/docs/resilience-testing/load-testing/get-started",
        },
      ],
    },
    {
      name: "Disaster Recovery Testing",
      description:
        "",
      list: [
        {
          title: "Get Started with DR Testing",
          module: MODULES.rt,
          description:
            "Validate backup systems, failover mechanisms, and recovery procedures.",
          link: "/docs/resilience-testing/dr-testing/get-started",
        },
      ],
    },
    {
      name: "Shared Capabilities",
      description:
        "",
      list: [
        {
          title: "Governance & ChaosGuard",
          module: MODULES.rt,
          description:
            "Control who can run which tests, when, and where with enterprise governance.",
          link: "/docs/resilience-testing/chaos-testing/governance/rbac",
        },
        {
          title: "CI/CD Integration",
          module: MODULES.rt,
          description:
            "Integrate resilience tests into your deployment pipelines.",
          link: "/docs/resilience-testing/chaos-testing/integrations/cicd/one-click-cd-onboard",
        },
      ],
    } 
  ];
