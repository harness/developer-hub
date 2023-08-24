---
sidebar_position: 7
title: Android application
description: Use a CI pipeline to build and test an Android application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/android
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test [Android](https://developer.android.com/modern-android-development) applications using a Linux or Mac platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/), or a [local runner](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)

<CISignupTip />

## Specify architecture

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

You can build and test Android apps on a Linux or Mac platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) build infrastructure.

```mdx-code-block
<Tabs>
  <TabItem value="h1" label="Linux" default>
```

```yaml
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

```mdx-code-block
  </TabItem>
  <TabItem value="h2" label="macOS">
```

To use M1 machines with Harness Cloud, use the `Arm64` architecture.

```yaml
 stages:
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: MacOS ## selects macOS operating system
            arch: Arm64 ## selects M1 architecture
          runtime:
            type: Cloud
            spec: {}
```

If you need to use Intel-based architecture, [Rosetta](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment) is pre-installed on Harness Cloud's M1 machines. If you need to use it, add the prefix `arch -x86_64` to commands in your scripts. Keep in mind that running apps through Rosetta can impact performance. Use native Apple Silicon apps whenever possible to ensure optimal performance.

```mdx-code-block
  </TabItem>
</Tabs>
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

You can build Android apps on a Linux or Mac platform on self-hosted [build infrastructures](/docs/category/set-up-build-infrastructure), including Kubernetes clusters, VMs, and local runners.

```mdx-code-block
<Tabs>
  <TabItem value="sh1" label="Linux" default>
```

This example sets up a Linux platform on a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures/).

```yaml
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

```mdx-code-block
  </TabItem>
  <TabItem value="sh2" label="macOS">
```

To configure a self-hosted macOS build infrastructure, go to [Set up a macOS VM build infrastructure with Anka Registry](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry) or [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

This example uses a VM build infrastructure:

```yaml
 stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: VM
            spec:
              type: Pool
              spec:
                poolName: YOUR_VM_POOL_NAME
                os: MacOS
```

If you need to use Intel-based architecture and [Rosetta](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment) is not already installed on your build infrastructure machines, you can use a **Run** step to [install this dependency](#install-dependencies). Keep in mind that running apps through Rosetta can impact performance. Use native Apple Silicon apps whenever possible to ensure optimal performance.

```mdx-code-block
  </TabItem>
</Tabs>
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Install dependencies

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

