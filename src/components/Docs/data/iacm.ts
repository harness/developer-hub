import {
    CardItem,
    CardSections,
    docType,
  } from "@site/src/components/LandingPage/TutorialCard";
  import { MODULES } from "@site/src/constants"
  
  /* Define the cards - start */
  // Featured Tutorials
//   export const featuredTutorials: CardItem[] = [
//       {
//         title: "Getting Started",
//         module: MODULES.iacm,
//         icon: "img/iacm-icon.svg",
//         description: "Use SSCA module steps to generate SBOM and enforce policies in Harness pipelines.",
//         newDoc: true,
//         type: [docType.Documentation],
//         time: "15min",
//         link: "/tutorials/secure-supply-chain/generate-sbom",
//       },
//       {
//         title: "Generate and verify SLSA Provenance",
//         module: MODULES.iacm,
//         icon: "img/iacm-icon.svg",
//         description: "Use SSCA module steps to generate and verify SLSA Provenance in Harness pipelines.",
//         newDoc: true,
//         type: [docType.Documentation],
//         time: "15min",
//         link: "/tutorials/secure-supply-chain/generate-slsa",
//       },
//     ];

    // Docs
    export const docsCards: CardSections = [
        {
          name: "Get started",
          description:
            "",
          list: [
            {
              title: "IaCM Overview",
              module: MODULES.iacm,
              description:
                "Learn about Harness Infrastructure as Code Management.",
              link: "/docs/infra-as-code-management/get-started/overview",
            },
            {
              title: "Key Concepts",
              module: MODULES.iacm,
              description:
                "Learn the key terms and concepts related to Infrastructure as Code Management.",
              link: "/docs/infra-as-code-management/get-started/key-concepts",
            },
          ],
        },

        {
          name: "IaCM Fundamentals and Tutorials",
          description:
            "",
          list: [
            {
                title: "Create a Workspace",
                module: MODULES.iacm,
                description:
                  "Learn how to create a workspace",
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
                link: "/docs/infra-as-code-management/workspaces/review-workspace",
            },
          ],
        },
        {
            name: "Feature Highlights",
            description:
              "",
            list: [
              {
                title: "Approval Step",
                module: MODULES.iacm,
                description:
                  "Learn how to use the approval step to review resource changes before applying them.",
                link: "/docs/infra-as-code-management/workspaces/approval-step",
              },
              {
                  title: "PR Automation",
                  module: MODULES.iacm,
                  description:
                    "Learn how to set up a PR pipeline for infrastructure changes.",
                  link: "/docs/infra-as-code-management/workspaces/pr-automation",
              },
              {
                  title: "Cost Estimation",
                  module: MODULES.iacm,
                  description:
                    "Learn how to get cost estimattion for infrastructure changes.",
                  link: "/docs/infra-as-code-management/workspaces/cost-estimation",
              },
              {
                title: "Using OPA Policies with IaCM",
                module: MODULES.iacm,
                description:
                  "Learn how to use OPA to add security and governance to your IaCM pipeline.",
                link: "/docs/infra-as-code-management/workspaces/opa-workspace",
            },
            {
              title: "Drift Dection",
              module: MODULES.iacm,
              description:
              "Learn how to detect and get notified on drift.",
              link: "/docs/infra-as-code-management/workspaces/drift-detection",
            },
            {
              title: "Workspace Permissions and Access Control",
              module: MODULES.iacm,
              description:
                "Learn how to apply permissions and access control on Workspace to detect and get notified on drift.",
              link: "/docs/infra-as-code-management/workspaces/workspace-rbac",
            },
            ],
          },
          {
            name: "Advanced Topics",
            description:
              "",
            list: [
              {
                title: "Using output parameter",
                description: "Learn how to use Terraform output variables in the pipeline",
                module: MODULES.iacm,
                link: "/docs/infra-as-code-management/workspaces/output-variables",
              },
              {
                title: "Use the Harness Delegate with IaCM",
                description: "Learn how the Harness Delegate works with IaCM.",
                module: MODULES.iacm,
                link: "/docs/infra-as-code-management/use-delegates-with-iacm",
              },
            ],
          },

        ];
    /* Define the cards - end */