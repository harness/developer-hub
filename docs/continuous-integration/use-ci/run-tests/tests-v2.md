---
title: Test Intelligence™ step
description: Use the Test step to leverage Test Intelligence.
sidebar_position: 3
---

import OutVar from '/docs/continuous-integration/shared/output-var.md';
import EnhancedOutVar from '/docs/continuous-integration/shared/enhanced-output-variables.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Test Intelligence](/docs/continuous-integration/use-ci/run-tests/ti-overview.md) accelerates your test cycles without compromising quality, by running only the unit tests that are relevant to the code changes that triggered the build. Rather than running all test, all the time Instead of always running all unit tests, Harness automatically skips unneeded tests, speeding up your builds. You can also configure Harness TI to automatically split tests and run them in parallel.

You can use this **Test Intelligence** step, also known as the **Test** step, to run unit tests with **Python**, **Ruby**, **Java** , **C#** , **Scala** and **Kotlin** programming languages.


:::tip Test Intelligence Beta
Test Intelligence for **JavaScript (Jest)** and **Kotest** is now available in **beta**. If you're interested in joining the beta program, please contact [Harness Support](https://support.harness.io) or your account representative.
:::


:::info

* Test Intelligence requires that the code is cloned into the default workspace directory, `/harness/`. If the code is placed elsewhere, Test Intelligence will not function correctly.
* To use TI for Python, the image for the step must have Python 3 installed and accessible. Additionally, Virtual Environments for Python (`venv`) are not supported by TI.

:::

## Configure the Test step

Add the **Test** step to the [Build stage](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings.md) in a [CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components.md).

```yaml
              - step:
                  type: Test
                  name: Intelligent Tests
                  identifier: test
                  spec:
                    command: mvn test  # Required. All other settings are optional.
                    shell: sh # Optional shell type.
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR # Container registry connector.
                    image: repo/image # Container image to use to run the commands.
                    privileged: false
                    intelligenceMode: true # Enable Test Intelligence.
                    globs: # Test glob pattern.
                      - "some/glob/pattern"
                    reports: # Test report path.
                      - "**/*.xml"
                    envVariables:
                      MAVEN_OPTS: "-Djansi.force=true"
```

### Metadata

* **Name:** Enter a name summarizing the step's purpose. Harness automatically assigns an ID based on the **Name**.
* **Description:** Optional text string describing the step's purpose.

### Container Registry and Image

The build environment must have the necessary binaries for the **Test** step to execute your test commands. Depending on the stage's build infrastructure, **Test** steps can use binaries that exist in the build environment, or use **Container Registry** and **Image** to pull an image, such as a public or private Docker image, that contains the required binaries.

<details>
<summary>When are Container Registry and Image required?</summary>

The stage's build infrastructure determines whether these fields are required or optional:

* [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Local runner build infrastructure](../set-up-build-infrastructure/define-a-docker-build-infrastructure.md): **Test** steps can use binaries available on the host machine. The **Container Registry** and **Image** are required if the machine doesn't have the binaries you need.
* [Self-managed AWS/GCP/Azure VM build infrastructure](/docs/category/set-up-vm-build-infrastructures): **Test** steps can use binaries that you've made available on your build VMs. The **Container Registry** and **Image** are required if the VM doesn't have the necessary binaries. These fields are located under **Additional Configuration** for stages that use self-managed VM build infrastructure.
* [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md): **Test** steps can use binaries available on Harness Cloud machines, as described in the [image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). The **Container Registry** and **Image** are required if the machine doesn't have the binaries you need. These fields are located under **Additional Configuration** for stages that use Harness Cloud build infrastructure.

</details>

<details>
<summary>What are the expected values for Container Registry and Image?</summary>

For **Container Registry**, provide a Harness container registry connector, such as a Docker connector, that connects to the container registry where the **Image** is located.

For **Image**, provide the FQN (fully-qualified name) or artifact name and tag of a Docker image that has the binaries necessary to run the commands in this step, such as `maven:3.8-jdk-11`. If you don't include a tag, Harness uses the `latest` tag.

