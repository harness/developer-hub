
Output variables expose values for use by other steps or stages in the pipeline.

<details>
<summary>YAML example: Output variable</summary>

In the following YAML example, step `alpha` exports an output variable called `myVar`, and then step `beta` references that output variable.

```yaml
              - step:
                  type: Run
                  name: alpha
                  identifier: alpha
                  spec:
                    shell: Sh
                    command: export myVar=varValue
                    outputVariables:
                      - name: myVar
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo <+steps.alpha.output.outputVariables.myVar>
                      echo <+execution.steps.alpha.output.outputVariables.myVar>
```

</details>

:::caution

If an output variable value contains a secret, be aware that the secret will be visible in the [build details](/docs/continuous-integration/use-ci/viewing-builds.md):

*  On the **Output** tab of the step where the output variable originates.
*  In the build logs for any later steps that reference that variable.

For information about best practices for using secrets in pipelines, go to the [Secrets documentation](/docs/category/secrets).

:::

#### Create an output variable

To create an output variable, do the following in the step where the output variable originates:

1. In the **Command** field, export the output variable. For example, the following command exports a variable called `myVar` with a value of `varValue`:

   ```
   export myVar=varValue
   ```

2. In the step's **Output Variables**, declare the variable name, such as `myVar`.

#### Reference an output variable

To reference an output variable in a later step or stage in the same pipeline, use a variable [expression](/docs/platform/references/runtime-inputs/#expressions) that includes the originating step's ID and the variable's name.

Use either of the following expressions to reference an output variable in another step in the same stage:

```
<+steps.[stepID].output.outputVariables.[varName]>
<+execution.steps.[stepID].output.outputVariables.[varName]>
```

Use either of the following expressions to reference an output variable in a different stage than the one where it originated:

```
<+stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
<+pipeline.stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
```

<figure>

![](../use-ci/run-ci-scripts/static/run-step-output-variable-example.png)

<figcaption>To reference an output variable, the variable expression must include the originating step's ID and the variable's name.</figcaption>
</figure>

<details>
<summary>Early access feature: Output variables as environment variables</summary>

:::note

Currently, this [early access feature](/release-notes/early-access) is behind the feature flag `CI_OUTPUT_VARIABLES_AS_ENV`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

With this feature flag enabled, output variables from steps are automatically available as environment variables for other steps in the same Build (`CI`) stage. This means that, if you have a Build stage with three steps, an output variable produced from step one is automatically available as an environment variable for steps two and three.

In other steps in the same stage, you can refer to the output variable by its key without additional identification. For example, an output variable called `MY_VAR` can be referenced later as simply `$MY_VAR`. Without this feature flag enabled, you must use an expression to [reference the output variable](#reference-an-output-variable), such as `<+steps.stepID.output.outputVariables.MY_VAR>`.

With or without this feature flag, you must use an expression when referencing output variables across stages, for example:

```
name: <+stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
name: <+pipeline.stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
```

<details>
<summary>YAML examples: Referencing output variables</summary>

In the following YAML example, a step called `alpha` exports an output variable called `myVar`, and then a step called `beta` references that output variable. Both steps are in the same stage.

```yaml
              - step:
                  type: Run
                  name: alpha
                  identifier: alpha
                  spec:
                    shell: Sh
                    command: export myVar=varValue
                    outputVariables:
                      - name: myVar
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo $myVar
```

The following YAML example has two stages. In the first stage, a step called `alpha` exports an output variable called `myVar`, and then, in the second stage, a step called `beta` references that output variable.

```yaml
    - stage:
        name: stage1
        identifier: stage1
        type: CI
        spec:
          ...
          execution:
            steps:
              - step:
                  type: Run
                  name: alpha
                  identifier: alpha
                  spec:
                    shell: Sh
                    command: export myVar=varValue
                    outputVariables:
                      - name: myVar
    - stage:
        name: stage2
        identifier: stage2
        type: CI
        spec:
          ...
          execution:
            steps:
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo <+stages.stage1.spec.execution.steps.alpha.output.outputVariables.myVar>
```

</details>

If multiple variables have the same name, variables are chosen according to the following hierarchy:

1. Environment variables defined in the current step
2. Output variables from previous steps
3. Stage variables
4. Pipeline variables

This means that Harness looks for the referenced variable within the current step, then it looks at previous steps in the same stage, and then checks the stage variables, and, finally, it checks the pipeline variables. It stops when it finds a match.

If multiple output variables from previous steps have the same name, the last-produced variable takes priority. For example, assume a stage has three steps, and steps one and two both produce output variables called `NAME`. If step three calls `NAME`, the value of `NAME` from step two is pulled into step three because that is last-produced instance of the `NAME` variable.

:::caution Unpredictability with parallelism

For stages that use [looping strategies](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/), particularly parallelism, the last-produced instance of a variable can differ between runs. Depending on how quickly the parallel steps execute during each run, the last step to finish might not always be the same.

:::

To avoid conflicts with same-name variables, either make sure your variables have unique names or use an expression to specify a particular instance of a variable, for example:

```
name: <+steps.stepID.output.outputVariables.MY_VAR>
name: <+execution.steps.stepGroupID.steps.stepID.output.outputVariables.MY_VAR>
```

<details>
<summary>YAML examples: Variables with the same name</summary>

In the following YAML example, step `alpha` and `zeta` both export output variables called `myVar`. When the last step, `beta`, references `myVar`, it gets the value assigned in `zeta` because that was the most recent instance of `myVar`.

```yaml
              - step:
                  type: Run
                  name: alpha
                  identifier: alpha
                  spec:
                    shell: Sh
                    command: export myVar=varValue1
                    outputVariables:
                      - name: myVar
              - step:
                  type: Run
                  name: zeta
                  identifier: zeta
                  spec:
                    shell: Sh
                    command: export myVar=varValue2
                    outputVariables:
                      - name: myVar
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo $myVar
```

The following YAML example is the same as the previous example except that step `beta` uses an expression to call the value of `myVar` from step `alpha`.

```yaml
              - step:
                  type: Run
                  name: alpha
                  identifier: alpha
                  spec:
                    shell: Sh
                    command: export myVar=varValue1
                    outputVariables:
                      - name: myVar
              - step:
                  type: Run
                  name: zeta
                  identifier: zeta
                  spec:
                    shell: Sh
                    command: export myVar=varValue2
                    outputVariables:
                      - name: myVar
              - step:
                  type: Run
                  name: beta
                  identifier: beta
                  spec:
                    shell: Sh
                    command: |-
                      echo <+steps.alpha.output.outputVariables.myVar>
```

</details>

</details>
