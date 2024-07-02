---
title: C/C++
description: Use a CI pipeline to build and test C and C++ applications.
sidebar_position: 20
redirect_from:
  - /tutorials/ci-pipelines/build/c
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

You can build and test C and C++ applications on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-managed Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure. This guide uses a Linux platform, but you can also use macOS and Windows platforms with Harness.

This guide assumes you've [created a Harness CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).

## Install dependencies

Use [Run steps](/docs/continuous-integration/use-ci/run-step-settings) to install dependencies in the build environment.

You can run any commands in Run steps as long as the necessary binaries are available on the host machine or the referenced container image. For example, you can run cURL commands, build commands for CMake, Ninja, or MSBuild, or any other commands you might otherwise run on the command line.

In the following YAML example, the Run step runs a Python script to get dependencies for a C++ project. It uses a [matrix looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to cycle through each dependency.

<Tabs>
  <TabItem value="hc" label="Harness Cloud" default>

```yaml
- step:
    type: Run
    name: Fetch Deps
    identifier: Fetch_Deps
    spec:
      shell: Sh
      command: python3 build/getdeps.py fetch --no-tests <+matrix.deps>
    failureStrategies: []
    strategy:
      matrix:
        deps:
          - ninja
          - cmake
          - zlib
          - zstd
          - boost
          - double-conversion
          - fmt
          - gflags
          - glog
          - googletest
          - libevent
        maxConcurrency: 1
```

</TabItem>
  <TabItem value="sh" label="Self-managed">

```yaml
- step:
    type: Run
    name: Fetch Deps
    identifier: Fetch_Deps
    spec:
      connectorRef: account.harnessImage
      image: python:latest
      shell: Sh
      command: python3 build/getdeps.py fetch --no-tests <+matrix.deps>
    failureStrategies: []
    strategy:
      matrix:
        deps:
          - ninja
          - cmake
          - zlib
          - zstd
          - boost
          - double-conversion
          - fmt
          - gflags
          - glog
          - googletest
          - libevent
        maxConcurrency: 1
```

</TabItem>
</Tabs>

:::tip

In addition to Run steps, [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) are also useful for installing dependencies.

You can use [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to run dependent services that are needed by multiple steps in the same stage.

:::

## Cache dependencies

<Tabs>
<TabItem value="Cache Intelligence" default>

Cache your C and C++ dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

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

You can use **Run** steps to [run tests in CI pipelines](/docs/continuous-integration/use-ci/run-tests/run-tests-in-ci).

<Tabs>
<TabItem value="hosted" label="Harness cloud" default>

```yaml
- step:
    type: Run
    name: build and test
    identifier: build and test
    spec:
      shell: Sh
      command: |-
        cmake -S . -B build
        ctest --test-dir $FILES --output-junit /target/reports/test_output.xml
```

</TabItem>
<TabItem value="selfmanaged" label="Self-managed">

```yaml
- step:
    type: Run
    name: build and test
    identifier: build and test
    spec:
      connectorRef: account.harnessImage
      image: gradle:alpine
      shell: Sh
      command: |
        cmake -S . -B build
        ctest --test-dir $FILES --output-junit /target/reports/test_output.xml
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
      - target/reports/*.xml
```

### Test splitting

Harness CI supports [test splitting (parallelism)](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) in **Run** steps.

## Specify version

<Tabs>
<TabItem value="Harness Cloud">

CLang and GNU C++ are pre-installed on Harness Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If you want to use a different compiler or a specific version of a compiler, you can use a **Run** step to install it, for example:

```yaml
- step:
    type: Run
    name: install
    identifier: install
    spec:
      shell: Sh
      command: |
        sudo apt update
        sudo apt install g++-12
```

</TabItem>
<TabItem value="Self-managed">

You can use a **Run** step to install compilers, such as CLang or GNU C++, if they are not already installed on your host machine, for example:

```yaml
- step:
    type: Run
    name: install
    identifier: install
    spec:
      connectorRef:
      image:
      shell: Sh
      command: |
        sudo apt update
        sudo apt install g++
```

</TabItem>
</Tabs>

## Full pipeline examples

Here's a YAML example of a pipeline that builds a C application and pushes the image to Docker Hub.

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  name: Build C
  identifier: Build_C
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
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Bash
                    command: |-
                      chmod 777 ./scripts/docker/build.sh
                      ./scripts/docker/build.sh --bionic --remote PROJECT test_PROJECT
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

Now that you have created a pipeline that builds and tests a C or C++ app, you could:

- Create [triggers](/docs/category/triggers) to automatically run your pipeline.
- Add steps to [build and upload artifacts](/docs/category/build-push-upload-download).
- Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry).