You can use any Docker image from any Docker registry, including Docker images from private registries. Different container registries require different name formats:

* **Docker Registry:** Enter the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards aren't supported. FQN is required for images in private container registries.
* **ECR:** Enter the FQN of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.
* **GCR:** Enter the FQN of the artifact you want to deploy. Images in repos must reference a path starting with the project ID that the artifact is in, for example: `us.gcr.io/playground-243019/quickstart-image:latest`.

</details>


### Command and Shell

Use these fields to define the commands that you need to run in this step.

For **Shell**, select the shell type. If the step includes commands that aren't supported for the selected shell type, the step fails. Required binaries must be available on the build infrastructure or through a specified [Container Registry and Image](#container-registry-and-image). The default shell type, if unspecified, is `Sh`.

In the **Command** field, enter commands for this step. The script is invoked as if it were the entry point. If the step runs in a container, the commands are executed inside the container.

:::info

Harness uses a built-in environment variable named `JAVA_TOOL_OPTIONS`.

You can *append* additional settings to this value, but **do not override the default value**.

:::

:::info

Incremental builds don't work for Bazel if you give the entire repo in the **Command**. All modules are built for Bazel.

:::

:::info

For C# support, Harness uses a built-in environment variable named `CORECLR_PROFILER`.

**You shouldn't override this variable.**

:::

### Intelligence Mode

Enable **Intelligence Mode** to [enable Test Intelligence](./ti-overview.md).

### Test Globs

Specify a glob pattern to match the test files you want to include.

By default, we use the following globs for test selection:
* Ruby: `**/spec/**/*_spec.rb`
* Python: `"**/test_*.py`, `**/*_test.py"`
* Java: `**/*.java`
* C#: `**/*.cs`

You can override the default test globs pattern, for example:

The default for RSpec is `**/spec/**/*_spec.rb`, and you could override it with any other pattern, such as `spec/features/**/*_spec.rb`, which would look for a `/spec` directory at the root level, rather than anywhere in the workspace.

Since test selection is at the file-level, the test globs pattern references file names. You can include directory structures, such as `microservice1/**/test_*.py`.

### Report Paths

This setting is optional. If unspecified, Harness uses the default JUnit report path `**/*.xml` or `**/*.trx` for C#.

You can use this setting if your test reports are stored in a non-default location or have a non-default name pattern.

For example:

```yaml
              - step:
                  type: Test
                  name: Intelligent Tests
                  identifier: test
                  spec:
                    ...
                    reports:
                      - tmp/junit.xml
```

You can add multiple paths. If you specify multiple paths, make sure the files contain unique tests to avoid duplicates. [Glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) is supported. [Test results must be in JUnit XML format](./test-report-ref.md).

:::info

When using **.Net**, make sure to enable log reporting when running the tests, e.g. `dotnet test -l:trx`, or otherwise no tests would be shown in the **Tests** tab.

:::

### Output Variables

<OutVar />

<EnhancedOutVar/>

### Environment Variables

You can inject environment variables into the step container and use them in the step's commands. You must input a **Name** and **Value** for each variable.

You can reference environment variables in the **Command** by name, such as `$var_name`.

Variable values can be [fixed values, runtime inputs, or expressions](/docs/platform/variables-and-expressions/runtime-inputs/). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline.

<figure>

![](../manage-dependencies/static/background-step-settings-09.png)

<figcaption>Using an expression for an environment variable's value.</figcaption>
</figure>

:::tip Stage variables

[Stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables) are inherently available to steps as environment variables.

:::

### Parallelism (Test Splitting)

To enable parallelism (test splitting) in a **Test** step, specify the number of parallel workloads to divide the tests into. These workloades will be executed in parallel steps. 

:::note

When using tests splitting, Intelligence Mode must be enabled.

:::

For example:

```yaml
              - step:
                  type: Test
                  name: Intelligent Tests
                  identifier: test
                  spec:
                    ...
                    parallelism : 4 # Divide tests into 4 parallel workloads executed by 4 steps.
```

