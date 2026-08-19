---
title: FAQ — Harness IaCM
sidebar_label: FAQ
description: Answers to common questions about Harness Infrastructure as Code Management (IaCM), covering workspaces, provisioners, drift detection, state, and costs.
sidebar_position: 100
tags:
  - faq
  - iacm
---

This page answers common questions about Harness Infrastructure as Code Management (IaCM). Go to the [IaCM overview](/docs/infra-as-code-management/get-started/overview) to understand how workspaces, provisioners, and pipelines fit together.

---

## Provisioners and versions

<details>
<summary>Which Terraform versions does IaCM support?</summary>

Harness IaCM supports MPL-licensed Terraform up to **1.5.x** only. BSL-licensed releases, meaning **1.6.0** and later, are not supported. If you are on Terraform 1.6 or above, use OpenTofu as a drop-in replacement.

Go to [What is supported in IaCM](/docs/infra-as-code-management/whats-supported) to review provisioner version support.

</details>

---

## Workspaces

<details>
<summary>Can we use multiple workspaces in a single stage?</summary>

No, a single stage is limited to one workspace. A pipeline can include multiple stages, however, and each stage can reference a different workspace. You select the workspace when you configure the Infrastructure as Code Management stage, so you handle multiple workspaces by chaining stages, each performing specific tasks on its assigned workspace.

Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to configure a stage and select its workspace.

</details>

---

## Module registry

<details>
<summary>Can the same module be used with OpenTofu and Terraform?</summary>

Yes, modules are agnostic and can be used with either an OpenTofu or Terraform provisioner. The registry parses and versions the module the same way regardless of which provisioner consumes it.

Go to the [module registry overview](/docs/infra-as-code-management/registry/module-registry/module-registry-overview) to publish and version reusable modules.

</details>

---

## Drift detection

<details>
<summary>Why does drift detection report more changes than a plan?</summary>

Drift detection and planning answer different questions, so they report different results. Harness runs `tofu plan -refresh-only` for drift detection, which surfaces every change made outside of OpenTofu, including metadata such as `updated_at` values. A normal `tofu plan`, and the equivalent Harness step, only reports differences that affect bringing your infrastructure in line with your configuration, so it reports no changes when your configuration already matches state. This is by design in OpenTofu, so drift detection legitimately shows more changes than you might expect.

When drift is found, the pipeline fails and flags the affected resources in the **Resources** tab. To reconcile state without applying unrelated configuration changes, use a `plan-refresh-only` step.

Go to [drift detection](/docs/infra-as-code-management/pipelines/content/drift-detection) to build a drift pipeline and review drift details.

</details>

---

## Remote backends and state

<details>
<summary>Which remote state backends does IaCM support?</summary>

When your code contains no backend block, IaCM automatically uses Harness-managed state storage. You can also point a workspace at an existing **AWS S3**, **Google Cloud Storage**, or **Azure Blob Storage** backend by committing a `backends.tf` file, with no migration required. A separate `http` backend block lets you reach Harness-managed state from outside a pipeline.

Go to [Use existing remote state](/docs/infra-as-code-management/remote-backends/use-backends) to connect an existing backend, or [State migration](/docs/infra-as-code-management/remote-backends/state-migration) to move state into Harness.

</details>

<details>
<summary>Does Harness support the `cloud {}` configuration block?</summary>

No. The `cloud` block was designed for Terraform Cloud and Enterprise, and OpenTofu retains it only for backward compatibility. IaCM does not honor it, so remove any `cloud` block before running your configuration in a workspace.

To run operations against a workspace, use a pipeline or the Harness CLI, for example `harness execute workspace <workspace-id>`. To inspect or modify state locally, copy the `http` backend block from the workspace **CLI Integration** tab into a temporary `backend.tf` file, add that file to `.gitignore` so it does not conflict with pipeline runs, and remove it after inspection.

Go to the [Harness CLI reference](/docs/infra-as-code-management/cli-commands/harness-cli) to review the available commands, and [CLI integration](/docs/infra-as-code-management/workspaces/cli-integration) to copy your workspace backend block.

</details>

<details>
<summary>How is state locking handled?</summary>

Each backend implements its own locking mechanism, and OpenTofu acquires and releases the lock during pipeline execution. S3 uses DynamoDB, GCS uses object metadata, and Azure Blob Storage uses leases. IaCM adds no locking layer of its own, so a stuck lock is resolved through the backend rather than through Harness.

Go to [state locking considerations](/docs/infra-as-code-management/remote-backends/use-backends#state-locking-considerations) to configure locking for your backend.

</details>

---

## Costs and billing

<details>
<summary>Can drift detection incur additional costs?</summary>

No, usage charges are only incurred when an `apply` changes resources. The `plan` command and drift detection are free.

</details>
