import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const iacmModuleTheme: ModuleTheme = {
  moduleKey: "iacm",
  moduleTitle: "Infrastructure as Code Management",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const IacmData: Horizon = {
    

  Now: {
    description: "Q1 2026, February-April 2026",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry 2.0",
        description: "Enhanced Module Registry workflows with Auto Sync, Native module artifact at multiple hierarchical levels",
      },
      {
        tag: [{ value: "Operations" }],
        title: "Native Ephemeral + Drift detection",
        description: "Users will be able to control the TTL configuration of each managed Workspace and manage drift schedules.",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Advanced Governance for Terragrunt",
        description: "OPA, Cost Estimation, Native Approvals and Workspace templates",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Ansible Galaxy Support",
        description: "Integration with Ansible Galaxy for discovering and leveraging community roles and collections.",
      },
      {
        tag: [{ value: "Insights & Reporting" }],
        title: "Advanced Reporting",
        description: "Support for Resource level metadata in Custom Dashboards",
      },
    ],
  },
  Next: {
    description: "Q2 2026, May-July 2026",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "Native AWS CDK Integration",
        description: "Seamless integration with AWS CDK for native IaC development and deployment.",
      },
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Remediation Agent",
        description: "Automatically detect and resolve cost, security, compliance, and drift issues using AI-driven remediation.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Native CCM Integration",
        description: "Native Cloud Cost insights in IaCM Workspaces, Cost Recommendation insights in IaCM Approvals.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Ansible Execution Environments",
        description: "Native support for Ansible Execution Environments",
      },
    ],
  },
  Later: {
    description: "Future releases",
    feature: [
      {
        tag: [{ value: "Operations" }],
        title: "Ansible Hosts Explorer",
        description: "Ansible Hosts Explorer provides a unified view to browse, filter, and manage inventory hosts along with their recent execution context.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Cross Project JEXL support",
        description: "Support sharing metadata across workspaces spanning across projects",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "AWS CloudFormation support",
        description: "Supporting AWS CloudFormation as an IaC provider",
      },
      {
        tag: [{ value: "CI/CD" }],
        title: "Harness CD integration",
        description: "Integration with CD allows IaCM users to link Resources with Services and Environments, giving end-to-end visibility",
      },
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Discovery Agent",
        description: "Automate infrastructure discovery and conversion to IaC with an intelligent discovery agent.",
      },
    ],
  },
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "Platform" }],
        title: "IDP plugin enhancements",
        description: "Enhanced IaCM plugin for IDP with rich context on resources, drill downs and High level overview.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Native Vault Support",
        description: "Native support for HashiCorp Vault connectors",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "MCP Server support",
        description: "Native support for MCP Server",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Ansible Support (Beta)",
        description: "Configuration management support with native playbooks, static and dynamic inventory",
        link: "/docs/infra-as-code-management/configuration-management/ansible/overview",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Private Provider Registry (Beta)",
        description: "Native support to store and manage private providers",
        link: "/docs/infra-as-code-management/registry/provider-registry",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Terragrunt Support (Beta)",
        description: "Native Terragrunt support for IaCM Workspaces",
        link: "/docs/infra-as-code-management/get-started/#terragrunt",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Variable Sets",
        description: "Support for variable sets to streamline management and improve reusability",
        link: "/docs/infra-as-code-management/configuration/connectors-and-variables/variable-sets",
      }
    ],
  },
};
