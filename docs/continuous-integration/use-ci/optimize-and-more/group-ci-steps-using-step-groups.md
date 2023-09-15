---
title: Use step groups to organize CI steps
description: Steps in a step group run serially or in parallel.
sidebar_position: 30
helpdocs_topic_id: 5w7wbq3vok
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add steps to CI pipelines individually or in step groups. Steps in step groups can run serially or in parallel. Step groups can have [Conditional Execution, Failure Strategy, and Looping Strategy](#advanced-settings) settings that apply to all steps in the group.

Step groups are one of the [optimization methods](./optimizing-ci-build-times.md) you can use to speed up your CI pipelines. You might use step groups to:

* Improve test times in pipelines that include a lot of tests.
* [Run health checks on background services](../manage-dependencies/health-check-services.md).

:::info

* Steps running in parallel can't reference output data from each other, since the data might not be available if a step in the group is still running. A step can reference outputs only from other steps that have already finished running.

   ![](./static/group-ci-steps-using-step-groups-17.png)

* You can't create a step group inside another step group, but you can configure the steps within a group to run in parallel. You can also run multiple step groups in parallel.

   ![](./static/group-ci-steps-using-step-groups-18.png)

* Consider resource consumption when organizing steps to run in parallel. Pipelines reserve memory and CPU resources in advance for each stage, and the amount of reserved memory and CPU is determined by the highest utilization at any point in the stage. For example, the stage depicted in the following screenshot reaches peak resource consumption when Step Group 1 is running. Given this, the pipeline reserves 1700Mi of memory and 1200m of CPU in anticipation of this workload. If the pipeline's build infrastructure can't reserve enough resources, the pipeline fails.

   ![](./static/group-ci-steps-using-step-groups-19.png)

:::

## Add a step group

1. Go to the pipeline where you want to add a step group.
2. In the stage's **Execution** tab, select **Add Step**, and then select **Step Group**.

   ![](./static/group-ci-steps-using-step-groups-20.png)

3. Enter a name for the step group, and then select **Apply Changes**.
4. Add or drag steps into the step group and configure the steps as usual.

   ![](./static/group-ci-steps-using-step-groups-16.png)

The following YAML example includes one stage with three steps. Two steps are in a step group, and one step isn't in the step group.

```yaml
    - stage:
        type: CI
        name: build
        identifier: build
        spec:
          cloneCodebase: false
          infrastructure:
            ...
          execution:
            steps: ## Step container for the entire stage.
              - stepGroup: ## Step group flag.
                  name: sg1 ## Step group name.
                  identifier: sg1 ## Step group ID.
                  steps: ## Step container for the step group. The following two steps are in the step group.
                    - step:
                        type: Run
                        name: Run_1
                        identifier: Run_1
                        spec:
                          ...
                    - step:
                        type: Run
                        name: Run_2
                        identifier: Run_2
                        spec:
                         ...
              - step: ## This step is outdented so that it is not in the step group.
                  type: Run
                  name: Run_3
                  identifier: Run_3
                  spec:
                    ...
```

### Advanced settings

Step groups can have [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/), [Failure Strategy](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps), and [Looping Strategy](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism) settings that apply to all steps in the group. However, if a step in the group has its own step-level **Conditional Execution** and **Failure Strategy**, then the individual step's settings override the step group's settings for that single step.

If you configure stage-level **Conditional Execution** and **Failure Strategy** settings, then those settings apply to any step groups or steps that don't have their own **Conditional Execution** and **Failure Strategy** settings.

![](./static/group-ci-steps-using-step-groups-21.png)

To configure a step group's advanced settings:

1. Select the step group name in the Pipeline Studio.
2. Select **Advanced** on the **Step Group** settings pane.

## Referencing data in step groups

To reference a step, step setting, variable, output, or other data from a step in a step group, you must include the step group ID, such as:

```
<+execution.steps.[step-group-id].steps.[step-id].[field-name]>
```

![](./static/group-ci-steps-using-step-groups-22.png)


For example, the following reference calls an output variable named `outVar1` that comes from a step with the ID `run_script` that is inside a step group with the ID `group1`:

```
<+execution.steps.group1.steps.run_script.output.outputVariables.outVar1>
```
