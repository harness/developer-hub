---
title: Configuring feature flag alerting
sidebar_label: Configuring feature flag alerting
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting <br /> ✘ images still hosted on help.split.io </button>
</p>

Feature flag alerts provide immediate feedback about a feature flag’s key metrics. An alert will fire when a desired or undesired impact is detected. You can choose key metrics for each feature flag and specify which feature flag should alert you about its key metrics. This allows you to take quick action on insights that may be especially useful to your team.

To check if you have feature flag alerting enabled for your account, in the Split UI click **My work** in the left navigation menu and click into a feature flag. Then click on the gear icon next to the flag name. If you see the **Alerts setup** menu item, you have feature flag alerting enabled for your account.

## Setting up feature flag alerting

To enable or disable alert notifications for a specific feature flag, do the following:

1\. Click **Feature flags** in the left navigation menu, and click on a feature flag.

2\. Ensure the Alert baseline treatment is selected in the flag definition. _How this selection is used for alerting:_ Split will compare the metric value of each treatment against the metric value of the alert baseline treatment selected. This comparison will determine the impact (_desired_, _undesired_, or _inconclusive_) that the feature flag has on that metric. For example, if you have two treatments “on” and “off”, and “off” is selected as your alert baseline treatment, Split will monitor the impact of the “on” treatment against the “off” treatment and alert you if a statistically significant impact is observed. For more information, see [Understanding metric impact](https://help.split.io/hc/en-us/articles/360020890491-Understanding-metric-impact), [Applying filters](https://help.split.io/hc/en-us/articles/360020848451-Applying-filters), and [Set the alert baseline treatment](https://help.split.io/hc/en-us/articles/360029566292-Set-the-alert-baseline-treatment-).

3\. Next to the feature flag name, click on the gear icon, and select **Alerts setup**.

4\. Note that feature flag alerts can only be enabled for all production environments at this time. (You can change the Environment type to **Production** when you edit an environment in Admin settings, accessed via the top button in the left navigation panel.) For more information about environments, see the [Environments](https://help.split.io/hc/en-us/articles/360019915771) guide.

5\. Under Alert conditions, check the box **When a key metric reaches significance** to turn the feature flag’s alerting on. This means that an alert will be immediately triggered whenever one of this feature flag’s key metrics reaches a desired or undesired impact. Unchecking the box will turn the feature flag’s alerting off.

6\. Review the Destinations and recipients that will be notified if a desired or undesired impact is detected for a key metric added to the feature flag. Feature flag owners are notified by default, and you are not able to add or remove specific recipients at this time.

7\. Click **Save**. If enabled, monitoring for feature flag alerts will activate for the flag’s key metrics immediately or as soon as the percentage targeting rule is set for the feature flag. (The percentage targeting rule is set on the feature flag’s Definition tab, under the **Distribute treatments as follows** radio button.) 

## When a feature flag alert is triggered

When a statistically significant impact is detected on a key metric of a feature flag an email is sent in the following format:

Subject: "Good News/Alert: (Feature Flag Name) had a positive/negative impact on (Metric Name)"

Body: "Split has detected a(n) DESIRED/UNDESIRED improvement/degradation of X% on your (Metric Name) metric.

Feature flag: (name and link to feature flag)

Metric: (name and link to metric)

Category:

Environment:

Baseline treatment:

Baseline metric value:

Comparison treatment:

Comparison metric value

Relative impact: X% in the DESIRED/UNDESIRED direction

\-The Split Team

Visit the Split application to view the feature flag's metrics impact or kill the feature flag."

The recipients of the feature flag alert email are listed under Destinations and recipients, in the feature flag's **Alerts setup**, accessed via the gear icon next to the feature flag's name.

When you receive an alert, you can view the feature flag in the Split UI and select the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab). Filter using the alert information to view the measurement that triggered the alert and explore the metric results.

## How feature flag alerting relates to other features and settings

**Metric alerting:** Toggling a feature flag’s alerting on or off will not disable metric alerting, which is defined and enabled on a metric’s Alert policy tab. It is possible that a metric simultaneously triggers a feature flag alert and a metric alert if it is selected as a key metric for a feature flag and if the thresholds in both alert definitions are reached. To define metric alert policies, review the [Configuring metric alerting](https://help.split.io/hc/en-us/articles/19832312225293) guide.

**Alert baseline treatment and treatment distribution:** For metric calculations to determine a desired or undesired impact, the feature flag **Alert baseline treatment** must be selected. For an alert to fire, the feature flag **Distribute treatments as follows** targeting rule must be used (to define percentage targeting) in addition to the Alert baseline treatment setting, as shown below.

**Recalculating metrics:** Clicking the **Recalculate metrics** button on the Metrics impact tab in the feature flag definition will trigger feature flag alerts (for any key metrics that show a desired or undesired impact after recalculating). For more information see [Manually recalculating metrics](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab#manually-recalculating-metrics).

## Troubleshooting feature flag alerts

For troubleshooting an alert that did not fire as expected, refer to the [Troubleshooting alerting](https://help.split.io/hc/en-us/articles/19832825482637) guide.
