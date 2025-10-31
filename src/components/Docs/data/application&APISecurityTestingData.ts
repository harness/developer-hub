import {
  CardSections
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Get Started",
    description:
      "",
    list: [
      {
        title: "AAST Overview",
        module: MODULES.ast,
        description:
          "Learn what Application & API Security Testing is.",
        link: "https://docs.traceable.ai/docs/api-testing",
      },
      {
        title: "Get Started with AAST",
        module: MODULES.ast,
        description:
          "Understand the components and how they work together to secure your application.",
        link: "https://docs.traceable.ai/docs/ast-getting-started",
      },
      {
        title: "Understand Scans and Traffic Types",
        module: MODULES.ast,
        description:
          "Learn about scans, the user interface, and the traffic types for testing your APIs.",
        link: "https://docs.traceable.ai/docs/ast-scans",
      },

    ],
  },
  {
    name: "Basic Usage and Workflows",
    description:
      "",
    list: [
      {
        title: "Runners",
        module: MODULES.ast,
        description:
          "Understand the role of runners and steps to set them up for executing scans and generating results.",
        link: "https://docs.traceable.ai/docs/runners",
      },
      {
        title: "Creating a Scan",
        module: MODULES.ast,
        description:
          "Learn how to create scans and test your APIs.",
        link: "https://docs.traceable.ai/docs/creating-scan",
      },
      {
        title: "Scan Creation Recommendations",
        module: MODULES.ast,
        description:
          "The best practices to configure efficient and reliable scans.",
        link: "https://docs.traceable.ai/docs/scan-creation-recommendations",
      },
    ],
  },
  {
    name: "View Results and Fix Issues",
    description:
      "",
    list: [
      {
        title: "Scan Details",
        module: MODULES.ast,
        description:
          "Explore scan results (issues, coverage, and test runs) and learn how to use them.",
        link: "https://docs.traceable.ai/docs/ast-scan-details",
      },
      {
        title: "Issues",
        module: MODULES.ast,
        description:
          "View detected issues and their occurrence patterns, and manage, triage, and resolve them.",
        link: "https://docs.traceable.ai/docs/ast-issues-overview",
      },
      {
        title: "Reports",
        module: MODULES.ast,
        description:
          "Download detailed issue reports for audits and collaboration.",
        link: "https://docs.traceable.ai/docs/ast-reports",
      },

    ],
  },
  {
    name: "Advanced Usage",
    description:
      "",
    list: [
      {
        title: "Policies",
        module: MODULES.ast,
        description:
          "Define what vulnerabilities to test, coverage levels, and other settings.",
        link: "https://docs.traceable.ai/docs/ast-policies",
      },
      {
        title: "Vulnerability Types",
        module: MODULES.ast,
        description:
          "Use predefined or create custom vulnerability types with CVSS scores, severities, and tags.",
        link: "https://docs.traceable.ai/docs/vulnerability-types",
      },
      {
        title: "Plugins",
        module: MODULES.ast,
        description:
          "Extend the AAST functionality by creating custom plugins in YAML or Python, configuring them, and testing them on endpoints.",
        link: "https://docs.traceable.ai/docs/test-custom-plugin",
      },
      {
        title: "Mutation and Assertion Overrides",
        module: MODULES.ast,
        description:
          "Customize plugin behavior and reduce false positives on specific endpoints.",
        link: "https://docs.traceable.ai/docs/mutation-and-assertion-overrides",
      },
      {
        title: "Authentication",
        module: MODULES.ast,
        description:
          "Configure supported authentication methods, such as API Key, JWT, OAuth, and more.",
        link: "https://docs.traceable.ai/docs/ast-authentication",
      },
      {
        title: "Environment Config",
        module: MODULES.ast,
        description:
          "Enable or disable scans and replays for environments.",
        link: "https://docs.traceable.ai/docs/environment-config",
      },
    ],
  },
  {
    name: "Support",
    description:
      "",
    list: [
      {
        title: "Frequently Asked Questions",
        module: MODULES.ast,
        description:
          "Quick answers to common queries and usage scenarios.",
        link: "https://docs.traceable.ai/docs/ast-faqs",
      },
      {
        title: "Troubleshooting Guide",
        module: MODULES.ast,
        description:
          "Step-by-step guide to resolve common setup, configuration, and runtime issues.",
        link: "https://docs.traceable.ai/docs/ast-troubleshooting",
      },
    ],
  },
];
/* Define the cards - end */