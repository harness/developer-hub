---
title: Role-based access control (RBAC) in pipelines, templates, and secrets
description: Configure granular create and edit permissions for pipelines, templates, and secrets using split permission controls in Harness.
sidebar_position: 15
sidebar_label: RBAC in pipelines, templates, and secrets
keywords:
  - RBAC
  - role-based access control
  - pipeline permissions
  - template permissions
  - secret permissions
  - create permissions
  - edit permissions
  - permission split
  - separation of duties
  - access control
  - Harness RBAC
  - security best practices
  - permission management
  - feature flags
  - access policies
tags:
  - RBAC
  - Permissions
  - Security
  - Pipelines
  - Templates
  - Secrets
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness provides granular role-based access control (RBAC) for <a href="/docs/continuous-delivery/getting-started/#step-1-create-your-pipeline" target="_blank">pipelines</a>, <a href="/docs/platform/templates/harness-template-library" target="_blank">templates</a>, and <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank">secrets</a>. You can manage **create** and **edit** permissions independently for these resources, which gives you fine-grained control over who creates new resources and who modifies existing ones.

When you split the **create** and **edit** permissions, you can assign roles that allow users to create pipelines or secrets without granting them edit access to existing resources, or vice versa. This capability supports compliance requirements and provides better alignment with the principle of least privilege.

