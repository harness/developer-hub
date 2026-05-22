---
title: Pipeline Operations
sidebar_label: Overview
description: Enhance your IaCM pipelines with approvals, drift detection, PR automation, and more.
keywords:
  - approval
  - drift detection
  - pr automation
  - queue step
  - pipeline operations
tags:
  - iacm
  - pipelines
sidebar_position: 10
redirect_from:
  - /docs/infra-as-code-management/pipelines/operations/overview
  - /docs/infra-as-code-management/pipelines/operations/approval-step
  - /docs/infra-as-code-management/pipelines/operations/iacm-queue-step
  - /docs/infra-as-code-management/pipelines/operations/drift-detection
  - /docs/infra-as-code-management/pipelines/operations/pr-automation
  - /docs/infra-as-code-management/pipelines/operations/iacm-cd-pipeline
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness IaCM pipelines support several operational features that help you manage infrastructure changes safely and efficiently. These operations integrate into your provision workflows to add approval gates, detect configuration drift, automate pull request reviews, and prevent concurrent execution conflicts.

This guide covers the available pipeline operations and when to use each one.

---

## Before you begin

- **Harness account with IaCM enabled:** You need **Infrastructure as Code Management** under **Infrastructure** in Harness when it is entitled on your account. For how to access or create a Harness account, see [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide).

    :::info Contact Harness support:

    If IaCM does not appear, see [Get started with IaCM](/docs/infra-as-code-management/get-started) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). To get these, an administrator must assign you a role that includes them. See [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles).
- **Approval permissions (for Approval step):** Users who will approve or reject plans need **Approve** permission for the relevant pipeline or stage. See [Approvals in Harness](/docs/platform/approvals/approvals-tutorial).
- **Existing provision pipeline:** You need a pipeline with an IaCM stage that includes **Plan** and **Apply** steps. Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to create one.

---

## Available operations

Choose the operation that fits your workflow:

| Operation | Use case | When to use |
|---|---|---|
| **Approval step** | Review and approve infrastructure changes before applying them | When you need manual review of Terraform plan output, cost estimates, or policy evaluation before applying changes |
| **Queue step** | Serialize pipeline executions targeting the same workspace | When multiple pipelines or triggers could run concurrently against the same workspace, preventing state file conflicts |
| **Drift detection** | Identify manual changes made outside of your IaC workflow | When you want to detect resources created or modified directly in the cloud console instead of through code |
| **PR automation** | Automatically post Terraform plan output as pull request comments | When your team reviews infrastructure changes via GitHub, GitLab, or Bitbucket pull requests before merging |

---

## Operation guides

Select an operation to view the full guide:

<DynamicMarkdownSelector
  toc={toc}
  precedingHeadingID="operation-guides"
  nextHeadingID="troubleshooting"
  options={{
    "Approval Step": {
      path: "/infra-as-code-management/pipelines/content/approval-step.md",
      description: "Add manual approval gates to review Terraform plan output, cost estimates, and policy evaluations before applying infrastructure changes."
    },
    "Queue Step": {
      path: "/infra-as-code-management/pipelines/content/queue-step.md",
      description: "Serialize pipeline executions targeting the same workspace to prevent concurrent runs from causing state file conflicts."
    },
    "Drift Detection": {
      path: "/infra-as-code-management/pipelines/content/drift-detection.md",
      description: "Detect and reconcile manual changes made to cloud resources outside of your IaC workflow."
    },
    "PR Automation": {
      path: "/infra-as-code-management/pipelines/content/pr-automation.md",
      description: "Automatically post Terraform plan output as comments in pull requests for team review before merging."
    }
  }}
/>

---

## Troubleshooting

<Troubleshoot
  issue="Approval step times out after 60 minutes in Harness IaCM pipeline"
  mode="docs"
  fallback="The default approval timeout is 60 minutes. You can configure this in the approval step settings. If the step times out, the pipeline fails and you need to re-run it."
/>

<Troubleshoot
  issue="Permission denied when trying to approve or reject IaCM approval step"
  mode="docs"
  fallback="Ensure you have Approve permissions for the pipeline or stage. Contact your administrator to assign the required role. See RBAC in Harness documentation."
/>

<Troubleshoot
  issue="IaCM approval step not showing plan details or resource changes"
  mode="docs"
  fallback="Verify that the Plan step completed successfully before the Approval step. Check the Plan step logs for errors. If the plan generated no changes, the approval may show empty resource lists."
/>

<Troubleshoot
  issue="Approval step shows incomplete cost estimation data"
  mode="general"
  fallback="Cost estimation requires Infracost integration and depends on cloud provider API availability. Check that your workspace has cost estimation enabled and that the provider credentials are valid."
/>

<Troubleshoot
  issue="Queue step not preventing concurrent executions in IaCM pipeline"
  mode="docs"
  fallback="Verify that all pipelines targeting the same workspace use the exact same resource key. Check the Queue step configuration in each pipeline and ensure consistency."
/>

<Troubleshoot
  issue="Pipeline applies outdated plan after being queued"
  mode="docs"
  fallback="Place the Queue step before the Plan step, not between Plan and Apply. A queued pipeline may resume with an outdated plan if the Queue step is placed incorrectly."
/>

<Troubleshoot
  issue="Drift detection pipeline shows no drift but manual changes exist"
  mode="docs"
  fallback="Verify that the workspace state file is up to date. Run a plan-refresh-only operation first to sync the state, then run drift detection again."
/>

<Troubleshoot
  issue="PR automation not posting Terraform plan as comment in pull request"
  mode="docs"
  fallback="Check that the webhook trigger is configured correctly with the same connector as the workspace. For public repositories, add the HARNESS_PASSWORD_API environment variable with your git token."
/>

---

## Next steps

You have reviewed the available IaCM pipeline operations. Choose the operations that fit your team's workflow and add them to your provision pipelines.

- Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to create a provision pipeline.
- Go to [Default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to configure reusable pipeline templates.
- Go to [OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to enforce governance rules during pipeline execution.
- Go to [CD integration](/docs/infra-as-code-management/platform-integrations/cd-integration) to combine IaCM and CD stages in a single pipeline.
