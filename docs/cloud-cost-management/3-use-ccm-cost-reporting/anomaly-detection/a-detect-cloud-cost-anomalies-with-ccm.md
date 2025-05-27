---
title: Detect cloud cost anomalies
description: Harness Cloud Cost Management (CCM) detects cost anomalies for your Kubernetes clusters and cloud accounts. Cloud cost anomaly detection can be used as a tool to keep cloud costs under control. It al…
# sidebar_position: 2
helpdocs_topic_id: x0z3r0bv99
helpdocs_category_id: jqk71thuxh
helpdocs_is_private: false
helpdocs_is_published: true
---
## Introduction

Infrastructure changes, the introduction of new services, or inefficient resource utilization can lead to unexpected fluctuations in cloud expenses. The Harness Cloud Cost Management (CCM) anomaly detection feature is designed to identify instances of unusually high spikes and promptly notify users, ensuring better cost control and transparency.

Harness CCM leverages advanced detection mechanisms to monitor cost anomalies across your Kubernetes clusters and cloud accounts. This feature acts as a safeguard for managing cloud costs effectively. Additionally, it includes built-in alerting capabilities, sending notifications through notification channels including email and Slack to ensure stakeholders are informed as soon as anomalies are detected.

Currently, anomalies are detected at the following scope:

- AWS: Account, Service, Usage Type
- GCP: Project, Product, SKU
- Azure: Subscription, Meter Category, Resource Group

<DocImage path={require('../static/anomalies-overview.png')} width="80%" height="80%" title="Click to view full size image" />

## Anomaly workflows

Any anomaly from the list will exist in one of the three states at any given point in time:

- Active: All the anomalies that are currently active and have not been taken any action on are marked as Active. Every new anomaly detected is first in “Active” state by default.

- Resolved: An anomaly that has been resolved is marked as “Resolved”.

- Ignored: An anomaly that has been marked as ignored will appear in the Ignored list. Ignored anomalies are not actively flagged but remain visible for reference.

- Archived: An anomaly is automatically moved to the Archived list once it is more than 90 days old.

The Archived/Ignored page provides details about anomalies in both states, including the estimated total cost impact, the number of anomalies ignored, and the number archived.

<DocImage path={require('../static/anomalies-workflows.png')} width="80%" height="80%" title="Click to view full size image" />
<DocImage path={require('../static/anomalies-two.png')} width="80%" height="80%" title="Click to view full size image" />

## Anomaly Notifications

It might not always be possible to keep an eye out on the homepage to check for anomalies and some anomalies might need urgent attention. For this reason, Harness CCM provides an option to set alerts for all anomalies for a particular account or specific resources. 

<DocImage path={require('../static/anomalies-notifications.png')} width="80%" height="80%" title="Click to view full size image" />

While setting up a new alert, following can be selected:
- Scope: Scope for which the anomaly needs to be alerted for. This can be either for all account data that the user has access to or the user can specify perspectives for which anomaly alerts will be sent.
- Configuring the anomaly alert: Alert conditions follow your set preferences. You may override these thresholds, but only to increase them. Currently, the user can set thresholds for “Alert when cost difference is over ($)” and/or “Alert when cost difference is over (%)” depending on whether they want to define a specific cost amount or a cost percentage.
- Alert Channel: Currently, Harness CCM supports Slack and/or e-mail as possible methods of sending alerts.

## Anomaly Global preferences

Harness CCM allows users to configure how cost anomalies are detected and reported, ensuring that only significant anomalies are flagged for review. Here’s an explanation of the configurable options:

1. Minimum Cost Impact (Amount)

This setting allows you to set a threshold for the cost impact, meaning that anomalies will only be shown if the financial impact exceeds the specified amount. For example, if you set the minimum cost impact to 100, only anomalies with a cost impact greater than $100 will be detected and reported.

2. Minimum Cost Impact (Percentage)

Similar to the above, this setting enables you to define a threshold based on the percentage of cost increase. Anomalies will only be flagged if the cost increase exceeds the specified percentage of the baseline cost. For example, if you set it to 5%, anomalies that cause a cost increase greater than 5% of the usual baseline cost will be reported.

3. Anomaly Persistence

This setting allows the system to adjust the baseline cost of a resource if an anomaly persists beyond a specified number of days. If an anomaly is not resolved and continues to impact costs for the set duration, the resource's baseline cost is updated to reflect the higher cost. This helps maintain an accurate representation of the resource's true cost over time, ensuring that future anomalies are detected against the adjusted baseline.

<DocImage path={require('../static/anomalies-preferences.png')} width="60%" height="60%" title="Click to view full size image" />

## How Does Cloud Anomaly Detection Work in Harness CCM?

### Anomaly Detection Process
The anomaly detection process works by first gathering historical cost data (42 days of data) and using it to calculate the expected cost for the current day. It then compares the expected cost against the actual cost for that day to determine if an anomaly exists.

- Data Collection: CCM collects historical cost data (from the last 42 days) for each cluster.

- Processing: Then, CCM processes this data using two ML models internally to flag any outlier costs and predict expected costs for the day and compares it with actual costs to flag anomalies.

### Machine Learning Forecasting

In addition to statistical models, CCM uses BigQuery ML (BQML) to apply machine learning-based anomaly detection:
A model is created using cost data and this model is recreated every weekend and used throughout the week to forecast the next 8 days' costs for each entity (AWS account, GCP project, Azure subscription, etc.).
Once the model is created, the system uses it to check for anomalies by comparing predicted costs with actual costs, applying a threshold to detect anomalies.

### Anomaly Drilldown
Once an anomaly is detected, for each of the anomaly detected, CCM provides insights into what are the resources which might be causing the anomaly. CCM queries the cloud provider's cost data, and identifies resources that have experienced significant cost increases compared to previous periods. CCM aggregates the total costs for each resource, computes the cost increase (or decrease) compared to the previous day, and orders the results by the highest increase in cost, helping to detect resources that have experienced significant cost spikes.
Detected anomalies are stored in a time series database and are available for review and analysis. Each anomaly is assigned metadata, such as the reported cost, expected cost, and anomaly score.
The final anomalies are flagged for further investigation, allowing users to take corrective action as needed.

<DocImage path={require('../static/anomalies-drilldown.png')} width="80%" height="80%" title="Click to view full size image" />

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

### Anomalies Filtering Support

Harness provides filtering support for anomalies based on cloud account identifiers. This ensures that anomaly detection aligns with perspective-based access control (RBAC) settings.  

#### Filtering Support by Cloud Provider  

- **AWS**: Filtering supported on AWS Account ID. Nested Cost Categories are not supported.  

- **GCP**: Filtering supported on GCP Project ID. Nested Cost Categories are not supported.  

- **Azure**: Filtering supported on Azure Subscription ID. Nested Cost Categories are not supported.  



