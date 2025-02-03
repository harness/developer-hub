---
title: Learn from experiment results
sidebar_label: Learn from experiment results
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 2
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

## Understanding your metric impact

Your metrics cards show different states depending on the label selected, the traffic distribution, the data available, and whether a baseline is selected. The following summary explains each card's state.

For each metric, you can register whether you want the number to go up (e.g., revenue) or down (e.g., churn).

**Significant desired impact**

A metric card returns with the message 'Significant desired impact' and is green, it’s because of these factors:

* The change matches the desired direction.
* There is evidence that the treatment selected had a different impact on the metric than the baseline treatment selected. The p-value is less than the defined significance threshold of 0.05 or your configured significance threshold. 

**Significant undesired impact**

When a metric card returns with the message 'Significant undesired impact' and is red, it’s because of these factors:

* The change does NOT match the desired direction.
* The p-value is less than the defined significance threshold of 0.05 or your account-wide significance setting. In this case, there is evidence that the treatment selected had a different impact on the metric than the baseline treatment selected.

**Statistically inconclusive**

A metric card returns with the message 'Statistically inconclusive' if the metric impact is unclear. The card displays this yellow state if:

* There was little evidence to believe that there was an impact. In this case, the lower the p-value, the more evidence of an impact. Here, the p-value is greater than the defined significance threshold of 0.05, (or your account-wide significance setting). 
* Said otherwise, if a true effect does exist, it’s likely to be smaller than the minimum, detectable effect for this metric, given the sample size of the test. Refer to [Sample size and sensitivity calculators](https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators) for more information about detectable effect sizes via our calculators. 

### Error messages when viewing metrics

The following are error messages that might arise when viewing your metrics.

* **When the baseline value = 0.** This is determined by the absolute value for the metric for users in the baseline treatment. We cannot calculate relative impact and show ’N/A’ on the card. Instead, we provide the confidence interval based on the absolute impact between the two treatments. The same information is provided as the statistically significant and statistically inconclusive cards on hover but in absolute terms rather than relative.
* **Statistical comparison not possible.** A metric card returns with this message you try to view a metric for a single treatment.Select a baseline treatment for comparison to see the statistical comparison where available. If this doesn't resolve your issue, and you continue to have problems with your metrics, contact [support@split.io](mailto:support@split.io).
* **Needs more data.** A metric card returns this message when the treatments being compared have not reached the minimum sample size. We require a sample size of at least 10 or higher in each treatment before we calculate significance for your metrics. The default setting is 355.
* **Metric not available.** A metric card returns this message for several reasons. Refer to [Understanding metric impacts](https://help.split.io/hc/en-us/articles/360020890491-Understanding-metric-impact#not-available-card) for more information. If the troubleshooting information does not resolve your issue, contact [support@split.io](mailto:support@split.io).

## About experimental review periods

A best practice is to respect experimental review periods. You shouldn’t draw conclusions about the impact of your metrics every time you compute them. This is called peeking which leads to errors, notably the following three types: failing to account for seasonality, early signal, and false positives.

User behavior changes by time of day or day of week. For example, let’s say you have a restaurant booking platform. If your change has a dramatic impact for users who book on Sunday night, it might not be representative of all your users. Many events only come days later. They can book a restaurant several days ahead. They won‘t confirm or pay until then.

We won’t block you from seeing your current metrics impact. The review period doesn’t influence the data process. It provides a caution against making a decision too early, without accounting for seasonality, or gaming statistical significance. It’s a common practice for mature experimentation teams; they wait for the experiment to run for a set the number of days before making a decision.

You can set it to either an account-wide or per-feature flag setting. Outside of the review period, we warn you that results MAY not be representative. Use appropriate judgment: if your review period is 14 days, the results on day 15, 16 or 17 are likely reliable. Be aware if your product has a very specific cadence. For example, processing pay stubs must include full periods to capture a representative cycle.