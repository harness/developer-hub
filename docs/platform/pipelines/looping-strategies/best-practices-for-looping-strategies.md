---
title: Looping strategy best practices
sidebar_label: Looping Strategy Best Practices
description: Recommended practices for implementing looping strategies in production pipelines, and what fails when teams skip them.
keywords:
  - looping strategies
  - matrix strategy
  - parallelism
  - repeat strategy
  - maxConcurrency
  - pipeline resources
  - best practices
tags:
  - pipelines
  - looping-strategies
  - best-practices
sidebar_position: 20
helpdocs_topic_id: q7i0saqgw4
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/pipelines/best-practices-for-looping-strategies
  - /docs/platform/pipelines/looping-strategies/when-conditions-inside-looping-strategies
---

This topic covers Harness’s recommended best practices for looping strategies in production pipelines and highlights common failure points when those practices are overlooked. Apply these recommendations before scaling matrix dimensions, increasing parallelism, or nesting looping strategies.

Go to <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping strategies</a> to understand how matrix, parallelism, and repeat strategies work.

---

## Plan resource requirements before implementing complex looping strategies

Complex looping scenarios (multi-dimensional matrices, multi-layered matrices at both stage and step levels, or multiple looping strategies in the same stage) can fail, time out, over-consume resources, or run "successfully" but with incorrect results if you do not calculate resource requirements upfront.

- **Calculate resource consumption before implementing:** Determine the maximum CPU and memory required at any point in the stage, accounting for compounding effects. If there are too many concurrent stages or steps and the pipeline's resources are exhausted, the pipeline fails or times out midway.
- **Rule of thumb:** If you cannot visualize how the looping strategy will run and calculate the memory and CPU required, your scenario is too complex. Simplify the dimensions, add `maxConcurrency` limits, or split the work across multiple stages.

**Resource calculation example:**

When a pipeline requests resources for a stage, it reserves the maximum CPU and memory required at any point in the stage.

1. Assume you have a Build stage with three steps. The first step builds an artifact for a web app. The second step runs the artifact in a browser to confirm that it runs. The third step pushes it to a registry. Each step consumes up to 500Mi (memory) and 400m (CPU).

  <div align="center"><DocImage path={require('./static/best-practices-for-looping-strategies-06.png')} alt="Build stage with three sequential steps: build, test, push" width="60%" /></div>

2. If the steps run serially, the pipeline reserves 500Mi memory and 400m CPU for the entire stage (the maximum at any one time).

3. If you want to test the app on both Chrome and Firefox, you can apply a matrix strategy to the second step:

  <details>
  <summary>YAML example</summary>

  ```yaml
  matrix:
    browser: [chrome, firefox]
    maxConcurrency: 2
  ```

  </details>

4. Now the pipeline creates two copies of the second step and runs them concurrently. This doubles the resource consumption at that point in the stage. The pipeline reserves double the resources (1000Mi memory, 800m CPU) to meet the new maximum requirement.

<div align="center"><DocImage path={require('./static/best-practices-for-looping-strategies-07.png')} alt="Build stage with matrix strategy on test step creating two concurrent instances" width="60%" /></div>

5. If you expand the matrix strategy to include another browser and a dimension to test on different operating systems, and you run all the tests (nine instances) at once:

  <details>
  <summary>YAML example</summary>

  ```yaml
  matrix:
    os: [macos, linux, android]
    browser: [chrome, firefox, opera]
    maxConcurrency: 9
  ```

  </details>

6. In this case, the stage requires nine times the original resources to run. The pipeline will likely fail due to insufficient resources to run these nine instances concurrently.

**Why this matters:** If you do not calculate resource requirements before implementing complex looping strategies, the pipeline can fail midway, time out, or silently queue instances until the pipeline aborts. For more information, refer to <a href="/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits" target="_blank" rel="noopener noreferrer">Resource allocation</a>.

**Consequence:** If you do not use `maxConcurrency` to limit concurrent instances, the pipeline can exhaust cluster capacity, fail resource allocation, or queue indefinitely until the pipeline aborts.

---

## Calculate maxConcurrency iteratively starting with low values

Use an iterative workflow to determine the ideal `maxConcurrency` for a specific stage or step, because infrastructure capacity and workload vary across environments and teams.

- **Start low:** Begin with a low `maxConcurrency` value of 2 or 3, run the pipeline, and monitor resource consumption.
- **Increase gradually:** Increase the `maxConcurrency` based on each successive run until you reach a balance between total run time and resource consumption.
- **Do not guess high:** If you set `maxConcurrency` too high without testing, the pipeline can fail midway or queue instances until the pipeline times out, wasting execution time and resources.

**Why this matters:** An untested `maxConcurrency` value can either bottleneck your pipeline (too low) or overload your infrastructure (too high). Iterative testing finds the sweet spot for your specific workload and cluster capacity.

---

## Use split() method to loop over comma-separated variable lists

When you need to loop over a list of items stored in a single variable, use the `split()` method to convert the comma-separated string into an array that looping strategies can iterate over.

