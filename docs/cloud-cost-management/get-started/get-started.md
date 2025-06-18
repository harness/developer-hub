
---
title: Get started
description: Learn how to get started with Harness Cloud Cost Management (CCM).
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the Harness IaCM onboarding guide. Discover how Harness streamlines and secures your infrastructure management with Infrastructure as Code Management (IaCM).

## What is Cloud Cost Management?
Harness Cloud Cost Management (CCM) helps you gain visibility into cloud and Kubernetes spend, identify cost-saving opportunities, and implement proactive guardrails. Unlike standalone cost explorers or manual reports, CCM unifies your cost data across cloud providers and Kubernetes clusters within your CI/CD workflows—making it easier to take action.

Follow these steps to connect your cloud infrastructure and start visualizing your spend within minutes.

### Prerequisites
- A Harness project with CCM enabled.
- Access to your cloud provider's billing and IAM settings.
- Permissions to create billing exports and read cost data.

## 1. Add a Cloud Provider Connector
<Tabs>
<TabItem value="interactive-guide" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/6b42eeea-c39c-4a4f-b8da-8c7021e0cff2?makeViewOnly=true&hideAuthorAndDetails=true" title="Add Cloud Costs Connector in Harness" />
</TabItem>
<TabItem value="step-by-step" label="Step-by-Step">
1. Go to **Account Settings** > **Connectors**.
2. Select **New Connector**.
3. Under **Cloud Costs**, select your cloud provider, e.g. AWS, Azure, GCP, or Kubernetes.
4. Perform the following tasks in the selected cloud provider connector wizard.
</TabItem>
</Tabs>

## 2. Set up Billing Exports
<Tabs groupId="cloud-provider" queryString>
<TabItem value="aws" label="AWS">
1. Create a Cost and Usage Report (CUR) in the **AWS Billing console**.
2. Enable hourly granularity and include resource IDs.
3. Export the report to an S3 bucket.
</TabItem>
<TabItem value="azure" label="Azure">
1. In **Azure Portal**, configure Billing Exports to a storage account.
2. Ensure the export includes resource and tag-level data.
</TabItem>
<TabItem value="gcp" label="GCP">
1. In **GCP Console**, enable the BigQuery Billing Export.
2. Choose a linked project and dataset to store billing data.
</TabItem>
</Tabs>

:::info billing exports not required
Billing exports are not required for CCM to function with Kubernetes.
:::

## 3. Select requirements
<Tabs groupId="cloud-provider" queryString>
<TabItem value="aws" label="AWS">
1. Choose between **Account-level** or **Organization-level** visibility.
2. Decide whether to include linked accounts and tags.
</TabItem>
<TabItem value="azure" label="Azure">
1. Select **Subscription(s)** or **Management Group(s)** to monitor.
2. Enable tag ingestion if needed.
</TabItem>
<TabItem value="gcp" label="GCP">
1. Define the scope: **Billing Account**, **Project**, or **Folder**.
2. Enable label ingestion if required.
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">
1. Specify the cluster name and namespace scope.
2. Choose which metrics to ingest (CPU, memory, etc.).
</TabItem>
</Tabs>

## 4. Configure access / permissions
<Tabs groupId="cloud-provider" queryString>
<TabItem value="aws" label="AWS">
1. Ensure the IAM role has access to S3, CUR, and Cost Explorer APIs.
2. View AWS policy requirements →
</TabItem>
<TabItem value="azure" label="Azure">
1. Grant Reader access on the subscription or management group.
2. Assign the Cost Management Reader and Storage Blob Reader roles.
</TabItem>
<TabItem value="gcp" label="GCP">
1. The service account needs BigQuery Data Viewer and Billing Account Viewer roles.
</TabItem>
<TabItem value="kubernetes" label="Kubernetes">
1. The Helm chart grants required access automatically.
2. You can customize RBAC via values.yaml if needed.
</TabItem>
</Tabs>

:::tip
Harness CCM follows least-privilege best practices. All permissions are scoped to read-only access needed for billing data ingestion.
[Learn more about how CCM accesses and ingests billing data →](/docs/cloud-cost-management/get-started/onboarding-guide/external-data-ingestion/)
:::

## 5. Test the Connection
Once your connector and billing exports are configured, return to the **Connectors** page in Harness and use the **Test Connection** button to validate setup.

For Kubernetes, navigate to **Cloud Cost Management > Clusters** to verify that the agent is sending metrics and the cluster is marked as active.

:::note
Cost data may take up to 24 hours to appear depending on your cloud provider’s billing export cadence.
:::

## What's Next?
You've successfully connected your cloud provider and enabled billing visibility. You can now:
- View your Cloud Cost Dashboards.
- Set up Budgets and Alerts.
- Explore Workload Optimization for Kubernetes.
