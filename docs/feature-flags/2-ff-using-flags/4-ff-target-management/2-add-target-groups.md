---
title: Add or Exclude a Target in a Target Group
description: This topic describes how to add a Target Group to your Environment, add Targets to the group, and apply the Target Group to a Feature Flag. 
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: 5qz1qrugyk
helpdocs_category_id: xw2hz815l8
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import target_group_1 from './static/2-add-target-groups-06.png' 
import target_group_2 from './static/2-add-target-groups-07.png' 
import target_group_3 from './static/2-add-target-groups-08.png' 
import target_group_4 from './static/2-add-target-groups-09.png' 
import target_group_5 from './static/2-add-target-groups-10.png' 
```

> **☆ NOTE —** While we refer to targeting users, when you create a Target you give it a name and a unique identifier, so a Target can be anything that can be uniquely identified. For example, a Target can be a user, an application, a system, a machine, or any resource uniquely identified by an IP address, email ID, user ID, etc.

Target Groups are a collection of [Targets](1-add-targets.md) that allow you to serve Feature Flag Variations to a list of users in bulk. You can group Targets into a group either by picking individual Targets or by defining rules that automatically map Targets to a Target Group. For example, you can add individual Targets `joe@harness.io` and `jane@harness.io` to the QA internal users group or you can define a rule that all the emails ending with `@harness.io` are added to the QA internal users group.

You can also do the opposite and exclude specific Targets from a Target Group.  

This topic describes how to add a Target Group to your Environment, add Targets to the group, and apply the Target Group to a Feature Flag. 

## Before you begin

Make sure you've [created Targets to add to the Target Group](1-add-targets.md).

## Create a Target Group and add Targets

To create a Target Group:

1. In **Feature Flags**, click **Target Management**, then click **Target Groups**.
2. Click **+ New Target Group**.
3. In **Create a Target Group**, enter a Name for your group and click **Create**.
4. (Optional) In **Description**, add a description of the group.

After you have created a Target Group, you need to add Targets to it. You can add Targets to a Target Group by selecting them individually or by setting conditions to add all Targets that meet those criteria. 

### Add Targets from the Target Group page

You can add individual Targets from the Targets page or the Target Groups page. 

1. In **Target Management**, in **Target Groups**, select the Target Group you want to add Targets to.

![A screenshot of the Target Management page with a Target Group highlighted](./static/2-add-target-groups-05.png)*Figure 1: The Target Management page with the Target Groups tab selected*

2. In **Criteria**, click **Edit**.

```mdx-code-block
<img src={target_group_1} alt="The edit button next to Criteria." height="500" width="400" />
```
*Figure 2: Editing a Target Group*

You can include or exclude specific Targets, or you can set rules to add Targets based on conditions you set. 

#### Add or exclude specific Targets

* To add specific Targets, in **Include the following**, select the Targets.
* To exclude Targets, in **Exclude the following**, select the Targets.

```mdx-code-block
<img src={target_group_2} alt="A screenshot of Targets added to the Target Group Criteria." height="500" width="400" />
```
*Figure 3: Adding Targets to a Target Group*

#### Add Targets based on conditions

> **☆ NOTE —** When you create a Target based on Conditions, on the Target overview page the Group isn't displayed under the **Target Groups** column.

In addition to targeting individual users, Harness Feature Flags also allows you to target a group based on the conditions you set. You can add conditions by constructing rules using the following:

* The name or identifier of the Target.
* An operator.
* Text that must match the Target name or identifier.

The following operators are supported:

|  |  |  |
| --- | --- | --- |
| **Operator** | **Attribute Type** | **Definition** |
| **starts with** | String | Matches the prefix of a string. If you enter multiple string values, only the first is matched. |
| **ends with** | String | Matches the suffix of a string. If you enter multiple string values, only the first is matched. |
| **contains** | String | Matches a part of a string. If you enter multiple string values, only the first is matched. |
| **equals** | Number or string | Matches the string or number. If you enter multiple string values, only the first is matched. |
| **equals (sensitive)** | Number or string | Matches the number or string and is case-sensitive. If you enter multiple string values, only the first is matched.For example,  the string HELLO is different from the string hello.  |
| **in** | Number or string | Acts as an “or” operator, so you can add multiple values at once. |

 

For example, you could set a rule to add all Targets whose identifiers end in `@harness.io`. 

To add Targets based on conditions:

1. In **Target Group Criteria**, click **+ Add Rule**.
2. In the first drop-down menu, select whether the condition applies to the Target Name or Identifier.
3. In the second drop-down menu, select the operator to apply to the Target Name or Identifier.
4. In the search bar, enter the value you want the Target Name or Identifier to match and click the **+** button to add it. The following shows an example of a rule that adds all Targets with a Target Identifier ending in harness.io to the Target Group.

```mdx-code-block
<img src={target_group_3} alt="An example of the Target Group Criteria page with a condition added." height="500" width="400" />
```

*Figure 5: Adding Targets based on a condition*

5. Click **Save**. Targets that meet the criteria are now included in the Target Group.

```mdx-code-block
<img src={target_group_4} alt="The Target Group page with the new condition displayed." height="500" width="400" />
```
*Figure 6: Viewing the condition for adding a Target*

When you add Targets based on conditions, on the **Target Management:Targets** page, the Target Group is **not** displayed in the **Target Groups** column.

### Add or exclude Targets from Target settings

You can use Target Settings to include or exclude Targets from a Target Group. Complete the following steps to include or exclude Targets using the Target Settings:

1. In **Target Management**, in **Targets**, click the Target you want to add to a group.
2. Click **Target Groups**, then **Add to Target Groups** to add a specific Target, or click **Exclude from Target Groups** to exclude a specific Target. You can add or exclude the Target to multiple groups at once.

```mdx-code-block
<img src={target_group_5} alt="A screenshot of a Target with the Target Groups tab opened." height="500" width="400" />
```
*Figure 7: Adding and excluding Targets from the Target's settings*

3. Select the Group(s) to add the Target to or to exclude a Target from, then click **Add to (1) Target Group**, or **Exclude from (1) Target Group**.
4. The Targets are now added to the Target Group.

## Next step

After you have added the Targets and Target Groups, you can then [use them on your Feature Flags.](3-targeting-users-with-flags.md)

