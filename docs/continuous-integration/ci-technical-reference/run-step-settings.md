---
title: CI Run step settings
description: This topic provides settings and permissions for the Harness CI Run step.
sidebar_position: 50
helpdocs_topic_id: 1i1ttvftm4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the Harness CI Run step. In a **Build** stage, the **Run** step can be used to run scripts in your CI pipeline. The **Run** step pulls in a Docker image, such as a Docker image for Maven, and then runs a script with the tool, such as `mvn clean install`. You can use any Docker image from any public or private Docker registry.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Description

Optional text string describing the step's purpose.

## Container Registry

A Harness container registry connector for the image that you want Harness to run build commands on, such as DockerHub.

## Image

The FQN (fully-qualified name) of the Docker image to use when this step runs commands, for example `us.gcr.io/playground-123/quickstart-image`.

The image name should include the tag. If you don't include a tag, Harness uses the latest tag.

You can use any Docker image from any Docker registry, including Docker images from private registries. Different container registries require different name formats:

* **Docker Registry:** Input the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards aren't supported.
* **GCR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `us.gcr.io/playground-123/quickstart-image:latest`.

   ![](./static/run-step-settings-03.png)

* **ECR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.

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

Use the following settings to add additional configuration to the step.

### Privileged

Enable this option to run the container with escalated privileges. This is equivalent to running a container with the Docker `--privileged` flag.

### Report Paths

The path to the file(s) that store test results in the JUnit XML format. You can add multiple paths. [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported.

This setting is required for the Run step to be able to publish test results.

### Environment Variables

You can inject environment variables into a container and use them in the **Command** script. You must input a **Name** and **Value** for each variable.

You can reference environment variables in the **Command** script by their name. For example, a Bash script would use `$var_name` or `${var_name}`, and a Windows PowerShell script would use `$Env:varName`.

Variable values can be [Fixed Values, Runtime Inputs, and Expressions](../../platform/20_References/runtime-inputs.md). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline. Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change the value type.

![](./static/run-step-settings-04.png)

For more information, go to [Built-in Harness Variables Reference](../../platform/12_Variables-and-Expressions/harness-variables.md).

### Output Variables

Output variables expose environment variables for use by other steps/stages in a pipeline. You can reference the output variable of a step using the step ID and the name of the variable in output variables.

<details>
<summary>Output variables example</summary>
This example exports an output variable as a step's environment variable. It is then called in a later step.

1. In the **Command** field, include the following syntax to export a new variable:

   ```
   export myVar=varValue
   ```

2. In the **Output Variables**, list the exported variable name:

   ![](./static/run-step-settings-05.png)

3. In a later **Run** step in the same stage of the same pipeline, reference the output variable in that step's **Command** field:

   ```
   echo <+steps.S1.output.outputVariables.myVar>
   ```

Here is how the S1 step's output variable is referenced:

![](./static/run-step-settings-06.png)

The subsequent build job fails when exit 0 is present along with output variables.
</details>

<details>
<summary>Output variable syntax</summary>
To reference output variables between steps in the same stage, use the following syntax:

```
<+[stepID].output.outputVariables.[varName]>
```

To reference output variables across stages, there are several syntax options, as follows:

```
<+stages.[stageID].execution.steps.[stepID].output.outputVariables.[varName]>

<+pipeline.stages.[stage name].spec.execution.steps.[step name].output.outputVariables.[varName]>
```

You can also access environment variables through the auto-suggest/ auto-complete feature in the Harness UI.
</details>

<details>
<summary>Export output variables to stage or pipeline variables</summary>
You can also export step output variables to stage/pipeline environment variables, because they are available through the pipeline.

For example, if a step exported an output variable called `BUILD_NUM`, you could use the following syntax to reference this variable later in the pipeline:

```
<+pipeline.stages.[stage Id].variables.BUILD_NUM>
```
</details>

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

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
