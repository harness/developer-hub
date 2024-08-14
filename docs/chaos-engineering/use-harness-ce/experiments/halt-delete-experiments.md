---
title: Halt and delete chaos experiments
sidebar_position: 40
description: Halt and delete chaos experiments
redirect_from:
- /docs/chaos-engineering/configure-chaos-experiments/experiments/halt-chaos-experiments
- /docs/chaos-engineering/configure-chaos-experiments/experiments/delete-chaos-experiments
- /docs/chaos-engineering/features/experiments/halt-chaos-experiments
- /docs/chaos-engineering/features/experiments/delete-chaos-experiments
---

Halting the execution of a chaos experiment safeguards the target applications against any unwanted and unforeseen consequences due to the experiment. It immediately stops the execution of an experiment and reverts the target resources to their initial state.

* To halt an experiment execution, select the experiment name from the list of experiments accessible under the **Chaos Experiments** page. Then, simply select the `🚫` icon. You'll notice that the state of the experiment will be updated to `Stopped`.

	![Stopped Experiment Run](./static/halt-delete-experiments/stopped-experiment-run.png)

* If you have multiple experiments under execution and you want to halt all of them at once, in the **Chaos Experiments** page select the **Stop All Experiments** button. This will bring all the currently executing experiments to a halt.

	![Stop All Experiments](./static/halt-delete-experiments/stop-all-experiments.png)

:::info note
Stopping a cron experiment also disables it so that not only will it immediately halt executing but also it won't execute as per its cron schedule thereafter.
:::

Finally, deleting an experiment under execution also causes it to immediately halt but also delete forever. To delete an experiment, select the **`⋮`** icon against the experiment name, and select **Delete Experiment**.

## Delete an experiment
Deleting an experiment removes it from the list of experiments in the **Chaos Experiments** sidebar option under Chaos tab.
- Deleting an initialized or completed experiment will permanently remove the experiment.
- Deleting a running experiment will not only remove the experiment permanently but also immediately stop the experiment execution.
- Deleting an experiment doesn't remove any template which has been created using that experiment.

To delete any experiment, go to the **Chaos Experiments** page, select the **More options** icon (**⋮**) for the experiment you want to delete, and then select **Delete Experiment**.

![Delete Experiment](./static/halt-delete-experiments/delete-experiment.png)
