import { CardSections } from "@site/src/components/TutorialCard/TutorialCard";
import { MODULES } from "@site/src/constants";

/* Define the cards - start */

// Docs
export const docsCards: CardSections = [
  {
    name: "Get started",
    description: "",
    list: [
      {
        title: "Choose your provisioner",
        module: MODULES.iacm,
        description: "Get started with Harness IaCM using your preferred Infrastructure as Code tool.",
        link: "/docs/infra-as-code-management/get-started/",
        children: [
          {
            title: "OpenTofu",
            module: MODULES.iacm,
            description: "Get started with OpenTofu",
            link: "/docs/infra-as-code-management/get-started/#opentofu",
          },
          {
            title: "Terraform",
            module: MODULES.iacm,
            description: "Get started with Terraform",
            link: "/docs/infra-as-code-management/get-started/#terraform",
          },
          {
            title: "Terragrunt",
            module: MODULES.iacm,
            description: "Get started with Terragrunt",
            link: "/docs/infra-as-code-management/get-started/#terragrunt",
          },
          {
            title: "AWS CDK",
            module: MODULES.iacm,
            description: "Get started with AWS CDK",
            link: "/docs/infra-as-code-management/get-started/#aws-cdk",
          },
        ],
      },
      {
        title: "Overview & key concepts",
        module: MODULES.iacm,
        description: "Understand the core concepts of Harness Infrastructure as Code Management.",
        link: "/docs/infra-as-code-management/get-started/overview",
      },
      {
        title: "What's supported",
        module: MODULES.iacm,
        description: "Find details on supported IaC tools, cloud providers, and frameworks like OpenTofu and Terraform.",
        link: "/docs/infra-as-code-management/whats-supported",
      },
    ]
  },
  {
    name: "Core workflow",
    description: "",
    list: [
      {
        title: "Create a workspace",
        module: MODULES.iacm,
        description: "Configure a new IaCM workspace to manage your infrastructure.",
        link: "/docs/infra-as-code-management/workspaces/create-workspace",
      },
      {
        title: "Provision your infrastructure",
        description: "Run plan and apply operations to provision and destroy workspaces.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/workspaces/provision-workspace",
      },
      {
        title: "Review workspace state",
        description: "Explore workspace resources, state files, and execution history.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/reports-insights/review-workspace",
      },
    ]
  },
  {
    name: "Enhance your workflow",
    description: "",
    list: [
      {
        title: "PR automation",
        module: MODULES.iacm,
        description: "Set up automated PR pipelines to review infrastructure changes before they are applied.",
        link: "/docs/infra-as-code-management/pipelines/operations/pr-automation",
      },
      {
        title: "Approval step",
        module: MODULES.iacm,
        description: "Review and approve resource changes before they are applied.",
        link: "/docs/infra-as-code-management/pipelines/operations/approval-step",
      },
      {
        title: "Cost estimation",
        module: MODULES.iacm,
        description: "Get cost estimates for infrastructure changes before applying them.",
        link: "/docs/infra-as-code-management/workspaces/cost-estimation",
      },
      {
        title: "Drift detection",
        module: MODULES.iacm,
        description: "Detect and get notified about infrastructure drift.",
        link: "/docs/infra-as-code-management/pipelines/operations/drift-detection",
      },
      {
        title: "OPA policies",
        module: MODULES.iacm,
        description: "Add security and governance to your IaCM pipelines with Open Policy Agent.",
        link: "/docs/infra-as-code-management/policies-governance/opa-workspace",
      },
      {
        title: "Workspace access control",
        module: MODULES.iacm,
        description: "Apply permissions and access controls to your workspaces.",
        link: "/docs/infra-as-code-management/manage-projects/workspace-rbac",
      },
      {
        title: "Remote backends",
        module: MODULES.iacm,
        description: "Configure remote state backends and migrate existing state into Harness IaCM.",
        link: "/docs/infra-as-code-management/remote-backends/use-backends",
      },
      {
        title: "Configuration management with Ansible",
        module: MODULES.iacm,
        description: "Run Ansible playbooks alongside your IaC pipelines to configure provisioned infrastructure.",
        link: "/docs/infra-as-code-management/configuration-management/ansible/overview",
      },
    ]
  },
  {
    name: "Registry",
    description: "",
    list: [
      {
        title: "Module registry",
        module: MODULES.iacm,
        description: "Publish, version, and share reusable IaC modules across your organization.",
        link: "/docs/infra-as-code-management/registry/module-registry",
      },
      {
        title: "Provider registry",
        module: MODULES.iacm,
        description: "Manage and govern Terraform and OpenTofu providers centrally.",
        link: "/docs/infra-as-code-management/registry/provider-registry",
      },
    ]
  },
  {
    name: "Advanced topics",
    description: "",
    list: [
      {
        title: "Use output variables",
        description: "Pass IaC output variables between pipeline steps.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/reports-insights/output-variables",
      },
      {
        title: "Use the Harness Delegate with IaCM",
        description: "Understand how the Harness Delegate works with IaCM.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/platform-integrations/delegate",
      },
    ]
  },
];
/* Define the cards - end */
