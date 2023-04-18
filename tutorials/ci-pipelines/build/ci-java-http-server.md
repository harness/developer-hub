---
sidebar_position: 3
title: Build and test Java
description: Use a CI pipeline to build and test a Java HTTP server application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/java
---

<!-- Tabs/sections for Maven, Gradle, Ant -->

# Build, test, and publish a Java app

In this tutorial, you will create a Harness CI pipeline that does the following:

1. Build and test a Java HTTP server application.
2. Publish a Docker image.
3. Pull the published Docker image and run it as a service dependency.
4. Run a connectivity test against the running application.

## Prerequisites

In addition to a Harness account, you need the following accounts and tools:

* A **GitHub account** where you can fork the tutorial repo.
* A **DockerHub account and repo** where your pipeline can push and pull app images.

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## Create a Docker Hub connector

You need a Docker Hub connector to allow Harness to authenticate and publish the Java HTTP server image to your [Docker Hub](https://hub.docker.com/) account.

1. In Harness, select the **Continuous Integration** module, and then select an existing project or create a new project.

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

If this is your first project with CI, the CI pipeline wizard starts after you select **Go to Module**. You'll need to exit the wizard to create the Docker Hub connector.

</details>

2. Under **Project Setup**, select **Connectors**.
3. Select **New Connector**, and then select **Docker Registry**.
4. Configure the [Docker Hub connector settings](/docs/platform/connectors/ref-cloud-providers/docker-registry-connector-settings-reference/) as follows:

   * **Name:** Enter a recognizable name for the connector.
   * **Provider Type:** Select **DockerHub**.
   * **Docker Registry URL:** Enter `https://index.docker.io/v2/`.
   * **Username:** Enter the username for your Docker Hub account.
   * **Password:** Create a [secret](/docs/platform/security/add-use-text-secrets/) for a Docker Hub Personal Access Token that Harness can use to access your Docker Hub account. The token must have **Read, Write, Delete** permissions.
   * **Select Connectivity Mode:** Select **Connect through Harness Platform**.
   * Select **Save and Continue**, wait for the connectivity test to run, and then select **Finish**.

5. In the list of connectors, make a note of your Docker Hub connector's ID.

## Create a Java starter pipeline

1. Fork the [jhttp app tutorial repository](https://github.com/harness-community/jhttp) into your GitHub account.
2. In Harness, select the **Continuous Integration** module, and select the project you want to use for this tutorial.
3. Under **Project Setup**, select **Get Started**.
4. When prompted to select a repository, search for **jhttp**, select the repository that you forked earlier, and then select **Configure Pipeline**. If your GitHub account isn't connected to your Harness account or project, you need to [add a GitHub connector](/docs/platform/Connectors/add-a-git-hub-connector).
4. Under **Choose a Starter Configuration**, select **Java with Maven** and then select **Create a Pipeline**.

A pipeline is generated with the following YAML. To view the YAML, select **YAML** at the top of the Pipeline Studio.

```yaml
pipeline:
  name: Build Java with Maven
  identifier: Build_Java_with_Maven_1681845696844
  projectIdentifier: [your-project-ID]
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: [your-github-connector]
        repoName: [your-github-account]/jhttp
        build: <+input>
  stages:
    - stage:
        name: Build Java App with Maven
        identifier: Build_Java_App_with_Maven
        description: ""
        type: CI
        spec:
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
                  type: Run
                  name: Build Java App
                  identifier: Build_Java_App
                  spec:
                    shell: Sh
                    command: |-
                      echo "Welcome to Harness CI"
                      mvn -B package --file pom.xml
```

<details>
<summary>Option: Change the build infrastructure</summary>

This pipeline uses a Linux AMD64 machine on Harness Cloud build infrastructure, as declared in the stage's `platform` specifications.

```yaml
    - stage:
        ...
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

You can change the build infrastructure if you want to use a different OS, arch, or infrastructure. For more information, go to [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

</details>

## Add a pipeline variable

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
1. Select **Apply Changes**.

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

## Run initial tests

Add a step to run tests against the JHTTP app code. This portion of the tutorial uses a [Run Tests step](/docs/continuous-integration/ci-technical-reference/configure-run-tests-step-settings.md) so that the pipeline can benefit from Harness' [Test Intelligence](/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts) feature. Later in this tutorial, a Run step is used to run a connectivity test script. To learn more, go to [Run tests in CI pipelines](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In the Pipeline Studio, select the **Build Java App with Maven** stage.
2. Remove the **Build Java App** step.
3. Select **Add Step** and add a **Run Tests** step configured as follows. Some settings are found under **Additional Configuration**.

   * **Language:** Select **Java**.
   * **Build Tool:** Select **Maven**.
   * **Maven setup:** Select **No**.
   * **Build Arguments:** Enter `test`.
   * **Test Report Paths:** Select **Add** and enter `**/*.xml`.
   * **Post-Command:** Enter `mvn package -DskipTests`.
   * **Packages:** Enter `io.harness`.
   * **Container Registry:** Select your Docker Hub connector.
   * **Image:** Enter `maven:3.5.2-jdk-8-alpine`.
   * **Run only selected tests:** This must be selected to enable Test Intelligence.
   * **Timeout:** Enter `30m`.

4. Select **Apply Changes**.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

In the YAML editor, replace the `Build Java App` run step block with the following. Replace the bracketed value with your [Docker Hub connector](#create-a-docker-hub-connector) ID.

```yaml
              - step:
                  type: RunTests
                  name: Run Tests
                  identifier: RunTests
                  spec:
                    connectorRef: [your-Docker-Hub-connector-ID]
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

```mdx-code-block
  </TabItem>
</Tabs>
```

## Build and push an image to Docker Hub

Add a step to build an image of the JHTTP app and push it to Docker Hub. While this tutorial uses a [Build and Push an image to Docker Registry step](/docs/continuous-integration/ci-technical-reference/build-and-push-steps/build-and-push-to-docker-hub-step-settings), Harness has a variety of options for [building and uploading artifacts](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In your Docker Hub account, create a repo called `jhttp`.
2. In Harness, in the **Build Java App with Maven** stage, select **Add Step** and add a **Build and Push an image to Docker Registry** step configured as follows.

   * **Docker Connector:** Select your Docker Hub connector.
   * **Docker Repository:** Enter `<+pipeline.variables.DOCKERHUB_USERNAME>/jhttp`
   * **Tags:** Select **Add** and enter `<+pipeline.sequenceId>`.

3. Select **Apply Changes**.

Notice the following about this step:

* The **Docker Repository** value calls the [pipeline variable](#add-a-pipeline-variable) you created earlier.
* The **Tag** value is an expression that uses the build ID as the image tag. Each time the pipeline runs, the build ID increments, creating a unique image tag for each run.


```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```
1. In your Docker Hub account, create a repo called `jhttp`.
2. In Harness, add the following `step` block to the `Build Java App with Maven` stage. Replace the bracketed value with your [Docker Hub connector](#create-a-docker-hub-connector) ID.

```yaml
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and Push an image to Docker Registry
                  identifier: BuildandPushanimagetoDockerRegistry
                  spec:
                    connectorRef: [your-Docker-Hub-connector-ID]
                    repo: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp
                    tags:
                      - <+pipeline.sequenceId>
```

Notice the following about this step:

* The `repo` value calls the [pipeline variable](#add-a-pipeline-variable) you created earlier.
* The `tag` value is an expression that uses the build ID as the tag. Each time the pipeline runs, the build ID increments, creating a unique image tag for each run.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run the app as a service

You can use [Background steps](/docs/continuous-integration/ci-technical-reference/background-step-settings) to run services needed by other steps in the same stage. This tutorial uses a **Background** step to run the JHTTP app so that a **Run** step can run a connection test against the app.

Harness offers several options for [managing dependencies](/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies), including automated caching through [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

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

5. Select **Apply Changes**.

Notice that the **Image** value uses an expression that generates the image path by calling your [pipeline variable](#add-a-pipeline-variable) and the build ID expression, which was used as the **Tag** in the **Build and Push an image to Docker Registry** step.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add the following code block to the end of your pipeline YAML. Replace the bracketed value with your [Docker Hub connector](#create-a-docker-hub-connector) ID.

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
                    connectorRef: [your-Docker-Hub-connector-ID]
                    image: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp:<+pipeline.sequenceId>
                    shell: Sh
                    portBindings:
                      "8888": "8888"
```

This code block does the following:

* `stage` - Adds a second `CI` stage to the pipeline.
* `cloneCodebase: false` - This stage does not need to clone the GitHub repo because it will use the app image that was built and pushed to Docker Hub in the first stage.
* `platform` - The stage uses the same build infrastructure as the first stage.
* `step` - Adds a `Background` step that runs the JHTTP app image.
* `image` - This value uses an expression that generates the image path by calling your [pipeline variable](#add-a-pipeline-variable) and the build ID expression, which was used as the `tag` value in the `Build and Push an image to Docker Registry` step.

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run the connectivity test

Add a [Run step](/docs/continuous-integration/ci-technical-reference/run-step-settings.md) to run a connectivity test script against the JHTTP app. To learn more, go to [Run tests in CI pipelines](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In your second **Build** stage, add a **Run** step.
2. For **Shell**, select **Sh**.
3. Enter the following code in the **Command** field:

```
until curl --max-time 1 http://localhost:8888; do
  sleep 2;
done
```

4. Select **Apply Changes**.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

In the YAML editor, add the following `step` block after the `Background` step block.

```yaml
              - step:
                  type: Run
                  name: Test Connection to Java HTTP Server
                  identifier: Test_Connection_to_Java_HTTP_Server
                  spec:
                    shell: Sh
                    command: |-
                      until curl --max-time 1 http://localhost:8888; do
                        sleep 2;
                      done
```

```mdx-code-block
  </TabItem>
</Tabs>
```


<details>
<summary>Option: Use Gradle</summary>
content in md format
</details>

<details>
<summary>Option: Use Ant</summary>
content in md format
</details>




<!-- Compare w/ GH Actions, CircleCI docs.

configure environment/dependencies-->



## Run the pipeline

1. In the **Pipeline Studio**, save your pipeline and then select **Run**.
2. Enter your Docker Hub username in the **DOCKERHUB_USERNAME** field.
3. In the **Build Type** field, select **Git Branch**, and then enter `main` in the **Branch Name** field.
4. Select **Run Pipeline**.

While the build runs you can observe each step of the pipeline execution on the [Build details page](/docs/continuous-integration/use-ci/view-your-builds/viewing-builds.md). When the first stage completes, test results appear on the **Tests** tab.

When the second stage completes, you should see the successful `curl` command in the connectivity test step's logs.

:::tip

For a comprehensive guide on application testing, Harness provides O'Reilly's **Full Stack Testing** book for free at https://harness.io/resources/oreilly-full-stack-testing.

:::

## Reference: Pipeline YAML

Here is the YAML for this tutorial's entire pipeline.

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  name: Build Java with Maven
  identifier: Build_Java_with_Maven_1681845696844
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
        name: Build Java App with Maven
        identifier: Build_Java_App_with_Maven
        description: ""
        type: CI
        spec:
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
                    connectorRef: [your-Docker-Hub-connector-ID]
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
                    connectorRef: [your-Docker-Hub-connector-ID]
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
                    connectorRef: [your-Docker-Hub-connector-ID]
                    image: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp:<+pipeline.sequenceId>
                    shell: Sh
              - step:
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Sh
                    command: |-
                      until curl --max-time 1 http://localhost:8888; do
                        sleep 2;
                      done
```

</details>
