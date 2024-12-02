---
title: Insert step and stage in existing Template
description: It allows you to insert step and stage in existing templates wihthout a need to create a new version of the template.
sidebar_position: 7
---

:::info note
Currently this feature is behind the feature flag `PIE_FLEXIBLE_TEMPLATES`. Please contact [Harness support](mailto:support@harness.io) to enable this feature.
:::

Insert blocks provide a way to customize pipelines without affecting the main template. 

Steps and stages included in the insert block will behave the same as normal steps and stages in the pipeline.

:::info note
Insert block is only supported for CD, Custom and Approval Stages.
:::

## Pros of Using Insert blocks in a template

- Only the Template Editor has the flexibility to allow additional steps or stages at any given point where they want.(At beginning of all steps/stage or at the end of all steps/stages or in between the steps/stages)
- The YAML would be very simple and incline with existing harness steps/stages YAML. Here the Insert is as simply a new type of step which starts with the key `insert`. 

Now, let's dive into who can add insert block in the pipeline and stage template and how other users can utilise it in their pipelines.

## Insert stage block in Pipeline Template

**Template editors** will be able to add insert stage block in the pipeline template at any position between a stage.


![](./static/inject_stage_example.png)

Sample YAML of a pipeline template with insert stage block will look like:

```yaml
template:
  name: pipeline_insert_template
  identifier: pipeline_insert_template
  versionLabel: v2
  type: Pipeline
  projectIdentifier: Insert_block
  orgIdentifier: default
  tags: {}
  spec:
    stages:
      - stage:
          name: cust_1
          identifier: cust_1
          description: ""
          type: Custom
          spec:
            execution:
              steps:
                - step:
                    type: ShellScript
                    name: ShellScript_1
                    identifier: ShellScript_1
                    spec:
                      shell: Bash
                      executionTarget: {}
                      source:
                        type: Inline
                        spec:
                          script: echo hello
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
      - insert:
          identifier: insertStages1
          name: insertStages1
          stages: <+input>
          tags: {}
      - stage:
          name: cust_2
          identifier: cust_2
          description: ""
          type: Custom
          spec:
            execution:
              steps:
                - step:
                    type: ShellScript
                    name: ShellScript_1
                    identifier: ShellScript_1
                    spec:
                      shell: Bash
                      executionTarget: {}
                      source:
                        type: Inline
                        spec:
                          script: echo hello_2
                      environmentVariables: []
                      outputVariables: []
                    timeout: 10m
      - insert:
          identifier: insertStages2
          name: insertStages1
          stages: <+input>
          tags: {}
```

## Insert step block in Stage Template

Similarly, as a Template Editor you can add a insert step block in the stage template at any position between a step. 

![](./static/inject_step_example.png)

Sample YAML of a stage template with an insert step block will look like:-

```yaml
template:
  name: stage_insert_template
  identifier: stage_insert_template
  versionLabel: v2
  type: Stage
  projectIdentifier: Insert_block
  orgIdentifier: default
  tags: {}
  spec:
    type: Custom
    spec:
      execution:
        steps:
          - step:
              type: ShellScript
              name: ShellScript_1
              identifier: ShellScript_1
              spec:
                shell: Bash
                executionTarget: {}
                source:
                  type: Inline
                  spec:
                    script: echo hello
                environmentVariables: []
                outputVariables: []
              timeout: 10m
          - insert:
              identifier: insertSteps1
              name: insertSteps1
              steps: <+input>
          - step:
              type: ShellScript
              name: ShellScript_2
              identifier: ShellScript_2
              spec:
                shell: Bash
                executionTarget: {}
                source:
                  type: Inline
                  spec:
                    script: echo hello_2
                environmentVariables: []
                outputVariables: []
              timeout: 10m
          - insert:
              identifier: insertSteps2
              name: insertSteps2
              steps: <+input>
```

This allows you, as the template editor, to maintain control over the template, ensuring its integrity is preserved. 

Now, if you use a template with a insert step/stage block in a pipeline, suppose you are using a pipeline template while creating a pipeline in a pipeline studio those insert stages will come under `templateInputs`. 

Sample YAML:

```yaml
pipeline:
  name: pipeline_insert_sample
  identifier: pipeline_insert_sample
  tags: {}
  template:
    templateRef: pipeline_insert_template
    versionLabel: v2
    templateInputs:
      stages:
        - insert:
            identifier: insertStages1
            stages: <+input>
        - insert:
            identifier: insertStages2
            stages: <+input>
  projectIdentifier: Insert_block
  orgIdentifier: default

```
In the above YAML as you can see, we have used pipeline template ` pipeline_insert_template` which are having two insert blocks and those insert blocks are under `templateInputs`.


**Template user** can add additional step and stage wherever an insert block has been defined. The insert block support inclusion of stages and steps along with runtime inputs, failure strategies, and conditional execution.

Consider a YAML using stage template in a pipeline with an insert step block:-

```yaml
pipeline:
  name: pipeline_sample
  identifier: pipeline_sample
  projectIdentifier: Krishika_test_autocreation
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: stage_1
        identifier: stage_1
        tags: {}
        template:
          templateRef: stage_insert_template
          versionLabel: v2
          templateInputs:
            type: Custom
            spec:
              execution:
                steps:
                  - insert:
                      identifier: insertSteps1
                      steps:
                        - parallel:
                            - step:
                                identifier: shell1
                                type: ShellScript
                                name: shell1
                                spec:
                                  shell: Bash
                                  executionTarget: {}
                                  source:
                                    type: Inline
                                    spec:
                                      script: echo hello_3
                                  environmentVariables: []
                                  outputVariables: []
                                timeout: 10m
                                failureStrategies:
                                  - onFailure:
                                      errors:
                                        - AllErrors
                                      action:
                                        type: Ignore
                  - insert:
                      identifier: insertSteps2
                      steps: <+input>
```

In this, under the first insert block we have added one Shell Script step. Now, when we run the pipeline the execution will look like :-

![](./static/inject_stage_template_with_step.png)

If no actions are provided in the insert block the pipeline will proceed without any additonal steps and stages. 

For example, in the below yaml, we have used this stage template  in the pipeline with 2 insert blocks and we have not added any additional steps in it:-

```yaml
pipeline:
  name: pipeline_insert_sample
  identifier: pipeline_insert_sample
  projectIdentifier: Krishika_test_autocreation
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: stage_1
        identifier: stagd_1
        tags: {}
        template:
          templateRef: stage_insert_template
          versionLabel: v2
          templateInputs:
            type: Custom
            spec:
              execution:
                steps:
                  - insert:
                      identifier: insertSteps1
                      steps: <+input>
                  - insert:
                      identifier: insertSteps2
                      steps: <+input>

```
Now when we will run the pipeline the execution will look like:-

![](./static/without_insertion_inject_block.png)

If you will check the compiled YAML it will show the steps input as empty and thus will not fail the pipeline as well with a null error. 

:::info note
1. Insert block can not be output of any step, it has to be provided.
2. Nested insert blocks are not allowed.
:::

## Expressions

If we intend to utilize expressions for the properties within the insert, it will be necessary to specify the complete path for each one.

Example: `<+execution.steps.insert1.steps.ShellScript_1.description>`

## RBAC required 

* Users must possess the **Template Create/Edit** Permission in order to insert an insert block into the template at any desired location.
* In order to provide the steps/stages input to insert block when specifying runtime inputs in the pipeline, users must have **Pipeline Create/Edit** Permission. Otherwise, if they intend to provide input values in the parent template, **Template Create/Edit** Permission will be required.