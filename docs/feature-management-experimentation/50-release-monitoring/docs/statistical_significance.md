---
title: Statistical significance
sidebar_label: Statistical significance
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border: '1px', fontFamily: 'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020641472-Statistical-significance </button>
</p>

## Overview
 
Statistical significance represents the likelihood that the difference in your metric between a selected treatment and the baseline treatment is not due to chance. Your significance threshold is a representation of risk tolerance. Formally, the significance threshold is the probability of detecting a false positive as outlined above.

A commonly used value for the significance threshold is 0.05 (5%), which means that every time you do an experiment, there is a 5% chance of detecting a statistically significant impact, even if there is no difference between the treatments. In statistical terms, the significance threshold is equivalent to alpha (α).

In experimentation, you observe a sample of the population and use the samples that you observed to make inferences about the total sample population. At a conceptual level, the role of the statistics engine is to determine the likelihood that these sample distributions were drawn from the same underlying population (the *null hypothesis*). More informally, the null hypothesis poses that the treatment had no impact on the metric, and the goal of the statistics engine is to check if the distribution of metric for users receiving treatment and those receiving the baseline treatment is sufficiently different. Split uses statistical significance to infer whether your treatment caused the movement in the metric.

The impact you see could be the result of a typical fluctuation in the metric instead of an actual change caused by the underlying treatment. To remove this potential concern, specify a lower significance threshold. For example, if you set your significance threshold to .2 and you see a statistically positive impact, there is a 20% chance that what you see is not actually a statistically positive impact. At a .10 threshold, the chance of error decreases to 10%. However, the lower your significance threshold, the more samples your experiment requires. 

Choosing the right significance threshold should balance the confidence you want to have in the impact not being by chance and the number of samples (traffic) that you receive.

Learn more below about testing for a significant impact, the methodologies, and default configurations used in Split. If your account's risk tolerance is lower, or your traffic volumes are of scale, learn more about [changing statistical settings](https://help.split.io/hc/en-us/articles/360020640752) in Split.


## Two-tailed test
 
The role of a statistics engine is to determine the likelihood that the sample distributions were drawn from the same underlying population (the *null hypothesis*). More informally, the null hypothesis poses that the treatment had no impact on the metric, and the goal of the statistics engine is to check if the distribution of the metric for users receiving the treatment and those receiving the baseline treatment is sufficiently different.

Diving a bit deeper into statistics, this can be formalized through hypothesis testing. In a hypothesis test, a test statistic is computed from the treatment and baseline treatment distributions. The test statistic can be calculated using a technique known as the *t-test*. 

Split uses a two-sided test to detect differences between your baseline and your treatment in both directions.

Next, the p-value is computed, which is the probability of observing a t at least as extreme as we observed.

The computed p-value is displayed for each metric and compared against the significance threshold setting, or α, for your account. See below for more background on alpha and type 1 errors. 

## Type 1 error
 
The *type 1 error* is when the null hypothesis, that the treatment has no impact, is true, but it is incorrectly rejected, commonly known as a *false positive*. The probability of this error is called significance threshold or alpha (α).

If the p-value you computed above is less than α, it would be challenging to hold on to our hypothesis that there was no impact on the metric. 

In this scenario, we reject the null hypothesis and accept that the treatment had an impact on the metric when compared to the baseline.

## Type 2 error
 
The *type 2 error* is when the null hypothesis is false, but it is incorrectly accepted, commonly known as a *false negative*. The power threshold of a hypothesis test is 1 - β, where β is the probability of a type 2 error.

With modern telemetry systems, it is easy to check the change in a metric at any time. However, to determine that the observed change represents a meaningful difference in the underlying populations you first need to collect a sufficient amount of data, or achieve enough power.

The target sample size at which you should evaluate the experimental results is based on what size of effect is meaningful (the minimum detectable effect), the variance of the underlying data, and the rate at which it is acceptable to miss this effect when it is actually present (the power threshold). 

In Split, you can customize the significance threshold and power thresholds.

Learn more about interpreting your metrics impact and configuring your statistical settings in Split.

## Normal distribution
 
Robust experiments rely on the means of treatment and control groups, which are assumed to be normally distributed. The *central limit theorem (CLT)* shows that the mean of a variable has an approximately normal distribution if the sample size is large enough. We apply the [rule of thumb](http://bit.ly/expRulesOfThumb) that the minimum number of independent and identically distributed observations needed to safely assume that the means have a normal distribution is 355 for each treatment. Hence, by default we require a sample size of at least 355 in each treatment before we calculate significance for your metrics. You can change this minimum sample size requirement in the [Monitor and Experiment settings](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings) section in Split.

## Alert Policy Statistics 

To enable the ability to detect degradations of a metric within the first 30 minutes of a new version of a split, some statistical adjustments have been applied during this monitoring window.

* A one sided t-test will be used during this monitoring window, based on the desired impact in the metric definition to derive the undesired impact.  
* During the monitoring window we will consider the null hypothesis to be, the difference between the two treatments is equal to or less than the degradation threshold configured by the user. This threshold is a relative percentage of the metric and will be measured against the alert baseline treatment of a particular split. 
* Comparisons of the the p-value will be against a hard-coded list of p-value thresholds generated from your account-wide alpha-level. 
* To avoid an increased false positive rate due to multiple testing, we will adjust your account's set alpha-level by alpha divided by the number of calculations ran within the first 30 minutes. 
* Calculations of error margins on the impact will assume symmetrical uncertainty.
