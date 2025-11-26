---
title: Add tags dynamically to an execution 
description: This page illustrates how to add tags dynamically to an execution.
sidebar_position: 35
tags: 
- dynamic-tags
- runtime-tags
- execution-tags
- addTag
- addTagsList
- add-execution-tags
- dynamic-execution-tags
- dynamic-pipeline-tags
- pipeline-tags
- add-tags-dynamically-to-execution
- add-tags-dynamically-to-pipeline
- add-tags-dynamically
- add-tags-dynamically-to-pipeline-execution
---

## Overview

Harness supports dynamic tagging of pipeline executions, enabling you to attach contextual metadata as tags during runtime. These tags become part of the execution record and can be used with Harness’s standard tag-based search and filters to quickly locate specific runs.

In real delivery workflows, critical information such as artifact versions, environment details, matrix dimensions, or dynamically generated configuration values often emerges only at runtime, not when the pipeline is authored. Dynamic tags allow you to capture this real-time context directly on the execution, giving you a richer, more accurate history of what was deployed, where, and under what conditions. This makes debugging, auditing, compliance checks, and operational insights significantly easier and more reliable.

<DocImage path={require('./static/add-tags-dynamically-overview.png')}  title="Click to view full size image" /> 

### Expressions to add tags dynamically

The following expressions enable Harness to add tags dynamically to an execution:

| Expression | Description |
| --- | --- |
| `<+addTag(name, value)>` | attaches a single key-value tag to the execution at the moment the expression is evaluated. |
| `<+addTagsList(listOfPairs)>` | attaches a list of tags to the execution at the moment the expression is evaluated. |

Tags are not added to the pipeline definition. It exists only on the specific execution.

### Limitations Inside Shell Script Steps

These expressions cannot be invoked within a loop inside a Shell Script step.
This is because all expressions are evaluated before the Shell Script step begins execution. Therefore, a loop in a script cannot call addTag multiple times and you cannot generate tag values inside the same script and immediately attach them.

If your workflow requires generating multiple tags in a script, use the following pattern instead:

- Generate a list of tags inside a script and export it as an output variable.

<DocImage path={require('./static/add-tags-list-pipeline.png')} title="Click to view full size image" /> 

<details>
  <summary> Sample yaml for Generate Tags Shell Script Step </summary>

```yaml title="Generate Tags Step (Shell Script)"

            - step:
                  type: ShellScript
                  name: Generate Tags
                  identifier: ShellScript_3
                  spec:
                    shell: Bash
                    executionTarget: {}
                    source:
                      type: Inline
                      spec:
                        script: |-
                          #!/bin/bash

                          # Define tag keys and values (use empty string "" for blank values)
                          keys=("environment" "service" "g" "version" "region" "description")
                          values=("production" "payment-service" "" <+stage.variables.version> "us-east-1" "")

                          # Generate tags JSON
                          TAGS_JSON="["

                          for i in "${!keys[@]}"; do
                            if [ $i -gt 0 ]; then
                              TAGS_JSON+=","
                            fi
                            TAGS_JSON+="{\"key\":\"${keys[$i]}\",\"value\":\"${values[$i]}\"}"
                          done
                          TAGS_JSON+="]"
                          export EXECUTION_TAGS_LIST="$TAGS_JSON"
                          echo "Generated tags: $EXECUTION_TAGS_LIST"

                          json_output="["

                          # Generate 100 stack-branch combinations
                          for i in $(seq 0 900); do
                            if [ $i -gt 0 ]; then
                              json_output+=","
                            fi
                            stack="stack$i"
                            # Random-looking branch name using modulo logic
                            branch="branch$((i % 5 + 1))"  # branch1 to branch5
                            json_output+="{\"key\":\"$stack\",\"value\":\"$branch\"}"

                          done

                          # TAGS_JSON+=""
                          json_output+="]"

                          # Export for use in pipeline
                          export EXECUTION_TAGS_LONG_LIST="$json_output"

                          echo "Generated tags: $EXECUTION_TAGS_LONG_LIST"
                    environmentVariables: []
                    outputVariables:
                      - name: EXECUTION_TAGS_LIST
                        type: String
                        value: EXECUTION_TAGS_LIST
                      - name: EXECUTION_TAGS_LONG_LIST
                        type: String
                        value: EXECUTION_TAGS_LONG_LIST
                  timeout: 10m

```
</details>