### Additional container settings

Settings specific to containers are not applicable in a stages that use VM or Harness Cloud build infrastructure.

#### Image Pull Policy

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify an image pull policy:

* **Always:** The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present:** The image is pulled only if it isn't already present locally.
* **Never:** The image is not pulled.

#### Run as User

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify the user ID to use for running processes in containerized steps.

For a Kubernetes cluster build infrastructure, the step uses this user ID to run all processes in the pod. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Privileged

For container-based build infrastructures, you can enable this option to run the container with escalated privileges. This is equivalent to running a container with the Docker `--privileged` flag.

#### Set Container Resources

These settings specify the maximum resources used by the container at runtime. These setting are only available for container-based build infrastructures, such as a Kubernetes cluster build infrastructure.

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

You can set the step's timeout limit. Once the timeout is reached, the step fails and pipeline execution proceeds according to any [Step Failure Strategy settings](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) or [Step Skip Condition settings](/docs/platform/pipelines/step-skip-condition-settings.md).


## Compatibility

The following are the languages, OSes & versions that are supported by Harness' Test Intelligence:

<Tabs>
<TabItem value="Java" label="Java">

#### Supported Operating Systems

All cloud available versions of Linux, Windows & Mac are supported.


<summary><b>Supported languages</b></summary>

| **Language** | **Minimum Version** |
| ------------ | ------------------- |
| Java         | 6+                  |
| Kotlin       | 1.5+                |
| Scala        | 2.13+               |



</TabItem>
<TabItem value="Ruby" label="Ruby">

#### Supported Operating Systems

All cloud available versions of Linux, Windows & Mac are supported.


<summary><b>Supported languages</b></summary>

| **Language** | **Minimum Version** |
| ------------ | ------------------- |
| Ruby         | 2.7+                |



</TabItem>
<TabItem value="Python" label="Python">

#### Supported Operating Systems

All cloud available versions of Linux, Windows & Mac are supported.


<summary><b>Supported languages</b></summary>

| **Language** | **Minimum Version** |
| ------------ | ------------------- |
| Python       | 3+                  |



</TabItem>
<TabItem value="C#" label="C#">

<summary><b>Supported Operating Systems</b></summary>


| **Operating System** | **Supported Versions** | **Architectures** |
| -------------------- | ---------------------- | ----------------- |
| Linux/Centos         | 8+                     | AMD64             |
| Linux/RedHat         | 9+                     | AMD64 & ARM64     |
| Linux/Debian         | 12+                    | AMD64 & ARM64     |
| Linux/Suse           | 15.5+                  | AMD64 & ARM64     |
| Linux/Ubuntu         | 20.04+                 | AMD64 & ARM64     |
| Alpine               | 3.17+                  | AMD64 & ARM64     |
| Windows              | TBD                    | AMD64             |


<summary><b>Supported Implementations</b></summary>

| **Language**   | **Minimum Version** |
| -------------- | ------------------- |
| .Net Core      | 6-8                 |
| .Net Framework | TBD                 |



</TabItem>
</Tabs>

## Trigger Test Selection
[Test Intelligence (TI)](/docs/continuous-integration/use-ci/run-tests/ti-overview) uses a baseline call graph to determine which tests to run. The process to establish this baseline differs for branch runs and pull request (PR) runs.

### For Branch Runs (Manual or Triggered by Push)

Branch runs do **not** require webhook triggers. 

Required Steps:
1. Push changes to the branch, or manually run the pipeline from the UI.
2. Select Git Branch as the build type and enter the branch name.
3. Wait for the build to complete. This run establishes the baseline.
4. Push further changes to the same branch and rerun the pipeline.
5. TI will apply test selection based on code differences from the baseline.

:::note 
This method works regardless of whether the pipeline is triggered manually or automatically. Triggers are optional for branch-based runs.
:::

### For Pull Request (PR) Runs
For PR-based pipelines, webhook triggers are **required** to make TI function correctly. Specifically:
- A trigger for the **PR Opened** event is needed to capture the initial call graph.
- A trigger for the **PR Closed (Merged)** event is required so that the platform can finalize the baseline. The merge event does not need to start a pipeline execution; it just needs to emit the event.

