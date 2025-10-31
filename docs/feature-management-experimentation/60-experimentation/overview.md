---
title: Overview
sidebar_position: 10
---

Experiments measure the success of your website, application, back-end performance, etc. Experiment metric results tell you if your new features are improving, degrading, or having no effect on your application users’ experience.

Experiments take in your experimental control variables, measure events, and display the results. Your experiment will show you if the data is in correct ratios (a passing health check), the running time has completed, and the results are conclusive, equipping you with data to drive your product decisions.

## Create an experiment

For any experimentation program to be successful, teams should be able to remain agile and create repeatable steps. These steps give teams an outline for the who, what, when and where of experimentation.  From conception to iteration, it is important that teams optimize the process itself as they go along, in order to move faster. 

For more information about creating an experiment, see the [Setup documentation](/docs/feature-management-experimentation/experimentation/setup/).

## Use tags to organize experiments

You can add **tags** to experiments to make it easier to search, filter, and apply standards. Tags are flexible labels that let you group experiments by team, purpose, status, or any internal conventions. 

Learn more about [experiment tags](/docs/feature-management-experimentation/management-and-administration/tags/).

## Review metrics during an experiment

With Split, it is easy to check the change in a metric at any time; but to determine that the observed change represents a meaningful difference in the underlying populations, one first needs to collect a sufficient amount of data. If you look for significance too early or too often, you are guaranteed to find it eventually.

Similarly, the precision at which we can detect changes is directly correlated with the amount of data collected, so evaluating an experiment’s results with a small sample introduces the risk of missing a meaningful change. The target sample size at which one should evaluate the experimental results is based on what size of effect is meaningful (the minimum detectable effect), the variance of the underlying data, and the rate at which it is acceptable to miss this effect when it is actually present (the power).

The Experimental review period feature is intended to help avoid reaching conclusions before taking into account how long an experiment should run. For more information on review periods and when metric cards are updated, see [Metric calculation schedule](/docs/feature-management-experimentation/experimentation/experiment-results/viewing-experiment-results/metric-calculation-schedule#when-are-metric-cards-updated).

### About experimental review periods

A best practice is to respect experimental review periods. You shouldn’t draw conclusions about the impact of your metrics every time you compute them. This is called peeking which leads to errors, notably the following three types: failing to account for seasonality, early signal, and false positives.

User behavior changes by time of day or day of week. For example, let’s say you have a restaurant booking platform. If your change has a dramatic impact for users who book on Sunday night, it might not be representative of all your users. Many events only come days later. They can book a restaurant several days ahead. They won‘t confirm or pay until then.

We won’t block you from seeing your current metrics impact. The review period doesn’t influence the data process. It provides a caution against making a decision too early, without accounting for seasonality, or gaming statistical significance. It’s a common practice for mature experimentation teams; they wait for the experiment to run for a set the number of days before making a decision.

You can set it to either an account-wide or per-feature flag setting. Outside of the review period, we warn you that results MAY not be representative. Use appropriate judgment: if your review period is 14 days, the results on day 15, 16 or 17 are likely reliable. Be aware if your product has a very specific cadence. For example, processing pay stubs must include full periods to capture a representative cycle.

## Change an experiment

During the course of an experiment, the metrics and review period will reset any time you make a change to the feature flag. This ensures that you are evaluating your metrics based on a consistent distribution of the population. When the distribution changes, your experiment resets.

If you change a metric during a running experiment the metric card will show a message saying that we have no data for that card. The next time the calculations are made for that experiment (the frequency depends on the age of the experiment) the card will be updated to reflect the new metric definition. Versions of the experiment that have already been completed will not get recalculated.

### Ramp plans

You will want to take these things into consideration when you develop your ramp plan. For percentage-based rollouts it is recommended that you start with a debugging phase: aimed at reducing risk of obvious bugs or bad user experience. The goal of this phase is not to make a decision, but to limit risk; therefore, there is no need to wait at this phase to gain statistical significance. Ideally, a few quick ramps—to 1%, 5%, or 10% of users—each lasting a day, should be sufficient for debugging.

It's during the maximum power ramp (MPR) phase that you'll want to hold your experiment for, in most cases, at least a week. This phase gives the most statistical power to detect differences between treatment and control. For a two-variant experiment (treatment and control), a 50/50 distribution of all users is the MPR. For a three-variant experiment (two treatments and control) MPR is a 33/33/34 distribution of all users. You should spend at least a week on this step of the ramp to collect enough data on treatment impact.

If the targeting is more complex, you may want to use Traffic allocation as a way of moving from risk mitigation to MPR. This could avoid the need to make small discrete changes to the targeting rules. You may have further phases to test scalability, or perhaps to hold out a small percentage of users to understand the long term impact.

Since any change to the experiment will trigger a reset, one best practice is to create a segment for the individual target for each treatment. This allows you to add and delete users from the individual targets without modifying the experiment.

## Analyze experiment results

For more information about analyzing experiment results, see [Analyzing experiment results](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results).
