---
title: Alert policies
sidebar_position: 20
---

An alert policy allows you to configure a degradation threshold for your metric. If the feature flag causes the metric to go below or above that threshold you are alerted by your configured notification channel.

## Alert policy sensitivity

There are two configurable parameters for feature monitoring - the length of the monitoring window and the degradation threshold. These can be changed in the [Monitor and Experiment Settings](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings) section of your admin panel. By adjusting these parameters you can tailor the coverage and sensitivity of feature monitoring alerts in the way that best suits your organization and metrics. See [this article](https://help.split.io/hc/en-us/articles/360035504952-Choosing-your-monitoring-settings) for a more in depth discussion on factors to consider when choosing these settings. 

## Sensitivity calculators

As with any statistical test in experimentation, we can't detect everything - each metric will only have the power to detect degradations larger than a given size. Smaller degradations will not be distinguishable from natural noise and variations in your data. 

The calculators below can be used to help you calculate what range of degradations you can expect to be able to detect for a given sample size and set of metric characteristics. If your metric is a count, sum, average or ratio metric, use the [first calculator for means metrics](#calculator-for-means). Otherwise, if your metric is a percent of unique users metric, use the [second calculator for proportions](#calculator-for-proportions).

:::note
These calculators assume your statistical settings are set at a significance threshold of 0.05 and a power threshold of 80%. 
:::

For example, imagine you have a Percentage of Unique Users metric which has a value of 60% in the baseline treatment, and you use a relative degradation threshold of 10%. If the desired direction of the metric is a decrease, then we would be testing for evidence that the Percentage of Unique Users in the comparison group is *more* than 66% (more than 10% higher than the baseline value). 

Assuming a 50/50 percentage rollout of users between baseline and comparison treatments, an Org wide significance level of 0.05, and a monitoring window of 24 hours, with 10,000 unique users you would only see an alert if the observed percentage for the comparison group increased by more than 16.2% and hence had a value higher than 69.7%. If instead you had 1000 or 100,000 unique users, the comparison group value would need to be higher than 77% and 67%, respectively, for an alert to be raised. 

## Using the calculators

If you have the experiment pack and you are unsure of any of the data required for the calculator, we recommended looking at the metric results for a similar feature flag you have already ran, or running a 100% off flag with your intended targeting rules. You can then find the sample size, metric value and standard deviation from the [Metric details and trends view](https://help.split.io/hc/en-us/articles/360025376251-Metrics-impact-Metric-details-and-trends) reached by clicking into the metric card.

### Expected sample size during the monitoring window

This is the total sample size expected to enter your experimental rule during the monitoring window, it will be the total across both treatments rather than per treatment.

The Sample size column is shown under the Sample population section of the data table. You may need to adjust this value if the feature flag you are referencing ran for a different length of time than your chosen monitoring window length. 

<img src="https://help.split.io/hc/article_attachments/26883568432397" alt="sample_size_estimate.png" width="300" />

For example, imagine you see the below table for a feature flag which ran for 48 hours, and you intend to run a similar flag with a monitoring window length of 24 hours. To get the estimated sample size during the 24 hour monitoring window, first sum the sample sizes across the two treatments, to get 2000, then divide by 2 to go from 48 hours to 24 hours - this will give you an estimated sample size during the monitoring window of 1000. 

### Baseline metric value

This is the expected value of the metric in your control group, or the value you expect to see for the treatment set as the alerting baseline. If you are using a reference feature flag, you can also find an estimate for this value in the Metric Details and Trends view, you will need the number under the Mean column in the Metric Dispersion section of the data table.

### Baseline standard deviation 

The standard deviation characterizes how much variation there is in your metric. It is needed for the means calculator but not for the percent-unique calculator. 

You can find this value under the Stdev column in the Metric Dispersion section of the data table.

<img src="https://help.split.io/hc/article_attachments/26883568466445" alt="mean_and_standard_deviation.png" width="500" />

## Calculator for means

<iframe
  src="https://exp-calc-alertmeans-confwindow-baf229399d58.herokuapp.com/"
  width="100%"
  height="600"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>

## Calculator for proportions

<iframe
  src="https://exp-calc-alertprop-confwindow-8c155dbd4fc1.herokuapp.com/"
  width="100%"
  height="600"
  style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
  }}
  loading="lazy"
/>