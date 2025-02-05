---
title: Use resilience probe
sidebar_position: 2
description: Steps to define and use a HTTP probe in the UI
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/probes/configure-and-add-probe
- /docs/chaos-engineering/features/probes/configure-and-add-probe
- /docs/chaos-engineering/use-harness-ce/probes/use-probe
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the steps you can follow to create and use a resilience probe in your chaos experiment.

## Before you begin, review the following

- Go to [probe overview](/docs/chaos-engineering/use-harness-ce/probes/) to understand about probes.
- Go to [chaos faults](/docs/chaos-engineering/use-harness-ce/chaos-faults/) to understand the application of resilience probes.

### Prerequisite
- Permissions to edit a chaos experiment.

:::tip
Currently, resilience probes are behind the feature flag `CHAOS_PROBE_ENABLED`. Contact [Harness support](mailto:support@harness.io) to enable it.
- If you are an existing customer, you will see the old flow of control in resilience probes by default and you have the choice to upgrade to the new flow.
- If you are a new customer, the feature flag is turned on by default and you will see the new flow of control in the resilience probes.
:::

## Create a Resilience Probe from UI

<Tabs>
<TabItem value="Interactive Guide">

<iframe 
  src="https://app.tango.us/app/embed/49b98dd8-d557-41e1-b6c5-ede6ef7f17b3" 
  style={{minHeight:'640px'}}
  title="Set up a Resilience Probe" 
  width="100%" 
  height="100%" 
  referrerpolicy="strict-origin-when-cross-origin" 
  frameborder="0" 
  webkitallowfullscreen="webkitallowfullscreen" 
  mozallowfullscreen="mozallowfullscreen" 
  allowfullscreen="allowfullscreen"></iframe>

</TabItem>

<TabItem value = "Step-by-Step">

1. Select the **Chaos** module and navigate to **Resilience probes**. Click **New probe**.

    ![navigate](./static/use-probe/res-probe-1.png)

2. Select the desired infrastructure (Kubernetes or Linux) and the probe type.

    ![select](./static/use-probe/select-3.png)

3. Based on the probe type you choose, the fields will vary. You can find details about every probe in their respective documentation (([Command](/docs/chaos-engineering/use-harness-ce/probes/command-probe), [Datadog](/docs/chaos-engineering/use-harness-ce/probes/datadog-probe), [Dynatrace](/docs/chaos-engineering/use-harness-ce/probes/dynatrace-probe), [HTTP](/docs/chaos-engineering/use-harness-ce/probes/http-probe), [Kubernetes](/docs/chaos-engineering/use-harness-ce/probes/k8s-probe), [Prometheus](/docs/chaos-engineering/use-harness-ce/probes/prom-probe), and [SLO](/docs/chaos-engineering/use-harness-ce/probes/slo-probe))). After entering the details, click **Configure properties**. Enter further details and click **Configure details**.

    ![configure](./static/use-probe/configure-5.png)

4. Enter URL, authorization type, and click **Setup Probe**. Click **Confirm** when the screen prompts you to confirm creating the probe with specified details.

    ![setup](./static/use-probe/setup-6.png)

:::info note
If you are a first-time chaos module user or a [Platform](https://developer.harness.io/docs/platform) user who has not used resilience probes, you can create a resilience probe directly from the Chaos Studio drawer (from within an experiment).
For this, you will see an option to add a system probe (which is a health check system probe) as a one-click button. This will not be present if you have configured at least one resilience probe.
:::

</TabItem>
</Tabs>

## Edit a Resilience Probe

You can edit a resilience probe by navigating to the probe you wish to edit. Click the three vertical dot menu to the extreme right of the probe, and choose **Edit probe**. Modify the properties you wish to, and click **Save**.

  ![edit](./static/use-probe/edit-probe.png)

:::tip
Resilience probe names act as unique identifiers for a probe, which means you can't edit them. If you manually add the name of a probe in the manifest, this same name should be entered in the annotation as ID.
:::

When you want to enter the probe name in the manifest (manually) as a probeRef annotation, follow the below format:

```
probeRef: '[{"probeID":"ID","mode":"SOT"}]'
```
Here, `ID` is the unique ID of your probe.

This step is not required if you use the user interface.

## Enable a Probe

1. Go to **Chaos** module, select **Resilience Probes** and select the **:** icon of the probe to enable. Select **Enable**.

    ![enable](./static/use-probe/enable-1.png)

2. Click **Confirm**.

    ![confirm enable](./static/use-probe/enable-2.png)

3. Choose between **Bulk Enable** and **Enable Only**. If you choose **Bulk Enable**, this option modifies the entire manifest and references to the probe. If you choose **Enable Only**, it enables the probe functionality without affecting the manifest.

    ![bulk or no](./static/use-probe/enable-3.png)

:::tip
- By default, **Enable Only** is applied in case you close the modal when selecting between the options **Bulk Enable** and **Enable Only**.
- You need to enable a probe if it is in the disabled state.
- A probe is enabled by default.
:::

## Use a Resilience Probe

1. Go to the chaos experiment for wish you wish to set up probe/s. Move to **probes** tab and click **+Select or Add new probes**.

    ![nav](./static/use-probe/select-1.png)

2. You can choose to [create a new probe](#create-a-resilience-probe-from-ui) or add a probe that you created earlier.

    ![create new](./static/use-probe/select-new-2.png)

3. Once you select a probe, click **Add to Fault** to associate the resilience probe with a chaos fault.

    ![add to fault](./static/use-probe/add-to-fault-3.png)

4. Click **Apply changes** or continue to add or create probes based on your requirement.

    ![add more](./static/use-probe/add-more-4.png)

:::tip
- Based on the type of probe you select, enter the values to set up the probe.

	**You can:**
	- Use any number of probes within a chaos experiment.
	- Use the same probes for two faults within the same chaos experiment.
	- Use Kubernetes-based probes for Kubernetes experiments.
	- Use Linux-based probes for Linux experiments.

	**You can't:**
	- Repeat the same probe multiple times in the same fault in the same experiment.
:::

## Add Probes to ChaosHub

Adding probes to ChaosHub helps you to templatize the resilience probe. With this, you can import the probes directly from ChaosHub and reference it in a chaos experiment.

1. To add a resilience probe to ChaosHub, go to **Resilience Probes** tab. Go to the resilience probe that you want to add to ChaosHub and click the **:** button. Click **Push to ChaosHub**.

    ![add to hub](./static/use-probe/push-to-hub.png)

2. Choose the ChaosHub to which you want to add the probe, and click **Apply**. Click **Save**.

## Disable a Probe

You can follow the steps similar to that as [Enable a Probe](#enable-a-probe), except that you select the **Disable** option. You can delete a probe only after you disable it.