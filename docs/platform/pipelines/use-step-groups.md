---
title: Organize steps in step groups
sidebar_label: Use Step Groups
description: Steps in a step group can run serially or in parallel.
sidebar_position: 30
keywords:
  - step groups
  - parallel execution
  - pipeline organization
tags:
  - pipelines
helpdocs_topic_id: 5w7wbq3vok
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-integration/use-ci/optimize-and-more/group-ci-steps-using-step-groups
---

Step groups organize related steps within a pipeline and can run their steps sequentially or in parallel, providing fine-grained control over execution flow and resource utilization.

Step groups can have conditional execution, failure strategies, and looping strategies that apply to all steps in the group.

Step groups help you to:

* Improve test times in pipelines that include a lot of tests.
* <a href="/docs/continuous-integration/use-ci/manage-dependencies/health-check-services" target="_blank" rel="noopener noreferrer">Run health checks on background services</a>.
* Organize complex stages that have lots of steps.


## What you will learn from this topic

- How to [add a step group](#add-a-step-group) to a pipeline stage
- How to [organize steps and step groups](#organize-steps-and-step-groups) for serial and parallel execution
- How to [reference step group data](#reference-step-group-data) using expressions
- How to configure [step group advanced configuration](#step-group-advanced-configuration) including conditional execution, failure strategies, and looping strategies

---

## Before you begin

- **Harness project access:** You need View and Edit permissions on <a href="/docs/platform/role-based-access-control/permissions-reference#pipelines" target="_blank" rel="noopener noreferrer">Pipelines</a>. An administrator must assign you a role that includes these permissions. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.
- **Existing pipeline:** You need a pipeline with at least one stage. For more information, refer to <a href="/docs/platform/pipelines/add-a-stage" target="_blank" rel="noopener noreferrer">Add a stage</a>.

---

## Add a step group

Perform the following steps to add a step group:

1. Go to the pipeline stage where you want to add a step group.
2. In the stage's **Execution** tab, click **Add Step**, and then select **Add Step Group**.

   <div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-20.png')} alt="Add Step menu showing Step Group option" width="80%" /></div>

3. Enter a name for the step group.
4. When you manually add a step group, you can enable containerized step groups by selecting the **Enable container based execution** option. For more information, refer to [Containerize step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/)
5. Select **Apply Changes**.
6. Add or drag steps into the step group, and then configure the steps as usual.

   <div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-16.png')} alt="Step group with steps added in the pipeline editor" width="80%" /></div>

<details>
<summary>YAML example: Step group in a Build stage</summary>

The following YAML example includes one stage with three steps. Two steps are in a step group, and one step is not in the step group.

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
        steps: # Step container for the entire stage.
          - stepGroup: # Step group flag.
              name: sg1 # Step group name.
              identifier: sg1 # Step group ID.
              steps: # Step container for the step group. The following two steps are in the step group.
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
          - step: # This step is outdented so that it is not in the step group.
              type: Run
              name: Run_3
              identifier: Run_3
              spec:
                ...    
```

</details>

---

## Organize steps and step groups

You can have multiple step groups in the same stage. Step groups can run in parallel.

Within each step group, you can arrange the steps to run sequentially, in parallel, or a combination.

Running groups or steps in parallel can have significant impacts on resource allocation.

### Resource consumption with parallel execution

When you use self-managed build infrastructures, running steps or step groups in parallel can improve execution time by running multiple sets of tasks at the same time. However, this can also increase the resource consumption of the infrastructure during pipeline execution.

When you use Harness-managed build infrastructures, Harness bills your account based on the compute resources used during each pipeline execution. Running steps or step groups in parallel increases your resource consumption, and your account is billed accordingly. For more information, refer to <a href="/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#billing-and-build-credits" target="_blank" rel="noopener noreferrer">Harness Cloud billing and build credits</a>.

<div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-19.png')} alt="Diagram showing parallel step execution and resource usage" width="80%" /></div>

### Step group nesting

You cannot create a step group inside another step group, but you can configure the steps within a group to run in parallel. You can also run multiple step groups in parallel.

<div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-18.png')} alt="Visual editor showing parallel step groups" width="80%" /></div>

---

## Reference step group data

To reference a step, step setting, variable, output, or other data from a step in a step group, you must include the step group ID in the <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">expression</a>, such as:

```
<+execution.steps.STEP_GROUP_ID.steps.STEP_ID.SETTING_NAME>
```

<div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-22.png')} alt="Expression showing step group reference syntax" width="80%" /></div>

For example, the following reference calls an output variable named `outVar1` that comes from a step with the ID `run_script` that is inside a step group with the ID `StepGroup1`:

```
<+execution.steps.StepGroup1.steps.run_script.output.outputVariables.outVar1>
```

### Referencing outputs from parallel steps

Steps running in parallel cannot reference output data from each other, since the data might not be available if a step in the group is still running. A step can reference outputs only from other steps that have already finished running.

<div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-17.png')} alt="Diagram showing parallel step output reference limitation" width="80%" /></div>

---

## Step group advanced configuration

You can configure **Conditional Execution**, **Failure Strategy**, and **Looping Strategy** settings for step groups. These settings apply to all steps in the group, unless an individual step has its own settings.

However, if a step within the group has its own step-level **Conditional Execution** or **Failure Strategy**, then the individual step's settings override the step group's settings for that single step.

If you configure stage-level **Conditional Execution** and **Failure Strategy** settings, then those settings apply to any step groups or steps that do not have their own **Conditional Execution** and **Failure Strategy** settings.

Perform the following steps to access Conditional Execution, Failure Strategy, and Looping Strategy settings for step groups:

1. Select the step group name in the Pipeline Studio.
2. Select **Advanced** on the **Step Group** settings panel.
3. Configure the required settings.

   <div align="center"><DocImage path={require('./static/group-ci-steps-using-step-groups-21.png')} alt="Step Group Advanced settings showing Conditional Execution, Failure Strategy, and Looping Strategy options" width="80%" /></div>

---

## Next steps

- <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Step skip condition settings</a>: Configure when steps or step groups should skip execution.
- <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Define failure strategies</a>: Configure how steps and step groups handle failures.
- <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping strategies</a>: Apply matrix, repeat, or parallelism strategies to step groups.
