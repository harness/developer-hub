---
title: Delete Registries
description: Delete an artifact registry from the project UI, including soft and permanent delete.
sidebar_position: 40
---

This procedure removes an artifact registry from the project. By default, Harness **soft-deletes** the registry: it moves off the **Available** tab on **Artifact Registries** and appears under **Deleted**, where you can restore it or delete it permanently until your retention policy applies. **Soft-deleting a registry applies to everything inside it in one step:** every package, image, and version stored in that registry is soft-deleted together with the registry row (you do not keep artifacts in **Available** while only the registry row is deleted).

:::warning

Permanently deleting a registry removes all packages, images, versions, and other artifacts it contains in one step. That action cannot be undone through the **Deleted** tab. Confirm the scope before you proceed.

:::

## Delete from the registries list

1. Go to **Artifact Registries** (or **Registries** in the sidebar).
2. Find the registry, open the row menu (⋮) on the right, and select **Delete**.
3. In the confirmation dialog, type the registry name when prompted. For a soft delete, keep **Permanently delete** cleared. Select **Permanently delete** when you want immediate removal through the permanent path described in the warning above.

<DocImage
  path={require('./static/delete-registry.png')}
  alt="Row menu on a registry showing the Delete option"
  title="Delete a registry from the registries list"
  width="100%"
/>

## Delete from registry details

1. Open the registry you want to remove.
2. Select the menu (⋮) next to **Setup Client**, then **Delete**.
3. Complete the confirmation dialog as described above.

<DocImage
  path={require('./static/delete-registry-inside.png')}
  alt="Registry detail page menu showing the Delete option next to Setup Client"
  title="Delete a registry from the registry details page"
  width="100%"
/>

## Soft-deleted registries

After a soft delete, open **Registries** and select the **Deleted** tab. This view lists the **registry** itself—one row per soft-deleted registry. Use the row menu (⋮) to **Restore** or **Delete** (permanent removal).

<DocImage
  path={require('./static/artifact-registries-deleted-tab-restore-menu.png')}
  alt="Artifact Registries Deleted tab with row menu showing Restore and Delete"
  title="Deleted tab: open the row menu to restore or permanently delete"
  width="100%"
/>

Soft-deleted **packages**, **versions**, and other artifact content appear on the **Artifacts** page under **Deleted** (and in scoped views inside a registry or package). **Artifact Registries** → **Deleted** lists the registry row only. For that flow, go to [Manage deleted artifacts](/docs/artifact-registry/manage-artifacts/soft-delete).
