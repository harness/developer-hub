---
sidebar_position: 3
description: This build automation guide walks you through building and testing a Java HTTP server application in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
---

# Build, test, and publish a Docker Image for a Java HTTP server application

In this tutorial, you will create a Harness CI pipeline for a Java HTTP server application that will:
1. Build and test the application.
2. Publish a Docker image.
3. Pull the published Docker image, then pull and run it as a [Background step](../../docs/continuous-integration/ci-technical-reference/background-step-settings.md).
4. Run a connectivity test against the running application.

:::tip

For a comprehensive guide on application testing, Harness provides O'Reilly's **Full Stack Testing** book for free at https://harness.io/resources/oreilly-full-stack-testing.

:::

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
       If you are signing in to Harness for the first time, select the <strong>Continuous Integration</strong> module after your initial sign in. This brings you to the <strong>Get Started</strong> wizard.
     </TabItem>
     <TabItem value="existingaccount" label="Existing account">
       If you have an existing Harness account, either create a new project or select an existing project, and then select the <strong>Continuous Integration</strong> module. In the <strong>Project</strong> pane, expand the <strong>Project Setup</strong> menu, and then select <strong>Get Started</strong>.
     </TabItem>
   </Tabs>
   ```
3. When you are prompted to select a repository, search for **jhttp**, select the repository that you forked in the earlier step, and then select **Configure Pipeline**.
4. Select **Starter Pipeline**, and then select **Create Pipeline**.

### Docker Hub connector

You will need a [Docker Hub](https://hub.docker.com/) connector. This connector will be used to authenticate and publish the Java HTTP server image to your Docker Hub account.

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

### Modify pipeline

Select **Pipelines** from the menu on the left, then select your **jhttp** pipeline from the list.

Switch from the **Visual** view to the **YAML** view, and then select **Edit YAML**.

You will see your starter pipeilne was created with a single stage, it should look similar to this:

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

This configuration expects the Docker Hub connector ID to be `Docker_Hub`. If your connector ID is different, replace `Docker_Hub` with the correct ID.

:::

Click the **Save** button in the YAML editor.

## Run your pipeline

1. In the **Pipeline Studio**, select **Run**.
2. Enter your Docker Hub username in the `DOCKERHUB_USERNAME` field.
2. Select **Git Branch** as the **Build Type**, and then enter `main` in the **Branch Name** field.
3. Select **Run Pipeline**.
4. Observe each step of the pipeline execution. When the first stage completes, test results appear in the **Tests** tab.

   When the second stage completes, you should see the successful `curl` command in the **Test Connection to Java HTTP Server** step.
