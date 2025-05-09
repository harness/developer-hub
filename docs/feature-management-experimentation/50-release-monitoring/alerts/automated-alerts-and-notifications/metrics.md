---
title: Key metric alerts
sidebar_position: 10
---

Key metrics represent important indicators of feature success or failure. You can use them to trigger both manual and automatic alerts during a feature rollout. 

* Manual alert policies: Configure a degradation threshold for a specific metric tied to a feature flag or experiment. If the metric exceeds the threshold in an undesired direction, your configured notification channel alerts you. This type of alert does not require the metric to be part of a percentage rollout or experiment.

* Automatic significance alerts: If a key metric is linked to a percentage-based rollout, Release Monitoring automatically detects and alerts on statistically significant changes to that metric during the rollout. 

For automatic alerts on guardrail metrics, see [Guardrail metric alerts](./guardrail-metrics).

## Create a metric alert policy

:::info
Alert policies can only be created for metrics that are measured per traffic type, rather than those that are measured across all traffic type keys.
:::

To create an alert policy:

1. Create a new metric or navigate to the metric that you want to be alerted of a change. For more information about creating a metric, refer to the [Creating a metric](https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics#creating-a-metric) guide. 

2. Once you select the metric to create a new alert policy for, click the **Alert policy** tab by the Metric definition tab. If there are no policies available, click the **Create alert policy** button.

   <img src="https://help.split.io/hc/article_attachments/19832342556557" alt="create-new-alert-policy.png" width="1000" />

 3. Fill in the fields as follows:

    <img src="https://help.split.io/hc/article_attachments/19832304579981" alt="example-alert-policy.png" width="1000" />

  * In the Name field, give your alert policy a human recognizable name. We recommend also including the metric name your alert policy is associated with in your policy name. 

  * In the Description field, optionally give your alert policy a description. This can include anything that would be useful to you and your team if an alert is fired. Include runbooks, alerting protocols, and key information about the alert.

  * **1st alert condition area** An alert policy can have multiple alert conditions. Each alert condition relates to a particular environment. 

    :::note
    You are limited to one alert policy per environment.
    :::

 * In the Choose your environment field, select the environment you want to apply the alert condition to. If you already have an alert condition for a particular environment, this is not available in the environment menu list when you create a second alert condition. 

* In the Set alert threshold field, add a degradation threshold in the form of a relative percentage threshold or absolute value threshold. The degradation direction is assumed to be the opposite of the desired direction of the metric. Learn more about setting degradation thresholds in the [Choosing your degradation threshold for alerting](https://help.split.io/hc/en-us/articles/360030908431-Choosing-your-degradation-threshold-for-alerting) guide.

* In the Define alert notification channel field, configure who to notify if an alert is fired. As default, the metric owner is selected. You can also select the emails of any group as well as add emails using the freeform section. 

4. From here, you can add additional alert conditions.

5. After you finish entering your conditions, click the **Create alert policy** button. You now have a new alert policy.

## When a metric alert is triggered

When an alert is triggered for a metric, the people you've selected in this section receive an email with the following format:

**Subject:** "Alert Fired: `Feature Flag Name` has caused `Metric Name` to degrade by `X`%" <br />
**Body:** "Harness Feature Management & Experimentation has detected a degradation of `X`% on your `Metric Name` metric.

Here are the details:
* Feature flag: (name and link to feature flag)
* Alert Policy: (name and link to alert policy)
* Metric: (name and link to metric)
* Baseline Value: 
* Treatment Value:
* Impact %:
* Threshold %: 
Please either kill the feature flag or dismiss this alert in the Harness FME user interface.

-The Harness FME Team

You are receiving this email because you were set as one of the people to be notified on this Alert Policy: (name and link to Alert Policy). If you don't want to receive these emails, please remove yourself from the list of people to be notified on the Alert policy page."