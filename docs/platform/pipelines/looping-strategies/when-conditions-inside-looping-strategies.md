---
title: Using when conditions inside looping strategy
description: Run conditional execution inside looping strategy
sidebar_position: 3
---

## Introduction
You can use conditional execution inside [looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism.md) by providing `when` keyword inside your strategy. 

Some scenarios where you might want to use the ``when`` condition in your pipeline:

1. When you want to skip certain elements in the looping strategy.
2. When you prefer not to execute the looping strategy at all.
3. When you want to bypass matrix/repeat/parallelism if it's empty.

Let's cover few examples and scenerio explaining the usage of ``when`` condition:-

1. For example, you have matrix with 10 elements in your pipeline and you want to run a particular ith element after it satisfies a particular condition:
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
          condition: <+strategy.iteration> == 2
  allowStageExecutions: true
```
Let's discuss how this YAML is going to get evaluated and what will be the expected output:-
1. First, it will check whether ``when: <+pipeline.name> == "looping_strategy_when"`` is true, if it's true then only it will move forward to run the looping strategy else it will get skipped. 
![](./static/looping_stretegy_when_conditions.png)
2. Second, if we have a stage level conditional execution as provided in the above example:-
```yaml
 when:
        pipelineStatus: Success
        condition: <+strategy.iteration> == 2
```
Here, after the first ``when: <<+pipeline.name> == "looping_strategy_when"`` condition is evaluated then only it will evaluate the stage level condition.


To summarize, the above yaml will first check if the pipeline name matches ``looping_strategy_when`` and if it does i.e if the status is ``Success`` upto this point it will run the 2nd element of the matrix. 
![](./static/looping_strategy_when.png)

2. Let's consider an example where it will skip to run looping strategy:-
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
          when: <+pipeline.name> == "feat1"
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
          condition: <+strategy.iteration> == 2
  allowStageExecutions: true
```
In this example, the pipeline name doesn't matches as ``feat1`` therefore it will skip to run the looping strategy in this case ``matrix`` and move forward to run the rest of the pipeline. 
![](./static/looping_condition_when_skipped.png)

