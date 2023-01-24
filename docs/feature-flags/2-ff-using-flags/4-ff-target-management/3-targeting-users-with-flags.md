---
title: Target Users with Flags
description: This topic describes how to use targeting rules to control variations that you want to serve to your users.
tags: 
   - helpDocs
   - feature flag
   - Target Users
# sidebar_position: 2
helpdocs_topic_id: xf3hmxbaji
helpdocs_category_id: xw2hz815l8
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import target_users_1 from './static/3-targeting-users-with-flags-03.png'
import target_users_2 from './static/3-targeting-users-with-flags-04.png' 
```

Feature Flag Targeting allows you to serve a particular Variation of a Flag to specific Target when the Flag is enabled. Targets are anything that can be uniquely identified, we refer to these Targets as users, but they could also be apps, machines, resources, emails etc. 

For example:

1. You have a new feature you want your QA team to test before a general roll-out.
2. You create a Boolean Feature Flag for the new feature.
3. You add Targeting to the Flag so that the QA team are served the True Variation when the Flag is enabled, and the Non-QA team are served the False Variation.
4. You enable the Feature Flag.
5. The feature is available to the QA team but is not available to the Non-QA team.

:::note
 A Flag can have values in each Environment. For example, if you have a QA Environment and a Production Environment within a single Project on the Harness Platform, the Flag could be toggled ON in QA but toggled OFF in Production. 
:::

This topic describes how to set up Targeting for a Feature Flag you’ve created. 

:::note
 To edit the default Variations that are served to Targets, go to [Changing the Variations of Your Flags](../2-update-feature-flags/3-manage-variations.md).
:::

## Target specific users or Target Groups when a Flag is enabled

To target specific users, you first need to add them as a Target or Target Group on the Harness platform. To do this, go to [Adding Targets](1-add-targets.md) and [Managing Target Groups](2-add-target-groups.md). 

After you have added the Target or Target Group, you can then choose the Variation to serve them when the Feature Flag is Enabled:

* **True**: The Targets are served the default True variation.
* **False**: The Targets are served the default False variation.
* **Percentage rollout**: You select a percentage of Targets to be served each Variation. For example, to increment how many users a feature is available for over time, you could use a percentage roll out to give 10% of users access to a feature, then 50%, then 100%. The users are selected randomly from the Target Group you target, and when you increase the percentage, all original users maintain their access to the feature. We can only ensure that identifiable Targets maintain their access, we can't maintain access for anonymous users.

To add specific Targets: 

1. Go to the Feature Flag you want to add Targets for and in the **Targeting** tab, under **Specific Targeting**, click **+ Add Targeting**.
2. Select which Variation you want to serve to the Target.

If you select one of the default Variations, for example, True or False:

* Select the Target(s) or Target Group(s), then Click **Save**.

```mdx-code-block
<img src={target_users_1} alt="The Targeting Tab of a Flag with the dropdown menus for adding a Target highlighted." height="500" width="500" />
```

*Figure 1: Adding Targets and Target Groups to serve a Variation to*

If you want to use a Percentage Rollout:

1. Select the Target Group.

You can only use Percentage Rollouts on a single Target Group for each Flag. 

2. Enter the percentage of each Variation you want to serve, then click **Save**.

```mdx-code-block
<img src={target_users_2} alt="The Targeting Tab of a Flag with percentage roll out applied." height="500" width="500" />
```

*Figure 2: Using a percentage rollout for the Target Group*

