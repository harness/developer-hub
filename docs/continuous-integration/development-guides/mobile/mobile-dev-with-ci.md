---
title: Mobile development with Harness
description: Use Harness CI for developing mobile apps
sidebar_position: 1
sidebar_label: Mobile development with Harness
redirect_from:
  - /docs/continuous-integration/use-ci/mobile-dev-with-ci
  - /docs/continuous-integration/development-guides/mobile-dev-with-ci
---

import CISignupTip from '/docs/continuous-integration/shared/ci-signup-tip.md';

Harness CI supports mobile app development.

<CISignupTip />

## Mobile app development guides

These guides contain a variety of information about mobile development with Harness CI, including installing dependencies, running tests, and distribution.

* [Guide: Build iOS and macOS apps with Harness CI](./ios.md)
* [Guide: Build Android apps with Harness CI](./android.md)

## Plugins and scripts for mobile development

There are several ways to run scripts and use plugins in Harness CI. You can run Bitrise Steps, GitHub Actions, fastlane scripts, Firebase scripts, Xcode commands, and more.

* [Use Bitrise Workflow Steps in Harness CI](/docs/continuous-integration/use-ci/use-drone-plugins/ci-bitrise-plugin)
* [Use GitHub Actions in Harness CI](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step)
* [Write your own plugins (reusable custom scripts)](/docs/continuous-integration/use-ci/use-drone-plugins/custom_plugins)
* [Use a Run step to run any script in Harness CI](/docs/continuous-integration/use-ci/run-step-settings)
* [Deploy Android apps with Harness CI](./android.md#deploy-to-the-google-play-store)
* [Deploy iOS apps with Harness CI](./ios.md#deploy-to-the-app-store)

## Variables and secrets for mobile development

You can use [Run steps](/docs/continuous-integration/use-ci/run-step-settings) to run all manner of commands or scripts. If your Run step defines or ingests a variable, make sure you understand how [output variables](/docs/continuous-integration/use-ci/run-step-settings#output-variables) and [environment variables](/docs/continuous-integration/use-ci/run-step-settings#environment-variables) work in Run steps. You can also [declare variables at the stage level](/docs/platform/pipelines/add-a-stage/#stage-variables) and redefine their values in steps.

Store tokens, passwords, and other sensitive data as [secrets](/docs/category/secrets) and then [use expressions to reference secrets](/docs/platform/secrets/add-file-secrets#reference-an-encrypted-file-secret) in your pipelines. For example, you can use an expression as the value for a variable:

```
APP_STORE_PASSWORD=<+secrets.getValue("my_app_store_password_secret")>
```

## App distribution with Harness CI

You can run distribution scripts for your preferred mobile development tool's CLI in a [Run step](/docs/continuous-integration/use-ci/run-step-settings).

For more information about the commands to use in your Run steps, refer to the provider's documentation. Here are some examples:

* [Firebase: iOS distribution](https://firebase.google.com/docs/app-distribution/ios/distribute-cli)
* [Firebase: Android distribution](https://firebase.google.com/docs/app-distribution/android/distribute-cli)
* [Flutter: iOS deployment](https://docs.flutter.dev/deployment/ios)
* [Flutter: Android deployment](https://docs.flutter.dev/deployment/android)
* [fastlane: iOS beta deployment](https://docs.fastlane.tools/getting-started/ios/beta-deployment/)
* [fastlane: Android beta deployment](https://docs.fastlane.tools/getting-started/android/beta-deployment/)
* [Xcode: App distribution](https://developer.apple.com/documentation/xcode/distribution)

## Mobile development YAML examples

Here are some examples of pipelines for mobile development. These pipelines are for example purposes only. They are meant to help you conceptualize how you can organize a Harness pipeline for mobile development.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="ex1" label="Example: Build and upload to JFrog" default>

This example builds an iOS app from an Xcode project and then uploads the artifact to JFrog Artifactory.

```yaml
pipeline:
  identifier: buildiOSApp
  name: build-iOS-app
  stages:
    - stage:
        identifier: Build_iOS_App
        name: Build iOS App
        type: CI
        spec:
          cloneCodebase: true
          infrastructure: ## This examples uses a macOS VM build infrastructure.
            type: VM
            spec:
              type: Pool
              spec:
                poolName: <+pipeline.variables.build_anka_image>
                harnessImageConnectorRef: account.Jfrogartifactory
                os: MacOS
          execution:
            steps:
              - step:
                  identifier: Definevariables
                  name: Define variables
                  type: Run
                  spec:
                    shell: Sh
                    command: |-
                      ## Insert script to populate variables required for the rest of the stage. Populated variables are declared in outputVariables so they are available to later steps. Variable values can change in later steps.
                    envVariables: ## These variables use Harness expressions for their values. Expressions beginning with stage.variables are references to stage variables.
                      PROVISIONING_PROFILE: <+stage.variables.xcode_provisioningProfile>
                      CERTPATH_PREFERENCE: <+stage.variables.certpath_preference>
                      PROFILES_PREFERENCE: <+stage.variables.profiles_preference>
                      EXPORTOPTIONS_PREFERENCE: <+exportoptions_preference>
                      SUPPRESS_COCOAPODS: <+stage.variables.suppress_cocoapods>
                      LOAD_CERTIFICATES: <+stage.variables.load_certificates>
                    outputVariables:
                      - name: XCODE_CERT_PATH
                      - name: XCODE_PROFILES_PATH
                      - name: XCODE_EXPORTOPTIONS_PATH
                      - name: XCODE_COCOAPOD_PATH
                      - name: XCODE_COCOAPOD_ENABLE
                      - name: XCODE_PROVISIONING_ID
              - step:
                  identifier: Install_Certs_and_Provision_Profiles
                  name: Install Certs and Provision Profiles
                  type: Run
                  spec:
                    shell: Sh
                    command: |-
                      ## Insert script to install certs and provision profiles.
                    envVariables: ## By declaring a variable in envVariables, the step can use that variable value in its command. For example, this step could use the LOAD_CERTIFICATES stage variable.
                      LOAD_CERTIFICATES: <+stage.variables.load_certificates>
              - step:
                  identifier: Install_Cocoapods
                  name: Install Cocoapods
                  type: Run
                  spec:
                    shell: Sh
                    command: |-
                      ## Insert script to install cocoapods.
                  when: ## This step only runs if all prior steps passed and the XCODE_COCOAPOD_ENABLE variable was set to true in the Definevariables step.
                    stageStatus: Success
                    condition: <+stage.spec.execution.steps.Definevariables.output.outputVariables.XCODE_COCOAPOD_ENABLE>
                      == "true"
              - stepGroup: ## These steps are organized in a step group. This group of steps creates an .ipa file from an xcode project or workspace, depending on the value of the XCODE_TYPE variable.
                  identifier: Archive_and_Export_IPA
                  name: Archive and Export IPA
                  steps:
                    - parallel:
                        - step:
                            identifier: xcworkspace
                            name: xcworkspace
                            type: Run
                            spec:
                              shell: Sh
                              command: |-
                                ## Insert script to build xcode archive and export the archive to .ipa. The following commands are shortened examples.

                                xcodebuild -list -workspace "<+stage.variables.xcode_xcworkspaceLocation>"

                                xcodebuild -workspace "<+stage.variables.xcode_xcworkspaceLocation>" -scheme ...

                                xcodebuild -exportArchive -archivePath "/tmp/harness/<+stage.variables.xcode_archivePath>" -exportPath . ...

                              envVariables:
                                schemeName: <+stage.variables.xcode_scheme>
                                XCODE_PROVISIONING_ID: <+stage.spec.execution.steps.Definevariables.output.outputVariables.XCODE_PROVISIONING_ID>
                            when: ## Run this step only if XCODE_TYPE is xcworkspace.
                              stageStatus: Success
                              condition: <+stage.variables.xcode_type> == "xcworkspace"
                        - step:
                            identifier: xcodeproj
                            name: xcodeproj
                            type: Run
                            spec:
                              shell: Sh
                              command: |-
                                ## Insert script to build xcode archive and export the archive to .ipa. The following commands are shortened examples.

                                xcodebuild -list -workspace "<+stage.variables.xcode_xcworkspaceLocation>"

                                xcodebuild -workspace "<+stage.variables.xcode_xcworkspaceLocation>" -scheme ...

                                xcodebuild -exportArchive -archivePath "/tmp/harness/<+stage.variables.xcode_archivePath>" -exportPath . ...

                              envVariables:
                                schemeName: <+pipeline.stages.Build_iOS_app.variables.xcode_scheme>
                                password: <+secrets.getValue("my_password_secret")>
                            when:
                              stageStatus: Success
                              condition: <+stage.variables.xcode_type> == "xcproject"
              - step:
                  identifier: Extract_Build_Settings
                  name: Extract Build Settings
                  type: Run
                  spec:
                    shell: Sh
                    command: |-
                      ## Insert script to extract build settings to variable values. Populated variables are declared in the outputVariables so they can be referenced in later steps.
                    outputVariables:
                      - name: PRODUCT_BUNDLE_IDENTIFIER
                      - name: PRODUCT_NAME
                      - name: FULL_PRODUCT_NAME
                      - name: PRODUCT_SETTINGS_PATH
                      - name: TARGETED_DEVICE_FAMILY
                      - name: MARKETING_VERSION
                      - name: CURRENT_PROJECT_VERSION
              - step:
                  identifier: Tag_Artifact
                  name: Tag Artifact
                  type: Run
                  spec:
                    shell: Sh
                    command: |-
                      ## Insert script to tag final build artifact. For example, rename the exported .ipa.
              - stepGroup: ## This step group uploads the final artifact to JFrog. The destination depends on the value of the jfrog_InstanceType variable.
                  identifier: Upload_Artifact
                  name: Upload Artifact
                  steps:
                    - parallel:
                        - step:
                            identifier: Upload_IPA_to_Artifactory
                            name: Upload to Cloud Artifactory
                            type: Run
                            spec:
                              shell: Sh
                              command: |-
                                ## Insert commands to upload the artifact to JFrog artifactory. You could also use the built-in Upload Artifact to JFrog Artifactory step, instead of a Run step.
                            when: ## Run this step only if the jfrog_InstanceType is saas.
                              stageStatus: Success
                              condition: <+stage.variables.jfrog_InstanceType> ==
                                "saas"
                        - step:
                            identifier: Upload_IPA_to_onPrem_Artifactory
                            name: Upload to onPrem Artifactory
                            type: Run
                            spec:
                              shell: Sh
                              command: |-
                                ## Insert commands to upload the artifact to JFrog artifactory. You could also use the built-in Upload Artifact to JFrog Artifactory step, instead of a Run step.
                            when: ## Run this step only if the jfrog_InstanceType is onprem.
                              stageStatus: Success
                              condition: <+stage.variables.jfrog_InstanceType> ==
                                "onprem"
                  when: ## Run this step group only if the jfrog_uploadArtifact variable is true.
                    stageStatus: Success
                    condition: <+stage.variables.jfrog_uploadArtifact> == "true"
                  failureStrategies: []
        variables:
          - name: xcode_scheme
            type: String
            description: ""
            value: my_xcode_scheme
          - name: xcode_provisioningProfile
            type: String
            description: ""
            value: my_app.provisioning.profile
          - name: jfrog_InstanceType
            type: String
            description: ""
            value: saas
          - name: xcode_xcworkspaceLocation
            type: String
            description: ""
            value: my.xcworkspace
          - name: xcode_archivePath
            type: String
            description: ""
            value: my.xcarchive
          - name: xcode_type
            type: String
            description: ""
            value: xcworkspace
          - name: jfrog_uploadArtifact
            type: String
            description: ""
            value: "true"
          - name: certpath_preference
            type: String
            description: ""
            value: Profiles
          - name: profiles_preference
            type: String
            description: ""
            value: Profiles
          - name: exportoptions_preference
            type: String
            description: ""
            value: Profiles
          - name: suppress_cocoapods
            type: String
            description: ""
            value: "true"
          - name: load_certificates
            type: String
            description: ""
            value: "true"
        delegateSelectors:
          - macos-ci-delegate
  delegateSelectors:
    - macos-ci-delegate
  variables:
    - name: build_anka_image
      type: String
      description: ""
      value: osx-pool
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODEBASE_REPO_NAME
        build:
          type: tag
          spec:
            tag: 1.2.3456
  tags: {}
  projectIdentifier: default
  orgIdentifier: default
```

</TabItem>
  <TabItem value="ex2" label="Example: Use Fastlane and Swift">

This example uses fastlane to build and test a Swift-based iOS app project. This example uses [step templates](/docs/platform/templates/template) to repeat common steps in each stage. You can use [input sets](/docs/platform/pipelines/input-sets) to make customizable templates that allow users to use the same pipeline for multiple use cases by varying the input for certain values provided at runtime.

```yaml
pipeline:
  name: iOS Build
  identifier: iOS_Build
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: iOS Unit Tests
        identifier: iOS_Unit_Tests
        type: CI
        spec:
          caching: ## This pipeline uses Cache Intelligence.
            enabled: true
            paths:
              - /Users/anka/Library/Caches/org.swift.swiftpm
          cloneCodebase: true
          platform: ## This pipeline uses Harness Cloud build infrastructure.
            os: MacOS
            arch: Arm64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - stepGroup: ## This pipeline uses step templates to setup Fastlane variables and install dependencies. Using templates ensures uniformity across pipelines.
                  name: Environment Setup
                  identifier: Environment_Setup
                  steps:
                    - parallel:
                        - step:
                            name: Fastlane Variables
                            identifier: Fastlane_Variables
                            template: 
                              templateRef: Fastlane_Variables
                              versionLabel: "1.0"
                        - step:
                            name: Bundle Install
                            identifier: Bundle_Install
                            template:
                              templateRef: Bundle_Install
                              versionLabel: 1.0.0
                        - step:
                            type: Run
                            name: Brew Install
                            identifier: Brew_Install
                            spec:
                              shell: Sh
                              command: brew install <+repeat.item>
                            strategy: ## This step uses a repeat strategy to loop over 'brew install' commands.
                              repeat:
                                items:
                                  - xcbeautify
                                  - swiftlint
              - step:
                  type: Run
                  name: Unit Tests
                  identifier: Unit_Tests
                  spec:
                    shell: Sh
                    command: fastlane do_unit_tests
    - stage:
        name: iOS Build
        identifier: iOS_Build
        type: CI
        spec:
          caching:
            enabled: true
            paths:
              - /Users/anka/Library/Caches/org.swift.swiftpm
          cloneCodebase: true
          platform:
            os: MacOS
            arch: Arm64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - stepGroup:
                  ## Repeat environment setup step group from first stage.
              - step:
                  type: Run
                  name: Build and upload QA test
                  identifier: Build_and_upload_QA_test
                  spec:
                    shell: Sh
                    command: |-
                      ## Insert commands to upload build for QA testing.
    - stage: ## This is a custom stage that include a Jira Update step. The step updates all Jira issues associated with this build so that testers can test them in QA.
        name: JIRA Status
        identifier: JIRA_Status
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: JiraUpdate
                  name: Update JIRA
                  identifier: Update_JIRA
                  spec:
                    connectorRef: YOUR_JIRA_CONNECTOR_ID
                    issueKey: <+repeat.item>
                    transitionTo:
                      transitionName: ""
                      status: Ready for QA
                    fields:
                      - name: Assignee
                        value: qa.tester@company.com
                      - name: Description
                        value: This is available for QA testing.
                  timeout: 10m
                  strategy:
                    repeat:
                      items: ## List Jira keys to update.
        tags: {}
        when:
          pipelineStatus: Success
          condition: "false"
  variables: ## These are some possible fastlane variables that could be set in the Environment Setup steps.
    - name: FL_BUILD_NUMBER ## This variable gets its value from a Harness expression.
      type: String
      description: Job ID for pipeline.
      required: false
      value: <+pipeline.sequenceId>
    - name: IS_CI
      type: String
      description: ""
      required: false
      value: "1"
    - name: FL_REPO_BRANCH
      type: String
      description: Branch from which this pipeline was triggered.
      required: false
      value: <+input>
    - name: FL_RELEASE_NOTES ## This variable accepts user input for the value, and it provides a list of allowed values for the user to choose from.
      type: String
      description: ""
      required: false
      value: <+input>.default(automatic).allowedValues(automatic,manual)
    - name: FL_OVERRIDE_RELEASE_NOTES ## This variable accepts any user input as the value.
      type: String
      description: Use this option if you want to override automatic JIRA Release Notes. Must set FL_RELEASE_NOTES to manual.
      required: false
      value: <+input>
    - name: FL_LOGGING_ENABLED
      type: String
      description: ""
      required: false
      value: "true"
    - name: FL_BUILD_SCHEMES ## This variable accepts user input for the value, and it provides a list of allowed values for the user to choose from.
      type: String
      description: ""
      required: false
      value: <+input>.allowedValues(AppStore Test, Prod, Test).executionInput()
    - name: FL_BUILDSCRIPT_BRANCH
      type: String
      description: ""
      required: false
      value: feature/CI_CD_2_0
    - name: FL_QA_ASSIGNEE
      type: String
      description: Email Address of the QA tester for the build
      required: false
      value: <+input>
    - name: FL_BUILD_VERSION
      type: String
      description: Version number of the project which is used to generate builds. The format of the version number should always be Major.Minor.Patch, such as 10.8.0.
      required: false
      value: <+input>
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
```

</TabItem>
  <TabItem value="ex3" label="Example: Build, test, deploy in one stage">

This example demonstrates a pipeline that builds, tests, and deploys a mobile app in one stage.

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
                  identifier: build
                  name: build
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild clean build -workspace "myProject.xcworkspace" -scheme "myProject"
              - step:
                  type: Run
                  name: test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      xcodebuild test -workspace "myProject.xcworkspace" -scheme "myProject"
              - step:
                  type: Run
                  name: deploy
                  identifier: deploy
                  spec:
                    shell: Sh
                    command: |-
                      ## Install certs
                      CERTIFICATE_P12=certificate.p12
                      echo $APPLE_DISTRIBUTION_CERTIFICATE_KEY | base64 --decode > $CERTIFICATE_P12
                      security unlock-keychain -p $BUILD_KEY_CHAIN_PASSWORD $BUILD_KEY_CHAIN
                      security set-keychain-settings $BUILD_KEY_CHAIN
                      security import $CERTIFICATE_P12 -k $BUILD_KEY_CHAIN -P $APPLE_DISTRIBUTION_CERTIFICATE_PASSWORD -T /usr/bin/codesign;
                      security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k $BUILD_KEY_CHAIN_PASSWORD $BUILD_KEY_CHAIN
                      rm -fr *.p12

                      ## Provison profile
                      PROFILE_FILE=${DISTRIBUTION_PROVISION_UUID}.mobileprovision
                      echo $DISTRIBUTION_PROVISION_KEY | base64 --decode > $PROFILE_FILE
                      cp ${PROFILE_FILE} "$HOME/Library/MobileDevice/Provisioning Profiles/${DISTRIBUTION_PROVISION_UUID}.mobileprovision"
                      rm -fr *.mobileprovision

                      ## Define variables for archive
                      ARCHIVE_PATH="$HOME/Library/Developer/Xcode/Archives/myProject/${CI_COMMIT_SHA}/${CI_JOB_ID}.xcarchive"
                      EXPORT_PATH="$HOME/Library/Developer/Xcode/Archives/myProject/${CI_COMMIT_SHA}/${CI_JOB_ID}/"

                      ## Create archive
                      xcodebuild -workspace myProject.xcworkspace -scheme "myProject" clean archive -sdk iphoneos -archivePath $ARCHIVE_PATH PROVISIONING_PROFILE_SPECIFIER="${DISTRIBUTION_PROVISION_UUID}" CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY="${CODE_SIGN_IDENTITY}" | xcpretty --c

                      xcodebuild -exportArchive -archivePath $ARCHIVE_PATH -exportOptionsPlist ExportOptionsAppStore.plist -exportPath $EXPORT_PATH PROVISIONING_PROFILE_SPECIFIER="${DISTRIBUTION_PROVISION_UUID}" CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY="${CODE_SIGN_IDENTITY}"

                      IPA="${EXPORT_PATH}myProject.ipa"

                      ## Upload to App Store
                      xcrun altool --upload-app -t ios -f $IPA -u $ITC_USER_NAME -p $ITC_USER_PASSWORD
                    envVariables:
                      ITC_USER_NAME: <+secrets.getValue("my_app_store_id)>
                      ITC_USER_PASSWORD: <+secrets.getValue("my_app_store_app_password")>
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

:::note

The above example was adapted from a [Canopas blog post that used GitLab CI to demonstrate mobile app deployment](https://blog.canopas.com/a-complete-guide-to-ios-app-auto-deployment-with-ci-cd-b5dc516ba41d). For more information about converting GitLab workflows to Harness CI pipelines, go to [Migrate from GitLab CI to Harness CI](/docs/continuous-integration/migration-guides/migrating-from-gitlab).

:::

</TabItem>
  <TabItem value="ex4" label="Example: Use Bitrise Steps">

This example shows how you can run Bitrise Steps in the Harness CI [Bitrise step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-bitrise-plugin) to deploy an Android app. This example is based on [Bitrise workflow recipes for Android apps](https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-workflows/workflow-recipes-for-android-apps.html), and the same concepts apply to [Bitrise workflow recipes for iOS apps](https://devcenter.bitrise.io/en/steps-and-workflows/introduction-to-workflows/workflow-recipes-for-ios-apps.html).

```yaml
              - step:
                  type: Bitrise
                  name: change android version
                  identifier: change_android_version
                  spec:
                    uses: github.com/bitrise-steplib/steps-change-android-versioncode-and-versionname.git ## Specify the Bitrise Step's GitHub repo.
                    with: ## Define settings (inputs) required for the steps.
                      new_version_name: '1.1.0'
                      new_version_code: '<+pipeline.sequenceId>'
                      build_gradle_path: '/path/to/build.gradle'
              - step:
                  type: Bitrise
                  name: bitrise android build
                  identifier: bitrise_android_build
                  spec:
                    uses: github.com/bitrise-steplib/bitrise-step-android-build.git
                    with:
                      project_location: '/path/to/build.gradle'
                      variant: 'release'
                      build_type: 'aab'
              - step:
                  type: Bitrise
                  name: bitrise sign apk
                  identifier: bitrise_sign_apk
                  spec:
                    uses: github.com/bitrise-steplib/steps-sign-apk.git
                    with:
                      android_app: '/path/to/aab'
              - step:
                  type: Bitrise
                  name: bitrise google play deploy
                  identifier: bitrise_google_play_deploy
                  spec:
                    uses: github.com/bitrise-steplib/steps-google-play-deploy.git
                    with:
                      service_account_json_key_path: '$SERVICE_ACCOUNT_KEY_URL'
                      package_name: 'my.android.project'
                      app_path: '/path/to/signed/aab'
                      track: 'beta'
                    env: ## Define environment variables, if required by the step.
                      SERVICE_ACCOUNT_KEY_URL: <+secrets.getValue("json_key_path")>
```

</TabItem>
</Tabs>
