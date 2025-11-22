import { Horizon } from "./roadmapData";

export const IacmData: Horizon = {
    

  Now: {
    description: "Q4 2025, November 2025-January 2026",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry 2.0",
        description: "Enhanced Module Registry workflows with Auto Sync, Native module artifact at multiple hierarchical levels",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Native Ephemeral + Drift detection",
        description: "Users will be able to control the TTL configuration of each managed Workspace and manage drift schedules.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "IDP plugin enhancements",
        description: "Enhanced IaCM plugin for IDP with rich context on resources, drill downs and High level overview.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Native Vault Support",
        description: "Native support for HashiCorp Vault connectors",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "MCP Server support",
        description: "Native support for MCP Server",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Advanced Governance for Terragrunt",
        description: "OPA, Cost Estimation, Native Approvals and Workspace templates",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ansible Galaxy Support",
        description: "Integration with Ansible Galaxy for discovering and leveraging community roles and collections.",
      },
    ],
  },
  Next: {
    description: "Q1 2026, February-April 2026",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ansible Execution Environments",
        description: "Native support for Ansible Execution Environments",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ansible Hosts Explorer",
        description: "Ansible Hosts Explorer provides a unified view to browse, filter, and manage inventory hosts along with their recent execution context.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Native CCM Integration",
        description: "Native Cloud Cost insights in IaCM Workspaces, Cost Recommendation insights in IaCM Approvals.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Advanced Reporting",
        description: "Support for Resource level metadata in Custom Dashboards",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Cross Project JEXL support",
        description: "Support sharing metadata across workspaces spanning across projects",
      },
    ],
  },
  Later: {
    description: "Q2 2026, May-July 2026",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Native AWS CDK Integration",
        description: "Seamless integration with AWS CDK for native IaC development and deployment.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Harness CD integration",
        description: "Integration with CD allows IaCM users to link Resources with Services and Environments, giving end-to-end visibility",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "AWS CloudFormation support",
        description: "Supporting AWS CloudFormation as an IaC provider",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI Onboarding Agent",
        description: "Automate infrastructure discovery and conversion to IaC with an intelligent onboarding agent.",
      },
      {
        tag: [{ value: "AI" }],
        title: "AI Remediation  Agent",
        description: "Automatically detect and resolve cost, security, compliance, and drift issues using AI-driven remediation.",
      },
    ],
  },
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ansible Support (Beta)",
        description: "Configuration management support with native playbooks, static and dynamic inventory",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Private Provider Registry (Beta)",
        description: "Native support to store and manage private providers",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Terragrunt Support (Beta)",
        description: "Native Terragrunt support for IaCM Workspaces",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Variable Sets",
        description: "Support for variable sets to streamline management and improve reusability",
      }
    ],
  },
};
