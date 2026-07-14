---
title: Create an Experiment
sidebar_label: Create an Experiment
description: Learn how to create an experiment in Harness FME.
sidebar_position: 7
redirect_from:
  - /docs/feature-management-experimentation/feature-management/faqs/is-there-a-way-to-limit-the-number-of-users-in-an-experiment
  - /docs/feature-management-experimentation/getting-started/overview/create-an-experiment
---

[A/B testing](https://www.harness.io/harness-devops-academy/ab-testing), also known as split testing, allows you to evaluate how changes (such as a new feature, layout, or user experience) impact user behavior. By randomly assigning users to different variants and measuring performance across groups, you can determine whether a proposed change improves key metrics like conversions, engagement, or retention.

Experimentation enables teams to make data-driven decisions, reduce risk, and validate assumptions before a full feature rollout. [A/A testing](https://www.harness.io/harness-devops-academy/a-a-testing) (where both variants are identical) helps verify your experiment setup and establishes a baseline for expected metric behavior. 

On the other hand, A/B testing reveals whether a change actually drives meaningful outcomes. Running A/A tests before A/B tests helps ensure your experiment results reflect true performance differences, not implementation issues or noise.

Experiments in Harness FME are powered by feature flags. Each experiment is tied to a specific flag and environment, allowing you to control who sees which treatment (or change) during the test.

Before diving in, make sure you've formed a clear hypothesis and chosen a primary metric. For guidance on planning and design principles, see [Experimentation best practices](/docs/feature-management-experimentation/experimentation/overview#experimentation-best-practices).

## Create an A/B test

To create an A/B test in Harness FME:

1. Navigate to **Experiments** and click **Create experiment**.
1. Enter a name for the experiment, for example: `standard_discount`.
1. In the **Assignment Source** section, select a feature flag (e.g. `frontend_discount_coupon`) and an environment (e.g. `Preview`) from the dropdown menus.
1. Optionally, click **Show advanced** to set an experiment entry event filter.

   - Select a filter (e.g. `Has done the following event prior to the metric event`) and a qualifying event from the dropdown menus.
   - Only users who trigger this event are counted as exposures.
   - The filter applies globally to all metrics; if a [metric has its own filter](/docs/feature-management-experimentation/experimentation/metrics/setup/filtering/#applying-a-filter), both must be satisfied.
     
     :::info
     The entry event filter can only be defined during experiment creation. To make changes, create a new experiment.
     :::

1. In the **Scope** section:

   - Set a start and end date/time for the experiment.
   - Select a **baseline treatment** (such as `off`) and a **comparison treatment** (such as `low`) to define what you're testing against and what you're measuring the impact of.
   - Choose a **targeting rule** (such as `default rule`) to define how users are assigned to treatments.

      :::tip Set your run time before launching
      Decide how long the experiment will run before you start it; typically one to two weeks, depending on traffic and how long users take to act. Avoid stopping early because results look good or bad. Ending a test before collecting sufficient data is one of the most common sources of false conclusions.
      :::

1. Optionally, enter a hypothesis for your experiment to document the expected outcome or behavior change you're testing (e.g. "Offering a small discount will increase checkout conversions").

   A well-formed hypothesis follows the pattern: *"[Change] will [impact] [metric] because [reason]."* This makes it easier to evaluate results objectively after the experiment ends.

1. In the **Owners** section, assign a user or team to manage the experiment and be notified of changes.
1. Apply tags to help categorize your experiment (for example, by team, status, or feature area). Organizing experiments into categories (such as onboarding, pricing, or retention) helps surface patterns over time. See [Use tags to organize experiments](/docs/feature-management-experimentation/tags).
1. Click **Save**.

### Limiting the number of users in an experiment

You can't directly cap the total number of users who will participate in an experiment. However, you can use the **Limit exposure** option to control the percentage of eligible users who are exposed to the experiment at any given time.

This approach lets you:

- Reduce risk when rolling out changes.
- Gather results from a smaller sample before expanding to all users.

:::tip Ramp in phases
Start with a small exposure percentage (1–10%) for a day or two to catch obvious bugs or poor user experience. This is your debugging phase. Once stable, ramp to a 50/50 split (for two variants) or equal distribution across all variants to reach maximum statistical power. Avoid making targeting changes mid-experiment, as any change resets the experiment.
:::

## View experiment results

Once your experiment is running, Harness FME automatically tracks key metrics and monitors the statistical significance of the results.

:::caution Respect the review period
Avoid drawing conclusions before your experiment has run for its intended duration. Checking results too early (sometimes called "peeking") inflates the likelihood of false positives and fails to account for day-of-week or time-of-day variation in user behavior. Wait for the full review period before making a decision.
:::

To analyze performance across treatments, view metrics impact, and make informed decisions about feature rollouts, see the [Experiment Results documentation](/docs/feature-management-experimentation/experimentation/experiment-results/).

## Select metrics to track impact

To understand how each treatment affects user behavior, add relevant metrics to your experiment. These can include business KPIs, performance indicators, or user engagement data.

You can assign the following metric categories to your experiment any time after it starts:

- **Key metrics** evaluate whether your hypothesis holds. Pick one primary key metric that determines the experiment's outcome.
- **Guardrail metrics** ensure important areas like performance or stability are not negatively impacted.
- **Supporting metrics** offer additional context, even if they're not directly tied to the experiment's success criteria.

:::tip Add metrics retroactively
You can send relevant events before an experiment's start time and add them retroactively. If you identify a metric gap after launch, you won't lose the historical data needed to evaluate it.
:::

For more information, see the [Metrics documentation](/docs/feature-management-experimentation/experimentation/metrics/).

## Measuring mobile app value vs desktop

A common question in cross-platform experimentation is: *"If we have 100 orders a day across mobile and desktop, how much of that is truly incremental, and how much would have converted anyway without the app?"*
 
The answer isn't just about order volume. Mobile app value spans user experience, engagement depth, retention, and lifetime value. No single metric captures it fully, so the most reliable approach combines multiple methods.
 
<details>
<summary>Measure incremental impact directly</summary>
 
The most rigorous way to isolate the app's contribution is to run an experiment comparing users who have access to the app against a control group that doesn't. If app users show additional engagement or conversions beyond what the control group demonstrates, that difference is the incremental lift attributable to the app.
 
In Harness FME, you can set this up by targeting your experiment to a defined segment and using the device type as a dimension in your analysis.

</details>
<details>
<summary>Segment your experiments by device</summary>
 
When running A/B tests, apply device type segmentation to compare behavior and conversion rates across mobile and desktop users. This reveals whether users behave differently on each platform and whether a change that works on desktop also holds on mobile.
 
</details>
<details>
<summary>Track retention and lifetime value by platform</summary>
 
Order volume in isolation can mask cannibalization. Instead, track retention rates and engagement depth across both platforms. If mobile app users show meaningfully higher retention than desktop users, that's a signal of genuine additional value, not just shifted conversions.
 
</details>
<details>
<summary>Analyze the user journey across platforms</summary>
 
Track how users move between mobile and desktop throughout their lifecycle. Significant behavioral differences (such as browsing on mobile but converting on desktop) point to distinct platform roles, and can inform how you design and measure experiments on each.
 
</details>
<details>
<summary>Supplement with qualitative data</summary>
 
Quantitative signals tell you *what* is happening; qualitative data helps explain *why*. User surveys and feedback tools can surface reasons users prefer the app over the desktop site (convenience, notifications, personalization) that don't show up in conversion metrics alone.
 
</details>
<details>
<summary>Use attribution models for conversion source analysis</summary>
 
Attribution models help determine whether app conversions are coming from users newly acquired by the app or users who shifted from desktop. Tools like Google Analytics and dedicated attribution platforms can be layered alongside your FME experiment data to build a fuller picture.

</details>

<UniversityAdmonition title="Harness FME self-paced training">
  For an interactive onboarding experience including further use cases and features like **cloud experimentation**, check out the [**Harness Feature Management & Experimentation Cloud Experimentation for Product Managers certification**](https://university-registration.harness.io/fme-level-1-cloud-experimentation-for-product-managers).
</UniversityAdmonition>