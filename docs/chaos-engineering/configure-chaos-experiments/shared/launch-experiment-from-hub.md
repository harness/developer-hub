You can launch experiments from the default Enterprise Chaos Hub or from custom hubs. 

:::info note
Launching the experiment from a hub is different from running an experiment from the Chaos Experiments page. The experiments in chaos hubs are actually templates, so when you launch them from a hub you must provide some additional details. The experiments in the Chaos Experiments page execute immediately, as configured, when you run them.
:::

To launch an experiment from a chaos hub:

1. In Harness, navigate to **Chaos > ChaosHubs**.

	![navigate](../chaos-hubs/static/manage-hub/new-hub.png)

1. Select the hub whose experiments you wish to launch.

	![Select hub](../chaos-hubs/static/manage-hub/select.png)

1. Find the experiment you want to launch, and then select **Launch Experiment**.

	![Launch](../chaos-hubs/static/manage-hub/launch.png)

1. Select a chaos infrastructure, and then select **Next**. You can change the infrastructure type if necessary.

	![Select a Chaos Infrastructure](../chaos-hubs/static/manage-hub/launch-select-chaos-infra.png)

1. This takes you to the **Experiment Builder** where you can select the faults in the experiment to configure them. You can add more faults or delete faults from the experiment, or update the sequence of faults. 

	![ ](../chaos-hubs/static/manage-hub/exp-builder.png)

1. Select **Run** to execute the experiment. 

	![](../chaos-hubs/static/manage-hub/run-exp.png)

:::tip
You can also save your customized experiment as a template in a chaos hub using the **Save** button.

	![](../chaos-hubs/static/manage-hub/save-changes.png)
:::