---
title: Experimentation Best Practices
sidebar_position: 8
sidebar_label: Best Practices
description: Best practices for planning, designing, and interpreting experiments in Harness FME.
---

Experimentation is a powerful way to drive growth and insight, but only when done with intention. This guide covers the principles that separate high-quality experiments from ones that produce misleading or meaningless results.

## Planning and purpose

Before running any test, define [what you are trying to learn, what success looks like, and how the experiment fits your broader business goals](/docs/feature-management-experimentation/experimentation/foundations/). Without this, even well-executed tests produce noise.

Anchor every experiment in a clear hypothesis, a reasoned prediction based on observed behavior. For example: *"Reducing the number of form fields from five to three will increase conversion rates due to reduced user friction."* A concrete hypothesis gives the experiment focus and a measurable outcome.

To prioritize which experiments to run, use the **PIE framework**: Potential, Importance, Ease. Focus first on areas with high business impact that are technically straightforward to implement.

## Design and setup

<details>
<summary>Start with the problem, not the solution</summary>

Resist the urge to jump straight to a solution. Start with a user problem (what is causing friction or drop-off?), then design variations to address it. Solutionizing leads to narrow thinking and superficial wins.

</details>
<details>
<summary>One change at a time</summary>

Design experiments around a single change. If you adjust multiple variables simultaneously, you will not be able to attribute the result to any one of them. You can test a single change across multiple variants (e.g., A/B/C/D), but keep the variable itself isolated.

</details>
<details>
<summary>Choose one primary metric</summary>

Pick a single metric that determines success, tightly linked to your hypothesis (e.g., conversion rate for a sign-up experiment). Secondary metrics can provide context but shouldn't drive the decision. Go to [Create a metric](/docs/feature-management-experimentation/getting-started/overview/create-a-metric/) for more details.

</details>
<details>
<summary>Avoid overlapping KPIs across experiments</summary>

If multiple tests influence the same metric (like activation rate), their effects become impossible to disentangle. Coordinate across teams to prevent this.

You can leverage dependant flags to [exclude experiments from one another](/docs/feature-management-experimentation/experimentation/setup/mutually-exclusive-experiments/).

</details>
<details>
<summary>Bucket users at the right point</summary>

Assign users to variants on the page where the change occurs. If your experiment is on the pricing page, only bucket users when they reach that page. Bucketing earlier dilutes and skews your audience.

You can set an [entry level exposure filter](/docs/feature-management-experimentation/experimentation/metrics/setup/filtering/#applying-a-filter) for experiments.

</details>
<details>
<summary>Limit the number of treatments</summary>

Stick to **three treatments per test** (control + two variants) as a default. This balances learning with statistical power. You can use up to six treatments, but beyond that, sample size requirements grow and complexity adds diminishing returns.

</details>

## Statistical rigor

<details>
<summary>Size your sample before launching</summary>

Too few users makes results unreliable. Use a sample size calculator based on your baseline performance, expected lift, and chosen testing method. Go to [Monitor and experiment settings](/docs/feature-management-experimentation/experimentation/setup/experiment-settings/#testing-methods) to define the required sample size for the Fixed Horizon method.

</details>
<details>
<summary>Set a fixed run time</summary>

Decide how long the experiment will run before you launch it, typically one to two weeks, depending on traffic and time-to-action. Do not stop early because the numbers look good or bad. See [testing methods](/docs/feature-management-experimentation/experimentation/setup/experiment-settings/#testing-methods) to review Fixed Horizon guidance.

</details>
<details>
<summary>Do not make midway changes</summary>

Once a test is live, do not adjust copy, design, or measurement. Changes invalidate results and introduce bias.

If you have made a change or a fix, you can [re-allocate flag traffic](/docs/feature-management-experimentation/feature-management/manage-flags/reallocate-traffic/) and reset the experiment dates. 

</details>
<details>
<summary>Use equal traffic splits</summary>

Unless you are using a formal ramp strategy, split traffic equally across variants. Equal exposure ensures fair comparisons and maximizes statistical power. You can use [limit exposure](https://help.split.io/hc/en-us/articles/360020525572-Limiting-exposure) to manage ramp strategy.

</details>
<details>
<summary>Enable measurement in the platform</summary>

Before running an experiment, make sure events have been sent and measurement is enabled by toggling to percentage-based targeting in the feature definition. See [Define feature flag treatments and targeting](https://help.split.io/hc/en-us/articles/360020791591-Define-feature-flag-treatments-and-targeting#targeting-rules).

</details>
<details>
<summary>Validate with an A/A test first</summary>

Run an A/A test before experimenting to confirm your metrics are behaving as expected. Go to [A/A testing](https://help.split.io/hc/en-us/articles/360031279312-Running-an-A-A-test) to validate your setup.

</details>

## Interpret results

<details>
<summary>Be open to being wrong</summary>

The best learnings often come from unexpected results. Treat experiments as learning tools, not validation tools. If a test disproves an assumption, that's a successful experiment.

</details>
<details>
<summary>Inconclusive results are still results</summary>

An inconclusive outcome means your change had no measurable impact on users for the metrics in question. That's useful signal, not a failure.

</details>
<details>
<summary>Add metrics retroactively</summary>

Once an experiment is running, you may realize you've forgotten to track a metric or discover an interesting behavior you'd like to measure. 

In these cases, you can create new metrics and recalculate metric data for your experiment at any time. The key requirement is that the relevant event data must already have been sent to Harness before you add the metric. 

Because of this, it's a good practice to send any events that might be relevant to the user journey from the outset, giving you the flexibility to define and analyze additional metrics later without needing to rerun the experiment.

</details>
<details>
<summary>Document everything</summary>

Record every test: win, loss, or inconclusive. Keep summaries short, jargon-free, and paired with visual aids where possible. Centralize this knowledge so the rest of the organization can benefit.

</details>
<details>
<summary>Do not overgeneralize</summary>

A result that holds in one region, channel, or customer segment may not transfer elsewhere. Revalidate before scaling.

You can set up [Dimensional Analysis](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results/dimensional-analysis/), which allows you to interpret your experiment data using pre-configured segments.

</details>
<details>
<summary>Organize experiments into themes</summary>

Group experiments into categories, such as onboarding, pricing, retention, UX, conversion, and so on. Over time, this surfaces patterns and builds thematic insight across teams and customer verticals. Categories like "do no harm" or "UX polish" also help set stakeholder expectations: a small UX change is unlikely to move revenue metrics directly.

</details>

## Strategic mindset

<details>
<summary>Balance exploration and exploitation</summary>

**Exploration** means testing bold, risky ideas to find breakthroughs. **Exploitation** means fine-tuning known performers. Both have a place. A healthy experimentation roadmap blends the two.

</details>
<details>
<summary>Iterate with purpose</summary>

Iteration lets you build on your hypothesis and converge on the best solution. That said, know when to move on; if there's nothing further to learn from a line of experiments, redirect effort toward higher-priority areas.

</details>

By following these principles, you can run experiments that generate trust, insight, and meaningful growth. 