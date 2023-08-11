---
sidebar_position: 8
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

You can build and test [iOS](https://developer.apple.com/ios/) and [macOS](https://developer.apple.com/macos/) applications using a macOS platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), a [self-hosted macOS VM](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry), or a [local runner](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) build infrastructure.

The examples in this guide use [Xcode](https://developer.apple.com/xcode/). You can also use [Fastlane](https://docs.fastlane.tools/) to build and test your iOS and macOS apps.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)

<CISignupTip />

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

If you need to use Intel-based architecture, [Rosetta](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment) is pre-installed on Harness Cloud's M1 machines. If you need to use it, add the prefix `arch -x86_64` to commands in your scripts. Keep in mind that running apps through Rosetta can impact performance. Use native Apple Silicon apps whenever possible to ensure optimal performance.

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
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
```

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
```

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
              - /Users/anka/Library/Developer/Xcode/DerivedData
          sharedPaths:
            - /Users/anka/Library/Developer/Xcode/DerivedData
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
                    key: cache-{{ checksum "cache.ipa" }}
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
                    key: cache-{{ checksum "cache.ipa" }}
                    sourcePaths:
                      - "/Users/anka/Library/Developer/Xcode/DerivedData"
                    archiveFormat: Tar
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Build and run tests

Add [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to [run tests in Harness CI](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

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

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification. The following example uses [xcpretty](https://github.com/xcpretty/xcpretty) to produce reports in JUnit XML format.

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
                      xcodebuild
                      xcodebuild test -scheme SampleApp
```

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification. The following example uses [xcpretty](https://github.com/xcpretty/xcpretty) to produce reports in JUnit XML format.

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

```mdx-code-block
  </TabItem>
</Tabs>
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

## Deploy to the App Store

The following examples use [Fastlane in a Continuous Integration setup](https://docs.fastlane.tools/best-practices/continuous-integration/) to deploy an app to the Apple App Store. The environment variables in these examples use [secrets](https://developer.harness.io/docs/category/secrets) and [expressions](https://developer.harness.io/docs/platform/Variables-and-Expressions/harness-variables) to store and recall sensitive values, such as `FASTLANE_PASSWORD=<+secrets.getValue('fastlanepassword')>`.

To learn more about app distribution, go to the Apple Developer documentation on [Distribution](https://developer.apple.com/documentation/xcode/distribution).

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
              - step:
                  type: Run
                  name: Fastlane Build
                  identifier: Fastlane_Build
                  spec:
                    shell: Sh
                    command: |-
                      export LC_ALL=en_US.UTF-8
                      export LANG=en_US.UTF-8

                      export APP_ID="osx.hello-harness"
                      export APP_STORE_CONNECT_KEY_ID="FW...CV3"
                      export APP_STORE_CONNECT_ISSUER_ID="80...e54"
                      export APP_STORE_CONNECT_KEY_FILEPATH="/tmp/build_certificate.p12"

                      export FASTLANE_USER=sample@mail.com
                      export FASTLANE_PASSWORD=<+secrets.getValue('fastlanepassword')>
                      export BUILD_CERTIFICATE_BASE64=<+secrets.getValue('BUILD_CERTIFICATE_BASE64')>
                      export BUILD_PROVISION_PROFILE_BASE64=<+secrets.getValue('BUILD_PROVISION_PROFILE_BASE64')>
                      export P12_PASSWORD=<+secrets.getValue('certpassword')>
                      export KEYCHAIN_PASSWORD=admin
                      export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=<+secrets.getValue('fastlaneapppassword')>
                      export FASTLANE_SESSION='-..._at: *1\n'
                      export APP_STORE_CONNECT_KEY_BASE64=<+secrets.getValue('appstoreapikey')>

                      sudo xcode-select -switch /Applications/Xcode_14.1.0.app
                      cd hello-harness

                      CERTIFICATE_PATH=/tmp/build_certificate.p12
                      PP_PATH=/tmp/profile.mobileprovision
                      KEYCHAIN_PATH=/tmp/app-signing.keychain-db
                      KEY_FILE_PATH="/tmp/app_store_connect_key.p8"

                      echo "$BUILD_CERTIFICATE_BASE64" >> ce
                      base64 -i ce --decode > $CERTIFICATE_PATH

                      echo "$BUILD_PROVISION_PROFILE_BASE64" >> prof
                      base64 -i prof --decode > $PP_PATH

                      echo "$APP_STORE_CONNECT_KEY_BASE64" >> key_base64
                      base64 -i key_base64 --decode > $KEY_FILE_PATH
                      export APP_STORE_CONNECT_KEY_FILEPATH="$KEY_FILE_PATH"

                      security create-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
                      security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
                      security unlock-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH

                      security import $CERTIFICATE_PATH -P "$P12_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
                      security list-keychain -d user -s $KEYCHAIN_PATH
                      mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
                      cp $PP_PATH ~/Library/MobileDevice/Provisioning\ Profiles

                      gem install bundler
                      bundle install

                      bundle exec fastlane beta
                      echo $ABC
                    envVariables:
                      ABC: samples
              - step:
                  type: Run
                  name: Run_2
                  identifier: Run_2
                  spec:
                    shell: Sh
                    command: echo $ABC
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Fastlane Build
                  identifier: Fastlane_Build
                  spec:
                    shell: Sh
                    command: |-
                      export LC_ALL=en_US.UTF-8
                      export LANG=en_US.UTF-8

                      export APP_ID="osx.hello-harness"
                      export APP_STORE_CONNECT_KEY_ID="FW...CV3"
                      export APP_STORE_CONNECT_ISSUER_ID="801...e54"
                      export APP_STORE_CONNECT_KEY_FILEPATH="/tmp/build_certificate.p12"

                      export FASTLANE_USER=sample@mail.com
                      export FASTLANE_PASSWORD=<+secrets.getValue('fastlanepassword')>
                      export BUILD_CERTIFICATE_BASE64=<+secrets.getValue('BUILD_CERTIFICATE_BASE64')>
                      export BUILD_PROVISION_PROFILE_BASE64=<+secrets.getValue('BUILD_PROVISION_PROFILE_BASE64')>
                      export P12_PASSWORD=<+secrets.getValue('certpassword')>
                      export KEYCHAIN_PASSWORD=admin
                      export FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=<+secrets.getValue('fastlaneapppassword')>
                      export FASTLANE_SESSION='-...*1\n'
                      export APP_STORE_CONNECT_KEY_BASE64=<+secrets.getValue('appstoreapikey')>

                      sudo xcode-select -switch /Applications/Xcode_14.1.0.app
                      cd hello-harness

                      CERTIFICATE_PATH=/tmp/build_certificate.p12
                      PP_PATH=/tmp/profile.mobileprovision
                      KEYCHAIN_PATH=/tmp/app-signing.keychain-db
                      KEY_FILE_PATH="/tmp/app_store_connect_key.p8"

                      echo "$BUILD_CERTIFICATE_BASE64" >> ce
                      base64 -i ce --decode > $CERTIFICATE_PATH

                      echo "$BUILD_PROVISION_PROFILE_BASE64" >> prof
                      base64 -i prof --decode > $PP_PATH

                      echo "$APP_STORE_CONNECT_KEY_BASE64" >> key_base64
                      base64 -i key_base64 --decode > $KEY_FILE_PATH
                      export APP_STORE_CONNECT_KEY_FILEPATH="$KEY_FILE_PATH"

                      security create-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
                      security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
                      security unlock-keychain -p "$KEYCHAIN_PASSWORD" $KEYCHAIN_PATH

                      security import $CERTIFICATE_PATH -P "$P12_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
                      security list-keychain -d user -s $KEYCHAIN_PATH
                      mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
                      cp $PP_PATH ~/Library/MobileDevice/Provisioning\ Profiles

                      gem install bundler
                      bundle install

                      bundle exec fastlane beta
                      echo $ABC
                    envVariables:
                      ABC: samples
              - step:
                  type: Run
                  name: Run_2
                  identifier: Run_2
                  spec:
                    shell: Sh
                    command: echo $ABC
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Full pipeline examples

The following pipeline examples install dependencies, cache dependencies, and build and test an Xcode project.

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

This pipeline uses a [self-hosted VM build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry) and [Save and Restore Cache from S3 steps](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

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

Now that you have created a pipeline that builds and tests an iOS/macOS app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).
