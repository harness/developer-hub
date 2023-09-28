---
title: Additional matrix examples
description: Specific examples for matrix.
sidebar_position: 4
---

This topic provides various examples of using matrix in your pipeline stages or steps.

For detailed information on using matrix in your pipeline, go to [Run a Stage or Step Multiple Times using a Matrix](../run-a-stage-or-step-multiple-times-using-a-matrix.md)

## Runtime input support in matrix

### Support axis in matrix as the runtime input

To define an axis as runtime input, mark it as `<+input>`.

When you run the pipeline, you are prompted to enter the axis value. You can add it as an array.

#### Define matrix with one axis as a runtime input

Let us look at an example.

If you want to run your test on different versions of Go, the list of different versions will be available at runtime. You can set the axis of the matrix as an input at runtime in this case as : 

```
GoVersion: <+input>
```

The following YAML file shows a sample pipeline in which different versions of Go are defined as runtime inputs:

```yaml
pipeline:
  name: MatrixAxisAsRuntimeInput
  identifier: MatrixAxisAsRuntimeInput
  tags: {}
  stages:
    - stage:
        name: exampleStage
        identifier: exampleStage
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Shell Script_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo "Hello world!"
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
                  failureStrategies: []
                  strategy:
                    matrix:
                      GoVersion: <+input>

```

Here is an example of the sample input set with different versions of Go: 

```yaml
pipeline:
  identifier: MatrixExamples
  stages:
    - stage:
        identifier: exampleStage
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  identifier: ShellScript_1
                  type: ShellScript
                  strategy:
                    GoVersion:
                      - 1.1.0
                      - 1.1.1

```

#### Support a few axes of matrix as runtime inputs

If your matrix has more than one axis, you can set some of them as runtime input.

For example, you want to deploy a matrix of different versions of different images, and for each combination of image and version, you need one deployment tagged `Harness`, and another tagged `Core`. 

```yaml
 strategy:
    matrix:
        image: <+input>
        version: <+input>
        tags:
        - "harness"
        - "core"

```

In this case, tags are fixed inputs, while versions and images are runtime inputs. If there are 2 versions each of 2 images, there are 8 deployments (2 versions * 2 images * 2 tags). 

Here is an example of the pipeline YAML with the matrix definition: 

```yaml
pipeline:
  name: MatrixAxisAsRuntimeInput
  identifier: MatrixAxisAsRuntimeInput
  tags: {}
  stages:
    - stage:
        name: exampleStage
        identifier: exampleStage
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Shell Script_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo "Hello world!"
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
                  failureStrategies: []
                  strategy:
                    matrix:
                      image: <+input>
                      version: <+input>
                      tags:
                       - "harness"
                       - "core"
                      
```
Here is an example of the sample input set: 

```yaml
pipeline:
  identifier: MatrixExamples
  stages:
    - stage:
        identifier: exampleStage
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  identifier: ShellScript_1
                  type: ShellScript
                  strategy:
                    matrix:
                      image:
                        - nginx
                        - ingress
                      version:
                        - latest
                        - 1.2.0

```

:::note
The sample YAML does not have Tags because they are fixed input.
:::


#### Support axis in matrix as an expression
  To support axis as an expression, define a string variable `example` which has a comma-separated list of strings. 
  You can then use the following expression in the axis for matrix: 
  
  ```
  <+pipeline.variables.example>.split(',')
  ```

For example, you approve Jira tickets in parallel that are dynamic and come from either triggers or external systems. In this scenario, mark the variable as 'input' and supply the list of Jira tickets as a comma-separated string in the input YAML.

Here is the sample YAML: 

```yaml
pipeline:
  name: RepeatJiraTickets
  identifier: RepeatJiraTickets
  projectIdentifier: naidusanity
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: approval1
        identifier: approval1
        description: ""
        type: Approval
        spec:
          execution:
            steps:
              - step:
                  type: JiraApproval
                  name: Jira Approval_1
                  identifier: JiraApproval_1
                  spec:
                    connectorRef: abc
                    issueKey: <+matrix.jiraTicket>
                    approvalCriteria:
                      type: KeyValues
                      spec:
                        matchAnyCondition: true
                        conditions:
                          - key: Status
                            operator: equals
                            value: Done
                    rejectionCriteria:
                      type: KeyValues
                      spec:
                        matchAnyCondition: true
                        conditions: []
                  timeout: 1d
                  failureStrategies: []
                  strategy:
                    matrix:
                      jiraTicket: <+pipeline.variables.jiraTickets>.split(',')
        tags: {}
  variables:
    - name: jiraTickets
      type: String
      description: ""
      value: <+input>
```

Here is an example of the sample input set:

```yaml

pipeline:
  identifier: RepeatJiraTickets
  variables:
    - name: jiraTickets
      type: String
      value: cd-1,cd-2,cd-3 // We have added the list of tickets to be comma separated

```
## Provide the axis value of matrix from triggers

To provide the axis value from a trigger, define the axis values which has a comma separated list of strings. 


### Support matrix as runtime input

To mark the full matrix as a runtime input, mark the matrix field as `<+input>`. You can then provide the axis and its values at runtime.

For example, if you need to input the combinations during runtime, mark the matrix as '+input>' and then provide the corresponding values during execution. The executor can then deliver the values as needed.

Here is an example of the sample pipeline: 

```yaml
pipeline:
  name: MatrixAsRuntimeInput
  identifier: MatrixAsRuntimeInput
  tags: {}
  stages:
    - stage:
        name: exampleStage
        identifier: exampleStage
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Shell Script_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo "Hello world!, my name is <+matrix.name>"
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
                  failureStrategies: []
                  strategy:
                    matrix: <+input>
        tags: {}

```
Here is an example of the sample input set: 

```yaml
pipeline:
  identifier: MatrixExamples
  stages:
    - stage:
        identifier: exampleStage
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  identifier: ShellScript_1
                  type: ShellScript
                  strategy:
                    matrix:
                      image:
                        - nginx
                        - ingress

```

## Support complex JSON as an axis in matrix

If you are not sure about the value of an item in a pipeline, you can store it as a JSON string instead. This way, if an object is an output of the previous step, you can use the JSON functor to get a list from that object.
The following example shows how to provide the custom object using JSON functor: 

```yaml
pipeline:
  name: matrix_split
  identifier: matrix_split
  projectIdentifier: naidusanity
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: s2
        identifier: s2
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Shell Script_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: |-
                          echo <+matrix.service.name>
                          echo <+matrix.service.version>
                          echo <+json.list("a", <+pipeline.variables.services>)>
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        strategy:
          matrix:
            service: <+json.list("a", <+pipeline.variables.services>)>
  variables:
    - name: services
      type: String
      description: ""
      value: "{\"a\":[ { \"name\": \"svc1\", \"version\": \"1.0.0\" }, { \"name\": \"svc2\", \"version\": \"1.0.2\" }, { \"name\": \"svc3\", \"version\": \"1.0.1\" } ]}"

```







