---
title: Verify Deployments with the Verify Step
description: This topic shows you how to use the Harness Verify Step to verify deployments and detect anomalies.
sidebar_position: 1
helpdocs_topic_id: 3xhqq9xllp
helpdocs_category_id: 9mefqceij0
helpdocs_is_private: false
helpdocs_is_published: true
---

The **Verify** step in a CD stage uses Harness Continuous Verification (CV) to verify your deployments.

Harness CV integrates with your APMs and logging tools to:

* Verify that the deployed service is running safely and perform automatic rollbacks.
* Apply machine learning to every deployment to identify and flag anomalies in future deployments.

This topic covers how to add and configure the Verify step.

## Before You Begin

* [Learn Harness' Key Concepts](/docs/get-started/key-concepts.md)
* [Kubernetes CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md)

## Supported Platforms and Technologies

See **Continuous Verification** in [Supported Platforms and Technologies](../../../get-started/supported-platforms-and-technologies.md).

## Review: What is Harness Continuous Verification (CV)?

The more often you deploy software, the more you need to validate the health of newly deployed service instances. You need the ability to rapidly detect regressions or anomalies, and to rapidly roll back failed deployments.

You have your choice of state-of-the-art APM (application performance monitoring) and logging software to continually measure your deployment data. But before Harness, you needed to connect your data to these multiple systems, and manually monitor each provider for unusual, post-deployment activity.

Harness' Continuous Verification (CV) approach simplifies verification. Harness uses machine learning to identify normal behavior for your applications. This allows Harness to identify and flag anomalies in future deployments, and to perform automatic rollbacks.

## Review: CV Setup Options

To use the Verify step, you will need a Harness Service Reliability Management Monitored Service. In the simplest terms, a Monitored Service is basically a mapping of a Harness Service to a service monitored by your APM or logging tool.

You can set up a Monitored Service in the Service Reliability Management module or in the Verify step in a CD stage. The process is the same.

No matter where you set up the Monitored Service, once it's set up, it's available to both Service Reliability Management and CD modules.

In this topic we'll set up the Monitored Service as part of the **Verify** step.

## Step 1: Add Verify Step

There are two ways to add the Verify step:

* **When selecting the stage deployment strategy:**  
The **Verify** step can be enabled in a CD stage the first time you open the **Execution** settings and select the deployment strategy. When you select the deployment strategy you want to use, there is also an **Enable Verification** option. Select the **Enable Verification** option.  
Harness will automatically add the **Verify** step. For example, here is a stage where Canary strategy and the **Enable Verification** option were selected.![](./static/verify-deployments-with-the-verify-step-20.png)
* **Add the Verify step to an existing Execution setup:** You can also add the Verify step to the Execution section of a CD stage in a Pipeline you previously created. Simply click **Add Step** after the deployment step, and then select **Verify**.![](./static/verify-deployments-with-the-verify-step-21.png)

## Step 2: Enter a Name and Timeout

In **Name**, enter a name for the step.

In **Timeout**, enter a timeout value for the step.

You can use:

* `w` for weeks
* `d` for days
* `h` for hours
* `m` for minutes
* `s` for seconds
* `ms` for milliseconds

The maximum is `53w`.Timeouts can be set at the Pipeline level also.

## Step 3: Select a Continuous Verification Type

In **Continuous Verification Type**, select a type that matches your deployment strategy.

**Rolling**, **Canary**, and **Blue Green** simply refer to the strategy in the stage.

For example, Canary deployment strategies use the **Canary** Continuous Verification type, and so on.

![](./static/verify-deployments-with-the-verify-step-22.png)

For **Load Test**, Harness compares the current Verify step execution with the last successful run of the Verify step. The first time you run the Pipeline there's no comparison. The comparisons are made is successive deployments.

Typically, **Load Test** is used in lower environments like QA where there is no continuous load and the deployments are usually verified by generating load via scripts, etc.

## Step 4: Create a Monitored Service

In **Monitored Service**, click **Click to autocreate a monitored service**.

:::note

The option to auto-create a monitored service is not available if you have configured either a service, an environment, or both as runtime values. When you run the pipeline, Harness concatenates the service and environment values you enter in the runtime inputs screen and generates a monitored service name. If a monitored service with the same name exists, Harness assigns it to the pipeline. If no monitored service that matches the generated monitored service name exists, Harness skips the verification step. 

For example, suppose you enter the service as `todolist` and the environment as `dev`. In that case, Harness generates the monitored service name `todolist_dev`, checks whether a monitored service with the name `todolist_dev` is available, and assigns it to the pipeline. If no monitored service is available with the name `todolist_dev`, Harness skips the verification step.

:::

You can also create a monitored service using a monitored service template. To use a template to create a monitored service:

1. In Monitored Service, click **Use Template**.  
The Monitored Service templates slider appears on the right. It displays all the available monitored service templates.
2. Select the appropriate monitored service template.  
The template details appear on the right. The fields that are configured as **Runtime Input** while creating the template are displayed here.

![](./static/verify-deployments-with-the-verify-step-23.png)

3. Click **Use Template** to close the Monitored Service Templates slider.  
The fields that are configured as Runtime Input while creating the template are displayed under **Template Inputs**.You can modify the template by clicking the Open in Template Studio button on the top. This opens the template in a separate tab where you can make changes. After making the changes, you can save the changes to the current template, save as a new version, or save as a new template.
4. Enter appropriate values.  
For example, if the health source has been configured as a runtime input while creating the template, the health source related fields are displayed.

## Step 5: Add Health Sources

This option is available only if you have configured the service and environment as fixed values.

A Health Source is basically a mapping of a Harness Service to the service in a deployment environment monitored by an APM or logging tool.

A Health Source is a combination of the following:

* Health Source type. This is the APM or logging tool monitoring the deployment environment. For example, AppDynamics or Splunk.
* Connection to the APM or logging tool monitoring the deployment environment. This is set up as a Harness Connector.
* The APM or logging tool feature used in monitoring. For example, AppDynamics Application Monitoring.
* The APM or logging tool settings that let you select the deployment environment. For example, an AppDynamics application and tier.
* Metric Pack: the metrics you want to use in verification. For example, Errors and Performance.

In **Health Sources**, click **Add**. The **Add New Health Source** settings appear.

![](./static/verify-deployments-with-the-verify-step-24.png)

In **Select health source type**, select your APM or logging tool. Each tool requires its own Health Source.

In **Health Source Name**, enter a name for the Health Source.

Click in **Select Connector**.

In the **Connector** settings, select a Connector to your APM or logging tool or click **New Connector**.

Here's an example of an AppDynamics Connector's settings:

![](./static/verify-deployments-with-the-verify-step-25.png)

When your Connector is set up, click **Apply Selected**. The Connector is added to the Health Source.

![](./static/verify-deployments-with-the-verify-step-26.png)

In **Select Feature**, select the APM or logging tool component to use. For example, AppDynamics **Application Monitoring**.

Click **Next**.

The settings in **Customize Health Source** will depend on the Health Source Type you selected. For example, here are the Customize Health Source settings for an AppDynamics Health Source:

![](./static/verify-deployments-with-the-verify-step-27.png)

The AppDynamics application and tier are selected to map the Harness Service to the monitored environment.

In **Metric Packs**, select the metrics you want Harness to use.

Click **Validation Passed** or **No Data** to see the data received from the tool. Some metrics might not have data at this time.

![](./static/verify-deployments-with-the-verify-step-28.png)

Click **View calls to [Provider Name]** to see the requests and responses of each call.

Click **Submit**. The Health Source is displayed in the Verify step.

![](./static/verify-deployments-with-the-verify-step-29.png)

You can add more Health Sources for each APM or logging provider.

## Step 6: Select Sensitivity

In **Sensitivity**, you select the risk level that will be used as failure criteria during the deployment. When the criteria are met, the Failure Strategy for the stage or step is executed.

For time-series analysis (APM), the risk level is determined using standard deviations, as follows: 5𝞼 ([sigma](https://watchmaker.uncommons.org/manual/ch03s05.html)) represents high risk, 4𝞼 represents medium risk, and 3𝞼 or below represents low risk.

Harness also takes into account the number of points that deviated: 50%+ is **High**, 25%-50% is **Medium**, and 25% or below is **Low**.

Every successful deployment contributes to creating and shaping a healthy baseline that tells Harness what a successful deployment looks like, and what should be flagged as a risk. If a deployment failed due to verification, Harness will not consider any of the metrics produced by that deployment as part of the baseline.

## Step 7: Select Duration

In **Duration**, select the number of data points Harness uses. If you enter 10 minutes, Harness will take the first 10 minutes worth of the log/APM data points and analyze it.

The length of time it takes Harness to analyze the 10 min of data points depends on the number of instances being analyzed and the monitoring tool. If you have a 1000 instances, it can take some time to analyze the first 10 minutes of all of their logs/APM data points.

The recommended **Duration** is **10 min** for logging providers and **15 min** for APM and infrastructure providers.

Harness waits 2-3 minutes to allow enough time for the data to be sent to the verification provider before it analyzes the data. This wait time is a standard with monitoring tools. So, if you set the **Duration** to 10 minutes, the 10 minutes excludes the initial 2-3 minute wait, but the total sample time is 13 minutes.

## Step 8: Specify Artifact Tag

In **Artifact Tag**, use a [Harness expression](../../../platform/variables-and-expressions/harness-variables.md) to reference the artifact in the stage Service settings.

The expression `<+serviceConfig.artifacts.primary.tag>` references the primary artifact.

## Option: Advanced Settings

In Advanced, you can use the following options:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../../../platform/2_Delegates/manage-delegates/select-delegates-with-selectors.md)

By default, Harness adds the following Failure Strategy for **Verification Failures**:

![](./static/verify-deployments-with-the-verify-step-30.png)

You can change the strategy to perform different actions, but leave the **Verification Failures** type to ensure that the Pipeline rolls back if it fails verification.

## Step 9: Deploy and Review Results

When you are done setting up the **Verify** step, click **Apply Changes**.

Now you can run the Pipeline. Click **Run**.

In **Run Pipeline**, select the tag for the artifact if a tag was not added in the **Artifact Details** settings.

Click **Run Pipeline**.

When the Pipeline is running, click the **Verify** step.

You can see that the verification takes a few minutes.

![](./static/verify-deployments-with-the-verify-step-31.png)

### Summary

The **Summary** section shows how many metrics and logs are in violation.

### Console View

You can take a deeper look at verification, click **Console View** or simply click **View Details** in **Summary**.

![](./static/verify-deployments-with-the-verify-step-32.png)

Each row shows the metric name, Health Source name, risk type, nodes etc.

If you have more than one Health Source, click the Health Source dropdown to select each one.

## See Also

* [Canary Deployment Step](../../cd-technical-reference/cd-k8s-ref/canary-deployment-step.md)