- Use `<+addTagsList(listOfPairs)>` in the next step to attach them.

<details>
<summary> Sample yaml for Add Tags List Shell Script Step </summary>

```yaml title="Add Tags List Step"

        - step:
                  type: ShellScript
                  name: Add Tags
                  identifier: ShellScript_2
                  spec:
                    shell: Bash
                    executionTarget: {}
                    source:
                      type: Inline
                      spec:
                        script: |
                          echo <+executionTags.addTagsList(<+pipeline.stages.shell.spec.execution.steps.ShellScript_3.output.outputVariables.EXECUTION_TAGS_LIST>)>     
                          echo <+executionTags.addTagsList(<+pipeline.stages.shell.spec.execution.steps.ShellScript_3.output.outputVariables.EXECUTION_TAGS_LONG_LIST>)>
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m

```

</details>

### Adding tags dynamically with Matrix Looping Strategy

You can use the expression `<+addTag(name, value)>` with matrix looping strategy to add tags iteratively to an execution.

<DocImage path={require('./static/add-tags-with-matrix.png')} title="Click to view full size image" /> 

The step to add tags dynamically with matrix looping strategy will look like this:

<DocImage path={require('./static/add-add-tag-looping-script.png')} title="Click to view full size image" /> 

Please refer to the sample pipeline yaml provided below for more insights on how to add tags dynamically with matrix looping strategy:

<details>
<summary> Sample Pipeline Yaml for Generating Tags and Adding Tags dynamically with Matrix Looping Strategy </summary>

```yaml title="Pipeline Yaml for Generating Tags and Adding Tags dynamically with Matrix Looping Strategy"

pipeline:
  name: tags matrix
  identifier: tags_matrix
  tags: {}
  projectIdentifier: siddhant_playground
  orgIdentifier: default
  stages:
    - stage:
        name: Generate Tags
        identifier: shell
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
                        script: |-
                          export out="out"

                          json_output="{\"service\":["

                          # Generate 100 stack-branch combinations
                          for i in $(seq 1 10); do
                            stack="stack$i"
                            # Random-looking branch name using modulo logic
                            branch="branch$((i % 5 + 1))"  # branch1 to branch5
                            json_output+="{\"stack\":\"$stack\",\"branch\":\"$branch\"},"

                          done
                          # Remove the trailing comma and close the array
                          export json_output="${json_output%,}]}"

                          # Export as a string variable
                          echo "Exporting service output..."
                          echo "service=$json_output"
                          export service="$json_output"
                    environmentVariables: []
                    outputVariables:
                      - name: out
                        type: String
                        value: out
                      - name: service
                        type: String
                        value: service
                      - name: json_output
                        type: String
                        value: json_output
                  timeout: 10m
        tags: {}
    - stage:
        name: Add Tag
        identifier: poll
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
                          echo "stack is <+matrix.service.stack>"
                          echo "branch is <+matrix.service.branch>"
                          echo <+executionTags.addTag(<+matrix.service.stack>,<+matrix.service.branch>)>
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        strategy:
          matrix:
            nodeName: <+matrix.service.stack>_<+matrix.service.branch>
            service: <+json.list("service", <+pipeline.stages.shell.spec.execution.steps.ShellScript_1.output.outputVariables.json_output>)>
            maxConcurrency: 100
        when:
          pipelineStatus: All

```

</details>

### More on Tags

You can find more on structure of tags and how to assign metadata using them in Harness [here](/docs/platform/tags/).