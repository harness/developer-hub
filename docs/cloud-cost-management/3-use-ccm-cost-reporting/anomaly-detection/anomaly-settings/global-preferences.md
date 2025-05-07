---
title: Global Preferences for Anomaly Detection
description: Learn how to configure organization-wide settings for cloud cost anomaly detection in Harness CCM.
sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

# Global Preferences for Anomaly Detection

Harness CCM allows you to fine-tune how cost anomalies are detected and reported across your organization. By configuring global preferences, you can ensure that only meaningful anomalies are flagged for review, reducing noise and focusing attention on cost variations that truly matter.

## Accessing Global Preferences


To configure anomaly detection preferences:

1. Navigate to **CCM** > **Anomalies**
2. Click on the **Settings** tab, then **Preferences** tab.
3. Available Configuration Options:

<DocImage path={require('../static/anomalies-preferences.png')} width="60%" height="60%" title="Anomaly Detection Global Preferences" />

<div class="preferences-table">

| Setting | Description | Configuration |
|---------|-------------|---------------|
| **Minimum Cost Impact (Amount)** | Sets a dollar threshold for anomaly detection. Only cost variations exceeding this amount will be flagged. | Enter a specific dollar amount (e.g., $100) |
| **Minimum Cost Impact (Percentage)** | Sets a percentage threshold for anomaly detection. Only cost variations exceeding this percentage of the baseline will be flagged. | Enter a percentage value (e.g., 5%) |
| **Anomaly Persistence** | Determines when the system should adjust its baseline expectations if an anomaly persists over time. | Enter a number of days (e.g., 14) |

</div>

## How These Settings Work Together

These three settings work in combination to create a balanced anomaly detection system:

- **Amount and Percentage Thresholds**: An anomaly must exceed EITHER the minimum amount OR the minimum percentage to be detected (not both)
- **Persistence**: Only affects how the system adjusts its baseline over time, not whether an anomaly is initially detected

