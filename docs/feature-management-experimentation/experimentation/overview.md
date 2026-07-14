---
title: Cloud Experimentation Overview
sidebar_label: Overview
description: Learn how experiments work in Harness FME, including best practices for planning, design, statistical rigor, and interpreting results.
sidebar_position: 1
---

Experiments measure the success of your website, application, back-end performance, etc. Experiment metric results tell you if your new features are improving, degrading, or having no effect on your application users' experience.
 
Experiments take in your experimental control variables, measure events, and display the results. Your experiment will show you if the data is in correct ratios (a passing health check), the running time has completed, and the results are conclusive, equipping you with data to drive your product decisions.

## Create an experiment
 
For any experimentation program to be successful, teams should be able to remain agile and create repeatable steps. These steps give teams an outline for the who, what, when and where of experimentation. From conception to iteration, it is important that teams optimize the process itself as they go along, in order to move faster.

Well-run experimentation isn't just a data practice; it's a strategic capability. The following principles apply regardless of what you're testing.
 
<details>
<summary>Plan with a clear hypothesis</summary>
 
Before building anything, define what you're trying to learn and what success looks like. Ground every experiment in a specific, testable hypothesis based on observed behavior. For example: *"Reducing the number of form fields from five to three will increase conversion rates due to reduced user friction."*
 
