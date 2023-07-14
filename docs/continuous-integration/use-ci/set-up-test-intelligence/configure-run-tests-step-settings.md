---
title: Run Tests step settings
description: The Run Tests step runs tests and can be used to enable Test Intelligence.
sidebar_position: 30
helpdocs_topic_id: axzckflbt2
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import OutVar from '/docs/continuous-integration/shared/output-var.md';
```

This topic describes settings for the Harness CI Run Tests step. Use the Run Tests step to [run tests](/docs/category/run-tests) and [enable Test Intelligence](./set-up-test-intelligence.md) in CI pipelines.

:::info Hidden settings

* Some settings are located under **Additional Configuration** in the Pipeline Studio's visual editor.
* Some settings are only applicable to certain languages or build tools.
* Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

:::

## Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id**.

## Description

Optional text string.

## Container Registry and Image

The **Container Registry** is a Harness container registry connector for the image that you want Harness to run build commands on, such as Docker Hub.

The **Image** is the FQN (fully-qualified name) or artifact name of the Docker image to use when this step runs commands, for example `us.gcr.io/playground-123/quickstart-image`. The image name should include the tag. If you don't include a tag, Harness uses the `latest` tag.

You can use any Docker image from any Docker registry, including Docker images from private registries. Different container registries require different name formats:

* **Docker Registry:** Enter the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards aren't supported. FQN is required for images in private container registries.
* **ECR:** Enter the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.
* **GCR:** Enter the FQN (fully-qualified name) of the artifact you want to deploy. Images in repos must reference a path starting with the project ID that the artifact is in, for example: `us.gcr.io/playground-243019/quickstart-image:latest`.

:::info

The stage's build infrastructure determines whether these fields are required or optional:

* [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Local runner build infrastructure](../set-up-build-infrastructure/define-a-docker-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Self-hosted cloud provider VM build infrastructure](/docs/category/set-up-vm-build-infrastructures): **Run Tests** steps can use binaries that you've made available on your build VMs. The **Container Registry** and **Image** are required if the VM doesn't have the necessary binaries. These fields are located under **Additional Configuration** for stages that use self-hosted VM build infrastructure.
* [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md): **Run Tests** steps can use binaries available on Harness Cloud machines, as described in the [image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). The **Container Registry** and **Image** are required if the machine doesn't have the binaries you need. These fields are located under **Additional Configuration** for stages that use Harness Cloud build infrastructure.

:::

## Language

Select the source code language to build: **C#**, **Java**, **Kotlin**, or **Scala**.

Additional settings appear if you select **C#** or **Java**.

```mdx-code-block
<Tabs>
  <TabItem value="csharp" label="C#" default>
```

### Build Environment

Select the build environment to test.

<!--
:::info .NET Framework

.NET Framework is supported on Windows [VM build infrastructures](/docs/category/set-up-vm-build-infrastructures/) only. You must specify `buildEnvironment: Framework` in your pipeline's YAML, for example:

```yaml
              - step:
                  type: RunTests
                  name: runTests
                  identifier: runTest
                  spec:
                    language: Csharp
                    buildEnvironment: Framework
                    frameworkVersion: "5.0"
                    buildTool: Nunitconsole
                    ...
```

:::
-->

### Framework Version

Select the framework version to test.

### Namespaces

This setting is only available if you select **DOTNET** as the [Build Tool](#build-tool).

Supply a comma-separated list of namespace prefixes that you want to test.

```mdx-code-block
  </TabItem>
  <TabItem value="java" label="Java">
```

### Do you want to enable Error Tracking?

Error tracking helps you be more proactive at discovering and remediating errors early in the software development lifecycle. It help s you more easily discover issues and assess the quality of code before it reaches production.

Select **Yes** to enable error tracking. When enabled, a set of commands are auto-populated in the [Pre-Command field](#pre-command). Review these commends to ensure they are compatible with your build. The auto-populated commands are enclosed between `#ET-SETUP-BEGIN` and `#ET-SETUP-END`, for example:

```
#ET-SETUP-BEGIN
PROJ_DIR=$PWD
cd /opt
arch=`uname -m`
if [ $arch = "x86_64" ]; then
  if cat /etc/os-release | grep -iq alpine ; then
    wget -qO- https://get.et.harness.io/releases/latest/alpine/harness-et-agent.tar.gz | tar -xz
  else
    wget -qO- https://get.et.harness.io/releases/latest/nix/harness-et-agent.tar.gz | tar -xz
  fi
elif [ $arch = "aarch64" ]; then
  wget -qO- https://get.et.harness.io/releases/latest/arm/harness-et-agent.tar.gz | tar -xz
fi
export ET_COLLECTOR_URL=https://app.harness.io/<cluster_value>/et-collector
export ET_APPLICATION_NAME=$HARNESS_PIPELINE_ID
export ET_ENV_ID=_INTERNAL_ET_CI
export ET_DEPLOYMENT_NAME=$HARNESS_BUILD_ID
export ET_ACCOUNT_ID=$HARNESS_ACCOUNT_ID
export ET_ORG_ID=$HARNESS_ORG_ID
export ET_PROJECT_ID=$HARNESS_PROJECT_ID
# export ET_SHUTDOWN_GRACETIME=30000
export JAVA_TOOL_OPTIONS="-agentpath:/opt/harness/lib/libETAgent.so"
# Uncomment the line below if using Java version 10 or above
# export JAVA_TOOL_OPTIONS="-Xshare:off -XX:-UseTypeSpeculation -XX:ReservedCodeCacheSize=512m -agentpath:/opt/harness/lib/libETAgent.so"
cd $PROJ_DIR
#ET-SETUP-END
```

