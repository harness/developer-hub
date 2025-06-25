---
title: Alerts and Monitoring
sidebar_position: 60
---

Release Monitoring provides a flexible alerting system to help teams monitor the impact of feature flags and experiments in real time. By configuring automated alerts on key or guardrail metrics, teams can quickly detect regressions, respond to issues, and protect customer experience during rollouts.

With alerts, you can: 

* Detect when a metric crosses a critical threshold
* Automatically trigger notifications based on experiment results
* Respond to issues before they escalate

Release Monitoring alerts are designed to work seamlessly with your existing workflows, ensuring you stay informed and in control during every stage of a release or experiment.

## Determine an alert mechanism

| **Alert type**                                        | **How it's triggered**                                     | **Fires on**       | **Configured for**          | **Environment support** | **Needs to be linked to a flag/experiment?** |
|-------------------------------------------------------|------------------------------------------------------------|--------------------|-----------------------------|-------------------------|----------------------------------------------|
| **Significance alert (automatic) – Key metric**       | Statistically significant impact detected (threshold = 0). | Good or bad impact | Key metric linked to a flag | Production only         | &#9989;                                      |
| **Significance alert (automatic) – Guardrail metric** | Statistically significant impact detected (threshold = 0). | Good or bad impact | Guardrail metric            | Production only         | &#10060;                                     |
| **Manual metric alert policy (any metric)**           | Manually configured threshold is crossed.                  | Degradations only  | Any metric with a policy    | Any environment         | &#10060; (optional)                          |

Manual alerts fire when any metric crosses a defined threshold, regardless of feature flag or experiment. These are configured by users and support degradations (or bad impact) only. For more information, see [alert policies](../alerts/alert-policies).

## Configure alerts

### Alert policies

Control how and when alerts trigger by creating an [alert policy](.././alerts/alert-policies). Define thresholds, notification rules, and alert behaviors that match your team's processes.

#### Monitoring window

Set the time window over which metric performance is evaluated for alert policies. [Monitoring windows](.././alerts/alert-policies/monitoring-window) help you tune sensitivity and reduce alert noise by limiting the period during which alerts are automatically triggered based on observed metric degradations.

Harness FME continues to monitor and alert your team of a metric degradation for up to 28 days after a version change. The default monitor window is 24 hours. Administrators can change the monitor window on the Monitor window and statistics page.

:::note
The monitoring window only applies to alert policies. If the monitoring window is set to 24 hours, Release Monitoring stops evaluating metrics for alert triggering after 24 hours from the version change. However, significance-based alerts (those triggered by re-running calculations during deeper analysis or user-initiated recalculations) can still trigger beyond the monitoring window.
::: 

### Alert baseline treatment

Compare metrics against a [baseline treatment](.././alerts/set-the-alert-baseline-treatment) to improve alert accuracy and minimize false positives. This treatment serves as the control group in impact comparisons, allowing Harness FME to evaluate whether changes in a metric are statistically significant when users receive a different treatment.

## Manage alerts

When an alert fires, you can access the [alert details](./view-triggered-alerts.md) and kill the flag directly from the flag page to stop traffic.

| **Action** | **Description** |
| ---- | ---- | 
| Kill feature flag | If you decide to kill a feature flag due to an alert, the [default treatment](/docs/feature-management-experimentation/feature-management/default-treatment/) overrides the existing targeting rules and is returned for all customers. |

### Troubleshooting alerts

Fix common configuration or delivery issues, verify metric inputs, and fine tune thresholds for better alert performance. For more information, see [Troubleshooting alerts](./troubleshooting).