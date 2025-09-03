---
title: Split's approach to statistics
description: Learn about Split's approach to statistics.
sidebar_position: 4
---

## Overview

Harness FME's experimentation platform is designed to help you make confident, data-driven decisions. Our statistical framework is grounded in industry best practices and supports both flexibility and rigor. 

This page provides a high-level overview of Harness FME's approach to statistical concepts like hypothesis testing, metric confidence, and guardrail checks. 

## Statistical methods

Harness FME supports both [frequentist and Bayesian approaches](/docs/feature-management-experimentation/experimentation/key-concepts/frequentist-vs-bayesian) to hypothesis testing, depending on your team's preferences and use case.

Harness FME also offers support for [sequential and fixed horizon testing](/docs/feature-management-experimentation/experimentation/key-concepts/fixed-horizon), which gives you the ability to choose the right evaluation method based on your experimentation cadence and business needs.

## Experiment sensitivity and confidence

To help you tune the statistical rigor of your experiments, Harness FME enables you to configure your own [significance thresholds](/docs/feature-management-experimentation/experimentation/setup/experiment-settings#default-significance-threshold) and [power thresholds](/docs/feature-management-experimentation/experimentation/setup/experiment-settings#power-threshold). These settings help balance the risk of false positives against the need for faster insights.

## Minimum sample size

The minimum sample size is the smallest number of exposures each treatment group must reach before Harness FME evaluates significance for your metrics. Harness FME enforces a [minimum sample size](/docs/feature-management-experimentation/experimentation/setup/experiment-settings#minimum-sample-size) before metrics are analyzed. This helps ensure that results are statistically valid and not skewed by small sample artifacts. 

### Normal distribution

Harness FME assumes that the means of the treatment and control groups are normally distributed. The central limit theorem (CLT) supports this assumption by showing that the mean of a variable tends toward a normal distribution as sample size increases.

To apply this reliably, Harness FME uses a rule of thumb: each treatment group must reach **at least 355 independent observations** before significance is calculated. This default minimum sample size is based on a [Microsoft paper](https://www.exp-platform.com/Documents/2014%20experimentersRulesOfThumb.pdf) and has become a commonly accepted threshold for statistical robustness.

The minimum enforced sample size is 10 for fixed horizon testing and 100 for sequential testing, but significance calculations begin only when each treatment group reaches 355 samples.

## Guardrail checks

Harness FME includes out-of-the-box checks to ensure data quality and prevent misinterpretation of results:

* [Review period check](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results/review-period-check) ensures metrics aren't analyzed too soon after a flag rollout.
* [Sample ratio mismatch (SMR) check](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results/sample-ratio-check) detects uneven user allocation between treatment groups.

These guardrails help you trust that your experiment results are reliable and not driven by data integrity issues.

## Attribution and exclusion

Split utilizes a well-documented and tested [attribution and exclusion](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results/attribution-and-exclusion/) algorithm. 

This has the following benefits:

* You can ingest data from any data source for evaluation. By using your data, you can always be confident in its integrity and accuracy.

* You can send in data to Split after an experiment is already running. Oftentimes, you might have already tracked some type of user action (e.g. clicks on a navigation bar) but might not have fed that data into Split ahead of running an experiment.  

  You don't need to set attribution based on the time an event is sent to us, the timestamp of the events you send is when the data was logged. This allows you to send data after events have already occurred and attribute them to experiments by matching the timeframes using the time field for when your application logged that data.

* You can define a metric in Split after an experiment is already running. Similar to the scenario above, you might also have data that you tracked during an experiment, but haven't yet defined a metric for in Split. 

  As long as Split has the events tied to a metric in our system, our system allows you to define a metric at any time during the experiment, even after you've started running the test. On the next run of the calculation job, the system will calculate the impact of your experiment on that new metric from when the experiment began regardless of when you defined the metric.