---
title: Looping strategies overview -- matrix, repeat, and parallelism
description: Looping strategies enable you to run a Stage or Step multiple times with different inputs. Looping speeds up your pipelines and makes them easier to read and maintain.
# sidebar_position: 2
helpdocs_topic_id: eh4azj73m4
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

Looping strategies enable you to run a Stage or Step multiple times with different inputs. This eliminates the need to copy the same Stage or Step for each variation you need. It also makes the Pipeline more readable, clean, and easy to maintain. Looping strategies enable use cases such as:

* You want to test a UI feature in multiple browsers and platforms. You can define a matrix that specifies the browsers and platforms to test.
* You want to build artifacts for multiple JDK versions in the same Build Stage.
* You have a Build Pipeline with 20 unit tests. To speed up execution, you want to run the tests in parallel across 4 jobs that run 5 tests each.

:::info note

The identifier of the stage or step that has a looping strategy applied is updated each time the stage or step runs, because two stages cannot have the same identifier. To use it in an expression, you must use the updated identifier for that stage.

For example, if a stage named `build` in YAML has a looping strategy applied, the expression `<+pipeline.stages.build.variables>` does not work. Use the updated identifier in your expression, for example, `<+pipeline.stages.build_0.variables>`.

:::

## Looping strategy types

Harness supports the following strategies.

### Matrix

Matrix strategies are highly flexible and applicable for both CD and CI Pipelines.

First you define a matrix of configurations that you want the Stage or Step to run. Each axis has a user-defined tag — `env`, `service`, `platform`, `browser`, `jdk`, etc. — and a list of values. You can use variables such as `<+matrix.jdk>` in a Build and Push Step or `<+matrix.env>` and `<+matrix.service>` in a Deploy Stage.

When a Pipeline runs, it creates multiple copies of the Stage or Step and runs them in parallel. You can use the `exclude` keyword to filter out some combinations. You can also use the `maxConcurrency` keyword to limit the number of parallel runs.

```
matrix:   
  service: [svc1, svc2, svc3]  
  env: [env1, env2]  
  exclude: # don't run [svc1, env1] or [svc3, env3]  
   - service: svc1   
     env: env1   
   - service: svc3   
     env: env2   
  maxConcurrency: 2 # run up to 2 jobs in parallel based on your resources  
# example run:  
# testgroup0 -> testgroup2  
# testgroup1 -> testgroup3
```

By default, Harness uses indexes for the matrix naming strategy. You can also use labels.

To use the matrix labels naming strategy, do the following:

1. In Harness, select **Account Settings**.
2. Select **Account Resources**, then select **Pipeline**.
3. Set **Enable Matrix Labels By Name** to `true`.
4. Select **Save**.

:::info note
 This option is available at the project, organization, and account level.
:::

### Parallelism

Parallelism strategies are useful for CI Build Stages that include a lot of tests. Suppose your Stage includes over 100 tests. You can specify the following to split your tests into 10 groups and test 5 groups at a time.

```
parallelism: 10  
  maxConcurrency: 5  
# example run:  
# testgroup0 -> testgroup5  
# testgroup1 -> testgroup6  
# testgroup2 -> testgroup7  
# testgroup3 -> testgroup8  
# testgroup4 -> testgroup9
```
### Repeat

Repeat strategies are alternative methods for defining Matrix or Parallelism or one-dimensional Matrix strategies.

For example, you can define a Parallelism strategy as follows:

```
repeat:   
  times: 6  
  maxConcurrency: 3  
  
# this is functionally equivalent to  
# parallelism: 6  
#    maxConcurrency: 3
```

You can iterate through a list of values with the keyword `items`. You can then use the variable `<+repeat.item>` to access each value in the list.

```
repeat:   
  items: [ "18", "17", "16", "15", "14", "13", "12", "11", "10", "9" ]  
  maxConcurrency: 5
```

If you opt to use only a `times` repeat, without a list, you can still access the index during the loop. You can use the following expressions:

```
<+strategy.iteration> -> current count starting with 0
<+strategy.iterations> -> total iterations
```
#### Running steps on multiple target hosts

To run steps on multiple target hosts, such as in a CD stage that performs a Deployment Template or SSH/WinRM deployment, you must use the `<+stage.output.hosts>` expression to reference all of the hosts/pods/instances:

```
repeat:  
  items: <+stage.output.hosts>
```
For more information, go to [Run a step on multiple target instances](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/run-a-script-on-multiple-target-instances).

## Looping strategy as a runtime input

Looping strategies can be defined as runtime inputs in pipelines and templates at stage, step, and step group levels.

Here's a video that explains how to define looping strategy as a runtime input:

<!-- Video:
https://harness-24.wistia.com/medias/79nqqvqybt-->
<docvideo src="https://harness-24.wistia.com/medias/79nqqvqybt" />

## Looping strategy expressions

You can use Harness expressions to retrieve the current execution status of the looping strategy for nodes (stages/steps) using a matrix or repeat strategy.
  
The statuses of the nodes (stages/steps) using a looping strategy are `RUNNING`, `FAILED`, `SUCCESS`.

Harness provides the following expressions to retrieve the current status of the node (stage/step) using a looping strategy. The expressions are available in pipelines during execution and rollback.

### <+strategy.currentStatus>

The current status of the looping strategy for the node with maximum depth.

When this expression is used in a step, Harness will resolve it to the looping strategy status of the first parent node (stage/step) of the step using a looping strategy.

If the step using the expression is the first node using a looping strategy, then the expression will resolve to its looping strategy status. 

If the previous step in the stage uses a looping strategy, the expression will resolve to that step's looping strategy status. 

If there are no previous steps using a looping strategy, but the stage uses a looping strategy, the expression will resolve to the stage's looping strategy status.

### <+strategy.node.[strategyNodeIdentifier].currentStatus>

The current status of the looping strategy for the node with a specific stage/step identifier, `strategyNodeIdentifier`.

For example, `echo <+strategy.node.cs1.currentStatus>`.

### <+strategy.node.get("[strategyNodeIdentifier]").currentStatus>

The current status of the looping strategy for the node with a specific stage/step identifier, `strategyNodeIdentifier`.

For example, `echo <+strategy.node.get("ShellScript_1").currentStatus>`.


## See also

* [Best Practices for Looping Strategies](best-practices-for-looping-strategies.md)
* [Run a Stage or Step Multiple Times using a Matrix](run-a-stage-or-step-multiple-times-using-a-matrix.md)
* [Speed Up CI Test Pipelines Using Parallelism](../8_Pipelines/speed-up-ci-test-pipelines-using-parallelism.md)
* [Optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times.md)

