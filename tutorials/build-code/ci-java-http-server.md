---
sidebar_position: 3
description: This build automation guide walks you through building and testing a Java HTTP server application in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
---

# Build, test, and publish a Docker Image for a Java HTTP server application

In this tutorial, you will create a Harness CI pipeline for a Java HTTP server application that does the following:
1. Build and test the application.
2. Publish a Docker image.
3. Pull the published Docker image, then pull and run it as a [Background step](/docs/continuous-integration/ci-technical-reference/background-step-settings).
4. Run a connectivity test against the running application.

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## Create your pipeline

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

1. Fork the repository https://github.com/keen-software/jhttp into your GitHub account.
2. Follow the **Get Started** wizard in Harness CI.

```mdx-code-block
<Tabs>
<TabItem value="newaccount" label="New account" default>
```
[Sign up](https://app.harness.io/auth/#/signup/?module=ci&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started) for a new Harness account. Select the **Continuous Integration** module after your initial sign in. This brings you to the **Get Started** wizard.
```mdx-code-block
</TabItem>
<TabItem value="existingaccount" label="Existing account">
```
[Log in](https://app.harness.io/auth/#/signin) to your Harness account. You can either create a new project or select an existing project, and then select the **Continuous Integration** module. In the **Project** pane, expand the **Project Setup** menu, and then select **Get Started**.
```mdx-code-block
</TabItem>
</Tabs>
```

3. When you are prompted to select a repository, search for **jhttp**, select the repository that you forked in the earlier step, and then select **Configure Pipeline**.
4. Select **Starter Pipeline**, and then select **Create Pipeline**.

### Docker Hub connector

You need a [Docker Hub](https://hub.docker.com/) connector. This connector is used to authenticate and publish the Java HTTP server image to your Docker Hub account.

If you have not created a Docker Hub connector yet, follow these steps.

<details><summary>Create connector</summary>
<p>

```mdx-code-block
import DockerHubConnector from '/tutorials/shared/dockerhub-connector-includes.md';
```

<DockerHubConnector />

</p>
</details>

:::info

Your connector needs an access token with **Read, Write, Delete** permissions.

:::

### Modify the pipeline

From the left pane, select **Pipelines**, and then select your **jhttp** pipeline from the list.

Switch from the **Visual** view to the **YAML** view, and then select **Edit YAML**.

A starter pipeline is created with a single stage. It should look similar to this:

```yaml
pipeline:
  name: Build jhttp
  identifier: Build_jhttp
  orgIdentifier: default
  // highlight-start
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
                  identifier: Run
                  spec:
                    shell: Sh
                    command: echo "Welcome to Harness CI"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  // highlight-end
  properties:
    ci:
      codebase:
        connectorRef: account.Github_OAuth
        repoName: your_user/jhttp
        build: <+input>
```

Replace the sample `stages` section with the following `variables` and `stages` sections:

```yaml
  variables:
    - name: DOCKERHUB_USERNAME
      type: String
      description: Your Docker Hub username
      value: <+input>
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
                  type: RunTests
                  name: Run Tests
                  identifier: RunTests
                  spec:
                    connectorRef: Docker_Hub
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
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and Push an image to Docker Registry
                  identifier: BuildandPushanimagetoDockerRegistry
                  spec:
                    connectorRef: Docker_Hub
                    repo: <+pipeline.variables.DOCKERHUB_USERNAME>/jhttp
                    tags:
                      - <+pipeline.sequenceId>
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
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
                    connectorRef: Docker_Hub
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
                      until curl --max-time 1 http://localhost:8888; do
                        sleep 2;
                      done
```

:::info

This configuration requires the Docker Hub connector ID to be `Docker_Hub`. If your connector ID is different, replace `Docker_Hub` with the correct ID.

:::

Select **Save** in the YAML editor.

## Run your pipeline

1. In the **Pipeline Studio**, select **Run**.
2. Enter your Docker Hub username in the `DOCKERHUB_USERNAME` field.
2. In the **Build Type** field, select **Git Branch**, and then enter **main** in the **Branch Name** field.
3. Select **Run Pipeline**.
4. Observe each step of the pipeline execution. When the first stage completes, test results appear on the **Tests** tab.

   When the second stage completes, you should see the successful `curl` command in the **Test Connection to Java HTTP Server** step.

:::tip

For a comprehensive guide on application testing, Harness provides O'Reilly's **Full Stack Testing** book for free at https://harness.io/resources/oreilly-full-stack-testing.

:::