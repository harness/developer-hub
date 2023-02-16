---
title: Run Tests step settings
description: The Run Tests step runs tests on container images and enables Test Intelligence.
sidebar_position: 110
helpdocs_topic_id: axzckflbt2
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the Harness CI Run Tests step settings. The Run Tests step runs tests on container images and can enable Test Intelligence in CI pipelines.

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id**.

## Description

Optional text string.

## Container Registry

Select a container registry connector. This is the container registry, such as DockerHub, where Harness pulls the image on which it runs build commands. This is optional for stages that use Harness Cloud build infrastructure.

## Image

The name of the Docker image to use for running commands, such as `maven:3.6.3-jdk-8`. This is optional for stages that use Harness Cloud build infrastructure.

The image name should include the tag and defaults to the latest tag if unspecified. You can use any Docker image from any Docker registry, including Docker images from private registries. Provide a Fully Qualified Image Name (FQIN) when using a private container registry.

Different container registries require different name formats:

* Docker Registry: enter the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards are not supported.
* GCR: enter the name of the artifact you want to deploy. Images in repos need to reference a path starting with the project ID that the artifact is in, for example: `us.gcr.io/playground-243019/quickstart-image:latest`.
* ECR: enter the name of the artifact you want to deploy. Images in repos need to reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.

## Language

Select the source code language to build, such as Java or C#.

## Build Tool

Select the build automation tool. Supported tools vary by **Language**. For example, Harness supports [Bazel](https://bazel.build/), [Maven](https://maven.apache.org/), and [Gradle](https://gradle.org/) for **Java** and [NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) and [Nunit](https://nunit.org/) for **.NET:** .

## Build Arguments

Enter the arguments for the build tool. These are used as input for the chosen build tool.

* **Java:** Provide runtime arguments for the tests, for example: `Test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false`.
* **C#:** Provide runtime arguments for the tests, for example: `/path/to/test.dll /path/to/testProject.dll`. **Do not** inject another instrumenting agent, such as a code-coverage agent, in the argument string.
* **C#/Nunit:** Provide runtime executables and arguments for the tests, for example: `. "path/to/nunit3-console.exe" path/to/TestProject.dll --result="UnitTestResults.xml" /path/to/testProject.dll`. You must include the executable in the string. **Do not** inject another instrumenting agent, such as a code-coverage agent, in the string.

## Report Paths

This field is required for the Run Tests step to publish test results.

Specify one or more paths to test report files. You can specify multiple paths, and [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported. Test reports must be in JUnit XML format.

## Additional Configurations

Use these optional settings to specify additional configurations.

### Pre-Command

Enter the commands for setting up the environment before running the tests. For example,`printenv` prints all or part of the environment.

If a script is supplied here, select the corresponding **Shell** option.

### Post-Command

Enter the commands used for cleaning up the environment after running the tests. For example, `sleep 600` suspends the process for 600 seconds.

If a script is supplied here, select the corresponding **Shell** option.

### Run Only Selected Tests

This option must be selected to enable Test Intelligence.

If this option is unchecked, Test Intelligence is disabled and all tests run on every build.

### Packages

Leave blank or provide a comma-separated list of source code package prefixes, such as `com.company., io.company.migrations`. If you do not provide a list, Harness auto-detects the packages.

### Test Annotations

Provide a comma-separated list of test annotations used in unit testing. Any method with a specified annotation is treated as a test method. The defaults are: `org.junit.Test, org.junit.jupiter.api.Test, org.testing.annotations.Test`

### Namespaces (*C#*)

For .NET C# only, supply a comma-separated list of namespace prefixes that you want to test.

### Environment Variables

Variables passed to the container as environment variables and used in the step's commands.

### Output Variables

Output variables expose environment variables for use by other steps/stages in the pipeline. Use the step ID and variable name to reference a step's output variables in other steps.

<details>
<summary>Example: Output variables</summary>

Assume there is a pipeline that has a step called `Step1` with the **Id** `S1`.

The **Command** for `Step1` contains the following expression to export a variable: `export myVar=varValue`

To use this exported variable in another step in the pipeline, the varible must be declared in `Step1`'s **Output Variables**.

![](./static/configure-run-tests-step-settings-513.png)

Later in the same pipeline, the **Command** for a Run step includes the following expression to reference the output variable from the `S1` step: `echo <+S1.output.outputVariables.myVar>`

![Referencing the S1 output variable](./static/configure-run-tests-step-settings-514.png)

Use the following syntax to reference output variables between steps in the same stage: `<+[stepID].output.outputVariables.[varName]>`

Use the following syntax to reference output variables between steps in different stages: `<+stages.[stageID].execution.steps.[stepID].output.outputVariables.[varName]>`

</details>

### Image Pull Policy

Select an option to set the pull policy for the image:

* **Always:** The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present:** The image is pulled only if it isn't already present locally.
* **Never:** The image is not pulled.

### Run as User

Set the value to specify the user ID for all processes in the pod running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

These settings specify the maximum resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. For more information go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

The timeout limit for the step. Once the timeout is reached, the step fails and pipeline execution continues.

To change what happens when steps fail, go to [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md).

To configure when pipelines should skip certain steps, go to [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md).