Many Android packages, such as command-line tools and an emulator, are already installed on Harness Cloud Linux machines. For more information about preinstalled tools and libraries, go to the [Harness Cloud image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

Use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    shell: Sh
                    command: |-
                      bundle update
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

Use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      npm install -g firebase-tools
                      gem install fastlane

                      bundle exec fastlane add_plugin load_json
                      bundle exec fastlane add_plugin increment_version_code
                      bundle exec fastlane add_plugin firebase_app_distribution
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Cache dependencies

Add caching to your stage.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

Use [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) by adding `caching` to your `stage.spec`.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
            paths:
              - YOUR_CACHE_PATH
          sharedPaths:
            - YOUR_CACHE_PATH
```

:::tip

Cache Intelligence supports Gradle. If you're using Gradle and your dependencies are stored in the default location for Gradle, you don't need to include `paths` or `sharedPath`. For example:

```yaml
    - stage:
        spec:
          caching:
            enabled: true
```

:::

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

With self-hosted build infrastructures, you can:

* [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
* [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

Here's an example of a pipeline with **Save Cache to S3** and **Restore Cache from S3** steps. It also includes a **Run** step that creates the `.ipa` archive with `xcodebuild archive` and `xcodebuild --exportArchive`.

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
                    key: cache-{{ checksum "package.json" }} ## Example cache key based on checksum.
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "package.json" }} ## Example cache key based on checksum.
                    sourcePaths:
                      - "YOUR_CACHE_PATH"
                    archiveFormat: Tar
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Build and run tests

You can use **Run** or **Run Tests** steps to [run tests in Harness CI](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

If you're using Kotlin, you can improve your unit test times with  Harness' [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence/) feature.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
              - step:
                  type: Run
                  name: build and test
                  identifier: build_and_test
                  spec:
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
```

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification.

```yaml
              - step:
                  type: Run
                  name: build and test
                  identifier: build_and_test
                  spec:
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "*/build/test-results/.*xml"
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
```

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification.

```yaml
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "*/build/test-results/.*xml"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Android packages, including Android SDK tools and and [fastlane](https://docs.fastlane.tools/), are pre-installed on Harness Cloud machines. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

```yaml
              - step:
                  type: Run
                  name: android version
                  identifier: android_version
                  spec:
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane tests
```

If you need to install additional versions, use a **Run** step. These examples use [faberNovel/docker-android](https://github.com/faberNovel/docker-android) and fastlane.

<details>
<summary>Use one version</summary>

```yaml
              - step:
                  type: Run
                  name: android version
                  identifier: android_version
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane tests
```

</details>

<details>
<summary>Use multiple versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            androidVersion:
              - 30
              - 31
              - 33
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  name: android Version
                  identifier: android_version
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-<+ stage.matrix.androidVersion >-v1.7.0
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane tests
```

</details>

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

Specify the desired Android Docker image tag in your steps. There is no need for a separate install step when using Docker.

These examples use [faberNovel/docker-android](https://github.com/faberNovel/docker-android) and [fastlane](https://docs.fastlane.tools/).

<details>
<summary>Use one version</summary>

```yaml
              - step:
                  type: Run
                  name: android version
                  identifier: android_version
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane tests
```

</details>

<details>
<summary>Use multiple versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            androidVersion:
              - 30
              - 31
              - 33
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  name: android Version
                  identifier: android_version
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-<+ stage.matrix.androidVersion >-v1.7.0
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane tests
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Deploy to the Google Play Store

The following examples use [fastlane](https://docs.fastlane.tools/) to deploy an app to the Google Play Store. These are intended as examples only. They do not provide complete firebase configuration or app distribution requirements. To learn more about app distribution, go to the Google documentation on [Firebase App Distribution](https://firebase.google.com/docs/app-distribution) and the fastlane documentation on [Deploying to Google Play using fastlane](https://docs.fastlane.tools/getting-started/android/release-deployment/).

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
              - step:
                  type: Run
                  name: fastlane_deploy
                  identifier: fastlane_deploy
                  spec:
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane android deploy
                      fastlane action upload_to_play_store
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: fastlane_deploy
                  identifier: fastlane_deploy
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-<+ stage.matrix.androidVersion >-v1.7.0
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane android deploy
                      fastlane action upload_to_play_store
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Full pipeline examples

The following pipeline examples install dependencies, cache dependencies, and build and test an Android app.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), repository name, and other applicable values. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            paths:
              - "YOUR_CACHE_PATH"
          execution:
            steps:
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    shell: Sh
                    command: |-
                      bundle update
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "*/build/test-results/.*xml"
              - step:
                  type: Run
                  name: fastlane_deploy
                  identifier: fastlane_deploy
                  spec:
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane android deploy
                      fastlane action upload_to_play_store
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          sharedPaths:
            - YOUR_CACHE_PATH
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

This pipeline uses a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures) and [Save and Restore Cache from S3 steps](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache).

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), repository name, and other applicable values. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml
pipeline:
  name: default
  identifier: default
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "package.json" }} ## Example cache key based on checksum.
                    archiveFormat: Tar
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      npm install -g firebase-tools
                      gem install fastlane

                      bundle exec fastlane add_plugin load_json
                      bundle exec fastlane add_plugin increment_version_code
                      bundle exec fastlane add_plugin firebase_app_distribution
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-30-v1.7.0
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "*/build/test-results/.*xml"
              - step:
                  type: Run
                  name: fastlane_deploy
                  identifier: fastlane_deploy
                  spec:
                    connectorRef: account.harnessImage
                    image: fabernovel/android:api-<+ stage.matrix.androidVersion >-v1.7.0
                    shell: Sh
                    command: |-
                      fastlane init
                      fastlane android deploy
                      fastlane action upload_to_play_store
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "package.json" }} ## Example cache key based on checksum.
                    sourcePaths:
                      - "YOUR_CACHE_PATH"
                    archiveFormat: Tar
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Next steps

Now that you have created a pipeline that builds and tests an Android app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).
