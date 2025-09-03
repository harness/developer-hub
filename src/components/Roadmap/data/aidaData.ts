import { Horizon } from "./roadmapData";
export const aidaData: Horizon = {
  Now: {
    description: "Q3 2025, Aug-Oct 2025",
    feature: [
      {
        tag: [{value: "AI DevOps"}],
        title: "AI DevOps Architect Mode",
        description: "Deep research capabilities for building robost pipeliens.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "Attachment Support",
        description: "Allow users to migrate their pipelines into Harness by adding a file attachment. Also, enables building a pipeline based off of design documents.",
      },
      {
        tag: [{value: "AI Platform"}, {value: "MCP"}],
        title: "Hosted MCP",
        description: "Harness MCP server will be hosted, and users can access it with Oauth",
      },
      {
        tag: [],
        title: "Pipeline Error Analyzer 2.0",
        description: "Enables a more intelligent error analysis and remediation for pipelines. This includes drift detection, documentation support, and fix suggestions.",
      },
      {
        tag: [{value: "MCP"}],
        title: "MCP - Default Tools",
        description: "Defines a default set of tools for users to get started.",
      },
    ],
  },
  Next: {
    description: "Q4 2025, Nov-Jan 2025-2026",
    feature: [
      {
        tag: [{value: "AI Platform"}],
        title: "AI Platform - Memory Support",
        description: "Establishes a working memory for the AI chat agent so that it can have context about chat history, account configurations, and account actions.",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "AI Governance",
        description: "Natural language governance for the AI DevOps Agent and Unified Agent.",
      },
      {
        tag: [{value: "AI DevOps"}],
        title: "Create and Edit Templates",
        description: "Enables the DevOps Agent to create and edit pipeline, stage, step group, and step templates",
      },
    ],
  },
  Later: {
    description: "Q1 2026+, Feb 2026 & beyond",
    feature: [
      {
        tag: [{value: "AI DevOps"}],
        title: "Approvals",
        description: "Enables AI-assisted approvals.",
      },
      {
        tag: [{value: "MCP"}],
        title: "MCP - GitOps Tools",
        description: "Adds GitOps tools to the Harness MCP. Users can create and update GitOps configurations via Harness Chat and the MCP server.",
      },
      {
        tag: [],
        title: "Slack Bot",
        description: "Allows users to interact with the Unified Agent in Slack. ",
      },
      {
        tag: [],
        title: "MS Teams Bot",
        description: "Allows users to interact with the Unified Agent in via an MS Teams Bot. ",
      },
      {
        tag: [{value: "AI Platform"}],
        title: "AI Usage Insights",
        description: "Enables users to get an analysis of their AI Usage, number of prompts, tokens consumed, and actions."
      },
      {
        tag: [],
        title: "Knowledge Graph",
        description: "Harness will build a knowledge graph with support of the data platform to provide increased intelligence to the AI to do various remediation and automated actions, and to personalize the user's UI."
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
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
        link: "https://developer.harness.io/docs/platform/harness-aida/ai-devops#step-management",
      },
      {
        tag: [],
        title: "Stage Creation",
        description: "Extends or refines stage creation features, building on initial stage-creation functionality.",
        link: "https://developer.harness.io/docs/platform/harness-aida/ai-devops#stage-configuration",
      },
      {
        tag: [],
        title: "Pipeline Creation",
        description: "Enables creation and configuration of new pipelines for DevOps workflows.",
        link: "https://developer.harness.io/docs/platform/harness-aida/ai-devops#pipeline-orchestration",
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
