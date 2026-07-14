---
title: End an Experiment
sidebar_label: End an Experiment
description: Learn when and how to conclude an experiment in Harness FME, interpret outcomes, and decide on next steps.
sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Knowing when to stop an experiment is as important as knowing how to design one. Ending too early risks acting on noise; ending too late wastes traffic and delays decisions. This page covers how to recognize when an experiment is ready to conclude, how to interpret the outcome, and what to do next in Harness FME.

## Decide when to stop

No single signal should trigger the end of an experiment on its own. Use the following criteria together to make a confident call:

- **Statistical significance**: The most common threshold is 95% confidence (p-value < 0.05), meaning the observed difference is unlikely to be due to chance. Reaching this threshold is a strong indicator that results are reliable, but it should be considered alongside the factors below.

- **Predetermined run time**: Set your experiment duration before launching and respect it. Tests should run long enough to capture weekly cycles and time-of-day variation. Ending early because results look promising is one of the most common sources of false positive. See [Review periods](/docs/feature-management-experimentation/experimentation/overview#review-metrics-during-an-experiment) for more details.

- **Sufficient sample size**: Verify that the experiment has reached the sample size you calculated before launch. Insufficient data leads to inconclusive results regardless of what the numbers look like. Use [power analysis](/docs/feature-management-experimentation/experimentation/setup/power-analysis) to validate.

- **Practical significance**: A statistically significant result may not be meaningful in practice. Consider whether the observed change is large enough to matter for your business objectives, not just whether it clears the statistical threshold.

- **Stability of results**: If results have remained consistent over a reasonable period with no signs of reversal, that stability is a positive signal. Erratic fluctuations suggest more time is needed.

- **Maximum recommended duration**: Harness recommends running experiments for no longer than six weeks. Beyond this point, external factors can introduce noise that's difficult to account for. Exceptions include experiments measuring lagging metrics like churn, revenue, or repeat visits, particularly for products with low visit frequency (e.g., insurance providers where users may visit monthly).

:::tip Testing Methods
How you decide to end an experiment depends on which testing algorithm you're using.

- **Fixed Horizon**: Complete a pre-experiment sample size calculation and run to the predetermined duration. Do not look at results until the experiment has run its course (minimum two weeks). See [experiment settings](/docs/feature-management-experimentation/experimentation/setup/experiment-settings#testing-methods).
- **Sequential**: You can end the experiment when statistical significance is reached, as the platform continuously evaluates results and allows early stopping when a clear winner emerges. See [experiment settings](/docs/feature-management-experimentation/experimentation/setup/experiment-settings#testing-methods).
:::

## Understand possible outcomes

<Tabs queryString="outcome">
<TabItem value="win" label="Winner">

One variation significantly outperforms the others on your primary metric. This gives you a clear direction: roll out the winning treatment. See [Steps to conclude the experiment](#steps-to-conclude-the-experiment) below.

</TabItem>
<TabItem value="lose" label="Loser">

A variation performs worse than the control. This is valuable; it confirms the change had a negative impact and should not be shipped. Treat this as a learning: the experiment protected your users from a worse experience. Consider whether the underlying hypothesis is worth iterating on before moving on.

</TabItem>
<TabItem value="no-outcome" label="Inconclusive (No Clear Outcome)">

Results are inconclusive, often due to insufficient data or high variability in user behavior. Before moving to a new hypothesis, ask:

- Has the experiment run long enough?
- Was the sample size sufficient?
- Were the tested changes bold enough to drive a detectable impact?
- Did the change address a real user problem?
- Was the hypothesis well-formed?

If any of these are no, consider extending the run or redesigning before concluding.

</TabItem>
<TabItem value="no-difference" label="Inconclusive (No Significant Difference)">

There is no statistically significant difference between variations. This likely means the change had no meaningful impact on your metric. You may choose to maintain the current version and redirect effort toward higher-impact hypotheses.

</TabItem>
<TabItem value="no-data" label="Metric Cards Not Showing Data">

If metric cards display no data, see [resolving metric issues](/docs/feature-management-experimentation/experimentation/experiment-results/viewing-experiment-results/metrics-impact-cards/#resolving-metric-issues).

</TabItem>
</Tabs>

## Consider primary and secondary metrics

Experiments are typically concluded based on the primary metric. If you have a secondary metric you're closely monitoring, factor it into your decision using the following approach:

| Primary metric | Secondary metric | Recommended action |
|----------------|------------------|--------------------|
| Winner | No negative impact | Roll out the winning treatment. |
| Winner | Negative impact | Investigate the tradeoff before rolling out. |
| Inconclusive | No significant difference | Consider iterating or moving on. |
| Loser | - | Do not ship; evaluate whether to iterate. |

## Conclude an experiment

### Roll out the winning treatment

If you don't have immediate engineering resources to hardcode the change, you can roll out the winning treatment directly in Harness FME:

1. In the feature flag's targeting rules, change the percentage split to 100% for the winning treatment across all relevant targeting rules.
2. The winning experience is now served to all users via the feature flag while you complete the permanent code change.

### Remove the experiment and address tech debt

To fully conclude the experiment:

1. Remove the `getTreatment` call from your source code. There is no "stop" button in the UI; removing the SDK evaluation is what ends the experiment.
2. Once removed, the feature flag will no longer have active targeting or receive traffic.
3. Optionally, use the [impressions toggle](/release-notes/feature-management-experimentation/#feature-flag-impression-toggle) to stop tracking impressions before the code change is deployed.

To manage this process across your team, use the [rollout board](/docs/feature-management-experimentation/feature-management/setup/rollout-board), [approval flows](/docs/feature-management-experimentation/feature-management/setup/approval-flows), and [tags](/docs/feature-management-experimentation/tags) to track post-experiment cleanup.

:::warning
Removing the `getTreatment` call stops MTK, event, and impression tracking for that experiment. You can delete the associated feature flag from the **Feature Flags** page after the experiment ends; this does not delete the experiment results.
:::

### Store and share results

1. Analyze results and supporting metrics in the [experiment dashboard](/docs/feature-management-experimentation/experimentation/experiment-results/analyzing-experiment-results) and [metric impact graphs](/docs/feature-management-experimentation/experimentation/overview/#experiment-metric-details) for any further insights to feed into future experiments.
2. Store results within the experiment dashboard for your records.
3. Use the **Share results** feature to download a copy of metric impact data in various formats, or share via URL with stakeholders.

Document a short summary of the outcome (win, loss, or inconclusive) and make it accessible to your team. See [Experimentation best practices](/docs/feature-management-experimentation/experimentation/overview#experimentation-best-practices) for guidance on building a searchable experiment knowledge base.

### Iterate or move on

If the results suggest a promising direction but not a clear winner, consider iterating:

- [**Add a feature flag**](/docs/feature-management-experimentation/getting-started/create-a-feature-flag): Set up a fresh flag for the next iteration, with a refined hypothesis and updated treatments.
- **[Dynamic configuration](/docs/feature-management-experimentation/feature-management/setup/dynamic-configurations/)**: For faster iterations without requiring engineering work each time, use dynamic configuration to allow non-technical team members to adjust pre-defined components directly.
- **[Reallocate traffic](/docs/feature-management-experimentation/experimentation/experiment-results/reallocate-traffic)**: If you planned for iterations in advance, you can edit treatments to create a new version and use reallocate to re-randomize traffic without setting up a new flag.

If there is nothing further to learn from this line of experimentation, move on to the next highest-priority hypothesis.