Start with the user problem (what's causing friction or drop-off) rather than a solution you want to validate. Jumping straight to a proposed fix leads to narrow thinking and superficial wins.
 
To prioritize which experiments to run, use the **PIE framework**: Potential, Importance, Ease. Focus first on areas with high business impact that are technically straightforward to implement.
 
</details>
<details>
<summary>Design for clarity</summary>
 
Test one variable at a time: If you change multiple things at once, you won't be able to attribute any result to a specific cause. You can run one variable across multiple variants (A/B/C/D…), but keep the variable itself isolated.
 
Choose one primary metric: Pick a single metric that determines success, tightly linked to your hypothesis. For example, conversion rate for a sign-up experiment. Secondary metrics provide context but shouldn't drive the decision.
 
Limit treatments to three (control plus two variants) as a default. This balances learning with statistical power. You can go up to six, but more treatments require larger sample sizes and add complexity.
 
Bucket users at the right point: Assign users to variants on the page where the change occurs. Bucketing earlier than that dilutes and skews your audience.
 
Avoid overlapping KPIs: If multiple experiments influence the same metric (like activation rate), their effects become impossible to separate. Coordinate across teams to prevent this.
 
</details>
<details>
<summary>Ensure statistical rigor</summary>
 
Size your sample before launching: Use a sample size calculator based on your baseline performance and expected lift. Too few users makes results unreliable.
 
Set a fixed run time upfront: A typical timeframe is one to two weeks, depending on traffic and how long users take to act. Do not stop early because results look good or bad. Go to [Review metrics during an experiment](#review-metrics-during-an-experiment) to understand peeking risks.
 
Do not make midway changes: Once a test is live, do not adjust copy, design, or measurement. Changes invalidate results and introduce bias.
 
Validate with an A/A test first. Run an A/A test before experimenting to confirm your metrics are behaving as expected. Go to [A/A testing](/docs/feature-management-experimentation/experimentation/setup/a-a-testing/) to set up one up.

</details>
<details>
<summary>Interpret results honestly</summary>
 
Be open to being wrong: Treat experiments as learning tools, not validation tools. Unexpected results are often the most valuable.
 
Inconclusive results are still results: An inconclusive outcome means your change had no measurable impact on the metrics in question; that is a useful signal, not a failure.
 
Add metrics retroactively: You can send relevant events before an experiment's start time and add them retroactively, so you won't lose historical data if you identify a metric gap after launch.
 
Document everything; record every test: win, loss, or inconclusive. Keep summaries short and jargon-free. Centralized, searchable records let the rest of your organization benefit from what you've learned.
 
Do not overgeneralize: A result that holds in one region, channel, or segment may not transfer elsewhere. Revalidate before scaling.
 
</details>
<details>
<summary>Think strategically</summary>
 
Understand the difference between **exploration** (testing bold, risky ideas to find breakthroughs) and **exploitation** (fine-tuning known performers). A healthy experimentation roadmap blends both.
 
Organize experiments into thematic categories (onboarding, pricing, retention, UX, and conversion) to surface patterns over time and set stakeholder expectations. For example, small UX changes are unlikely to directly move revenue metrics.
 
Iterate with purpose: build on your hypothesis and converge on the best solution, but know when to move on if there's nothing further to learn.

</details>
 
For more information about creating an experiment, see the [Setup documentation](/docs/feature-management-experimentation/experimentation/setup/).
 
## Use tags to organize experiments
 
You can add **tags** to experiments to make it easier to search, filter, and apply standards. [Tags](/docs/feature-management-experimentation/tags) are flexible labels that let you group experiments by team, purpose, status, or any internal conventions.
 
## Review metrics during an experiment
 
With Harness FME, it is easy to check the change in a metric at any time; but to determine that the observed change represents a meaningful difference in the underlying populations, one first needs to collect a sufficient amount of data. If you look for significance too early or too often, you are guaranteed to find it eventually.
 
Similarly, the precision at which we can detect changes is directly correlated with the amount of data collected, so evaluating an experiment's results with a small sample introduces the risk of missing a meaningful change. The target sample size at which one should evaluate the experimental results is based on what size of effect is meaningful (the minimum detectable effect), the variance of the underlying data, and the rate at which it is acceptable to miss this effect when it is actually present (the power).
 
The Experimental review period feature is intended to help avoid reaching conclusions before taking into account how long an experiment should run. For more information on review periods and when metric cards are updated, see [Metric calculation schedule](/docs/feature-management-experimentation/experimentation/experiment-results/viewing-experiment-results/metric-calculation-schedule#when-are-metric-cards-updated).
 
### About experimental review periods
 
A best practice is to respect experimental review periods. You shouldn't draw conclusions about the impact of your metrics every time you compute them. This is called peeking which leads to errors, notably the following three types: failing to account for seasonality, early signal, and false positives.
 
User behavior changes by time of day or day of week. For example, let's say you have a restaurant booking platform. If your change has a dramatic impact for users who book on Sunday night, it might not be representative of all your users. Many events only come days later. They can book a restaurant several days ahead. They won't confirm or pay until then.
 
We won't block you from seeing your current metrics impact. The review period doesn't influence the data process. It provides a caution against making a decision too early, without accounting for seasonality, or gaming statistical significance. It's a common practice for mature experimentation teams; they wait for the experiment to run for a set the number of days before making a decision.
 
You can set it to either an account-wide or per-feature flag setting. Outside of the review period, we warn you that results MAY not be representative. Use appropriate judgment: if your review period is 14 days, the results on day 15, 16 or 17 are likely reliable. Be aware if your product has a very specific cadence. For example, processing pay stubs must include full periods to capture a representative cycle.
 
## Change an experiment
 
During the course of an experiment, the metrics and review period will reset any time you make a change to the feature flag. This ensures that you are evaluating your metrics based on a consistent distribution of the population. When the distribution changes, your experiment resets.
 
If you change a metric during a running experiment the metric card will show a message saying that we have no data for that card. The next time the calculations are made for that experiment (the frequency depends on the age of the experiment) the card will be updated to reflect the new metric definition. Versions of the experiment that have already been completed will not get recalculated.
 
### Ramp plans
 
You will want to take these things into consideration when you develop your ramp plan. For percentage-based rollouts it is recommended that you start with a debugging phase: aimed at reducing risk of obvious bugs or bad user experience. The goal of this phase is not to make a decision, but to limit risk; therefore, there is no need to wait at this phase to gain statistical significance. Ideally, a few quick ramps (to 1%, 5%, or 10% of users) each lasting a day, should be sufficient for debugging.
 
It's during the maximum power ramp (MPR) phase that you'll want to hold your experiment for, in most cases, at least a week. This phase gives the most statistical power to detect differences between treatment and control. For a two-variant experiment (treatment and control), a 50/50 distribution of all users is the MPR. For a three-variant experiment (two treatments and control) MPR is a 33/33/34 distribution of all users. You should spend at least a week on this step of the ramp to collect enough data on treatment impact.
 
If the targeting is more complex, you may want to use Traffic allocation as a way of moving from risk mitigation to MPR. This could avoid the need to make small discrete changes to the targeting rules. You may have further phases to test scalability, or perhaps to hold out a small percentage of users to understand the long term impact.
 
Since any change to the experiment will trigger a reset, one best practice is to create a segment for the individual target for each treatment. This allows you to add and delete users from the individual targets without modifying the experiment.

## Run concurrent experiments

You can run two or more experiments at the same time, on the same users. This increases velocity and learning rate, but it requires deliberate design to prevent interaction effects from skewing results.
 
Overlap tends to occur when experimenting on the same page (homepage, product details page, checkout), within the same funnel, on site-wide elements (search, header/footer), or on the same audience segment.
 
The general rule: **experiments can overlap as long as their primary metrics don't.** If two experiments influence the same metric, their effects become impossible to disentangle. If their primary metrics are independent, simultaneous testing carries much lower risk.

To limit interaction effects:

- **Sequential isolation**: Run one experiment to completion before launching the next. This eliminates overlap entirely but slows your program down and risks resource drain while code waits on release.
 
- **Mutually exclusive swimlanes**: Ensure a single user cannot be bucketed into two experiments at the same time. This is the cleanest solution for high-stakes tests, but it comes at a cost: if you run five mutually exclusive experiments, each gets only 20% of qualifying traffic, which extends run times significantly. See [Mutually exclusive experiments](/docs/feature-management-experimentation/experimentation/setup/mutually-exclusive-experiments) for setup instructions.

- **Separate audiences**: Target experiments to non-overlapping user segments. This works well when distinct audiences exist naturally, but avoid testing to a narrow audience purely for velocity if the intent is to roll out to everyone.
 
- **Partial or full time overlap (accepted risk)**: Run experiments simultaneously and accept some degree of noise. This is reasonable when primary metrics are different and you've assessed the overlap risk. Rerunning an inconclusive experiment afterward is a useful sanity check for interaction effects.

### Manage concurrent experiments in Harness FME
 
- **[Target with dependencies](/docs/feature-management-experimentation/feature-management/targeting/target-with-dependencies)**: Use parent/child feature flags to create swimlanes and control which users are eligible for each experiment.
- **[Custom attributes and targeting rules](/docs/feature-management-experimentation/feature-management/targeting/target-with-custom-attributes)**: Exclude specific user groups from overlapping experiments.
- **[Guardrail metrics](/docs/feature-management-experimentation/experimentation/metrics/)**: Define shared guardrail metrics across concurrent experiments to catch interaction effects early.
- **[Tags](/docs/feature-management-experimentation/tags)**: Tag experiments by page, funnel, audience, or team to track overlap and coordinate across teams.
- **[Rollout board](/docs/feature-management-experimentation/feature-management/setup/rollout-board)**: Use the rollout board to visualize which experiments are live and discuss prioritization in regular planning meetings.
- **[Scheduling](/docs/feature-management-experimentation/feature-management/manage-flags/using-essential-scheduling)**: Schedule experiment start and end times to manage sequential launches without manual intervention.
- **Naming conventions**: Adopt consistent naming that encodes page, audience, or funnel context so overlap is immediately visible when browsing the experiment list.

## Analyze experiment results
 
For more information about analyzing experiment results, see [Analyzing experiment results](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results).
 
<UniversityAdmonition title="Harness FME self-paced training">
  For an interactive onboarding experience including further use cases and features like **cloud experimentation**, check out the [**Harness Feature Management & Experimentation Cloud Experimentation for Product Managers certification**](https://university-registration.harness.io/fme-level-1-cloud-experimentation-for-product-managers).
</UniversityAdmonition>