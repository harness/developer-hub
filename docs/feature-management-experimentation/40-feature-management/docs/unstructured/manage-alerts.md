---
title: Create a feature flag
sidebar_label: Create a feature flag
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag <br /> ✘ images still hosted on help.split.io </button>
</p>

:::info[Get access to alert policies]
Contact your customer success manager or [support](mailto:support@split.io) and we’ll enable in your account.
:::

To understand the impact of your feature flags, you need to know when critical changes are occurring. Split gives you the ability to create alerts that actively check for a degradation in your metrics. Alerts that fired are displayed both on the Targeting and Alerts tab on the feature flag page.
<p>
  <img src="https://help.split.io/hc/article_attachments/15099766001549" alt="managing-alerts.png" />
</p>

# Monitor window

Split continues to monitor and alert your team of a metric degradation for up to 28 days after a version change. The default monitor window is 24 hours. Administrators can change the monitor window under the [Monitor and experiment settings](https://help.split.io/hc/en-us/articles/360020640752).

# Alert details

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

# Alerts actions 

You can take the following actions on the Alerts tab: **Kill** feature flag or **Dismiss** alert. 

| **Action** | **Description** |
| ---- | ---- | 
| Kill feature flag | If you decide to kill a feature flag due to an alert, the [default treatment](https://help.split.io/hc/en-us/articles/360020528192-Default-treatment) overrides the existing targeting rules and is returned for all customers. |
| Dismiss alert | If you decide to dismiss an alert, this alert is silenced for the remainder of the monitor window.|

# Understanding when an alert doesn't fire 

An alert policy may not fire an alert due to an alert policy configuration or changes to an alert policy definition. 

| **Cause of alert not firing** | **Description** |
| ---- | ---- |
| The alert policy has a different traffic type than the feature flag you want to be alerted on. | If the metric that is associated with an alert policy has a different traffic type than a feature flag, that feature flag isn't eligible to be alerted on. |
| The alert policy does not have an alert condition for all environments. | Multiple alert conditions can be created within alert policies that correspond to each of your environments. If you are viewing a feature flag in an environment and it doesn't have an alert condition associated with it, this feature flag is not be eligible for alert policies in that environment. |
| The alert policy threshold has changed | An alert may have fired. However, if a user edits the degradation threshold during the monitoring period to a level where this no longer causes an alert, the alert becomes inactive and shows ‘auto resolved due to threshold change’ in the activity column. |
| The alert policy is deleted | An alert may have been fired but if a user deletes an alert policy during the monitoring period, the alert becomes inactive and shows ‘alert policy deleted’ in the activity column.|
| The metric definition has changed | An alert may have been fired but if a user edits a metric that is tied to an alert policy during the monitoring period, the alert becomes inactive and shows ‘auto resolved by metric edited’ in the activity column. |

Alerts may also not be firing due to how the feature flag is configured and may be ineligible for an alert policy. 

| **Cause of alert not firing** | **Description** | 
| ---- | ----|
| No percentage targeting rule | Split requires user to have at least two treatments in a percentage targeting rule to measure for and detect a metric degradation.   |
| Alert baseline treatment not included in a specific targeting rule | The alert baseline must be included in one of the targeting rules and be allocated more than 0% of traffic.  |
| The feature flag has changed version | You are only alerted if there are degradations in your metrics for the feature flag's active version.|
| The sample size in the feature flag is too low to detect a degradation | If either the baseline or the treatment’s sample sizes are less than the experiment setting, we do not alert, regardless of the difference in the metrics. That is, we respect the experiment settings, so if the experiment setting is 300, the alert min sample size is also 300. **Note: If you set a number lower than 200, we still use a minimum sample size for 200 for alerting. For most situations, we recommend using a minimum sample size of 355.** |