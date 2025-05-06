---
title: Automated alerts and notifications
sidebar_position: 10
---

Automated alerts in Release Monitoring notify you and your team when your feature flags or metrics indicate a potential degradation or unintended impact. These alerts help you catch regressions early and take corrective action quickly, such as rolling back a flag or investigating a metric.

## Alert types

Release Monitoring offers two mechanisms for receiving alerts during a feature rollout:

| Category             | Definition  |
|----------------------|-------------|
| **Key metric alerts**    | Alerts that fire when a specific metric crosses a defined threshold, regardless of any feature flag. These alerts are configured and managed through metric alert policies and are independent of experimentation. For more information, see [key metric alerts](./metrics). |
| **Guardrail metric alerts** | Alerts that fire when a feature flag causes a statistically significant change in an associated guardrail or key metric. These alerts are specific to flags and are part of experimentation-based alerting (also called significance alerts). Guardrail metrics are used to detect regressions (such as in performance or stability), while key metrics measure primary success or failure. <br /><br /> To trigger this type of alert, a feature flag must have a baseline treatment, a percentage-based rollout, and at least one attached metric. For more information, see [guardrail metric alerts](./guardrail-metrics). |

## Alert notifications

To receive notifications when alerts are triggered:

1. Set up your notification channels, such as Slack or email.
1. Configure [alert policies](../alert-policies) for the metrics you want to monitor.
1. Enable feature flag alerts by assigning key or guardrail metrics to a flag and setting a baseline treatment.

## Understanding when an alert doesn't fire 

An alert policy may not fire an alert due to an alert policy configuration or changes to an alert policy definition. 

| **Cause of alert not firing** | **Description** |
| ---- | ---- |
| The alert policy has a different traffic type than the feature flag you want to be alerted on. | If the metric that is associated with an alert policy has a different traffic type than a feature flag, that feature flag isn't eligible to be alerted on. |
| The alert policy does not have an alert condition for all environments. | Multiple alert conditions can be created within alert policies that correspond to each of your environments. If you are viewing a feature flag in an environment and it doesn't have an alert condition associated with it, this feature flag is not be eligible for alert policies in that environment. |
| The alert policy threshold has changed | An alert may have fired. However, if a user edits the degradation threshold during the monitoring period to a level where this no longer causes an alert, the alert becomes inactive and shows `auto resolved due to threshold change` in the activity column. |
| The alert policy is deleted | An alert may have been fired but if a user deletes an alert policy during the monitoring period, the alert becomes inactive and shows `alert policy deleted` in the activity column.|
| The metric definition has changed | An alert may have been fired but if a user edits a metric that is tied to an alert policy during the monitoring period, the alert becomes inactive and shows `auto resolved by metric edited` in the activity column. |

Alerts may also not be firing due to how the feature flag is configured and may be ineligible for an alert policy. 

| **Cause of alert not firing** | **Description** | 
| ---- | ----|
| No percentage targeting rule | Harness FME requires user to have at least two treatments in a percentage targeting rule to measure for and detect a metric degradation.   |
| Alert baseline treatment not included in a specific targeting rule | The alert baseline must be included in one of the targeting rules and be allocated more than 0% of traffic.  |
| The feature flag has changed version | You are only alerted if there are degradations in your metrics for the feature flag's active version.|
| The sample size in the feature flag is too low to detect a degradation | If either the baseline or the treatment’s sample sizes are less than the experiment setting, we do not alert, regardless of the difference in the metrics. That is, we respect the experiment settings, so if the experiment setting is 300, the alert min sample size is also 300. **Note: If you set a number lower than 200, we still use a minimum sample size for 200 for alerting. For most situations, we recommend using a minimum sample size of 355.** |