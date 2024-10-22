import { Horizon } from "./roadmapData";

export const IacmData: Horizon = {
    Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Simplify Onboarding" }],
        title: "Customized pipeline",
        description: "IaCM supports highly customized pipelines that allows you to create advanced workflow, add 3rd party plugins, run steps in parallel, and more.",
      },
      {
        tag: [{ value: "Security" }],
        title: "OPA integration",
        description: "IaCM natively integrates with OPA, allowing you to define rules that can be enforced at design and runtime, eliminating policy violations and reducing the risks of security and unplanned cost",
      },
      {
        tag: [],
        title: "Cost estimation",
        description: "Using Infracost, IaCM provides cost estimation on resource changes, allowing you to understand how your cloud bill will be changed, based on resource changes",
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
      },
      {
        tag: [{ value: "Security" }],
        title: "RBAC",
        description: "IaCM supports granular RBAC operations, where admins can define the access privileges for different roles",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "PR Automation",
        description: "IaCM support PR Automation that populates plan and cost data to the PR process, helping you to reduce testing time on Terraform changes",
      },
    ],
  },
  Now: {
    description: "Q3 2024, Aug-Oct 2024",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry",
        description: "Private module Registry to test and publish approved modules",
      },
      {
        tag: [{ value: "Simplify Onboarding" }],
        title: "Workspace templates",
        description: "Users will be able to create Workspaces that will inherit cost, OPA, and other configurations from templates, simplifying onboarding and enforcing best practices",
      },
      {
        tag: [],
        title: "Custom arguments support",
        description: "Users will have the flexibility to modify which arguments will be used during execution, allowing additional customization",
      },
      {
        tag: [{ value: "Developer Experience" }],
        title: "Default Pipelines",
        description: "Users will have the ability to assign pipelines to different Terraform/OpenTofu operations, making it easier to control the automation for each Workspace update",
      },
    ],
  },
  Next: {
    description: "Q4 2024, Nov 2024-Jan 2025",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "CLI Integration",
        description: "Having the ability to run Workspace-related pipelines directly from CLI",
      },
      {
        tag: [],
        title: "Native Ansible Support",
        description: "Supporting Ansible as an IaC provider",
      },
      {
        tag: [{ value: "Security" },{ value: "Enterprise" }],
        title: "SMP (on-prem)",
        description: "Supporting implementing IaCM in private environments",
      },
    ],
  },
  Later: {
    description: "Q1 2025+  & beyond",
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
    ],
  },
};
