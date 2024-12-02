---
title: Multiple comparison correction
sidebar_label: Multiple comparison correction
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border: '1px', fontFamily: 'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360037852431-Multiple-comparison-correction </button>
</p>

Due to unavoidable noise and randomness in the data, there is a chance that a statistically significant metric is a false positive. This means that random variations in the data have made it appear as though your treatment had an impact when it did not. 

The likelihood of getting a false positive is controlled by the [significance threshold](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#significance-threshold) set in your experiment settings. For example, with the default significance threshold of 0.05 and in a standard test with no multiple comparison correction (MCC), there is a 5% chance that your metric shows a statistically significant result at the end of your test when the treatment had no real impact on that metric. You could reduce this likelihood by lowering the significance threshold for your account. However, this also reduces the ability to detect true differences and may result in more false negatives. You can read more about the statistical tests used at Split [here](https://help.split.io/hc/en-us/articles/360020641472-Statistical-significance#two-tailed-test).

With Split, you can choose whether to have multiple comparison corrections applied to your results by configuring this setting in the [monitor and experiment settings](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#multiple-comparison-corrections) section. Using multiple comparison corrections is a strongly recommended best practice in experimentation whenever you are testing multiple metrics. This is because each individual metric brings its own chance of showing a false positive. If no corrections are applied then the more metrics you test, the higher your chance of getting false positive results. For example, whilst using the default significance threshold of 0.05 gives you a 5% chance of seeing a false positive when testing 1 metric, if you have 20 metrics then there is over 65% chance that at least one of those metrics would appear significant even when your treatment had no impact whatsoever.

Multiple comparison corrections solve this problem by taking into account how many metrics are being tested and adjusting the threshold required for significance, or equivalently, adjusting each metric's p-value. For interpretability we adjust the p-value, this means that whether a metric is statistically significant or not still depends on whether it's adjusted p-value is below your account's significance threshold.

## The multiple comparison correction

There are a few potential ways to correct for multiple comparisons. At Split, we chose to apply a Benjamini Hochberg correction. This controls the False Discovery Rate - this is the fraction of all significant results which are false positives. Our corrections ensure that the likelihood that a statistically significant metric is a false positive is, at most, equal to your chosen significance threshold.

For example, with the correction applied, if you have 100 metrics in your account and a particular test shows 20 of those as statistically significant metrics, with the default significance threshold of 0.05, you can expect that around 1 of those 20 metrics will be a false positive; you can be confident that the others are indicative of a true impact. Without corrections applied, testing 100 metrics means we’d expect at least 5 of them to appear significant even when your treatment had no impact at all.

## Key and supporting metrics

The multiple comparison correction is applied separately to your set of key metrics and your set of supporting metrics. This is to allow you the flexibility to choose metrics which are of particular importance and relevance to your test and set them as key metrics.

If you choose a small subset of your metrics to be key metrics, these have a smaller adjustment applied and have more power and more sensitivity to detect true impacts. In fact, if you choose one single metric to be your key metric, then no correction needed and no adjustment is applied to the p-value for that metric. This gives that metric the maximum sensitivity.

When applying key metrics, we recommend that you set the metric you are most hoping to change in your hypothesis to be a key metric for your feature flag. You may also want to set a handful of other metrics as key metrics in addition to this if you have multiple metrics that are particularly important to you for that test. The more metrics there are in each set (key or supporting), the stricter the adjustment that is applied.

This means if you alter which metrics are set as key or supporting metrics during your experiment, it is possible your statistical results may change. Metrics which we don’t compute statistical significance for, e.g., metrics with very low sample sizes, do not influence the correction which is applied.

We only apply the correction once for all supporting metrics. When you search and filter supporting metrics using the search box, your statistical results don't change.

## How this affects your results

If you have your statistical settings set to apply multiple comparison corrections, they will be applied to all results of all of your tests by default. We will adjust the p-value for you, and in the [Metric Details and Trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends) view the p-value shown will already have been adjusted to account for the multiple comparison correction.

We also adjust the error margins and confidence intervals of your results to be consistent with the correction applied to your p-values. These are shown as the ‘impact lies between’ and ‘metric lies between’ values. Rather than using the default 95% confidence to calculate these ranges, we will show the range that is calculated with a higher level of confidence. This can vary with each test as it is influenced by how many metrics are significant.

## How this affects power analysis and recommended run time

Our sample size and sensitivity calculators [here](https://help.split.io/hc/en-us/articles/360034040851-Sample-size-and-sensitivity-calculators) use power analysis techniques to recommend how long to run your experiments. It is difficult to account for multiple comparison corrections in these calculators, as the level of adjustment that is applied to your results is dependent on the results themselves and can’t be known in advance.

However, in the case when you have only one key metric set, these calculators are valid and highly recommended to help decide in advance how long your test should run. When you have multiple key metrics set these calculators may underestimate the sample size needed. We recommend you use these as a guideline for the lower limit of the sample size and run time that is needed. 
