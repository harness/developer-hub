---
title: Configuring metric alerting
sidebar_label: Configuring metric alerting
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting <br /> ✘ images still hosted on help.split.io <br /> <span style={{backgroundColor:'#ffae42'}}>✘ outdated info about enabling alerting policies for an account?</span> </button>
</p>

:::info[Get access to alert policies]
<span style={{backgroundColor:'#ffae42'}}>To enable alert policies for your account, contact your customer success manager or [support](mailto:support@split.io).</span>
:::

An alert policy allows you to configure a degradation threshold for your metrics. If the metric exceeds the threshold in an undesired direction, you are alerted by your configured notification channel. To create an alert policy, do the following:

1. Create a new metric or navigate to the metric that you want to be alerted of a change. For more about creating a metric, refer to the [Creating a metric](https://help.split.io/hc/en-us/articles/360020586132-Create-a-metric) guide. 

2. Once you select the metric to create a new alert policy for, click the **Alert policy** tab by the Metric definition tab. If there are no policies available, click the **Create alert policy** button.

<p>
  <img src="https://help.split.io/hc/article_attachments/12488519234445" alt="create-new-alert-policy.png" />
</p>

 3. Fill in the fields as follows:

**Note: Alert policies can only be created for metrics that are measured per traffic type, rather than those that are measured across the traffic type you are using.**

<p>
     <img src="https://help.split.io/guide-media/01H1YRF13KBGR34Y0FND3121M3" alt="example-alert-policy.png" />
 </p>

  * In the Name field, give your alert policy a human recognizable name. We recommend also including the metric name your alert policy is associated with in your policy name. 

  * In the Description field, optionally give your alert policy a description. This can include anything that would be useful to you and your team if an alert is fired. Include runbooks, alerting protocols, and key information about the alert.

  * **1st alert condition area** An alert policy can have multiple alert conditions. Each alert condition relates to a particular environment. 

**Note: You are limited to one alert policy per environment.**

 * In the Choose your environment field, select the environment you want to apply the alert condition to. If you already have an alert condition for a particular environment, this is not available in the environment menu list when you create a second alert condition. 

* In the Set alert threshold field, add a degradation threshold in the form of a relative percentage threshold or absolute value threshold. The degradation direction is assumed to be the opposite of the desired direction of the metric. Learn more about setting degradation thresholds in the [Choosing your degradation threshold for alerting](https://help.split.io/hc/en-us/articles/360030908431-Choosing-your-degradation-threshold-for-alerting) guide.

* In the Define alert notification channel field, configure who to notify if an alert is fired. As default, the metric owner is selected. You can also select the emails of any group as well as add emails using the freeform section. 

4. From here, you can add additional alert conditions.

5. After you finish entering your conditions, click the **Create alert policy** button. You now have a new alert policy.

## When an alert is triggered

When an alert is triggered for a metric, the people you've selected in this section receive an email with the following format:

**Subject:** "Split Alert Fired: `Feature Flag Name` has caused `Metric Name` to degrade by `X`%" |
**Body:**	"Split has detected a degradation of `X`% on your `Metric Name` Metric. Here are the details:
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