---
title: Overview
description: Perspectives allow you to group your resources in ways that are more meaningful to your business needs.
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';


:::tip Latest Features Released in 1.50.2
<Tabs>
  <TabItem value="Label V2" label="Label V2">We’re moving from the older `Label` to `Label V2`. This will improve the load time of the Perspective or Cost Category which are powered by `Label V2`. `Label V2` can be used in place of `Label` in filter in perspectives, as a GROUP BY operand in perspectives graph and in specifying rules when creating a Perspective and Cost Categories. The main goal of `Label V2` is to give you full visibility into your original cloud tag keys, exactly as they appear in your AWS, Azure, GCP or Cluster environments.
  For Perspectives and Cost Categories using `Label`, **[migration to `Label V2` is REQUIRED for AWS compulsorily](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives#important-migration-from-label-to-labelv2)**. For new Perspectives and Cost Categories, **use `Label V2` and not `Label`**.</TabItem>

</Tabs>
:::

You can add business context to your Harness Cloud Cost Management (CCM) data using perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.

You can view any perspective by clicking on it. The perspective overview page provides a comprehensive dashboard with the following information:

### Key Metrics
- **[Total Cost](https://developer.harness.io/docs/cloud-cost-management/get-started/key-concepts#total-cost)**: Current accumulated cost for the selected time period
- **[Forecasted Cost](https://developer.harness.io/docs/cloud-cost-management/get-started/key-concepts#forecasted-cost)**: Projected spending based on current usage patterns
- **[Cost Recommendations](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/ccm-recommendations/home-recommendations)**: Suggestions for optimizing your cloud spending
- **Budget Status**: Visual indicators of budget utilization (if budgets are configured)

### Cost Visualization
The interactive cost graph allows you to organize and segment your cost data using the **Group By** function. This grouping functionality determines how your costs are categorized and displayed in the visualization. You can group your data by any of the following dimensions:

- **[Cost Categories](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories)**: Group costs by your defined cost categories
- **Cloud Provider**: View costs by cloud service provider (AWS, Azure, GCP) with provider-specific options
- **Region**: Break down costs by geographical regions
- **Product**: Analyze costs by specific cloud products and services
- **Label**: Group by GCP, Azure, Cluster tags and (Harness-normalized) AWS tags 
- **Label V2**: Group by same labels exactly as they appear in your AWS, Azure, or GCP environments
- **None**: View aggregated costs without grouping

:::info
### Understanding the Difference: Label vs. Label V2

- **`Label` (Legacy)**: Normalizes AWS tags. GCP, Azure and Clusters tags are not normalized.
- **`Label V2` (New)**: Preserves the original structure from AWS similar to how GCP, Azure and Cluster tags are stored.

**Key Benefits of `Label V2`:**
- **Original tags**: Displays your original cloud tag keys exactly as they appear in AWS, Azure, or GCP
- **Improved Performance**: Enhanced data processing and query performance

`Label` is a label that you assign to your AWS resources. See how [AWS labels are created](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-aws/). 

After `Label V2`, AWS labels are stored as-is without any normalization.

**Harness CCM is transitioning from the traditional `Label` system to the enhanced `Label V2` system. Support for the legacy `Label` system will be discontinued in the coming months.**

Please [see the steps here](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives#important-migration-from-label-to-labelv2) to migrate labels from `Label` to `Label V2`.
:::

### General Preferences

You can customize your perspective view with the following display preferences:

- **Show Others**: The graph displayed in a Perspective shows the top 12 costs only. Enable this setting to include the remaining costs as an **Others** item in the graph.

- **Show Anomalies**: Highlights unusual spending patterns or sudden cost changes in your visualization. This feature helps you quickly identify potential issues or unexpected charges that may require investigation.

- **Show Negative Cost**: Displays instances where discounts exceed the actual billing amount, resulting in negative cost values in your reports.

## Budgets, Reports, and Alerts
For details on adding Budgets, Reports, and Alerts go to:

* [Create a Budget for Your Perspective](../../3-use-ccm-cost-reporting/1-ccm-perspectives/3-create-a-budget-perspective.md)
* [Share Your Cost Perspective Report](../../3-use-ccm-cost-reporting/1-ccm-perspectives/4-share-cost-perspective-report.md)
* [Detect Cloud Cost Anomalies with CCM](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/a-detect-cloud-cost-anomalies-with-ccm)

## Perspective Preferences

Go to [Perspective Preferences](perspective-preferences.md) to learn about these settings.

### Review: No Account/Project/etc

It's important to understand the difference between the **Others** and **No Account/Project/etc** categories.

When a Perspective includes multiple data sources (for example, AWS, GCP, and Cluster) and you select one data source in a Perspective **Group By**, such as **AWS: Account**, the costs for the AWS data source are displayed individually. The costs for the other data sources (GCP, Cluster) are grouped under **No Account**.

In other words, a row with **No** followed by the selected `Group by` is displayed for costs that don’t have any relation with the selected `Group by`. For example, **No SKUs** is displayed for costs (AWS, clusters, etc.) that don’t have any GCP SKUs associated with it.

Another example is if the **Group By** is **Project**. For example, if you selected GCP: Project, then the **No Project** item in the graph represents the AWS and Cluster project costs.

Essentially, `No GroupBy` represents the null values for that `Group By` grouping. To work with these null values either in perspective filters or rules, you need to use the "IS NULL" function on that field. Since Perspectives don't explicitly provide a `No GroupBy` value in the filters, the "IS NULL" field serves as the way to handle these `No GroupBy` items. 

For example, if your perspective includes both GCP and AWS cloud providers, and you intend to categorize costs by AWS accounts using the `GroupBy` function, any costs associated with GCP will be classified under the label `No Account`. In case you wish to view only the GCP costs, you can apply a filter with the condition `AWS > Account` IS NULL.

## Organize Perspectives using Folders

You can organize Perspectives by adding them to folders.

Click **New folder**, name the folder, and then select the Perspectives you want to add.

![](./static/create-cost-perspectives-28.png)

You can also add a Perspective to a folder when you create it or move it to a folder when you edit it.

![](./static/create-cost-perspectives-29.png)

You can also move a Perspective to a folder from its more options (⋮) setting.

![](./static/create-cost-perspectives-30.png)

:::important note
The maximum number of folders that can be created is limited to 500.
:::


## Important: Migration from `Label` to `Label V2`

Harness CCM is transitioning from the traditional Label system to the enhanced Label V2 system. **Support for the legacy Label system will be discontinued in the coming months**.

### Required Action

- **AWS Labels**: Immediate migration required. You must update all AWS `Label` references to use `Label V2`.
- **GCP, Azure, and Cluster Labels**: After AWS label migration is complete, Harness CCM will automatically handle these migrations.

### How to Migrate

#### **Via UI:**

1. **Identify affected components**:
   - Review all Perspectives that use AWS Label-based grouping or filtering

2. **Update each component**:
   - Edit each Perspective
   - Locate all instances where you've defined rules, filters, or grouping using AWS Labels
   - Change the selection from "Label" to "Label V2"
   - Save your changes

3. **Verify your updates**:
   - After updating the Perspective, confirm that your cost data appears correctly
   - Ensure all previously configured label-based filters work as expected

Kindly follow the steps below: 
  <iframe 
     src="https://app.tango.us/app/embed/44d091fd-3177-44a1-b575-1a5a8febf36d" 
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
- [Create a Perspective](https://apidocs.harness.io/tag/Cloud-Cost-Perspectives#operation/createPerspective)
- [Update a Perspective](https://apidocs.harness.io/tag/Cloud-Cost-Perspectives#operation/updatePerspective)


