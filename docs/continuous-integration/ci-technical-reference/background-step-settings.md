---
title: Background Step Settings
description: Background steps are useful for running services that need to run for the entire lifetime of a build. Use cases include running services for a local, multi-service app.
tags: 
   - helpDocs
# sidebar_position: 2
helpdocs_topic_id: kddyd0f33o
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

Background steps are useful for running services that need to run for the entire lifetime of a Build stage. For example, you can set up your pipeline to run multiple background services that implement a local, multi-service app. 

![](./static/background-step-settings-07.png)

### Important Notes

* Background steps do not support failure strategies or output variables.
* A Background step starts a service and then proceeds. For any later step that relies on the service, it is good practice to verify that the service is running before sending requests.
* If the pipeline runs on a VM build infrastructure, you can run the background service directly on the VM rather than in a container. To do this, leave the **Container Registry** and **Image** fields blank.

### Container Registry

The Harness Connector for a container registry. This is the container registry for the image Harness will use to run build commands on, such as DockerHub.

### Image

The container image to use for the background service. The image name should include the tag and will default to the latest tag if unspecified. You can use any Docker image from any Docker registry, including Docker images from private registries.

Different container registries require different name formats:

* **Docker Registry:** enter the name of the artifact you want to deploy, such as **library/tomcat**. Wildcards are not supported.
* **GCR:** enter the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos need to reference a path, for example: **us.gcr.io/playground-123/quickstart-image:latest**.

![](./static/background-step-settings-08.png)

* **ECR:** enter the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos need to reference a path, for example: **40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2**.

### Shell

Select the shell script. If the step includes commands that aren’t supported for the selected shell type, the build will fail.

You can run PowerShell Core (`pwsh`) commands in pods or containers that have `pwsh` installed. You can run PowerShell commands on Windows VMs running in AWS build farms.

### Entry Point

The entry point takes precedence over any commands in the **Command** field.

### Command

[POSIX](https://www.grymoire.com/Unix/Sh.html) shell script commands (beyond the entry point) executed inside the container.

### Additional Configuration

#### Privileged

Enable this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.

#### Report Paths

The path to the file(s) that store results in the JUnit XML format. Regex is supported.

This variable must be set for the background step to publish test results.

#### Environment Variables

You can inject environment variables into a container and use them in the **Command** script. You need to enter a **Name** and **Value** for each variable.

You can also reference environment variables in the script by their name. For example, in Bash, this would be ( `$var_name` or `${var_name}`). In Windows PowerShell, the reference would be (`$Env:varName`).

For **Value**, you may enter [Fixed Values, Runtime Inputs, and Expressions](https://docs.harness.io/article/f6yobn7iq0-runtime-inputs). For example, you can set **Value** as an expression and reference the value of some other setting in the stage or pipeline.

![](./static/background-step-settings-09.png)

#### Image Pull Policy

If the service is running in a container, you can select an option to set the pull policy for the image.

* **Always**: the kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: the image is pulled only if it is not already present locally.
* **Never**: the image is assumed to exist locally. No attempt is made to pull the image.

#### Run as User

If the service is running in a container, you can set the value to specify the user ID for all processes in the pod. For more information about how to set the value, see [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set Container Resources

The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You may also use the power-of-two equivalents `Gi` and `Mi`.

##### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in cpu units. Fractional requests are allowed; you can specify one hundred millicpu as `0.1` or `100m`. For more information, see [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

