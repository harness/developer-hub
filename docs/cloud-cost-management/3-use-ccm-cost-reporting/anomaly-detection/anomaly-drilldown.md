---
title: Anomaly Drilldown
description: This page explains the concept of anomaly drilldown and how it works.
# sidebar_position: 2
helpdocs_topic_id: x0z3r0bv99
helpdocs_category_id: jqk71thuxh
helpdocs_is_private: false
helpdocs_is_published: true
---

## Anomaly Drilldown 
Once an anomaly is detected, for each of the anomaly detected, CCM provides insights into what are the resources which might be causing the anomaly. CCM queries the cloud provider's cost data, and identifies resources that have experienced significant cost increases compared to previous periods. CCM aggregates the total costs for each resource, computes the cost increase (or decrease) compared to the previous day, and orders the results by the highest increase in cost, helping to detect resources that have experienced significant cost spikes.

Detected anomalies are stored in a time series database and are available for review and analysis.

When a user clicks on any anomaly, a detailed analysis of the anomaly is shown:

The page contains:
- Details about the cloud account/cluster such as ID, service.
- Option to mark an anomaly as resolved.
- Severity of the anomaly
- Details of anomaly like start date, end date, duration, cost impact, total spend, expected range.
- Cost Trend and Anomalies: Graph showing Anomalies Spend and Spend within Range for historical data over a time period of either 30 or 90 days.
- Anomalies Spend:
  - Spend within range: 
  - Top resource changes: Top resources with major cost impact due to the anomaly
  - Section to submit feedback: Users can mark an anomaly as “True Expected”, “True Unexpected”, or “False”” to improve accuracy of the system for further anomaly detection.
