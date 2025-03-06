---
title: Export chaos experiment
sidebar_position: 30
description: Guide to export chaos experiment
redirect_from:
	- /docs/chaos-engineering/configure-chaos-experiments/experiments/export-chaos-experiments
---

This topic describes how to export an experiment by downloading the experiment manifest, uploading a manifest to create an experiment and exporting an experiment for future use.

## Prerequisites

- [Create Experiment](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments)
- [Run or Schedule Experiment](/docs/chaos-engineering/use-harness-ce/experiments/run-schedule-exp)

You can export chaos experiments for future use. While creating or running an experiment, Chaos Studio automatically saves it for future access through the **Chaos Experiments** sidebar. You can also download the experiment as a manifest file to your machine or save it in a ChaosHub.

## Download Experiment Manifest File

1. To download the manifest file for an experiment, select the **Chaos Experiments** sidebar option. You can access all the experiments that have been created or run in the past.

2. To export an experiment, select the **`⋮`** icon against the name of the experiment.
Select **Download Manifest**. This downloads the experiment file to your machine.

	![Download Experiment Manifest](./static/export-chaos-experiments/download-experiment-manifest.png)

3. You can directly upload this manifest file while creating a new experiment to use it as a template for the new experiment. You can, as usual, provide the **Name**, **Infrastructure type**, and **Infrastructure** for the chaos experiment and select **Upload YAML**. You can upload the manifest file from your machine or drag and drop the file. 

	![upload yaml](./static/export-chaos-experiments/yaml-upload.png)

:::info note
An efficient way to save, manage, and distribute the experiments as templates is to use ChaosHubs.
:::

## Add an Experiment to ChaosHub

1. To add an experiment to ChaosHub, select the **`⋮`** icon against the name of the experiment.

2. Select **Add to Chaos Hub**. Then, add an experiment name, optionally a description and a category tag, and choose the ChaosHub to add the experiment to from the list of added chaos hubs.

	![Add Experiment to ChaosHub](./static/export-chaos-experiments/add-experiment-to-chaoshub.png)

3. Select **Save**. Now, you should be able to see this experiment added to your chaos hub. You can access it and use it as a template for your new experiments.

	![Added Experiment to Hub](./static/export-chaos-experiments/added-experiment-to-hub.png)

## Next Steps

- [Alerts for Experiments](/docs/chaos-engineering/use-harness-ce/experiments/alert-integration)
- [Runtime Variable Support for Experiments](/docs/chaos-engineering/use-harness-ce/experiments/fault-template)