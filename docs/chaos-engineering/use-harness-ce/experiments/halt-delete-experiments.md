---
title: Halt and delete chaos experiment
sidebar_position: 40
description: Halt and delete chaos experiment
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/experiments/halt-chaos-experiments
- /docs/chaos-engineering/configure-chaos-experiments/experiments/delete-chaos-experiments
- /docs/chaos-engineering/features/experiments/halt-chaos-experiments
- /docs/chaos-engineering/features/experiments/delete-chaos-experiments
---

Halting the execution of a chaos experiment protects target applications from any unwanted and unforeseen consequences by immediately stopping the experiment and reverting the target resources to their initial state.

## Halt an Experiment

1. To halt an experiment execution, select its name from the list of experiments on the **Chaos Experiments** page. Click the `🚫` icon. The experiment's status will update to `Stopped`.

	![Stopped Experiment Run](./static/halt-delete-experiments/stopped-experiment-run.png)

2. If you need to halt multiple experiments simultaneously, go to the **Chaos Experiments** page and click **Stop All Experiments**. This will stop all currently executing experiments.

	![Stop All Experiments](./static/halt-delete-experiments/stop-all-experiments.png)

:::info note
Halting a cron experiment also disables it, preventing it from executing according to its cron schedule in the future.
:::

Finally, deleting an experiment that is currently running will not only stop it immediately but also permanently remove it. To delete an experiment, click the **`⋮`** icon next to the experiment name and select **Delete Experiment**.

## Delete an Experiment
Deleting an experiment removes it from the **Chaos Experiments** list under the **Chaos** tab.

:::tip
- Deleting an initialized or completed experiment will permanently remove it.
- Deleting a running experiment will both stop the execution and permanently remove the experiment.
- Deleting an experiment does not delete any templates created from that experiment.
:::

To delete an experiment, go to the **Chaos Experiments** page, click the **More options** icon (⋮) next to the experiment you want to delete, and select **Delete Experiment**.

	![Delete Experiment](./static/halt-delete-experiments/delete-experiment.png)

