---
title: Summary of your asset governance rules  
sidebar_label: Asset governance summary 
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 3
---

The **Overview** page offers a consolidated summary of your organization's governance rules, enforcements, and cost savings resulting from rule executions. This provides a quick and easy way to monitor your cloud spend and ensure compliance with your governance policies. Additionally, you can access valuable recommendations for optimizing resource utilization, allowing you to achieve even greater cost savings. 

  <docimage path={require('./static/gov-overview.png')} width="50%" height="50%" title="Click to view full size image" />

  - **All time realized savings** — The total cost savings achieved from the day you began utilizing CCM Asset Governance up to the present date.
  
    You can view a visual representation of your savings trends through the **Savings Trend** graph, which allows you to hover over individual data points to view the corresponding cost savings for a specific day. <!---This feature provides you with a granular level of insight into your cloud spend, enabling you to identify any trends or anomalies and make informed decisions to optimize your resource utilization and maximize cost savings.-->

  - **Total rules** — The total count of rules created up to the current date.
  - **Total enforcements** — The total number of enforcements created up to the current date. Enforcements ensure continuous cost savings.
  - **Total evaluations** — The total number of evaluations performed to date. The pie chart on this page provides a breakdown of the number of evaluations performed for different resource types. This visualization helps you quickly identify which resource types are being evaluated more frequently.
  - **Resource breakdown** — The count of evaluations categorized by different resource types.

:::important
In certain cases, there can be overlapping rules targeting the same resource. For example, If you have two rules such as `ec2-old instance-stop` and `ec2-underutilized-list` both applicable to the same EC2 instance, the cost savings are calculated independently for each rule execution.
:::

  Recommendations to optimize utilization of your AWS resources:
  - **Asset Optimization Recommendations** — Displays the top five recommendations to reduce costs. To view the complete list, click **View all Recommendations**.
  - **Potential Monthly Savings** — Monthly cost savings that can be realized if the recommendations are applied.
  - **Breakdown by resource type** — The cumulative count of evaluations for each resource type.
  
To apply a recommendation, select the row. The recommendation opens on the **Recommendations** page. To learn how to enforce this recommendation, go to [Governance recommendations](../../4-use-ccm-cost-optimization/1-ccm-recommendations/governance.md).

Make use of Harness AIDA to create a new rule. Select the **Create a new rule with AIDA** option. A new rule opens in the rule editor with an auto-generated name. For more information, go to [Harness AIDA for asset governance](../asset-governance/cag-aida/gen-ai-overview.md).
