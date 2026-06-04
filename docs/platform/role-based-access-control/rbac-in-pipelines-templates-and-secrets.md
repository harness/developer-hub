---
title: Role-based access control (RBAC) in pipelines, templates, and secrets
description: Configure granular create and edit permissions for pipelines, templates, and secrets using split permission controls in Harness.
sidebar_position: 15
redirect_from:
- /docs/platform/role-based-access-control/rbac-in-harness#split-createedit-permissions
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

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness provides granular role-based access control (RBAC) for pipelines, templates, and secrets. You can now manage **create** and **edit** permissions independently, giving you fine-grained control over who can create new resources versus who can modify existing ones. This separation of duties helps enforce enterprise security policies and reduces the risk of unauthorized changes.

When you split create and edit permissions, you can assign roles that allow users to create pipelines or secrets without granting them edit access to existing resources, or vice versa. This capability supports compliance requirements and provides better alignment with the principle of least privilege.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:
- Understand how split create and edit permissions work for pipelines, templates, and secrets.
- Enable feature flags to migrate and enforce split permissions.
- Assign independent create and edit permissions to user roles.
- Update automation scripts to work with split permissions.

---

## Before you begin

Before you configure split permissions for pipelines, templates, or secrets, ensure you have the following:

- **Account administrator permissions**: Account administrator access in Harness to configure roles, permissions, and feature flags. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles and permissions.
- **Harness Support contact**: Access to Harness Support to request feature flag enablement. Feature flags must be enabled by Harness Support before split permissions take effect.
- **Automation inventory**: A list of all Terraform scripts, API integrations, and automation workflows that create or edit pipelines, templates, or secrets. These scripts must be updated to include explicit create permissions after feature flags are enabled.

### Extend RBAC with ABAC

For more fine-grained control over access to connectors and environments, you can use <a href="/docs/platform/role-based-access-control/attribute-based-access-control" target="_blank">Attribute-Based Access Control (ABAC)</a> as an extension of RBAC on your resource groups.

ABAC provides highly refined control by using rules to restrict access based on combinations of attributes, such as connector and environment type.

---

## Split create and edit permissions for pipelines and templates

Harness has introduced a permission split for pipelines and templates, allowing you to manage **create** and **edit** actions independently. This RBAC enhancement gives you more granular control when assigning user roles and supports stricter separation of duties and better alignment with enterprise access policies.

### How it works

Before split permissions, the `edit` permission controlled both creating and editing pipelines and templates. With split permissions enabled, you assign two separate permissions:

- **Create permission**: Allows users to create new pipelines or templates.
- **Edit permission**: Allows users to modify existing pipelines or templates.

Users must be explicitly granted both permissions if they need to perform both actions. This separation prevents users with edit access from creating new resources, and vice versa.

### Feature flag rollout process

This feature is being rolled out in two controlled phases. Feature flags must be enabled **in order**:

1. **Migration flag** (`PIPE_CREATE_EDIT_PERMISSION_SPLIT_MIGRATION`):  
   Enables migration. Automatically adds `create` permissions to all roles that already have `edit`. New and updated roles receive both permissions.

2. **Enforcement flag** (`PIPE_CREATE_EDIT_PERMISSION_SPLIT`):  
   Enables enforcement and UI changes. Access checks now rely on the split permissions, and **Create** and **Edit** are shown as separate checkboxes in the UI.

:::note
Reach out to <a href="mailto:support@harness.io">Harness Support</a> to enable these feature flags. Onboarding is gated by customer approval per account.
:::

### Pipeline permissions

You can now assign the following permissions independently:

- `core_pipeline_create` — permission to create pipelines  
- `core_pipeline_edit` — permission to edit pipelines  

<details>
<summary>View all pipeline permissions</summary>

The following permissions are always available:

- `core_pipeline_abort` — permission to abort an execution  
- `core_pipeline_view` — permission to view pipelines  
- `core_pipeline_execute` — permission to execute a pipeline  
- `core_pipeline_delete` — permission to delete a pipeline  

