---
sidebar_position: 3
title: Java application
description: Use a CI pipeline to build and test a Java application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/java
---

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test a Java application using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Install dependencies

Use [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.
```yaml
              - step:
                   type: Run
                   name: build
                   identifier: build
                   spec:
                     connectorRef: account.harnessImage
                     image: maven:3.8-jdk-11
                     shell: Sh
                     command: |-
                       mvn clean package dependency:copy-dependencies
                   - step:
                       type: Run
                       name: check dependencies
                       identifier: check_dependencies
                       spec:
                         connectorRef: account.harnessImage
                         image: maven:3.8-jdk-11
                         shell: Sh
                         command: |-
                           mvn dependency-check:check -U -DskipTests
                         reports:
                           type: JUnit
                           spec:
                             paths:
                               - /harness/target/*.xml
```

:::tip

In addition to Run steps, [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) are also useful for installing dependencies.

You can use [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to run dependent services that are needed by multiple steps in the same stage.

:::

## Cache dependencies

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud" default>
```

Cache your Java dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence). Add `caching.enabled.true` to your `stage.spec`.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

With self-hosted build infrastructures, you can:

* [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
* [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

:::info Maven cache key and path requirements

If you're using Maven, you must reference `pom.xml` in the `key` value for your **Save Cache** and **Restore Cache** steps, for example:

```yaml
                  spec:
                    key: cache-{{ checksum "pom.xml" }}
```

Additionally, you must include `/root/.m2` in the `sourcePaths` for your **Save Cache** step, for example:

```yaml
                  spec:
                    sourcePaths:
                      - /root/.m2
```

:::

Here's an example of a pipeline with **Save Cache to S3** and **Restore Cache from S3** steps.

```yaml
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "pom.xml" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: BuildAndPushDockerRegistry
                  ...
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "pom.xml" }}
                    sourcePaths:
                      - /root/.m2
                    archiveFormat: Tar
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Build and run tests

```mdx-code-block
<Tabs>
<TabItem value="hosted" label="Harness cloud" default>
```

You can use **Run** or **Run Tests** steps to [run tests in CI pipelines](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
<TabItem value="run" label="Run step" default>
```

This example uses two [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to build and test with Maven.

```yaml
              - step:
                   type: Run
                   name: build
                   identifier: build
                   spec:
                     shell: Sh
                     command: |
                       mvn clean package dependency:copy-dependencies
              - step:
                  type: Run
                  name: run test
                  identifier: run_test
                  spec:
                    shell: Sh
                    command: |-
                      mvn test
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - target/surefire-reports/*.xml
```

```mdx-code-block
</TabItem>
<TabItem value="runtests" label="Run Tests step (Test Intelligence)">
```

You must use the **Run Tests** step for your unit tests if you want to leverage Harness' [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence) feature.

Where Run steps use the `command` field for all commands, the Run Tests step uses `preCommand`, `args`, and `postCommand` to set up the environment before testing, pass arguments for the test tool, and run any post-test commands. For example, you could declare dependencies or install test tools in `preCommand`.

The following example runs `mvn test` (declared in `args`), and then runs `mvn package -DskipTests` as a `postCommand`.

```yaml
              - step:
                  type: RunTests
                  name: Run Tests
                  identifier: Run_Tests
                  spec:
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
                          - "target/surefire-reports/*.xml"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
<TabItem value="selfhosted" label="Self-hosted">
```

You can use **Run** or **Run Tests** steps to [run tests in CI pipelines](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
<TabItem value="run" label="Run step" default>
```

This example uses two [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to build and test with Maven.

```yaml
              - step:
                   type: Run
                   name: build
                   identifier: build
                   spec:
                     connectorRef: account.harnessImage
                     image: maven:3.8-jdk-11
                     shell: Sh
                     command: |
                       mvn clean package dependency:copy-dependencies
              - step:
                  type: Run
                  name: run test
                  identifier: run_test
                  spec:
                    shell: Sh
                    command: |-
                      mvn test
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - target/surefire-reports/*.xml
```

```mdx-code-block
</TabItem>
<TabItem value="runtests" label="Run Tests step (Test Intelligence)">
```

You must use the **Run Tests** step for your unit tests if you want to leverage Harness' [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence) feature.

Where Run steps use the `command` field for all commands, the Run Tests step uses `preCommand`, `args`, and `postCommand` to set up the environment before testing, pass arguments for the test tool, and run any post-test commands. For example, you could declare dependencies or install test tools in `preCommand`.

The following example runs `mvn test` (declared in `args`), and then runs `mvn package -DskipTests` as a `postCommand`.

```yaml
              - step:
                  type: RunTests
                  name: Run Tests
                  identifier: Run_Tests
                  spec:
                    connectorRef: account.harnessImage
                    image: maven:3.8-jdk-11
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
                          - "target/surefire-reports/*.xml"
```

```mdx-code-block
</TabItem>
</Tabs>
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification.

```yaml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - target/surefire-reports/*.xml
```

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Java is pre-installed on Hosted Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If your application requires a specific version of Java, you can use a **Run** or **Plugin** step to install it.

This example uses the [GitHub Action plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step) to run the `setup-java` action.

```yaml
              - step:
                  type: Action
                  name: setup java
                  identifier: setup_java
                  spec:
                    uses: actions/setup-java@v3
                    with:
                      distribution: 'temurin'
                      java-version: '16'
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

You can use a **Run** or **Plugin** step to install Java versions that are not already installed on your host machine.

This example uses the [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie) to run the GitHub Actions Drone plugin and run the `setup-java` action.

```yaml
              - step:
                  identifier: setup_java
                  name: setup java
                  type: Plugin
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/github-actions
                    privileged: true
                    settings:
                      uses: actions/setup-java@v3
                      with:
                        distribution: 'temurin'
                        java-version: '17'
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Full pipeline examples

Here's a YAML example of a pipeline that:

1. Tests a Java code repo.
2. Builds and pushes an image to Docker Hub.

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence), and [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your Harness project, connector IDs, account/user names, and repo names.

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  name: Build java
  identifier: Build_java
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
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
                          - "target/surefire-reports/*.xml"
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    repo: YOUR_DOCKER_HUB_USERNAME/DOCKER_REPO_NAME
                    tags:
                      - <+pipeline.sequenceId>
```

</details>

## Next steps

Now that you have created a pipeline that builds and tests a Java app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).
