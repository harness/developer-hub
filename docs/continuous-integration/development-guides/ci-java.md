---
title: Java
description: Use a CI pipeline to build and test a Java application.
sidebar_position: 50
redirect_from:
  - /tutorials/ci-pipelines/build/java
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/university/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test a Java application using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-managed Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've [created a Harness CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).

## Install dependencies

Use [Run steps](/docs/continuous-integration/use-ci/run-step-settings) to install dependencies in the build environment.

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

<Tabs>
<TabItem value="Cache Intelligence" default>

Cache your Java dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

Add `caching.enabled.true` to your `stage.spec`:

```yaml
- stage:
    spec:
      caching:
        enabled: true
```

</TabItem>
<TabItem value="Save and Restore Cache steps">

You can use built-in steps to:

- [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
- [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

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

</TabItem>
</Tabs>

## Build and run tests

You can use **Run** or **Test** steps to [run tests in CI pipelines](/docs/continuous-integration/use-ci/run-tests/run-tests-in-ci).

<Tabs>
<TabItem value="run" label="Run step" default>

This example uses two [Run steps](/docs/continuous-integration/use-ci/run-step-settings) to build and test with Maven.

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

</TabItem>
<TabItem value="test" label="Test step (Test Intelligence)">

You must use the **Test** step for your unit tests if you want to leverage Harness' [Test Intelligence](/docs/continuous-integration/use-ci/run-tests/ti-overview.md) feature.

```yaml
              - step:
                  type: Test
                  name: RunTestsWithIntelligence
                  identifier: RunTestsWithIntelligence
                  spec:
                    command: |-
                      mvn test
                      mvn package -DskipTests
                    shell: Sh
                    connectorRef: account.harnessImage
                    image: maven:3.8-jdk-11
                    intelligenceMode: true
                    reports:
                      - "target/surefire-reports/*.xml"
```

</TabItem>
</Tabs>

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/run-tests/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification.

```yaml
reports:
  type: JUnit
  spec:
    paths:
      - target/surefire-reports/*.xml
```

### Test splitting

Harness CI supports [test splitting (parallelism)](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) for both **Run** and **Test** steps.

## Specify version

<Tabs>
<TabItem value="Harness Cloud">

Java is pre-installed on Hosted Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If your application requires a specific version of Java, you can use a **Run**, **GitHub Action**, or **Plugin** step to install it.

This example uses the [GitHub Action step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step) to run the `setup-java` action.

```yaml
- step:
    type: Action
    name: setup java
    identifier: setup_java
    spec:
      uses: actions/setup-java@v3
      with:
        distribution: "temurin"
        java-version: "16"
```

</TabItem>
<TabItem value="Self-managed">

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
          distribution: "temurin"
          java-version: "17"
```

</TabItem>
</Tabs>

## Full pipeline examples

Here's a YAML example of a pipeline that:

1. Tests a Java code repo.
2. Builds and pushes an image to Docker Hub.

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence), and [Test Intelligence](/docs/continuous-integration/use-ci/run-tests/ti-overview.md).

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
                  type: Test
                  name: RunTestsWithIntelligence
                  identifier: RunTestsWithIntelligence
                  spec:
                    command: |-
                      mvn test
                      mvn package -DskipTests
                    shell: Sh
                    connectorRef: account.harnessImage
                    image: maven:3.8-jdk-11
                    intelligenceMode: true
                    reports:
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

- Create [triggers](/docs/category/triggers) to automatically run your pipeline.
- Add steps to [build and upload artifacts](/docs/category/build-push-upload-download).
- Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry).
