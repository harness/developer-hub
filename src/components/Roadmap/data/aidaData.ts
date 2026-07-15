import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const aidaModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "aida", moduleTitle: "Harness AI" };

export const aidaData: Horizon = {
  Now: {
    description: "Q2 2026, Apr-Jun 2026",
    feature: [
      {
        tag: [{value: "AI Platform"}],
        title: "Worker Agents",
        description: "Autonomous AI agents that execute DevOps tasks inside Harness pipelines as a native step type. Supported across CI, CD, Custom, STO, SCS, IaCM, and IDP stages. Features include 9 Harness Managed Agents, an Agent Builder GUI, three-layer governance, and a full audit trail.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Skills",
        description: "Structured instruction files that teach AI coding assistants how to work with Harness. Compatible with Claude Code, Cursor, GitHub Copilot, and OpenAI Codex.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Prompts",
        description: "Curated, ready-to-use prompt library for Harness AI organized by module and use case. Usable in AI Chat, via MCP, or as base instructions for Worker Agents.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Bring Your Own Model Keys",
        description: "Connect your preferred LLM provider to Worker Agents and Harness AI through existing Harness connectors. Supports Anthropic, OpenAI, Azure OpenAI, Google Gemini, Vertex AI, and AWS Bedrock.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Expert Agent",
        description: "Conversational AI agent grounded in the Harness Knowledge Graph. Powers AI Chat and the MCP Server. Answers questions about delivery data, generates pipeline YAML, and troubleshoots failures through natural language.",
      },
    ],
  },
  Next: {
    description: "Q3 2026, Jul-Sep 2026",
    feature: [
      {
        tag: [],
        title: "Knowledge Graph",
        description: "Extends the intelligence layer underlying Harness AI with a richer, pipeline-centric knowledge graph connecting all delivery entities. Includes entity modeling, inter-module relationships, and coverage confidence scoring.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "AI Usage Insights",
        description: "Provides account admins with visibility into how Harness AI is used across their organization. Includes prompts, tokens, actions, cost attribution per team, and exportable reports for FinOps and compliance.",
      },
    ],
  },
  Later: {
    description: "Q4 2026+, Oct 2026 & beyond",
    feature: [
      {
        tag: ["AI Platform"],
        title: "Slack Bot",
        description: "Allows users to interact with the Harness Unified Agent directly from Slack. Natural language queries, pipeline failure and deployment status alerts, governed by the same RBAC and audit trail as AI Chat.",
      },
      {
        tag: ["AI Platform"],
        title: "MS Teams Bot",
        description: "Allows users to interact with the Harness Unified Agent via a Microsoft Teams Bot. Natural language pipeline queries, alert routing, channel and DM support with enterprise SSO and RBAC.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{value: "AI Platform"}],
        title: "AI Chat 3.0",
        description: "Next-generation conversational AI experience across NGUI and UI 3.0. Includes Rules support, Memories, OPA policy enforcement, and NGUI backport. Powered by Claude 4.",
      },
      {
        tag: [{value: "AI DevOps"}],
        title: "AI DevOps Architect Mode",
        description: "Deep research mode for the DevOps Agent powered by Opus 4.5. Consolidated 5 sub-agents into a single unified DevOps Agent with improved context retention.",
      },
      {
        tag: [{value: "AI DevOps"}],
        title: "DevOps Agent — Opus 4.5",
        description: "Major upgrade to the DevOps Agent powered by Opus 4.5. Faster response time, higher-quality pipeline generation, single unified agent replacing 5 sub-agents.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Attachment Support",
        description: "Upload files directly into AI Chat to power pipeline migration and generation workflows. Supports PDF, Markdown, YAML, and JSON attachments.",
      },
      {
        tag: [{value: "AI Platform"}, {value: "MCP"}],
        title: "Hosted MCP",
        description: "Harness MCP Server hosted and managed by Harness with OAuth-based access. 10 unified tools with registry-based dispatch, CRUD + Execute on 119+ resource types.",
      },
      {
        tag: [],
        title: "Pipeline Error Analyzer 2.0",
        description: "Upgraded failure diagnosis in AI Chat. Reads step-level logs, correlates failures with recent commits via Knowledge Graph, and surfaces actionable fix suggestions.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Rules Support",
        description: "Create, update, and manage Harness Rules directly through AI Chat with natural language rule creation, confirmation before write, and OPA policies applied on creation.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Memories",
        description: "AI Chat retains context within and across sessions. Session-scoped memory for in-flight workflows and persistent memory for future chats.",
      },
      {
        tag: [{value: "AI DevOps"}],
        title: "Create and Edit Templates",
        description: "Enables the DevOps Agent to create and edit pipeline, stage, step group, and step templates.",
      },
      {
        tag: [{value: "AI DevOps"}],
        title: "Approvals",
        description: "AI-assisted approvals for pipeline workflows.",
      },
      {
        tag: [{value: "MCP"}],
        title: "MCP - GitOps Tools",
        description: "GitOps tools in the Harness MCP. Users can create and update GitOps configurations via Harness Chat and the MCP server.",
      },
      {
        tag: [{value: "MCP"}],
        title: "Harness MCP Server",
        description: "A Harness Model Context Protocol (MCP) server will allow users to hook Harness data into their internal systems.",
      },
      {
        tag: [{value: "Entity Creation"}],
        title: "Environment Creation",
        description: "Enables the creation and configuration of environments for your DevOps workflows",
      },
      {
        tag: [{value: "Entity Creation"}],
        title: "Secret Creation",
        description: "Enables the creation and configuration of secrets for your DevOps workflows",
      },
      {
        tag: [{value: "Entity Creation"}],
        title: "Connector Creation",
        description: "Enables the creation and configuration of connectors for your DevOps workflows",
      },
      {
        tag: [{value: "Entity Creation"}],
        title: "Service Creation",
        description: "Enables the creation and configuration of services for your DevOps workflows",
      },
      {
        tag: [{value: "Entity Reference"}],
        title: "Reference Existing Templates",
        description: "Enables the use of existing templates when generating new pipelines or DevOps resources with the AI agent",
      },
      {
        tag: [],
        title: "Step Creation",
        description: "Introduces the functionality for creating and managing pipeline steps.",
        link: "https://developer.harness.io/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#step-management",
      },
      {
        tag: [],
        title: "Stage Creation",
        description: "Extends or refines stage creation features, building on initial stage-creation functionality.",
        link: "https://developer.harness.io/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#stage-configuration",
      },
      {
        tag: [],
        title: "Pipeline Creation",
        description: "Enables creation and configuration of new pipelines for DevOps workflows.",
        link: "https://developer.harness.io/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#pipeline-orchestration",
      },
      {
        tag: [],
        title: "Harness AI Code Agent",
        description:
          "AI-powered code completion tool that assists developers with writing code by suggesting relevant snippets and solutions.",
      },
      {
        tag: [],
        title: "Semantic Search",
        description:
          "AI-powered code search uses natural language.",
      },
      {
        tag: [],
        title: "Pull Request Summary",
        description:
          "AI-generated summaries of pull requests, enhancing code review efficiency and collaboration in development workflows.",
      },
      {
        tag: [],
        title: "Terraform Code Generation",
        description:
          "AI-generated HCL code for terraform scripts.",
      },
      {
        tag: [],
        title: "Identify and Fix Security Vulnerabilities",
        description:
          "Highlight security vulnerabilities and suggest code fixes to address them.",
      },
      {
        tag: [],
        title: "Harness Support",
        description:
          "Helps users understand the product, troubleshoot failures/exceptions/security vulnerabilities by leveraging documentation, community articles, internal/external knowledge base articles.",
      },
      {
        tag: [],
        title: "Pipeline Troubleshooting (CI / CD)",
        description:
          "Resolve your build and deployment failures with AI-generate root cause analysis.",
      },
      {
        tag: [],
        title: "Policy As Code Agent",
        description:
          "AI-generated rules for asset governance accompanied with detailed descriptions to optimize your cloud spend.",
      },
      {
        tag: [],
        title: "Policy As Code Agent (Cloud Assets)",
        description:
          "AI-generated rules for asset governance accompanied with detailed descriptions to optimize your cloud spend.",
      },
      {
        tag: [],
        title: "Policy As Code Agent (Pipelines)",
        description:
          "Automatically generate Open Policy Agent (OPA) Rego policies for Pipeline governance.",
      },
      {
        tag: [],
        title: "ChaosGuard™ for Security Governance",
        description:
          "Validate the resiliency of your infrastructure and generate conditions for your chaos experiments.",
      },
      {
        tag: [],
        title: "Dashboard Generation",
        description:
          "AI-generated dashboards with widget-level control through interactive prompts, offering granular analytics and real-time data visualizations.",
      },
      {
        tag: [],
        title: "Onboarding Automation (Feature Flags)",
        description:
          "Generates sample SDK code for using feature flags, accelerating integration and decreasing the product learning curve.",
      },
    ],
  },
};