Create and edit permissions depend on feature flag status:

**With feature flags enabled:**
- `core_pipeline_create` — permission to create a pipeline  
- `core_pipeline_edit` — permission to edit a pipeline  

**Without feature flags:**
- `core_pipeline_edit` — combined permission to create and edit pipelines  

</details>

### Template permissions

Template permissions are also split into:

- `core_template_create` — permission to create templates  
- `core_template_edit` — permission to edit templates  

<details>
<summary>View all template permissions</summary>

The following permissions are always available:

- `core_template_copy` — permission to copy a template  
- `core_template_view` — permission to view a template  
- `core_template_delete` — permission to delete a template  
- `core_template_access` — general access to the template resource  

Create and edit permissions depend on feature flag status:

**With feature flags enabled:**
- `core_template_create` — permission to create a template  
- `core_template_edit` — permission to edit a template  

**Without feature flags:**
- `core_template_edit` — combined permission to create and edit templates  

</details>

### Step 1: Enable feature flags

To enable split permissions for pipelines and templates, contact Harness Support and request the following feature flags in order:

1. Request enablement of `PIPE_CREATE_EDIT_PERMISSION_SPLIT_MIGRATION`.
2. After migration completes (typically 24-48 hours), request enablement of `PIPE_CREATE_EDIT_PERMISSION_SPLIT`.

During the migration phase, Harness automatically adds `core_pipeline_create` and `core_template_create` permissions to all roles that currently have `core_pipeline_edit` or `core_template_edit`. This ensures no users lose access during the transition.

### Step 2: Assign split permissions

After both feature flags are enabled, you can assign create and edit permissions independently when creating or modifying roles.

To assign split permissions to a role, do the following:

1. In your Harness account, go to **Account Settings** -> **Access Control** -> **Roles**.
2. Select an existing role or select **New Role** to create a new role.
3. In the **Permissions** section, expand **Pipelines** or **Templates**.
4. Select the checkboxes for the permissions you want to assign:
   - Select **Create** to allow users to create new pipelines or templates.
   - Select **Edit** to allow users to modify existing pipelines or templates.
   - Select both checkboxes if users need both permissions.
5. Select **Save**.

Users assigned this role now have the specified create or edit permissions based on your configuration.

### Step 3: Update automation scripts

If you use Terraform, APIs, or other automation tools to manage Harness resources, update your scripts to include explicit `core_pipeline_create` or `core_template_create` permissions.

**Before split permissions (single permission):**

```hcl
permissions = ["core_pipeline_edit"]
```

**After split permissions (explicit create and edit):**

```hcl
permissions = [
  "core_pipeline_create",
  "core_pipeline_edit"
]
```

Without this update, your automation scripts can only edit existing resources and cannot create new ones.

### Key behavior notes

After the enforcement flag is enabled, the following behaviors apply:

- **Create and edit are exclusive**: Users must be explicitly assigned both permissions if they need to perform both actions. A user with only `edit` permission cannot create new resources.
- **Terraform and API scripts must be updated**: Scripts must include `core_pipeline_create` or `core_template_create` explicitly to perform create operations.
- **Edit-only users cannot delete or execute**: These actions are governed by separate permissions (`core_pipeline_delete`, `core_pipeline_execute`).
- **Migration is automatic**: During the migration phase (flag 1), `create` permissions are automatically added to roles with `edit`. Migration is customer-controlled and enabled per account.

---

## Split create and edit permissions for secrets

With the secret permission split, you can now manage create and edit actions separately, giving you more granular control over secret management. This enhancement allows you to assign roles that permit creating new secrets without granting edit access to existing secrets, or vice versa.

### How it works

Before split permissions, the `edit` permission controlled both creating and editing secrets. With split permissions enabled, you assign two separate permissions:

- **Create permission**: Allows users to create new secrets.
- **Edit permission**: Allows users to modify existing secrets.

