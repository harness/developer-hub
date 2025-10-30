---
title: Detect Anomalies using Harness CCM
description: Harness Cloud Cost Management (CCM) detects cost anomalies for your Kubernetes clusters and cloud accounts. Cloud cost anomaly detection can be used as a tool to keep cloud costs under control.
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from: 
- /docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/a-detect-cloud-cost-anomalies-with-ccm
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';


## Introduction

Infrastructure changes, new services, or inefficient resource utilization can lead to **unexpected fluctuations in cloud expenses**. Harness Cloud Cost Management (CCM) anomaly detection identifies **unusually high cost spikes** and promptly **notifies users**, ensuring better **cost control** and **transparency**.

Harness CCM leverages **advanced detection mechanisms** to monitor cost anomalies across your **Kubernetes clusters** and **cloud accounts**. This feature acts as a safeguard for **managing cloud costs effectively**. Additionally, it includes **built-in alerting capabilities**, sending notifications through notification channels including **email** and **Slack** to ensure stakeholders are informed as soon as anomalies are detected.

<DocVideo src="https://app.tango.us/app/embed/492131d4-a5ea-45e2-bf96-654db9ddf2f1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Detection in Harness CCM" />

## Get Started

Getting started with CCM anomaly detection is straightforward and requires just a few steps:

1. **Set up a Cloud Cost Connector** - Connect your cloud provider accounts (AWS, GCP, Azure) to Harness CCM using the appropriate connectors.

2. **Allow Data Collection** - Once connected, Harness will automatically begin collecting cost data from your cloud environments. The system requires approximately 42 days of historical data for optimal anomaly detection.

3. **Automatic Anomaly Detection** - After data starts flowing in, the anomaly detection system will automatically begin analyzing your cost patterns and identifying potential anomalies. No additional configuration is required for basic anomaly detection.

## Anomaly Detection Process 

:::info Important

Harness CCM offers three sophisticated machine learning models for anomaly detection:

* **Prophet Model (Default)** - Analyzes 42 days of historical data to establish baseline patterns and detect anomalies. This model is enabled by default for all customers.

* **BQML and Seasonal Prophet Models** - These advanced models utilize 16 months of historical data for enhanced pattern recognition and seasonal trend analysis. These models are behind feature flags and are available upon request through [Harness Support](mailto:support@harness.io).

:::


CCM's anomaly detection process works through a sophisticated two-stage verification system:

1. **Data Collection**: CCM collects 42 days of historical cost data for each cluster and cloud account
2. **Analysis and Detection**: 

    - **Stage 1: Statistical Analysis Model**
        The first stage employs a statistical model that establishes a baseline by analyzing historical spending patterns. Using 42 days of data with the default Prophet model, it calculates key metrics like mean costs, standard deviations, and seasonal patterns. This creates a "normal spending corridor" based on these historical patterns, accounting for typical day-to-day and week-to-week fluctuations in your cloud costs.
        
        The system then performs multi-dimensional evaluation of current costs against this baseline using three different methods. The absolute check examines the raw dollar difference between actual and expected costs. The relative check analyzes percentage deviations from expected costs. The probabilistic check calculates the statistical likelihood of the observed cost occurring naturally given your historical patterns. If costs exceed thresholds in any of these dimensions, the expense is flagged as a potential anomaly for further verification.

    - **Stage 2: Time Series Forecasting Model**
        Only expenses flagged in Stage 1 undergo this more rigorous analysis. The system applies sophisticated time series forecasting (using the Prophet model by default) to predict expected costs with higher precision. This advanced prediction considers seasonal patterns, trends, and cyclical behaviors in your spending history to create a more nuanced expectation of normal costs.

        The model then evaluates whether the actual cost falls outside its predicted confidence interval. This provides probabilistic evidence about whether the observed cost is truly unusual. Only costs confirmed as anomalous by both models are surfaced as actual anomalies requiring attention, ensuring you only receive alerts for genuinely unusual spending patterns.
        <DocImage path={require('./static/process.png')} width="100%" height="100%" title="Click to view full size image" />


