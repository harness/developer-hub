---
title: Monitoring window
sidebar_label: Monitoring window
helpdocs_is_private: false
helpdocs_is_published: true
---

import MonitoringSettings from "@site/docs/feature-management-experimentation/50-release-monitoring/_templates/_monitor-and-experiment-settings.mdx";

<MonitoringSettings />

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