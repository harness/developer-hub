---
title: Command probe in inline and source modes
sidebar_position: 4
description: Guide to using the command probe in inline mode and source mode
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/probes/cmd-probe-usage
- /docs/chaos-engineering/features/probes/cmd-probe-usage
- /docs/chaos-engineering/features/probes/cmd-probe/cmd-probe-usage
- /docs/chaos-engineering/features/resilience-probes/cmd-probe/cmd-probe-usage
---

This topic guides you on how to use the **command probe** inline and how to configure source parameter with the command probe.

## Before you begin, review the following

- [Create Probe](/docs/chaos-engineering/use-harness-ce/probes/use-probe#create-a-resilience-probe)

In the final step of creating a probe, provide details specific to that resilience probe (such as a command for the command probe, a query to the Prometheus probe, and so on).

### Configure Command Probe

You can configure a probe using the YAML manifest or from the UI. When you use the UI to configure a probe, the probe attributes are minified in the corresponding YAML, and are referred using the **probeID**.

In this example, you will specify details of the command probe from the UI.

1. In the **Probe Details** modal, enter a command in the **Command** field.

 ![Step 1](./static/newrelic/source-mode-3.png)

2. Enter the **Type**, **Comparison criteria**, and the **Value**. Click **Configure Properties**. Provide other values like **Timeout**, **Interval**, **Attempt**, **Polling Interval**, and **Verbosity**. Click **Setup Probe**.

 ![Step 2](./static/newrelic/inline-3.png)

### Configure Command probe with source parameter

To use the command probe with `source` parameter, enable the **Source** radio button, specify the parameters in the UI, which is later minified.

To use the command probe in the **source** mode:

3. Enter the **Type**, **Comparison criteria**, **Value**. Toggle to switch on the **Source** mode. Select **Setup probe**.

 ![Step 2](./static/newrelic/source-mode-4.png)


:::tip
You can add other specifications too (for example, `imagePullPolicy`). You can reference values from the ConfigMap and secret too.
:::

4. Select **Confirm** to create the probe with the parameters you specified.

 ![Step 3](./static/newrelic/confirm-5.png)

#### Validation in source mode

When you use the probe in **source mode** in a chaos experiment, you can see that the probe passed because the expected value and the actual value match. You executed the probe on the specific image (Ubuntu, in this case) that you created for this probe. You specified the environment mounted with the name in the image, and the image specifications you provided in the **Source** mode matched the expected value.

 ![validation source](./static/newrelic/val-source.png)

