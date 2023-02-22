---
title: Background step settings
description: Background steps are useful for running services that need to run for the entire lifetime of a build.
sidebar_position: 10
helpdocs_topic_id: kddyd0f33o
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

Background steps are useful for running services that need to run for the entire lifetime of a Build stage. For example, you can set up your pipeline to run multiple background services that implement a local, multi-service app.

![](./static/background-step-settings-07.png)

## Important notes

* Background steps do not support failure strategies or output variables.
* A Background step starts a service and then proceeds. For any later step that relies on the service, it is good practice to verify that the service is running before sending requests. You can use the Background step **Id** to call services started by Background steps in later steps, such as `curl` commands in Run steps.
  ![The Background step ID, pythonscript, is used in a curl command in a Run step.](./static/background-step-settings-call-id-in-other-step.png)
* If the pipeline runs on a VM build infrastructure, you can run the background service directly on the VM rather than in a container. To do this, leave the **Container Registry** and **Image** fields blank.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable. Not all settings are available for all build infrastructure options.

:::

## Name

The unique name for this step. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Container Registry

A Harness container registry connector. This is the container registry for the image that you want Harness to run build commands on, such as DockerHub.

## Image

The container image to use for the background service. The image name should include the tag, or it defaults to the latest tag if unspecified. You can use any Docker image from any Docker registry, including Docker images from private registries.

Different container registries require different name formats:

* **Docker Registry:** Input the name of the artifact you want to deploy, for example: `library/tomcat`. Wildcards aren't supported.
* **GCR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `us.gcr.io/playground-123/quickstart-image:latest`.

   ![](./static/background-step-settings-08.png)

* **ECR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.

## Shell

Select the shell script type. If the step includes commands that aren't supported for the selected shell type, the build fails.

You can run PowerShell Core (`pwsh`) commands in pods or containers that have `pwsh` installed. You can run PowerShell commands on Windows VMs running in AWS build farms.

## Entry Point

The entry point takes precedence over any commands in the **Command** field.

## Command

[POSIX](https://www.grymoire.com/Unix/Sh.html) shell script commands (beyond the entry point) executed inside the container.

## Additional Configuration

Use these optional settings to add additional configuration to the step. Settings considered optional depend on the stage's **Infrastructure** settings. Not all options are available for all build infrastructure types.

### Privileged

Select this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.

### Report Paths

The path to the file(s) that store results in JUnit XML format. You can add multiple paths. [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported.

This setting is required for the Background step to be able to publish test results.

### Environment Variables

You can inject environment variables into a container and use them in the **Command** script. You must input a **Name** and **Value** for each variable.

You can reference environment variables in the **Command** script by their name. For example, a Bash script would use `$var_name` or `${var_name}`, and a Windows PowerShell script would use `$Env:varName`.

Variable values can be [Fixed Values, Runtime Inputs, and Expressions](../../platform/20_References/runtime-inputs.md). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline. Select the **Thumbtack** ![](./static/icon-thumbtack.png) to change the value type.

![](./static/background-step-settings-09.png)

### Image Pull Policy

If the service is running in a container, you can select an option to set the pull policy for the image.

* **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: The image is pulled only if it is not already present locally.
* **Never**: The image is assumed to exist locally. No attempt is made to pull the image.

### Port Bindings

Depending on the Build stage's **Infrastructure**, some steps might run on a bare-metal VM while other steps run in containers. The port used to communicate with a service started by a Background step depends on where the step is running: bare-metal steps use the **Host Port** and containerized steps use the **Container Port**.

<details>
<summary>Port Bindings example</summary>

Assume you create a Background step with the **Name** and **Id** `myloginservice`.
- A containerized step talks to this service using `myloginservice:*****container\_port*`.
- A Run or Run Test step that runs directly on a VM or in a Kubernetes cluster talks to the service using `localhost:*****host\_port*`.

</details>

The host port and container port binding are similar to [port mapping in Docker](https://docs.docker.com/config/containers/container-networking/). Usually the ports are the same unless the default host port for the Background step is already in use by another local service.

:::note

If your build stage uses Harness Cloud build infrastructure and you are running a Docker image in a Background step, you must specify **Port Bindings** if you want to reference that Background step in a later step in the pipeline (such as in a `curl` command in a Run step).

:::

### Run as User

If the service is running in a container, you can specify the user ID to use for all processes in the pod. For more information about how to set the value, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

The maximum memory and cores that the container can use.

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. Do not include spaces when entering a fixed value. The default value is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).
