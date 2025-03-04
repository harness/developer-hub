---
title: Edit and Update Chaos Experiment
sidebar_position: 20
description: Guide to edit and update chaos experiment
redirect_from:
  - /docs/chaos-engineering/configure-chaos-experiments/experiments/edit-chaos-experiment
---

You can edit an existing chaos experiment to update the experiment's metadata, faults, schedule, etc. This section describes three actions:
1. [Editing an experiment](#edit-a-chaos-experiment)
2. [Update old experiment manifests](#update-old-experiment-manifests)
3. [Bulk updating cron schedules](#bulk-update-cron-schedules)

## Edit a Chaos Experiment

1. On the **Chaos Experiments** page, select the **`⋮`** icon against the name of the experiment you want to edit and select **Edit Experiment**.

    ![Edit Experiment](./static/edit-experiment/edit-experiment.png)

2. You can either update the changes to the same experiment and save it or create a copy of the experiment and then apply the changes to it.

    ![save](./static/edit-experiment/save-after-edit.png)

## Update Old Experiment Manifests

When you upgrade the chaos infrastructure, you also need to update the images in the experiment manifest (YAML file) corresponding to the updated chaos infrastructure. The upgraded images should match the images in the Enterprise ChaosHub.

### Image Versions

To determine the latest version of images, navigate to Enterprise Chaos Hub, and search for **chaos-go-runner**. The value associated with **chaos-go-runner** in the manifest in Enterprise Chaos Hub is the latest version.

![navigate](./static/edit-experiment/update-1.png)

To update the experiment manifest, follow the steps below.

1. Select the experiment whose manifest you wish to update, and click the **Experiment Builder** tab.

    ![select](./static/edit-experiment/exp-builder-2.png)

2. The **VISUAL** is usually displayed, click the **YAML** to edit it. Click **Edit Yaml**.

    ![save](./static/edit-experiment/yaml-3.png)

    ![save](./static/edit-experiment/edit-4.png)

3. Find **chaos-go-runner** in the manifest and replace the corresponding version with the latest version.

    ![save](./static/edit-experiment/find-5.png)

4. Once you update the images, click **Save** at the top right.

    ![save](./static/edit-experiment/save-6.png)

:::tip
When you create a new experiment, the images in the experiment manifest are configured to match the images in the Enterprise Chaos Hub.
:::

The steps mentioned earlier will update the experiment manifests to match the version in the Enterprise Chaos Hub.

## Bulk Update Cron Schedules

You can update multiple cron-scheduled chaos experiments in one go. One important aspect is that you can **bulk update** multiple cron schedules to a **single value**, that is, the cron schedules you select to update will all update to a single common value. You **can't** map different cron schedules to their respective values while performing a bulk update.
You can:
1. Bulk disable active schedules
2. Bulk enable inactive cron schedules
3. Bulk stop running experiments

To enable/disable a cron schedule,

1. Click **Bulk update** at the top right of the **Chaos Experiments** page and choose one of the following options:
  1. Reschedule cron
  2. Enable/disable cron

2. Select one of the above based on your requirements.

:::tip
You can bulk update (reschedule or enable/disable) not more than 20 experiments in one go.
:::

3. Select one or more experiments that you wish to reschedule or enable/disable. Click **Next**.

4. You can choose between [rescheduling](#reschedule-a-cron-schedule) or [enabling (or disabling)](#enable-or-disable-a-cron-schedule) a cron schedule.

### Reschedule a Cron Schedule

You can change the schedule of the experiments by changing the values, and click **Confirm**.

### Enable or Disable a Cron Schedule

1. You can select one of the options (enable cron or disable cron), and click **Confirm**.

2. You will see a confirmation message on your screen about the updated schedule. Click **Close**.


## Next Steps

- [Alerts for Experiments](/docs/chaos-engineering/use-harness-ce/experiments/alert-integration)
- [Runtime Variable Support for Experiments](/docs/chaos-engineering/use-harness-ce/experiments/fault-template)