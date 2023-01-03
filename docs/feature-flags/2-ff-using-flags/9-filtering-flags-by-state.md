---
title: Filter Flags by State
description: To help manage your Feature Flags, you can use the filter tiles on the Harness Platform to filter your Flags based on the following states --  Figure 1 --  The Flag overview dashboard State Description All…
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 2s5qt02s74
helpdocs_category_id: t5s8pv9gjb
helpdocs_is_private: false
helpdocs_is_published: true
---

To help manage your Feature Flags, you can use the filter tiles on the Harness Platform to filter your Flags based on the following states: 

![A screenshot of the Feature Flag states dashboard. ](./static/9-filtering-flags-by-state-00.png)*Figure 1: The Flag overview dashboard*



|  |  |
| --- | --- |
| **State** | **Description** |
| All Flags | All of the Flags that you’ve created. |
| Enabled Flags | Flags that are currently toggled on.  |
| Permanent Flags | Flags you intend to stay in your systems indefinitely and that you marked as permanent when creating them. Permanent flags are never marked as stale. |
| Recently Changed Flags | Flags that have been changed in the last 24 hours. Changes include enabling or disabling a Flag, or adding new Rules or Targets. |
| Active Flags | Flags that have been evaluated in the last 7 days |
| Potentially Stale Flags | Flags are marked as potentially stale if in the past 60 days they haven't been changed or evaluated,their default rules or target rules haven’t been added to or updated, they haven’t been toggled on or off.|

:::caution
 A Flag can be marked as both Active and Potentially Stale if it has been Evaluated via an SDK but no other changes have been made in over 60 days.  For example, if you Evaluated `Flag_A` yesterday using an SDK, but haven’t made any changes on the Harness Platform in over three months, the Flag will be marked as Active and Potentially Stale on the Platform. 
:::

## Filter your Flags

To view filter your Flags:

1. Go to your project on the Harness Platform.
2. Click on **Feature Flags**.
3. Click on the filter you want to use.
4. A list of the relevant Flags are displayed.

![A screenshot of the Permanent Flags tile selected to filter for permanent flags.](./static/9-filtering-flags-by-state-01.png)*Figure 2: A filtered list of Flags*

 

