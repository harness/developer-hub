---
title: Set the alert baseline treatment
sidebar_label: Set the alert baseline treatment
description: ""
sidebar_position: 12
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029566292-Set-the-alert-baseline-treatment </button>
</p>

<!-- can we add this paragraph here?

The alert baseline treatment is used if an alert policy has been created. When there is an active alert policy, then the feature flag's alert baseline treatment is compared against all the other treatments when metrics are calculated.

-->

:::tip
Get access to alert policies by contacting your customer success manager or [support@split.io](mailto:support@split.io) and we’ll enable in your account.
:::

The alert baseline treatment is set on a feature flag's Definition tab. The alert baseline treatment can be any treatment that meets the following criteria:

* It is within a specific targeting rule that you want to be alerted on.
* It is incorporated into a percentage allocation of a targeting rule.
* The percentage allocation to this treatment is more than 0%.

Note that **alert not possible if selected** is beside the treatment that does not meet the criteria above. Learn more about [Configuring metric alerting](/docs/feature-management-experimentation/experimentation/metrics/alert-policies/#create-a-metric-alert-policy) and [Configuring feature flag alerting](/docs/feature-management-experimentation/release-monitoring/alerts/automated-alerts-and-notifications/#setting-up-feature-flag-alerting).
