---
title: Key Features
description: Explore the key features and capabilities of Harness Cloud Cost Management (CCM) anomaly detection system.
sidebar_position: 3
helpdocs_is_private: false
helpdocs_is_published: true
---

### Anomaly Drilldown

Once an anomaly is detected, for each of the anomaly detected, CCM provides insights into what are the resources which might be causing the anomaly. CCM queries the cloud provider's cost data, and identifies resources that have experienced significant cost increases compared to previous periods. CCM aggregates the total costs for each resource, computes the cost increase (or decrease) compared to the previous day, and orders the results by the highest increase in cost, helping to detect resources that have experienced significant cost spikes.
Detected anomalies are stored in a time series database and are available for review and analysis. Each anomaly is assigned metadata, such as the reported cost, expected cost, and anomaly score.
The final anomalies are flagged for further investigation, allowing users to take corrective action as needed.

When a user clicks on any anomaly, a detailed analysis of the anomaly is shown:

The page contains:
- Details about the cloud account/cluster such as ID, service.
- Option to mark an anomaly as resolved.
- Severity of the anomaly
- Details of anomaly like start date, end date, duration, cost impact, total spend, expected range.
- Cost Trend and Anomalies: Graph showing Anomalies Spend and Spend within Range for historical data over a time period of either 30 or 90 days.
- Anomalies Spend:
  - Spend within range: 
  - Top resource changes: Top resources with major cost impact due to the anomaly with corresponsing cloud labels on the resources for additional metadata.
  - Section to submit feedback: Users can mark an anomaly as “True Expected”, “True Unexpected”, or “False”” to improve accuracy of the system for further anomaly detection.

<DocVideo src="https://app.tango.us/app/embed/c2f0d526-f77e-4303-be51-a98c4bf2de88?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Drilldown" />

## Anomaly Workflows

Any anomaly from the list will exist in one of the three states at any given point in time:

- Active: All the anomalies that are currently active and have not been taken any action on are marked as Active. Every new anomaly detected is first in “Active” state by default.

- Resolved: An anomaly that has been resolved is marked as “Resolved”.

- Ignored: An anomaly that has been marked as ignored will appear in the Ignored list. Ignored anomalies are not actively flagged but remain visible for reference.

- Archived: An anomaly is automatically moved to the Archived list once it is more than 90 days old.

The Archived/Ignored page provides details about anomalies in both states, including the estimated total cost impact, the number of anomalies ignored, and the number archived.

## Anomaly Alerts

It might not always be possible to keep an eye out on the homepage to check for anomalies and some anomalies might need urgent attention. For this reason, Harness CCM provides an option to set alerts for all anomalies for a particular account or specific resources. 

While setting up a new alert, following can be selected:
- Scope: Scope for which the anomaly needs to be alerted for. This can be either for all account data that the user has access to or the user can specify perspectives for which anomaly alerts will be sent.
- Configuring the anomaly alert: Alert conditions follow your set preferences. You may override these thresholds, but only to increase them. Currently, the user can set thresholds for “Alert when cost difference is over ($)” and/or “Alert when cost difference is over (%)” depending on whether they want to define a specific cost amount or a cost percentage.
- Alert Channel: Currently, Harness CCM supports Slack and/or e-mail as possible methods of sending alerts.

<DocVideo src="https://app.tango.us/app/embed/3536272f-5e99-4280-a983-81f710de4199?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Alerts" />

## Anomaly Global preferences

Harness CCM allows users to configure how cost anomalies are detected and reported, ensuring that only significant anomalies are flagged for review. Here’s an explanation of the configurable options:

1. Minimum Cost Impact (Amount)

This setting allows you to set a threshold for the cost impact, meaning that anomalies will only be shown if the financial impact exceeds the specified amount. For example, if you set the minimum cost impact to 100, only anomalies with a cost impact greater than $100 will be detected and reported.

2. Minimum Cost Impact (Percentage)

Similar to the above, this setting enables you to define a threshold based on the percentage of cost increase. Anomalies will only be flagged if the cost increase exceeds the specified percentage of the baseline cost. For example, if you set it to 5%, anomalies that cause a cost increase greater than 5% of the usual baseline cost will be reported.

3. Anomaly Persistence

This setting allows the system to adjust the baseline cost of a resource if an anomaly persists beyond a specified number of days. If an anomaly is not resolved and continues to impact costs for the set duration, the resource's baseline cost is updated to reflect the higher cost. This helps maintain an accurate representation of the resource's true cost over time, ensuring that future anomalies are detected against the adjusted baseline.

<DocVideo src="https://app.tango.us/app/embed/1ccb1269-f454-40cc-876e-cb4ab0301896?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Preferences" />