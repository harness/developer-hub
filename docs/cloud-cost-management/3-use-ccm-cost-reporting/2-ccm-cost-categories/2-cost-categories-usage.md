---
title: Use cost categories 
description: This topic explains the uses of cost categories in perspectives and dashboards.
# sidebar_position: 2
helpdocs_topic_id: 6lle2diqeg
helpdocs_category_id: 3uqsijw1gg
helpdocs_is_private: false
helpdocs_is_published: true
---


You can use cost categories in both perspectives and dashboards. When you create or modify a cost category, the changes are immediately reflected in perspectives, including historical data. However, in Dashboards, it may take up to 24 hours for the changes to be reflected on the current month or the last three days' data, depending on the cloud service provider.

## Use cost categories in perspectives

The cost categories can be used in perspectives in the following ways.

### Group By

### Group By Behavior

#### Cross-Cloud Provider Grouping

When you group by a dimension that is specific to a particular cloud provider (e.g., AWS Accounts, GCP Projects), the following behavior applies:

* **Matching Provider Resources**: Costs from resources that match both the cost category and the cloud provider will display under their respective accounts/projects.

* **Non-Matching Provider Resources**: Costs from resources in your cost category but from different cloud providers will appear under a "**No [Dimension]**" category (e.g., "No Account" when grouping by AWS accounts).

* **Shared Costs**: Shared cost buckets follow the same pattern - they appear under their respective accounts/projects if they match the grouping dimension's cloud provider, otherwise they appear under "No [Dimension]".

#### Cost Category Interactions

When working with multiple cost categories in Perspectives, the system follows these rules:

##### Using a Cost Category in Perspective Rules

When you add a cost category to your Perspective rule:

* The Perspective will only show costs that match the selected cost buckets within that category
* Shared cost buckets associated with the selected cost buckets will be included and allocated according to your sharing strategy
* Costs outside your selected buckets will not appear unless you include "Unattributed" in your selection

##### Grouping by a Cost Category

When you group by a cost category:

* Each cost bucket appears as a separate line item
* Costs are distributed to their respective buckets based on the rules defined in the cost category
* Shared costs are allocated proportionally to each cost bucket according to your sharing strategy
* Resources that don't match any bucket rules appear under "Unattributed"

##### Cross-Category Interactions

When using one cost category in a rule and grouping by another cost category:

* Only costs that match your rule's cost category will be included
* These costs are then grouped according to the buckets in your group-by cost category
* Resources that match your rule but don't belong to any bucket in your group-by category appear under "No [Category Name]"
* Shared costs from both categories are allocated according to their respective sharing strategies

> **Important:** When using multiple cost categories with overlapping resources, be careful with shared buckets. If both categories have shared buckets with overlapping rules, costs might be counted differently than expected.

### Filter

Select one or more cost categories as a filter.

![](./static/use-ccm-cost-categories-07.png)

You can use Group By and filters together. For example, your filter could select **Manufacturing** from the Department Cost Category, and then you can select **GCP: SKUs** in **Group By**.


![](./static/use-ccm-cost-categories-08.png)

:::warning
When including multiple cost categories in your filter, it is important to check for any shared cost buckets between them. If you have shared cost buckets with overlapping rules in both cost categories, the cost of these buckets is counted twice, resulting in duplication of costs. Therefore, it is recommended not to have multiple cost category filter in a Perspective. However, if you must add a multiple cost category filter, avoid overlapping shared cost buckets between cost categories to prevent any potential errors.
:::

### Perspective rule

When creating a Perspective, you can define a rule using cost categories.

![](./static/use-ccm-cost-categories-09.png)

The benefit of using a cost category as a rule in a Perspective is that the cost category definition is separated from all the Perspectives that use it.

If you modify the definition of a cost category, any Perspective that uses the cost category automatically displays the changes.

For example, if a new product is added to the Manufacturing department, you can simply update the Manufacturing bucket in the Departments Cost Category, and that change is automatically reflected in all the Perspectives that use that Cost Category.

Consider the following scenario where the Perspective rule has two cost categories:

 **Cost category** | **Cost bucket** | **Shared buckets** |
| --- | --- | --- |
| CC1  | <ul><li>B1 - AWS1</li><li>B2- GCP1</li></ul> | <ul><li>SB1 - AWS2</li><li>SB2 - GCP2</li> </ul>|
| CC2  | <ul><li>C1 - AWS1</li><li>C2- GCP1</li></ul> | <ul><li>SB1 - AWS2</li><li>SB2 - GCP2</li> </ul>| 

 In this scenario, if you choose to include both cost categories in your Perspective rule, the total cost of the cost buckets in both categories is counted only once. However, the cost of the shared buckets between the two categories is duplicated because of overlapping rules. Therefore, it is recommended to avoid using multiple cost categories with overlapping shared cost buckets in your perspective rule to prevent any potential errors.

## Use cost categories in dashboards

