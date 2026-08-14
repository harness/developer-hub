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
    description: "Q3 2026, Aug-Oct 2026",
    feature: [
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Remediation Agent",
        description: "Automatically detect and resolve cost, security, compliance, and drift issues using AI-driven remediation.",
      },
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Blast Radius Agent",
        description: "AI agent to assess and predict the blast radius of proposed infrastructure changes before apply.",
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
      {
        tag: [{ value: "Integrations" }],
        title: "AWS CDK Support",
        description: "Expanded AWS CDK support for IACM Workspaces with advanced features including Cost Estimations, AI remediation, Native Drift Detection",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "MCP Server Extension",
        description: "Expanded support to create and edit workspaces, variable sets, modules, and provider registry.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Workspace Template Enhancements",
        description: "Convert existing workspaces into reusable templates and improved management of template associations.",
      },
    ],
  },
  Next: {
    description: "Q4 2026, Nov-Jan 2027",
    feature: [
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
        tag: [{ value: "Platform" }],
        title: "Workspace Groups",
        description: "Group and manage multiple workspaces collectively for easier organisation and bulk operations.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Ansible Roles & Collections",
        description: "Private registry for Ansible roles and collections within Harness",
      },
      {
        tag: [{ value: "Operations" }],
        title: "Flexible pinning of Provisioner versions in Workspace",
        description: "Ability to pin Provisioner version in workspace to get on the latest compatible version automatically",
      },
    ],
  },
  Later: {
    description: "Future releases",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "Crossplane Provider Support",
        description: "Supporting Crossplane as an IaC provider",
      },
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Ansible Playbook Agent",
        description: "AI agent that generates, optimizes, and troubleshoots Ansible playbooks using natural language instructions.",
      },
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Discovery Agent",
        description: "Automate infrastructure discovery and conversion to IaC with an intelligent discovery agent.",
      },
      {
        tag: [{ value: "AI & Automation" }],
        title: "AI Module Test Generation Agent",
        description: "AI agent that automatically generates and validates test cases for IaC modules to ensure reliability and correctness.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Pulumi Provider Support",
        description: "Supporting Pulumi as an IaC provider",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Azure Bicep",
        description: "Support for Azure Bicep as an IaC provider for declarative deployment of Azure resources.",
      },
    ],
  },
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "Integrations" }],
        title: "Ansible Support",
        description: "Configuration management support with native playbooks, static and dynamic inventory",
        link: "/docs/infra-as-code-management/configuration-management/ansible/overview",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Native AWS CDK Integration (Beta)",
        description: "Seamless integration with AWS CDK for native IaC development and deployment.",
        link: "/docs/infra-as-code-management/iac-provisioners/cdk/set-up-cdk-provisioner",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry 2.0",
        description: "Enhanced Module Registry workflows with Auto Sync, Native module artifact at multiple hierarchical levels",
        link: "/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts",
      },
      {
        tag: [{ value: "Operations" }],
        title: "Ansible Hosts Explorer",
        description: "Ansible Hosts Explorer provides a unified view to browse, filter, and manage inventory hosts along with their recent execution context.",
        link: "/docs/infra-as-code-management/configuration-management/ansible/inventories/hosts",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Ansible Galaxy Support",
        description: "Integration with Ansible Galaxy for discovering and leveraging community roles and collections.",
        link: "/docs/infra-as-code-management/configuration-management/ansible/get-started",
      },
      {
        tag: [{ value: "Governance" }],
        title: "Advanced Governance for AWS CDK (Beta)",
        description: "OPA, Native Approvals, Native Ephemeral and Workspace templates",
        link: "/docs/infra-as-code-management/iac-provisioners/cdk/set-up-cdk-provisioner#add-governance",
      },
      {
        tag: [{ value: "Operations" }],
        title: "Native Ephemeral + Drift Detection",
        description: "Users will be able to control the TTL configuration of each managed Workspace and manage drift schedules.",
        link: "/docs/infra-as-code-management/workspaces/drift-ephemeral-workspaces",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Terragrunt Support",
        description: "Native Terragrunt support for IaCM Workspaces",
        link: "/docs/infra-as-code-management/get-started/#terragrunt",
      },
    ],
  },
};
