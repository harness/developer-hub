---
title: Guardrail metric alerts
sidebar_label: Guardrail metric alerts
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting <br /> ✘ images still hosted on help.split.io <br /> </button>
</p>

An alert policy allows you to configure a degradation threshold for your metrics. If the metric exceeds the threshold in an undesired direction, you are alerted by your configured notification channel.

:::info[Alert policy limits]
You can create alert policies for metrics that are measured per traffic type, rather than those that are measured across the traffic type you are using.

One alert policy can be created per environment.
:::

## Create an alert policy

To create an alert policy, do the following:

1. Create a new metric or navigate to the metric that you want to be alerted of a change. For more about creating a metric, refer to the [Creating a metric](https://help.split.io/hc/en-us/articles/360020586132-Create-a-metric) guide. 

2. Once you select the metric to create a new alert policy for, click the **Alert policy** tab by the Metric definition tab. If there are no policies available, click the **Create alert policy** button.

<p>
  <img src="https://help.split.io/hc/article_attachments/19832342556557" alt="create-new-alert-policy.png" />
</p>

 3. Fill in the fields as follows:

<p>
     <img src="https://help.split.io/hc/article_attachments/19832304579981" alt="example-alert-policy.png" />
 </p>

  * Name: Give your alert policy a human recognizable name. We recommend also including the metric name your alert policy is associated with in your policy name. 

  * Description: Optionally give your alert policy a description. This can include anything that would be useful to you and your team if an alert is fired. Include runbooks, alerting protocols, and key information about the alert.

  * 1st alert condition: An alert policy can have multiple alert conditions. Each alert condition relates to a particular environment. (You can create one alert policy per environment.)

  * Choose your environment: select the environment you want to apply the alert condition to. If you already have an alert condition for a particular environment, this is not available in the environment menu list when you create a second alert condition. 

  * Set alert threshold: Add a degradation threshold in the form of a relative percentage threshold or absolute value threshold. The degradation direction is assumed to be the opposite of the desired direction of the metric. Learn more about setting degradation thresholds in the [Choosing your degradation threshold for alerting](https://help.split.io/hc/en-us/articles/360030908431-Choosing-your-degradation-threshold-for-alerting) guide.

  * Define alert notification channel: configure who to notify if an alert is fired. As default, the metric owner is selected. You can also select the emails of any group as well as add emails using the freeform section. 

4. From here, you can add additional alert conditions.

5. After you finish entering your conditions, click the **Create alert policy** button. You now have a new alert policy.

## When an alert is triggered

When an alert is triggered for a metric, the people you've selected in this section receive an email with the following format:

**Subject:** "Split Alert Fired: `Feature Flag Name` has caused `Metric Name` to degrade by `X`%" |
**Body:**	"Split has detected a degradation of `X`% on your `Metric Name` Metric.

Here are the details:
* Feature flag: (name and link to feature flag)
* Alert Policy: (name and link to alert policy)
* Metric: (name and link to metric)
* Baseline Value: 
* Treatment Value:
* Impact %:
* Threshold %: 
Please either kill the feature flag or dismiss this alert in the Split user interface.

-The Split Team

You are receiving this email because you were set as one of the people to be notified on this Alert Policy: (name and link to Alert Policy). If you don't want to receive these emails, please remove yourself from the list of people to be notified on the Alert policy page." 

Learn more about [managing alert policies.](https://help.split.io/hc/en-us/articles/360030045491)