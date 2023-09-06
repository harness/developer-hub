---
title: Manage Collection Admins
description: Collection admins oversee specific Collections.
sidebar_position: 60
---

Collection admins have visibility into data for specific [Collections](./collections-overview.md), including [Trellis Scores](../sei-metrics-and-reports/trellis-score.md) and Insights.

You must be an SEI Admin to add or modify Collection Admins.

## Add a Collection Admin

<!-- I don't know what the actual flow is. I don't know if you can configure it at multiple scopes like regular Harness RBAC. -->

1. In your Harness project, go to the SEI module, and select the relevant **Project** on the **Project** tab.
2. Select **Access Control** under **Project Setup**.
3. Select **Users** in the header, and then select **Add User**.
4. For **Role**, select **Collection Admin**.
5. Enter the user's **Email**, **First Name**, and **Last Name**.
6. Select the allowed authentication options for this user.
7. Select **Trellis Access** to grant global Trellis Score access. Alternately, you can [limit Trellis Score visibility](#limit-trellis-score-visibility).
8. Under **This account is an admin for the following Collections**, select at least one Collection.

   All Collection Admins must be associated with at least one Collection.

   You can edit the Collections at any time, but you can't change projects. <!-- unless you created the Collection Admin at the account scope? -->

## Trellis Access setting

In a user's profile, if **Trellis Access** is selected, the user has global visibility for Trellis Scores when they are included on Insights. If **Trellis Access** is *not* selected, the user has visibility into Trellis Scores for specified Collections only.

| Role | Global Trellis Access | Collections specified | Resulting Trellis Score visibility |
| ---  | --------------------- | --------------------- | ---------------------------------- |
| Admin | Disabled | No | None. |
| Admin | Disabled | Yes | Selected Collections only. |
| Admin | Enabled | No | All. |
| Collection Admin | Disabled | No | None. |
| Collection Admin | Disabled | Yes | Selected Collections only. |
| Collection Admin | Enabled | No | All. |
| Collection Admin | Enabled | Yes | All. |
| Viewer | Disabled | N/A | None. |
| Viewer | Enabled | N/A | All. |

## Limit Trellis Score visibility

Use these steps to limit the Trellis Scores that users can access.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="ca" label="Limit Collection Admins" default>
```

Use these steps to limit Trellis Score access for Collection Admins.

1. In your Harness project, go to the SEI module, and select the relevant **Project** on the **Project** tab.
2. Select **Access Control** under **Project Setup**.
3. Select **Users** in the header, and then select the user you want to edit.
4. Make sure **Trellis Access** is *not* selected.
5. Under **This account is an admin for the following Collections**, select the Collections for which you want the Collection Admin to be able to view Trellis Scores.

```mdx-code-block
  </TabItem>
  <TabItem value="admin" label="Limit Admins">
```

Use these steps to limit Trellis Score access for SEI Admins and Viewers.

1. In your Harness project, go to the SEI module, and select the relevant **Project** on the **Project** tab.
2. Select **Access Control** under **Project Setup**.
3. Select **Users** in the header, and then select the user you want to edit.
4. Make sure **Trellis Access** is *not* selected.
5. Under **Associate Collections for Trellis access**, select the Collections for which you want the Admin to be able to view Trellis Scores.

```mdx-code-block
  </TabItem>
  <TabItem value="viewer" label="Limit Viewers">
```

Users with the Viewer role can either view all Trellis Scores (if included on an Insight) or no Trellis Scores.

1. In your Harness project, go to the SEI module, and select the relevant **Project** on the **Project** tab.
2. Select **Access Control** under **Project Setup**.
3. Select **Users** in the header, and then select the user you want to edit.
4. To remove access to all Trellis Scores, make sure **Trellis Access** is *not* selected.

:::info

A user with the Viewer role has visibility to all Insights for all Collections, unless you map the user to specific Collections.

:::

```mdx-code-block
  </TabItem>
</Tabs>
```
