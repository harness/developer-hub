---
title: Runtime variable support in experiments
description: Understand how you can use runtime variables in chaos experiments.
sidebar_position: 11
---

Runtime variables provide flexibility in chaos experiments by allowing you to customize experiment parameters at execution time rather than hardcoding them during creation.

:::info New Chaos Studio Feature
**Runtime input variables** are part of the enhanced **New Chaos Studio** experience. If you're an existing customer and want access to new features, contact your Harness support representative. For more details, see [New Chaos Studio Features](/docs/chaos-engineering#new-chaos-studio-features).
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