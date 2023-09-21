---
title: View the Commitment Orchestrator summary page
description: View the summary of your Compute spend, Compute coverage, Savings, and Commitment utilization data.
sidebar_position: 2
---  

:::note
Currently, this feature is behind the feature flag **CCM_COMMORCH**. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

On the summary page, you have the ability to perform several actions, including:

* Viewing the total Compute spend, Compute coverage, Savings, and the Commitment utilization data.
* Viewing data for the selected period grouped by the Commitment type, Instance Family, or Region in a bar graph. You can view detailed information for each day by hovering over the graph.
* You can use the **Instance family** filter to view Instance types of a particular Instance family and the **Region** filter to view all Instance types available in that region. 


You can gather the following details from this page:

* **Compute spend**: The total amount spent on all compute instances that include Savings Plans, RIs, and On-Demand instances. 
* **Compute Coverage**: This visualization illustrates the percentage of coverage attributed to specific commitment types. Within the bar graph, the X-axis denotes dates, while the Y-axis represents the corresponding costs. Beneath the graph, you can find a breakdown of costs for each commitment type, instance family, and region.
* **Savings**: The total cost savings achieved by setting up the Commitment Orchestrator. Within the bar graph, the X-axis denotes dates, while the Y-axis represents the corresponding saved costs. Beneath the graph, you can find a breakdown of costs for each commitment type, instance family, and region.
* **Commitment Utilization**: This visualization illustrates the percentage utilization of RIs and Savings Plans. Within the bar graph, the X-axis denotes dates, while the Y-axis represents the corresponding percentage utilization of the commitment type. Below the graph, you can find a detailed breakdown of each commitment type with its respective compute spend, cost utilization, and percentage utilization data.

  <docimage path={require('./static/commitment-overview-1.gif')} width="50%" height="50%" title="Click to view full size image" />


After setting up the Commitment Orchestrator, some automated actions are taken in order to optimize utilization of the RIs and Savings Plans. The details of these events are recorded and displayed in the **Log History**. Within the bar graph, the X-axis denotes dates, while the Y-axis represents the number of events. Beneath the graph, you can find the following event details:
- The time stamp
- The event type (RI events, Savings Plan event, or Error/Exception)
- The category to which the event belongs
- A brief description of the event

You can use the **All events** dropdown to filter the view to a specific event type.

  <docimage path={require('./static/log-history.png')} width="50%" height="50%" title="Click to view full size image" />


By taking advantage of this feature, you gain a better understanding of your resource usage, and you can identify areas where you can optimize utilization of your cloud resources. To set up commitment orchestrator in your environment, go to [Set up Commitment Orchestrator](use-commitment-orch.md).
