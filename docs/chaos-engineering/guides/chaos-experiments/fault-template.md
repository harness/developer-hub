---
title: Runtime variable support in experiments
description: Understand how you can use runtime variables in chaos experiments.
sidebar_position: 11
---

This topic describes how you can configure and use runtime variables in chaos experiments.

Harness Chaos Engineering (CE) supports runtime variables when executing chaos experiments. By using runtime inputs, Harness dynamically constructs input fields for various tunables. These values are then passed to the chaos experiment during execution.

:::info note
This feature is currently behind the feature flag `CHAOS_NG_EXPERIENCE`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

## Create and Run Experiments

You can execute chaos experiments using either static values or dynamic runtime values. 

- **Static variables**: Define them directly in the experiment and use them without any modification.
- **Runtime variables**: Specify them using `<+input>`, allowing customization at [runtime](#use-runtime-variables) or through [saved input sets](#use-pre-defined-input-sets). 

### Use Runtime Variables

To set up an experiment, specify details such as the name, environment, infrastructure, and fault name. In the **Target Application** and **Tune Fault** modals, you can choose between **Fixed value** and **Runtime Input**. Once you choose the input type, **Save** the changes.

    <!-- ![runtime variables](./static/runtime/sample.png) -->

    <!-- ![runtime variables](./static/runtime/sample-2.png) -->


:::tip
- If you don't provide values for certain fields (which are not mandatory), the experiment executes with default values.
- Variables specified as runtime inputs appear as editable fields in the UI, whereas static fields appear as display-only.
:::

### Create Pre-Defined Input Sets

Pre-defined input sets allow you to store common runtime variables and values for reuse. These input sets are versioned to prevent breaking changes. Here’s how you can create and use them:

1. Go to **Experiment Inputs**.

    <!-- ![](./static/runtime/is-1.png) -->

2. Select **+ New Input Set**.

    <!-- ![](./static/runtime/is-2.png) -->

3. Specify the inputs and click **Save**.

    <!-- ![](./static/runtime/is-3.png) -->

By using runtime variables and input sets, you can make your chaos experiments more flexible, reusable, and efficient. This approach ensures that experiments are not only dynamic but also easier to manage and maintain over time.

### Use Pre-Defined Input Sets

After creating a pre-defined input set, you can reference it in your experiment.

1. Go to **Experiment Inputs**.

    <!-- ![](./static/runtime/is-1.png) -->

2. Click **Run Experiment**, which is an input set that you created earlier

    <!-- ![](./static/runtime/run-exp.png) -->

3. Specify the values for the parameters and **Run**. You can **Save as New Input Set** and use these input values in future experiments. 

    <!-- ![](./static/runtime/click-run.png) -->