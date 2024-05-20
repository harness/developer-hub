import { Horizon } from "./roadmapData";

export const IacmData: Horizon = {
  Now: {
    description: "Q2 2024, May-Jul 2024",
    feature: [
      {
        tag: [{ value: "Developer Experience" }],
        title: "Module Registry",
        description: "Private module Registry to test and publish approved modules",
      },
      {
        tag: [{ value: "Security" }],
        title: "Security Plugins",
        description: "Plugins for tfsec, tflint, and checkov that can be added to the IaCM pipeline to find security vulnerabilities and misconfiguration",
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
    ],
  },
  Next: {
    description: "Q3 2024, August-October 2024",
    feature: [
     {
        tag: [{ value: "Security" },{ value: "Enterprise" }],
        title: "SMP (on-prem)",
        description: "Supporting implementing IaCM in private environments",
      },
      {
        tag: [{ value: "Security" }],
        title: "Security Plugins",
        description: "Plugins for tfsec, tflint, and checkov that can be added to the IaCM pipeline to find security vulnerabilities and misconfiguration",
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
    ],
  },
  Later: {
    description: "Q4 2024+, November 2024 & beyond",
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
        title: "Ephemeral environments",
        description: "Users will be able to control the TTL configuration of each managed Workspace",
      },
      {
        tag: [],
        title: "Native Ansible Support",
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
      {
        tag: [{ value: "Simplify Onboarding" }],
        title: "Customized pipeline",
        description: "IaCM supports highly customized pipelines that allow users to create advanced workflow, add 3rd party plugins, run steps in parallel, and more.",
      },
      {
        tag: [{ value: "Security" }],
        title: "OPA integration",
        description: "IaCM natively integrates with OPA, allowing users to define rules that can be enforced at design and runtime, eliminating policy violations and reducing the risks of security and unplanned cost",
      },
      {
        tag: [],
        title: "Cost estimation",
        description: "By utilizing Infracost, IaCM offers cost predictions for resource modifications, enabling users to foresee adjustments to their cloud expenses ahead of time.",
      },
      {
        tag: [{ value: "Security" }],
        title: "State management",
        description: "IaCM supports hosted remote backends, enabling users to securely store state.",
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
        description: "IaCM supports PR Automation that populates plan and cost data as a pull request comment, helping users to reduce testing time on Terraform changes",
      },
    ],
  },
};
