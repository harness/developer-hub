import { Horizon } from "./roadmapData";

export const IacmData: Horizon = {
    Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry Testing",
        description: "Automate the validation and testing of modules in isolated environments before publishing, ensuring only high-quality, compliant modules are available in the private Module Registry.",
        link: "/docs/infra-as-code-management/iacm-features/module-registry/module-registry-testing",
      },
      {
        tag: [{ value: "Simplify Onboarding" }],
        title: "Workspace templates",
        description: "Users will be able to create Workspaces that will inherit cost, OPA, and other configurations from templates, simplifying onboarding and enforcing best practices",
        link: "/docs/infra-as-code-management/workspaces/workspace-tempates",
      },  
      {
        tag: [{ value: "Reports & Insights" }],
        title: "BI Dashboard",
        description: "Users can now create custom BI Dashboards to track their compliance, usage trends with alerting and reporting.",
        link: "/docs/infra-as-code-management/reports-insights/dashboards",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Default Pipelines",
        description: "Users will have the ability to assign pipelines to different Terraform/OpenTofu operations, making it easier to control the automation for each Workspace update",
        link: "/docs/infra-as-code-management/pipelines/default-pipelines",
      },
      {
        tag: [{ value: "Simplify Onboarding" }],
        title: "Customized pipeline",
        description: "IaCM supports highly customized pipelines that allows you to create advanced workflow, add 3rd party plugins, run steps in parallel, and more.",
      },
      {
        tag: [{ value: "Security" }],
        title: "OPA integration",
        description: "IaCM natively integrates with OPA, allowing you to define rules that can be enforced at design and runtime, eliminating policy violations and reducing the risks of security and unplanned cost",
        link: "/docs/infra-as-code-management/policies-governance/opa-workspace",
      }
    ],
  },
  Now: {
    description: "Q3 2025, August 2025-October 2025",
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
      },
    ],
  },
  Next: {
    description: "Q4 2025, November 2025-January 2026",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ansible Support (GA)",
        description: "Native Ansible approvals, Ansible galaxy support, BI Dashboards.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Terragrunt Support (GA)",
        description: "Native Terragrunt Approvals, OPA, Cost estimation.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ephemeral environments",
        description: "Users will be able to control the TTL configuration of each managed Workspace.",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Harness CCM Integration",
        description: "Integration with CCM allows IaCM users to have full visibility of costs associated with the resources being managed by IaCM",
      },
    ],
  },
  Later: {
    description: "Q1 2026+ & beyond",
    feature: [
      {
        tag: [{ value: "AI" }],
        title: "AI Infrastructure Agent",
        description: "An agentic AI experience that proactively accelerates and automates infrastructure management and optimization with minimal human intervention.",
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
        tag: [{ value: "Developer Experience" }],
        title: "CDK Support",
        description: "Supporting CDK as an IaC provider",
      },
    ],
  },
};
