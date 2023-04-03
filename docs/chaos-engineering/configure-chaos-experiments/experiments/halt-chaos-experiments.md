---
title: Halt Chaos Experiments
sidebar_position: 5
---

Halting the execution of a chaos experiment safeguards the target applications against any unwanted and unforeseen consequences due to the experiment. It immediately stops the execution of an experiment and reverts the target resources to their initial state. 

To halt an experiment execution, select the experiment name from the list of experiments accessible under the **Chaos Experiments** page. Then, simply select the `🚫` icon. You'll notice that the state of the experiment will be updated to `Stopped`.

![Stopped Experiment Run](./static/halt-chaos-experiments/stopped-experiment-run.png)

If you have multiple experiments under execution and you want to halt all of them at once, in the **Chaos Experiments** page select the **Stop All Experiments** button. This will bring all the currently executing experiments to a halt.

![Stop All Experiments](./static/halt-chaos-experiments/stop-all-experiments.png)

:::info
Stopping a cron experiment also disables it so that not only will it immediately halt executing but also it won't execute as per its cron schedule thereafter.
:::

Finally, deleting an experiment under execution also causes it to immediately halt but also delete forever. To delete an experiment, select the **`⋮`** icon against the experiment name, and select **Delete Experiment**.