3. **Notification**: When anomalies are detected, [alerts](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/getting-started-with-ccm-anomaly-detection#anomaly-alerts) are sent through configured channels


:::info Event-Driven Anomaly Detection (Behind Feature Flag)
        
        CCM also offers an advanced feature under a feature flag for AWS, GCP, and Azure that enables real-time anomaly detection:
        
        - Anomaly detection runs immediately when cost data is ingested, without waiting for the next day
        - Works with partial cost data as it becomes available throughout the day
        - Detection is limited to the specific cloud account receiving the cost ingestion event
        - If no anomalies are detected on partial data, standard day-1 jobs will still run to ensure complete analysis

    **Example**: If today is November 1st and a cost ingestion event is received, anomaly detection runs immediately for November 1st data for that specific cloud account. If complete data becomes available the next day, regular jobs will still process it to ensure accuracy.
:::

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
    - Anomaly severity: [Low, Medium, High, Critical](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/getting-started-with-ccm-anomaly-detection#q---how-are-anomaly-severity-levels-determined-and-what-do-they-mean)
    - Details:
        - **Start Date**: When the anomaly was first detected
        - **End Date**: When the anomaly period concluded
        - **Duration**: Total time span of the anomalous behavior
        - **Cost Impact**: Financial difference between expected and actual costs
        - **Total Spend**: Complete expenditure during the anomaly period
        - **Expected Range**: Predicted cost range based on historical patterns
    - Cost Trend and Anomalies visualization with historical data (30 or 90 days). This includes data such as:
        - **Anomaly Threshold**: Upper and lower bounds that define normal spending behavior
        - **Expected Average Spend**: Predicted daily cost based on historical patterns
        - **Anomalous Spend**: Costs that exceeded the normal threshold range
        - **Spend within Range**: Daily expected costs
    - Top resource changes contributing to the anomaly
    - Feedback options to improve detection accuracy:
        - **True Expected**: The cost increase was anticipated
        - **True Unexpected**: The cost increase was not anticipated
        - **False**: The system incorrectly identified this as an anomaly

    This feedback helps refine the anomaly detection algorithms for more accurate results over time.


<Tabs>
<TabItem value="screenshot" label="Drilldown Window" default>

<DocImage path={require('./static/drilldown.png')} width="100%" height="100%" title="Click to view full size image" />


</TabItem>
<TabItem value="video" label="Interactive Walkthrough">

<DocVideo src="https://app.tango.us/app/embed/c2f0d526-f77e-4303-be51-a98c4bf2de88?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Drilldown" />

</TabItem>
</Tabs>

## Advanced Settings

### Anomaly Alerts

Set up alerts to receive notifications when anomalies are detected without having to check the dashboard. Configuration Options available:

- **Scope**: Select all account data or specific perspectives for anomaly alerts. 
- **Configure the anomaly alert**: Alert conditions follow your set preferences. You may override these thresholds, but only to increase them. Currently, the user can set thresholds for “Alert when cost difference is over ($)” and/or “Alert when cost difference is over (%)” depending on whether they want to define a specific cost amount or a cost percentage.
- **Alert Channel**: Currently, Harness CCM supports Slack and/or e-mail as possible methods of sending alerts.

<Tabs>
<TabItem value="screenshot" label="Alerts Window" default>

<DocImage path={require('./static/alert.png')} width="100%" height="100%" title="Click to view full size image" />

</TabItem>
<TabItem value="video" label="Interactive Walkthrough">

<DocVideo src="https://app.tango.us/app/embed/3536272f-5e99-4280-a983-81f710de4199?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Alerts" />

</TabItem>
</Tabs>

### Anomaly Preferences
Configure system-wide anomaly detection settings to ensure only significant anomalies are flagged:

**Available Settings:**

1. **Minimum Cost Impact (Amount)**: This setting allows you to set a threshold for the cost impact in USD, meaning that anomalies will only be shown if the financial impact exceeds the specified amount.
2. **Minimum Cost Impact (Percentage)**: Similar to the above, this setting enables you to define a threshold based on the percentage of cost increase. Anomalies will only be flagged if the cost increase exceeds the specified percentage of the baseline cost.
3. **Anomaly Persistence**: This setting allows the system to adjust the baseline cost of a resource if an anomaly persists beyond a specified number of days. If an anomaly is not resolved and continues to impact costs for the set duration, the resource's baseline cost is updated to reflect the higher cost. This helps maintain an accurate representation of the resource's true cost over time, ensuring that future anomalies are detected against the adjusted baseline.

<Tabs>
<TabItem value="screenshot" label="Preferences Window" default>

<DocImage path={require('./static/preferences.png')} width="100%" height="100%" title="Click to view full size image" />

</TabItem>
<TabItem value="video" label="Interactive Walkthrough">

<DocVideo src="https://app.tango.us/app/embed/1ccb1269-f454-40cc-876e-cb4ab0301896?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Preferences" />

</TabItem>
</Tabs>

## FAQs

<details>
<summary>What happens after CCM detects an anomaly and how does it help me identify the root cause?</summary>

CCM queries the cloud provider's cost data and identifies resources that have experienced significant cost increases compared to previous periods. The system:

- Aggregates total costs for each resource
- Computes cost increases/decreases compared to the previous day
- Ranks resources by highest cost increase
- Stores anomalies in a time series database with metadata (reported cost, expected cost, anomaly score)
- Flags anomalies for investigation and corrective action

</details>

<details>
<summary> How can I filter anomalies by cloud provider?</summary>

Harness provides filtering support for anomalies based on cloud account identifiers, ensuring alignment with perspective-based access control (RBAC) settings.

**Filtering Support by Cloud Provider:**

| Cloud Provider | Supported Filter | Limitations |
|----------------|------------------|-------------|
| **AWS** | AWS Account ID | Nested Cost Categories not supported |
| **GCP** | GCP Project ID | Nested Cost Categories not supported |
| **Azure** | Azure Subscription ID | Nested Cost Categories not supported |


</details>

<details>
<summary>How are anomaly severity levels determined and what do they mean?</summary>

Anomalies are categorized by severity based on deviation from expected behaviour:

| Severity | Description |
|----------|-------------|
| **Low** | Minor deviations |
| **Medium** | Noticeable change, warrants review |
| **High** | Significant impact or deviation |
| **Critical** | Large cost jumps, requires immediate investigation |

</details>
<details>
<summary>Why wasn’t my cost flagged as an anomaly even though it looked unusual?</summary>

Harness Anomaly Detection uses a two-step process to identify anomalies in your cloud spend. At times, customers may notice that a cost spike is flagged on one day but not on the following day, even if the second day shows a higher spend. Here’s why this happens:

**How anomaly detection works**

- Statistical Model – We compute an expected cost range using historical time-series data. A cost data point is flagged as a potential anomaly if it lies outside this expected range with over 98% confidence.

- Forecasting Model – If the statistical model flags a point, we then validate it against a time-series forecasting model. 

**Only if both models agree do we confirm and surface it as an anomaly.**

Historical Adjustment – To avoid false positives, the model adapts dynamically based on recent spending patterns. We typically use the past 42 days of data when making these adjustments.

**Why one day was flagged but the next was not?**

When a sudden spike in spend occurs, it may be flagged as an anomaly because it lies well outside the normal range. However, once the model detects such a spike, it adjusts its understanding of what “normal” looks like for subsequent days.

- Day 1 (spike): Spend is much higher than the historical range → flagged as anomalous.
- Day 2 (still high, but after adjustment): The model now incorporates the spike into its forecast. If the next day’s spend falls within this new adjusted range, it may no longer be considered anomalous, even if it looks high compared to older baselines.

</details>

<details>
<summary> I received an anomaly alert for a particular day, but not on that day, it came later in the month. Why?</summary>

This can happen because anomaly alerts are triggered when the anomaly is detected, not when it occurred. There's no delay between detection and alerting. However, if the cost data available at the time didn't indicate an anomaly, the system wouldn't have flagged it initially. Later in the month, once cost data was refreshed and a spike became apparent, the anomaly was detected. To account for such cases, we rerun the anomaly detection job for the past 3 days — which is likely why the alert was sent at a later time.
</details>

<details>
<summary> Does our anomaly detection just look at cost, or can it also look at usage?</summary>

Currently, anomaly detection only monitors cost.
</details>