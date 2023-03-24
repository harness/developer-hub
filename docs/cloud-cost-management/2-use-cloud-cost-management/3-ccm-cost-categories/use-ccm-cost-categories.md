---
title: Use Cost Categories
description: CCM Cost Categories provide an understanding of where and how your money is being spent. Cost categories allow you to take data across multiple sources and attribute it to business contexts, such as…
# sidebar_position: 2
helpdocs_topic_id: 6lle2diqeg
helpdocs_category_id: 3uqsijw1gg
helpdocs_is_private: false
helpdocs_is_published: true
---


```mdx-code-block
import dashboards_cc from './static/cost-categories-dashboards.png'
```

**CCM Cost Categories** provide an understanding of where and how your money is being spent. Cost categories allow you to take data across multiple sources and attribute it to business contexts, such as departments, teams, and other spend categories. For example, if your business is organized by teams with multiple accounts, you can create a Cost Category named Teams and map costs to each team from all your accounts. The cost category called Teams shows you what each team is spending across AWS, GCP, Clusters, etc. You could drill down further into the cost data available for every item in your cost category. For example, in a cost category called Teams, you could view cost data for a particular team (cost bucket) such as Operations. You can then use Cost Categories in CCM Perspectives to filter across accounts, products, etc.

Apart from viewing costs based purely on different data sources (AWS, GCP, Clusters, etc.) without context, cost categories allow you to view spending across these data sources according to different business contexts and help you gain useful insights.

## How does it work?

