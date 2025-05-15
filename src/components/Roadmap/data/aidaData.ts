import { Horizon } from "./roadmapData";
export const aidaData: Horizon = {
  Now: {
    description: "Q2 2025, May-Jul 2025",
    feature: [
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
        tag: [{value: "Entity Creation"}],
        title: "Infrastructure Configuration",
        description: "Enables the configuration of infrastructure in your environments for your DevOps workflows",
      },
      {
        tag: [{value: "Entity Reference"}],
        title: "Reference Existing Templates",
        description: "Enables the use of existing templates when generating new pipelines or DevOps resources with the AI agent",
      },
      {
        tag: [{value: "Entity Reference"}],
        title: "Reference Existing Services and Secrets in Pipeline",
        description: "Enables the use of existing services and secrets when generating new pipelines or pipeline steps and stages",
      },
      {
        tag: [],
        title: "Remediator Agent",
        description: "The agent will diagnose and offer remediation steps for failures in your DevOps workflows.",
      },
      {
        tag: [{value: "MCP"}],
        title: "Harness MCP Server",
        description: "A Harness Model Context Protocol (MCP) server will allow users to hook Harness data into their internal systems.",
      },
      {
        tag: [{value: "MCP"}, {value: "AI Chat"}],
        title: "MCP Support with AI Chat",
        description: "Integrates Model Context Protocol (MCP) capabilities into Harness, enabling communication between AI agents and Harness entities.",
      },
      {
        tag: [{value: "AI Chat"}],
        title: "Audit Trail Support with AI Chat",
        description: "Enables RBAC and observability into AI chat usage. Allows enterprise and security teams greater control over their AI agent usage.",
      },
      {
        tag: [{value: "AI Chat"}],
        title: "Documentation and Support Agent in AI Chat",
        description: "Access documentation and the support agent via AI chat.",
      },
      {
        tag: [],
        title: "Pipeline Data Support",
        description: "Improves pipeline data handling, adding import of Git.",
      },
    ],
  },
  Next: {
    description: "Q3 2025, Aug-Oct 2025",
    feature: [
      {
        tag: [],
        title: "Extended Customer Data",
        description: "Extends the scope and detail of customer data handling.",
      },
      {
        tag: [],
        title: "Customer Data",
        description: "Further enhancements or expansions to customer data capabilities.",
      },
      {
        tag: [],
        title: "Environment Context Shared Support",
        description: "Enables sharing of environment context (config, variables) across different pipeline stages.",
      },
      {
        tag: [],
        title: "Enriched Context Shared Support",
        description: "Provides richer context (metadata, logs, etc.) for better pipeline insights and collaboration.",
      },
      {
        tag: [],
        title: "Reformatting Chat Support",
        description: "Improves chat interface and formatting for better user experience.",
      },
      {
        tag: [],
        title: "AI-Driven Navigation & Actions",
        description: "Adds AI-based guidance or automation for navigating and performing actions within the system.",
      },
      {
        tag: [],
        title: "Chat UI & Chat Templates",
        description: "Introduces or updates a chat-based UI, including predefined templates for quicker interactions.",
      },
      {
        tag: [],
        title: "Attachment Support",
        description: "Allows users to attach files or documents within the chat or pipeline environment.",
      },
      {
        tag: [],
        title: "Create Slack Integration",
        description: "Builds an integration with Slack for notifications or interactions with the AI DevOps Agent.",
      },
      {
        tag: [],
        title: "Add Chat Templates",
        description: "Expands the library of chat templates for various use cases or user workflows.",
      },
      {
        tag: [],
        title: "Create Chat User Roles",
        description: "Introduces role-based access or permissions within the chat environment.",
      },
    ],
  },
  Later: {
    description: "Q4 2025+, Nov 2025 & beyond",
    feature: [
      {
        tag: [],
        title: "CV AI",
        description: "Implements computer vision (CV)–related AI features for image or document processing.",
      },
      {
        tag: [],
        title: "OCR / Page Creation",
        description: "Adds Optical Character Recognition (OCR) for extracting text from images/pages and creating records.",
      },
      {
        tag: [],
        title: "Launch V1 with Knowledge Base",
        description: "Officially launches Version 1 of the AI DevOps Agent with integrated knowledge base.",
      },
      {
        tag: [],
        title: "Chat V2 with More “Legs”",
        description: "Upgrades the chat feature to a second version, potentially with extended functionality or modules.",
      },
      {
        tag: [],
        title: "Review and Optimize Infrastructure",
        description: "Review and optimize infrastructure-as-code resources, including Pulumi, CloudFormation, Crossplane, etc.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
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
        title: "Pipeline Generation",
        description:
          "Automatically generate pipelines for source code repositories.",
      },
      {
        tag: [],
        title: "Pipeline Generation",
        description:
          "Automatically generate pipelines for source code repositories.",
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
