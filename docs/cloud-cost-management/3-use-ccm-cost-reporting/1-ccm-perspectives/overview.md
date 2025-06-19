---
title: Introduction to Perspectives
description: Perspectives allow you to group your resources in ways that are more meaningful to your business needs.
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip Important Update: Label V2 Now Available
<Tabs>
  <TabItem value="Label V2" label="Label V2">
    
## What's New with Label V2

We've upgraded from `Label` to `Label V2` to enhance your experience with the following benefits:

You can add business context to your Harness Cloud Cost Management (CCM) data using perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.

You can view any perspective by clicking on it. The perspective overview page provides a comprehensive dashboard with the following information:

On the overview page you can see:
- Total cost
- Budget
- Forecasted cost
- Recommendations
- Filter
- Cost visualization graph. The interactive cost graph allows you to organize and segment your cost data using the **Group By** function. This grouping functionality determines how your costs are categorized and displayed in the visualization. You can group your data by any of the following dimensions:
    - **[Cost Categories](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories)**: Group costs by your defined cost categories
    - Any custom data source selected
    - **Cloud Provider**: View costs by cloud service provider (AWS, Azure, GCP) with provider-specific options
    - **Region**: Break down costs by geographical regions
    - **Product**: Analyze costs by specific cloud products and services
    - **Label**: Group by GCP, Azure, Cluster tags and (Harness-normalized) AWS tags 
    - **Label V2**: Group by same labels exactly as they appear in your AWS, Azure, or GCP environments. See the differences between [Label and Label V2](/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/key-concepts#understanding-the-difference-label-vs-label-v2).
    - **None**: View aggregated costs without grouping
- Preferences


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

Harness CCM is transitioning from the traditional `Label` system to the enhanced `Label V2` system. **Support for the legacy `Label` system will be discontinued in the coming months**.

### Required Action

**For AWS users**: Migration to Label V2 is **mandatory**. [Learn more about the migration process](#important-migration-from-label-to-labelv2).

**For new implementations**: Always use Label V2 instead of the legacy Label system.
  </TabItem>
</Tabs>
:::

# Understanding Perspectives in Cloud Cost Management

## What are Perspectives?

Perspectives in Harness Cloud Cost Management (CCM) provide a powerful way to contextualize your cloud spending according to your business needs. By creating custom views of your cost data, you can gain insights that align with your organizational structure, projects, or any other business dimension.

## Benefits of Using Perspectives

- **Business-Aligned Cost Visibility**: View cloud costs in ways that match your organizational structure and business priorities
- **Custom Data Grouping**: Create meaningful cost groupings that make sense for your specific use cases
- **Enhanced Decision Making**: Make more informed financial decisions with contextualized cost data
- **Simplified Cost Management**: Organize complex cloud spending into understandable, actionable views
- **Improved Cost Allocation**: Accurately attribute costs to the right teams, projects, or business units

## Example Use Cases for Perspectives

Here are some practical scenarios where perspectives can provide significant value:

### 1. Team-Based Cost Attribution

**Scenario:** A company with multiple development teams sharing cloud resources needs to understand which team is responsible for which costs.

**Solution:** Create a perspective that groups costs by team tags or labels, allowing managers to:
- Track each team's cloud spending over time
- Compare resource utilization across teams
- Set team-specific budgets and monitor adherence
- Identify opportunities for cost optimization within each team

### 2. Project-Based Financial Reporting

**Scenario:** A business needs to track costs for specific client projects that span multiple cloud services and regions.

**Solution:** Create project-specific perspectives that filter costs based on project identifiers, enabling:
- Accurate client billing and cost recovery
- Project profitability analysis
- Budget vs. actual cost tracking for each project
- Forecasting future project costs based on current trends

### 3. Environment-Based Cost Management

**Scenario:** An organization wants to compare costs between development, staging, and production environments.

**Solution:** Create perspectives for each environment type, allowing teams to:
- Identify cost disparities between environments
- Optimize development and staging environments for cost efficiency
- Track the cost impact of moving features from development to production
- Implement environment-specific cost controls

### 4. Business Unit Financial Allocation

**Scenario:** A large enterprise needs to allocate cloud costs to different business units for internal chargeback.

**Solution:** Create perspectives aligned with business units, providing:
- Transparent cost allocation for finance teams
- Business unit-specific cost reporting for executives
- Trend analysis of cloud spending by business function
- Data for informed resource allocation decisions

### 5. Application Portfolio Management

**Scenario:** An IT department manages dozens of applications and needs to understand the total cost of ownership for each.

**Solution:** Create application-specific perspectives that aggregate all costs related to each application:
- Compare costs across the application portfolio
- Identify the most expensive applications to prioritize optimization
- Track cost impact of application changes and updates
- Make informed decisions about application retirement or modernization

### Next Steps
- Getting Started
- Setting Up Perspectives