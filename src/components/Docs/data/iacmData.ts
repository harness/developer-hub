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
        title: "What's supported",
        module: MODULES.iacm,
        description: "Find details on supported Infrastructure as Code tools, providers and frameworks like OpenTofu and Terraform.",
        link: "/docs/infra-as-code-management/whats-supported",
      },
      {
        title: "Onboarding",
        module: MODULES.iacm,
        description: "Get onboarded with Harness Infrastructure as Code Management.",
        link: "/docs/infra-as-code-management/get-started/",
      },
      {
        title: "Overview & key concepts",
        module: MODULES.iacm,
        description: "Learn about Harness Infrastructure as Code Management.",
        link: "/docs/infra-as-code-management/get-started/overview",
      },
    ]
  },
  {
    name: "IaCM Fundamentals and Tutorials",
    description: "",
    list: [
      {
        title: "Create a Workspace",
        module: MODULES.iacm,
        description: "Learn how to create a workspace",
        link: "/docs/infra-as-code-management/workspaces/create-workspace",
      },
      {
        title: "Provision and destroy workspaces",
        description: "Learn how to provision and destroy workspaces.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/workspaces/provision-workspace",
      },
      {
        title: "Review workspace resources, states, and execution history",
        description: "Explore the details of a workspace.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/reports-insights/review-workspace"
      }
    ]
  },
  {
    name: "Feature Highlights",
    description: "",
    list: [
      {
        title: "Approval Step",
        module: MODULES.iacm,
        description: "Learn how to use the approval step to review resource changes before applying them.",
        link: "/docs/infra-as-code-management/pipelines/operations/approval-step",
      },
      {
        title: "PR Automation",
        module: MODULES.iacm,
        description: "Learn how to set up a PR pipeline for infrastructure changes.",
        link: "/docs/infra-as-code-management/pipelines/operations/pr-automation",
      },
      {
        title: "Cost Estimation",
        module: MODULES.iacm,
        description: "Learn how to get cost estimation for infrastructure changes.",
        link: "/docs/infra-as-code-management/workspaces/cost-estimation",
      },
      {
        title: "Using OPA Policies with IaCM",
        module: MODULES.iacm,
        description: "Learn how to use OPA to add security and governance to your IaCM pipeline.",
        link: "/docs/infra-as-code-management/policies-governance/opa-workspace",
      },
      {
        title: "Drift Detection",
        module: MODULES.iacm,
        description: "Learn how to detect and get notified on drift.",
        link: "/docs/infra-as-code-management/pipelines/operations/drift-detection",
      },
      {
        title: "Workspace Permissions and Access Control",
        module: MODULES.iacm,
        description:
          "Learn how to apply permissions and access controls on Workspaces",
        link: "/docs/infra-as-code-management/project-setup/workspace-rbac",
      }
    ]
  },
  {
    name: "Advanced Topics",
    description: "",
    list: [
      {
        title: "Using output parameter",
        description: "Learn how to use Terraform output variables in the pipeline",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/reports-insights/output-variables",
      },
      {
        title: "Use the Harness Delegate with IaCM",
        description: "Learn how the Harness Delegate works with IaCM.",
        module: MODULES.iacm,
        link: "/docs/infra-as-code-management/project-setup/use-delegates-with-iacm",
      }
    ]
  }
];
/* Define the cards - end */