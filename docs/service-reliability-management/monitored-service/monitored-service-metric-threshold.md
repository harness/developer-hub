---
title: Custom thresholds
description: Learn how to define custom thresholds for service health analysis.
sidebar_position: 2
---


# Custom thresholds for service health analysis

In addition to utilizing AI/ML for service health analysis of monitored services, you use the custom threshold feature to set up rules that can change how service health behaves. You can create the following rules:

- **Ignore Threshold**: Instructs Harness to skip analyzing service health for specific metric or value combinations.
  
- **Fail-fast Threshold**: Makes the service health score drop to zero as soon as specific threshold criteria are met.


## Prerequisites

Before you begin setting up custom thresholds for service health, ensure you've completed the following steps:

1. Create a monitored service.
   
2. Configure a threshold-compatible health source such as AppDynamics, Google Cloud Operations, Splunk, Dynatrace, SumoLogic, Splunk Observability (SignalFX), or Azure Monitor. 
   
3. Set up at least one metric for the monitored service.
   
4. When adding metrics, choose the **Service Health** option to view the threshold settings.

   <DocImage path={require('./static/monitored-service-threshold.png')} />


## Define threshold rules

When you add a threshold-compatible health source such as SumoLogic to a monitored service, perform the following workflows to define the threshold rules.


:::info note
For some health sources, such as SumoLogic, the **Advanced (Optional)** section is only visible if you have selected **Service Health** in the **Assign** section.
:::


### Ignore Threshold

You can select the types of events for which you want to set thresholds. Metrics that match the selected rules will not be considered for service health analysis.

To set the Ignore Thresholds rule:

1. While setting up the threshold-compatible health source within a monitored service, navigate to the **Advanced (Optional)** section.
   
2. Go to the **Ignore Thresholds** tab and select **+ Add Threshold**.

3. From the **Metric** dropdown, select the desired metric for which you want to set the rule.
   
4. In the **Criteria** field, choose the type of criteria you want to apply for the threshold:
   
   - **Absolute Value**: Select this option and enter either the **Greater than** value or the **Lesser than** value, depending on your preference.
   - **Percentage Deviation**: Select this option and enter the **Lesser than** value.

<DocImage path={require('./static/monitored-service-ignore-threshold.png')} />


### Fail-Fast Threshold

You can select the type of events for which you want to set thresholds. Any metric that breaches the rule will be marked as anomalous.

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
   
   -  **Absolute Value**: Select this option and enter either the **Greater than** value or the **Lesser than** value, depending on your preference.
   
   -  **Percentage Deviation**: Select this option and enter the **Lesser than** value.
  

<DocImage path={require('./static/monitored-service-failfast-threshold.png')} />


## Impact of Fail-Fast Threshold breach on the Service Health dashboard

When a metric breaches the Fail-Fast Threshold, you can see the impact on the service health dashboard, as detailed below.

- The timeline graph displays the health score as zero throughout the breach period.

- Within the Metric tab, the graph associated with the breached metric is highlighted as anomalous during the breach period, vividly shown in deep red.

The screenshots below show a monitored service's threshold rule and the events on the Service Health dashboard when the metric breaches this rule.

#### Fail-Fast Threshold Rule implementation in a monitored service

<DocImage path={require('./static/monitored-service-failfast-example.png')} />


#### Impact of Fail-Fast Threshold Breach: Service Health score drops to zero

<DocImage path={require('./static/monitored-service-failfast-graph-example.png')} />


#### Impact of Fail-Fast Threshold breach: Metrics Graph transforms to "Anomalous" state and turns deep red

<DocImage path={require('./static/monitored-service-failfast-metric-example.png')} />
