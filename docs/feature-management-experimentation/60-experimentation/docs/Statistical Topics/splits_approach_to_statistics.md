---
title: Split's approach to statistics
sidebar_label: Split's approach to statistics
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042265892-Split-s-approach-to-statistics </button>
</p>

## Using a frequentist vs a Bayesian approach

Frequentist testing to experimentation is the most commonly used hypothesis testing framework within industry, scientific and medical fields. Bayesian analysis requires a well-formed prior, which is information obtained from previous experiments. Priors often require additional work from users who are often not trained to work with them. Or if you don’t have previous data, you can use your best guess, which is often inaccurate or biased. This is why the frequentist approach is usually preferred. Another advantage of the frequentist system is that we can share our data clearly with customers to follow the work in a way that Bayesian analysis isn’t as easily replicated (especially at scale), and that we have been able to leverage improvements pioneered by industry leaders in product experimentation at companies like LinkedIn and Microsoft. 

## Sequential testing vs. fixed horizon testing

Within the frequentist framework, Split offers sequential and fixed horizon testing methods.

With fixed horizon, Split uses the Welch's t-test, or the unequal variances t-test. This method does not assume equal variances across treatment and control and obtains more accurate results than a traditional Student's t-test. We use the same Welch’s t-test for both proportion and continuous metrics, but variance is calculated differently for each metric type. Even though proportion metrics are binomially distributed, the difference in treatment and control can still be approximated by a t-distribution. When sample size is large enough, the different testing procedures (t-test, binomial test, chi-square, etc.) yield similar results.

Fixed horizon tests in general rely on power analyses before an experiment to estimate when you can check the results, and stipulate that you do not peek at the results before the estimated timeframe. This creates friction for users who are not experts in experimentation–it not only assumes deep knowledge of power analysis, but also prevents users from checking their results early, which potentially slows users down for iteration. 

To complement fixed horizon testing, Split also offers sequential testing, which does not require pre-experiment power analysis (see below for definition of power) and allows early peeking of results. Specifically, the sequential testing method, which is called mixture Sequential Probability Ratio Test (mSPRT), allows you  to check the results almost immediately after launching the experiment for an unlimited number of times, while controlling for a user-specified false positive rate (see below for definition of false positive). 

If there is a difference between treatment and control, this sequential testing method also is guaranteed to detect it. However, because sequential testing doesn’t offer a cure all for experimental issues, you should normally use it in situations where traffic is high and the expected experimental impact is large. 

Both fixed horizon and sequential testing use 2-tailed t-tests, which allows you to detect significance in both directions (positive & negative). Both tests allow Split to calculate the impact and gain a computed p-value. Unlike Bayesian, where you always get an answer, our platform informs you if more data is needed to arrive at a statistically significant impact. Read more about how we test for Type 1 and Type 2 errors in our Statistical significance [documentation](https://help.split.io/hc/en-us/articles/360020641472-Statistical-significance#type-1-error).

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
