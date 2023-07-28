<!-- This is a backup of the more detailed version of the CI Java app tutorial in case we need to recover it -->

<!-- ---
sidebar_position: 3
title: Java application
description: Use a CI pipeline to build and test a Java HTTP server application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/java
--- -->

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
# Build and test Java apps

This guide explains how you can build and test Java apps with Harness CI.

The examples in this guide use a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructures.

This guide assumes you've created a Harness CI pipeline. For more information, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Prepare the codebase

1. Fork the [jhttp app tutorial repository](https://github.com/harness-community/jhttp) into your GitHub account.
2. Create a GitHub personal access token with the `repo`, `admin:repo_hook`, and `user` scopes. For instructions, go to the GitHub documentation on [creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). For information about the token's purpose in Harness, go to the [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference#personal-access-token).
3. Copy the token so you can use it when you create the GitHub connector in the next steps.
4. In Harness, select the **Continuous Integration** module and then switch to the **Project** you want to use for this tutorial or create a project.

<details>
<summary>Create a project</summary>

Use these steps to create a project in your Harness account.

1. Select **Projects**, select **All Projects**, and then select **New Project**.
2. Enter a **Name**, such as `CI tutorials`.
3. Leave the **Organization** as **default**.
4. Select **Save and Continue**.
5. On **Invite Collaborators**, you can add others to your project, if desired. You don't need to add yourself.
6. Select **Save and Continue**.
7. On the Modules page, select **Continuous Integration**, and then select **Go to Module**.

If this is your first project with CI, the CI pipeline wizard starts after you select **Go to Module**. You'll need to exit the wizard to create the GitHub connector.

</details>

### Create the GitHub connector

Next, you'll create a _connector_ that allows Harness to connect to your Git codebase. A connector is a configurable object that connects to an external resource automatically while the pipeline runs. For more information, go to the [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference).

1. Under **Project Setup**, select **Connectors**.
2. Select **New Connector**, and then select **GitHub** under **Code Repositories**.
3. Enter a **Name**, and select **Continue**.
4. Configure the **Details** as follows, and then select **Continue**:

   * **URL Type:** Select **Repository**.
   * **Connection Type:** Select **HTTP**.
   * **GitHub Repository URL:** Enter the URL to your fork of the tutorial repo.

5. Configure the **Credentials** as follows, and then select **Continue**:

   * **Username:** Enter the username for the GitHub account where you forked the tutorial repo.
   * **Personal Access Token:** Create a secret for the personal access token you created earlier. Harness secrets are safe; they're stored in the [Harness Secret Manager](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview). You can also use your own Secret Manager with Harness.
   * **Enable API access:** Select this option and select the same personal access token secret.

6. For **Select Connectivity Mode**, select **Connect through Harness Platform**, and then select **Save and Continue**.
7. Wait while Harness tests the connection, and then select **Finish**.

## Prepare the Docker registry

For this tutorial, you'll need a Docker connector to allow Harness to authenticate and publish the Java HTTP app image to a Docker registry repository. This tutorial uses Docker Hub for the Docker registry, but you can use other Docker registries with Harness.

1. Create a [Docker Hub](https://hub.docker.com/) account if you don't have one already.
2. Create a repo called `jhttp` in your Docker Hub account.
3. Create a Docker Hub personal access token with **Read, Write, Delete** permissions. Copy the token; you need it when you create the Docker Hub connector in the next steps.
4. In Harness, select the **Continuous Integration** module, and then select your project.
5. Under **Project Setup**, select **Connectors**.
6. Select **New Connector**, and then select **Docker Registry**.
7. Configure the [Docker connector settings](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) as follows:

   * **Name:** Enter a name.
   * **Provider Type:** Select **Docker Hub**.
   * **Docker Registry URL:** Enter `https://index.docker.io/v2/`.
   * **Username:** Enter the username for your Docker Hub account.
   * **Password:** Create a [secret](/docs/platform/Secrets/add-use-text-secrets) for your Docker Hub personal access token.
   * **Select Connectivity Mode:** Select **Connect through Harness Platform**.
   * Select **Save and Continue**, wait for the connectivity test to run, and then select **Finish**.

8. In the list of connectors, make a note of your Docker connector's ID.

## Create a pipeline

1. Under **Project Setup**, select **Get Started**.
2. When prompted to select a repository, search for **jhttp**, select the repository that you forked earlier, and then select **Configure Pipeline**.
3. Select **Generate my Pipeline configuration**, and then select **Create a Pipeline**.

**Generate my Pipeline configuration** automatically creates PR and Push triggers for the selected repository. If you want a more bare bones pipeline, select **Create empty Pipeline configuration**.

<details>
<summary>Generated pipeline YAML</summary>

The YAML for the generated pipeline is as follows. To switch to the YAML editor, select **YAML** at the top of the Pipeline Studio.

```yaml
pipeline:
  name: Build jhttp
  identifier: Build_jhttp
  projectIdentifier: [your-project-ID]
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Echo Welcome Message
                  identifier: Echo_Welcome_Message
                  spec:
                    shell: Sh
                    command: echo "Welcome to Harness CI"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  properties:
    ci:
      codebase:
        connectorRef: [your-github-connector]
        repoName: [your-github-account]/jhttp
        build: <+input>
```

</details>

### Understand the build infrastructure

If you inspect the pipeline you just created, you can see that it uses a Linux AMD64 machine on Harness Cloud build infrastructure. You can see this on the **Build** stage's **Infrastructure** tab in the visual editor, or in the stage's `platform` specification in the YAML editor.

```yaml
    - stage:
        ...
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

You can change the build infrastructure if you want to use a different OS, arch, or infrastructure. For more information on build infrastructure options, go to [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

Regardless of the build infrastructure you choose, you must ensure the build farm can run the commands required by your pipeline. For example, this tutorial uses tools that are publicly available through Docker Hub or already installed on [Harness Cloud's preconfigured machines](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

In contrast, if you choose to [use a Kubernetes cluster build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure) and your pipeline requires a tool that is not already available in the cluster, you can configure your pipeline to load those prerequisite tools when the build runs. There are several ways to do this in Harness CI, including:

* [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies) for running dependent services.
* [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) to run templated scripts, such as GitHub Actions, BitBucket Integrations, Drone plugins, and your own custom plugins.
* [Various caching options](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages) to load dependency caches.
* [Run steps](/docs/category/run-scripts) for running all manner of scripts and commands.

:::caution

You must ensure that the build farm can run the commands required by your build. You might need to modify your build machines or add steps to your pipeline to install necessary tools, libraries, and other dependencies.

:::

## Use variables

[Variables and expressions](/docs/category/variables-and-expressions) make your pipelines more versatile by allowing variable inputs and values. As an example, add a pipeline-level variable that lets you specify a Docker Hub username when the pipeline runs.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In the Pipeline Studio, select **Variables** on the right side of the Pipeline Studio.
2. Under **Pipeline**, select **Add Variable**.
3. For **Variable Name**, enter `DOCKERHUB_USERNAME`.
4. For **Type** select **String**, and then select **Save**.
5. Enter the value `<+input>`. This allows you to specify a Docker Hub username at runtime.
6. Select **Apply Changes**.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

In the YAML editor, add the following `variables` block between the `properties` and `stages` sections.

```yaml
  variables:
    - name: DOCKERHUB_USERNAME
      type: String
      description: Your Docker Hub username
      value: <+input>
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run tests

Add a step to run tests against the JHTTP app code. This portion of the tutorial uses a [Run Tests step](/docs/continuous-integration/use-ci/set-up-test-intelligence) so that the pipeline can benefit from Harness' [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence) feature. In the [Manage dependencies](#manage-dependencies) section of this tutorial, you can see an example where a Run step is used to run a connectivity test script against the app running in a [Background step](#service-dependencies). To learn more, go to [Run tests in CI pipelines](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In the Pipeline Studio, select the **Build** stage.
2. Remove the **Echo Welcome Message** step.
3. Select **Add Step** and add a **Run Tests** step configured as follows. Some settings are found under **Additional Configuration**.

   * **Language:** Select **Java**.
   * **Build Tool:** Select **Maven**.
   * **Maven setup:** Select **No**.
   * **Build Arguments:** Enter `test`.
   * **Test Report Paths:** Select **Add** and enter `**/*.xml`.
   * **Post-Command:** Enter `mvn package -DskipTests`.
   * **Packages:** Enter `io.harness`.
   * **Container Registry:** Select your Docker connector.
   * **Image:** Enter `maven:3.5.2-jdk-8-alpine`.
   * **Run only selected tests:** This must be selected to enable Test Intelligence.
   * **Timeout:** Enter `30m`.

4. Select **Apply Changes**.

:::tip

Use **Pre-Command**, **Build Arguments**, and **Post-Command** to set up the environment before testing, pass arguments for the test tool, and run any post-test commands. For example, you could declare dependencies or install test tools in **Pre-Command**.

Make sure you pull an **Image** corresponding with the test tool you're using. For example, with Bazel, you can use the Bazel image, `gcr.io/bazel-public/bazel:[VERSION]`.

You could also use **Pre-Command** to prepare the test environment. For example, you could supply commands to [install Gradle](https://gradle.org/install/).

:::

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

In the YAML editor, replace the `Echo Welcome Message` run step block with the following. Replace the bracketed value with your [Docker connector](#prepare-the-docker-registry) ID.

```yaml
              - step:
                  type: RunTests
                  name: Run Tests
                  identifier: RunTests
                  spec:
                    connectorRef: [your-Docker-connector-ID]
                    image: maven:3.5.2-jdk-8-alpine
                    language: Java
                    buildTool: Maven
                    args: test
                    packages: io.harness.
                    runOnlySelectedTests: true
                    postCommand: mvn package -DskipTests
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/*.xml"
                  timeout: 30m
```

:::tip

Use `preCommand`, `args`, and `postCommand` to set up the environment before testing, pass arguments for the test tool, and run any post-test commands. For example, you could declare dependencies or install test tools in `preCommand`.

Make sure you pull an `image` corresponding with the test tool you're using. For example, with Bazel, you can use the Bazel image, `gcr.io/bazel-public/bazel:[VERSION]`.

You could also use `preCommand` to prepare the test environment. For example, you could supply commands to [install Gradle](https://gradle.org/install/).

:::

```mdx-code-block
  </TabItem>
</Tabs>
```

## Build and push to Docker Hub

Add a step to build an image of the JHTTP app and push it to Docker Hub. While this tutorial uses a [Build and Push an image to Docker Registry step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings), Harness has a variety of options for [building and uploading artifacts](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

Add a **Build and Push an image to Docker Registry** step to the **Build** stage with the following configuration:

   * **Docker Connector:** Select your Docker connector.
   * **Docker Repository:** Enter `<+pipeline.variables.DOCKERHUB_USERNAME>/jhttp`
   * **Tags:** Select **Add** and enter `<+pipeline.sequenceId>`.

Notice the following about this step:

* The **Docker Repository** value calls the [pipeline variable](#use-variables) you created earlier.
* The **Tag** value is an [expression](/docs/platform/references/runtime-inputs/#expressions) that uses the build ID as the image tag. Each time the pipeline runs, the build ID increments, creating a unique image tag for each run.


```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add the following `step` block to the `Build` stage. Replace the bracketed value with your [Docker connector](#prepare-the-docker-registry) ID.

```yaml
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and Push an image to Docker Registry
                  identifier: BuildandPushanimagetoDockerRegistry
                  spec:
                    connectorRef: [your-Docker-connector-ID]
                    repo: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp
                    tags:
                      - <+pipeline.sequenceId>
```

Notice the following about this step:

* The `repo` value calls the [pipeline variable](#use-variables) you created earlier.
* The `tag` value is an [expression](/docs/platform/references/runtime-inputs/#expressions) that uses the build ID as the tag. Each time the pipeline runs, the build ID increments, creating a unique image tag for each run.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Manage dependencies

Harness offers several options for [managing dependencies](/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies), including Background steps and caching options.

[Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) and [Run steps](/docs/category/run-scripts) are also useful for installing dependencies.

### Use a Background step

You can use [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to run services needed by other steps in the same stage.

The following example adds a **Background** step that runs the JHTTP app as a service. The subsequent [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) can leverage the service to do things like run connection tests.

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In the upper portion of the Pipeline Studio, select **Add Stage** to add a second **Build** stage to the pipeline.
2. Enter a **Stage Name**, make sure **Clone Codebase** is *not* selected, and then select **Set Up Stage**.
3. Select the **Infrastructure** tab, select **Propagate from an existing stage**, and then select the other **Build** stage.
4. Select the **Execution** tab, select **Add Step**, and add a **Background** step configured as follows. Some settings are found under **Additional Configuration**.

   * **Shell:** Select **Sh**.
   * **Container Registry:** Select your Docker Hub connector.
   * **Image:** Enter `<+pipeline.variables.DOCKERHUB_USERNAME>/jhttp:<+pipeline.sequenceId>`
   * **Tags:** Select **Add** and enter `<+pipeline.sequenceId>`.
   * **Port Bindings:** Select **Add** and enter `8888` for both **Host Port** and **Container Port**.

   :::info

   The **Image** value uses an expression that generates the image path by calling your [pipeline variable](#use-variables) and the build ID expression, which was used as the **Tag** in the **Build and Push an image to Docker Registry** step.

   :::

5. Select **Apply Changes** to save the **Background** step.
6. Add a **Run** step after the **Background** step.
7. For **Shell**, select the relevant script type.
8. In the **Command** field, enter commands to interact with the app however you desire. For example:

   ```
   until curl https://localhost:8888; do
     sleep 2;
   done
   ```

9. Select **Apply Changes** to save the **Run** step.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add the following code block to the end of your pipeline YAML. Replace the bracketed value with your [Docker connector](#prepare-the-docker-registry) ID. You can change the `Run` step's `command` to interact with the app however you desire.
```yaml
    - stage:
        name: Run Connectivity Test
        identifier: Run_Connectivity_Test
        description: ""
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Background
                  name: Run Java HTTP Server
                  identifier: Run_Java_HTTP_Server
                  spec:
                    connectorRef: [your-Docker-connector-ID]
                    image: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp:<+pipeline.sequenceId>
                    shell: Sh
                    portBindings:
                      "8888": "8888"
              - step:
                  type: Run
                  name: Test Connection to Java HTTP Server
                  identifier: Test_Connection_to_Java_HTTP_Server
                  spec:
                    shell: Sh
                    command: |-
                      until curl https://localhost:8888; do
                       sleep 2;
                      done
```

This code block does the following:

* `stage` - Adds a second `CI` stage to the pipeline.
* `cloneCodebase: false` - This stage does not need to clone the GitHub repo because it uses the app image that was built and pushed to Docker Hub in the first stage.
* `platform` - The stage uses the same build infrastructure as the first stage.
* `step: type: Background` - Adds a `Background` step that runs the JHTTP app image.
* `step: type: Run` - Adds a `Run` step that runs a connection test against the JHTTP app.

:::info

The `image` value is an expression that generates the image path by calling your [pipeline variable](#use-variables) and the build ID expression, which was used as the `tag` value in the `Build and Push an image to Docker Registry` step.

:::

```mdx-code-block
  </TabItem>
</Tabs>
```

### Use caching

Harness CI has several caching options.

* Automated caching with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence)
* [S3 caching](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache)
* [GCS caching](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)
* [Shared Paths](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage), which you can use for temporary data sharing within a single stage
* [Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#docker-layer-caching)

## Run the pipeline

1. In the **Pipeline Studio**, save your pipeline and then select **Run**.
2. Enter your Docker Hub username in the **DOCKERHUB_USERNAME** field.
3. In the **Build Type** field, select **Git Branch**, and then enter `main` in the **Branch Name** field.
4. Select **Run Pipeline**.

While the build runs you can observe each step of the pipeline execution on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds). When the first stage completes, test results appear on the **Tests** tab.

If you used the sample cURL command in the second stage, the script may run indefinitely. Select the stop icon to terminate the build.

:::tip

For a comprehensive guide on application testing, [Harness provides O'Reilly's **Full Stack Testing** book for free](https://harness.io/resources/oreilly-full-stack-testing).

:::

## Do more with this pipeline

Now that you've created a basic pipeline for building and testing a Java app, you might want to explore the ways that you can [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times), including:

* [Using Terraform notifications to automatically start builds](/tutorials/ci-pipelines/build/tfc-notification).
* [Uploading artifacts to JFrog](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog).
* [Publishing any URL to the Artifacts tab](/tutorials/ci-pipelines/publish/artifacts-tab).
* [Including CodeCov code coverage and publishing results to your CodeCov dashboard](/tutorials/ci-pipelines/test/codecov/).
* [Updating Jira issues when builds run](/docs/continuous-integration/use-ci/use-drone-plugins/ci-jira-int-plugin).

## Reference: Pipeline YAML

Here is the complete YAML for this tutorial's pipeline. This pipeline:

* Has a stage with [Cache Intelligence](#use-caching) and steps that [run tests](#run-tests) and [build the jhttp app](#build-and-push-to-docker-hub).
* Has a stage that runs the jhttp app in a [Background step](#use-a-background-step) and then runs a connectivity test against the app.
* Uses the [Harness Cloud build infrastructure](#understand-the-build-infrastructure).

If you copy this example, make sure to replace the bracketed values with corresponding values for your Harness project, [GitHub connector ID](#create-the-github-connector), GitHub account name, and [Docker connector ID](#prepare-the-docker-registry).

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  name: Build jhttp
  identifier: Build_jhttp
  projectIdentifier: [your-project-ID]
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: [your-github-connector]
        repoName: [your-github-account]/jhttp
        build: <+input>
  variables:
    - name: DOCKERHUB_USERNAME
      type: String
      description: ""
      value: <+input>
  stages:
    - stage:
        name: Build
        identifier: Build
        description: ""
        type: CI
        spec:
          caching:
            enabled: true
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: RunTests
                  name: RunTests_1
                  identifier: RunTests_1
                  spec:
                    connectorRef: [your-Docker-connector-ID]
                    image: maven:3.5.2-jdk-8-alpine
                    language: Java
                    buildTool: Maven
                    args: test
                    packages: io.harness
                    runOnlySelectedTests: true
                    postCommand: mvn package -DskipTests
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/*.xml"
                  timeout: 30m
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: [your-Docker-connector-ID]
                    repo: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp
                    tags:
                      - <+pipeline.sequenceId>
    - stage:
        name: Connectivity test
        identifier: Connectivity_test
        description: ""
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: [your-Docker-connector-ID]
                    image: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp:<+pipeline.sequenceId>
                    shell: Sh
              - step:
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Sh
                    command: |-
                      until curl https://localhost:8888; do
                       sleep 2;
                      done
```

</details>