- **Store lists in string variables:** Create a Harness string variable containing a comma-separated list (for example, `HD-29193,HD-29194,HD-29195`). For more information, refer to <a href="/docs/platform/variables-and-expressions/expression-v2" target="_blank" rel="noopener noreferrer">Create Harness string variable</a>.
- **Split at runtime:** Use the expression `<+pipeline.variables.jiraTickets.split(',')>` in your looping strategy to split the string into an array:

<details>
<summary>YAML example</summary>

```yaml
repeat:
  items: <+pipeline.variables.jiraTickets.split(',')>
```

```yaml
matrix:
  jira: <+stage.variables.jiraTickets.split(',')>
```

</details>

- **Reference values in steps:** Use `<+repeat.item>` (for repeat strategies) or `<+matrix.jira>` (for matrix strategies) to reference each value in the loop.

**Why this matters:** If you do not use `split()` and instead pass the entire string to the looping strategy, the pipeline treats the entire string as a single item and runs the loop only once, defeating the purpose of looping. For more information, refer to <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness variable expressions</a>.

---

## Using when conditions with looping strategies

Your looping strategies can include `when` conditions that apply to the looping strategy logic, and your pipeline can include <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">conditional executions</a>, which are `when` conditions that determine whether to run a particular stage, step, or step group.

It is important to understand where to use each type of `when` condition and how they impact pipeline execution.

Use <a href="#when-condition-in-looping-strategy">when conditions in looping strategies</a> to evaluate whether to **create instances of a stage or step**. For example:

- You sometimes want to skip the looping strategy. For example, in a unified deployment pipeline, you might skip a matrix applied to a `prod` deployment stage when the pipeline is not running against the `prod` environment.
- You do not always need to run a stage or step for every item in a matrix.
- Your looping strategy is populated by variable input, and you want to skip it if it resolves to empty.

Use <a href="#conditional-execution-with-looping-strategy">conditional executions with looping strategies</a> to evaluate whether to **run a stage, step, or step group that was generated from a looping strategy**. For example:

- Only run stages generated from a looping strategy if they run in a particular deployment environment.

You can also use <a href="#combination-of-conditional-execution-and-looping-strategy-when-condition">both conditional executions and looping strategy when conditions</a> for multi-dimensional evaluation, and you can use <a href="#expressions-in-when-conditions">expressions in when conditions</a>.

### Conditional execution with looping strategy

Conditional executions determine whether a stage, step, or step group should run. If you add a conditional execution to a stage or step with a looping strategy, the conditional execution is evaluated for every instance created by the looping strategy.

In this example, the stage has a matrix looping strategy and a conditional execution. When the pipeline runs, multiple stage instances are created by the matrix looping strategy (one for each item in the `jdk` list), and then Harness checks the stage's conditional execution against each instance created by the matrix.

<details>
<summary>YAML example</summary>

```yaml
    - stage:
        name: custom_stage_conditional_execution
        identifier: custom_stage_conditional_execution
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
                        script: |
                          echo hey
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        strategy:
          matrix:
            jdk:
              - "18"
              - "17"
              - "16"
              - "15"
              - "14"
              - "13"
              - "12"
              - "11"
              - "10"
              - "9"
        when:
          pipelineStatus: Success
          condition: "false"
```

</details>

In this example, the conditional execution is hardcoded to resolve to false, so every stage is skipped.

<div align="center"><DocImage path={require('./static/conditional_vs_when.png')} alt="Pipeline execution showing all stages skipped because conditional execution evaluates to false" width="70%" /></div>

### When condition in looping strategy

In this example, the matrix looping strategy is modified by a `when` condition:

<details>
<summary>YAML example</summary>

```yaml
        strategy:
          when: <+pipeline.name> == "looping_strategy_when"
          matrix:
            jdk:
              - "18"
              - "17"
              - ...
```

</details>

In this example, when the pipeline runs, Harness checks the matrix strategy's `when` condition before creating each instance in the matrix. If the condition is met, Harness creates an instance for that item in the matrix. If the condition is not met, Harness does not create an instance for that item. This evaluation is repeated for each item in the matrix.

<details>
<summary>YAML example</summary>

```yaml
    - stage:
        name: custom_stage_when_condition
        identifier: custom_stage_conditional_execution
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
                        script: |
                          echo hey
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        strategy:
          when: <+pipeline.name> == "looping_strategy_when"
          matrix:
            jdk:
              - "18"
              - "17"
              - "16"
              - "15"
              - "14"
              - "13"
              - "12"
              - "11"
              - "10"
              - "9"
```

</details>

In this example, the `when` condition checks if the pipeline name is `looping_strategy_when`. Since that is not the name of this example pipeline, no stages are created from the matrix.

<div align="center"><DocImage path={require('./static/conditional_vs_when2.png')} alt="Pipeline execution showing no stages created because when condition evaluates to false" width="60%" /></div>

### Combination of conditional execution and looping strategy when condition

You can also use both conditional executions and looping strategy `when` conditions.

