---
title: Alert baseline treatment
sidebar_label: Alert baseline treatment
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 3
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029566292-Set-the-alert-baseline-treatment <br /> ✘ images still hosted on help.split.io </button>
</p>

The alert baseline treatment is used if an alert policy has been created. When there is an active alert policy, then the feature flag's alert baseline treatment is compared against all the other treatments when metrics are calculated.

:::tip
Get access to alert policies by contacting your customer success manager or [support@split.io](mailto:support@split.io) and we’ll enable in your account.
:::

The alert baseline treatment is set on a feature flag's Definition tab. The alert baseline treatment can be any treatment that meets the following criteria:

* It is within a specific targeting rule that you want to be alerted on.
* It is incorporated into a percentage allocation of a targeting rule.
* The percentage allocation to this treatment is more than 0%.

Note that **alert not possible if selected** is beside the treatment that does not meet the criteria above. Learn more about [Configuring metric alerting](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting) and [Configuring feature flag alerting](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting).
