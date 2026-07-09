---
title: Module Version Lifecycle Management
sidebar_label: Version Lifecycle Management
description: Configure version lifecycle rules in the Harness IaCM Module Registry to classify module versions as supported, update required, or deprecated, and control enforcement in pipelines.
sidebar_position: 40
keywords:
  - module registry
  - version lifecycle
  - lifecycle management
  - IaCM
  - terraform
tags:
  - iacm
  - module-registry
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import DocImage from '@site/src/components/DocImage';

This topic walks you through configuring version lifecycle rules on a module in the Harness IaCM Module Registry, choosing how each tier is enforced, and adding manual overrides for exceptions.

Version lifecycle management classifies each module version into one of three tiers: supported, update required, or deprecated. You define a sliding window rule that assigns those tiers automatically based on how recent each version is. When a [pipeline](/docs/infra-as-code-management/workspaces/provision-workspace) uses a module, Harness checks the module version against the rule and either lets it proceed, logs a warning, or fails the run, depending on the enforcement behaviour you set for that tier.

Optionally, you can pin a specific version to any tier with a manual override, for example to archive a broken version or to continue using a deprecated version for testing.

:::info Beta
This feature is in beta. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

---

## What will you learn?

By the end of this topic, you will be able to:

- Identify the [three version lifecycle tiers](#three-lifecycle-tiers).
- Configure a [sliding window rule](#how-are-tiers-assigned-to-a-version) that classifies versions automatically.
- [Set the enforcement behaviour](#configure-a-lifecycle-rule) for each tier.
- Add [manual overrides](#add-manual-overrides-for-exceptions) for exceptions.
- Understand [how enforcement runs](#how-tier-enforcement-works-during-a-pipeline-run) during a pipeline and what users see.

---

## Before you begin

Before you configure version lifecycle rules, make sure you have the following:

- **Registered module**: A module already registered in the IaCM Module Registry. Go to [register modules](/docs/infra-as-code-management/registry/module-registry) to add a new module.
- **Published versions**: The module has more than one published version. Lifecycle tiers apply only when multiple versions exist.
- **Edit permission**: You need the **Edit** permission on the IaCM module registry resource to configure lifecycle rules or overrides. Anyone with **View** permission can see the lifecycle status, but only **Edit** lets you change the rule. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles, and go to the [Permissions reference](/docs/platform/role-based-access-control/permissions-reference#infrastructure-as-code) to review the IaCM permissions.

:::info Default behaviour
If no rule is configured on a module, all versions are treated as supported and nothing is enforced. Existing modules behave exactly as before until you configure a rule.
:::

---

## Three lifecycle tiers

Every version falls into one of the following three tiers. Supported versions are always allowed. For the other two tiers, you set an **Enforcement behaviour** that controls what happens when a pipeline uses a version in that tier.

| Tier | What it means | Enforcement behaviour |
| ---- | ---- | -- |
| <span style={{backgroundColor: '#dcfce7', color: '#166534', padding: '1px 8px', borderRadius: '4px', fontWeight: '600', fontSize: '0.85em'}}>Supported</span> | The most recent versions. You can reference them without any warning. | Not enforced |
| <span style={{backgroundColor: '#fef3c7', color: '#92400e', padding: '1px 8px', borderRadius: '4px', fontWeight: '600', fontSize: '0.85em'}}>Update Required</span> | Versions just outside the supported range. You are warned but not blocked by default. | Configurable. Default: Warning |
| <span style={{backgroundColor: '#fee2e2', color: '#991b1b', padding: '1px 8px', borderRadius: '4px', fontWeight: '600', fontSize: '0.85em'}}>Deprecated</span> | All older versions. These should not be used, for example because of security gaps or known issues. | Configurable. Default: Fail |

A version's badge (Supported, Update Required, or Deprecated) appears in the version dropdown and the module detail header, so you can see its status without opening the **Lifecycle Management** tab.

---

## How are tiers assigned to a version?

You define two numbers, and a sliding window assigns tiers from the newest version down:

- **most recent versions (N)**: how many of the most recent versions are supported.
- **next versions after supported (M)**: how many versions after the supported ones are in the update required tier.

Everything older falls into the deprecated tier. Versions are ordered by semantic version, newest first, not by publish date. A backport patch published later than a higher version does not jump ahead of the tier.

For example, with **most recent versions** set to 3 and **next versions after supported** set to 2, on a module whose latest version is `v2.3.0`:

- Supported: `v2.3.0`, `v2.2.0`, `v2.1.0`
- Update required: `v2.0.0`, `v1.9.0`
- Deprecated: everything older

:::info Fewer versions than the supported count
If a module has fewer versions than the **most recent versions** count, all of its versions are supported. The update required and deprecated tiers apply only once enough versions exist.
:::

When you publish `v2.4.0`, the window slides automatically. `v2.4.0` becomes supported, the oldest supported version drops into update required, and so on down the list.

:::warning New versions shift the window
Publishing a version can move existing versions down a tier. A pipeline that passed yesterday can start to warn or fail today, with no change to the consumer's code, because a newer version was published. Tell consumer teams about the rule before you set the deprecated tier's **Enforcement behaviour** to `Fail`, and start with a generous supported count.
:::

---

## Configure a lifecycle rule

Complete the following steps to configure the sliding window and enforcement behaviour on the module's **Lifecycle Management** tab:

1. In Harness, navigate to the module in the IaCM Module Registry and select the **Lifecycle Management** tab.

   <DocImage path={require('./static/lifecycle-management.png')} alt="Lifecycle Management tab showing the Supported versions, Update required window, and Deprecated enforcement fields" title="Click to view full size" />
   <p align="center"><em>The Lifecycle Management tab with the sliding window configuration fields.</em></p>

2. Under **Supported versions**, set **most recent versions** to the number of newest versions to keep supported.
3. Under **Update required window**, set **next versions after supported** to the number of versions to flag, then set the **Enforcement behaviour** (default **Warning**).
4. Under **Deprecated**, set the **Enforcement behaviour** (default **Fail**).
5. Click **Save Changes**. The rule takes effect immediately.

---

## Add manual overrides for exceptions

A manual override pins a specific version to any tier, regardless of where the sliding window would place it. An override always wins over the window. Complete the following steps to add a manual override:

1. On the **Lifecycle Management** tab, under **Manual override**, select **Add override**.

   <DocImage path={require('./static/add-override-version-lifecycle-management.png')} alt="Manual override panel with Version, Status, and Reason fields" title="Click to view full size" />
   <p align="center"><em>The Manual override panel where you select the version, target tier, and reason for the exception.</em></p>

2. In **Version**, select the version to override.
3. In **Status**, select the tier to pin the version to: **Supported**, **Update required**, or **Deprecated**.
4. In **Reason**, enter why you are overriding the version, so other admins understand the exception.
5. Click **Save Changes**.

To remove an override, click the **×** icon next to it. The version then follows the sliding window again.

Common uses:

- **Archive a bad version**: A version that would otherwise be supported has a known critical bug, so you pin it to deprecated. Any pipeline that resolves that version then fails.
- **Extend support for an exception**: A team needs more time to migrate off a deprecated version, so you pin that one version to supported or update required for a period.

:::info Override persistence
An override stays in place until you remove it. If you pin a version to supported as a temporary exception, remove the override once the team migrates, otherwise that version stays supported no matter where the sliding window places it.
:::

---

## How tier enforcement works during a pipeline run

Enforcement happens inside the Harness IaCM pipeline step, not at the registry level. The check runs after `terraform init` resolves the module versions and before `plan` proceeds. The **Enforcement behaviour** you set for a tier maps to one of the following outcomes:

- **No enforcement**: the version proceeds with no message. This is always the case for supported versions.
- **Warning**: the pipeline step succeeds but logs an upgrade notice that names the module, the current version, and the recommended version.
- **Fail**: the pipeline step errors out before plan, with a message naming the module, the version, its status, and the minimum supported version.

### Best practices

Keep the following in mind when working with lifecycle enforcement in Harness pipelines:

- **Resolved version is checked**: If your Terraform code uses a version constraint such as `~> 2.0`, the version that `terraform init` resolves is the one evaluated.
- **Direct references only**: Enforcement applies to modules referenced directly in your workspace. Transitive dependencies (a module that depends on another module) are not evaluated.
- **Plan is the gate**: Enforcement runs at plan time. A plan that passes is not re-evaluated at apply.
- **Harness pipelines are the boundary**: Running Terraform locally or outside Harness bypasses lifecycle enforcement by design.

:::info Governance scope
Because Harness pipelines are the enforcement boundary, lifecycle rules govern usage but do not physically remove a version. A developer running Terraform locally can still resolve a deprecated version. Treat this as a governance guardrail within Harness, not a hard removal from the registry.
:::

---

## Troubleshooting

<Troubleshoot
  issue="A pipeline started failing after a new module version was published"
  mode="fallback-only"
  fallback="Publishing a new version shifts the sliding window, which can move the version a workspace uses into the update required or deprecated tier. Check the module's Lifecycle Management tab to see the current tier of the version your workspace resolves, then either upgrade the workspace to a supported version or add a manual override for the affected version."
/>

<Troubleshoot
  issue="A deprecated version is not being blocked in a pipeline"
  mode="fallback-only"
  fallback="Confirm the deprecated tier's Enforcement behaviour is set to Fail rather than Warning. Enforcement also applies only to modules referenced directly in the workspace and only within Harness pipelines. Local Terraform runs are not enforced."
/>

<Troubleshoot
  issue="A version shows an unexpected tier"
  mode="fallback-only"
  fallback="A manual override always wins over the sliding window. Check the Manual override section on the Lifecycle Management tab to see whether the version is pinned."
/>

---

## Next steps

You have configured version lifecycle rules on a module and can now enforce upgrade policies across Harness pipelines.

- Go to [Module Registry overview](/docs/infra-as-code-management/registry/module-registry/module-registry-overview) to understand module structure, registered module tabs, and governance for the IaCM Module Registry.
- Go to [Register modules](/docs/infra-as-code-management/registry/module-registry) to register a module in Harness IaCM.
- Go to [Module Artifacts](/docs/infra-as-code-management/registry/module-registry/module-registry-artifacts) to choose artifact or Git reference storage, connect an onboarding pipeline, and use auto-sync.
- Go to [Test module versions](/docs/infra-as-code-management/registry/module-registry/module-registry-testing) to validate module changes before consumers use them.
- Go to [Provider Registry](/docs/infra-as-code-management/registry/provider-registry) to understand the provider counterpart to the module registry.
- Go to [Policy & Governance](/docs/category/policy--governance) to understand OPA-based governance across IaCM.
