---
title: Fault Template
sidebar_position: 1
---

This topic describes how you can set up templates, versions, construct experiments, and use runtime inputs and input sets to run chaos experiments.

## What is a fault template?

Harness CE allows you to create and manage reusable templates (or blue print) that define chaos experiments. Based on values specified for different fields in the template, Harness constructs the input fields dynamically. These values are passed to the chaos experiment for execution.

**Storage**: Templates are sourced from the enterprise hub, and versioned and stored in the MongoDB. This enables easy updates, and customization of experiment specifications, inputs, and runtime variables. 

**Versioning**: Each template version is numbered to prevent breaking changes, with backward compatibility for front-end and back-end interfaces.

**Revision**: Every time you update the template, the revision number is incremented. You can't revert to a previous revision, that is, decrement to an earlier version.

## Structure of Template
A template contains a `spec` that defines the tunables required to execute the chaos fault. A tunable in the template includes a description, type, and a default value.
Based on the type of the tunable, templates support string, boolean and integer types. Every tunable is type-checked to ensure that the value you provide is relevant.

## Create and Run Experiments
You can construct experiments using templates with either static values or dynamic runtime values. 
Define the static variables directly in the experiment YAML and use them without any modification.
To define runtime variables, specify `kind: runtime`, thereby allowing customization at runtime or using saved input sets. 

The following section describes how to set up and run experiments using these templates.

### 1. Construct Experiment YAML
Experiment YAML files specify the experiment details such as chaos duration, target workload, and other runtime variables.

### 2. Run Experiments
You can run experiments with either runtime variables or pre-defined input sets.

#### Using runtime variables

- Retrieve all runtime variables for an experiment with the following command:

    ```bash
    GET /api/v1/experiment/{experimentId}/runtime-variables
    ```

- After retrieving the values, pass the values for every runtime variable and execute the experiment.

:::tip
- If you don't provide values for certain fields (which are not mandatory), the experiment executes with default values.
- Variables specified as runtime inputs appear as editable fields in the UI, whereas static fields appear as display-only.
:::

#### Using pre-defined input sets

- Create an input set by saving common runtime variables and values. You can define input sets and save them for later use as well. A sample is shown below:

```bash
{
    "inputSetName":"pod-delete"
}
```

- Run experiments using these saved input sets by specifying the `inputSetName` in the run API.

:::tip
- Harness provides an additional tab so as to view, create, and run input sets directly from the UI.
- Input sets are versioned to prevent breaking changes.
:::