---
title: Guardrail metric alerts
sidebar_position: 20
---

Guardrail metric alerts automatically notify you when a feature flag causes a statistically significant change in a key safety or quality-of-service metric. These metrics protect your customer experience during a rollout by detecting degradation in critical areas such as performance, reliability, or customer behavior.

Unlike manual alert policies, guardrail alerts are triggered based on statistical significance, not predefined thresholds. To use guardrail metric alerts, you must create a guardrail metric and run a percentage-based rollout.

:::info
Guardrail alerts can only be created for metrics that are measured per traffic type, not for metrics aggregated across all traffic types.
:::

Guardrail metrics are a specialized type of key metric. While both key and guardrail metrics can trigger automatic alerts during percentage rollouts, guardrail alerts are specifically designed to flag degradation in critical safety or quality metrics. On the other hand, key metrics track feature success or failure more broadly.

## Create a guardrail metric alert policy

To create a guardrail alert policy:

1. Create a new guardrail metric or navigate to an existing one that you want to monitor for degradation. Click the Edit icon next to the **Metric category** field, select `Guardrail metrics`, and click **Apply**. For more information about creating a guardrail metric, refer to the [Creating a metric](https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics#creating-a-metric) guide.

2. Once you select the guardrail metric to create a new alert policy for, click the **Alert policy** tab next to the Metric definition tab. If there are no existing policies, click **Create alert policy**.

   <img src="https://help.split.io/hc/article_attachments/19832342556557" alt="create-new-alert-policy.png" width="1000" />

3. Fill in the policy fields:

   <img src="https://help.split.io/hc/article_attachments/19832304579981" alt="example-alert-policy.png" width="1000" />

   * In the Name field, give your alert policy a human recognizable name. We recommend also including the metric name your alert policy is associated with in your policy name. 

   * In the Description field, optionally give your alert policy a description. This can include anything that would be useful to you and your team if an alert is fired. Include runbooks, alerting protocols, and key information about the alert.

   * **1st alert condition area**: An alert policy can have multiple alert conditions. Each alert condition relates to a particular environment. 

     :::note
     You are limited to one alert policy per environment.
     :::

   * In the Choose your environment field, select the environment you want to apply the alert condition to. If you already have an alert condition for a particular environment, this is not available in the environment menu list when you create a second alert condition. 

   * In the Set alert threshold field, add a degradation threshold in the form of a relative percentage threshold or absolute value threshold. The degradation direction is assumed to be the opposite of the desired direction of the metric. Guardrail metrics often degrade when values increase (e.g. error rate or latency) or decrease unexpectedly (e.g. revenue or engagement). Learn more in the [Choosing your degradation threshold for alerting](https://help.split.io/hc/en-us/articles/360030908431-Choosing-your-degradation-threshold-for-alerting) guide.

   * In the Define alert notification channel field, configure who to notify if an alert is fired. As default, the metric owner is selected. You can also select the emails of any group as well as add emails using the freeform section. 

4. From here, you can add additional alert conditions.

5. After you finish entering your conditions, click the **Create alert policy** button. The alert will now trigger if the guardrail metric crosses the defined threshold.

## When a guardrail alert is triggered

When an alert is triggered for a guardrail metric, the people you've selected in this section receive an email with the following format:

**Subject:** "Good News!/Alert: `Feature Flag Name` had a positive/negative impact on `Metric Name`<br />
**Body:** "**Good News!/Alert: `Feature Flag Name` had a positive/negative impact on `Metric Name`**

Split has detected a(n) DESIRED/UNDESIRED improvement/degradation of `X`% on your `Metric Name` metric.

Feature flag: (name and link to feature flag)<br />
Metric: (name and link to metric)<br />
Environment:<br />
Baseline treatment:<br />
Baseline metric value:<br />
Comparison treatment:<br />
Comparison metric value:<br />
Relative Impact: `X`% in the DESIRED/UNDESIRED direction<br />

-The Split Team

Visit the Split application to view the feature flag's metric impact (or kill the feature flag)."