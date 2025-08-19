---
title: Runtime variable support in experiments
description: Understand how you can use runtime variables in chaos experiments.
sidebar_position: 11
---

Runtime variables provide flexibility in chaos experiments by allowing you to customize experiment parameters at execution time rather than hardcoding them during creation.

:::info Feature Availability
This feature is available under the `CHAOS_NG_EXPERIENCE` feature flag. For new onboardings, this feature is enabled by default. 

If you are an existing Harness Chaos customer and would like to access this feature, please contact your Harness support representative to have it enabled for your account.
:::

## Create and Run Experiments

You can execute chaos experiments using either static values or dynamic runtime values. 

- **Static variables**: Define them directly in the experiment and use them without any modification.
- **Runtime variables**: Specify them using `<+input>`, allowing customization at [runtime](#use-runtime-variables) or through [saved input sets](#use-pre-defined-input-sets). 

### Use Runtime Variables

To set up an experiment, specify details such as the name, environment, infrastructure, and fault name. In the **Target Application** and **Tune Fault** modals, you can choose between **Fixed value** and **Runtime Input**. Once you choose the input type, **Save** the changes.

    ![runtime variables](./static/runtime/sample.png)

    ![runtime variables](./static/runtime/sample-2.png)


:::tip
- If you don't provide values for certain fields (which are not mandatory), the experiment executes with default values.
- Variables specified as runtime inputs appear as editable fields in the UI, whereas static fields appear as display-only.
:::