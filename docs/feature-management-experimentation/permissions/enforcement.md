---
title: Permissions Enforcement for Feature Management & Experimentation (FME)
sidebar_label: Permissions Enforcement
sidebar_position: 3
description: Learn how to manage the transition from Split legacy permissions to Harness RBAC for Feature Management & Experimentation (FME).
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="split-harness-users">
<TabItem value="harness-fme" label="Harness FME">

Harness FME enforces permissions through [Harness RBAC](/docs/platform/role-based-access-control/rbac-in-harness). 

All edit and export permissions are controlled through [Harness RBAC Resource Groups and Roles](/docs/feature-management-experimentation/permissions/rbac#out-of-the-box-roles). Split legacy permissions do not apply.

:::warning Migrated from Split?
This is the default behavior for any user who did not previously use Split legacy permissions. 

If you were previously a Split Legacy user who used Split permissions, refer to the documentation in the **Split Legacy** tab.
:::

</TabItem>
<TabItem value="split-migrated-existing" label="Split Legacy">

Permissions Enforcement allows organizations migrating from Split legacy permissions to Harness RBAC to control how editing restrictions are applied during rollout. 

If your organization previously used Split legacy permissions, you retain your existing environment-level and object-level edit restrictions while gaining access to the **Permissions Enforcement** page in **Account Settings**. This control enables you to choose whether legacy restrictions continue to apply during the migration to centralized [Harness RBAC](/docs/feature-management-experimentation/permissions/rbac).

Administrators can enable, disable, or phase out Split legacy permissions at their own pace, ensuring a secure and low-disruption transition. These settings apply at the account level and impact all FME projects.

:::tip
Users who did not previously use Split legacy permissions will not retain or gain access to these legacy settings. These users can enforce all permissions through Harness RBAC.
:::

## Enforcement modes

Choose the enforcement mode that aligns with your organization's governance maturity:

| Enforcement Mode | Legacy Environment-Level Restrictions | Legacy Object-Level Restrictions | RBAC Enforcement |
|:---:|:---:|:---:|:---:|
| **RBAC + legacy environment + legacy object-level** (default for unmigrated accounts) | ✅ Enforced | ✅ Enforced | ✅ Always enforced |
| **RBAC + legacy object-level only** | ❌ Hidden & not enforced | ✅ Enforced | ✅ Always enforced |
| **RBAC only** | ❌ Hidden & not enforced | ❌ Hidden & not enforced | ✅ Always enforced |

RBAC permissions are always enforced. Granting a user edit rights through Split legacy permissions does not replace the required RBAC edit rights.

### Permission layers

RBAC enforcement is always active; Split legacy permissions act as optional supplemental layers. 

The following table describes what each layer governs and when it is recommended:

| Permission Layer | What it governs | When to use |
|:---:|:---:|:---:|
| **Harness RBAC** | View and edit access at [project](/docs/feature-management-experimentation/projects) and [environment](/docs/feature-management-experimentation/environments) scope (through [Resource Groups and Roles](/docs/feature-management-experimentation/permissions/rbac#resource-groups)) | ✅ Standard model going forward |
| **Legacy environment-level restrictions** | “Who can edit” and “Who can export” controls in **FME Settings** | Use temporarily during RBAC rollout |
| **Legacy object-level restrictions** | Edit rights for a specific flag, segment, or metric | Keep only if required for granular governance |

As RBAC adoption matures, administrators can remove legacy permission layers to simplify governance in Harness FME.

## Apply Permissions Enforcement

To configure Permissions Enforcement for your FME account:

1. Navigate to **Project Settings** > **Account Settings** > **Permissions Enforcement**.
1. Select the enforcement mode that aligns with your rollout stage:

    - **RBAC + legacy environment + legacy object-level**
    - **RBAC + legacy object-level only**
    - **RBAC only**

1. Click **Save** to apply your changes.

Changes take effect immediately and persist across all FME projects. 

## Migration Best Practices

As you adopt environment-level RBAC in Harness FME, you can:

1. Disable legacy environment-level controls once resource groups and roles enforce equivalent controls for targeted environments.
1. Retain legacy object-level restrictions only if required for compliance or governance until you adopt scalable approaches.
1. Gradually remove legacy layers entirely as your RBAC-based governance and scalable replacements are in place.

This phased approach prevents disruption while strengthening control across environments.

### Recommended rollout stages

Harness recommends teams transition based on organizational readiness instead of deadlines.

| Stage of rollout | Recommended enforcement mode |
|:---:|:---:|
| Early RBAC deployment | ✅ **RBAC + legacy environment + legacy object-level** |
| RBAC environment governance established | ✅ **RBAC + legacy object-level only** |
| Full RBAC adoption | ✅ **RBAC only** |

## FAQs

<details>
<summary><strong>Are tags and flag sets RBAC workflows?</strong></summary>

Not exactly. Tags are used for organization and filtering within the product, while flag sets are used to determine which flags are retrieved by the SDK. RBAC is the system that enforces who can view and edit resources.

</details>
<details>
<summary><strong>Can I immediately disable legacy object-level restrictions?</strong></summary>

Only if all necessary governance can be enforced through resource groups and roles. 

</details>
<details>
<summary><strong>Will RBAC inheritance replace legacy environment-level restrictions?</strong></summary>

Yes. Once environment-level resource groups and roles are configured, legacy environment-level edit/export restrictions can be disabled without compromising access control.

</details>
<details>
<summary><strong>How do I manage non-production environments versus production environments?</strong></summary>

You can assign resource groups to specific environments by name. For more information, see [RBAC in Harness FME](/docs/feature-management-experimentation/permissions/rbac).

</details>
<details>
<summary><strong>What happens if I select RBAC and a legacy enforcement mode at the same time?</strong></summary>

RBAC permissions are always enforced. Legacy permissions act as an optional second layer; selecting them does not override RBAC access.

</details>
<details>
<summary><strong>Can I switch enforcement modes at any time?</strong></summary>

Yes. Select a different enforcement mode on the **Permissions Enforcement** page and click **Save**. Changes take effect immediately across all projects.

</details>
<details>
<summary><strong>Should I keep legacy environment-level restrictions after enabling RBAC?</strong></summary>

You can temporarily keep them during rollout, but Harness recommends disabling these once resource groups and roles enforce equivalent controls.

</details>
<details>
<summary><strong>Should I keep legacy object-level edit restrictions after enabling RBAC?</strong></summary>

Keep them only if you require granular governance per flag, per segment, or per metric. 

</details>

</TabItem>
</Tabs>