---
title: BI Dashboards
description: Learn how to get started with CCM with your chosen cloud provider.
sidebar_position: 20
sidebar_label: Overview
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

BI Dashboards are a collection of charts and data tables with filters that you can use to get at the data you are interested. BI Dashboards serve as a platform for data modeling and analytics using a combination of available business metrics and operational data. You can use this data to make data-driven, informed business decisions.

Harness provides pre-loaded **[By Harness](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/overview#bi-dashboards-by-harness)** (pre-defined) and **[Custom](/docs/platform/dashboards/create-dashboards)** (user-defined) dashboards to visualize cloud cost data across clusters and cloud accounts.


## Before You Begin

* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](/docs/cloud-cost-management/access-control/manage-access-control-for-ccm-dashboards.md).
* Ensure that you have set up [Cloud Cost Management (CCM) for your cloud provider](../../get-started/onboarding-guide/set-up-cost-visibility-for-aws.md).

After setting up cost visibility for the cloud provider and the data is available in the Perspective, you can view the dashboard. The data in the Dashboard is updated dynamically.

## Creating Custom Dashboards

Harness BI Dashboards are available across all Harness modules as a platform-wide capability. This guide descibes Dashboard available by Harness for Cloud Costs. To create and customize your own dashboards, refer to the following comprehensive resources:

* [Create Dashboards](/docs/platform/dashboards/create-dashboards)
* [Create Visualizations and Graphs](/docs/platform/dashboards/create-visualizations-and-graphs)
* [Use Dashboard Actions](/docs/platform/dashboards/use-dashboard-actions)
* [Download Dashboard Data](/docs/platform/dashboards/download-dashboard-data)
* [Create Conditional Alerts](/docs/platform/dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](/docs/platform/dashboards/share-dashboards)

## Access the CCM dashboards

To access the dashboards from the CCM module, perform the following steps:

1. In the **Harness** application, click **Cloud Costs** > **BI Dashboards** or select **Dashboards** directly.
2. Click on **By Harness** to view the pre-defined dashboards available. The dashboards with "Cloud Costs" tags are pre-defined CCM dashboards.


## BI Dashboards by Harness

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
/>

