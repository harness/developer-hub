---
title: Owners (Legacy)
description: Learn about how owners work in Harness FME.
sidebar_position: 4
---

## Overview

In addition to [tags](/docs/feature-management-experimentation/management-and-administration/tags/), use owners to organize and manage feature flags, segments, and metrics across the Split user interface. 

You can use owners to:

- Filter feature flags, segments, and metrics in the browse panes to those **owned by me**.
- Restrict editing of a specific feature flag to its owners by toggling permissions **On**.

:::tip
Ownership alone is for organization and filtering purposes. It does not grant edit rights. When Permissions is toggled **On** for a flag, only its owners (and anyone with broader environment-level rights) can edit it.
:::

When you add owners to a feature flag and toggle Permissions **On**, owners are automatically included as editors for that specific flag in all environments. This helps you simplify permissions while preventing others without environment- or project-level edit rights from making changes to that flag.

| Scenario                                 | Owner has edit rights?            |
|------------------------------------------|------------------------------------|
| Owner only, **Permissions Off**          | ❌ No (organizational only)         |
| Owner only, **Permissions On**           | ✅ Yes for that flag in all environments |
| Owner + environment-level editor rights  | ✅ Yes through environment permissions   |

Harness recommends using groups where possible as owners. When you onboard new teammates, their Split instance includes several feature flags owned by their team.

## Adding or removing owners

:::info
Only current owners can change owners for a feature flag, segment, or metric.
:::

To change the owner for a feature flag, segment, or metric:

1. Click the Gear icon next to the feature flag name and select **Edit details**. The **Details** panel appears.
   
   ![](./static/flag-details.png)

1. In the **Owners** field, either begin entering to select an existing group or user or use the down arrow to display a list of owners.
1. Select the desired owners and click **Save**.

## Filter by

Owners are useful when you locate those items in the **Owned by me** list. To find items in this list, in the feature flag view list, click **Owned by me**. 

![](./static/owned-by-me.png)

The feature flags, segments, and metrics that you own directly or indirectly as part of a group display.
