import {
  CardItem,
  CardSections,
  docType,
} from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

export const docsCards: CardSections = [
  {
    name: "Overview & Getting Started",
    description: "",
    list: [
      {
        title: "Overview",
        module: MODULES.platform,
        description:
          "Learn about how AI improves your experience on the Harness platform.",
        link: "/docs/platform/harness-ai/overview",
      },
      {
        title: "Get Started",
        module: MODULES.platform,
        description: "Learn how to create Harness resources using Harness AI.",
        link: "/docs/platform/harness-ai/harness-create-with-ai",
      },
      {
        title: "Effective Prompting",
        module: MODULES.platform,
        description: "How to write good prompts for Harness AI.",
        link: "/docs/platform/harness-ai/effective-prompting-ai",
      },
      {
        title: "Harness AI Chat Use Cases",
        module: MODULES.platform,
        description: "Common use cases for Harness AI Chat.",
        link: "/docs/platform/harness-ai/harness-ai-chat-guide",
      },
    ],
  },
  {
    name: "Agents",
    description: "",
    list: [
      {
        title: "DevOps Agent",
        module: MODULES.platform,
        description: "Harness AI DevOps Agent unlocks your pipeline productivity.",
        link: "/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent",
      },
      {
        title: "Worker Agents",
        module: MODULES.platform,
        description:
          "Create and configure AI-powered worker agents that run inside Harness pipelines to automate code review, incident response, data synthesis, and other intelligent workflows.",
        link: "/docs/platform/harness-ai/harness-agents",
      },
      {
        title: "Release Agent",
        module: MODULES.platform,
        description:
          "Release features confidently with data and feature operations like deploying, targeting, and managing flags with the Harness AI Release Agent.",
        link: "/docs/platform/harness-ai/core-capabilities/in-your-pipelines/release-agent",
      },
      {
        title: "Support Agent",
        module: MODULES.platform,
        description:
          "Harness AI Support Agent provides instant answers to product and documentation questions.",
        link: "/docs/platform/harness-ai/support-agent",
      },
    ],
  },
  {
    name: "Use Cases",
    description: "",
    list: [
      {
        title: "Troubleshoot Builds and Deployments",
        module: MODULES.platform,
        description: "Troubleshoot builds and deployments with Harness AI.",
        link: "/docs/platform/harness-ai/core-capabilities/in-harness-ui/ci-agent",
      },
      {
        title: "Optimize Cloud Costs",
        module: MODULES.platform,
        description: "Learn how to use Harness AI for cloud asset governance.",
        link: "/docs/platform/harness-ai/core-capabilities/in-harness-ui/ccm-agent",
      },
      {
        title: "Fix Security Vulnerabilities",
        module: MODULES.platform,
        description: "Enhanced remediation using Harness AI.",
        link: "/docs/platform/harness-ai/core-capabilities/in-harness-ui/sto-agent",
      },
    ],
  },
  {
    name: "IDE & Integrations",
    description: "",
    list: [
      {
        title: "MCP Server",
        module: MODULES.platform,
        description:
          "Give AI agents full access to the Harness platform through 11 consolidated tools and 139 resource types using the Model Context Protocol (MCP).",
        link: "/docs/platform/harness-ai/harness-mcp-server",
      },
      {
        title: "VS Code Extension",
        module: MODULES.platform,
        description:
          "Install the Harness VS Code Extension to monitor pipelines, view logs, manage approvals, and use AI-assisted debugging directly in Visual Studio Code.",
        link: "/docs/platform/harness-ai/core-capabilities/in-your-ide/vscode-extension",
      },
      {
        title: "Cursor Plugin",
        module: MODULES.platform,
        description:
          "Install the Harness AI plugin for Cursor to manage pipelines, debug deployments, and interact with Harness using natural language directly from your IDE.",
        link: "/docs/platform/harness-ai/core-capabilities/in-your-ide/cursor-plugin",
      },
      {
        title: "Skills",
        module: MODULES.platform,
        description:
          "Claude Code skills for the Harness CI/CD platform — generate pipeline YAML, manage resources, debug failures, analyze costs, and more from natural language.",
        link: "/docs/platform/harness-ai/harness-skills",
      },
      {
        title: "Anthropic Connector",
        module: MODULES.platform,
        description:
          "Connect Harness to Claude.ai and Claude Desktop using the Anthropic Harness Connector with OAuth authentication.",
        link: "/docs/platform/harness-ai/model-connector/anthropic-harness-connector",
      },
      {
        title: "Harness AI × Gemini CLI Extension",
        module: MODULES.platform,
        description:
          "Leverage Gemini CLI with Harness AI MCP Server to unleash your developer workflows.",
        link: "/docs/platform/harness-ai/core-capabilities/in-your-ide/harness-gemini-extension",
      },
    ],
  },
  {
    name: "Personalization & Memory",
    description: "",
    list: [
      {
        title: "Chat History & Memory",
        module: MODULES.platform,
        description:
          "Using Harness AI's chat search and memory to build on previous context.",
        link: "/docs/platform/harness-ai/memory-chat-history",
      },
      {
        title: "Rules",
        module: MODULES.platform,
        description:
          "Use Harness AI Rules to tailor AI output to enterprise standards before Harness resources are created or changed.",
        link: "/docs/platform/harness-ai/harness-ai-rules",
      },
      {
        title: "Memories",
        module: MODULES.platform,
        description:
          "Use Harness AI Memories to personalize AI responses with context captured from your chats.",
        link: "/docs/platform/harness-ai/harness-ai-memories",
      },
    ],
  },
  {
    name: "Code",
    description: "",
    list: [
      {
        title: "AI Code Search",
        module: MODULES.platform,
        description: "Supercharge your code searches with Harness AI.",
        link: "/docs/platform/harness-ai/code-search",
      },
      {
        title: "PR Summaries & Code Review",
        module: MODULES.platform,
        description:
          "Use Harness AI to generate PR summaries, analyze code changes, and facilitate code review.",
        link: "/docs/platform/harness-ai/code-pr",
      },
    ],
  },
];

/* Define the cards - end */