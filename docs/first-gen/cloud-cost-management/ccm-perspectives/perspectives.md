---
title: Create Cost Perspectives
description: Harness Continuous Efficiency (CE) Cost Explorer allows you to view, understand, and analyze your cloud costs in a simple and intuitive interface. You can add business context to all this data using Custom Views.
# sidebar_position: 2
helpdocs_topic_id: 0yt4i7m7nz
helpdocs_category_id: b9vb8vq908
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Cloud Cost Management (CCM) Cost Explorer allows you to view, understand, and analyze your cloud costs in a simple and intuitive interface. You can add business context to all this data using Perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.


## CE Perspective Concepts

This section defines different CE Perspective concepts.

### Cost Perspective

Perspectives allow you to group your resources in ways that are more meaningful to your business needs. It provides a unified view of your cloud cost data across the cloud environment. For example, you can group and filter by Account, Environment, Service, Region, Product, Label, Namespace, Workload, etc. and create a perspective for your business, finance, and engineering teams. Here are some of the examples where you could use Perspectives:

* Build your own visual interface using flexible rules and filters. Each role or team within an organization has different needs and criteria to measure and evaluate the business. With Perspectives, business units can create views that align with their business needs based on groups of resources determined by different rules and filters.
* Create Perspectives broken down by project, team, department, or business unit to gain granular visibility into all your cloud environments. Perspectives provide a single-pane view of different products, for example, clusters, applications, AWS, GCP, and Azure.
* Schedule and share the reports with the key stakeholders for maximum business impact.
* Estimate costs consumed by specific teams, groups, departments, BUs, LOBs cost-centers, etc.
  
    ![](./static/perspectives-00.png)

### Rule-Based Engine

Perspective uses a rule-based engine to organize and display your cloud cost. Each perspective has a set of rules and each rule can have multiple conditions. The following operators are supported for each condition:

* **IN**: The exact match operation used to filter for the exact value specified.
* **NOT IN**: The exact match operation used to filter for all values except the one that  is specified.
* **NULL**: Null means the selected filter has no value. If you select NULL for your filter, then the cost of the selected filter is not included in the perspective.  
  
For example, in **Rules for Perspective**, if you select `Label: kubernetes.io/name` as `NULL`, then your Perspective will not include the cost for the selected label (`kubernetes.io/name`). It will include the cost for all the other resources.

  ![](./static/perspectives-01.png)
* **NOT NULL**: Not null means that the selected filter has value. If you select NOT NULL for your filter, then only the cost of the selected filter is included in the perspective.  
  
For example, in **Rules for Perspective**, if you select `Label: kubernetes.io/name` as `NOT_NULL`, then your perspective will list the cost of the selected label only (`kubernetes.io/name`). It will not include the cost of any other resources.

  ![](./static/perspectives-02.png)

#### Default Fields

You can create a Perspective for your resources using default rules and filters. The default fields are used to group the resources. The following are the supported default fields:

