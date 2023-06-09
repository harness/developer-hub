---
sidebar_position: 6
title: iOS and macOS applications
description: Use a CI pipeline to build and test iOS and macOS applications.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/ios
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

You can build and test [iOS](https://developer.apple.com/ios/) and [macOS](https://developer.apple.com/macos/) applications using a macOS platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted macOS VM](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

:::info Xcode, Fastlane, and Swift

The examples in this guide use [Xcode](https://developer.apple.com/xcode/). You can also use [Fastlane](https://docs.fastlane.tools/) to build and test your iOS and macOS apps.

[Swift](https://www.swift.org/about/) is a popular iOS/macOS language. However, to make your app eligible for the Apple App Store, you must use the version of [Swift included with Xcode](https://www.swift.org/download/#:~:text=Using%20Downloads-,Apple%20Platforms,-Xcode%20includes%20a).

:::

## Specify architecture

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
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
```

:::info Use Intel-based architecture

[Rosetta](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment) is pre-installed on Harness Cloud's M1 machines. If you need to use it, add the prefix `arch -x86_64` to commands in your scripts.

Keep in mind that running apps through Rosetta can impact performance. Use native Apple Silicon apps whenever possible to ensure optimal performance.

:::

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

To configure a self-hosted macOS build infrastructure, go to [Set up a macOS VM build infrastructure with Anka Registry](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry).

:::info Use Intel-based architecture

If [Rosetta](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment) is not already installed on your build infrastructure machines, you can use a **Run** step to [install this dependency](#install-dependencies).

Keep in mind that running apps through Rosetta can impact performance. Use native Apple Silicon apps whenever possible to ensure optimal performance.

:::

```mdx-code-block
  </TabItem>
</Tabs>
```

## Install dependencies

Use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

[Homebrew](https://brew.sh/) and [Xcode](https://developer.apple.com/xcode/) are already installed on Harness Cloud macOS machines. For more information about preinstalled tools and libraries, go to the [Harness Cloud image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

```yaml
              - step:
                  type: Run
                  identifier: dependencies_ruby_gems
                  name: dependencies-ruby-gems
                  spec:
                    shell: Sh
                    command: |-
                      brew install fastlane
                      brew install xcode-archive-cache
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

Due to the long install time, make sure [Xcode](https://developer.apple.com/xcode/) is pre-installed on your build infrastructure machines. If [Homebrew](https://brew.sh/) is not already installed, use **Run** steps to install it and any other dependencies.

```yaml
              - step:
                  type: Run
                  identifier: dependencies_install_brew
                  name: dependencies-install-brew
                  spec:
                    shell: Sh
                    command: |-
                      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
              - step:
                  type: Run
                  identifier: dependencies_ruby_gems
                  name: dependencies-ruby-gems
                  spec:
                    shell: Sh
                    command: |-
                      brew install fastlane
                      brew install xcode-archive-cache
```

```mdx-code-block
  </TabItem>
</Tabs>
```

<!-- this example is the same for both infras because xcode should already be installed on the self-hosted VMs -->

You can [add package dependencies](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) in your Xcode project and then run Xcode commands in **Run** steps to interact with your project's dependencies.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild -resolvePackageDependencies
```

:::tip

[Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) can be used to run dependent services that are needed by steps in the same stage.

:::

## Cache dependencies

Add caching to your stage.

<!-- unknown checksum key-->

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```mdx-code-block
<Tabs>
<TabItem value="Cache Intelligence">
```

Use [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) by adding `caching` to your `stage.spec`.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
            paths:
              - /Users/anka/Library/Developer/Xcode/DerivedData
          sharedPaths:
            - /Users/anka/Library/Developer/Xcode/DerivedData
```

```mdx-code-block
</TabItem>
<TabItem value="Save and Restore Cache steps">
```

You can:

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
                    key: cache-{{ checksum "cache.ipa" }} ## What is the cache key for xcode?
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: Run
                  ...
              - step:
                  type: Run
                  identifier: create_cache
                  name: create cache
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild archive
                      xcodebuild -exportArchive
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "cache.ipa" }} ## What is the cache key for xcode?
                    sourcePaths:
                      - "/Users/anka/Library/Developer/Xcode/DerivedData"
                    archiveFormat: Tar
```

```mdx-code-block
</TabItem>
<TabItem value="Bitrise Integration plugin">
```

You can use the [Bitrise Integration plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-bitrise-plugin) to run Bitrise Integrations, such as:

* [Xcode Archive & Export for iOS](https://bitrise.io/integrations/steps/xcode-archive)
* [Xcode Archive for Mac](https://bitrise.io/integrations/steps/xcode-archive-mac)

```mdx-code-block
</TabItem>
</Tabs>
```

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
                    key: cache-{{ checksum "cache.ipa" }} ## What is the cache key for xcode?
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: Run
                  ...
              - step:
                  type: Run
                  identifier: create_cache
                  name: create cache
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild archive
                      xcodebuild -exportArchive
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "cache.ipa" }} ## What is the cache key for xcode?
                    sourcePaths:
                      - "/Users/anka/Library/Developer/Xcode/DerivedData"
                    archiveFormat: Tar
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Run tests

Add [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to [run tests in Harness CI](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```yaml
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild
                      xcodebuild test -scheme SampleApp
```

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification. the following example uses [xcpretty](https://github.com/xcpretty/xcpretty) to produce reports in JUnit XML format.

```yaml
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      brew install xcpretty
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild
                      xcodebuild test -scheme SampleApp | xcpretty -r junit
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "build/reports/junit.xml"
```

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Xcode is pre-installed on Harness Cloud machines. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

Use `xcode-select` in a **Run** step to switch between pre-installed versions of Xcode.

```yaml
              - step:
                  type: Run
                  name: set_xcode_version
                  identifier: set_xcode_version
                  spec:
                    shell: Sh
                    command: |-
                      sudo xcode-select -switch /Applications/Xcode_13.4.1.app
                      xcodebuild -version
```

<!-- this command starts prompts that need interaction. Don't know how to authorize it so the install proceeds. It takes a while Not sure installing xcode as part of a pipeline step is a good idea?

If your application requires a specific Xcode version, you can a **Run** step to install it.

```yaml
              - step:
                  type: Run
                  name: set_xcode_version
                  identifier: set_xcode_version
                  spec:
                    shell: Sh
                    command: |-
                      xcode-select --install
```
-->

<!-- I don't know why you would use multiple xcode versions.

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            pythonVersion:
              - 3.11.2
              - 3.10.10
```

2. Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Action
                  name: Install python
                  identifier: installpython
                  spec:
                    uses: actions/setup-python@v4
                    with:
                      python-version: <+ stage.matrix.pythonVersion >
                      token: <+ secrets.getValue("github_token") >
```
-->

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

If your build infrastructure machines have multiple versions of Xcode installed, you can use `xcode-select` in a **Run** step to switch versions.

```yaml
              - step:
                  type: Run
                  name: set_xcode_version
                  identifier: set_xcode_version
                  spec:
                    shell: Sh
                    command: |-
                      sudo xcode-select -switch /Applications/Xcode_13.4.1.app
                      xcodebuild -version
```

<!-- this command starts prompts that need interaction. Don't know how to authorize it so the install proceeds. It takes a while Not sure installing xcode as part of a pipeline step is a good idea?

If your application requires a specific Xcode version, you can a **Run** step to install it.

```yaml
              - step:
                  type: Run
                  name: set_xcode_version
                  identifier: set_xcode_version
                  spec:
                    shell: Sh
                    command: |-
                      xcode-select --install
```
-->

<!-- I don't know why you would use multiple xcode versions.

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            pythonVersion:
              - 3.11.2
              - 3.10.10
```

2. Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Action
                  name: Install python
                  identifier: installpython
                  spec:
                    uses: actions/setup-python@v4
                    with:
                      python-version: <+ stage.matrix.pythonVersion >
                      token: <+ secrets.getValue("github_token") >
```
-->

```mdx-code-block
</TabItem>
</Tabs>
```

## Full pipeline examples

The following pipeline examples install dependencies, cache dependencies, and build and test an xcode project.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), repository name, and other applicable values. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml
pipeline:
  name: macostest
  identifier: macostest
  projectIdentifier: default
  orgIdentifier: default
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
              - /Users/anka/Library/Developer/Xcode/DerivedData
          sharedPaths:
            - /Users/anka/Library/Developer/Xcode/DerivedData
          platform:
            os: MacOS
            arch: Arm64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    shell: Sh
                    command: xcodebuild -resolvePackageDependencies
              - step:
                  type: Run
                  name: Run xcode
                  identifier: Run_xcode
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild
                      xcodebuild test -scheme SampleApp
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

This pipeline uses [self-hosted VM build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Save and Restore Cache from S3 steps](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), repository name, and other applicable values. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml
pipeline:
  name: macos-test-vm
  identifier: macostestvm
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1 ## Use your S3 bucket's region.
                    bucket: YOUR_S3_BUCKET
                    key: cache-{{ checksum "cache.ipa" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  identifier: dependencies
                  name: dependencies
                  spec:
                    shell: Sh
                    command: xcodebuild -resolvePackageDependencies
              - step:
                  type: Run
                  name: Run xcode
                  identifier: Run_xcode
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild
                      xcodebuild test -scheme SampleApp
              - step:
                  type: Run
                  identifier: create_cache
                  name: create cache
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild archive
                      xcodebuild -exportArchive
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1 ## Use your S3 bucket's region.
                    bucket: YOUR_S3_BUCKET
                    key: cache-{{ checksum "cache.ipa" }}
                    sourcePaths:
                      - /Users/anka/Library/Developer/Xcode/DerivedData
                    archiveFormat: Tar
          infrastructure:
            type: VM
            spec:
              type: Pool
              spec:
                poolName: YOUR_VM_POOL_NAME
                os: MacOS
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Next steps

Now that you have created a pipeline that builds and tests a Ruby app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).