1. **Create cost categories** — Allows you to categorize based on business requirements and get a contextual view of your expenses.
2. **Create cost buckets** — A cost category is composed of one or more buckets. A bucket is one or more filters that collect data from a data source. For example, a Cost Category called Departments would have a separate cost bucket for each department. Each bucket collects the data sources that belong to each department.​
3. **Create shared buckets** — You can create a shared bucket to share the cost across cost buckets in a given category. For example, let us consider the cost category Departments — the cost incurred in maintaining a database is attributed to multiple departments in an organization. So, you can create a shared bucket named Database Cost (enter a name that's relevant to your scenario) and define the rules and conditions to visualize cost data as per your requirement. You could choose to split this cost equally between all the cost buckets, or you could split the cost proportionally based on usage.​
4. **View your expense data** — After creating Cost Categories, you can use them in Perspective filters and Group By. You can even use Cost Categories to define Perspectives. The Cost Categories used in Perspectives are updated separately from the Perspectives. This allows you to update a single Cost Category and have the result automatically reflected in all the Perspectives that use that Cost Category.

If there are items that don't belong to any of these cost categories, the cost associated is displayed as unallocated costs.

## Prerequisites and permissions

To use Cost Categories, your Harness User account must belong to a User Group with the following Role permissions:

* **Cloud Cost Management**: **Cost Categories**: **Create/Edit**

For more details, go to [CCM Roles and Permissions](../../4-cloud-cost-technical-reference/ccm-ref/ccm-roles-and-permissions.md).

## Visual summary

How to create a Cost Category:
<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/watch?v=zbmWB0yUN4s" />



How to use a Cost Category:
<!-- Video:
https://harness-1.wistia.com/medias/rpv5vwzpxz-->
<docvideo src="https://www.youtube.com/watch?v=2gqvz47efuQ" />

## Create cost categories

You can create a Cost Category

1. In your Harness application, go to **Cloud Costs**.
2. Go to **Setup**, and then click **Cost Categories**.
3. Click **New Cost Category**.


You can also create a new Cost Category when you create a Perspective.

![](./static/use-ccm-cost-categories-01.png)

The new Cost Category appears.


1. In the new Cost Category, enter a name. For example, if this Cost Category is for departments, you could name it **Departments**.

  ![](./static/cost-category-builder-1.png)


### Create cost buckets

4. Click **New Cost Bucket**.
5. Enter a name for the cost bucket, such as the name of a department.
6. Define the rules (data sources) for the cost bucket. You could add multiple conditions to this rule using the AND operator.  
Add a new row for each rule until the cost bucket correctly includes all the costs incurred for this bucket. These rules are defined using the OR operator.  
Typically, you want to create multiple cost buckets in the cost category. For example, if the Cost Category is for departments, you would create a cost bucket for each department such as finance, operations, facilities, and so on.

  ![](./static/use-ccm-cost-categories-03.png)

**AND and OR**  
The AND and OR operators are used to filter data based on more than one condition:

 * AND: use AND to filter data sources that include both criteria.
 * OR: use OR to filter data sources that include one of the criteria.You can use AND and OR together.
  
    ![](./static/use-ccm-cost-categories-04.png)

### Create shared cost buckets

1. Click **+ New Shared Bucket**.
2. Enter a relevant name for the shared bucket.
3. Define rules and conditions as per requirement.
4. Select the sharing strategy.  
For example, consider two cost targets named team A and team B. These two teams use the same database. To enable sharing of cost between these two teams, you need to create a shared cost bucket named sharedDB (enter a name that relates to the shared bucket).
  * **Equally**: This option enables sharing of the DB cost equally (50%) between both teams A and B. You can view it in the grid and chart.
  * **Proportionally**: This option enables sharing of the DB cost proportionally between both teams. If the cost for team A is $60 and that of team B is $40. Then, 60% of DB cost is borne by team A and 40% by team B.
  *  **Fixed percentage**: This option allows the distribution of the cost of the database by a fixed percentage between cost buckets. For example, 30% to team A and 70% to team B.

  ![](./static/cost-category-builder-2.png)

### Manage unallocated costs

When used in a Perspective as a filter or **Group By**, the Cost Category shows data that matches its filters.

Unallocated Costs are costs that do not match the Cost Categories in the Perspective graph and rows.

In **Manage Unallocated Costs**, you can choose to show or ignore unallocated costs, and choose a name for how those costs are displayed.

  ![](./static/cost-category-builder-3.png)

Save the cost category. Now, you can view the cost bucket details in a cost category on the **Cost Categories** page.

  ![](./static/cost-bucket-details.png)

## Use cost categories
You can use cost categories in both Perspectives and Dashboards. When you create or modify a cost category, the changes are immediately reflected in Perspectives, including historical data. However, in Dashboards, it may take up to 24 hours for the changes to be reflected on the current month or the last three days' data, depending on the cloud service provider.

### Use cost categories in Perspectives

The cost categories can be used in Perspectives in the following ways.

#### Group By

Consider the following scenario where the Perspective rule has a cost category:

| **Cost category** | **Cost bucket** | **Shared Cost buckets** |
| --- | --- | --- |
| CC1 | <ul><li>B1 - AWS</li><li>B2- GCP</li></ul> | <ul><li>SB1 - AWS</li><li>SB2 - GCP</li> </ul>|

In this setup, if you group the Perspective by `AWS > Account`, the cost of B1 and SB1 are displayed against the respective AWS accounts. However, the total cost of the cost bucket B2, and the shared cost bucket SB2 in GCP are displayed under **No Account**. 

   ![](./static/cost-category-group-by-csp.png)

Consider the following scenario with two cost categories:

 **Cost category** | **Cost bucket** | **Shared cost buckets** |
| --- | --- | --- |
| CC1 | <ul><li>CB1 - AWS1 - $10, AWS7 - $20</li><li>CB2- AWS2 - $20</li></ul> | <ul><li>SB1 - AWS3 - $30</li><li>SB2 - AWS4 - $40</li> </ul>|
| CC2 | <ul><li>CB3 - AWS1 - $10</li><li>CB4- AWS2 - $20</li></ul>| <ul><li>SB3 - AWS5 - $30</li><li>SB4 - AWS6 - $40</li> </ul>|

If you have added CC1 (C1, C2, and Unattributed) in your Perspective rule and grouped by the same cost category, then the Perspective displays the following costs:

|Name | Total Cost|
| --- | --- |
| CB1 | $30 + shared cost (SB1 and SB2) |
| CB2 | $20 + shared cost (SB1 and SB2) |
| Unattributed | The sum of all the other cost |

If you have added CC1 (C1, C2, and Unattributed) in your Perspective rule and grouped by the cost category CC2, then the Perspective displays the following costs:

| Name|Total Cost |
| --- | --- |
| CB3 | $10 + shared cost (SB3 and SB4) |
| CB4 | $20 + shared cost (SB3 and SB4) |
| No CC2 | $20 + shared cost (SB1 and SB2) |
| Unattributed | The sum of all the other cost |


Here, the _No CC2_ cost includes the costs that are not in CC2 but in CC1. 

#### Filter

Select one or more cost categories as a filter.

![](./static/use-ccm-cost-categories-07.png)

You can use Group By and filters together. For example, your filter could select **Manufacturing** from the Department Cost Category, and then you can select **GCP: SKUs** in **Group By**.


![](./static/use-ccm-cost-categories-08.png)

:::caution
When including multiple cost categories in your filter, it is important to check for any shared cost buckets between them. If you have shared cost buckets with overlapping rules in both cost categories, the cost of these buckets is counted twice, resulting in duplication of costs. Therefore, it is recommended not to have multiple cost category filter in a Perspective. However, if you must add a multiple cost category filter, avoid overlapping shared cost buckets between cost categories to prevent any potential errors.
:::

#### Perspective rule

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

### Use cost categories in Dashboards

You can visualize cost categories in your custom dashboard. To learn how to create a custom dashboard, go to [Create Dashboards](/docs/platform/18_Dashboards/create-dashboards.md).

**Cost Categories** is available in the Unified explore on the Dashboards page. 

  <img src={dashboards_cc} alt="A screenshot to show the unified explore." height="400" width="500" />


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

## See Also

* [Create Cost Perspectives](../2-ccm-perspectives/1-create-cost-perspectives.md)

