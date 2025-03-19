import { Horizon } from "./roadmapData";

export const IacmData: Horizon = {
    Released: {
    description: "What has been released",
    feature: [
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
      },
      {
        tag: [],
        title: "Cost estimation",
        description: "Using Infracost, IaCM provides cost estimation on resource changes, allowing you to understand how your cloud bill will be changed, based on resource changes",
        link: "/docs/infra-as-code-management/workspaces/cost-estimation",
      },
      {
        tag: [{ value: "Security" }],
        title: "State management",
        description: "IaCM supports hosted backend, allowing you to store state securely",
      },
      {
        tag: [{ value: "Security" }],
        title: "Drift Detection",
        description: "IaCM supports detecting drifts between state file and the actual resources, preventing misconfiguration, and securely vulnerabilities",
        link: "/docs/infra-as-code-management/pipelines/operations/drift-detection",
      },
      {
        tag: [{ value: "Security" }],
        title: "RBAC",
        description: "IaCM supports granular RBAC operations, where admins can define the access privileges for different roles",
        link: "/docs/infra-as-code-management/project-setup/workspace-rbac",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "PR Automation",
        description: "IaCM support PR Automation that populates plan and cost data to the PR process, helping you to reduce testing time on Terraform changes",
        link: "/docs/infra-as-code-management/pipelines/operations/pr-automation",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Custom arguments support",
        description: "Users will have the flexibility to modify which arguments will be used during execution, allowing additional customization",
      },
    ],
  },
  Now: {
    description: "Q4 2024, Nov 2024-Jan 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry",
        description: "Private Module Registry to test and publish approved modules",
        link: "/docs/category/module-registry",
      },
      {
        tag: [{ value: "Simplify Onboarding" }],
        title: "Workspace templates",
        description: "Users will be able to create Workspaces that will inherit cost, OPA, and other configurations from templates, simplifying onboarding and enforcing best practices",
        link: "/docs/infra-as-code-management/workspaces/workspace-tempates",
      },
      {    
        tag: [{ value: "Developer Experience" }],
        title: "Variable Sets",
        description: "Define reusable collections of Terraform and environment variables, as well as connectors, that can be used across different workspaces. This feature makes it easy to manage variables centrally while maintaining security for sensitive data.",
      },

    ],
  },
  Next: {
    description: "Q1 2025, Feb 2025-Mar 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "CLI Integration",
        description: "Having the ability to run Workspace-related pipelines directly from CLI",
      },
      {
        tag: [{ value: "Security" },{ value: "Enterprise" }],
        title: "SMP (on-prem)",
        description: "Supporting implementing IaCM in private environments",
      },
    ],
  },
  Later: {
    description: "Q2 2025+ & beyond",
    feature: [
      {
        tag: [],
        title: "Harness CD integration",
        description: "Integration with CD allows IaCM users to link Resources with Services and Environments, giving end-to-end visibility",
      },
      {
        tag: [],
        title: "Harness CCM Integration",
        description: "Integration with CCM allows IaCM users to have full visibility of costs associated with the resources being managed by IaCM",
      },
      {
        tag: [],
        title: "Native Ansible Support",
        description: "Supporting Ansible as an IaC provider",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Debugger",
        description: "Debbuger will simplify the troubleshooting process for execution failures",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Cache intelligence",
        description: "This feature will speed up execution time by caching libraries and containers that are frequently used",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Ephemeral environments",
        description: "Users will be able to control the TTL configuration of each managed Workspace",
      },
      {
        tag: [],
        title: "CDK Support",
        description: "Supporting CDK as an IaC provider",
      },
      {
        tag: [],
        title: "AWS CloudFormation support",
        description: "Supporting AWS CloudFormation as an IaC provider",
      },
      {
        tag: [],
        title: "Terragrunt support",
        description: "Supporting Terragrunt as an IaC provider",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Provider Registry",
        description: "Centralized provider repository where users can discover, download, and use providers that enable Terraform to interact with APIs and services",
      },
    ],
  },
};
