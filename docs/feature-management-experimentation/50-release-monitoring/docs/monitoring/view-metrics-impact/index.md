---
title: Metrics impact
sidebar_label: Metrics impact
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

## Viewing metric impact results overview

The Metrics impact tab shows the impact of your experiment or feature rollout on your customers. To make data-driven decisions on your features, it is critical to review and interpret the data that you have collected before deciding to roll out the functionality to more customers.

Whether the impact is statistically positive, negative, or inconclusive, the insights are a valuable resource. The data on the Metrics impact tab allows you to ensure safe and reliable feature delivery while powering data-driven decisions.

Be aware of the following:

* Understand how your most important metrics (overall evaluation criteria) are both positively and negatively impacted to learn more about what your customers expect and how you should change your feature functionality.
* Compare the actual impact with your team's preliminary hypothesis.
* Ensure that you understand the impact and tradeoffs on your account's guardrail and performance metrics.

### Viewing metrics impact

To view the impact of your experiments on your account's metrics, do the following:

1. From the left navigation, click **Feature flags** and select the desired feature flag.
2. From your feature flag, click the **Metrics impact** tab. The Results page appears. The page shows how your account's metrics change when looking at customers in a particular treatment as well as when comparing treatments.

  <img src="https://help.split.io/hc/article_attachments/30833216436493" alt="setting_up_and_using_metrics_view.png" />

 **Note: Automatic calculations run for flag versions which include a percentage targeting rule. On-demand calculations can be run at any time by clicking the Recalculate metrics button. Be aware that the recalculate button may be disabled in certain conditions. For more information, refer to the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451#About-recalculating-metrics) guide.**

3. In the View impact for criteria area, select a version of the experiment to see your metrics results. 
4. In the With targeting rule field, select a targeting rule used in your evaluation. Split ensures fair distribution across a filtered set and statistical rigor.
5. To view statistically valid results when you compare two treatments, select a label for which you want to see your metrics results. If you select the targeting rule **any**, your metrics results display, but statistical significance is not computed.
6. Select the treatment for which you would like to view metrics impact and optionally add a baseline comparison to see statistical comparisons. You can view metrics cards for users exposed to a particular treatment. To compare users exposed to different treatments, select the desired version, targeting rule, and treatments that you want to compare. When you select the treatment, you see the number of users in that treatment.
7. In the Summary of metrics impact section, view how long your experiment has been running, and the last update time for the metrics displayed below. You can also force a recalculation of your metrics using the **Recalculate** button. This recalculation usually takes around 5 minutes but is dependent on the length of your experiment and the size of your data.
8. In the Key metrics section, selected key metrics for this feature flag. If you are releasing a new feature behind this feature flag, display the key success metrics for this feature release here.

  **Note: A good practice is to have no more than 5 metrics. We recommend this because too many key metrics slow down the processing time to reach statistical significance.**

9. In the Guardrail metrics section, the account-wide guardrail metrics display. Any metrics that changed in a statistically positive and negative way display first.
10. In the Supporting metrics section, the supporting metrics that were added for the feature flag display. Any metrics that changed in a statistically positive and negative way display first.

Learn more about [applying filters](https://help.split.io/hc/en-us/articles/360020848451) to your data and [understanding the impact](https://help.split.io/hc/en-us/articles/360020890491) on your customers.

If you have any additional questions or need help troubleshooting, email us at [support@split.io](mailto:support@split.io).

### Filtering results view

To view a filtered version of your results, do the following:

1. On the Metric impacts tab, in the carousel section, filter down to metrics with a positive or negative impact by clicking the tile. You can deselect and view all by clicking the tile again. Filters allow you to filter down to metrics that have either a positive or negative impact.
2. Select tags and owners. You can filter the metrics displayed down to those with a particular tag and/or a particular owner. Learn more about using [tags](https://help.split.io/hc/en-us/articles/360020839151) and [owners](https://help.split.io/hc/en-us/articles/360020582092) in Split.
3. Share applied filters. Use the **Share** button to send your metrics impact page to key stakeholders. Click **Share** and a shareable URL is added to your clipboard.The shareable URL provides a view of the metrics impact page for that specific feature flag. The version, targeting rules, treatment comparisons, applied tags, and applied owners are all shared. Users can then filter the metrics positively and negatively impacted.

## Reviewing metrics impact during review periods

Making conclusions about your metrics impact during set review periods reduces the chance of errors and allows you to account for seasonality in your data. Split always shows your current metrics impact and if you are between review periods. The following describes the incomplete and complete states. 

**Note: Avoid making conclusive product decisions in between review periods or at a minimum ensure that you have run for at least one review period.**

### Incomplete

The review period can be incomplete for two reasons:

* Your feature flag did not run for the minimum review period configured for your account.
* Your feature flag is currently running and is between review periods.

### Complete

The review period is complete when the feature flag has run for the minimum review period, set by your account in either a current or previous version of your feature flag. A 14-day review period (configured by default) is ready for review on day 14, 28, 42, and so forth.

### Change settings

If you believe that the default review period for your account is too long or too short, you can reach out to your administrator to adjust your [statistical settings](https://help.split.io/hc/en-us/articles/360020640752).

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

## Sharing your results

Sharing results allows you to download a copy of your metrics impact results in various formats or share via URL. You can:

* Share the outcome of your experiments with colleagues without them needing to visit Split
* Keep a record of experiment outcomes in your preferred documentation formats or applications
* Conduct further manual analysis or visualizations as desired
* Import the metric results into your own internal systems
* View results in a tabular format

To generate the results, do the following:

1. On the Metrics impact tab, under Results, the Share results list is on the right side of the page, above the metric cards.
2. Click **Share results**. This allows you to view the list of format options.

  <img src="https://help.split.io/hc/article_attachments/30833238583053" alt="setting_up_and_using_metrics_share.png" /> 
3. Click your chosen format. Your browser downloads the file. A message appears on the page when the file has finished downloading. 

When you click Copy URL, this copies a URL link to your current view in the Split app to your clipboard but does not download a file.

## Available formats

You can generate a report containing your metrics impact results in the below formats:

### CSV
This format contains the observed metric data and the results of the statistical analyses. The report contains one row per metric and is intended to be human readable as well as appropriate for further manual analyses or reporting.

### JSON
This format contains the observed metric data, the results of the statistical analyses, as well as the statistical settings and metric definitions at the time of analysis. This format is intended for ingesting data into other tools and databases.

### PDF
This format presents a visual representation of your metrics impact results, similar to the Split user interface. This format is ideal for sharing results with stakeholders and for quickly understanding the high level outcomes of your tests.

### Copy URL
This copies a URL link to your current view in the Split app to your clipboard. This does require that anyone you share this with must have a Split account.