import { Horizon } from "./roadmapData";

export const IacmData: Horizon = {
  Now: {
    description: "What is being delivered now",
    feature: [
      {
        tag: [],
        title: "Customized pipeline",
        description: "IaCM supports highly customized pipelines that allow users to create advanced workflow, add 3rd party plugins, run steps in parallel, and more.",
      },
      {
        tag: [],
        title: "OPA integration",
        description: "IaCM natively integrates with OPA, allowing users to define rules that can be enforced at design and runtime, eliminating policy violations and reducing the risks of security and unplanned cost",
      },
      {
        tag: [],
        title: "Cost estimation",
        description: "Using Infracost, IaCM provides cost estimation on resource changes, allowing users to understand how cloud bill will be changed, based on resource changes",
      },
      {
        tag: [],
        title: "State management",
        description: "IaCM supports hosted backend, allowing users to store state securely",
      },
      {
        tag: [],
        title: "Drift Detection",
        description: "IaCM supports detecting drifts between state file and the actual resources, preventing misconfiguration, and securely vulnerabilities",
      },
      {
        tag: [],
        title: "RBAC",
        description: "IaCM supports granular RBAC operations, where admins can define the access privileges for different roles",
      },
      {
        tag: [],
        title: "PR Automation",
        description: "IaCM support PR Automation that populates plan and cost data to the PR process, helping users to reduce testing time on Terraform changes",
      },
    ],
  },
  Next: {
    description: "What is being developed next",
    feature: [
      {
        tag: [],
        title: "Module Registry",
        description: "Private module Registry to test and publish approved modules",
      },
      {
        tag: [],
        title: "SMP (on-prem)",
        description: "Supporting implementing IaCM in private environments",
      },
      {
        tag: [],
        title: "Harness CD integration",
        description: "Integration with CD allows IaCM users to link Resources with Services and Environments, giving end-to-end visibility",
      },
      {
        tag: [],
        title: "Harness CCM integration",
        description: "Integration with CCM allows IaCM users to have full visibility of costs associated with the resources being managed by IaCM",
      },
      {
        tag: [],
        title: "Debugger",
        description: "Debbuger will simplify the troubleshooting process for execution failures",
      },
      {
        tag: [],
        title: "Cache intelligence",
        description: "This feature will speed up execution time by caching libraries and containers that are frequently used",
      },
      {
        tag: [],
        title: "Ephemeral environments",
        description: "Users will be able to control the TTL configuration of each managed Workspace",
      },
      {
        tag: [],
        title: "Workspace templates",
        description: "Users will be able to create Workspaces that will inherit cost, OPA, and other configurations from templates, simplifying onboarding and enforcing best practices",
      },
    ],
  },
  Later: {
    description: "What is being developed later",
    feature: [
      {
        tag: [],
        title: "Run tasks",
        description: "Users will be able to run specific commands against the remote state",
      },
      {
        tag: [],
        title: "Native Ansible support",
        description: "Supporting Ansible as an IaC provider",
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
  Released: {
    description: "What has been released",
    feature: [
    ],
  },
};
