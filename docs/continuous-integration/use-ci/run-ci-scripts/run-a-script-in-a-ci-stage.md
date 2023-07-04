---
title: Run a script in a Build stage
description: You can use a Run step to run scripts in Build stages.

sidebar_position: 10
helpdocs_topic_id: ota4xj59le
helpdocs_category_id: 7ljl8n7mzn
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use a CI **Run** step to run scripts and commands in Build stages in CI pipelines. Here are a few examples of ways you could use **Run** steps:

* Pull the Docker image for Maven and then run the `mvn package` command with that tool.
* Run tests with `pytest`.
* Run a simple `echo` or `sleep` command.
* Set up an environment or specify a version, such as `sudo xcode-select -switch /Applications/Xcode_14.1.0.app`.

Depending on the stage's build infrastructure, a **Run** step can use binaries that exist in the build environment or pull an image, such as a public or private Docker image, that contains the required binaries.

* [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md): Image always required.
* [Local runner build infrastructure](../set-up-build-infrastructure/define-a-docker-build-infrastructure.md): Image always required.
* [Self-hosted cloud provider VM build infrastructure](/docs/category/set-up-vm-build-infrastructures): **Run** steps can use binaries that you've made available on your build VMs. An image is required if the VM doesn't have the necessary binaries.
* [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md): **Run** steps can use binaries available on Harness Cloud machines, as described in the [image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). An image is required if the machine doesn't have the binary you need.

## Requirements

This topic assumes you are familiar with the following:

* [CI pipeline basics](../../ci-quickstarts/ci-pipeline-basics.md)
* [CI Build Stage Settings](../set-up-build-infrastructure/ci-stage-settings.md)
* [Creating and configuring codebases for CI pipelines](../codebase-configuration/create-and-configure-a-codebase.md)

You need a CI pipeline to which you can add the **Run** step.

<details>
<summary>Prepare your pipeline</summary>

You need a CI pipeline with a **Build** stage that is connected to your codebase. If you haven't created a pipeline before, try one of the [CI pipeline tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md).

To add a **Build** stage to an existing pipeline:
1. Go to the pipeline you want to edit.
2. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
3. Enter a **Stage Name**, enable **Clone Codebase**, and then select **Set Up Stage**.
4. Select the **Infrastructure** tab and [set up the build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure).

To check codebase configuration for existing pipelines, select **Codebase** while viewing the pipeline in the Pipeline Studio. For more information about codebase configuration, go to [Edit Codebase Configuration](../codebase-configuration/create-and-configure-a-codebase.md).

</details>

## Add the Run step

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```

1. Go to the **Build** stage in the pipeline where you want to add the **Run** step.
2. Select **Add Step**, select **Add Step** again, and then select **Run** in the Step Library.
3. Enter a **Name** and optional **Description**.
4. Depending on the stage's build infrastructure, specify the **Container Registry** and **Image** containing the binaries that the step needs to run your script. For example, a cURL script may require a cURL image, such as `curlimages/curl:7.73.0`. For information about when these fields are required and how to specify images, go to the [Run step settings reference](./run-step-settings.md).
5. Select the **Shell** type and input your script in the **Command** field.
6. Populate other [Run step settings](./run-step-settings.md) as necessary. For example:

   * If your script runs tests, you might specify **Report Paths**.
   * If your script requires a token or secret, you might need to supply the token as an **Environment Variable**.
   * If you script produces an output variable value, you must declare the variable name in **Output Variables**.

7. Select **Apply Changes** to save the step, and then select **Save** to save the pipeline.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML">
```

In Harness, go to the pipeline where you want to add the `Run` step. In the `CI` stage, add a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings).

For all build infrastructures, you must specify `type`, `name`, `identifier`, `shell`, and `command`. The following examples shows the minimum settings for a `Run` step.

```yaml
              - step:
                  type: Run
                  name: Run pytest # Specify a name for the step.
                  identifier: Run_pytest # Define a step ID, usually based on the name.
                  spec:
                    shell: Sh
                    command: |-
                      # Enter commands/script.
```

Depending on your build infrastructure and the commands you are running, `connectorRef` and `image` might be required. These settings define a container registry connector and image containing the binaries that the step needs to run your script. For example, a cURL script might require a cURL image, such as `curlimages/curl:7.73.0`. For information about when these settings are required and how to specify images, go to the [Run step settings reference](./run-step-settings.md).

The following example shows a `Run` step with `connectorRef` and `image`.

```yaml
              - step:
                  type: Run
                  name: Run pytest # Specify a name for the step.
                  identifier: Run_pytest # Define a step ID, usually based on the name.
                  spec:
                    connectorRef: account.harnessImage # Specify a container registry, if required.
                    image: python:latest # Specify an image, if required.
                    shell: Sh
                    command: |-
                      # Enter a command or script.
```

Define other [Run step settings](./run-step-settings.md) as necessary. For example:

* If your script runs tests, you might specify `reports`.
* If your script requires a token or secret, you might need to supply the token in `envVariables`.
* If your script produces an output variable value, you must declare the variable name in `outputVariables`.

The following example includes `reports` settings and commands that run `pytest` with code coverage.

```yaml
              - step:
                  type: Run
                  name: Run pytest # Specify a name for the step.
                  identifier: Run_pytest # Define a step ID, usually based on the name.
                  spec:
                    connectorRef: account.harnessImage # Specify a container registry, if required.
                    image: python:latest # Specify an image, if required.
                    shell: Sh
                    command: |-
                      echo "Welcome to Harness CI"
                      uname -a
                      pip install pytest
                      pip install pytest-cov
                      pip install -r requirements.txt

                      pytest -v --cov --junitxml="result.xml" test_api.py test_api_2.py test_api_3.py

                      echo "Done"
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/*.xml"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run the Pipeline

Select **Run** to run the pipeline. Depending on your codebase configuration, you may need to specify a branch or tag.

While the build runs, you can observe the step logs on the [Build details page](../viewing-builds.md).

After the pipeline runs, you can [view test reports](../set-up-test-intelligence/viewing-tests.md) on the **Tests** tab of the Build details page.

![](./static/run-a-script-in-a-ci-stage-529.png)

:::tip

For an example of a **Run** step that runs tests and produces test reports, go to the [Code coverage with CodeCov in Harness CI tutorial](/tutorials/ci-pipelines/test/codecov).

:::
