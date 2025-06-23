---
title: Get Started with Anomalies
description: Learn how to configure and use Harness Cloud Cost Management (CCM) anomaly detection features for your cloud environments.
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- 
<DocImage path={require('../static/anomalies-overview.png')} width="80%" height="80%" title="Click to view full size image" /> -->

# Getting Started with CCM Anomaly Detection

## Simple Setup Process

Getting started with CCM anomaly detection is straightforward and requires just a few steps:

1. **Set up a Cloud Cost Connector** - Connect your cloud provider accounts (AWS, GCP, Azure) to Harness CCM using the appropriate connectors.

2. **Allow Data Collection** - Once connected, Harness will automatically begin collecting cost data from your cloud environments. The system requires approximately 42 days of historical data for optimal anomaly detection.

3. **Automatic Anomaly Detection** - After data starts flowing in, the anomaly detection system will automatically begin analyzing your cost patterns and identifying potential anomalies. No additional configuration is required for basic anomaly detection.

> **Note:** The anomaly detection system becomes more accurate over time as it collects more data about your cloud spending patterns.
