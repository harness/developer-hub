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

This topic guides you through steps to use the **command probe** in **inline mode** and **source mode**.

## Before you begin, review the following

- [Create Probe](/docs/chaos-engineering/use-harness-ce/probes/use-probe#create-a-resilience-probe)

In the final step of creating a probe, provide details specific to that resilience probe (such as a command for the command probe, a query to the Prometheus probe, and so on).

### Specify Command to the Probe

In this example, you will specify details of the command probe, that is, provide a command to the command probe.

1. In the **Probe Details** modal, enter a command in the **Command** section. In this example, the command you enter will display a value on the console.

 ![Step 1](./static/newrelic/source-mode-3.png)

### Command Probe in Inline Mode

Inline mode is used to define all the probe properties using the manifest. You can use the UI to configure the manifest. In this case, the manifest is minified for ease of use. To use the command probe in the **inline** mode from the UI,

2. Enter the **Type**, **Comparison criteria**, and the **Value**. Toggle to switch off the **Source** mode. Click **Setup probe**.

 ![Step 2](./static/newrelic/inline-3.png)

#### Validation in Inline Mode

When the probe in **inline mode** is used in a chaos experiment, you can see that the probe failed. This is because the actual value is an empty value but the expected value is different. The experiment doesn't specify any environment variable that could be associated with a user name, so the resultant value is empty.

 ![validation inline](./static/newrelic/val-inline.png)

### Command probe in source mode

Source is a field that you can specify when defining parameters to the command probe. To use the command probe with `source` button enabled, specify the parameters in the UI, which is later minified.

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