For more fine-grained control over access to connectors and environments, you can use <a href="/docs/platform/role-based-access-control/attribute-based-access-control" target="_blank">Attribute-Based Access Control (ABAC)</a> as an extension of RBAC on your resource groups. ABAC provides highly refined control by using rules to restrict access based on combinations of attributes, such as connector and environment type.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Understand how [split create and edit permissions work](#split-the-create-and-edit-permissions) for pipelines, templates, and secrets.
- Identify the [feature flags](#feature-flags-for-split-permissions) that control migration and enforcement for each resource type.
- Review the [permissions](#permissions-reference) available for pipelines, templates, and secrets.
- [Enable the feature flags](#step-1-enable-the-feature-flags) and [assign](#step-2-assign-split-permissions) independent create and edit permissions to roles.
- [Update automation scripts](#step-3-update-automation-scripts) to work with split permissions.

---

## Before you begin

Before you configure split permissions for pipelines, templates, or secrets, ensure you have the following:

- **Account administrator permissions**: Account administrator access in Harness to configure roles and permissions. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles and permissions.
- **Harness Support contact**: Access to Harness Support to request feature flag enablement. Split permissions do not take effect until Harness Support enables the flags for your account.
- **Automation inventory**: A list of all Terraform scripts, API integrations, and automation workflows that create or edit pipelines, templates, or secrets. These scripts must include explicit create permissions after the feature flags are enabled.

---

## Split the create and edit permissions

Splitting the **create** and **edit** permissions decouples resource creation from resource modification, so you can grant one permission without the other.

- **Create permission**: Allows users to create new pipelines, templates, or secrets.
- **Edit permission**: Allows users to modify existing pipelines, templates, or secrets.

Create and edit are mutually exclusive grants. Users must be explicitly granted both permissions if they need to perform both actions, so a user with only `edit` cannot create a new resource, and a user with only `create` cannot modify an existing one.

---

## Feature flags for split permissions

Each resource type is rolled out in two controlled phases, and the flags must be enabled in order. The migration flag adds the `create` permission to every role that already has `edit`, so no user loses access during the transition. The enforcement flag switches access checks over to the split permissions and shows **Create** and **Edit** as separate checkboxes in the UI.

| Resource type | Migration flag | Enforcement flag |
| --- | --- | --- |
| Pipelines and templates | `PIPE_CREATE_EDIT_PERMISSION_SPLIT_MIGRATION` | `PIPE_CREATE_EDIT_PERMISSION_SPLIT` |
| Secrets | `PL_SECRET_CREATE_EDIT_PERMISSION_SPLIT_MIGRATION` | `PL_SECRET_CREATE_EDIT_PERMISSION_SPLIT_ENFORCE` |

Pipelines and templates share a single pair of flags, so enabling them splits the permissions for both resource types at the same time. Secrets use a separate pair of flags, which means you can adopt the split for secrets independently.

:::note
Currently, this feature is behind the feature flags listed above. Contact [Harness Support](mailto:support@harness.io) to enable it. Onboarding is gated by customer approval per account.
:::

---

## Permissions reference

Select a tab to review the permissions for each resource type and how the create and edit grants change with the feature flags.

<Tabs>
<TabItem value="pipelines" label="Pipelines" default>

The following permissions are always available:

- `core_pipeline_view`: Permission to view pipelines.
- `core_pipeline_execute`: Permission to execute a pipeline.
- `core_pipeline_abort`: Permission to abort an execution.
- `core_pipeline_delete`: Permission to delete a pipeline.

Create and edit permissions depend on feature flag status:

- **With feature flags enabled**: `core_pipeline_create` creates a pipeline, and `core_pipeline_edit` edits a pipeline.
- **Without feature flags**: `core_pipeline_edit` is a combined permission to create and edit pipelines.

</TabItem>
<TabItem value="templates" label="Templates">

The following permissions are always available:

- `core_template_view`: Permission to view a template.
- `core_template_copy`: Permission to copy a template.
- `core_template_delete`: Permission to delete a template.
- `core_template_access`: General access to the template resource.

Create and edit permissions depend on feature flag status:

- **With feature flags enabled**: `core_template_create` creates a template, and `core_template_edit` edits a template.
- **Without feature flags**: `core_template_edit` is a combined permission to create and edit templates.

</TabItem>
<TabItem value="secrets" label="Secrets">

The following permissions are always available:

- `core_secret_view`: Permission to view a secret.
- `core_secret_delete`: Permission to delete a secret.
- `core_secret_access`: Permission to access secrets at runtime.

Create and edit permissions depend on feature flag status:

- **With feature flags enabled**: `core_secret_create` creates a secret, and `core_secret_edit` edits a secret.
- **Without feature flags**: `core_secret_edit` is a combined permission to create and edit secrets.

</TabItem>
</Tabs>

---

## Step 1: Enable the feature flags

Enable the flags in order so that existing roles are migrated before access checks change. Contact Harness Support and request the flags for the resource types you want to split, as listed in [Feature flags for split permissions](#feature-flags-for-split-permissions).

1. Request enablement of the migration flag.
2. After migration completes, typically 24-48 hours, request enablement of the enforcement flag.

During the migration phase, Harness automatically adds the `create` permission to every role that already holds the matching `edit` permission. For example, roles with `core_pipeline_edit` receive `core_pipeline_create`, and roles with `core_secret_edit` receive `core_secret_create`. New and updated roles receive both permissions.

---

## Step 2: Assign split permissions

After both feature flags are enabled, you assign create and edit permissions independently when you create or modify a role.

1. In your Harness account, navigate to **Account Settings** > **Access Control** > **Roles**.
2. Select an existing role, or click **New Role** to create a role.
3. In the **Permissions** section, expand **Pipelines**, **Templates**, or **Secrets**.
4. Select the checkboxes for the permissions you want to assign:
   - Select **Create** to allow users to create new resources.
   - Select **Edit** to allow users to modify existing resources.
   - Select both checkboxes if users need both permissions.
5. Click **Save**.

Users assigned this role now hold the create or edit permissions you configured.

---

## Step 3: Update automation scripts

If you use Terraform, APIs, or other automation tools to manage Harness resources, update your scripts to request the `create` permission explicitly. Without this update, your automation can only edit existing resources and cannot create new ones.

<Tabs>
<TabItem value="pipelines" label="Pipelines" default>

Before split permissions, a single permission covered both actions:

```hcl
permissions = ["core_pipeline_edit"]
```

After split permissions, list create and edit explicitly:

```hcl
permissions = [
  "core_pipeline_create",
  "core_pipeline_edit"
]
```

</TabItem>
<TabItem value="templates" label="Templates">

Before split permissions, a single permission covered both actions:

```hcl
permissions = ["core_template_edit"]
```

After split permissions, list create and edit explicitly:

```hcl
permissions = [
  "core_template_create",
  "core_template_edit"
]
```

</TabItem>
<TabItem value="secrets" label="Secrets">

Before split permissions, a single permission covered both actions:

```hcl
permissions = ["core_secret_edit"]
```

After split permissions, list create and edit explicitly:

```hcl
permissions = [
  "core_secret_create",
  "core_secret_edit"
]
```

</TabItem>
</Tabs>

---

## Enforcement behavior

Before you enable the enforcement flag, review the following behavior because they change how existing roles and automations resolve access.

- **Create and edit are exclusive**: Users must be explicitly assigned both permissions if they need to perform both actions. A user with only `edit` permission cannot create new resources.
- **Terraform and API scripts must be updated**: Scripts must include `core_pipeline_create`, `core_template_create`, or `core_secret_create` explicitly to perform create operations.
- **Edit-only users cannot delete or execute**: These actions are governed by separate permissions, such as `core_pipeline_delete` and `core_pipeline_execute`.
- **Migration is automatic**: During the migration phase, `create` permissions are added to roles that already have `edit`. Migration is customer-controlled and enabled per account.

---

## Related articles

- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>: Review the permissions hierarchy and role assignment model in Harness.
- <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a>: View the complete list of permissions available for each resource type.
- <a href="/docs/platform/role-based-access-control/attribute-based-access-control" target="_blank">Attribute-Based Access Control (ABAC)</a>: Extend RBAC on your resource groups with fine-grained attribute-based rules for connectors and environments.
- <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">Add and manage roles</a>: Create and configure custom roles with specific permissions.