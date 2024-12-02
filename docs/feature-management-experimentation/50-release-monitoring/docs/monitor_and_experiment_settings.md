---
title: Monitor and experiment settings
sidebar_label: Monitor and experiment settings
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020640752-Monitor-and-experiment-settings <br /> ✘ images still hosted on help.split.io </button>
</p>

Whether you are releasing new functionality or running an experiment, Split analyzes the change in your metrics. This allows you to determine whether the impact is positive and statistically significant and not happening by chance. You can ensure the analyses are run in the way which best suits your use cases by configuring your statistical settings. For example, you can adjust parameters such as the significance threshold. This controls your chances of seeing false positive results. You can set it higher for a faster time to significance or lower to filter more reliable results, which reflects your preferred balance between confidence and time.

There are two types of statistical settings:

* [Monitor settings](#monitor-settings). Impacts how your alert policies are triggered
* [Experiment settings](#experiment-settings). Impacts how your metric impact results are analyzed

You can set account-wide defaults by configuring your account's statistical settings in the Admin settings section. These settings are used to trigger all alert policies and uncustomized feature flags, and they are applied by default for all newly created feature flags.

You can also configure the experiment threshold of your feature flags individually by customizing their settings. The settings used for a particular environment's results within a particular feature flag can be individually customized. When you customize your experiment settings at the feature flag-level, the new settings are immediately applied to all versions of the feature flag only in the particular environment you customized. For example, you could set a particular feature flag to use different experiment settings in the staging and production environments. Customizing experiment settings at the feature flag-level has no impact on your other feature flags or any of your alert policies.

## Changing the settings

The following explains how to change your account- and feature flag-level settings. Account-wide settings trigger all alert policies and uncustomized feature flags, and they are applied by default for all newly created feature flags. Feature flag-level settings are individually customized for a particular environment's results within a particular feature flag.

### Changing account-wide settings

To change your account-wide settings, do the following:

**Important: The testing method menu list only applies to results that are in your user interface. It doesn't apply to your alerts.**

1. From the left navigation, click the **user's initials** at the bottom and then **Admin settings**. 
2. Click the **Monitor window and statistics** selection. The Monitor window and statistics page appears.

 <p>
      <img src="https://help.split.io/hc/article_attachments/30833174987661" alt="monitor_and_experiment_settings_account.png" />
 </p>

3. Adjust your settings and and when done, click **Save**.

___Note: Changing your statistical settings instantly affects your entire account.___ _All alert policies are analyzed against the new settings in future. All feature flags which are not customized (i.e., those for which the Always use account-wide settings checkbox is checked in their experiment settings) are also analyzed using these new settings._

_For example, if your experiment is showing metrics as having a statistically positive impact at a .05 significant threshold, and you change your significance threshold from 0.05 to 0.01, the next time you load your metrics impact page you may see that metrics are no longer marked as having a significant impact._

### Changing feature flag-level settings

___Note: When you change the experiment settings for a feature flag, it immediately affects all versions of that flag in the environment for which you customized the settings.___ _Versions in other environments, other feature flags in your account, and all alert policies aren't affected by your customization. Customizations apply to specific environments. If your feature flag has multiple environments, each must be customized separately._

To change the settings of a feature flag, do the following:

1. From the left navigation, select a feature flag.
2. Click the **Metrics impact** and then **Experiment settings** tabs. Be sure that you select the right environment, or change the selection in the environment menu list in the top section to customize a different environment.

<p>
  <img src="https://help.split.io/hc/article_attachments/30833174988045" alt="monitor_and_experiment_settings_feature.png" />
</p>

3. To set a specific setting for a specific experiment, uncheck the **Always use account-wide settings** selection and modify the setting you want to change.
4. After you adjust your settings, click **Save**.

___Note:___ _When the **Always use account-wide settings** checkbox is selected, the settings for a flag update whenever your account-wide settings are changed._ _When it's not selected, the settings no longer reflect any changes to your account-wide settings._

## Monitor settings

___Note: Monitor settings can only be configured at the account level.___ _This is to ensure each alert policy is always analyzed against the same statistical settings, maintaining consistency across any alerts that may be raised._

The following describes how to set your monitor settings.

### Monitor window

Split allows you to configure how long you want your metrics to be monitored for and alert you if a severe degradation occurs. By default, the monitoring window is set to 24 hours from a feature flag version change. You can select from a range of different monitoring windows, from 30 minutes to 28 days.

With these monitoring windows, you can customize your monitoring period based on your team's release strategy. Adjust your monitoring window to 24 hours if you are turning on a feature at night with low traffic volumes and you want to monitor through the morning when traffic begins to increase, or to 30 minutes if you are expecting high traffic volumes within the first 30 minutes of a new feature flag version. To learn about selecting your degradation threshold based on your expected traffic, refer to [Choosing your degradation threshold for alerting](https://help.split.io/hc/en-us/articles/360030908431) for more information.

### Monitor significance threshold

The monitor significance threshold limits your chances of receiving a false alert. A lower significance threshold means you wait until there is more evidence of a degradation before firing an alert. Therefore, a lower significance threshold reduces the chance of false alerts, but this comes at the cost of increasing the time it takes for an alert to fire when a degradation does exist.

A commonly used value for the monitor significance threshold is 0.05 (5%), which means that, for each alert policy and for each version update, there is at most a 5% chance of seeing an alert when the true difference between the treatments is less than the degradation threshold set up in your metric’s alert policy.

You can configure the monitor significance threshold independently from the default significance threshold used for calculating your metric results. Changing this setting only impacts your monitoring alerts and not the metric results.

### Statistical approach used for monitoring window

For [alert policies](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting), rather than testing for statistically significant evidence of any impact as we do for our standard metric analyses, we test for significant evidence of an impact larger than your chosen degradation threshold, in the opposite direction to the metric’s desired direction.

In order to control the false positive rate during the monitoring window we adjust the significance threshold that the p-value must meet before an alert is fired. We divide the threshold by the number of times we check for degradations during the selected monitoring window. For example, if your monitoring window is 30 minutes, we estimate that we run 5 calculations during that time. In this case, if your monitor significance threshold is set to 0.05 in your statistical settings, the p-value would need to be below 0.01 (0.05 / 5) for an alert to fire in this time window.

This adjustment allows us to control the false positive rate and ensure that the likelihood of getting a false alert, across the whole of the monitoring window, is no higher than your chosen monitor significance threshold. The level of adjustment is dependent on the duration of the monitoring window and how many calculations run during that time.

This adjustment means that a longer monitoring window have slightly less ability to detect small degradations at the beginning of your release or rollout, but in most cases this is outweighed by the gain in sensitivity due to the larger sample size you accrue over a longer window.

## Experiment settings

The following describes how to set your experiment settings.

### Testing methods

Split supports sequential testing and fixed horizon methods. 

#### Using sequential testing

Sequential testing is a statistical testing method where the sample size is not fixed in advance. This allows us to obtain statistical results without the constraint of an experimental review period or how often the results can be checked. The advantage of this kind of testing is that it allows you to peek at your data at any given time. Peeking means you can review your statistical results while the experiment is running. This allows you to have:

* Shorter monitored release cycles
* Faster release decisions (e.g., rollout, rollback, or kill)
* Quicker iteration of experiments if large changes are observed early. If significance is reached early, you can stop the experiment early and move on to the next experiment, freeing you up to focus on the next consideration.

Use sequential testing if you:

* Do a percentage-based rollout and go from a 0-100 within a short period of time (e.g., 1 week) while ensuring I haven’t broken anything

* Want to check your data during a rollout, trust your results, and confidently make the decision to roll back your feature at the first sign of degradation

* Want to stop your experiment early if you see a big change in your results. This allows you to either continue to optimize your feature or move onto your next project.

* Have high traffic (e.g., > 1000 for both treatments in a week)

* Are expecting relatively large impact (rather than small changes)

#### Using fixed horizon testing

Fixed horizon allows you to estimate a sample size and do a single statistical test and draw conclusions from that test. In the fixed horizon method, peeking before your experiment is completed leads to a higher chance of false positives. Doing tests at random stopping points and looking at the statistical results might compromise the validity of these results by increasing the number of false positive results, thereby rendering some of the product decisions ineffective.

With fixed horizon:

* Results are valid once they have met their 14 day review period 
* Optimal for if you are making small optimization “tweaks” within your KPIs
* You have a high risk of interpreting a false positive when peeking at the data early

Use fixed horizon if you:

* Want to focus on a very specific outcome and make small optimizations “tweaks” to your KPIs (e.g., a hypothesis-driven development based on optimizing small changes, like cart conversion rates)

* Have low traffic

For more information, refer to [Split’s approach to statistics](https://help.split.io/hc/en-us/articles/360042265892-Split-s-approach-to-statistics-).

### Default significance threshold

The significance threshold is a representation of risk tolerance. Formally, the significance threshold is the probability of a given metric calculation returning a statistically significant result when the null hypothesis is true (i.e., when there is no real difference between the treatments for that metric).

A higher significance threshold allows you to reach statistical significance faster when a true difference does exist, but it also increases your chances of seeing a false positive when no true difference exists. Conversely, a lower significance threshold reduces your chances of seeing false positive results but you need a larger difference between the two treatments, or a larger sample size, in order to reach statistical significance.

A commonly used value for the significance threshold is 0.05 (5%). With this threshold value, a given calculation of a metric where there was no true impact has a 5% chance of showing as statistically significant (i.e., a false positive). If Multiple Comparison Corrections have been applied it means there is a 5% chance of a statistically significant metric being a false positive.

### Minimum sample size

The minimum sample size (MSS) is the number of samples required in each treatment before we calculate statistical results for your metrics. By default, the minimum sample size for all testing methods is 355, and we recommend using this for most situations. For the fixed horizon testing method, this number must be at least 10 samples. For sequential testing, it must be at least 100.

For the t-test used in Split's statistics to be reliable, the data must follow an approximately normal distribution. The central limit theorem (CLT) shows that the mean of a variable has an approximately normal distribution if the sample size is large enough.

You can reduce the default minimum sample size of 355 if you need results for smaller sample sizes. For metrics with skewed distributions your results may be less reliable when you have small sample sizes.

This parameter does not affect your monitoring alerts. For alerts, even though you can set a minimum sample size of 10, which allows you to see your results, we require a minimum sample size of over 100 in each treatment to generate an alert.


### Power threshold

Power measures an experiment's ability to detect an effect, if possible. Formally, the power of an experiment is the probability of rejecting a false null hypothesis.

A commonly used value for statistical power is 80%, which means that the metric has 80% chance of reaching significance if the true impact is equal to the minimum likely detectable effect. Assuming all else is equal, a higher power increases the recommended sample size needed for your feature flag. In statistical terms, the power threshold is equivalent to 1 - β.

### Experimental review period

The experimental review period represents a period of time where a typical customer visits the product and completes the activities relevant to your metrics. For instance, you may have different customer behavior patterns during the course of the week or on the weekends (set a seven day period).

A commonly used value for experimental review period is at least 14 days to account for weekend and weekly behavior of customers. Adjust the review period to the most appropriate option for your business by selecting 1, 7, 14, or 28 days.

#### Using fixed horizons in experimental review periods

If you use fixed horizon, establish experimental review periods. When you make conclusions about the impact of your metrics during set experimental review periods, this minimizes the chance of errors and allows you to account for seasonality in your data.

For example, you see a spike in data on certain days of the week. It would be against best practice to make your product decisions based on the data observed on only those days, or without including those days. Another example is a key event, such as arriving for a restaurant reservation, may not happen until a few weeks after the impression.

The review period has no direct impact on the metrics, neither the ingestion of events nor the recalculation of metrics. It's there as a guideline for users to provide a caution against making a decision too early or without accounting for seasonality, even if the card shows as statistically significant. Once the review period is reached, you can  trust your results, because in many cases, the results on day 15 are probably as accurate as the results on day 14 (or 16 or 17, etc.).

### Multiple comparison corrections

Analyzing multiple metrics per experiment can substantially increase your chances of seeing a false positive result if not accounted for. Our multiple comparison corrections feature applies a correction to your results so that the overall chance of a significant metric being a false positive is never larger than your significance threshold. For example, with the default significance threshold of 5%, you can be confident that at least 95% of all the changes without meaningful impacts don't incorrectly show as statistically significant. This guarantee applies regardless of how many metrics you have.

With this setting applied, the significance of your metrics, and their p-values and error margins, is automatically adjusted to include this correction. This correction is immediately applied to all tests, including previously completed ones. Refer to [Multiple comparison corrections guide](https://help.split.io/hc/en-us/articles/360037852431-Multiple-comparison-correction) to learn more.

## Recommendations and trade-offs

Be aware of the trade-offs associated with changing the statistical settings. In general, a lower significance threshold increases the number of samples required to achieve significance. Increasing this setting decreases the number of samples and the amount of time needed to declare significance, but may also increase the chance that some of the results are false positives.

As best practice, we recommend setting your significance threshold to between 0.01 and 0.1. In addition, we recommend an experimental review period of at least 14 days to account for weekly use patterns.

