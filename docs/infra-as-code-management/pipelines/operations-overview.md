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
  - blast radius
  - risk score
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

Harness IaCM pipelines support several operational features that help you manage infrastructure changes safely and efficiently. These operations integrate into your provision workflows to add approval gates, score deployment risk with AI analysis, detect configuration drift, automate pull request reviews, and prevent concurrent execution conflicts.

This guide covers the available pipeline operations and when to use each one.

---

## Before you begin

- **Harness account with IaCM enabled:** You need **Infrastructure as Code Management** under **Infrastructure** in Harness when it is entitled on your account. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support

    If IaCM does not appear, go to [Get started with IaCM](/docs/infra-as-code-management/get-started), or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to review the permissions model, and go to [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to assign a role that includes them.
- **Approval permissions (for Approval step):** Users who approve or reject plans need **Approve** permission for the relevant pipeline or stage. Go to [Pipeline permissions](/docs/platform/role-based-access-control/permissions-reference#pipelines) to review the required permissions, and go to [Approvals in Harness](/docs/platform/approvals/approvals-tutorial) to configure the Approval step.
- **Existing provision pipeline:** You need a pipeline with an IaCM stage that includes **Plan** and **Apply** steps. Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to create one.

---

## Available operations

Choose the operation that fits your workflow:

| Operation | Use case | When to use |
|---|---|---|
| **[AI Blast Radius Agent](/docs/infra-as-code-management/pipelines/blast-radius-agent)** | Score deployment risk and visualize resource dependencies from a Terraform or OpenTofu plan | When you want engineers and approvers to see a risk score, plain-language summary, and dependency graph before applying changes |
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

:::tip AI Blast Radius Agent
The **AI Blast Radius Agent** step analyzes your Terraform or OpenTofu plan output and returns a 1–10 risk score, a plain-language summary of the main risk drivers, and an interactive resource dependency graph. Because it is a standalone pipeline step with dedicated configuration options, it has its own guide.

Go to [AI Blast Radius Agent](/docs/infra-as-code-management/pipelines/blast-radius-agent) to add it to your pipeline.
:::

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
  fallback="Ensure you have Approve permissions for the pipeline or stage. Contact your administrator to assign the required role, or go to the RBAC in Harness documentation to review required permissions."
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

<Troubleshoot
  issue="IACM Blast Radius Agent step fails with a missing plan file error"
  mode="fallback-only"
  fallback="The Blast Radius Agent step requires a Terraform or OpenTofu plan step to run immediately before it in the same IaCM stage. Add a plan step before the Blast Radius Agent step and re-run the pipeline."
/>

<Troubleshoot
  issue="AI Blast Radius Analysis banner does not appear on the Resources tab after the Blast Radius Agent step completes"
  mode="general"
  fallback="Verify that you have been granted access to the AI Blast Radius Agent Beta. If access is confirmed and the step completed without errors, refresh the pipeline execution page. If the banner still does not appear, contact Harness Support."
/>

---

## Next steps

You have reviewed the available IaCM pipeline operations. Choose the operations that fit your team's workflow and add them to your provision pipelines.

- Go to [AI Blast Radius Agent](/docs/infra-as-code-management/pipelines/blast-radius-agent) to score deployment risk and visualize resource dependencies before you apply.
- Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to create a provision pipeline.
- Go to [Default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) to configure reusable pipeline templates.
- Go to [OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to enforce governance rules during pipeline execution.
- Go to [CD integration](/docs/infra-as-code-management/platform-integrations/cd-integration) to combine IaCM and CD stages in a single pipeline.
