---
title: Background step settings
description: Use Background steps to manage dependent services.
sidebar_position: 20
helpdocs_topic_id: kddyd0f33o
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-integration/use-ci/manage-dependencies/configure-service-dependency-step-settings
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Use Background steps to [manage dependent services](./dependency-mgmt-strategies.md) that need to run for the entire lifetime of a Build stage. For example, you can set up your pipeline to run multiple background services that implement a local, multi-service app.

<figure>

![](./static/background-step-settings-07.png)

<figcaption>A Build stage with multiple services running in Background steps.</figcaption>
</figure>

A Background step starts a service and then proceeds. For any later step that relies on the service, it is good practice to verify that the service is running before sending requests.

:::info

* Background steps do not support failure strategies or output variables.
* If the pipeline runs on a VM build infrastructure, you can run the background service directly on the VM rather than in a container. To do this, leave the **Container Registry** and **Image** fields blank.
* Depending on the stage's build infrastructure, some settings might be unavailable, optional, or located under **Additional Configuration**.

:::

## Name and Id

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id** until the step is saved; once saved, the **Id** is locked.

:::tip

If you are using a VM, local runner, or the Harness Cloud build infrastructure where the background step is running a container, you can use the Background step **Id** to call services started by Background steps in later steps, such as commands in Run steps. For example, a cURL command could call `BackgroundStepId:5000` where it might otherwise call `localhost:5000`.

<figure>

![](./static/background-step-settings-call-id-in-other-step.png)

<figcaption>The Background step ID, <code>pythonscript</code>, is used in a cURL command in a Run step.</figcaption>
</figure>

If the Background step is inside a step group, you must include step group ID, such as `curl StepGroupId_BackgroundStepId:5000`, even if both steps are in the same step group.

