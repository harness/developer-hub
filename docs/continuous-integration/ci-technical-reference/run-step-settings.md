---
title: CI Run step settings
description: This topic describes settings for the CI Run step.
sidebar_position: 50
helpdocs_topic_id: 1i1ttvftm4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use a CI **Run** step to run scripts and commands in Build stages in CI pipelines. This topic describes settings for the **Run** step. For instructions and examples for including **Run** steps in CI pipelines, go to [Run a script in a Build stage](../use-ci/run-ci-scripts/run-a-script-in-a-ci-stage.md).

:::info

Depending on the stage's build infrastructure, some settings may be unavailable or optional.

:::

## Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Description

Optional text string describing the step's purpose.

## Container Registry and Image

The **Container Registry** is a Harness container registry connector for the image that you want Harness to run build commands on, such as DockerHub.

The **Image** is the FQN (fully-qualified name) or artifact name of the Docker image to use when this step runs commands, for example `us.gcr.io/playground-123/quickstart-image`. The image name should include the tag. If you don't include a tag, Harness uses the latest tag.

You can use any Docker image from any Docker registry, including Docker images from private registries. Different container registries require different name formats:

* **Docker Registry:** Input the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards aren't supported. FQN is required for images in private container registries.
* **ECR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.
* **GCR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path starting with the project ID that the artifact is in, for example: `us.gcr.io/playground-243019/quickstart-image:latest`.

   ![](./static/run-step-settings-03.png)

:::info

The stage's build infrastructure determines whether these fields are required or optional:

* [Kubernetes cluster build infrastructure](../use-ci/set-up-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Local runner build infrastructure](../use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Self-hosted cloud provider VM build infrastructure](/docs/category/set-up-vm-build-infrastructures): **Run** steps can use binaries that you've made available on your build VMs. The **Container Registry** and **Image** are required if the VM doesn't have the necessary binaries. These fields are located under **Optional Configuration** for stages that use self-hosted VM build infrastructure.
* [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md): **Run** steps can use binaries available on Harness Cloud machines, as described in the [image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). The **Container Registry** and **Image** are required if the machine doesn't have the binary you need. These fields are located under **Optional Configuration** for stages that use Harness Cloud build infrastructure.

:::

## Shell

Select the shell script type. If a Run step includes commands that aren't supported for the selected shell type, the build fails.

You can run PowerShell Core (`pwsh`) commands in pods or containers that have `pwsh` installed. You can run PowerShell commands on Windows VMs running in AWS build farms.

## Command

[POSIX](https://www.grymoire.com/Unix/Sh.html) shell script executed inside the container.

The script is invoked as if it were the container's entry point.

:::tip

You can reference services started in [Background steps](./background-step-settings.md) by using the Background step's **Id** in your Run step's **Command**. For example, a `curl` command could call `[backgroundStepId]:5000` where it might otherwise call `localhost:5000`.

![The Background step ID, pythonscript, is used in a curl command in a Run step.](./static/background-step-settings-call-id-in-other-step.png)

:::

## Optional Configuration

Use the following settings to add additional configuration to the step. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

### Privileged

Enable this option to run the container with escalated privileges. This is equivalent to running a container with the Docker `--privileged` flag.

### Report Paths

The path to the file(s) that store test results in the JUnit XML format. You can add multiple paths. [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported.

This setting is required for the Run step to be able to publish test results.

### Environment Variables

You can inject environment variables into a container and use them in the **Command** script. You must input a **Name** and **Value** for each variable.

You can reference environment variables in the **Command** script by their name. For example, a Bash script would use `$var_name` or `${var_name}`, and a Windows PowerShell script would use `$Env:varName`.

Variable values can be [Fixed Values, Runtime Inputs, and Expressions](/docs/platform/20_References/runtime-inputs.md). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline. Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change the value type.

![](./static/run-step-settings-04.png)

For more information, go to the [Built-in Harness Variables Reference](../../platform/12_Variables-and-Expressions/harness-variables.md).

### Output Variables

Output variables expose values for use by other steps or stages in the pipeline.

To create an output variable, do the following in the step where the output variable originates:

1. In the **Command** field, export the output variable. For example, the following command exports a variable called `myVar` with a value of `varValue`:

   ```
   export myVar=varValue
   ```

2. In the step's **Output Variables**, declare the variable name, such as `myVar`.

To call a previously-exported output variable in a later step or stage in the same pipeline, use a variable expression that includes the originating step's ID and the variable name.

<!-- ![](./static/run-step-output-variable-example.png) -->

<docimage path={require('./static/run-step-output-variable-example.png')} />

To reference an output variable in another step in the same stage, use either of the following expressions:

```
<+steps.[stepID].output.outputVariables.[varName]>
<+execution.steps.[stepID].output.outputVariables.[varName]>
```

To reference an output variable in a different stage than the one where it originated, use either of the following expressions:

```
<+stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
<+pipeline.stages.[stageID].spec.execution.steps.[stepID].output.outputVariables.[varName]>
```

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

<!--<details>
<summary>Export output variables to stage or pipeline variables</summary>

You can also export step output variables to stage/pipeline environment variables, because they are available through the pipeline.

For example, if a step exported an output variable called `BUILD_NUM`, you could use the following syntax to reference this variable later in the pipeline:

```
<+pipeline.stages.[stageID].variables.BUILD_NUM>
```

</details>-->

### Image Pull Policy

Select an option to set the pull policy for the image.

* **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: The image is pulled only if it is not already present locally.
* **Never**: The image is assumed to exist locally. No attempt is made to pull the image.

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

Maximum resources limits for the resources used by the container at runtime:

* **Limit Memory:** Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number with the suffixes `G` or `M`. You can also use the power-of-two equivalents, `Gi` or `Mi`. Do not include spaces when entering a fixed value. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
