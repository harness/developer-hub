---
title: Test Intelligence step
description: Use the Test step to leverage Test Intelligence.
sidebar_position: 3
---

import OutVar from '/docs/continuous-integration/shared/output-var.md';

[Test Intelligence](/docs/continuous-integration/use-ci/run-tests/ti-overview.md) accelerates your test cycles without compromising quality, by running only the unit tests that are relevant to the code changes that triggered the build. Rather than running all test, all the time Instead of always running all unit tests, Harness automatically skips unneeded tests, speeding up your builds. You can also configure Harness TI to automatically split tests and run them in parallel.

You can use this  **Test Intelligence** step, also known as the **Test** step, to run unit tests with **Python**, **Ruby**, **and Java** programming languages.

:::note

Currently, the Test step is behind the feature flag `CIE_ENABLE_RUNTEST_V2`. If the **Test** step is not available in your account, contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

:::info

To use TI for Python, your codebase must be Python 3.

:::


<!-- Doesn't include C#, Kotlin, or Scala yet. -->

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
                    connectorRef: account.harnessImage # Container registry connector.
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

* **Name:** Enter a name summarizing the step's purpose. Harness automatically assigns an [ID](/docs/platform/references/entity-identifier-reference.md) based on the **Name**.
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

### Intelligence Mode

Enable **Intelligence Mode** to [enable Test Intelligence](./ti-overview.md).

### Test Globs

Specify a glob pattern to match the test files you want to include.

By default, we use the following globs for test selection:
* Ruby: `**/spec/**/*_spec.rb`
* Python: `"**/test_*.py`, `**/*_test.py"`
* Java: `**/*.java`

You can override the default test globs pattern, for example:

The default for RSpec is `**/spec/**/*_spec.rb`, and you could override it with any other pattern, such as `spec/features/**/*_spec.rb`, which would look for a `/spec` directory at the root level, rather than anywhere in the workspace.

Since test selection is at the file-level, the test globs pattern references file names. You can include directory structures, such as `microservice1/**/test_*.py`.

### Report Paths

This setting is optional. If unspecified, Harness uses the default JUnit report path `**/*.xml`.

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

### Output Variables

<OutVar />

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

## Trigger test selection

If you enabled [Intelligence Mode](#intelligence-mode), **you must run your pipeline twice to trigger test selection**.

### Trigger test selection with a webhook trigger (Recommended)

1. If your pipeline doesn't already have one, [add a webhook trigger](/docs/platform/triggers/triggering-pipelines/) that listens for **Pull Request** or **Push** events in your [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md).
2. Activate the trigger by opening a PR or pushing changes to your codebase, and then wait while the build runs. You can monitor the build's progress on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds.md).

   If you created a PR, merge the PR after the build runs. <!-- This is required to ensure that the baseline established by the call graph persists on the target branch. This is not required for push triggers.-->

3. To trigger test selection, activate the trigger again (by opening a PR or pushing changes to your codebase).

   The first run with TI *doesn't* apply test selection, because Harness must establish a baseline for comparison in future runs. After establishing a baseline, each time this pipeline runs, Harness can select relevant tests to run based on the content of the code changes.

4. Wait while the build runs, and then [review the test results and test selection](./viewing-tests.md). If you created a PR, merge the PR after the build runs.

### Trigger test selection with a manual build

1. Open a PR or push changes to your pipeline's [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md), and then run your pipeline.

   If you opened a PR, select **Git Pull Request** for **Build Type**, and enter the PR number.

   If you pushed changes, select **Git Branch** for **Build Type**, and then enter the branch name.

   <DocImage path={require('./static/set-up-test-intelligence-04.png')} />

2. Wait while the build runs. You can monitor the build's progress on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds.md).

   If you created a PR, merge the PR after the build runs. <!-- This is required to ensure that the baseline established by the call graph persists on the target branch. This is not required if you pushed changes without a PR.-->

3. To trigger test selection, open a new PR (or push changes) to your codebase, and then run your pipeline again.

   The first run with TI *doesn't* apply test selection, because Harness must establish a baseline for comparison in future runs. After establishing a baseline, each time this pipeline runs, Harness can select relevant tests to run based on the content of the code changes.

4. Wait while the build runs, and then [review the test results and test selection](./viewing-tests.md). If you created a PR, merge the PR after the build runs.

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

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Test Intelligence, including:

* [Does Test Intelligence split tests? Can I use parallelism with Test Intelligence?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-split-tests-why-would-i-use-test-splitting-with-test-intelligence)
* [Test Intelligence call graph is empty.](/kb/continuous-integration/continuous-integration-faqs/#on-the-tests-tab-the-test-intelligence-call-graph-is-empty-and-says-no-call-graph-is-created-when-all-tests-are-run)
* [Ruby Test Intelligence can't find rspec helper file.](/kb/continuous-integration/continuous-integration-faqs/#ruby-test-intelligence-cant-find-rspec-helper-file)
* [Test Intelligence fails due to Bazel not installed, but the container image has Bazel.](/kb/continuous-integration/continuous-integration-faqs/#test-intelligence-fails-due-to-bazel-not-installed-but-the-container-image-has-bazel)
* [Does Test Intelligence support dynamic code?](/kb/continuous-integration/continuous-integration-faqs/#does-test-intelligence-support-dynamic-code)
* [Errors when running TI on Python code.](/kb/continuous-integration/continuous-integration-faqs/#python-test-intelligence-errors)
