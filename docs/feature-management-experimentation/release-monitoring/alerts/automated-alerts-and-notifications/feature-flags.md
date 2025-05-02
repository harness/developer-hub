---
title: Feature flag alerts
sidebar_position: 20
---

Feature flag alerts provide immediate feedback about a feature flag’s key metrics. An alert will fire when a desired or undesired impact is detected. You can choose key metrics for each feature flag and specify which feature flag should alert you about its key metrics. This allows you to take quick action on insights that may be especially useful to your team.

To check if you have feature flag alerting enabled for your account, in the Harness FME UI click **My work** in the left navigation menu and click into a feature flag. Then click on the gear icon next to the flag name. If you see the **Alerts setup** menu item, you have feature flag alerting enabled for your account.

## Setting up feature flag alerting

To enable or disable alert notifications for a specific feature flag, do the following:

1. Click **Feature flags** in the left navigation menu, and click on a feature flag.

1. Ensure the Alert baseline treatment is selected in the flag definition. _How this selection is used for alerting:_ Harness FME will compare the metric value of each treatment against the metric value of the alert baseline treatment selected. This comparison will determine the impact (_desired_, _undesired_, or _inconclusive_) that the feature flag has on that metric. For example, if you have two treatments “on” and “off”, and “off” is selected as your alert baseline treatment, Harness FME will monitor the impact of the “on” treatment against the “off” treatment and alert you if a statistically significant impact is observed. For more information, see [Understanding metric impact](https://help.split.io/hc/en-us/articles/360020890491-Understanding-metric-impact), [Applying filters](https://help.split.io/hc/en-us/articles/360020848451-Applying-filters), and [Set the alert baseline treatment](https://help.split.io/hc/en-us/articles/360029566292-Set-the-alert-baseline-treatment-).

1. Next to the feature flag name, click on the gear icon, and select **Alerts setup**.

1. Note that feature flag alerts can only be enabled for all production environments at this time. (You can change the Environment type to **Production** when you edit an environment in Admin settings, accessed via the top button in the left navigation panel.) For more information about environments, see the [Environments](/hc/en-us/articles/360019915771) guide.

1. Under Alert conditions, check the box **When a key metric reaches significance** to turn the feature flag’s alerting on. This means that an alert will be immediately triggered whenever one of this feature flag’s key metrics reaches a desired or undesired impact. Unchecking the box will turn the feature flag’s alerting off.

1. Review the Destinations and recipients that will be notified if a desired or undesired impact is detected for a key metric added to the feature flag. Feature flag owners are notified by default, and you are not able to add or remove specific recipients at this time.

1. Click **Save**. If enabled, monitoring for feature flag alerts will activate for the flag’s key metrics immediately or as soon as the percentage targeting rule is set for the feature flag. (The percentage targeting rule is set on the feature flag’s Definition tab, under the **Distribute treatments as follows** radio button.) 

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

\-The Harness FME Team

Visit the Harness FME application to view the feature flag's metrics impact or kill the feature flag."

The recipients of the feature flag alert email are listed under Destinations and recipients, in the feature flag's **Alerts setup**, accessed via the gear icon next to the feature flag's name.

When you receive an alert, you can view the feature flag in the Harness FME UI and select the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab). Filter using the alert information to view the measurement that triggered the alert and explore the metric results.

## How feature flag alerting relates to other features and settings

### Metric alerting

Toggling a feature flag’s alerting on or off will not disable metric alerting, which is defined and enabled on a metric’s Alert policy tab. It is possible that a metric simultaneously triggers a feature flag alert and a metric alert if it is selected as a key metric for a feature flag and if the thresholds in both alert definitions are reached. To define metric alert policies, review the [Configuring metric alerting](/hc/en-us/articles/19832312225293) guide.

### Alert baseline treatment and treatment distribution

For metric calculations to determine a desired or undesired impact, the feature flag **Alert baseline treatment** must be selected. For an alert to fire, the feature flag **Distribute treatments as follows** targeting rule must be used (to define percentage targeting) in addition to the Alert baseline treatment setting, as shown below.

### Recalculating metrics 

Clicking the **Recalculate metrics** button on the Metrics impact tab in the feature flag definition will trigger feature flag alerts (for any key metrics that show a desired or undesired impact after recalculating). For more information see [Manually recalculating metrics](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab#manually-recalculating-metrics).

## Troubleshooting feature flag alerts

For troubleshooting an alert that did not fire as expected, refer to the [Troubleshooting alerting](/hc/en-us/articles/19832825482637) guide.


To understand the impact of your feature flags, you need to know when critical changes are occurring. Harness FME gives you the ability to create alerts that actively check for a degradation in your metrics. Alerts that fired are displayed both on the Targeting and Alerts tab on the feature flag page.

<img src="https://help.split.io/hc/article_attachments/15099766001549" alt="managing-alerts.png" width="1000" />


## Alert details

If an alert fires, the following information is provided: 

| **Column header** | **Description**|
| ---- | ---- | 
| Alert fired | Provides the timestamp when the alert is fired. The menu list option is also where you can take action on this alert. |
| Activity | Provides information on the status of the alert, whether it is dismissed or auto-resolved (learn more below). Hover over to access the timestamp of the action in this column.|
| Name of policy | Provides the name of the metric alert policy. Click the name to go directly to the alert policy builder. |
| Rule | Provides the rule within the feature flag's targeting rules that caused the alert to fire. |
| Relative impact % | Provides the degradation percentage that is detected with the error margin of this percentage. Hover over to access the timestamp of when the degradation is detected. |
| Absolute impact | Provides the degradation that is detected in an absolute value with the error margin of this value. Hover over to access the timestamp of when the degradation is detected. |
| Metric value (baseline) | Provides the metric value in absolute terms as well as the baseline treatment that is used for alert monitoring. |
| Metric value (treatment) | Provides the metric value in absolute terms as well as the treatment that is used to compare against the baseline treatment for alert monitoring. |
| Relative threshold % | Provides the degradation threshold configured in the alert policy definition in relative terms or a translation of the absolute threshold if this is used in the alert policy definition. Hover over this value to see which threshold type is used in the alert policy definition. |
| Absolute threshold | Provides the degradation threshold configured in the alert policy definition in absolute terms or a translation of the relative threshold if this is used in the alert policy definition. Hover over this value to see which threshold type is used in the alert policy definition. |