---
title: Use CE with Feature Flags
sidebar_position: 1
---

You can add chaos experiments to Harness Feature Flags (FF) pipelines as part of the process to control release of new software. An [FF pipeline](/docs/feature-flags/ff-build-pipeline/build-feature-flag-pipeline) runs every time a feature flag changes, and lets you specify actions to take before the flag change takes effect. For example, you might want to have an approval step for all flag changes.

When you add a chaos experiment as a step in an FF pipeline, the experiment runs as part of that pipeline whenever you change a feature flag. For example, if you put a new feature behind a feature flag, you might want to run a chaos experiment on the target application affected by the new code to see how the application responds, before changing the flag to release the new feature to users.

For more information, see: 
* [Build a Feature Flag pipeline](/docs/feature-flags/ff-build-pipeline/build-feature-flag-pipeline)
* [Add a default pipeline for flag changes](/docs/feature-flags/ff-build-pipeline/default-pipeline-ff)
* [Harness pipelines](/docs/category/pipelines)

## Add a chaos experiment to an FF pipeline

Pipelines are organized into stages, each of which handles a major segment of the pipeline process. There are several types of stages available, and you can add chaos experiments as steps in these three stage types:

* Feature Flag
* Deploy
* Custom Stage

**To add a chaos experiment as a step in your FF pipeline:**

1. In Harness, select **Feature Flags > Pipelines**, and then select the pipeline you want to add a chaos experiment to.
1. In the selected pipeline, select **Add Stage**, and then select a stage type.

	Chaos steps are available for **Feature Flag**, **Deploy**, and **Custom Stage** types. 

	![Select a stage screen with Feature Flag, Deploy, and Custom Stage highlighted](./static/pipeline-add-stage.png)

	Alternatively, you can select an existing stage if it's one of the types circled above.

1. Enter a **Stage Name**, and then select **Set Up Stage**.

1. With the stage you want selected, select **Add Step > Add Step**.

	![Add step icon with stage selected](./static/pipeline-add-step.png)

	The Step Library appears.

	![The Step Library showing a few of many available steps](./static/pipeline-step-library.png)

1. Scroll down the list to find the Chaos step icon, and then select it.

	![Chaos step icon](./static/pipeline-chaos-step-icon.png)

1. In the Configure Chaos Experiment screen, enter a **Name** for this step.

1. Select the **Select Chaos Experiment** field to see existing chaos experiments you can add to this pipeline.

	![Select an existing experiment screen grid of experiments and one experiment selected.](./static/pipeline-select-experiment.png)

	When you select an experiment on this screen, the experiment's last resilience score, and a preview of the experiment and the chaos faults included in it, is displayed on the right.

1. (Optional) On this screen you can:
	* Select **New Experiment** to create a new experiment in Chaos Studio. 
	* Select **Edit in Chaos Studio** to edit a selected experiment.

	Either of the above links you to Chaos Studio without saving your work.

1. Select the experiment you want to run in this pipeline step, and then select **Add to Pipeline**.

1. Back on the Configure Chaos Experiment screen, enter the **Expected Resilience Score** for this experiment.

	XXXXXX *What happens to the pipeline if Resilience Score is not met? Do I get a report on the experiment when the pipeling runs?* XXXXXXX

	For more information, see [Analyze chaos experiments](/docs/chaos-engineering/configure-chaos-experiments/experiments/create-complex-chaos-experiments#analyze-chaos-experiments).

1. (Optional) Enter an Optional Configuration by expanding this field, and entering and assertion (you can enter a fixed value, and expression, or a runtime input).

1. (Optional) Select the **Advanced** tab to configure more settings.

	For more information on these settings, see [Harness pipelines](/docs/category/pipelines).

1. Select **Apply Changes** to save this step.






