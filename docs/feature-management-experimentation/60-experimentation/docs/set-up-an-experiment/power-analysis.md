---
title: Power analysis
sidebar_label: Power analysis
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042265892-Split-s-approach-to-statistics </button>
</p>

## Configurable significance and power thresholds 

The [significance threshold](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#significance-threshold) is a representation of your organization's risk tolerance. Formally, the significance threshold is the probability of detecting a false positive.

A commonly used value for the significance threshold is 0.05 (5%), which means that when there is no real difference between the performance of the treatments, there is a 5% chance of observing a statistically significant impact (a false positive). In statistical terms, the significance threshold is equivalent to alpha (α).

[Power](https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings#power-threshold) measures an experiment's ability to detect an effect, if possible. Formally, the power of an experiment is the probability of rejecting a false null hypothesis.

A commonly used value for statistical power is 80%, which means that the metric has an 80% chance of reaching significance if the true impact is equal to the minimum likely detectable effect. Assuming all else is equal, a higher power will increase the recommended sample size needed for your feature flag. In statistical terms, the power threshold is equivalent to 1 - β.

## Guardrail checks

[Review Period Check](https://help.split.io/hc/en-us/articles/360020635912-Review-period-check) - This is a configuration within Split where you can specify how long a test should run to account for the seasonality which may exist in your data.

[Sample Ratio Mismatch Check](https://help.split.io/hc/en-us/articles/360020636472-Sample-ratio-check) - This is meant to detect sampling bias in your randomization by ensuring the distributions match the target rules within a reasonable confidence interval.  

When conducting its sample ratio check, Split compares the calculated p-value against a threshold of 0.001. This threshold was determined based on the constant and rigorous monitoring performed on the accuracy of our randomization algorithms, and to minimize the impact a false positive would have on the trust of experimental results.

## Attribution and exclusion

Split utilizes a well-documented and tested [attribution and exclusion algorithm](https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion). This has the following benefits:
* You can ingest data from any data source for evaluation. By using your data you can always be confident in its integrity and accuracy.
* You can send in data to Split after an experiment is already running. Oftentimes, you might have already tracked some type of user action (e.g. clicks on a navigation bar) but might not have fed that data into Split ahead of running an experiment.  You don't need to set attribution based on the time an event is sent to us, the timestamp of the events you send is when the data was logged. This allows you to send data after events have already occurred and attribute them to experiments by matching the timeframes using the time field for when your application logged that data.
* You can define a metric in Split after an experiment is already running. Similar to the scenario above, you might also have data that you tracked during an experiment, but haven't yet defined a metric for in Split. As long as Split has the events tied to a metric in our system, our system allows you to define a metric at any time during the experiment, even after you've started running the test. On the next run of the calculation job, the system will calculate the impact of your experiment on that new metric from when the experiment began regardless of when you defined the metric.

## Minimum sample size

Minimum sample size is the smallest number of sample size that an experiment has to reach before an experimental analysis can be conducted. 

### Normal distributions

Experiments rely on the means of treatment and control groups, which are assumed to be normally distributed. The central limit theorem (CLT) shows that the mean of a variable has an approximately normal distribution if the sample size is large enough. We apply the rule of thumb that the minimum number of independent and identically distributed observations needed to safely assume that the means have a normal distribution is 355 for each treatment. Hence, we require a sample size of at least 355 in each treatment before we calculate significance for your metrics.

Split arrived at a default minimum sample size of 355, based on a [Microsoft paper](https://www.exp-platform.com/Documents/2014%20experimentersRulesOfThumb.pdf) and has become a general rule of thumb. Currently, the floor for the minimum sample size in Split is 10 for fixed horizon and 100 for sequential testing.