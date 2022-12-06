---
sidebar_position: 3
description: This build automation guide walks you through building and testing a Java HTTP server application in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
---

# Build, test, and publish a Docker Image for a Java HTTP server application

In this tutorial, you will build, test, and publish a Docker image for a Java HTTP server application, and then run a connectivity test using the published image.

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
   You should now see the **Execution** tab for your pipeline.

### Add a run tests step

This step runs the application's unit tests.

1. Select **Add Step**. The **Step Library** dialog appears. Select **Run Tests** from the list.
2. From the **Language** menu, select **Java**.
3. From the **Build Tool** menu, select **Maven**.
4. In the **Build Arguments** field, enter `test`.
5. In the **Packages** field, enter `io.harness.`.
6. Under **Test Report Paths**, select **+ Add**, and then enter `**/*.xml` in the provided field.

   :::info

   `**/*.xml` finds all JUnit XML formatted files that the tests generate.

   :::

7. In the **Post-Command** field, enter `mvn package -DskipTests`.
8. Expand the **Additional Configuration** section, select the **Container Registry** field, and then either select an existing [Docker Hub](https://hub.docker.com/) connector or create one.
9. In the **Image** field, enter`maven:3.5.2-jdk-8-alpine`.
10. Ensure that **Run only selected tests** is selected.
11. In the **Timeout** field, enter `30m`.
12. Select **Apply Changes**.

### Add a Docker build and publish step

This step packages the application as a Docker image and publishes the image to Docker Hub.

1. Select **Add Step**. In the **Step Library** dialog, select **Build and Push an image to Docker Registry** from the list.
2. Select the **Docker Connector** field, and then either select an existing [Docker Hub](https://hub.docker.com/) connector or create one.

   :::tip

   Since your pipeline will publish the image to your Docker Hub account, your connector needs an access token with **Read, Write, Delete** permissions.

   :::

3. In the **Docker Repository** field, enter `your_user/jhttp`. Replace `your_user` with your Docker Hub username.
4. Under **Tags**, select **+ Add**. A new field appears.

5. Select the icon on the right side of the field, and then select **Expression**.
6. Start to type `<+pipeline.` in the field to see suggestions for all available expressions. Select `sequenceId`. The field should now contain `<+pipeline.sequenceId>`.

   :::info

   `<+pipeline.sequenceId>` is a value provided at pipeline execution time. This value matches the pipeline sequence number, which is unique to each pipeline execution.

   This ensures that the resulting Docker image always has a unique tag.

   :::

7. Select **Apply Changes**.

### Add an integration tests stage

This separate pipeline stage pulls the Docker image that was published in the previous step, runs it as a [Background step](/docs/continuous-integration/ci-technical-reference/background-step-settings), and verifies that the container started successfully.

1. In the **Pipeline Studio**, select **Add Stage**, and then select **Build**.

2. In the **Stage Name** field, enter `Run Connectivity Test`, and then select **Set Up Stage**.

:::tip performance tip

The steps in this stage do not require code from the Git repository. To save time in each pipeline execution, disable **Clone Codebase**.

:::

3. On the **Infrastructure** tab, select **Propagate from an existing stage**, select the previous stage from the drop-down menu, and then select **Continue**.

### Add a background step

This background step runs the Docker image that was published in the previous stage.

1. Select **Add Step**. In the **Step Library** dialog, select **Background** from the list.
2. In the **Name** field, enter `Run Java HTTP Server`.
3. Expand the **Additional Configuration** section, select the **Container Registry** field, and then select your Docker Hub connector.
4. In the **Image** field, etner `your_user/jhttp:<+pipeline.sequenceId>`. Replace `your_user` with your Docker Hub username.
5. Under **Port Bindings**, select **+ Add**, and then enter `8888` in the **Host Port** and **Container Port** fields.

   :::info

   This exposes port `8888` from the running container to the host operating system. This allows the connection test step to reach the application at `localhost:8888`.

   :::

6. Select **Apply Changes**.

### Add a connection test step

This step runs a connection test from the host operating system to verify that the application started successfully.

1. Select **Add Step**. On the **Step Library** dialog, select **Run** from the list.
2. In the **Name** field, enter `Test Connection to Java HTTP Server` .
3. In the **Command** field, enter the following command:

   ```
   until curl --max-time 1 http://localhost:8888; do
     sleep 2;
   done
   ```

   :::info

   This simple connectivity test attempts to reach the service every two seconds until it is successful.

   :::

4. Select **Apply Changes**, and then select **Save**.

   :::tip

   With the application up and running, many types of tests are possible: integration, security, performance, and more.

   :::

### Optional YAML configuration

If you switch from **Visual** to **YAML** in the Pipeline Studio, your pipeline should look similar to this:

<details><summary>Click to expand</summary>
<p>

```yaml
pipeline:
  name: Build jhttp
  identifier: Build_jhttp_XYZ123
  projectIdentifier: Default_Project_XYZ123
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
                  type: RunTests
                  name: Run Tests
                  identifier: RunTests
                  spec:
                    connectorRef: docker_hub
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
                    connectorRef: docker_hub
                    repo: your_user/jhttp
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
                    connectorRef: docker_hub
                    image: your_user/jhttp:<+pipeline.sequenceId>
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
  properties:
    ci:
      codebase:
        connectorRef: account.Github_OAuth_XYZ123
        repoName: your_user/jhttp
        build: <+input>
```

</p>
</details>

## Run your pipeline

1. In the **Pipeline Studio**, select **Run**.
2. Select **Git Branch** as the **Build Type**, and then enter `main` in the **Branch Name** field.
3. Select **Run Pipeline**.
4. Observe each step of the pipeline execution. When the first stage completes, test results appear in the **Tests** tab. When the second stage completes, you should see the successful `curl` command in the final step.
