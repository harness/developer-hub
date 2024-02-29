import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "What is being delivered now",
    feature: [
      
    ],
  },
  Next: {
    description: "What is being developed next",
    feature: [
      {
        title: "Enterprise Code Generation",
        description: "AI code generation specifically trained on customer code",
      },
      {
        title: "Integration Test Selection",
        description: "Select integration tests corresponding to code changes reducing the overall test cycle time.",
      },
    ],
  },
  Later: {
    description: "What is being developed later",
    feature: [
      {
        title: "Automatic Code Refactoring",
        description: "Re-factor code to upgrade libraries, reduce complexity, etc.",
      },
      {
        title: "Auto generate release notes",
        description: "AI-generated release notes",
      },
      {
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
        title: "Code Assistant",
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
        title: "Policy As Code Assistant",
        description:
          "AI-generated rules for asset governance accompanied with detailed descriptions to optimize your cloud spend.",
      },
      {
        tag: [],
        title: "Policy As Code Assistant (Cloud Assets)",
        description:
          "AI-generated rules for asset governance accompanied with detailed descriptions to optimize your cloud spend.",
      },
      {
        tag: [],
        title: "Policy As Code Assistant (Pipelines)",
        description:
          "Automatically generate Open Policy Agent (OPA) Rego policies for Pipeline governance.",
      },
      {
        tag: [],
        title: "Policy As Code Assistant (Pipelines)",
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
