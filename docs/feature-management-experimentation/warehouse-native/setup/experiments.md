---
title: Create a Warehouse Native Experiment in Harness FME
sidebar_label: Create an Experiment
description: Learn how to create an experiment for warehouse-native experimentation in Harness FME.
sidebar_position: 6
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

An <Tooltip id="fme.warehouse-native.experiment">experiment</Tooltip> in Harness FME is a structured test that evaluates the impact of one or more treatments (or variants) on a defined population using assignment (or exposure) data from your assignment sources and metric (or outcome) data from your metric sources. Experiments allow you to measure the effect of changes, validate hypotheses, and make data-driven decisions.  

## Create an experiment

To create an experiment in Harness FME:

1. Navigate to the **Experiments** page in the FME navigation menu and click **+ Create experiment**.

1. Give your experiment a name.
1. Select the assignment source in the **Assignment Source** section.
1. Select the FME environment in the **Environment** section.
1. Select a traffic type in the **Traffic type** section.
1. Optionally, click **+ Add new filter** to narrow the population included in the experiment. Select a custom field you defined in your assignment source from the dropdown menu, choose an operator (such as `is exactly`, `is not`, `contains`, `does not contain`, `is in list`, or `is not in list`), and set the value for the filter. 

   Only users whose data satisfy all filters will be counted as exposures. For example: `experiment_id is exactly checkout_flow` will only include exposures associated with that experiment ID. 
   
   :::info
   Filters are applied globally to the experiment; if a metric [already has its own filter](/docs/feature-management-experimentation/experimentation/metrics/setup/filtering/#applying-a-filter), both the metric and experiment filters must be satisfied for an event to be counted.
   :::

1. Define the scope of your experiment by setting a start and end time, baseline treatment, comparison treatments, and the percentage allocation for each treatment.

   * Start and end time: The start and end time defines the time range of data to be analyzed in your metric.  
   * Baseline and comparison treatments: Set the baseline treatment by clicking the radio button next to a treatment and select a treatment from the dropdown menu. Click **+ Add treatment** to include additional treatments.  
   * Target ratio: Set the allocation for each treatment so that the total sums to 100%. This ensures that the Sample Ratio Mismatch (SRM) check in the experiment health report can compare expected versus actual allocations.

1. Write an optional hypothesis, add any additional owners, and apply tags to help categorize your experiment (for example, by team, status, or feature area). Then, click **Create**.

1. Add key and supporting metrics to your experiment. Guardrail metrics will be measured automatically for every experiment.
