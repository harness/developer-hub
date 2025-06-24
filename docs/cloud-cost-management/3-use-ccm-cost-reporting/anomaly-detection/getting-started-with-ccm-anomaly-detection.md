---
title: Get Started with Anomalies
description: Learn how to configure and use Harness Cloud Cost Management (CCM) anomaly detection features for your cloud environments.
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---


## What is Cloud Cost Anomaly Detection?

Infrastructure changes, the introduction of new services, or inefficient resource utilization can lead to unexpected fluctuations in cloud expenses. The Harness Cloud Cost Management (CCM) anomaly detection feature is designed to identify instances of unusually high spikes and promptly notify users, ensuring better cost control and transparency.

Harness CCM leverages advanced detection mechanisms to monitor cost anomalies across your Kubernetes clusters and cloud accounts. This feature acts as a safeguard for managing cloud costs effectively. Additionally, it includes built-in alerting capabilities, sending notifications through notification channels including email and Slack to ensure stakeholders are informed as soon as anomalies are detected.

The anomaly detection process works by first gathering historical cost data (42 days of data) and using it to calculate the expected cost for the current day. It then compares the expected cost against the actual cost for that day to determine if an anomaly exists.

- Data Collection: CCM collects historical cost data (from the last 42 days) for each cluster.

- Processing: Then, CCM processes this data using two ML models internally to flag any outlier costs and predict expected costs for the day and compares it with actual costs to flag anomalies.

In addition to statistical models, CCM uses BigQuery ML (BQML) to apply machine learning-based anomaly detection.

A model is created using cost data and this model is recreated every weekend and used throughout the week to forecast the next 8 days' costs for each entity (AWS account, GCP project, Azure subscription, etc.).
Once the model is created, the system uses it to check for anomalies by comparing predicted costs with actual costs, applying a threshold to detect anomalies.

<DocVideo src="https://app.tango.us/app/embed/492131d4-a5ea-45e2-bf96-654db9ddf2f1" title="Anomaly Detection in Harness CCM" />

# Get Started with CCM Anomaly Detection

Getting started with CCM anomaly detection is straightforward and requires just a few steps:

1. **Set up a Cloud Cost Connector** - Connect your cloud provider accounts (AWS, GCP, Azure) to Harness CCM using the appropriate connectors.

2. **Allow Data Collection** - Once connected, Harness will automatically begin collecting cost data from your cloud environments. The system requires approximately 42 days of historical data for optimal anomaly detection.

3. **Automatic Anomaly Detection** - After data starts flowing in, the anomaly detection system will automatically begin analyzing your cost patterns and identifying potential anomalies. No additional configuration is required for basic anomaly detection.

> **Note:** The anomaly detection system becomes more accurate over time as it collects more data about your cloud spending patterns.
