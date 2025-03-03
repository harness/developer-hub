---
title: Metrics impact cards
sidebar_label: Metrics impact cards
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 1
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab, https://help.split.io/hc/en-us/articles/360020890491-Understanding-metric-impact, https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

The Metrics impact tab shows the impact of your experiment or feature rollout on your customers. To make data-driven decisions on your features, review and interpret the data that you collect before deciding to roll out the functionality to more customers. Before getting started, review the following:

* Understand how your most important metrics (overall evaluation criteria) were both positively and negatively impacted to learn more about what your customers expect and how you should change your feature functionality.
* Compare the actual impact with your team's preliminary hypothesis.
* Ensure that you understand the impact and tradeoffs on your account's guardrail and performance metrics.
* Share the impact with your team.

This data can be used to identify unexpected trends or issues that require troubleshooting. It will also allow you to ensure safe and reliable feature delivery while powering data-driven decisions.

## Viewing metrics 

To view the impact of your feature rollout on your account's metrics, from your selected feature flag, click the **Metrics impact** tab. The metric cards show how your account's metrics change when comparing treatments against your flag's baseline treatment.

The Metrics impact tab is described as follows:

* **View impact for.** Select the version or a custom date, targeting rule, and treatments that you want to compare. When you select the treatment, you can see the number of unique keys in that treatment. For more information, refer to the [Apply filters guide](https://help.split.io/hc/en-us/articles/360020848451-Applying-filters).
* **Summary of metrics impact.** View how long your measurements have been running, and the last update time for the metrics displayed below. You can also force a recalculation of your metrics by clicking the Recalculate metrics button. This recalculation usually takes around 5 minutes but is dependent on the length of your experiment and the size of your data.
* **Filter metrics.** Filter down to metrics with a positive or negative impact by clicking the tile. You can deselect and view all by clicking the tile again.
* **Key metrics.** Select the key metrics that you want to monitor to help you evaluate the success of this feature. Learn about [Configuring feature flag alerting](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting) for your key metrics. Key metrics are recalculated on a schedule, or when you click the *Recalculate* button.
* **Guardrail metrics.** Globally protected guardrail metrics adhere to an account-wide alerting policy. See the [Metric definition](https://help.split.io/hc/en-us/articles/22005565241101-Metrics#metric-categories) page for more information. Guardrail metrics are recalculated on a schedule, or when you click the *Recalculate* button.
* **Supporting metrics.** Select the supporting metrics that you want to monitor for this experiment or feature rollout. These metrics should be important to you, but may not be your primary success metrics for this feature. Supporting metrics are recalculated on a schedule, or when you click the *Recalculate* button.

## Metrics impact cards

Your metrics cards show different states depending on your user selections on the feature flag's Metric impact tab, the traffic distribution, the data available, and whether a baseline is selected in the feature flag definition. This page provides a summary of the states of the metric impact card. 

For more information about the Metric impact tab, refer to the [Metric impact](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact) guide.

_**Tip:**_ On a Desired, Undesired, or Inconclusive impact metric card, you can see the range that the _**impact lies between**_. The two values are the statistically calculated extreme values for your impact. The smaller the range between the extreme values, the higher the confidence in the predictability of the feature impact on the metric.

### Desired

<p>
  <img src="https://help.split.io/hc/article_attachments/11115840814221" alt="desired-1.png" width="500" />
</p>

When a metric card displays **Desired** and is green, it is because of the following:

* The change matches the desired direction. For example, you wanted this metric to increase, and it did when comparing the treatment to the baseline.
* The p-value is less than the defined significance threshold of 0.05 or your account-wide significance setting. In this case, there is evidence that the treatment selected had a different impact on the metric than the baseline treatment selected.
* The metric had sufficient power. Data was collected from enough users to satisfy the desired minimum detectable effect and default power threshold.

### Undesired

<p>
  <img src="https://help.split.io/hc/article_attachments/11115616956941" alt="undesired.png" width="500" />
</p>

When a metric card displays **Undesired** and is red, it is because of the following:

* The change doesn't match the desired direction, for example, you wanted this metric to increase, but instead it decreased when comparing the treatment to the baseline.
* The p-value is less than the defined significance threshold of 0.05 or your account-wide significance setting. In this case, there is evidence that the treatment selected had a different impact on the metric than the baseline treatment selected.
* The metric had sufficient power. Data was collected from enough users to satisfy the desired minimum detectable effect and default power threshold.

### Inconclusive

<p>
  <img src="https://help.split.io/hc/article_attachments/11115610979469" alt="inconclusive.png" width="500" />
</p>

A metric card displays **Inconclusive** if the metric impact is undecided. The card displays a yellow state if:

* There is insufficient evidence to believe that there was an impact. Because the p-value is greater than the defined significance threshold of 0.05 or your account-wide significance setting, there is little evidence that the treatment selected had a different impact on the metric than the baseline treatment selected.
* The observed effect is less than the defined effect threshold. In this case, the observed effect doesn't meet the desired minimum detectable effect. Refer to the [Sample size and sensitivity calculators](https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators) guide for more information about detectable effect sizes using our calculators.
* The range goes from a negative to a positive range. It’s inconclusive because the impact could be positive or negative.

### Baseline value equals zero

import baseline0 from './static/view-metric-results-baseline0.png';

<p>
  <img src={baseline0} alt="baseline-=-0.png" width="500" />
</p>

When the baseline treatment has a metric value of 0, the relative impact can’t be calculated and displays **Inconclusive** with a value of **N/A** on the card. Instead, the confidence interval is provided based on the absolute impact between the two treatments. The same information is provided as the statistically significant and statistically inconclusive cards but in absolute rather than relative terms.

## Resolving metric issues

This section details the results shown on gray metric cards. It also explains the actions needed for these cards to display actionable metric impact.

### Needs more data

<p>
  <img src="https://help.split.io/hc/article_attachments/11298119532557" alt="needs-more-data-355-sample-size.png" width="500" />
</p>

A metric card displays **Needs more data** when the treatments being compared have not reached the minimum sample size. (The minimum sample size is set in Experiment settings). We require data from a specific number of unique users in each treatment before we calculate significance for your metrics. For more information, refer to the [Statistical significance](https://help.split.io/hc/en-us/articles/360020641472-Statistical-significance).

### Statistically not possible

<p>
  <img src="https://help.split.io/hc/article_attachments/11263454124557" alt="statistical-comp-not-possible.png" width="500" />
</p>

A metric card displays **Not possible** for one of the following reasons:

* The metric is grouped across users. Metrics that are calculated across your customers and not normalized per customer (or the experimental unit) don't show a statistical comparison. These metrics are good for understanding overall trends, but if you want to see the statistical impact per customer, update the metric definition.

  _**Note:**_ The creation of new ‘across’ metrics is no longer supported, but existing ‘across’ metrics continue to return this state.

* The 'any' targeting rule is selected. Select a different targeting rule from the **With targeting rule** menu list to calculate statistical impact where available.

### No baseline

<p>
  <img src="https://help.split.io/hc/article_attachments/11262277177357" alt="no-baseline-metric-issue.png" width="500" />
</p>

A metric card displays **No baseline** when you are viewing metrics for a single treatment. Select a baseline treatment to see a statistical comparison where available.

### Variance is equal to zero

<p>
  <img src="https://help.split.io/hc/article_attachments/30664937795469" alt="variance-=-0.png" width="500" />
</p>

A metric card displays **The variance is equal to zero** when, for each treatment that you are comparing, all events have the same value. It is possible that there is a misconfiguration of your events, since all event values for a treatment are identical.

### Metric calculation is not available

<p>
  <img src="https://help.split.io/hc/article_attachments/11298345109389" alt="metric-not-available-1.png" width="500" />
</p>

A metric card displays **Not available** for the reasons given in the following table. If the troubleshooting tips don’t resolve your issue, and you continue to have problems with your metrics, contact [support@split.io](mailto:support@split.io).
  
| Reason for unavailable metric result | Troubleshooting tips |
| ---- | ---- |
| The calculation has not yet run for this flag. | The calculation runs within the first 15 minutes of a change in the feature flag's version. If it has been 15 minutes and you still see this issue, contact [support@split.io](mailto:support@split.io). Automatic calculations are run for feature flag versions which include a percentage targeting rule. Click the **Recalculate metrics** button to run on-demand calculations at any time. |
| The metric either created or modified after the metrics impact was last updated. | The duration between updates scales with the length of the version. At the beginning of a version, calculations are run every 15 minutes for definitions updated in the past hour. The time between these calculations increases incrementally through the duration of a version. Feature flags update every hour for the first 12 hours and then alternate hours until it has been running for 24 hours. The calculation schedule then moves to daily until day 14 of a feature flag version. Final calculations run on days 21 and 28 of a feature flag version. The older the experiment, the less likely that the data collected in the last few hours can move the metric. Click the **Recalculate metrics** button to rerun your calculations. | 
| No users have an impression for at least one of the treatments. | This message appears if you are comparing two treatments and one of the treatments has no samples. Ensure that the version and targeting rule you selected is serving traffic to both treatments. |
| No users have met the metric's *filter by* condition for at least one of the treatments. | This message appears if the metric has a filter criteria in its definition, for example, measure this metric for users who clicked this button. Ensure that the customers who are in the treatment and firing the track event used in the metrics calculation have also fired the filter event. |
| This metric is an average, but no events associated with this metric have been received for any user for at least one of the treatments. | This message appears when you are looking at the average value and Split hasn't received any events to take an average on. Ensure that you are sending the event that you want the average value for. |
| This metric is a ratio, but no events associated with the denominator have been received for any user for at least one of the treatments. | This message appears when you are calculating the ratio of two events and Split hasn't received any events for the denominator. Ensure that you are sending your events properly. |
| No users have an impression for the treatment. | This message appears if you are looking at a single treatment with no baseline and there are no samples. Ensure that the version and targeting rule you selected are serving traffic to the treatment you selected. |
| The calculation did not return. Our support engineering team has been notified. | The support team was notified and our alerts have been triggered. |

## About individual metric card messages

The following section describes the tooltip messages and link buttons you see on different types of metric cards.

### Desired, Undesired, and Inconclusive

When you hover over the question mark icon of a Desired, Undesired, or Inconclusive metrics card, you will see a tooltip with the following info:

* The metric values for both treatments
* The p-value

<p>
  <img src="https://help.split.io/hc/article_attachments/11331822980621" alt="desired-info-message.png" width="503" />
</p>

You will also see the following link buttons:

* **View details**: Navigate to the Impact snapshot chart.
* **More actions**: Edit your metric definition, add this metric as a key metric or remove from key metrics.

### Needs more data

When you hover over the question mark icon of a metric card showing 'Needs more data', you will see a tooltip with the following info:

* The input needed for each treatment to reach the minimum sample size

<p>
  <img src="https://help.split.io/hc/article_attachments/11331929501709" alt="more-data-message.png" width="515" />
</p>

### Not available

When you hover over the question mark icon of a metric card showing 'Not available', the message that appears provides the reason why the metric value is not available.

<p>
  <img src="https://help.split.io/hc/article_attachments/11332055670541" alt="not-available-card-message.png" width="560" />
</p>
  
<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
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