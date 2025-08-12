---
title: Overview
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Overview
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Dashboards are a collection of charts and data tables with filters that you can use to get at the data you are interested. Dashboards serve as a platform for data modeling and analytics using a combination of available business metrics and operational data. You can use this data to make data-driven, informed business decisions.

Harness provides pre-loaded **By Harness** (pre-defined) and **Custom** (user-defined) dashboards to visualize cloud cost data across clusters and cloud accounts.

## Access the CCM dashboards

To access the dashboards from the CCM module, perform the following steps:

1. In the **Harness** application, click **Cloud Costs**.
2. Click **BI Dashboards**. 
3. Select the cloud provider to view the dashboards available for the specific cloud provider.
4. Click the required tile.

:::important note
The data scan limit is 350 GB per query. Users can avoid hitting this limit by applying necessary filters to reduce the result-set as per their requirements.
:::

## Prerequisites

* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](/docs/cloud-cost-management/access-control/manage-access-control-for-ccm-dashboards.md).
* Ensure that you have set up Cloud Cost Management (CCM) (for your cloud provider) [Set up cost visibility for AWS](../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md).
* Ensure that you have added all the required permissions for your cloud provider. The data available in the Dashboard depends on the permissions you provided to the cloud provider when setting up the CCM. For more information, see [Select Features](../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md#aws-access-permissions).

After setting up cost visibility for the cloud provider and the data is available in the Perspective, you can view the dashboard. The data in the Dashboard is updated dynamically.

<DynamicMarkdownSelector
  options={{
    Kubernetes: {
      path: "/cloud-cost-management/content/dashboard/kubernetes.md",
      logo: "/cloud-providers/kubernetes-logo.svg",
      logoSize: 32
    },
    AWS: {
      path: "/cloud-cost-management/content/dashboard/aws.md",
      logo: "/cloud-providers/aws-logo.svg",
      iconOnly: true,
      logoSize: 40
    },
    GCP: {
      path: "/cloud-cost-management/content/dashboard/gcp.md",
      logo: "/cloud-providers/gcp-logo.svg",
      logoSize: 32
    },
    Azure: {
      path: "/cloud-cost-management/content/dashboard/azure.md",
      logo: "/cloud-providers/azure-logo.svg",
      logoSize: 32
    }
  }}
  toc = {toc}
/>

### See Also

Once you have set up cost visibility for your Kubernetes clusters, AWS, GCP, and Azure cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](/docs/platform/dashboards/create-dashboards)
* [Create Visualizations and Graphs](/docs/platform/dashboards/create-visualizations-and-graphs)
* [Use Dashboard Actions](/docs/platform/dashboards/use-dashboard-actions)
* [Download Dashboard Data](/docs/platform/dashboards/download-dashboard-data)
* [Create Conditional Alerts](/docs/platform/dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](/docs/platform/dashboards/share-dashboards)

