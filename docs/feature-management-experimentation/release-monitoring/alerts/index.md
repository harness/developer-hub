---
title: Alerts
sidebar_position: 50
---

Release Monitoring provides a flexible alerting system to help teams monitor the impact of feature flags and experiments in real time. By configuring automated alerts on key or guardrail metrics, teams can quickly detect regressions, respond to issues, and protect customer experience during rollouts.

With alerts, you can: 

* Detect when a metric crosses a critical threshold
* Automatically trigger notifications based on experiment results
* Respond to issues before they escalate

Release Monitoring alerts are designed to work seamlessly with your existing workflows, ensuring you stay informed and in control during every stage of a release or experiment.

## Configure alerts

### Alert policies

Control how and when alerts trigger by creating an [alert policy]((.././alerts/al). Define thresholds, notification rules, and alert behaviors that match your team's processes.

### Monitoring window

Set the time window over which metric performance is evaluated. [Monitoring windows](.././alerts/monitoring-window) help you tune sensitivity and reduce alert noise.

Harness FME continues to monitor and alert your team of a metric degradation for up to 28 days after a version change. The default monitor window is 24 hours. Administrators can change the monitor window under the [Monitor and experiment settings](https://help.split.io/hc/en-us/articles/360020640752).

### Alert baseline treatment

Compare metrics against a [baseline treatment](.././alerts/set-the-alert-baseline-treatment) to improve alert accuracy and minimize false positives. This treatment serves as the control group in impact comparisons, allowing Harness FME to evaluate whether changes in a metric are statistically significant when users receive a different treatment.

## Manage alerts

When an alert fires, you can dismiss the alert if no action is needed or kill the flag directly from the flag page to stop traffic.

| **Action** | **Description** |
| ---- | ---- | 
| Kill feature flag | If you decide to kill a feature flag due to an alert, the [default treatment](https://help.split.io/hc/en-us/articles/360020528192-Default-treatment) overrides the existing targeting rules and is returned for all customers. |
| Dismiss alert | If you decide to dismiss an alert, this alert is silenced for the remainder of the monitor window.|

### Troubleshooting alerts

Fix common configuration or delivery issues, verify metric inputs, and fine tune thresholds for better alert performance.