---
title: Delete Artifacts
description: Soft-delete packages and versions; use the Artifacts Deleted tab and scoped views; restore or permanently delete.
sidebar_label: Delete Artifacts
sidebar_position: 19
---

Soft-deleted packages and versions stay recoverable until the retention window allows them to be purged. When you [delete a registry](/docs/artifact-registry/manage-registries/delete-registry), Harness soft-deletes **all** packages, images, and versions inside that registry at the same time as the registry itself—the same cascade applies if you permanently delete the registry. The **Artifact Registries** → **Deleted** list (registry rows only) is described in that topic.

## Delete Artifacts and Versions

When you delete a package or a version, a dialog asks you to type the name to confirm. For a soft delete (default), keep the "Permanently delete" checkbox cleared. The item moves to the Deleted tab for that scope, where you can restore it or remove it permanently later. Select "Permanently delete" when you want it removed permanently immediately.

<DocImage
  path={require('./static/soft-delete-version-dialog.png')}
  alt="Delete confirmation dialog: name field and permanent delete option"
  title="Delete confirmation: enter the name and choose soft or permanent delete"
  width="100%"
/>

## Find deleted items on Artifacts

Open Artifacts and select the Deleted tab. The list shows soft-deleted packages, versions, and related rows for the scope you are viewing (account, organization, or project). Filters such as Registries and Package Types narrow the list. Content from a [soft-deleted registry](/docs/artifact-registry/manage-registries/delete-registry) still appears here under Deleted.

<DocImage
  path={require('./static/soft-delete-project-artifacts-deleted.png')}
  alt="Artifacts page Deleted tab listing soft-deleted packages, versions, and related rows"
  title="Artifacts → Deleted: list with filters"
  width="100%"
/>

### Inside a package

When you open an artifact, use the Available and Deleted sections to list or restore individual versions. If the package itself was soft-deleted, the UI may show a DELETED state while you still inspect deleted versions.

<DocImage
  path={require('./static/soft-delete-artifact-detail-versions-deleted.png')}
  alt="Package Versions tab with Available and Deleted sections for versions"
  title="Package detail: Versions tab with deleted versions visible"
  width="100%"
/>

## Restore, retention, and behavior

From a Deleted tab or the row menu (⋮), choose Restore or Delete (permanent removal), depending on context.

<DocImage
  path={require('./static/soft-delete-deleted-row-restore-menu.png')}
  alt="Row actions menu on a deleted item showing Restore and Delete"
  title="Deleted item row menu: Restore and permanent Delete"
  width="100%"
/>

Restoring a version or a package can restore the parent registry when that registry was soft-deleted. You do not need to restore the registry from 'Artifact Registries' → 'Deleted' before you restore the package or version. Audit and activity logging follow your environment’s settings for artifact operations.

:::note Retention for soft-deleted items

Account administrators set how long soft-deleted items are kept in Default Settings → Artifact Registry. Harness applies the saved value to all soft-deleted artifacts in that account, organization, or project. Each row is retained for that many days from its own deletion time, so changing the setting applies to existing and new soft-deleted items alike. Older deletions may become eligible for purge sooner when you shorten the period.

:::
