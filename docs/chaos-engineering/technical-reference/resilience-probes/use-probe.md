---
title: Define and use a probe
sidebar_position: 2
description: Steps to define and use a HTTP probe in the UI
---

This section describes steps you can follow to create and use a resilience probe in your chaos experiment.

## Before you begin

* [Introduction to probes](/docs/chaos-engineering/technical-reference/resilience-probes/introduction)

## Create a resilience probe

### Step 1: Navigate to resilience probes

* Select the **Chaos** module and navigate to **Resilience probes**.

  ![navigate](./static/use-probe/navigate-1.png)

* Click **New probe**

  ![new](./static/use-probe/new-2.png)

### Step 2: Select probe and enter details

* Select the desired infrastructure (Kubernetes or Linux) and the probe type.

  ![select](./static/use-probe/select-3.png)

* Based on the probe type you choose, the fields will vary. You can find details about every probe in their respective documentation. After you enter the details, click **Configure properties**.

  ![details](./static/use-probe/details-4.png)

* Enter further details and click **Configure details**.

  ![configure](./static/use-probe/configure-5.png)

* Enter URL, authorization type, and click **Setup Probe**. Click **Confirm** when the screen prompts you to confirm creating the probe with specified details.

  ![setup](./static/use-probe/setup-6.png)

## Edit a resilience probe

* You can edit a resilience probe by navigating to the probe you wish to edit. Click the three vertical dot menu to the extreme right of the probe, and choose **Edit probe**. Modify the properties you wish to, and click **Save**.

  ![edit](./static/use-probe/edit-probe.png)

## Use a resilience probe

### Step 1: Navigate to chaos experiment

* Navigate to the chaos experiment for wish you wish to set up probe/s. Move to **probes** tab and click **+Select or Add new probes**.

  ![nav](./static/use-probe/select-1.png)

### Step 2: Select or create probe

* You can choose to [create a new probe](#create-a-resilience-probe) or add a probe that you created earlier.

  ![create new](./static/use-probe/select-new-2.png)

### Step 2: Add to fault

* Once you select a probe, click **Add to Fault** to associate the resilience probe with a chaos fault.

  ![add to fault](./static/use-probe/add-to-fault-3.png)

* Click **Apply changes** or continue to add or create probes based on your requirement.

  ![add more](./static/use-probe/add-more-4.png)

## Next steps

* [HTTP probe](/docs/chaos-engineering/technical-reference/probes/http-probe)
* [Command probe](/docs/chaos-engineering/technical-reference/probes/cmd-probe)
* [Kubernetes probe](/docs/chaos-engineering/technical-reference/probes/k8s-probe)
* [Prometheus probe](/docs/chaos-engineering/technical-reference/probes/prom-probe)
* [Datadog probe](/docs/chaos-engineering/technical-reference/probes/datadog-probe)
* [SLO probe](/docs/chaos-engineering/technical-reference/probes/slo-probe)