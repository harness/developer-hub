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

	Chaos steps are available for Feature Flag, Deploy, and Custom Stage types. 

	![Select a stage screen with Feature Flag, Deploy, and Custom Stage highlighted](./static/pipeline-add-stage.png)

	Alternatively, you can select an existing stage if it's one of the types circled above.