You can visualize cost categories in your custom dashboard. To learn how to create a custom dashboard, go to [Create Dashboards](../../../platform/dashboards/create-dashboards.md).

**Cost Categories** is available in the **Unified** explore on the **Dashboards** page. 

  <DocImage path={require('./static/cost-categories-dashboards.png')} width="40%" height="40%" title="Click to view full size image" />


* When you create a new cost category or make changes to an existing one, it may take up to 24 hours for the changes to be reflected in the dashboard data.
* If you are using AWS or Azure, cost categories update the data fetched from the current month onwards through CUR and Billing Exports. It is not applied to historical data. On the other hand, if you are using GCP, cost categories update the data that is equal to or more recent than the last three days' data.
* When you delete a cost category, the deleted category remains visible in the dashboard until the end of the month, as it is applied to data for the ongoing month. For instance, if you delete a cost category on January 24th, the category is visible in the dashboard until the end of January 31st.
* Shared cost buckets are ignored when you add cost category context.

:::note
In AWS, you cannot use cost categories as a dimension in custom dashboards if you have selected any of the following fields in the explore:

- Resource ID 
- Line Item Type 
- Market Type 
- Amortised Cost 
- Net Amortised Cost 

:::

## Behaviour

Below is the table where we have outlined the contrasting behavior of cost categories in Perspective and Dashboard.

<table width="900" cellspacing="0" cellpadding="0">
    <tr>
        <td width="300"><b></b></td>
        <td width="600"><b>Perspective</b></td>
        <td width="600"><b>Looker/Dashboard</b></td>
    </tr>
    <tr>
        <td>Using and Grouping Cost Category</td>
        <td>We can utilize cost categories as rules to create perspectives. Additionally, we can perform groupBy operations on any cost category to view the costs associated with each cost bucket.</td>
        <td>Users have the ability to select the columns on which they want to perform groupBy operations. This allows them to view the costs associated with each cost bucket for a specific cost category.</td>
    </tr>
    <tr>
        <td>Filtering Cost Category</td>
        <td>Users have the capability to apply filters on cost categories and specific cost buckets they want to see. These filters can be applied either in the rules section or in the filter panel.</td>
        <td>Users have the flexibility to apply filters on any columns supported in the BigQuery table. This allows them to filter cost categories or cost buckets based on their specific criteria.</td>
    </tr>
    <tr>
        <td>Shared Cost</td>
        <td>If a shared bucket is specified in the cost category used in rules or groupBy, the cost of the shared bucket will be divided and allocated among the respective cost buckets based on the sharing strategy.</td>
        <td><font color="red">Not Supported.</font></td>
    </tr>
    <tr>
        <td>Nested Cost Category</td>
        <td><font color="green">Supported.</font></td>
        <td><font color="green">Supported.</font></td>
    </tr>
    <tr>
        <td>Cluster Data</td>
        <td><font color="green">Supported.</font> Users have the capability to create cost categories with cluster rules. These cost categories can be used in cluster perspectives.</td>
        <td><font color="red">Not Supported.</font> Currently, we are updating the cost category exclusively for the cloud provider data only.</td>
    </tr>
    <tr>
        <td>
            Behaviour 
        </td>
        <td>
            If there is an update in the cost category rule, we will utilize the updated rules to display the cost accordingly, even for past data.
        </td>
        <td>
        cWe keep track of cost category changes on a monthly basis and update data accordingly for that month.
        <br></br><b>Caveat:</b> For GCP data, we update the data for last 3 days only.
        </td>
    </tr>
</table>

### Cost Category Priority and Overlapping

When configuring Cost Categories using multiple Cost Buckets, it’s important to understand how priority and overlapping rules impact cost allocation.

#### How Priority Works

Cost Buckets are prioritized based on their order in the UI from top to bottom.
The first bucket in the list has the highest priority, followed by the second, and so on.

You can drag and reorder the cost buckets within a cost category to define your preferred priority.

#### What Happens with Overlapping Rules?

If multiple cost buckets have overlapping rules (e.g., same account ID or service), the first matching bucket (by priority) will capture all of the matching cost.
Subsequent buckets will not receive any cost for those overlapping rules, even if the rule is also present there.

**Example**

Let’s say:

Bucket 1 contains: Account A1
Bucket 2 contains: Account A1 + Services S1–S5

If Bucket 1 appears before Bucket 2 in the priority list:

All cost for Account A1 will go to Bucket 1
Bucket 2 will appear empty, even though it has valid rules because those rules were already matched in Bucket 1.

If you switch the order, so Bucket 2 is above Bucket 1:

The cost for Services S1–S5 will go to Bucket 2
The remaining cost for Account A1 will go to Bucket 1

**Important Notes:**

- This ordering behavior helps you intentionally segment cost across buckets.
- Ensure your rules are specific and mutually exclusive when needed, to avoid unintentional gaps or overrides.
- If Bucket 2 rules don’t match the criteria, or due to overlapping rules the data doesn’t appear, then the same cost bucket will not be visible in the dashboard either.

