---
title: Create experiment
sidebar_position: 1
redirect_from:
- /docs/chaos-engineering/features/experiments/create-complex-chaos-experiments
- /docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments
---

This topic describes how to create chaos experiments, execute chaos faults to improve the resilience of your application.

## Before you begin, review the following:

- [What is a chaos experiment?](/docs/chaos-engineering/concepts/chaos101)
- [What are chaos faults?](/docs/chaos-engineering/use-harness-ce/experiments/#chaos-fault)
- [What are resilience probes?](/docs/chaos-engineering/use-harness-ce/probes/)
- [How to create a resilience probe?](/docs/chaos-engineering/use-harness-ce/probes/use-probe)

## Steps to create an experiment

### Create Environment

Before you create an experiment, you need an environment where you have to [enable a chaos infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/enable-disable).
Therefore, [create an environment](/docs/chaos-engineering/getting-started/saas/#step-3-create-an-environment).


:::info note
To edit or delete the environment, select the **`⋮`** icon against the name of the environment.

	![](./static/create-experiments/edit-3.png)
:::

### Create an Infrastructure

After creating your environment, [create an infrastructure](/docs/chaos-engineering/getting-started/saas/#step-4-create-an-infrastructure) within it. The chaos experiment is executed within this infrastructure. 

### Create a Chaos Experiment

You can add one or more chaos faults to a chaos experiment and execute it. [Create an experiment using the interactive guide or step-by-step](/docs/chaos-engineering/getting-started/saas/#step-7-construct-a-chaos-experiment) with one chaos fault, namely, pod delete, which has one resilience probe associated with it.

Different ways of building a chaos experiment are described below.

* **[Blank Canvas](#using-blank-canvas)** - Lets you build the experiment from scratch, adding the specific faults you want.
* **[Templates from ChaosHubs](#using-templates-from-chaoshubs)** - Lets you preview and select and experiment from pre-curated experiment templates available in [ChaosHubs](/docs/chaos-engineering/use-harness-ce/chaoshubs/).
* **[Upload YAML](#upload-yaml)** - Lets you upload an experiment manifest YAML file.

These options are explained below.

#### Using Blank Canvas

1. On the **Experiment Builder** tab, click **Add** to add a fault to the experiment.

	![Experiment Builder tab with Add button](./static/create-experiments/experiment-builder-add.png)

2. Select the fault you want to add to the experiment.

	![Select Faults](./static/create-experiments/select-faults.png)

3. For each fault, tune the properties. The properties will vary depending on the faults.

	* To tune each fault:

		* **Specify the target application (only for pod-level Kubernetes faults):** This allows the corresponding pods of the application to be targeted.

			![target app](./static/create-experiments/target-app.png)

		* **Tune fault parameters:** Each fault has a set of common parameters, like **chaos duration** and **ramp time**, and unique parameters that you can customize as needed.

		* **Tune Fault Weightage**: Set the weight for the fault, which determines its importance relative to other faults in the experiment. This weight is used to calculate the experiment's resilience score.

			![Tune Fault](./static/create-experiments/tune-fault.png)

		* **Add chaos probes:** (Optional) On the **Probes** tab, add [resilience probes](/docs/chaos-engineering/use-harness-ce/probes/use-probe) to automate the chaos hypothesis checks for a fault during the experiment execution. Probes are declarative checks that validate specific criteria, that help determine if an experiment **passed**.

			![resilience probe](./static/create-experiments/res-probe.png)

    

#### Using Templates from ChaosHubs

1. Select an experiment template from a [ChaosHub](/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub).

	* Choose **Experiment Type** to see the available ChaosHubs.
	* Select a template to preview the faults included.

		![Fault Templates](./static/create-experiments/fault-templates.png)

:::info note
You can edit the template to add more faults or update the existing faults.
:::

#### Upload YAML

1. Upload an experiment manifest YAML file to create the experiment.

:::info note
You can edit the experiment to update the existing faults or add more.
:::


After constructing the chaos experiment using one of the three options, save the experiment.

	![Save experiment options](./static/create-experiments/save-experiment.png)

	* Click **Save** to save the experiment to the Chaos Experiments page. You can add it to a [ChaosHub](/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub) later.
	* Select **Add Experiment to ChaosHub** to save this experiment as a template in a selected [ChaosHub](/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub).

## Create Experiment as a Pipeline

1. Go to **Chaos** module and select **Pipelines** and click **+Create a Pipeline**.

	![](./static/create-experiments/create-pipeline-1.png)

2. Provide a name, and click **Start**.

	![](./static/create-experiments/new-pipeline-2.png)

3. Click the **+** (the stage type), and select **Custom Stage**.

	![](./static/create-experiments/stage-3.png)

4. Provide a name for the stage, and click **Set Up Stage**.

	![](./static/create-experiments/set-stage-4.png)

5. Click **Add Step** and choose the **Add Step** option.

	![](./static/create-experiments/add-step-5.png)

6. Choose **Chaos** from the Step Library.

	![](./static/create-experiments/select-chaos-6.png)

7. Provide a name, select the chaos experiment.

	![](./static/create-experiments/configure-7.png)

8. Choose from the list of chaos experiments, and click **Add to Pipeline**.

	![](./static/create-experiments/select-exp-8.png)

9. Click **Apply Changes**.

	![](./static/create-experiments/apply-9.png)

10. Click **Save**.

	![](./static/create-experiments/overview-10.png)


For more information, go to [Pipeline concepts](/docs/continuous-integration/get-started/key-concepts) and [Pipeline Modeling Overview](/docs/continuous-delivery/get-started/cd-pipeline-modeling-overview).

## Run or Schedule the Experiment

You can choose to run the experiment immediately by clicking the **Run** button, or schedule it to run at a specific time by selecting the **Schedule** tab.

### Execute Experiment Once

- To execute the experiment once, select **Non-Cron (Single run)**, click **Set Schedule**, and then select **Run**.

- To run the experiment once, and at a specific time, select the **Run Once at a specific time**, choose the date and time, click apply, and select **Set Schedule**.

	![Schedule experiment](./static/create-experiments/schedule.png)

### Execute Experiment on a Schedule

1. To schedule the experiment to run periodically, select **Cron (Recurring run)**, and set the schedule using the **Minutes**, **Hourly**, **Daily**, **Monthly** or **Yearly** options. The **Cron Expression** will be automatically generated.

2. Click **Set Schedule**.

	![cron experiment](./static/create-experiments/cron-schedule.png)

## Advanced Experiment Setup Options

On the Experiment Builder tab, you can click **Advanced Options** to configure the following advanced options when creating an experiment for a Kubernetes chaos infrastructure:

![Advanced Options](./static/create-experiments/advanced-options.png)

### General Options

**Node Selector**

Specify the node on which the experiment pods will be scheduled by providing the node label as a key-value pair.

- This can be used with node-level faults to avoid scheduling the experiment pod on the target node(s).
- It can also be used to limit the scheduling of experiment pods on nodes with an unsupported OS.

	![Node Selector](./static/create-experiments/node-selector.png)

**Toleration**

Specify the tolerations that must be satisfied by a tainted node to schedule the experiment pods. For more information on taints and tolerations, refer to the [Kubernetes documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/).

- This can be used with node-level faults to avoid scheduling the experiment pod on the target node(s).
- It can also be used to limit the scheduling of the experiment pods on nodes with an unsupported OS.

	![Toleration](./static/create-experiments/toleration.png)

**Annotations**

Specify the annotations to be added to the experiment pods by providing them as key-value pairs. For more information on annotations, refer to the [Kubernetes documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).

Annotations can be used to bypass network proxies enforced by service mesh tools like Istio.

	![Annotations](./static/create-experiments/annotations.png)

### Security Options

**Enable runAsUser**

Specify the user ID to start all the processes in the experiment pod containers. By default, the user ID `1000` is used.
This option allows privileged or restricted access for experiment pods.

	![runAsUser](./static/create-experiments/run-as-user.png)

**Enable runAsGroup**

Specify the group ID to start all the processes in the experiment pod containers instead of a user ID.
This option allows privileged or restricted access for experiment pods.

	![runAsGroup](./static/create-experiments/run-as-group.png)


## Add serial and parallel faults
You can add multiple faults in a single chaos experiment that is scaled efficiently by Harness CE during execution.

:::tip
Consider the overall impact that these faults have on the application. Your experience in production environments may differ due to lack of resources when a number of parallel faults are being executed.
:::

1. To add a fault that runs in parallel to another fault, point your mouse below an existing fault, and then select **Add**. You can follow the same process to add a serial fault.

	![Complex Faults Experiment](./static/create-experiments/add-parallel.png)

:::note
For Linux, experiments with a parallel fault are currently not supported.
:::

The image below shows a single experiment that consists of serial and parallel faults.
* Faults **A**, **B**, and **C** are parallel faults. They begin execution at the same time.
* Faults **A**, **B**, **C** and faults **D** and **E** are serial. **A**, **B**, and **C**  complete execution and then  **D** and **E** begin execution.
* Similarly, faults **H** and **I** are serial faults, where **H** completes execution, and **I** begins.

	![Complex Faults Experiment](./static/create-experiments/complex-faults-experiment.png)

## Analyze experiment
You can observe the status of execution of fault/s of a chaos experiment during its run. The screen shows the experiment pipeline on the right hand side, and details such as **Environment**, **Infrastructure Name**, and the runs that have passed and failed on the left hand side.

![Experiment Executing](./static/analyze-experiment/experiment-executing.png)

When the experiment completes execution, it displays the [**Resilience Score**](/docs/chaos-engineering/use-harness-ce/experiments/#determine-the-resilience-of-target-environment-using-resilience-score). This score describes how resilient your application is to unplanned failures.
The **probe success percentage** helps determine the outcome of every fault in the chaos experiment. Probes (if any) associated with the experiment are used to understand how the application fared.

![Experiment Failed](./static/analyze-experiment/experiment-failed.png)

If any of the faults fail, you can find the **Fail Step** that elaborates on the reason why the fault failed.

![Result Fail Step](./static/analyze-experiment/result-fail-step.png)