---
title: Configuring Anomaly Alerts
description: Learn how to set up and manage notifications for cloud cost anomalies in Harness CCM.
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---

# Configuring Anomaly Alerts

Staying informed about cost anomalies is critical for effective cloud cost management. While the Harness CCM dashboard provides a comprehensive view of detected anomalies, you may not always have time to monitor it continuously. Anomaly alerts ensure you're promptly notified when significant cost spikes occur, allowing for quick remediation.

## Benefits of Setting Up Anomaly Alerts

- **Proactive Cost Management**: Get notified about cost spikes before they significantly impact your budget
- **Targeted Notifications**: Configure alerts for specific cloud accounts or resources
- **Customizable Thresholds**: Set dollar and percentage thresholds that align with your organization's priorities
- **Multi-channel Delivery**: Receive alerts via Slack, email, or both

## Creating a New Anomaly Alert

<DocImage path={require('../static/anomalies-notifications.png')} width="80%" height="80%" title="Anomaly Alert Configuration Screen" />

Follow these steps to set up a new anomaly alert:

1. Navigate to **CCM** > **Anomalies**
2. Click on the **Settings** tab, then **Alerts** tab.
3. Select **+ New Alert**
4. Configure the following settings:

<div class="alert-config-section">

#### Alert Scope

Define which cloud resources to monitor for anomalies:

| Option | Description |
|--------|-------------|
| **All Account Data** | Monitor all cloud accounts you have access to |
| **Specific Perspectives** | Select particular perspectives to focus monitoring |

> **Tip**: For large organizations, creating multiple targeted alerts by team, project, or environment often works better than a single broad alert.

#### Alert Thresholds

Specify the conditions that will trigger an alert notification:

| Threshold Type | Description | Example |
|----------------|-------------|--------|
| **Cost Difference (Amount)** | Monetary amount threshold | Alert when cost difference exceeds $500 |
| **Cost Difference (Percentage)** | Cost difference in percentage | Alert when cost difference exceeds 20% |

> **Note**: Alert conditions initially follow your global preferences, but you can override these thresholds (only to increase them) for specific alerts.

#### Notification Channels

Choose how you want to receive alert notifications:

| Channel | Description |
|---------|-------------|
| **Slack** | Notifications sent to your configured Slack channel |
| **Email** | Notifications sent to specified email addresses (multiple recipients can be added) |

</div>

## Managing Existing Alerts

You can view and manage all your configured alerts from the Alerts tab:

- **Edit**: Modify the scope, thresholds, or notification channels
- **Disable/Enable**: Temporarily turn alerts on or off without deleting them
- **Delete**: Permanently remove an alert configuration
