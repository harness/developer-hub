---
title: Best Practices
sidebar_label: Best Practices
description: Recommended practices for running Harness IaCM in production, and what tends to break when teams skip them.
keywords:
  - iacm best practices
  - infrastructure as code
  - opentofu
  - terraform
  - state management
  - governance
tags:
  - infra-as-code-management
  - best-practices
sidebar_position: 20
---

This page collects the practices Harness recommends when you run IaCM in production, along with what tends to break when teams skip them. Go to [What's supported](/docs/infra-as-code-management/whats-supported) to confirm the platforms, frameworks, and integrations available before you adopt these practices.

---

## Store state in a remote backend

Start with your state backend, before you run a real apply. Your state file is the source of truth for what IaCM manages, and damaged or lost state is the hardest failure to recover from.

- **Use a remote backend, not local state:** Store state in a remote backend such as Harness-managed storage, AWS S3, GCP Cloud Storage, or Azure Blob Storage. If you keep state on a local disk or in the runner, the next run starts from empty state and can try to recreate or destroy resources that already exist, and your team loses the shared source of truth. Go to [remote backends](/docs/infra-as-code-management/remote-backends/use-backends) to configure state storage.
- **Keep state locking enabled:** A remote backend lets OpenTofu and Terraform lock state so only one apply runs at a time. Without locking, two concurrent runs write the same state and corrupt it, which orphans resources and leaves the state file unusable.
- **Version and restrict access to state:** State holds resource attributes and can contain sensitive values. Enable versioning on the backend so you can roll back a bad apply, and restrict who can read it. If state is deleted with no version history, there is no reliable way to rebuild it without re-importing every resource by hand.

---

## Authenticate providers through connectors

How you supply credentials determines whether secrets stay protected or leak into plan output, logs, and state.

- **Prefer connectors over inline credentials:** For providers with native Harness integration, such as AWS, Azure, and GCP, authenticate with [connectors](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables). Connectors keep credentials in Harness and out of your code. If you embed credentials in variables or provider blocks, they can end up in plan output, logs, or state files, where they are hard to rotate and easy to expose.
- **Store remaining secrets in a secret manager:** For providers without a native connector, supply credentials through a secret manager and reference them as secrets, not plain text. Secrets resolved this way are masked in logs and are never written to Harness Cloud copies of state.
- **Configure AWS roles on the connector, not the delegate:** IaCM does not inherit IAM roles from the delegate. If you depend on delegate role inheritance, authentication fails at init or plan. Configure the role to assume directly on the AWS connector.
- **Bundle special dependencies in a custom plugin image:** When a provider needs specific tools or versions, package them in a [custom plugin image](/docs/infra-as-code-management/pipelines/plugin-images) to keep runs reproducible. The trade-off is that you maintain the image as provider requirements change.

---

## Add guardrails before apply

The get started flow ends in an apply, which changes real infrastructure and can change your bill. Put manual and automated checks in front of that apply before you scale.

- **Approvals and review gates:** Add a manual [approval step](/docs/infra-as-code-management/pipelines/operations-overview) as the first gate before an apply, so a reviewer can confirm plan output, cost, and policy results before infrastructure changes. Without a review gate, unverified changes apply automatically. The same Pipeline Operations page covers PR automation and drift detection: surface plan output in pull requests for review, and catch resources changed outside your IaC workflow before they accumulate and an apply reverts or conflicts with them.
- **Policies:** Apply [OPA policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to warn or fail pipelines when a change violates your rules, for example version requirements, resource tagging, or connector restrictions. Without policy gates, a non-compliant change reaches production before anyone reviews it.
- **Cost checks:** Enable [cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) and [plan and cost policies](/docs/infra-as-code-management/policies-governance/terraform-plan-cost-policy) so a plan that exceeds a threshold stops before apply. Without them, a large or mistyped change provisions expensive resources and you find out on the bill.

---

## Reuse configuration instead of copying it

Once your pipelines run, duplicated configuration becomes the most common source of silent drift between environments. Centralize what teams share so a fix in one place reaches everywhere.

- **Default pipelines:** Create reusable [default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines) and set them per project so any workspace runs a consistent init, plan, and apply flow. If every workspace defines its own pipeline, each fix or policy change has to be repeated by hand and quietly diverges.
- **Variable sets:** Share variables and connector references with [variable sets](/docs/infra-as-code-management/configuration/connectors-and-variables/variable-sets). Without them, the same values are copied across workspaces and drift apart, so one environment behaves differently from another for reasons nobody can trace. For single-pipeline values, use [pipeline variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables).
- **Module registry:** Publish shared modules to the [module registry](/docs/infra-as-code-management/registry/module-registry/module-registry-overview) so teams consume governed, versioned modules. If teams copy module code between repositories instead, a fix in one copy never reaches the others.
- **Provider registry:** Serve internal providers through the [provider registry](/docs/infra-as-code-management/registry/provider-registry) to pin sources and versions. Without a controlled source, runs pull unexpected provider versions and behavior changes between environments.

---

## Prefer Harness-native services where practical

IaCM integrates with third-party code repositories and secret managers, so you keep your choice of tools. For new setups without an existing investment to preserve, Harness-native services such as [Harness Code Repository](/docs/code-repository/) and [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview/) reduce moving parts:

- **Lower latency:** Native calls avoid round-trips to external APIs, so runs finish faster.
- **Simpler authentication:** Fewer credential mechanisms mean less to manage and rotate.
- **Centralized control:** One place to audit changes and enforce policy.

The trade-off matters: if your team already standardizes on an external repository or secret manager, switching adds migration work and retraining for limited gain. Adopt native services for new setups, and keep external tools where they are already embedded in your workflows.

---

## Keep delegates current

IaCM runs on delegates you operate, and an outdated delegate is one of the most common sources of silent failures across the Harness platform. This step is optional if Harness manages your infrastructure, but worth checking first when something fails for no obvious reason.

- **Run a current delegate version:** Some capabilities, such as module registry sync, depend on a recent delegate and fail silently on an outdated one, so a feature looks configured but never runs. Confirm your delegates run a current version before you adopt new IaCM capabilities. Go to [delegate overview](/docs/platform/delegates/install-delegates/overview) to check and upgrade your delegates.

---

## Next steps

Adopt the practices above as defaults, then layer in the platform controls that govern access and secrets across Harness.

- [Get started with IaCM](/docs/infra-as-code-management/get-started): Set up your first workspace and run a plan and apply.
- [IaCM security](/docs/infra-as-code-management/iacm-security): Review encryption, audit trail, and the scanners available in IaCM.
- [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness): Control who can change workspaces and pipelines.
- [Secrets management](/docs/category/secrets-management): Choose and configure a secret manager for your providers.
