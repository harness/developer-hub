---
title: Use multiple tags in AWS dashboards
description: This topic explains how to use multiple tags in AWS.
# sidebar_position: 2
helpdocs_topic_id: hmj2vg5thi
helpdocs_category_id: v3h3y6pya6
helpdocs_is_private: false
helpdocs_is_published: true
---

Multiple tags in AWS dashboards can be used to filter and visualize data based on unique Tags and their values. This can be used to drill down the data for specific key values. If you filter `AWS: Multiple Tags - Key 1` with the environment or application, then `Dimension Value 1` will contain the values for that specific Tag. For example, the cost of `XYZ` application in the `ABC` cost center in the `QA` environment only.

:::note
For information on core Dashboard functionality, see [Create Dashboards](https://developer.harness.io/docs/platform/Dashboards/create-dashboards).
:::
This topic explains how to use Multiple Tags in AWS Dashboards.

## Prerequisites

* Ensure that you have **Dashboard-All View** permissions assigned. See [Manage Access Control for CCM Dashboards](../../2-getting-started-ccm/5-access-control/manage-access-control-for-ccm-dashboards.md).
* Ensure that you have set up Cloud Cost Management (CCM) for the [AWS](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md) cloud provider.
* Ensure that you have added all the required permissions for your cloud provider. The data available in the Dashboard depends on the permissions you provided to the AWS cloud provider when setting up the CCM. 
  
## Data Ingestion for Dashboard

Once you have set up cost visibility for the [AWS](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md) cloud provider and the data is available in the Perspective, you can view **AWS Cost Dashboard**. The data in the Dashboard is updated dynamically.

## Use Multiple Tags

1. Click **Edit Tile** in your AWS Dashboard.
2. In **All Fields**, click **AWS: Multiple Tags**.
   
     ![](./static/use-multiple-tags-in-aws-53.png)
3. In **Filter-only fields**, click **Key 1** and select the filters. Depending on your requirement, you can select filters for **Key 2** and/or **Key 3** also.
   
     ![](./static/use-multiple-tags-in-aws-54.png)
4. In **Dimensions**, click **Value 1**, **2**, and/or **3** (for which you want to visualize the data) and click **Run**. Data for all the specified Keys (Filter-only fields) and Values (Dimensions) are displayed.
   
     ![](./static/use-multiple-tags-in-aws-55.png)

### See Also

Once you have set up cost visibility for your Kubernetes clusters, AWS, GCP, and Azure cloud providers, you can create your own Dashboards. Refer to the following topics to create your own Dashboard and chart data.

* [Create Dashboards](https://developer.harness.io/docs/platform/Dashboards/create-dashboards)
* [Create Visualizations and Graphs](https://developer.harness.io/docs/platform/Dashboards/create-visualizations-and-graphs)

### Next Steps

* [Use Dashboard Actions](https://developer.harness.io/docs/platform/Dashboards/use-dashboard-actions)
* [Download Dashboard Data](https://developer.harness.io/docs/platform/Dashboards/download-dashboard-data)
* [Create Conditional Alerts](https://developer.harness.io/docs/platform/Dashboards/create-conditional-alerts)
* [Schedule and Share Dashboards](https://developer.harness.io/docs/platform/Dashboards/share-dashboards)


