---
title: Experiment results
sidebar_label: Experiment results
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 6
---

<!-- used to be Metrics impact -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9652327065485-Setting-up-and-using-metrics <br /> ✘ images still hosted on help.split.io </button>
</p>

## Overview

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