Users must be explicitly granted both permissions if they need to perform both actions. This separation prevents users with edit access from creating new secrets, and vice versa.

### Feature flag rollout process

This feature is controlled by two feature flags that must be enabled in the following order:

1. **Migration flag** (`PL_SECRET_CREATE_EDIT_PERMISSION_SPLIT_MIGRATION`):  
   Enables migration. Adds the `create` permission to all roles that already have `edit`.

2. **Enforcement flag** (`PL_SECRET_CREATE_EDIT_PERMISSION_SPLIT_ENFORCE`):  
   Enables enforcement. UI changes and access checks now depend on the split permissions: `create` and `edit`.

:::note
Reach out to <a href="mailto:support@harness.io">Harness Support</a> to enable these feature flags.
:::

### Secrets permissions

You can now assign the following permissions individually:

- `core_secret_create` — permission to create secrets  
- `core_secret_edit` — permission to edit secrets  

<details>
<summary>View all secrets permissions</summary>

The following permissions are always available:

- `core_secret_view` — permission to view a secret  
- `core_secret_delete` — permission to delete a secret  
- `core_secret_access` — permission to access secrets at runtime  

Create and edit permissions depend on feature flag status:

**With feature flags enabled:**
- `core_secret_create` — permission to create a secret  
- `core_secret_edit` — permission to edit a secret  

**Without feature flags:**
- `core_secret_edit` — combined permission to create and edit secrets  

</details>

### Step 1: Enable feature flags

To enable split permissions for secrets, contact Harness Support and request the following feature flags in order:

1. Request enablement of `PL_SECRET_CREATE_EDIT_PERMISSION_SPLIT_MIGRATION`.
2. After migration completes (typically 24-48 hours), request enablement of `PL_SECRET_CREATE_EDIT_PERMISSION_SPLIT_ENFORCE`.

During the migration phase, Harness automatically adds `core_secret_create` permission to all roles that currently have `core_secret_edit`. This ensures no users lose access during the transition.

### Step 2: Assign split permissions

After both feature flags are enabled, you can assign create and edit permissions independently when creating or modifying roles.

To assign split permissions to a role, do the following:

1. In your Harness account, go to **Account Settings** -> **Access Control** -> **Roles**.
2. Select an existing role or select **New Role** to create a new role.
3. In the **Permissions** section, expand **Secrets**.
4. Select the checkboxes for the permissions you want to assign:
   - Select **Create** to allow users to create new secrets.
   - Select **Edit** to allow users to modify existing secrets.
   - Select both checkboxes if users need both permissions.
5. Select **Save**.

Users assigned this role now have the specified create or edit permissions based on your configuration.

### Step 3: Update automation scripts

If you use Terraform, APIs, or other automation tools to manage secrets, update your scripts to include explicit `core_secret_create` permissions.

**Before split permissions (single permission):**

```hcl
permissions = ["core_secret_edit"]
```

**After split permissions (explicit create and edit):**

```hcl
permissions = [
  "core_secret_create",
  "core_secret_edit"
]
```

Without this update, your automation scripts can only edit existing secrets and cannot create new ones.

:::warning
Once both feature flags are enabled, review your automations if they rely on `core_secret_edit` for both creating and editing secrets. With the update, `core_secret_edit` allows only editing, and creating secrets requires `core_secret_create`.

To avoid disruption, ensure your automations are updated to include `core_secret_create` alongside `core_secret_edit` where necessary.
:::

---

## Related articles

- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> - Review the permissions hierarchy and role assignment model in Harness.
- <a href="/docs/platform/role-based-access-control/permissions-reference" target="_blank">Permissions reference</a> - View the complete list of permissions available for each resource type.
- <a href="/docs/platform/role-based-access-control/attribute-based-access-control" target="_blank">Attribute-Based Access Control (ABAC)</a> - Learn how to extend RBAC with fine-grained attribute-based rules.
- <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">Add and manage roles</a> - Create and configure custom roles with specific permissions.