If the Background step runs directly on the host or in a Kubernetes cluster build infrastructure, do not use the step ID to reference Background steps. Instead, use `localhost:host_port`. For Background steps running MySQL in a Kubernetes cluster build infrastructure, you must use the IP and host port, such as `127.0.0.1:7001`. For more information, go to [Port Bindings](#port-bindings).

:::

## Container Registry and Image

**Container Registry** is a Harness container registry connector that connects to the container registry, such as Docker Hub, from which you want Harness to pull an image.

**Image** is the container image to use for the background service. The image name should include the tag, or it defaults to the `latest` tag if unspecified. You can use any Docker image from any Docker registry, including Docker images from private registries. Different container registries require different name formats:

* **Docker Registry:** Input the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards aren't supported. FQN is required for images in private container registries.
* **ECR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.
* **GCR:** Input the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path starting with the project ID that the artifact is in, for example: `us.gcr.io/playground-243019/quickstart-image:latest`.

<figure>

![](./static/background-step-settings-08.png)

<figcaption>An example configuration for the <b>Container Registry</b> and <b>Image</b> fields. Note that this figure shows a <b>Run</b> step, but the fields are populated the same for <b>Background</b> steps.</figcaption>
</figure>

:::info

The stage's build infrastructure determines whether these fields are required or optional:

* [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Local runner build infrastructure](../set-up-build-infrastructure/define-a-docker-build-infrastructure.md): **Background** steps can use binaries available on the host machine. The **Container Registry** and **Image** are required if the machine doesn't have the binaries you need.
* [Self-hosted cloud provider VM build infrastructure](/docs/category/set-up-vm-build-infrastructures): **Background** steps can use binaries that you've made available on your build VMs. The **Container Registry** and **Image** are required if the VM doesn't have the necessary binaries. These fields are located under **Optional Configuration** for stages that use self-hosted VM build infrastructure.
* [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md): **Background** steps can use binaries available on Harness Cloud machines, as described in the [image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). The **Container Registry** and **Image** are required if the machine doesn't have the binary you need. These fields are located under **Optional Configuration** for stages that use Harness Cloud build infrastructure.

:::

## Shell, Entry Point, and Command

Use these fields to define the commands that you need to run in the Background step.

### Shell

Select the shell type for the commands defined in **Entry Point** or **Command**. Options include: **Bash**, **PowerShell**, **Pwsh** (PowerShell Core), **Sh**, and **Python**. If the step includes commands that aren't supported for the selected shell type, the build fails. Required binaries must be available on the build machine or through a specified [Container Registry and Image](#container-registry-and-image).

### Entry Point

Supply a list of arguments in `exec` format. **Entry Point** arguments override the image `ENTRYPOINT` and any commands in the **Command** field. Enter each argument separately.

If you want to add your **Entry Point** arguments to the image `ENTRYPOINT`, include both the image `ENTRYPOINT`, such as `docker-entrypoint.sh`, and your additional arguments in **Entry Point**.


<Tabs>
  <TabItem value="Visual" label="Visual">

<figure>

![](./static/dind-background-step-entry-point.png)

<figcaption><b>Entry Point</b> arguments in the Pipeline Studio Visual editor.</figcaption>
</figure>


</TabItem>
  <TabItem value="YAML" label="YAML" default>


```yaml
                    entrypoint:
                      - docker-entrypoint.sh
                      - "--mtu=1450"
```


</TabItem>
</Tabs>


:::tip

In a Kubernetes cluster build infrastructure, you can use **Entry Point** to override port mappings when [running multiple PostgreSQL instances in Background steps](./multiple-postgres).

:::

### Command

Enter [POSIX](https://en.wikipedia.org/wiki/POSIX) shell script commands (beyond the image `ENTRYPOINT`) for this step. If the step runs in a container, the commands are executed inside the container.

<Tabs>
  <TabItem value="bash" label="Bash" default>

This Bash script example checks the Java version.

```yaml
              - step:
                  ...
                  spec:
                    shell: Bash
                    command: |-
                      JAVA_VER=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
                      if [[ $JAVA_VER == 17 ]]; then
                        echo successfully installed $JAVA_VER
                      else
                        exit 1
                      fi
```

</TabItem>
  <TabItem value="powershell" label="PowerShell">

This is a simple PowerShell `Wait-Event` example.

```yaml
              - step:
                  ...
                  spec:
                    shell: Powershell
                    command: Wait-Event -SourceIdentifier "ProcessStarted"
```

:::tip

You can run PowerShell commands on Windows VMs running in AWS build farms.

:::

</TabItem>
  <TabItem value="pwsh" label="Pwsh">

This PowerShell Core example runs `ForEach-Object` over a list of events.

```yaml
              - step:
                  ...
                  spec:
                    shell: Pwsh
                    command: |-
                      $Events = Get-EventLog -LogName System -Newest 1000
                      $events | ForEach-Object -Begin {Get-Date} -Process {Out-File -FilePath Events.txt -Append -InputObject $_.Message} -End {Get-Date}
```

:::tip

You can run PowerShell Core commands in pods or containers that have `pwsh` installed.

:::

</TabItem>
  <TabItem value="sh" label="Sh">

In this example, the pulls a `python` image and executes a shell script (`Sh`) that runs `pytest` with code coverage.

```yaml
              - step:
                  ...
                  spec:
                    connectorRef: account.harnessImage
                    image: python:latest
                    shell: Sh
                    command: |-
                      echo "Welcome to Harness CI"
                      uname -a
                      pip install pytest
                      pip install pytest-cov
                      pip install -r requirements.txt

                      pytest -v --cov --junitxml="result.xml" test_api.py test_api_2.py test_api_3.py
```

</TabItem>
  <TabItem value="python" label="Python">

If the `shell` is `Python`, supply Python commands directly in `command`.

This example uses a basic `print` command.

```
            steps:
              - step:
                  ...
                  spec:
                    shell: Python
                    command: print('Hello, world!')
```

</TabItem>
</Tabs>

:::tip

You can use `docker-compose up` to start multiple services in one Background step.

:::

## Privileged

Select this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.

## Report Paths

The path to the files that store [results in JUnit XML format](../run-tests/test-report-ref.md). You can add multiple paths. If you specify multiple paths, make sure the files contain unique tests to avoid duplicates. [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported.

This setting is required for commands run in the Background step to be able to [publish test results](../run-tests/viewing-tests.md).

## Environment Variables

You can inject environment variables into the step container and use them in the **Command** script. You must input a **Name** and **Value** for each variable.

You can reference environment variables in the **Command** script by name. For example, a Bash script would use `$var_name` or `${var_name}`, and a Windows PowerShell script would use `$Env:varName`.

Variable values can be [fixed values, runtime inputs, or expressions](/docs/platform/variables-and-expressions/runtime-inputs). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline.

<figure>

![](./static/background-step-settings-09.png)

<figcaption>Using an expression for an environment variable's value.</figcaption>
</figure>

:::tip Stage variables

[Stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables) are inherently available to steps as environment variables.

:::

## Image Pull Policy

If the service is running in a container, you can select an option to set the pull policy for the image.

* **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: The image is pulled only if it is not already present locally.
* **Never**: The image is assumed to exist locally. No attempt is made to pull the image.

## Port Bindings

The host port and container port binding are similar to [port mapping in Docker](https://docs.docker.com/config/containers/container-networking/). Usually the ports are the same unless the default host port for the Background step is already in use by another local service or you are [running multiple instances of the same service](./multiple-postgres.md).

Depending on the Build stage's **Infrastructure**, some steps might run directly on VMs while other steps run in containers. The port used to communicate with a service started by a Background step depends on where the step is running. For example, assume you create a Background step with the [Name and ID](#name-and-id) `myloginservice`. To call this service in later steps in the same stage, you use:

* `myloginservice:container_port` for containerized steps, such as those running in self-hosted VM build infrastructures or running Docker images.
* `localhost:host_post` for steps running in a Kubernetes cluster build infrastructure or directly on the build machine (such as a service running from a binary already installed on the host machine). For steps running MySQL in a Kubernetes cluster build infrastructure, you must use `127.0.0.1:host_port`.

:::info

If your build stage uses Harness Cloud build infrastructure and you are running a Docker image in a Background step, you must specify **Port Bindings** if you want to reference that Background step in a later step in the pipeline (such as in a cURL command in a Run step). More more information about referencing background services in other steps, go to [Name and Id](#name-and-id).

:::

## Run as User

If the service is running in a container, you can specify the user ID to use for all processes in the pod. For more information about how to set the value, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

## Set Container Resources

The maximum memory and cores that the container can use.

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. Do not include spaces when entering a fixed value. The default value is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

## Troubleshoot Background steps

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Background steps, including:

* [Do Background steps have limitations?](/kb/continuous-integration/continuous-integration-faqs/#do-background-steps-have-limitations)
* [Can Background steps run multiple services simultaneously?](/kb/continuous-integration/continuous-integration-faqs/#can-background-steps-run-multiple-services-simultaneously)
* [How can a step call a service started by a Background step?](/kb/continuous-integration/continuous-integration-faqs/#how-can-a-step-call-a-service-started-by-a-background-step)
* [I can't connect to the hostname using the step ID from my Background step, and I get an "Unknown server host" error](/kb/continuous-integration/continuous-integration-faqs/#i-cant-connect-to-the-hostname-using-the-step-id-from-my-background-step-and-i-get-an-unknown-server-host-error)
* [Why is Background step always marked as successful even if there are failures executing the entry point?](/kb/continuous-integration/continuous-integration-faqs/#why-is-background-step-always-marked-as-successful-even-if-there-are-failures-executing-the-entry-point)
* [How can I health check services running in Background steps?](/kb/continuous-integration/continuous-integration-faqs/#how-can-i-make-sure-my-background-service-is-healthy-before-running-the-rest-of-my-pipeline-how-can-i-test-that-my-background-service-is-running)
