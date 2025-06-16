---
title: Key Concepts
description: Export your perspectives' reports as CSV files
sidebar_position: 3
helpdocs_is_private: false
helpdocs_is_published: true
---


## Cloud Costs Perspective Concepts

This section describes Perspective concepts.

### Perspectives

Perspectives allow you to group your resources in ways that are more meaningful to your business needs.

For example, you can group and filter by Account, Environment, Service, Region, Product, Label, Namespace, Workload, etc., and create a Perspective for your business, finance, and engineering teams.

Here are some examples where you could use Perspectives:

* Build your own visual interface using flexible rules and filters. With Perspectives, business units can create views that align with their business needs based on groups of resources determined by different rules and filters.
* Create Perspectives broken down by project, team, department, or business unit to gain granular visibility into all your cloud environments. Perspectives provide a single-pane view of different products, for example, clusters, applications, AWS, GCP, and Azure.
* Schedule and share the reports with the key stakeholders for maximum business impact.
* Estimate costs consumed by specific teams, groups, departments, BUs, LOBs, cost centers, etc.

### Rule-based Engine

Perspectives use a rule-based engine to organize and display your cloud costs. Each Perspective has a set of rules and each rule can have multiple conditions. The following operators are supported for each condition:

* **IN**: The exact match operation is used to filter for the exact value specified.
* **NOT IN**: The exact match operation is used to filter for all values except the one specified.
* **NULL**: Null means the selected filter has no value. If you select NULL for your filter, then the cost of the selected filter isn't included in the Perspective.  
For example, in **Rules for Perspective**, if you select `Label: kubernetes.io/name` as `NULL`, then your Perspective won't include the cost for the selected label (`kubernetes.io/name`). It will include the cost of all the other resources.

  ![](./static/create-cost-perspectives-16.png)
* **NOT NULL**: Not null means that the selected filter has a value. If you choose NOT NULL for your filter, then only the cost of the selected filter is included in the perspective.  
  
For example, in **Rules for Perspective**, if you select `Label: kubernetes.io/name` as `NOT_NULL`, then your Perspective will list the cost of the selected label only (`kubernetes.io/name`). It won't include the cost of any other resource.

  ![](./static/create-cost-perspectives-17.png)
* **LIKE**: The Like operator uses `REGEXP_CONTAINS` provided by the BigQuery at the backend. This function is used to check if a given value partially matches a specified regular expression. 

  - Retrieves result even if the value partially matches the regular expression. 
  - To search for a full match (the entire value matches the regular expression), use `^` at the beginning of the regular expression and `$` at the end of the regular expression. These symbols signify the beginning and end of the text, respectively.

  For example, `AWS Account ID LIKE ‘abc’`. This means REGEXP_CONTAINS(aws_account_id, r'abc). User input is 'abc' in this example.

### Filters

You can create a Perspective for your resources using rules and filters. The filters are used to group the resources. The following are the supported filters:

* **Cost Categories**: You can create a perspective by filtering based on the cost categories you have created. To create cost categories, see [Use Cost Categories](../2-ccm-cost-categories/1-ccm-cost-categories.md).
* **AWS**: CCM allows you to view your AWS costs at a glance, understand what is costing the most, and analyze cost trends. CE displays the data for all your Amazon Web Services (ECS, EC2, and so on). For more information, see [Analyze Cost for AWS Using Perspectives](../3-root-cost-analysis/analyze-cost-for-aws.md).
* **GCP**: CCM allows you to view your Google Cloud Platform (GCP) costs, understand what is costing the most, and analyze cost trends. CE displays data for all your GCP products (such as Compute Engine, Cloud Storage, BigQuery, and so on), projects, SKUs, and location. For more information, see [Analyze Cost for GCP ​Using Perspectives](../3-root-cost-analysis/analyze-cost-for-gcp-using-perspectives.md).
* **Azure**: CCM allows you to view your Azure costs at a glance, understand what is costing the most, and analyze cost trends. CE displays the data for all your Azure services (Storage accounts, Virtual machines, Containers, and so on). For more information, see [Analyze Cost for Azure Using Perspectives](../3-root-cost-analysis/analyze-cost-for-azure.md).
* **Cluster**: Total cost, Cost trend, Idle cost, and Unallocated cost for each cluster.
* **Region**: Each AWS, GCP, or Azure region you're currently running services in.
* **Product**: Each of your active products with its cloud costs.
* **Label** and **Label V2**: Costs organized by the cloud and K8s labels that you are using to organize your Cloud instances.


### Preview

As you add your resources in the **Perspective Builder**, a **Preview** of your Perspective is displayed.

![](./static/create-cost-perspectives-18.png)

The following are the key advantages of preview:

* Provides a quick visual representation of your resources in the Perspective without saving them.
* Allows you to group resources in the preview mode itself. You can group by **Common**, **Custom** (if Custom Fields are available), **Cluster**, **AWS**, **GCP**, and **Azure**.
* Helps you to review your changes faster.


:::note
**Grouped by** Product in Preview.
:::


### Review: No Account/Project/etc

It's important to understand the difference between the **Others** and **No Account/Project/etc** categories.

When a Perspective includes multiple data sources (for example, AWS, GCP, and Cluster) and you select one data source in a Perspective **Group By**, such as **AWS: Account**, the costs for the AWS data source are displayed individually. The costs for the other data sources (GCP, Cluster) are grouped under **No Account**.

In other words, a row with **No** followed by the selected `Group by` is displayed for costs that don’t have any relation with the selected `Group by`. For example, **No SKUs** is displayed for costs (AWS, clusters, etc.) that don’t have any GCP SKUs associated with it.

Another example is if the **Group By** is **Project**. For example, if you selected GCP: Project, then the **No Project** item in the graph represents the AWS and Cluster project costs.

Essentially, `No GroupBy` represents the null values for that `Group By` grouping. To work with these null values either in perspective filters or rules, you need to use the "IS NULL" function on that field. Since Perspectives don't explicitly provide a `No GroupBy` value in the filters, the "IS NULL" field serves as the way to handle these `No GroupBy` items. 

For example, if your perspective includes both GCP and AWS cloud providers, and you intend to categorize costs by AWS accounts using the `GroupBy` function, any costs associated with GCP will be classified under the label `No Account`. In case you wish to view only the GCP costs, you can apply a filter with the condition `AWS > Account` IS NULL.

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