When you use both, Harness first evaluates the looping strategy `when` condition to determine how many instances to create from the looping strategy, based on how many items pass the `when` condition. Then Harness checks each created instance against the conditional execution to determine whether to run each created instance.

Here is an example that uses both. In this example, the matrix looping strategy has a `when` condition that checks if the pipeline name is `looping_strategy_when`. Then, the stage has a conditional execution that checks if the pipeline has executed successfully so far and that the environment name is not `QA`.

<details>
<summary>YAML example</summary>

```yaml
pipeline:
  name: looping_strategy_when
  identifier: looping_strategy_when
  tags: {}
  projectIdentifier: fdsf
  orgIdentifier: default
  stages:
    - stage:
        name: sA
        identifier: sA
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
                        script: echo hey
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        strategy:
          when: <+pipeline.name> == "looping_strategy_when"
          matrix:
            jdk:
              - "18"
              - "17"
              - "16"
              - "15"
              - "14"
              - "13"
              - "12"
              - "11"
              - "10"
              - "9"
        when:
          pipelineStatus: Success
          condition: <+environment.name> != "QA"
  allowStageExecutions: true
```

</details>

When this pipeline runs:

1. Harness checks the looping strategy `when` condition and creates a stage instance for each item in the matrix that passes the condition. In this example, the condition checks that the pipeline name is `looping_strategy_when`. Since that is the pipeline's name, all items in the matrix pass the check and Harness creates a stage for each.
2. Harness checks each created stage instance against the conditional execution to determine whether to run each stage. In this example, the stage runs if the pipeline has executed successfully so far and the environment name is not `QA`. Assuming this pipeline is run for the `prod` environment and no prior stages failed, then all the stage instances in the matrix will run.

### Expressions in when conditions

You can use Harness and JEXL expressions in your `when` conditions, conditional executions, and your looping strategies.

This example reflects a complex use case that involves <a href="/docs/platform/pipelines/pipeline-chaining" target="_blank" rel="noopener noreferrer">pipeline chaining</a>. The previous pipeline in the series of chained pipelines produces an output variable called `number_of_services` that indicates how many services were deployed by that prior pipeline. It also produces a list of the deployed services (stored in `deployed_services`), if any.

The matrix strategy uses the value of the `number_of_services` variable in a `when` condition to determine whether to trigger the matrix strategy in the chained pipeline. If no services (0) were deployed, then the chained pipeline skips the matrix strategy. If at least one service (greater than 0) was deployed, then it executes a matrix strategy that iterates over the list of deployed services (generating one instance per deployed service).

<details>
<summary>YAML example</summary>

```yaml
        strategy:
          when: <+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.output.outputVariables.number_of_services> > 0
          matrix:
            service: <+json.list("services", <+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.output.outputVariables.deployed_services>)>
            maxConcurrency: 4
```

</details>

The above example shows expressions in a `when` condition in a looping strategy. For information about expressions in conditional execution, go to <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Define conditional executions for stages and steps</a>.

---

## Use onFailure field to control iteration behavior after failures

When one iteration of a matrix or repeat strategy fails, use the `onFailure` field to control whether remaining iterations continue or abort, because the default behavior (abort) can waste resources if you want independent iterations to complete regardless of individual failures.

- **Set `onFailure: ignore` for independent iterations:** If iterations are independent (for example, testing different browsers), use `onFailure: ignore` to continue testing remaining combinations even if one fails. This gives you complete test coverage rather than aborting early.
- **Set `onFailure: abort` for dependent iterations:** If iterations are dependent (for example, building artifacts that later stages consume), use `onFailure: abort` to stop building remaining versions if one fails, saving execution time and resources.
- **Not applicable to parallelism:** The `onFailure` field is only available for `matrix` and `repeat` strategies. Parallelism runs all instances independently and does not support this field.

<details>
<summary>YAML example</summary>

```yaml
matrix:
  browser: [chrome, firefox, safari]
  os: [windows, mac, linux]
  maxConcurrency: 3
  onFailure: ignore  # Continue testing other combinations even if one fails
```

```yaml
repeat:
  items: ["v18", "v17", "v16"]
  onFailure: abort  # Stop building remaining versions if one fails
```

</details>

**Why this matters:** If you do not set `onFailure` appropriately, independent test iterations can abort early (missing failures in untested combinations), or dependent build iterations can continue after a critical failure (wasting resources building artifacts you cannot use). For more information, refer to <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism#control-iteration-behavior-after-a-failure" target="_blank" rel="noopener noreferrer">Control iteration behavior after a failure</a>.

---

## Next steps

Adopt the practices above as defaults, then layer in looping strategy expressions and runtime input to build flexible, production-ready pipelines.

- <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping strategies</a>: Understand how matrix, parallelism, and repeat strategies work.
- <a href="/docs/platform/pipelines/looping-strategies/additional-matrix-examples" target="_blank" rel="noopener noreferrer">Matrix examples</a>: Review complete matrix strategy examples.
- <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Conditional executions for stages and steps</a>: Control when stages and steps run based on pipeline status and JEXL conditions.
