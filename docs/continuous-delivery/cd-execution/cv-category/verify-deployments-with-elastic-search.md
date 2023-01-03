---
title: Verify Deployments with Elasticsearch
description: This topic shows you how to verify deployments with ELK Elasticsearch.
sidebar_position: 8
helpdocs_topic_id: gasf0m2f2c
helpdocs_category_id: 9mefqceij0
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note

Currently, this feature is behind the feature flag `ELK_HEALTH_SOURCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Harness CV integrates with Elasticsearch to:

* Verify that the deployed service is running safely and performing automatic rollbacks.
* Apply machine learning to every deployment to identify and flag anomalies in future deployments.

 This topic covers how to add and configure Elasticsearch as a Health Source for the Verify step.

## **Review: CV Setup Options**

To use the Verify step, you will need a Harness Service Reliability Management Monitored Service. In the simplest terms, a Monitored Service is basically a mapping of a Harness Service to a service monitored by your APM or logging tool.

You can set up a Monitored Service in the Service Reliability Management module or in the Verify step in a CD stage. The process is the same.

No matter where you set up the Monitored Service, once it's set up, it's available to both Service Reliability Management and CD modules.

In this topic we'll set up the Monitored Service as part of the **Verify** step.

## Step 1: Add Verify Step

There are two ways to add the Verify step:

* **When selecting the stage deployment strategy:**  
The **Verify** step can be enabled in a CD stage the first time you open the **Execution** settings and select the deployment strategy. When you select the deployment strategy you want to use, there is also an **Enable Verification** option. Select the **Enable Verification** option.  
Harness will automatically add the **Verify** step. For example, here is a stage where Canary strategy and the **Enable Verification** option were selected.[![](./static/verify-deployments-with-elastic-search-97.png)](./static/verify-deployments-with-elastic-search-97.png)
* **Add the Verify step to an existing Execution setup:** You can also add the Verify step to the Execution section of a CD stage in a Pipeline you previously created. Simply click **Add Step** after the deployment step, and then select **Verify**.[![](./static/verify-deployments-with-elastic-search-99.png)](./static/verify-deployments-with-elastic-search-99.png)


## Step 2: Enter a Name and Timeout

1. In **Name**, enter a name for the step.
2. In **Timeout**, enter a timeout value for the step.

You can use:

* `w` for weeks
* `d` for days
* `h` for hours
* `m` for minutes
* `s` for seconds
* `ms` for milliseconds

The maximum is `53w`.Timeouts can be set at the Pipeline level also.

## Step 3: Select a Continuous Verification Type

In **Continuous Verification Type**, select a type that matches your [deployment strategy](verify-deployments-with-the-verify-step.md#step-3-select-a-continuous-verification-type).

![](./static/verify-deployments-with-elastic-search-101.png)

## Step 4: Create a Monitored Service

In **Monitored Service**, click **Click to autocreate a monitored service**.

:::note

The option to auto-create a monitored service is not available if you have configured either a service, an environment, or both as runtime values. When you run the pipeline, Harness concatenates the service and environment values you enter in the runtime inputs screen and generates a monitored service name. If a monitored service with the same name exists, Harness assigns it to the pipeline. If no monitored service that matches the generated monitored service name exists, Harness skips the verification step. 

For example, suppose you enter the service as `todolist` and the environment as `dev`. In that case, Harness generates the monitored service name `todolist_dev`, checks whether a monitored service with the name `todolist_dev` is available, and assigns it to the pipeline. If no monitored service is available with the name `todolist_dev`, Harness skips the verification step.

:::

You can also create a monitored service using a monitored service template. To use a template to create a monitored service:

1. In Monitored Service, click **Use Template**.  
The Monitored Service templates slider appears on the right. It displays all the available monitored service templates.
2. Select the appropriate monitored service template.  
The template details appear on the right. The fields that are configured as **Runtime Input** while creating the template are displayed here.

![](./static/verify-deployments-with-elastic-search-102.png)

3. Click **Use Template** to close the Monitored Service Templates slider.  
The fields that are configured as Runtime Input while creating the template are displayed under **Template Inputs**.You can modify the template by clicking the Open in Template Studio button on the top. This opens the template in a separate tab where you can make changes. After making the changes, you can save the changes to the current template, save as a new version, or save as a new template.
4. Enter appropriate values.  
For example, if the health source has been configured as a runtime input while creating the template, the health source related fields are displayed.

## Step 5: Add Health Sources

This option is available only if you have configured the service and environment as fixed values.

A Health Source is basically a mapping of a Harness Service to the service in a deployment environment monitored by an APM or logging tool.

1. In **Health Sources**, click **Add**. The **Add New Health Source** settings appear.
   
   ![](./static/verify-deployments-with-elastic-search-103.png)

2. In **Select health source type**, select Elasticsearch.
3. In **Health Source Name**, enter a name for the Health Source.
4. Under **Connect Health Source**, click **Select Connector**.
5. In **Connector** settings, you can either choose an existing connector or click **New Connector.**![](./static/verify-deployments-with-elastic-search-104.png)
6. Click **Apply Selected**. The Connector is added to the Health Source.
7. In **Select Feature**, select the Elasticsearch feature to be used.
8. Click **Next**.  
The **Customize Health Source** settings appear.  
You can customize the metrics to map the Harness Service to the monitored environment in **Query Specifications and Mapping** settings.Enter a name for the query in **Name your Query**.The subsequent settings in **Customize Health Source** depend on the Health Source Type you selected. Click **Map Queries to Harness Services** drop down
1. Click **Add Metric**.
2.  Enter a name for the query in **Name your Query**.
3.  Click **Fetch Records** to retrieve the details. The results are displayed under **Records.**![](./static/verify-deployments-with-elastic-search-105.png)
4.  Once the records are fetched, click the plus icon in **Identify Service Instance** to select the path for service instance.
5.  Click **Submit**. The Health Source is displayed in the Verify step.![](./static/verify-deployments-with-elastic-search-106.png)

You can add one or more Health Sources for each APM or logging provider.

## Step 6: Select Sensitivity

In **Sensitivity**, select **High**, **Medium**, or **Low** based on the risk level used as failure criteria during the deployment.

## Step 7: Select Duration

Select how long you want Harness to analyze and monitor the logs/APM data points. Harness waits for 2-3 minutes to allow enough time for the data to be sent to the APM/logging tool before it analyzes the data. This wait time is a standard with monitoring tools.

The recommended **Duration** is **10 min** for logging providers and **15 min** for APM and infrastructure providers.

## Step 8: Specify Artifact Tag

In **Artifact Tag**, use a [Harness expression](../../../platform/12_Variables-and-Expressions/harness-variables.md) to reference the artifact in the stage Service settings.

The expression `<+serviceConfig.artifacts.primary.tag>` refers to the primary artifact.

## Option: Advanced Settings

In **Advanced**, you can select the following options:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../../../platform/2_Delegates/delegate-guide/select-delegates-with-selectors.md)

See [Advanced Settings](verify-deployments-with-the-verify-step.md#option-advanced-settings).

## Step 9: Deploy and Review Results

After setting up the **Verify** step, click **Apply Changes**.

Click **Run** to run the pipeline.

In **Run Pipeline**, select the tag for the artifact if a tag was not added in the **Artifact Details** settings.

Click **Run Pipeline**.

When the Pipeline is running, click the **Verify** step.

You can see that the verification takes a few minutes.

Once verification is complete, the Verify step shows the following:

![](./static/verify-deployments-with-elastic-search-107.png)

The risk level might initially display a number of violations, but the red and orange colored host often change to green over the duration.

### Summary

The **Summary** section shows the number of logs that are in violation.

### Console View

Click **Console View** or simply click **View Details** in **Summary** to take a deeper look at verification.

You can use the search option to search for any specific metric or transaction you want.

