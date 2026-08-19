---
title: Roll back workspace state
sidebar_label: State Rollback
description: Roll a workspace's Terraform or OpenTofu state file back to a previous version from the State tab.
keywords:
  - state rollback
  - state version
  - workspace state
  - state recovery
tags:
  - iacm
  - workspaces
  - state
sidebar_position: 50
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

State rollback restores a workspace's OpenTofu/Terraform state file to a previous version directly from the workspace **State** tab. Harness copies the selected historical state to a new version, so you recover from a failed apply or a corrupted state without manual CLI surgery. Rollback restores the state record Harness has on file. It does not change your cloud infrastructure.

---

## Before you begin

- **Workspace state history:** A workspace with at least one prior state version. Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to run a pipeline that stores state.
- **Rollback permission:** The `WorkspaceRollbackState` permission on the workspace. Go to [Workspace RBAC](/docs/infra-as-code-management/workspaces/workspace-rbac) to configure roles.
- **Unlocked workspace:** No Terraform operation is holding a lock on the workspace. Go to [Workspace Statuses](/docs/infra-as-code-management/workspaces/workspace-statuses) to review the current state.

---

## How rollback works

Rollback uses a roll-forward model: Harness never overwrites or deletes an existing state version. Instead, it creates a new version whose contents match the version you select.

- Harness performs a server-side copy of the selected `state_raw` object to a new state version with a fresh version timestamp.
- The workspace's active state pointer is repointed to the new version, and the source version is recorded on the new row so the rollback is traceable.
- Every historical version is retained, so you can roll back again at any time.

Because rollback creates a new version rather than editing history, you keep a full audit trail and never lose a prior state.

:::info Rollback does not modify infrastructure
Rollback changes only the state file Harness has on record. Your real cloud resources are not touched. Run a plan after rollback to reconcile any differences between the rolled-back state and your actual infrastructure.
:::

---

## Roll back state from the State tab

1. Open your workspace and go to the **State** tab. The tab lists the state version history.
2. Identify the last known-good state version.
3. Select **Rollback to this version** on that version.
4. Review the confirmation modal, which explains that rollback creates a new state version matching the selected snapshot and does not modify real-world resources.
5. Optionally enter a reason for the rollback. The reason is stored on the audit record.
6. Confirm the rollback.

After rollback completes:

- The workspace status changes to **`rollback_applied`**.
- A `rollback` entry is added to the **Activity History** tab, recording who performed the rollback, the source version, the optional reason, and the timestamp.

:::tip Reconcile after rollback
Run a plan against the workspace after rollback to surface any drift between the rolled-back state and your live infrastructure. Rollback does not trigger a plan automatically.
:::

---

## State rollback with external backends

Rollback is available for every workspace, but its effect depends on where your state is stored.

- **Harness-managed backend:** Rollback repoints the workspace to the restored state version, and that version is used by the next run.
- **External backend (S3, Azure Blob, GCS, Terraform Cloud, and others):** Rollback updates only the copy of the state Harness displays. The next plan or apply reads the state from your real backend and overwrites the display copy. For external-backend workspaces, rollback is effectively a display-only operation.

Harness does not detect the backend type on your behalf. The confirmation banner communicates this behavior so you can decide whether rollback is appropriate for your workspace.

---

## Troubleshooting

<Troubleshoot
  issue="State rollback is blocked because the Harness IaCM workspace is locked by a Terraform operation"
  mode="docs"
  fallback="A workspace holding an active Terraform lock cannot be rolled back. Wait for the in-progress operation to finish or release the lock, then retry the rollback."
/>

<Troubleshoot
  issue="After rolling back state in a Harness IaCM workspace using an external backend, the next plan or apply shows the rollback was reverted"
  mode="general"
  fallback="For workspaces using an external backend, rollback only updates Harness's display copy of the state. The next run reads state from the real backend and overwrites it. Roll back directly in your backend for a persistent change."
/>

<Troubleshoot
  issue="State rollback fails with a bad request or not found error in Harness IaCM"
  mode="docs"
  fallback="Rollback targets a state file version. Confirm the version you selected is a state file and that a state file exists for its execution."
/>

---

## Next steps

Rollback restores your state record; the next run reconciles it with real infrastructure.

- Go to [Provision workspace](/docs/infra-as-code-management/workspaces/provision-workspace) to run a plan and apply after rollback.
- Go to [Workspace Statuses](/docs/infra-as-code-management/workspaces/workspace-statuses) to understand the `rollback_applied` status.
- Go to [Workspace Settings](/docs/infra-as-code-management/workspaces/workspace-tabs) to review the State and Activity History tabs.
