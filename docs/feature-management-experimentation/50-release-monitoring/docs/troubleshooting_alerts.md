---
title: Troubleshooting alerts
sidebar_label: Troubleshooting alerts
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border: '1px', fontFamily: 'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/19832825482637-Troubleshooting-alerts </button>
</p>

In rare cases, you may find that a metric degradation alert or feature flag significance alert did not fire as you expected. The chart below is designed to help you determine the cause and help you make any needed adjustments. It outlines the required conditions for metric and feature flag alerts.

| **Applies to Metric alerts** | **Applies to Feature flag alerts** | **Cause of alert not firing** | **Additional details** |
| --- | --- | --- | -- |
| ✔ | ✔ | No percentage targeting rule is set | For a metric to detect a statistically significant impact, a feature flag must have at least two treatments in a percentage targeting rule. One of these treatments must be the alert baseline treatment. The percentage targeting rule is set on a feature flag’s Definition tab, under the **Distribute treatments as follows** radio button. |
| ✔ | ✔ | No alert baseline treatment is selected, or the alert baseline treatment is not included in a percentage targeting rule | For an alert to fire, the alert baseline treatment must be included in one of the targeting rules and be allocated more than 0% of traffic. For more information, review [Alert baseline treatment and treatment distribution](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting#how-feature-flag-alerting-relates-to-other-features-and-settings). |
| ✔ | ✔ | The feature flag has changed version | An alert is fired when a metric measures a significant impact for the _currently active version_ of a feature flag. |
| ✔ | ✔ | The sample size in the feature flag is too low to detect a significant change | For an alert to fire, the sample size of each treatment (defined for a feature flag) must reach the _experiment setting_. For example, if the experiment setting is 300 then the alert minimum sample size is also 300 (however if you set a number lower than 200, Split uses a minimum sample size of 200 for alerting). For most situations, we recommend using a minimum sample size of 355. |
| ✔ | | Traffic type mismatch between metric and feature flag definitions | For an alert to fire, the traffic type of the metric that measures a significant impact must match the traffic type of a feature flag. Check that the _Select traffic type_ value on the metric’s Metric definition tab matches the _Traffic type_ shown under a feature flag’s Details. |
| ✔ | | Environment mismatch between metric alert policy and feature flag definition | For an alert to fire, the alert policy that detects a significant impact must match the Environment of the rules of the feature flag. Check that the _Choose your environment_ value in the alert condition on the metric’s Alert policy tab matches the Environment selected when viewing the feature flag’s Targeting rules. |
| ✔ | | Alert policy threshold has changed | An alert becomes inactive and ‘Auto resolved due to threshold change’ is displayed in the metric alert’s Activity column on the feature flag's Alerts tab, if the alert policy's degradation threshold was increased (to a level where the alert policy would no longer measure a significant impact) during the monitoring period. |
| ✔ | | Alert policy was deleted | An alert becomes inactive and ‘Alert policy deleted’ is displayed in the metric alert’s Activity column on the feature flag's Alerts tab, if the alert policy fired and was deleted during the monitoring period.|
| ✔ | | The metric definition has changed | An alert becomes inactive and shows ‘Auto resolved by metric edited’ in the activity column on the feature flag's Alerts tab, if the metric (where the alert policy is defined) was edited during the monitoring period. |
| | ✔ | Feature flag alerting is disabled for the feature flag | Follow the instructions outlined in [Setting up feature flag alerting](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting#setting-up-feature-flag-alerting) to ensure alerting is enabled for the feature flag. |
| | ✔ | No key metrics are selected for the feature flag | Feature flag alerting is currently only supported for key metrics. You can add key metrics on the feature flag’s Metrics impact tab.|
| | ✔ | The key metric did not reach significance through the statistical approach used for alerting | In rare instances, measurements reported in a feature flag alert may slightly differ from the metric impact result displayed on the metric card in the Split UI. The following differences may also cause an alert notification not to fire as expected: <br /> * _Fixed horizon_ is the testing method selected in experiment settings, but all significance alerts use the _sequential testing_ method. <br /> * _Multiple comparison correction_ (MCC) is applied in the experiment settings, but significance alerts do not yet support MCC. |
