---
title: Create an Experiment
sidebar_label: Create an Experiment
description: Learn how to create an experiment in Harness FME.
sidebar_position: 7
redirect_from:
  - /docs/feature-management-experimentation/feature-management/faqs/is-there-a-way-to-limit-the-number-of-users-in-an-experiment
---

## Overview

[A/B testing](https://www.harness.io/harness-devops-academy/ab-testing), also known as split testing, allows you to evaluate how changes (such as a new feature, layout, or user experience) impact user behavior. By randomly assigning users to different variants and measuring performance across groups, you can determine whether a proposed change improves key metrics like conversions, engagement, or retention.

Experimentation enables teams to make data-driven decisions, reduce risk, and validate assumptions before a full feature rollout. [A/A testing](https://www.harness.io/harness-devops-academy/a-a-testing) (where both variants are identical) helps verify your experiment setup and establishes a baseline for expected metric behavior. 

On the other hand, A/B testing reveals whether a change actually drives meaningful outcomes. Running A/A tests before A/B tests helps ensure your experiment results reflect true performance differences, not implementation issues or noise.

Experiments in Harness FME are powered by feature flags. Each experiment is tied to a specific flag and environment, allowing you to control who sees which treatment (or change) during the test.

## Create an A/B test

To create an A/B test in Harness FME:

1. Navigate to **Experiments** and click **Create experiment**.
1. Enter a name for the experiment, for example: `standard_discount`.
1. In the **Assignment Source** section, select a feature flag (e.g.  `frontend_discount_coupon`) and an environment (e.g. `Preview`) from the dropdown menus.
1. Optionally, click **Show advanced** to set an experiment entry event filter. 

   :::info
   The entry event filter can only be defined during experiment creation. To make changes, create a new experiment.
   :::
   
   - Select a filter (e.g. `Has done the following event prior to the metric event`) and a qualifying event from the dropdown menus. 
   - Only users who trigger this event are counted as exposures. 
   - The filter applies globally to all metrics; if a [metric has its own filter](/docs/feature-management-experimentation/experimentation/metrics/setup/filtering/#applying-a-filter), both must be satisfied.   

1. In the **Scope** section:

   - Set a start and end date/time for the experiment. 
   - Select a **baseline treatment** (such as `off`) and a **comparison treatment** (such as `low`) to define what you’re testing against and what you’re measuring the impact of.
   - Choose a **targeting rule** (such as `default rule`) to define how users are assigned to treatments.

1. Optionally, enter a hypothesis for your experiment to document the expected outcome or behavior change you’re testing (e.g. “Offering a small discount will increase checkout conversions”).
1. In the **Owners** section, assign a user or team to manage the experiment and be notified of changes.
1. Apply tags to help categorize your experiment (for example, by team, status, or feature area).
1. Click **Save**. 

### Limiting the number of users in an experiment

You can't directly cap the total number of users who will participate in an experiment. However, you can use the **Limit exposure** option to control the percentage of eligible users who are exposed to the experiment at any given time.

This approach lets you:

- Reduce risk when rolling out changes.
- Gather results from a smaller sample before expanding to all users.

:::tip
Start with a lower exposure percentage (for example, 10%) to validate results, then increase it gradually.
:::

## View experiment results

Once your experiment is running, Harness FME automatically tracks key metrics and monitors the statistical significance of the results. 

To analyze performance across treatments, view metrics impact, and make informed decisions about feature rollouts, see the [Experiment Results documentation](/docs/feature-management-experimentation/experimentation/experiment-results/).

## Select metrics to track impact

To understand how each treatment affects user behavior, add relevant metrics to your experiment. These can include business KPIs, performance indicators, or user engagement data.

You can assign the following metric categories to your experiment any time after it starts:

* Key metrics, which help you evaluate the success of your hypothesis.
* Guardrail metrics, which ensure important areas like performance or stability are not negatively impacted.
* Supporting metrics, which offer additional context, even if they’re not directly related to the experiment’s success criteria.

For more information, see the [Metrics documentation](/docs/feature-management-experimentation/experimentation/metrics/).