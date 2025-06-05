---
title: Getting Started
description: Learn how to set up and start using Harness CCM's anomaly detection to monitor and control your cloud costs effectively.
sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

## Prerequisites

- A Harness account with CCM module enabled
- Admin or appropriate permissions to create connectors and configure CCM settings
- Access to your cloud provider credentials (AWS, GCP, Azure, or Kubernetes)

## Step 1: Set Up Your CCM Connector

1. Navigate to the **Account Settings** -> **Integration for Cloud Cost**
2. Click **+ New Cluster/Cloud Account**
3. Select your cloud provider (AWS, GCP, Azure, or Kubernetes)
4. Follow the [provider-specific instructions](https://developer.harness.io/docs/category/onboarding) to complete the connector setup
5. Ensure you enable cost visibility permissions during setup

## Step 2: Wait for Data Collection

After your connector is set up and verified:

- CCM will begin collecting cost data from your cloud provider.
- For accurate anomaly detection, CCM requires at least **42 days** of historical cost data
- Initial data processing may take 24-48 hours to complete
- You can verify data collection by checking the **Cost Explorer** section

## Step 3: Configure Anomaly Settings (Optional)

### Alerts 

Set up notifications to be alerted when anomalies are detected: [Set up notifications to be alerted]((/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/anomaly-settings/anomaly-alerts)).

### Global Preferences 

Set up Global Preferences for anomaly detection.: [Set up Global Preferences](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/anomaly-settings/global-preferences) 

## Step 4: Start Monitoring Anomalies

1. Navigate to **CCM** > **Anomalies**
2. The dashboard will display any detected anomalies categorized as:
   - **Active**: Currently occurring anomalies
   - **Resolved**: Anomalies that have been addressed
   - **Ignored**: Anomalies you've chosen to disregard
   - **Archived**: Anomalies older than 90 days
3. Click on any anomaly to [view detailed information](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/overview#anomaly-drilldown`) and take action

## Next Steps

- [Understanding Anomaly Workflows](/docs/cloud-cost-management/3-use-ccm-cost-reporting/anomaly-detection/anomaly-workflows.md)
- [Analyzing Anomaly Details](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/overview#anomaly-drilldown)
