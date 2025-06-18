---
title: Setup
sidebar_position: 50
---

## Create an experiment

### Interactive guide

This interactive guide will walk you through setting up an experiment for the first time.

<DocVideo src="https://app.tango.us/app/embed/1e1ad9f0-85b8-427a-8331-f35f7685c1eb" title="Create an Experiment" />

### Step-by-step guide

Setting up an experiment follows these steps:

1. Navigate to the Experiments section on your navigation panel and click **+Create experiment**.

2. Give your experiment a name and designate an assignment source by selecting a feature flag and environment:
   * Choose a feature flag that has targeting active (not killed).
   * Choose an environment for which the feature flag definition is initiated (valid environments are enabled in the dropdown).

3. Define the scope of your experiment by setting a start and end time, a baseline treatment, comparison treatments, and a targeting rule.

   * Choose a start date on or after the date the feature flag was created.
   * The targeting rule can be any rule with percentage distribution (other rules are disabled in the dropdown). The `default rule` listed in the Targeting rule dropdown is the last rule in the Targeting rules section of a feature flag definition.

      :::note
      Based on your feature flag definition, the following fields are pre-populated by default: the start time is the timestamp of the flag’s current version, the end time is determined by your default review period, the baseline treatment is the flag’s default treatment, and the comparison treatments are all other treatments defined by the flag.
      :::

4. Write an optional hypothesis, add any additional owners, and apply tags to help categorize your experiment (for example, by team, status, or feature area). Then click **Create**.

5. Add key and supporting metrics to your experiment. Guardrail metrics will be measured automatically for every experiment.