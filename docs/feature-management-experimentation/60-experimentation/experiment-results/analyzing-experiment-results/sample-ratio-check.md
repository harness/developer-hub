---
title: Sample ratio check
sidebar_position: 30
---

## Overview
 
The meaningful analysis of an experiment is contingent upon the independent and identical distribution of samples between the treatments. If the samples are not selected truly at random or distributed according to specified ratios across treatments, then any conclusions drawn may be attributable to the method by which the samples were selected and not the change being tested. 

To detect a sampling bias in your randomization, ensure that the samples selected by the targeting rules engine match the requested distribution within a reasonable confidence interval. 

If you design an experiment with equal percentages (the targeted ratio is 50/50 split in treatments *on* and *off*), and the current sample distribution deviates significantly from the targeted ratio, the experiment may have an inherent bias and the experimental results may be compromised. 

However, it's important to note that slight deviations (such as 49.9/50.1 in a 50/50 split) are common and normal as long as the deviation is not statistically significant. The scale of this deviation shrinks as your sample size increases. 

As an illustrative example, in the case of a 50/50 rollout, the 95th percent confidence interval for 1,000 samples lies at 50±3.1%. Simply put, with 1,000 users, if there are more than 531 users in any given treatment there is sample ratio mismatch (SRM). This delta shrinks as the sample size increases. With 1,000,000 samples, a variation of ±0.098% in the sample distribution is cause for concern. As you can see, it is important to understand this potential bias and evaluate your sample distribution thoroughly to prevent invalid results.

:::note
A 50/50 rollout does not imply a perfect 50/50 split in every sample; a small margin of error is expected due to randomness. The sample ratio check detects when this margin of error exceeds a predefined threshold, signaling a possible issue with the randomization or sample allocation.
:::

## Sample ratio check
 
Harness FME uses a chi-squared goodness of fit test to detect significant deviations between the targeted and observed sample ratios. This test performs a pairwise comparison between the actual number of users assigned to each treatment and the expected distribution. If the resulting p-value is less than 0.001, we flag a sample ratio mismatch (SRM).

The null hypothesis of this test assumes that the observed user distribution matches the expected allocation across treatments. A statistically significant result (p < 0.001) indicates that the observed distribution is unlikely to have occurred by chance and may be due to bias in traffic allocation.

When conducting its sample ratio check, Harness FME compares the calculated p-value against a threshold of 0.001. This threshold was determined based on the constant and rigorous monitoring performed on the accuracy of our randomization algorithms, and to minimize the impact a false positive would have on the trust of experimental results. We use a threshold of 0.001 (rather than the more common 0.05) to minimize the risk of false positives. This stricter threshold reflects our confidence in the underlying randomization and helps ensure that flagged SRMs are meaningful.

The Harness FME platform performs a sample ratio check with each calculation update to monitor for a significant deviation between the targeted and current sample ratios. This **sample ratio check** is located beneath the summary of key and supporting metrics with other key information including **duration** and **last updated**.

<img src="https://help.split.io/hc/article_attachments/360043234732" alt="sample_ratio_check.png" width="900" /> 

When performing a sample ratio check in the Harness FME platform, the current treatment pair ratio has to match the targeted treatment pair ratio. For example, say your targeted ratio was 25/25/50 across treatments A/B/C. FME performs pairwise comparisons between all treatment pairs: A vs. B, A vs. C, and B vs. C. For A vs. B, the targeted ratio is 25/25 out of the combined 50% allocated to A and B, which simplifies to 50/50. For A vs. C and B vs. C, the targeted ratios are 25/50, or 1:2. The sample ratio check is conducted against this targeted 50/50 distribution for the selected treatment pair, not the full A/B/C allocation.

The table below shows the results of the check and a quick overview of each. 
 
| **State** | **Overview** |
| --- | --- |
| Valid |The feature flag has a valid sample ratio based on the treatments and targeting rule selected. |
| Mismatch | The feature flag has a sample ratio mismatch based on the treatments and targeting rule you selected. Do not trust the impact shown below. |
| Not Applicable | Sample ratio calculation is not applicable as you have selected the *any* targeting rule. |
| Not Applicable | Sample ratio calculation is not applicable as you have selected an individually targeted rule. |
| Not Applicable | Sample ratio calculation is not applicable as you have selected an individually targeted segment. |
| Not Applicable | Sample ratio calculation is not applicable as you have no baseline selected. |
| Not Applicable | Sample ratio calculation is not applicable as no traffic is in at least one of the treatments. |
| Not Applicable | Sample ratio calculation is not available as there are no users in your samples. |
| Not Applicable | Sample ratio calculation is not available as the calculation has not yet run for this feature flag. |

