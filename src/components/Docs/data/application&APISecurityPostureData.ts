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
        title: "Security Posture Overview",
        module: MODULES.asp,
        description:
          "Learn what Application and API Security Posture is.",
        link: "https://docs.traceable.ai/docs/api-catalog",
      },
      {
        title: "Get Started with Security Posture",
        module: MODULES.asp,
        description:
          "Understand the components of Security Posture and how they work together.",
        link: "https://docs.traceable.ai/docs/api-catalog",
      },
      {
        title: "Dashboard",
        module: MODULES.asp,
        description:
          "Get visibility into API security posture and activity trends.",
        link: "https://docs.traceable.ai/docs/catalog-dashboard",
      },

    ],
  },
  {
    name: "Discover and Manage APIs",
    description:
      "",
    list: [
      {
        title: "Inventory",
        module: MODULES.asp,
        description:
          "Access a comprehensive list of APIs in your ecosystem, drill into them, and understand how APIs relate to services, domains, and backend systems.",
        link: "https://docs.traceable.ai/docs/inventory",
      },
      {
        title: "Third Party",
        module: MODULES.asp,
        description:
          "Track and assess third-party APIs in your application.",
        link: "https://docs.traceable.ai/docs/third-party",
      },
      {
        title: "Application Flow",
        module: MODULES.asp,
        description:
          "Visualize relationships and dependencies between APIs and services.",
        link: "https://docs.traceable.ai/docs/application-flow",
      },
      {
        title: "API Ownership",
        module: MODULES.asp,
        description:
          "Assign and manage ownership for your APIs, and automate it using GraphQL.",
        link: "https://docs.traceable.ai/docs/api-ownership",
      },
      {
        title: "Downloading API Documentation",
        module: MODULES.asp,
        description:
          "Export API specifications for reference and collaboration.",
        link: "https://docs.traceable.ai/docs/download-api-spec",
      },
      {
        title: "API Documentation and Inspector",
        module: MODULES.asp,
        description:
          "Upload, validate, and inspect API specifications against real traffic, using the platform or APIs.",
        link: "https://docs.traceable.ai/docs/api-documentation",
      },
    ],
  },
  {
    name: "Assess API Risk",
    description:
      "",
    list: [
      {
        title: "Issues",
        module: MODULES.asp,
        description:
          "View detected issues and their occurrence patterns, and manage, triage, and resolve them in Traceable.",
        link: "https://docs.traceable.ai/docs/issues",
      },
      {
        title: "Sensitive Data",
        module: MODULES.asp,
        description:
          "Identify APIs handling PCI DSS, PII, and other sensitive data.",
        link: "https://docs.traceable.ai/docs/sensitive-data",
      },
      {
        title: "Posture Events",
        module: MODULES.asp,
        description:
          "Track security-related events affecting your API posture.",
        link: "https://docs.traceable.ai/docs/posture-events",
      },
      {
        title: "Conformance Analysis",
        module: MODULES.asp,
        description:
          "Compare API specifications against observed traffic for drift detection.",
        link: "https://docs.traceable.ai/docs/conformance-analysis",
      },
    ],
  },
  {
    name: "Configure API Catalog",
    description:
      "",
    list: [
      {
        title: "Issue Policies",
        module: MODULES.asp,
        description:
          "Enable predefined or create custom policies for detecting API security issues.",
        link: "https://docs.traceable.ai/docs/issue-policies",
      },
      {
        title: "Security Scheme",
        module: MODULES.asp,
        description:
          "Manage authentication and authorization schemes for APIs.",
        link: "https://docs.traceable.ai/docs/security-scheme",
      },
      {
        title: "Risk Score",
        module: MODULES.asp,
        description:
          "Understand and configure risk scoring logic for your APIs.",
        link: "https://docs.traceable.ai/docs/risk-score",
      },
    ],
  },

];
/* Define the cards - end */