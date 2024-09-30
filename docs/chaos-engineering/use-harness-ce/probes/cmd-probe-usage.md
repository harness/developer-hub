---
title: Configure Command probe
sidebar_position: 4
description: Guide to configure the command probe inline and with source parameter.
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/probes/cmd-probe-usage
- /docs/chaos-engineering/features/probes/cmd-probe-usage
- /docs/chaos-engineering/features/probes/cmd-probe/cmd-probe-usage
- /docs/chaos-engineering/features/resilience-probes/cmd-probe/cmd-probe-usage
---

This topic guides you on how to use the **command probe** inline and how to configure source parameter with the command probe. You can follow the same steps for other resilience probes.

## Before you begin, review the following

- [Command Probe](/docs/chaos-engineering/concepts/explore-concepts/resilience-probes/cmd-probe)
- [Create Probe](/docs/chaos-engineering/use-harness-ce/probes/use-probe#create-a-resilience-probe)

In the final step of creating a probe, provide details specific to that resilience probe (such as a command for the command probe, a query to the Prometheus probe, and so on).

### Configure Command Probe

You can configure a probe using the YAML manifest or from the UI. When you use the UI to configure a probe, the probe attributes are minified in the corresponding YAML, and are referred using the **probeID**.

In this example, you will specify details of the command probe from the UI.

1. In the **Probe Details** modal, enter a command in the **Command** field.

    ![Step 1](./static/cmd-probe-usage/command.png)

2. Enter the **Type**, **Comparison criteria**, and the **Value**. Click **Configure Properties**. Provide other values like **Timeout**, **Interval**, **Attempt**, **Polling Interval**, and **Verbosity**. Click **Setup Probe**.

    ![Step 2](./static/cmd-probe-usage/inline-3.png)

Go to [sample YAML inline](/docs/chaos-engineering/concepts/explore-concepts/resilience-probes/cmd-probe#inline-mode) to tune a resilience probe from the manifest.

### Configure Command probe with source parameter

1. Enter the **Type**, **Comparison criteria**, **Value**. Toggle to switch on the **Source** mode. Select **Setup probe**.

    ![Step 2](./static/cmd-probe-usage/source-mode-4.png)


:::tip
Alongside the **source** parameter, you can provide other specifications (for example, `imagePullPolicy`, custom image, environment variables, and so on). You can reference values from the ConfigMap and secret too.
:::

Go to [sample YAML with source parameter](/docs/chaos-engineering/concepts/explore-concepts/resilience-probes/cmd-probe#source-mode) to tune a resilience probe with source field configuration from the manifest.