## What to do if you see a Sample Ratio Mismatch warning

Unfortunately there are a variety of potential causes of sample ratio mismatches (SRMs) and the root cause can often be difficult to diagnose. The most common causes of SRMs are explained below, along with some suggested approaches to verify or rule out each cause. 

In the first instance, if you have not already done so, it can be useful to run a simple AA test - a feature flag where there are no differences whatsoever between the treatments - to verify that your SDK is set up correctly and that there is no recurring SRM that is independent of the changes you are testing. 

In general we recommend waiting until the end of the review period or intended run-time (for fixed horizon tests) before stopping your feature flag and interpreting the metrics. However, in the case of an SRM warning, this is an indication of an underlying issue with the feature flag and you do not need to wait a full review period before the SRM result is valid and meaningful.

### Potential causes of an SRM

#### Excluded Users

In some cases, users may be [excluded](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results/attribution-and-exclusion/) from the analysis due to seeing multiple treatments or rules, and because some treatments inherently exclude more users than others, this can cause a Sample Ratio Mismatch, introduce a bias into your samples, and invalidate the results.

For example, if you have different rules for users on each of your 3 plan types (e.g. Free, Trial and Paid), and if one of your treatments causes more users to switch between these plan types then this may result in more users being excluded from that treatment.

To check whether this is the cause of your SRM, we suggest you look at the ‘excluded’ column under the sample population section of the [Metric Details and Trends](/docs/feature-management-experimentation/experimentation/experiment-results/viewing-experiment-results/metric-details-and-trends/) view to see if your treatment has caused users to be removed from your analysis. 

#### Data Loss

An SRM may indicate that a treatment is introducing a bias into the data capture. If a treatment causes some data loss, for example by triggering an exception which kills the application or by navigating the user away from the page or app before the data is flushed, this is likely to cause an SRM. This may present as an extreme SRM if no data is received for a particular treatment, or it may be more of a subtle effect if not all users are affected or if the data capture bias is due to the treatment impacting the average time spent on the page for example. 

Measuring guardrail metrics such as bounce rate, session length and page load time, as well as logging exceptions or errors, can be useful indicators of changes to user behavior and performance that might support data loss as an explanation for your SRM. 

#### Interaction Effects 

The randomization of users happens on a feature flag level, rather than being per-rule. This means that if some users move between rules within the same feature flag, and if the likelihood of a user moving between rules is impacted by a treatment, this can cause imbalanced samples and an SRM. 

For example, imagine you have 2 separate rules for users on your Free and Paid plans, each with a 50:50 percentage rollout between the ‘on’ and ‘off’ treatments. If the ‘on’ treatment causes more users to upgrade from Free to Paid, you would see more users in the ‘on’ treatment for your Paid rule and an SRM warning.

SRMs caused by these interaction effects can be seen by checking how many users appear in multiple rules. In the example above, if you had a metric measuring how many users upgraded from the Free plan to the Paid plan, this could directly indicate whether it is a likely cause. In order to avoid these kinds of interaction effects, it may be safer to run separate feature flags for the two different plan types, and if necessary include dependencies between the two feature flags in the targeting rules.

#### Bucketing and Matching Keys

If you are using bucketing keys, an SRM may indicate a misconfiguration or be due to users receiving a fallback bucketing key. In this case we recommend you contact the FME support team at [support@split.io](mailto:support@split.io) who can look at the distribution of the buckets and check for outliers. 

#### Random Chance 
Since we are dealing with randomness and probabilities, there is always a possibility, albeit very small, that you see an SRM warning due to random chance alone with no real underlying issue. We use a strict threshold in our SRM test to ensure this is a very rare situation, but there is still a 1 in 1000 chance that you see a false SRM warning. If you have exhausted other options and believe your SRM may be a false alert then we suggest rerunning the feature flag - there is an exceptionally small chance of seeing the same false alert twice.