* **AWS**: CE allows you to view your AWS costs at a glance, understand what is costing the most, and analyze cost trends. CE displays the data for all your Amazon Web Services (ECS, EC2, and so on). For more information, see [Analyze Cost for AWS](/docs/first-gen/cloud-cost-management/root-cost-analysis/analyze-cost-trends-for-aws.md).
* **GCP**: CE allows you to view your Google Cloud Platform (GCP) costs, understand what is costing the most, and analyze cost trends. CE displays data for all your GCP products (such as Compute Engine, Cloud Storage, BigQuery, and so on), projects, SKUs, and location. For more information, see [Analyze GCP Cost](/docs/first-gen/cloud-cost-management/root-cost-analysis/analyze-cost-for-gcp.md).
* **Azure**: CE allows you to view your Azure costs at a glance, understand what is costing the most, and analyze cost trends. CE displays the data for all your Azure services (Storage account, Virtual machines, Containers, and so on). For more information, see [Analyze Cost for Azure](/docs/first-gen/cloud-cost-management/root-cost-analysis/analyze-cost-for-azure.md).
* **Cluster**: For more information on Group by filters, see [Analyze Cost Across Clusters](/docs/first-gen/cloud-cost-management/root-cost-analysis/analyze-cost-trends-across-clusters.md).
* **Region**: Each AWS, GCP, or Azure region you are currently running services in.
* **Product**: Each of your active products with their cloud costs.
* **Label**: Cost organized by the Kubernetes labels used in the workload manifests. This does not apply to ECS clusters. IN GCP, it refers to each [label](https://cloud.google.com/resource-manager/docs/creating-managing-labels) that you are using to organize your Google Cloud instances.

### Custom Fields

If you want to create a Perspective using your own fields, then the custom field will fit your requirement.

* Custom field provides you the flexibility to create your own fields using formula. The formula uses SQL functions `ONE_OF()`.  

```
CASE  
    WHEN x IS NOT NULL THEN x  
    ELSE y  
END
```
* Custom field lets you manipulate your Perspective using different functions. The output (cloud cost data) is displayed depending on the functions used in the formula.  
  
For example, you create a Custom Field, `workspace` using the formula `ONE_OF(CLUSTER.Namespace,LABEL.ceteam`. When used, the Perspective displays the cloud cost data for your created filter as the following:

  ![](./static/perspectives-03.png)

### Preview

As you add your resources in the **Perspective Builder**, a **Preview** of your Perspective is displayed.

![](./static/perspectives-04.png)

The following are the key advantages of Preview:

* Provides a quick visual representation of your resources in the Perspective, without saving it.
* Allows you to Group by your resources in the preview mode itself. You can Group by, **Common**, **Custom** (if Custom Fields are available), **Cluster**, **AWS**, **GCP**, and **Azure**.
* Helps you to review your changes faster.

By default, the resources are **Grouped by** Product in Preview.#### Dynamic Filter Support

Perspective offers dynamic filter support for Group by and Filter settings. The options for these settings are listed based on the filters you select when creating your Perspective.

For example, you have selected AWS and GCP when creating your Perspective.

![](./static/perspectives-05.png)When saved, only AWS and GCP Group by and Filters options are listed.

![](./static/perspectives-06.png)### Step: Create a Perspective

You can create a Perspective by grouping your resources the way you wish. For example, if you want to create a perspective for your CFO, first add **default** or **custom** filters and then further group by Service, Account, Workload, Namespace, etc. that you would want to include in your Perspective. You can create up to 50 Perspectives.

Perform the following steps to create a Perspective:

1. In **Cloud Cost Management**, click **Perspectives**.
2. Click **Create a new perspective**.
3. In **Perspective Builder**, enter a name for your perspective. By default, a unique name is entered in the field. You can edit the pre-populated name of the perspective.Perspective name must not include any special character.
4. In **Perspective Builder**, in **Rules for Perspective**, click **+** and then click **add filter**.  
  
You can add filters using [default fields](/docs/first-gen/cloud-cost-management/ccm-perspectives/perspectives.md#default-fields) or you can [create new custom fields](/docs/first-gen/cloud-cost-management/ccm-perspectives/perspectives.md#custom-fields). As you add your resources in the Perspective Builder, a [Preview](/docs/first-gen/cloud-cost-management/ccm-perspectives/perspectives.md#preview) is displayed of your Perspective.

#### Option: Add a Filter Using Default Fields

Perform the following steps to add filters using default fields.

1. In **Perspective Builder**, in **Rules for Perspective**, click + and then click **add filter**.
2. Select **Cluster**, **AWS**, **GCP**, **Azure**, **Region**, **Product**, or **Label** from the **Default Fields**.
   
   ![](./static/perspectives-07.png)
3. Select the filter. Based on your group by selection, the filters are listed.
4. Select the operator. The supported operators are:
* **IN**: The exact match operation used to filter for the value specified.
* **NOT IN**: The exact match operation used to filter for the value that is not specified.
* **NULL**: Null means the selected filter has no value. If you select NULL for your filter, then the cost of the selected filter is not included in the perspective.  
  
For example, in **Rules for Perspective**, if you select `Label: kubernetes.io/name` as `NULL`, then your Perspective will not include the cost for the selected label (`kubernetes.io/name`). It will include the cost for all the other resources.

  ![](./static/perspectives-08.png)

* **NOT NULL**: Not null means that the selected filter has value. If you select NOT NULL for your filter, then only the cost of the selected filter is included in the perspective.

For example, in **Rules for Perspective**, if you select `Label: kubernetes.io/name` as `NOT_NULL`, then your perspective will list the cost of the selected label only (`kubernetes.io/name`). It will not include the cost of any other resources.

5. Select value for your filter. You can select multiple values. You can also filter and customize your result using the search option.![](./static/perspectives-09.png)
6. Once you have added all the filters, you can [add a report sharing schedule](/docs/first-gen/cloud-cost-management/ccm-perspectives/share-report-in-cost-perspectives.md).
7. Click **Save**. The cost data for your selection is displayed.
   
    ![](./static/perspectives-10.png)

#### Option: Add a Filter Using Custom Field

If you don't want to create a Perspective using Default Fields, but instead looking to create your own fields, then the custom field will fit your requirement.

Custom field provides you the flexibility to create your own fields using a formula. The formula uses SQL functions `ONE_OF()`.

Perform the following steps to create a custom field and use them:

1. In **Perspective Builder**, in **Rules for Perspective**, click **+** and then click **add filter**.
2. Select **Create new custom field**.
   
   ![](./static/perspectives-11.png)
3. In **Custom Field**, in **Enter the name for the custom field**, enter a name.
4. In **Formula**, enter a formula to create your custom field. The formula uses SQL function `ONE_OF()`.
5. Select a function from the list. Use the `Space bar` to list the functions.
   
   ![](./static/perspectives-12.png)
6. You can use first-class entities to create the custom field. For example, `ONE_OF(AWS.Service,GCP.Product)`. Use the `Space bar` to list the functions.
   
     ![](./static/perspectives-13.png)
7. Click **Save**. The field is added under **Custom Fields**.
   
   ![](./static/perspectives-14.png)
8.  Click on the Custom Field that you created, for example, testdoc.
9.  Select the Operator. The supported operators are:
	* **IN**: The exact match operation used to filter for the exact value specified.
	* **NOT IN**: The exact match operation used to filter for the exact value that is not specified.
10. Click **Save** to save the Perspective. You can **Group by** the **Custom** filter in **Preview** mode before saving the Perspective.
    
      ![](./static/perspectives-15.png)
11. Select the Custom field in the Perspective for which you want to view the cost data.
    
      ![](./static/perspectives-16.png)

### Step: Edit a Perspective

To edit a Perspective, perform the following steps:

1. In **Cloud Cost Management**, click **Perspective****s**. All the Perspectives that you have created are listed.
   
     ![](./static/perspectives-17.png)
2. Select the Perspective that you want to edit.
3. Click on the more options button (...) and click **Edit**. The **Perspective Builder** settings appear.
4. Follow the steps in add filters using [default fields](/docs/first-gen/cloud-cost-management/ccm-perspectives/perspectives.md#default-fields) or [create new custom fields](/docs/first-gen/cloud-cost-management/ccm-perspectives/perspectives.md#custom-fields) to edit the settings.

### Step: Clone a Perspective

To clone a Perspective, perform the following steps:

1. In **Cloud Cost Management**, click **Perspective****s**. All the Perspectives that you have created are listed.
2. Select the Perspective that you want to clone.
3. Click on the more options button (...) and click **Clone**.
4. Enter name. By default, the name is populated. You can edit the field.
   
     ![](./static/perspectives-18.png)
5. Click **Submit**.

### Step: Delete a Perspective

To delete a Perspective, perform the following steps:

1. In **Cloud Cost Management**, click **Perspective****s**. All the Perspectives that you have created are listed.
2. Select the Perspective that you want to delete.
3. Click on the more options button (...) and click **Delete**.
4. Click **Confirm Delete**.

### Perform Root Cost Analysis Using Perspectives

Perspectives allow you to view your costs at a glance, understand what is costing the most, and analyze cost trends across all your clusters, AWS, GCP, and Azure in a single-pane view.

1. In **Cloud Cost Management**, click **Perspectives**. All the Perspectives with name, time period, filters used, and last edited on details are listed.
   
    ![](./static/perspectives-19.png)
2. Click the Perspective for which you want to analyze the cost.
3. Use the Group by settings to view the cloud cost of your Perspective.
4. You can further customize your selection by using **Filter** settings.  
  
The Group by options are dynamically listed based on the filters used in your Perspective. For example, if you have selected AWS, GCP, and Custom for creating your Perspective, then only AWS, GCP, and Custom **Group by** and **Filter** options are listed.

![](./static/perspectives-20.png)

5. The cost data for custom fields are displayed under the **Custom** tab. 
   
![](./static/perspectives-21.png)


