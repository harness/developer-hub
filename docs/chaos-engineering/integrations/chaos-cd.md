---
title: Use CE with Continuous Delivery
sidebar_position: 2
---

You can add chaos experiments to Harness Continuous Delivery (CD) pipelines as part of your deployment process. This ensures that you validate your system resiliency with every new deployment. Some benefits include:

* Uncovering resilience unknowns
* Increasing developer efficiency
* Reducing resilience debt

Learn more about these benefits in our CE/CD integration [blog](https://www.harness.io/blog/chaos-experiments-in-harness-cd-pipelines).

## Use cases for chaos experiments in CD pipelines

These use cases consist of validating deployments against:

* Existing resilience conditions
* Newly added resilience conditions
* Changes to the platform on which the target deployments run
* Production incidents and alerts
* Configuration changes

Learn more about these use cases in our CE/CD integration [blog](https://www.harness.io/blog/chaos-experiments-in-harness-cd-pipelines).

### Examples of chaos faults to use in your CD pipeline

You might consider injecting these types of faults as chaos steps in your CD pipeline:

* **Network chaos faults** can be used for verifying service or microservice dependencies on each other when there's latency, or when one of the microservices is down. The [Pod network latency](/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-network-latency/) fault is an example.

* **Stress chaos faults** can be used for verifying how microservices behave when there is a noisy neighbor. The [Pod CPU hog](/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-cpu-hog/) fault is an example.

* **HTTP chaos faults** can be used for verifying how services or APIs behave when one of the APIs is under chaos. The [Pod HTTP latency](/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-http-latency/) fault is an example.

For more information, see: 
* [CD tutorials](/docs/continuous-delivery/get-started/cd-tutorial)
* [Tutorial on integrating chaos and CD](/tutorials/chaos-experiments/integration-with-harness-cd)
* [Harness pipelines](/docs/category/pipelines)
* [Blog: CE experiments in CD Pipelines](https://www.harness.io/blog/chaos-experiments-in-harness-cd-pipelines)

## Summary of steps to use CE with CD

These are the high-level steps to use CE with CD using a selected experiment, though you can use many experiments.

1. [Add a chaos experiment](#step-1-add-a-chaos-experiment-and-run-it) and run it to make sure it completes.
1. [Add this experiment to the CD pipeline](#step-2-add-a-chaos-experiment-to-a-cd-pipeline) as a chaos step.
1. [Choose a failure strategy](#step-3-choose-a-failure-strategy).

## Step 1: Add a chaos experiment and run it

[Create a chaos experiment](/docs/chaos-engineering/configure-chaos-experiments/experiments/construct-and-run-custom-chaos-experiments) and run it to make sure it runs to completion. 

In the example below, the relevant [probes](/docs/chaos-engineering/configure-chaos-experiments/probes/configure-and-add-probe) are added to avoid a false positive or false negative scenario around the resilience score.

![Completed chaos experiments with probes shown](./static/exp-run-complete-with-probes.png)

## Step 2: Add a chaos experiment to a CD pipeline

Pipelines are organized into stages, each of which handles a major segment of the pipeline process. There are several types of stages available, and you can add chaos experiments as steps in these three stage types:

* Feature Flag
* Deploy
* Custom Stage

**To add a chaos experiment as a step in your CD pipeline:**

1. In your Harness project, select **Deployments > Pipelines**, and then select the pipeline where you want to add a chaos experiment.
1. In the selected pipeline, select **Add Stage**, and then select a stage type.

	Chaos steps are available for **Feature Flag**, **Deploy**, and **Custom Stage** types. 

	![Select a stage screen with Feature Flag, Deploy, and Custom Stage highlighted](./static/pipeline-add-stage.png)

1. Enter a **Stage Name** (and Deployment Type if applicable), and then select **Set Up Stage**.

1. With the stage you want selected, select **Add Step > Add Step**.

	![Add step icon with stage selected](./static/pipeline-add-step.png)

	The Step Library appears.

	![The Step Library showing a few of many available steps](./static/pipeline-step-library.png)

1. Scroll down the list to find the Chaos step icon, and then select it.

	![Chaos step icon](./static/pipeline-chaos-step-icon.png)

1. In the Configure Chaos Experiment screen, enter a **Name** for this step.

1. Select **Select Chaos Experiment** to see the chaos experiments you can add to this stage.

	![Select an existing experiment screen grid of experiments and one experiment selected.](./static/pipeline-select-experiment.png)

	When you select an experiment, the experiment's last resilience score, a preview of the experiment, and its chaos faults, are displayed.

1. (Optional) On this screen you can:
	* Select **New Experiment** to [create a new experiment](/docs/chaos-engineering/configure-chaos-experiments/experiments/construct-and-run-custom-chaos-experiments) in Chaos Studio. 
	* Select **Edit in Chaos Studio** to edit a selected experiment.

	Selecting these options takes you to Chaos Studio without saving your work.

1. Select the experiment you want to run in this step, and then select **Add to Pipeline**.

1. Back in **Configure Chaos Experiment**, enter the **Expected Resilience Score** for this experiment.

	If the resilience score is not met, this chaos step fails and the [stage failure strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings) is initiated.
	
	For more information, go to [Analyze chaos experiments](/docs/chaos-engineering/configure-chaos-experiments/experiments/create-complex-chaos-experiments#analyze-chaos-experiments).

1. (Optional) Expand **Optional Configuration**, and enter an assertion (you can enter a fixed value, an expression, or a runtime input).

1. (Optional) Select the **Advanced** tab to configure more settings.

	For more information on these settings, go to [Harness pipelines](/docs/category/pipelines).

1. Select **Apply Changes** to save this step in the pipeline, and then select **Save** to save changes to the pipeline.

## Step 3: Choose a failure strategy

[A failure strategy](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) specifies the actions to take if pipeline stages or steps fail due to different conditions. You can configure a failure strategy against each chaos step (experiment) in the pipeline, or through a shell script step at the end of the execution of all chaos steps. Below are examples showing these two options.

### Example 1: Failure strategy for one chaos step

In this example, the failure strategy is **Rollback** for **All Errors** on a specific chaos step. You can also choose different types of errors and different strategies to use for each.

![Failure strategy for a chaos step](./static/fail-strategy-one-exp.png)

### Example 2: Conditional failure step at the end of several chaos steps

In this example, the failure strategy uses a **Shell Script** step after all the chaos steps in the CD pipeline. This step conditionally applies a shell script that specifies actions to take in case of failure. You can configure this step to add the script, and specify the conditions under which it is executed.

![Conditional failure Shell Script step shown in a CD pipeline after many chaos steps](./static/fail-strategy-many-exp.png)   

## What happens when the CD pipeline runs with a chaos step

When the CD pipeline is triggered:

* The chaos step you added to the pipeline triggers the experiment to run on the target application.

* The Chaos Experiments page (**Chaos > Chaos Experiments**) records the experiment run as part of a pipeline, and you can select the experiment to view its execution.

* In the CD pipeline, if the chaos step (the experiment) fails, you can select the failed step to see the log, which includes the resilience score obtained and how many chaos probes passed or failed.
	* You can select **View Detailed Execution** to go to the experiment's execution page in CE.

* Based on the experiment's success or failure, you can decide whether to continue with the deployment. You can automate this by defining a [failure strategy](#step-3-choose-a-failure-strategy) in your pipeline. 

	For more information, go to [Define a failure strategy on stages and steps](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps). 

