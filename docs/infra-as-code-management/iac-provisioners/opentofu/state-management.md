---
title: State Management
description: Understand how Harness IaCM manages OpenTofu state and how to work with existing state.
sidebar_position: 20
sidebar_label: State Management
keywords:
  - opentofu
  - state management
  - remote state
  - terraform cloud
  - state locking
  - iacm
tags:
  - iacm
  - opentofu
---

Harness Infrastructure as Code Management (IaCM) automatically manages remote state for your OpenTofu workspaces. When you create a workspace, Harness configures itself as the backend without requiring any backend block in your `.tf` files. State is encrypted at rest, versioned, and access is controlled through Harness RBAC permissions.

## What you will learn

- How Harness handles state when you create new infrastructure
- How to migrate existing state from other backends or Terraform Cloud
- How to use external backends like S3, GCS, or Azure instead of Harness-managed state
- How state locking prevents concurrent modifications
- How to access Harness-managed state from your local CLI

---

## Start fresh with Harness-managed state

When you create a new OpenTofu workspace and run your first provision pipeline, Harness automatically creates and manages the state file. You do not need to configure anything.

### What Harness handles

- **Automatic backend configuration:** No backend block needed in your `.tf` files. Harness injects the backend configuration at runtime during the init step.
- **State encryption:** State files are encrypted at rest.
- **Access control:** State access is controlled through Harness RBAC permissions. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to understand how permissions work.
- **State versioning:** Every state change is versioned. You can view historical state versions in the workspace State tab and download previous versions if needed.
- **Workspace isolation:** Each workspace has its own state file. If you have multiple environments (dev, staging, prod), create separate workspaces so each environment has isolated state.

### View state in the UI

To view your workspace state in Harness, do the following:

1. Navigate to your workspace in the **Infrastructure** module.
2. Select the **State** tab.

The State tab shows the current state file contents in JSON format. You can download the state file or view specific resource details.

You can also view resources in the **Resources** tab, which displays a structured view of the infrastructure managed by this workspace.

---

## Migrate existing state into Harness

If you have existing OpenTofu or Terraform state files in another backend, you can migrate them into Harness-managed storage. Harness supports three migration methods: local CLI, pipeline-based migration, and API-based migration.

Go to [State Migration](/docs/infra-as-code-management/remote-backends/state-migration) to learn how to migrate state using each method.

### Terraform Cloud migration

Terraform Cloud does not support direct `tofu init -migrate-state` conversion to third-party backends like Harness IaCM. To migrate from Terraform Cloud, you need to pull your state locally first, then migrate to Harness.

**To migrate from Terraform Cloud:**

1. Initialize your OpenTofu project with your Terraform Cloud backend.
2. Pull your state locally with `tofu state pull`:
   ```bash
   tofu state pull > terraform.tfstate
   ```
3. Remove the Terraform Cloud backend block from your `.tf` files.
4. Delete the `.terraform` directory and reinitialize with a local backend:
   ```bash
   rm -rf .terraform
   tofu init
   ```
5. Follow the CLI migration steps in the State Migration guide to move the local state into Harness.

At this point you are using a local backend with the content of your Terraform Cloud state, and you can proceed with the standard migration process.

Go to [OpenTofu State Command Reference](https://opentofu.org/docs/cli/commands/state/) to learn about state inspection and manipulation commands.

---

## Use external backends

If you need to use an external backend like AWS S3, Google Cloud Storage, or Azure Blob Storage instead of Harness-managed state, you can configure a backend block in your OpenTofu files and Harness will use it directly.

This is useful if:
- You are onboarding to IaCM and already have state in an external backend.
- You need state compatibility with other CI pipelines or tools.
- You want to keep state in your own infrastructure for compliance reasons.

Go to [Use Existing Remote State](/docs/infra-as-code-management/remote-backends/use-backends) to learn how to configure external backends for S3, GCS, and Azure Blob Storage. The guide includes example backend configurations, authentication setup, and troubleshooting steps.

Go to [Initialization](/docs/infra-as-code-management/remote-backends/init-configuration) to learn how to use environment variables for dynamic backend configuration if you need to parameterize your backend settings.

---

## State locking

State locking prevents concurrent modifications to your infrastructure. When a pipeline run executes a plan or apply operation, Harness locks the state for that workspace. Other pipeline runs that attempt to modify the same workspace during this time will wait until the lock is released.

Go to [OpenTofu State Locking](https://opentofu.org/docs/language/state/locking/) to understand how OpenTofu handles state locking.

### How locks work

Locks are automatically acquired when:
- A plan operation starts.
- An apply operation starts.
- A destroy operation starts.

Locks are automatically released when:
- The operation completes successfully.
- The operation fails.
- The pipeline is manually aborted.

### View active locks

You can view current locks in the workspace **Activity** tab. Active pipeline runs show a lock indicator next to the operation.

### Manual unlock

If a pipeline fails unexpectedly and leaves a lock in place, an administrator can manually unlock the state from the workspace settings.

To manually unlock state, do the following:

1. Navigate to your workspace in the **Infrastructure** module.
2. Click the **Settings** icon (gear icon) in the top right.
3. Scroll to the **State Locking** section.
4. Click **Force Unlock**.
5. Confirm the unlock operation.

:::warning
Only unlock state if you are certain no other operations are running. Unlocking state while an operation is active can cause state corruption.
:::

---

## Access state from local CLI

If you need to run OpenTofu commands locally against your Harness-managed state, you can use the HTTP backend configuration provided in the workspace.

Go to [OpenTofu HTTP Backend](https://opentofu.org/docs/language/settings/backends/http/) to understand how the HTTP backend works.

### Get the HTTP backend block

To get the HTTP backend block for local CLI access, do the following:

1. Navigate to your workspace in the **Infrastructure** module.
2. Select the **CLI Integration** tab.
3. Copy the provided backend block into a local `.tf` file (for example, `backend-local.tf`).
4. Add the file to your `.gitignore` to prevent committing it to version control.

### Authenticate to the backend

Set the `TF_HTTP_PASSWORD` environment variable to a Harness API key with `State:Access` permissions on the workspace:

```bash
export TF_HTTP_PASSWORD=<your-harness-api-key>
```

Go to [API keys](/docs/platform/automation/api/add-and-manage-api-keys) to learn how to create API keys.

### Run local commands

With the backend configured and authentication set, you can run OpenTofu commands locally:

```bash
tofu init
tofu plan
tofu apply
```

These commands will use the Harness-managed state instead of creating a local state file.

:::tip
Keep the HTTP backend block in a local file that is in your `.gitignore` file so you can use the Harness-managed state locally without committing backend configuration to your repository.
:::

---

## Next steps

Now that you understand how Harness manages OpenTofu state, learn how to configure default pipelines that execute OpenTofu commands automatically.

Go to [Default pipelines for OpenTofu](/docs/infra-as-code-management/iac-provisioners/opentofu/default-pipelines) to configure reusable pipelines for common OpenTofu operations.
