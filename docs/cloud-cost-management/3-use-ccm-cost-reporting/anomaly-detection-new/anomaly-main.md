---
title: Anomaly Detection in CCM
description: Harness Cloud Cost Management (CCM) detects cost anomalies for your Kubernetes clusters and cloud accounts. Cloud cost anomaly detection can be used as a tool to keep cloud costs under control.
helpdocs_is_private: false
helpdocs_is_published: true
---

## Introduction

Infrastructure changes, new services, or inefficient resource utilization can lead to **unexpected fluctuations in cloud expenses**. Harness Cloud Cost Management (CCM) anomaly detection identifies **unusually high cost spikes** and promptly **notifies users**, ensuring better **cost control** and **transparency**.

Harness CCM leverages **advanced detection mechanisms** to monitor cost anomalies across your **Kubernetes clusters** and **cloud accounts**. This feature acts as a safeguard for **managing cloud costs effectively**. Additionally, it includes **built-in alerting capabilities**, sending notifications through notification channels including **email** and **Slack** to ensure stakeholders are informed as soon as anomalies are detected.

<DocVideo src="https://app.tango.us/app/embed/492131d4-a5ea-45e2-bf96-654db9ddf2f1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Detection in Harness CCM" />

## Get Started

Getting started with CCM anomaly detection is straightforward and requires just a few steps:

1. **Set up a Cloud Cost Connector** - Connect your cloud provider accounts (AWS, GCP, Azure) to Harness CCM using the appropriate connectors.

2. **Allow Data Collection** - Once connected, Harness will automatically begin collecting cost data from your cloud environments. The system requires approximately 42 days of historical data for optimal anomaly detection.

3. **Automatic Anomaly Detection** - After data starts flowing in, the anomaly detection system will automatically begin analyzing your cost patterns and identifying potential anomalies. No additional configuration is required for basic anomaly detection.

## How Anomaly Detection Works

CCM's anomaly detection process works through these key steps:

```mermaid
flowchart LR
    A["Data Collection (42 days history)"] --> B["Analysis (ML models)"] 
    B --> C["Detection (Compare actual vs predicted)"] 
    C --> D["Notification (Send alerts)"] 
    D --> E["User Action (Review & respond)"]
    style A fill:#d4f1f9,stroke:#05a4d2
    style B fill:#d4f1f9,stroke:#05a4d2
    style C fill:#d4f1f9,stroke:#05a4d2
    style D fill:#d4f1f9,stroke:#05a4d2
    style E fill:#ffd6a5,stroke:#ff9a3c
```

1. **Data Collection**: CCM collects 42 days of historical cost data for each cluster and cloud account
2. **Analysis**: The system processes this data using machine learning models to predict expected costs. CCM uses BigQuery ML (BQML) for advanced anomaly detection:
    -  Models are recreated weekly to forecast the next 8 days' costs for each entity.
    - Predicted costs are compared with actual costs using configurable thresholds.
    - Anomalies are flagged when costs exceed expected ranges.
3. **Detection**: Actual costs are compared against predicted costs to identify anomalies
4. **Notification**: When anomalies are detected, alerts are sent through configured channels

## Managing Anomalies

### Anomaly States

Anomalies exist in one of four states:

- **Active**: Newly detected anomalies that haven't been addressed yet
- **Resolved**: Anomalies that have been reviewed and marked as resolved
- **Ignored**: Anomalies that have been marked as ignored but remain visible for reference
- **Archived**: Anomalies automatically moved to archive after 90 days

### Anomaly Drilldown

Once an anomaly is detected, for each of the anomaly detected, CCM provides insights into what are the resources which might be causing the anomaly. 

When you select an anomaly, you'll see:

- Cloud account/cluster details (ID, service)
- Anomaly severity and management options
- Timeline information (start date, end date, duration)
- Financial impact (cost impact, total spend, expected range)
- Cost trend visualization with historical data (30 or 90 days)
- Top resource changes contributing to the anomaly
- Feedback options to improve detection accuracy:
    - **True Expected**: The cost increase was anticipated
    - **True Unexpected**: The cost increase was not anticipated
    - **False**: The system incorrectly identified this as an anomaly

    This feedback helps refine the anomaly detection algorithms for more accurate results over time.

<DocVideo src="https://app.tango.us/app/embed/c2f0d526-f77e-4303-be51-a98c4bf2de88?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Drilldown" />

## Advanced Settings

### Anomaly Alerts

Set up alerts to receive notifications when anomalies are detected without having to check the dashboard. Configuration Opetions available:

- **Scope**: Select all account data or specific perspectives for anomaly alerts
- **Thresholds**: Set dollar amount and/or percentage thresholds for alerts. You may override default thresholds, but only to increase them. 
- **Channels**: Choose between Slack and/or email to receive alerts.

<DocVideo src="https://app.tango.us/app/embed/3536272f-5e99-4280-a983-81f710de4199?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Alerts" />

### Anomaly Preferences
Configure system-wide anomaly detection settings to ensure only significant anomalies are flagged:

**Available Settings:**

1. **Minimum Cost Impact (Amount)**: Set a dollar threshold (e.g., $100) for anomaly reporting
2. **Minimum Cost Impact (Percentage)**: Set a percentage threshold (e.g., 5%) for cost increases
3. **Anomaly Persistence**: Define how many days an anomaly must persist before adjusting the baseline cost

<DocVideo src="https://app.tango.us/app/embed/1ccb1269-f454-40cc-876e-cb4ab0301896?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Preferences" />

## FAQs

#### What happens after CCM detects an anomaly and how does it help me identify the root cause?

CCM queries the cloud provider's cost data and identifies resources that have experienced significant cost increases compared to previous periods. The system:

- Aggregates total costs for each resource
- Computes cost increases/decreases compared to the previous day
- Ranks resources by highest cost increase
- Stores anomalies in a time series database with metadata (reported cost, expected cost, anomaly score)
- Flags anomalies for investigation and corrective action

#### How can I filter anomalies by cloud provider?

Harness provides filtering support for anomalies based on cloud account identifiers, ensuring alignment with perspective-based access control (RBAC) settings.

**Filtering Support by Cloud Provider:**

| Cloud Provider | Supported Filter | Limitations |
|----------------|------------------|-------------|
| **AWS** | AWS Account ID | Nested Cost Categories not supported |
| **GCP** | GCP Project ID | Nested Cost Categories not supported |
| **Azure** | Azure Subscription ID | Nested Cost Categories not supported |


#### How are anomaly severity levels determined and what do they mean?

Anomalies are categorized by severity based on deviation from expected behaviour:

| Severity | Description |
|----------|-------------|
| **Low** | Minor deviations, usually safe to ignore |
| **Medium** | Noticeable change—warrants review |
| **High** | Significant impact or deviation |
| **Critical** | Large cost jumps—requires immediate investigation |