Required Steps:
1. Create a [webhook trigger](/docs/platform/triggers/triggers-reference/) that listens for:
    - Pull Request Opened
    - Pull Request Closed (Merged)
2. Open a PR against the target branch. The PR trigger should automatically start a pipeline run using Git Pull Request as the build type.
3. Merge the PR. The trigger listening for PR merge must fire. This event is used by Harness in the background to finalize the baseline for that branch. It does not need to execute any stage or pipeline.
4. Once the baseline is established, new PRs targeting the same base branch will apply test selection during their pipeline runs.
5. If a new PR is created against a different base branch, you must repeat steps 2 and 3 to establish a new baseline for that branch.

:::note
Test selection will not apply to PRs unless the close/merge event trigger has fired for that base branch.
:::
### Why do I have to run the pipeline twice?

The first time you run a pipeline after adding the Run Test step, Harness creates a baseline for test selection in future builds. Test selection _isn't_ applied to this run because Harness has no baseline against which to compare changes and select tests. You'll start seeing test selection and time savings on the second run after you have added the **Test** step.

## Ignore tests or files

If you want Test Intelligence to ignore certain tests or files, create a `.ticonfig.yaml` file in your codebase, and list the tests and files to ignore. For example:

```yaml
config:
  ignore:
    - "README.md"
    - ".ticonfig.yaml"
    - "**/*.go"
    - "**/Dockerfile*"
    - "licenses/**/*"
    - "img/**/*"
```

## Troubleshoot Test Intelligence

### Troubleshooting

#### Ignoring Build and Cache Intel Directories in Apache RAT Scans

If you are using the Apache RAT plugin for license compliance, it may incorrectly mark Harness Build Intelligence or Cache Intelligence directories as invalid files. This can cause unnecessary failures in your build pipeline.

To avoid this, explicitly exclude the following directories in your pom.xml file.

**Directories to Ignore**
- Build Intelligence:
`/harness/.mvn`

- Cache Intelligence:
`/harness/.m2`
`/harness/.mvn` (also applies to cache-related scans)

**Example: Update to pom.xml**
Add the following snippet under the `<build>` section to configure the apache-rat-plugin to ignore these paths:

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.rat</groupId>
      <artifactId>apache-rat-plugin</artifactId>
      <version>0.15</version> <!-- Or use the latest version -->
      <configuration>
        <excludes>
          <exclude>/harness/.mvn</exclude>
          <exclude>/harness/.m2</exclude> <!-- Optional, but recommended -->
        </excludes>
      </configuration>
      <executions>
        <execution>
          <phase>verify</phase>
          <goals>
            <goal>check</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for more questions and issues related to Test Intelligence, including:

* [Does Test Intelligence split tests? Can I use parallelism with Test Intelligence?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-split-tests-why-would-i-use-test-splitting-with-test-intelligence)
* [Test Intelligence call graph is empty.](/kb/continuous-integration/continuous-integration-faqs/#on-the-tests-tab-the-test-intelligence-call-graph-is-empty-and-says-no-call-graph-is-created-when-all-tests-are-run)
* [Ruby Test Intelligence can't find rspec helper file.](/kb/continuous-integration/continuous-integration-faqs/#ruby-test-intelligence-cant-find-rspec-helper-file)
* [Test Intelligence fails due to Bazel not installed, but the container image has Bazel.](/kb/continuous-integration/continuous-integration-faqs/#test-intelligence-fails-due-to-bazel-not-installed-but-the-container-image-has-bazel)
* [Does Test Intelligence support dynamic code?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-support-dynamic-code)
* [Errors when running TI on Python code.](/kb/continuous-integration/continuous-integration-faqs/#python-test-intelligence-errors)
* [Test Intelligence fails to find all classes on C# code.](/kb/continuous-integration/continuous-integration-faqs/#why-some-of-my-c-classes-are-not-being-discovered-by-test-intelligence)
