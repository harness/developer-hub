---
sidebar_position: 6
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

You can build and test [Android](https://developer.android.com/modern-android-development)/[Kotlin](https://developer.android.com/kotlin) applications using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/), or a [local runner](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)

<CISignupTip />

## Install dependencies

Use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

Many Android packages, such as command line tools and an emulator, are already installed on Harness Cloud Linux machines. For more information about preinstalled tools and libraries, go to the [Harness Cloud image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    shell: Sh
                    command: |-
                      npm install -g firebase-tools
                      gem install fastlane

                      fastlane add_plugin load_json
                      fastlane add_plugin increment_version_code
                      fastlane add_plugin firebase_app_distribution
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    shell: Sh
                    command: |-
                      npm install -g firebase-tools
                      gem install fastlane

                      fastlane add_plugin load_json
                      fastlane add_plugin increment_version_code
                      fastlane add_plugin firebase_app_distribution
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
                    key: cache-{{ checksum "file.jar" }} ## Example cache key based on checksum.
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
                    key: cache-{{ checksum "file.jar" }} ## Example cache key based on checksum.
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

If you're using Kotlin, you can take advantage of Harness' [Test Intelligence](/docs/continuous-integration/use-ci/set-up-test-intelligence/) feature.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
              - step:
                  type: Run
                  name: build and test
                  identifier: build-and-test
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
                  identifier: build-and-test
                  spec:
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
              - step:
                  type: Run
                  name: Save tests
                  identifier: save_tests
                  spec:
                    shell: Sh
                    command: |-
                      mkdir -p ~/test-results/junit/
                      find . -type f -regex ".*/build/test-results/.*xml" -exec cp {} ~/test-results/junit/ \;
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "~/test-results/junit.xml"
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
                    shell: Sh
                    command: |-
                      ./gradlew test assemble -YOUR_PROJECT
                      ./gradlew testDebug
              - step:
                  type: Run
                  name: Save tests
                  identifier: save_tests
                  spec:
                    shell: Sh
                    command: |-
                      mkdir -p ~/test-results/junit/
                      find . -type f -regex ".*/build/test-results/.*xml" -exec cp {} ~/test-results/junit/ \;
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "~/test-results/junit.xml"
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

Android packages are pre-installed on Harness Cloud machines. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

For packages with multiple versions, use commands in **Run** steps to switch between pre-installed versions. You can use **Run** or **Plugin** steps to install additional versions.

```yaml

```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

You can use a **Run** or **Plugin** step to install Java versions that are not already installed on your host machine.

```yaml

```

```mdx-code-block
</TabItem>
</Tabs>
```

## Deploy to the Google Play Store

The following examples use [Fastlane in a Continuous Integration setup](https://docs.fastlane.tools/best-practices/continuous-integration/) to deploy an app to the Google Play Store. The environment variables in these examples use [secrets](https://developer.harness.io/docs/category/secrets) and [expressions](https://developer.harness.io/docs/platform/Variables-and-Expressions/harness-variables) to store and recall sensitive values, such as `FASTLANE_PASSWORD=<+secrets.getValue('fastlanepassword')>`.

To learn more about app distribution, go to the Google documentation on [Firebase App Distribution](https://firebase.google.com/docs/app-distribution).

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml

```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

```yaml

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

```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

This pipeline uses a [local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) and [Save and Restore Cache from S3 steps](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), repository name, and other applicable values. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml

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
