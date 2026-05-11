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
        title: "AI Security Overview",
        module: MODULES.aisec,
        description:
          "Understand how AI Security helps you discover AI assets, monitor threats, and test AI endpoints in your application.",
        link: "https://docs.traceable.ai/docs/ai-security-overview",
      },
      {
        title: "AI Security Agent Support Matrix",
        module: MODULES.aisec,
        description:
          "Understand which agents support AI Security and how to enable capabilities, such as AI asset discovery and threat activity.",
        link: "https://docs.traceable.ai/docs/ai-security-agent-support-matrix",
      },
      {
        title: "AI Security Dashboard",
        module: MODULES.aisec,
        description:
          "View AI assets, identified issues, threat activity, and overall AI security posture from a centralized dashboard.",
        link: "https://docs.traceable.ai/docs/ai-security-dashboard",
      },

    ],
  },
  {
    name: "AI Discovery",
    description:
      "",
    list: [
      {
        title: "AI Assets",
        module: MODULES.aisec,
        description:
          "Discover AI inventory consisting of AI APIs and MCP assets, such as tools, servers, resources, and prompts in your application.",
        link: "https://docs.traceable.ai/docs/ai-assets",
      },
      {
        title: "AI Asset Details",
        module: MODULES.aisec,
        description:
          "Understand how AI asset details help you monitor activity, analyze performance, and identify risks in your AI assets.",
        link: "https://docs.traceable.ai/docs/asset-details",
      },
      /*
      {
        title: "AI Asset Issues",
        module: MODULES.aisec,
        description:
          "Investigate security issues affecting AI APIs and MCP assets across your environment.",
        link: "https://docs.traceable.ai/docs/third-party",
      },
      {
        title: "AI and MCP Policies",
        module: MODULES.aisec,
        description:
          "Configure policies that detect security issues related to AI APIs and MCP components.",
        link: "https://docs.traceable.ai/docs/application-flow",
      },
      */
      {
        title: "MCP Risk Score",
        module: MODULES.aisec,
        description:
          "Understand risk scores assigned to AI assets based on exposure, behavior, and detected issues.",
        link: "https://docs.traceable.ai/docs/mcp-risk-score",
      },
    ],
  },
  /*
  {
    name: "AI Firewall",
    description:
      "",
    list: [
      {
        title: "AI Firewall Dashboard",
        module: MODULES.aisec,
        description:
          "Monitor threat activity targeting AI endpoints and analyze runtime security events.",
        link: "https://docs.traceable.ai/docs/issues",
      },
      {
        title: "AI Firewall Policies",
        module: MODULES.aisec,
        description:
          "Configure policies to detect threats, such as prompt injection, rate limiting, and input explosion in AI traffic.",
        link: "https://docs.traceable.ai/docs/sensitive-data",
      },
    ],
  },
  */
  {
    name: "AI Testing",
    description:
      "",
    list: [
      {
        title: "(Beta) AI Security Testing",
        module: MODULES.aisec,
        description:
          "Test AI APIs and applications for OWASP LLM Top 10 issues, such as prompt injection and sensitive data exposure.",
        link: "https://docs.traceable.ai/docs/ai-security-testing",
      },
    ],
  },
];
/* Define the cards - end */