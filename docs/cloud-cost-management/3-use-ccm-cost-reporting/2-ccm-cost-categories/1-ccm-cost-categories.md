---
title: Cost categories overview
description: CCM cost categories provide an understanding of where and how your money is being spent. Cost categories allow you to take data across multiple sources and attribute it to business contexts, such as…
# sidebar_position: 1
helpdocs_topic_id: 6lle2diqeg
helpdocs_category_id: 3uqsijw1gg
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

:::tip Latest Features Released in 1.50.2
<Tabs>
  <TabItem value="Label V2" label="Label V2">We’re moving from the older `Label` to `Label V2`. This will improve the load time of the Perspective or Cost Category which are powered by `Label V2`. `Label V2` can be used in place of `Label` in filter in perspectives, as a GROUP BY operand in perspectives graph and in specifying rules when creating a Perspective and Cost Categories. The main goal of `Label V2` is to give you full visibility into your original cloud tag keys, exactly as they appear in your AWS, Azure, or GCP environments.
  For Perspectives and Cost Categories using `Label`, **[migration to `Label V2` is REQUIRED for AWS compulsorily](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories#important-migration-from-label-to-labelv2)**. For new Perspectives and Cost Categories, **use `Label V2` and not `Label`**.</TabItem>

</Tabs>
:::

Cost categories provide an understanding of where and how your money is being spent. Cost categories allow you to take data across multiple sources and attribute it to business contexts, such as departments, teams, and other spend categories. For example, if your business is organized by teams with multiple accounts, you can create a Cost Category named Teams and map costs to each team from all your accounts. The cost category called Teams shows you what each team is spending across AWS, GCP, Clusters, etc. You could drill down further into the cost data available for every item in your cost category. For example, in a cost category called Teams, you could view cost data for a particular team (cost bucket) such as Operations. You can then use Cost Categories in CCM Perspectives to filter across accounts, products, etc.

Apart from viewing costs based purely on different data sources (AWS, GCP, Clusters, etc.) without context, cost categories allow you to view spending across these data sources according to different business contexts and help you gain useful insights.

## How does it work?

1. **Create cost categories** — Allows you to categorize based on business requirements and get a contextual view of your expenses.
2. **Create cost buckets** — A cost category is composed of one or more buckets. A bucket is one or more filters that collect data from a data source. For example, a Cost Category called Departments would have a separate cost bucket for each department. Each bucket collects the data sources that belong to each department.​
3. **Create shared buckets** — You can create a shared bucket to share the cost across cost buckets in a given category. For example, let us consider the cost category Departments — the cost incurred in maintaining a database is attributed to multiple departments in an organization. So, you can create a shared bucket named Database Cost (enter a name that's relevant to your scenario) and define the rules and conditions to visualize cost data as per your requirement. You could choose to split this cost equally between all the cost buckets, or you could split the cost proportionally based on usage, or you could allocate a fixed percentage of cost for each cost bucket.​
4. **View your expense data** — After creating Cost Categories, you can use them in Perspective filters and Group By. You can even use Cost Categories to define Perspectives. The Cost Categories used in Perspectives are updated separately from the Perspectives. This allows you to update a single Cost Category and have the result automatically reflected in all the Perspectives that use that Cost Category.

If there are items that don't belong to any of these cost categories, the cost associated is displayed as unallocated costs.

## Prerequisites and permissions

To use cost categories, your Harness user account must belong to a user group with the following role permissions:

- **Cloud Cost Management**: **Cost Categories**: **Create/Edit**

For more details, go to [CCM Roles and Permissions](/docs/cloud-cost-management/access-control/ccm-roles-and-permissions.md).

## Visual summary

How to create a Cost Category:

<DocVideo src="https://www.youtube.com/watch?v=zbmWB0yUN4s" />

How to use a Cost Category:

<DocVideo src="https://www.youtube.com/watch?v=2gqvz47efuQ" />

## Create cost categories

To create a cost category perform the following steps:

1. In your Harness application, go to **Cloud Costs**.
2. Go to **Setup**, and then select **Cost Categories**.
3. Select **New Cost Category**.

You can also create a new cost category when you create a perspective.

![](./static/use-ccm-cost-categories-01.png)

The new cost category appears.

4. In the new cost category, enter a name. For example, if this cost category is for departments, you could name it **Departments**.

![](./static/cost-category-builder-1.png)


:::info
You can create a maximum of 25 cost categories.
:::

### Create cost buckets

1. Select **New Cost Bucket**.
2. Enter a name for the cost bucket, such as the name of a department.
3. Define the rules (data sources) for the cost bucket. You could add multiple conditions to this rule using the AND operator.  
   Add a new row for each rule until the cost bucket correctly includes all costs incurred. These rules are defined using the OR operator. You can add another cost category as a rule when defining your cost buckets.

:::warning

- You cannot include a nested cost category as a rule within another cost category if either of these cost categories contains a shared bucket.

To illustrate, consider the scenario of creating a cost category, `CC1`, which includes a cost bucket, `CB1`. While defining the cost bucket rules for `CB1`, if you intend to nest a cost category, `CC2` that contains a cost bucket, `CB2`, you must ensure that neither `CC1` nor `CC2` includes a shared cost bucket.

- You cannot add the same cost category as a rule in the cost bucket.
- You cannot create cyclic nested cost categories, where a cost category is nested within each other.

Consider an example where you have a cost category named `CC1`, which includes a cost bucket called `CB1`. Additionally, you have another cost category named `CC2`, which includes a cost bucket called `CB2`. When defining the cost bucket rules, it is essential to avoid adding `CC2` as a rule in `CC1` and adding `CC1` as a rule in `CC2`. Similarly, it is not allowed to create a nested structure where CC1 nests CC2, which in turn nests CC3, then CC4, and finally circles back to CC1.

- You can nest cost categories to a maximum of 5 levels.

:::

Typically, you want to create multiple cost buckets in the cost category. For example, if the Cost Category is for departments, you would create a cost bucket for each department such as finance, operations, facilities, and so on.

![](./static/use-ccm-cost-categories-03.png)

**AND and OR**  
The AND and OR operators are used to filter data based on more than one condition:

- AND: use AND to filter data sources that include both criteria.
- OR: use OR to filter data sources that include one of the criteria. You can use AND and OR together.

  ![](./static/use-ccm-cost-categories-04.png)

:::info
You can create a maximum of 1000 cost buckets.
:::

#### Copy cost buckets

You can copy cost buckets from one cost category to multiple cost categories simultaneously. You have the flexibility to choose any number of buckets for copying. Upon selection, a popup prompt appears, allowing you to specify the target cost categories for copying the selected buckets. Upon successful completion, you receive a success notification along with relevant details.

:::info
While copying, you may encounter issues if the destination cost category already has a bucket with the same name as the copied one. In such cases, you can address the conflict by renaming the bucket before attempting the copy operation again.
:::

To copy cost buckets from one cost category to another, perform the following steps:

1. On the **Cost Categories** page, expand the cost category from which you want to copy the cost buckets.
2. Select **Manage Cost Buckets**.
3. Select the cost buckets you want to copy.
4. Select **Copy**.
5. A popup appears displaying the source cost category from which you've copied the cost buckets. Within this popup, select the target cost categories to which you intend to copy the cost buckets.
6. Select **View Details** on the confirmation message and make sure the intended cost buckets have been copied to the required cost categories.

<DocImage path={require('./static/ccm-copy-cost-buckets.gif')} width="60%" height="60%" title="Click to view full size image" />

:::note Important

Role-Based Access Control (RBAC) in Harness CCM supports **nested cost buckets** within CCM data scope in **Roles**, providing more granular access control for nested Cost Categories. Note that **RBAC support is not available for the Unallocated Cost bucket**.

:::
### Create shared cost buckets

1. Select **+ New Shared Bucket**.
2. Enter a relevant name for the shared bucket.
3. Define rules and conditions as per requirement.
4. Select the sharing strategy.  
   For example, consider two cost targets named team A and team B. These two teams use the same database. To enable sharing of cost between these two teams, you need to create a shared cost bucket named sharedDB (enter a name that relates to the shared bucket).

- **Equally**: This option enables sharing of the shared bucket cost equally (50%) between both teams A and B. You can view it in the grid and chart.
- **Proportionally**: This option enables sharing of the shared bucket cost proportionally between both teams. If the cost for team A is USD60 and that of team B is USD40. Then, 60% of DB cost is borne by team A and 40% by team B.
- **Fixed percentage**: This option allows the distribution of the cost of the shared bucket by a fixed percentage between cost buckets. For example, 30% to team A and 70% to team B.

![](./static/cost-category-builder-2.png)

:::info
You can create a maximum of 10 shared cost buckets.
:::

### Manage unallocated costs

When used in a Perspective as a filter or **Group By**, the Cost Category shows data that matches its filters.

Unallocated Costs are costs that do not match the Cost Categories in the Perspective graph and rows.

In **Manage Unallocated Costs**, you can choose to show or ignore unallocated costs, and choose a name for how those costs are displayed.

![](./static/cost-category-builder-3.png)

Save the cost category. Now, you can view the cost bucket details in a cost category on the **Cost Categories** page.

![](./static/cost-bucket-details.png)


## Important: Migration from `Label` to `Label V2`

Harness CCM is transitioning from the traditional `Label` system to the enhanced `Label V2` system. **Support for the legacy `Label` system will be discontinued in the coming months**.

### Required Action

- **AWS Labels**: Immediate migration required. You must update all AWS `Label` references to use `Label V2`.
- **GCP, Azure, and Cluster Labels**: After AWS label migration is complete, Harness CCM will automatically handle these migrations.

### How to Migrate

#### **Via UI:**

1. **Identify affected Cost Categories**:
    - Review all Cost Categories that use AWS Label-based grouping or filtering

2. **Update each component**:
   - Edit each Cost Category
   - Locate all instances where you've defined rules, filters, or grouping using Labels
   - Change the selection from "Label" to "Label V2"
   - Save your changes

3. **Verify your updates**:
   - After updating the Cost Category, confirm that your cost data appears correctly
   - Ensure all previously configured label-based filters work as expected

Kindly follow the steps below: 

<iframe 
     src="https://app.tango.us/app/embed/5969bd17-7d02-468b-80f6-5eace7e1ffdd" 
     title="Migrating Label to Label V2" 
     style={{minHeight:'480px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe>    

#### **Via API:**

Earlier every request had the Label field as:
```json
                {
                    field": {
                        "fieldId": "labels.value",
                        "fieldName": "key1",
                        "identifier": "LABEL",
                        "identifierName": "Label"
                    },
                    "operator": "IN",
                    "values": [
                        "value1"
                    ]
                } 
```

Now the request has the Label V2 field as:

```json
                {
                    field": {
                        "fieldId": "labels.value",
                        "fieldName": "key1",
                        "identifier": "LABEL_V2",
                        "identifierName": "Label v2"
                    },
                    "operator": "IN",
                    "values": [
                        "value1"
                    ]
                }
```

Similarly, for `labels.key`:

Earlier:

```json
 "idFilter": {
                    "field": {
                        "fieldId": "labels.key",
                        "fieldName": "",
                        "identifier": "LABEL",
                        "identifierName": "Label V2"
                    },
                    "operator": "IN",
                    "values": []
                }
```

Now:

```json
 "idFilter": {
                    "field": {
                        "fieldId": "labels.key",
                        "fieldName": "",
                        "identifier": "LABEL_V2",
                        "identifierName": "Label V2"
                    },
                    "operator": "IN",
                    "values": []
                }
```

In short, wherever you see `LABEL` in "identifier", replace it with `LABEL_V2` alongwith "identifierName" .

Please refer the following API docs for details:
- [Create a Cost Category](https://apidocs.harness.io/tag/Cloud-Cost-Cost-Categories#operation/createBusinessMapping)
- [Update a Cost Category](https://apidocs.harness.io/tag/Cloud-Cost-Cost-Categories#operation/updateBusinessMapping)
