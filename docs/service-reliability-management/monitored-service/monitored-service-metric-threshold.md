---
title: Custom thresholds
description: Learn how to define custom thresholds for service health analysis.
sidebar_position: 2
---


# Custom thresholds for service health analysis

In addition to utilizing AI/ML for service health analysis of monitored services, you use the custom threshold feature to set up rules that can change how service health behaves. You can create the following rules:

- **Ignore Thresholds**: Instructs Harness to skip analyzing service health for specific metric or value combinations.
  
- **Fail-fast Thresholds**: Makes the service health value drop to zero as soon as specific threshold criteria are met.


## Prerequisites

Before you begin setting up custom thresholds for service health, ensure you've completed the following steps:

1. Create a monitored service.
   
2. Configure a threshold-compatible health source such as AppDynamics, Google Cloud Operations, Splunk, Dynatrace, SumoLogic, Splunk Observability (SignalFX), or Azure Monitor. 
   
3. Set up at least one metric for the monitored service.
   
4. When adding metrics, choose the **Service Health** option to view the threshold settings.

   <docimage path={require('./static/monitored-service-threshold.png')} />


## Define threshold rules

When you add a threshold-compatible health source such as SumoLogic to a monitored service, perform the following workflows to define the threshold rules.


:::info note
For some health sources, such as SumoLogic, the **Advanced (Optional)** section is only visible if you have selected **Service Health** in the **Assign** section.
:::


### Ignore Thresholds

You can select the types of events for which you want to set thresholds. Metrics that match the selected rules will not be considered for service health analysis.

To set the Ignore Thresholds rule:

1. While setting up the threshold-compatible health source within a monitored service, navigate to the **Advanced (Optional)** section.
   
2. Go to the **Ignore Thresholds** tab and select **+ Add Threshold**.

3. From the **Metric** dropdown, select the desired metric for which you want to set the rule.
   
4. In the **Criteria** field, choose the type of criteria you want to apply for the threshold:
   
   - **Absolute Value**: Select this option and enter the **Greater than** and **Lesser than** values.
   - **Percentage Deviation**: Select this option and enter the **Lesser than** value.

<docimage path={require('./static/monitored-service-ignore-threshold.png')} />


### Fail-Fast Thresholds

You can select the type of events for which you want to set thresholds. Any metric that matches the selected rules will be marked as anomalous and cause the pipeline to fail.

To set Fail-Fast Thresholds rule:

1. While setting up the threshold-compatible health source within a monitored service, navigate to the **Advanced (Optional)** section.
   
2. Go to the **Fail-Fast Thresholds** tab and select **+ Add Threshold**.
   
3. From the **Metric** dropdown, select the desired metric for which you want to set the rule.
   
4. In the **Action** field, select what the Harness should do when applying the rule:
   
   - **Fail Immediately**
   
   - **Fail after multiple occurrences**
  
   - **Fail after consecutive occurrences**
  
5. In the **Count** field, set the number of occurrences. This setting is only visible if you have selected **Fail after multiple occurrences** or **Fail after consecutive occurrences** in the **Action** field. The minimum value must be two.
   
6. In the Criteria field, choose the type of criteria you want to apply for the threshold:
   
   -  **Absolute Value**: Select this option and enter the **Greater than** and **Lesser than** values.
   
   -  **Percentage Deviation**: Select this option and enter the **Lesser than** value.


<docimage path={require('./static/monitored-service-failfast-threshold.png')} />

    