<!--You might need to modify the `ET_COLLECTOR_URL` depending on the cluster your account is on:

* For Prod 1 Harness accounts: `https://app.harness.io/prod1/et-collector`
* For Prod 2 Harness accounts: `https://app.harness.io/gratis/et-collector`-->

Error tracking output is reported on the [Error Tracking tab](../viewing-builds.md) when the pipeline runs.

### Test Annotations

This setting is located under **Additional Configuration**.

You can provide a comma-separated list of test annotations used in unit testing. Any method with a specified annotation is treated as a test method. If not specified, the defaults are: `org.junit.Test, org.junit.jupiter.api.Test, org.testing.annotations.Test`

```mdx-code-block
  </TabItem>
</Tabs>
```

## Build Tool

Select the build automation tool. Supported tools vary by **Language**.

```mdx-code-block
<Tabs>
  <TabItem value="csharp" label="C#">
```

* [DOTNET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/)
* [NUnit](https://nunit.org/)

```mdx-code-block
  </TabItem>
  <TabItem value="Java" label="Java" default>
```

* [Bazel](https://bazel.build/)
* [Maven](https://maven.apache.org/)
* [Gradle](https://gradle.org/)

```mdx-code-block
  </TabItem>
  <TabItem value="Kotlin" label="Kotlin">
```

* [Bazel](https://bazel.build/)
* [Maven](https://maven.apache.org/)
* [Gradle](https://gradle.org/)

```mdx-code-block
  </TabItem>
  <TabItem value="Scala" label="Scala">
```

* [Bazel](https://bazel.build/)
* [Maven](https://maven.apache.org/)
* [Gradle](https://gradle.org/)
* [Sbt](https://www.scala-sbt.org/)

```mdx-code-block
  </TabItem>
</Tabs>
```

:::info Bazel container images

If you use a Bazel [container image](#container-registry-and-image) in a build infrastructure where Bazel isn't already installed, your pipeline must include commands or steps to install Bazel. This is because `bazel query` is called before the container image is pulled.

Bazel is already installed on Harness Cloud. For other build infrastructures, you must manually confirm if Bazel is already installed.

:::

## Build Arguments

Enter the arguments for the build tool. These are used as input for the chosen build tool.

The following languages and build tools have specific build argument requirements:

* **Java:** Provide runtime arguments for the tests, for example: `Test -Dmaven.test.failure.ignore=true -DfailIfNoTests=false`.
* **C#:** Provide runtime arguments for the tests, for example: `/path/to/test.dll /path/to/testProject.dll`. **Do not** inject another instrumenting agent, such as a code-coverage agent, in the argument string.
* **NUnit C#:** Provide runtime executables and arguments for the tests, for example: `. "path/to/nunit3-console.exe" path/to/TestProject.dll --result="UnitTestResults.xml" /path/to/testProject.dll`. You must include the executable in the string. **Do not** inject another instrumenting agent, such as a code-coverage agent, in the string.

## Test Report Paths

Specify one or more paths to files that store [test results in JUnit XML format](../set-up-test-intelligence/test-report-ref.md). You can add multiple paths. If you specify multiple paths, make sure the files contain unique tests to avoid duplicates. [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported.

This field is required for the Run Tests step to [publish test results](./viewing-tests.md).

## Pre-Command

Enter the commands for setting up the environment before running the tests. For example, `printenv` prints all or part of the environment.

If a script is supplied here, select the corresponding **Shell** option.

## Post-Command

Enter the commands used for cleaning up the environment after running the tests. For example, `sleep 600` suspends the process for 600 seconds.

If a script is supplied here, select the corresponding **Shell** option.

## Run Only Selected Tests

This option must be selected to [enable Test Intelligence](./set-up-test-intelligence.md).

If this option is unchecked, Test Intelligence is disabled and all tests run on every build.

## Packages

Leave blank or provide a comma-separated list of source code package prefixes, such as `com.company., io.company.migrations`. If you do not provide a list, Harness auto-detects the packages.

## Environment Variables

Variables passed to the container as environment variables and used in the step's commands.

## Output Variables

<OutVar />

## Image Pull Policy

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify an image pull policy:

* **Always:** The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present:** The image is pulled only if it isn't already present locally.
* **Never:** The image is not pulled.

## Run as User

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify the user ID to use for running processes in containerized steps.

For a Kubernetes cluster build infrastructure, the step uses this user ID to run all processes in the pod. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

## Set Container Resources

These settings specify the maximum resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

## Timeout

The timeout limit for the step. Once the timeout is reached, the step fails and pipeline execution continues.

To change what happens when steps fail, go to [Step Failure Strategy settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md).

To configure when pipelines should skip certain steps, go to [Step Skip Condition settings](/docs/platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md).
