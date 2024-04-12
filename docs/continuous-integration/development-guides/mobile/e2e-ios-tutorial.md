---
title: Tutorial - React Native and iOS pipeline
description: Build and publish a React Native iOS app to TestFlight using Fastlane in Harness CI
sidebar_position: 3
---

Harness CI Cloud offers Mac infrastructure which can be used to build, test and publish iOS applications.

[React Native](https://reactnative.dev/) is an open source UI framework from [Meta](https://www.meta.com/). React Native enables developers to write natively-rendered Android and iOS applications in the [React](https://react.dev/) framework.

This guide covers how to build, test and publish a React Native iOS app to Apple's [TestFlight](https://testflight.apple.com/) service with [Fastlane](https://fastlane.tools/).

## Prerequisites

- Harness account with Mac infra FF enabled __TODO add feature flag info__
- Git provider
- Apple account enrolled in the [Apple Developer Program](https://developer.apple.com/support/compare-memberships/) ($99 USD per year), or admin access to [App Store Connect](https://developer.apple.com/help/app-store-connect/get-started/app-store-connect-homepage) for an existing account

## Create React Native app

React Native provides their own quickstart guide for these steps [here](https://reactnative.dev/docs/environment-setup?guide=native).

Generate a sample project with the [react-native-cli](https://github.com/react-native-community/cli/tree/v12.3.6?tab=readme-ov-file#creating-a-new-react-native-project).

```
npx react-native@0.73.6 init --package-name PACKAGE_NAME APP_NAME
```

Passing `--package-name PACKAGE_NAME` ensures a unique [Bundle ID](https://developer.apple.com/documentation/appstoreconnectapi/bundle_ids) for the application. `PACKAGE_NAME` should be in reverse-DNS format. For example, since Apple owns [apple.com](http://apple.com/), all Apple bundle IDs are prefixed with `com.apple.` (see [Bundle IDs for native iPhone and iPad apps](https://support.apple.com/en-gb/guide/deployment/depece748c41/web)). Your app's bundle ID must be a [uniform type identifier](https://developer.apple.com/documentation/uniformtypeidentifiers) (UTI), and is case insensitive. 

`APP_NAME` is the name of your application, it must be alphanumeric and less than 30 characters.

Answer the necessary prompts.

## iOS simulator

Change to the application directory

```
cd APP_NAME
```

Run your app in the iOS Simulator.

```
npm run ios
```

The app will take a few minutes to build and install the app in the simulator.

import Simulator from './static/simulator.png';

<img src={Simulator} alt="iOS Simulator" style={{width: 400}} />

Any changes to the file `App.tsx` will immediately be reflected in the simulator.

## Git repository

Create a new repository in your Git provider, commit and push the contents of your application.

## App icons

This sample application will not have an [icon](https://developer.apple.com/design/human-interface-guidelines/app-icons), an icon is required before the app can be submitted to TestFlight. 

Open `ios/APP_NAME.xcodeproj` in Xcode and select Images > AppIcon. 

![App icons](./static/appicons.png)

Generate a set of icons with a service like [appicon.co](http://appicon.co/), drag each generated icon into the appropriate location. 

Commit and push these changes to your Git repository.

## Fastlane

[Fastlane](https://fastlane.tools/) is a command line tool which helps automate beta deployments and releases for mobile applications.

Follow the [setup guide](https://docs.fastlane.tools/getting-started/ios/setup/) to configure Fastlane in your app’s `ios` directory. When running `fastlane init`, choose the "Manual setup" option. This will create a fastlane directory with two files, `Appfile` and `Fastfile`.

### Appfile

At a minimum, you will need to set `app_identifier` and `apple_id` in `fastlane/Appfile`.

`app_identifier` is the Bundle ID of the app (referred to as `PACKAGE_NAME` in the initialization step above). 

`apple_id` is the Apple email address used to authenticate when publishing the app.

These values can be hard-coded, or they can optionally be passed as environment variables, for example:

```
app_identifier ENV["APP_BUNDLE_ID"]
apple_id ENV["APPLE_USERNAME"]
```

If you have different credentials for App Store Connect and the Apple Developer, you will also need to set `team_id` and `itc_team_id`.

See Fastlane’s [Appfile](https://docs.fastlane.tools/advanced/Appfile/#appfile) documentation for full details on how to write this file for your App Store Connect account.

Commit and push all changes to your Git repository.

### Match

The Fastlane [match](https://docs.fastlane.tools/actions/match/) [action](https://docs.fastlane.tools/actions/) makes it easier to share signing credentials across teams, as well as your Harness pipeline.

match creates all required certificates and provisioning profiles, and stores them in a separate git repository, Google Cloud, or Amazon S3. Every team member with access to the selected storage can use those credentials for code signing.

Follow the [setup guide](https://docs.fastlane.tools/actions/match/#setup) to configure match in the ios directory of your project. This will create the file `fastlane/Matchfile`.

:::info

This next step requires __Developer__ permissions in the App Store Connect account.

:::

When using a Git repository for storage, you will be prompted for a password that will be used to encrypt all files in the repository. __Store this password in a secure location.__ Follow [this documentation](../../../platform/secrets/add-use-text-secrets/#add-a-text-secret) to add the password as a text secret to your project named `MATCH_PASSWORD`.

Commit and push all changes to your Git repository.

### App Store Connect API Key

Follow Apple’s [Creating API Keys for App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api) documentation to create a "Team Key" (an "Individual Key" will not work).

:::info

This step requires __Admin__ permissions in the App Store Connect account.

:::

Store the "Issuer ID" as a text secret in your project named `APPLE_API_KEY_ISSUER_ID`.

Store the "Key ID" as a text secret in your project named `APPLE_API_KEY_ID`.

The API key itself is a file, it must be base64 encoded before it can be stored as a secret.

Save the API key to a file (such as `api-key.p8`) and encode it using your terminal.

```
cat api-key.p8 | base64
```

Save the encoded string as a [text secret](../../../platform/secrets/add-use-text-secrets/#add-a-text-secret) in your project named `APPLE_API_KEY_CONTENT`.

### Fastfile

The `fastlane/Fastfile` file stores the automation configuration that can be run with Fastlane. The file consists of [lanes](https://docs.fastlane.tools/advanced/lanes/#lanes) that define each step in your app’s workflow.

In this example, we will create lanes to build and sign the app, and publish it to Apple’s [TestFlight](https://developer.apple.com/testflight/) service with a unique build number based on the Harness pipeline execution.

Your `fastlane/Fastfile` currently looks like this.

```ruby {} showLineNumbers
default_platform(:ios)

platform :ios do
  desc "Description of what the lane does"
  lane :custom_lane do
    # add actions here: https://docs.fastlane.tools/actions
  end
end
```

Add all lanes in the `platform: ios` section.

Add a lane for loading the Apple Store Connect API key information.

```ruby
  desc "Load ASC API Key information to use in subsequent lanes"
  lane :load_asc_api_key do
    app_store_connect_api_key(
        key_id: ENV["APPLE_API_KEY_ID"],
        issuer_id: ENV["APPLE_API_KEY_ISSUER_ID"],
        key_content: ENV["APPLE_API_KEY_CONTENT"],
        is_key_content_base64: true,
        in_house: false
  )
  end
```

See the [app_store_connect_api_key](https://docs.fastlane.tools/actions/app_store_connect_api_key/) action documentation for more details.

Add a lane to run the match action.

```ruby
  desc "Uses match to pull in developer profile and certificates from git repo specified in Matchfile"
  lane :prep_build_release do
    api_key = lane_context[SharedValues::APP_STORE_CONNECT_API_KEY]
    match(type: "appstore", api_key: api_key)
  end 
```

See the [match](https://docs.fastlane.tools/actions/match/) action documentation for more details.

Add a lane to upload the app to TestFlight.

```ruby
  desc "Upload to TestFlight / ASC"
  lane :deliver_to_testflight do
    api_key = lane_context[SharedValues::APP_STORE_CONNECT_API_KEY]

    deliver(
        api_key: api_key,
        skip_screenshots: true,
        skip_metadata: true,
        skip_app_version_update: true,
        force: true,
        run_precheck_before_submit: false
    )
  end
```

See the [deliver](https://docs.fastlane.tools/actions/deliver/) action documentation for more details.

Add a lane that will run all lanes in order to publish the app to TestFlight.

```ruby
  desc "Push a new beta build to TestFlight"
  lane :beta do
    setup_ci if ENV['CI']
    load_asc_api_key
    prep_build_release

    # Read app_identifier from Appfile
    app_identifier = CredentialsManager::AppfileConfig.try_fetch_value(:app_identifier)
    
    profile_name = "match AppStore PACKAGE_NAME"
    output_name = "APP_NAME"

    # turn off automatic signing, signing is handled by 'match'
    update_code_signing_settings(
        use_automatic_signing: false,
        targets: ["APP_NAME"],
        code_sign_identity: "Apple Distribution",
        bundle_identifier: app_identifier,
        profile_name: profile_name,
        build_configurations: ["Release"],
        team_id: "TEAM_ID"
    )
    
    # Set the build number based on the Harness pipeline execution ID
    increment_build_number(
        build_number: ENV["HARNESS_BUILD_ID"],
    )
    
    build_app(
      workspace: "APP_NAME.xcworkspace",
      scheme: "APP_NAME",
      output_name: output_name,
      configuration: "Release",
      export_options: {
          method: "app-store"
      }
    )
    
    deliver_to_testflight
  end
```

Replace instances of `APP_NAME` and `PACKAGE_NAME` with the values from the initialization step above. Replace `TEAM_ID` with your App Store Connect team ID.

See the [update_code_signing_settings](https://docs.fastlane.tools/actions/update_code_signing_settings/),  [increment_build_number](https://docs.fastlane.tools/actions/increment_build_number/) and [build_app](https://docs.fastlane.tools/actions/build_app/) actions documentation for more details.

Add a lane that will only build, not publish the app. This lane will be used in pull request pipelines to ensure the app can be built.

```ruby
  desc "Build without code sign. Just to see if the build is working."
  lane :build do
    build_app(
      workspace: "APP_NAME.xcworkspace",
      scheme: "APP_NAME",
      skip_package_ipa: true,
      skip_archive: true,
      skip_codesigning: true,
      silent: true,
      clean: true
    )
  end
```

Replace instances of `APP_NAME` with the value from the initialization step above.

Commit and push all changes to your Git repository.

## Harness pipeline

In your Harness account, select your desired project, then choose the Continuous Integration module. Follow the "Get Started" wizard to connect your Git provider, activate your iOS app repository, and create an initial pipeline.

### Security scans stage

Create a new stage in your pipeline named "Security". Select "Linux" from the "Infrastructure" tab.

In the pipeline YAML editor, add a "Run" step named __NPM Install__.

```yaml

              - step:
                  type: Run
                  name: NPM Install
                  identifier: NPM_Install
                  spec:
                    shell: Sh
                    command: |-
                      mkdir $HOME/nodejs
                      curl -L https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz | tar xJ -C $HOME/nodejs
                      export PATH=$HOME/nodejs/node-v${NODE_VERSION}-linux-x64/bin:$PATH
                      npm install --global yarn
                      yarn
                    envVariables:
                      NODE_VERSION: 18.16.0
```

In the pipeline YAML editor, add parallel steps for [Owasp](../../../security-testing-orchestration/sto-techref-category/owasp-scanner-reference/) and [Gitleaks](../../../security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference/) scans.

```yaml
              - parallel:
                  - step:
                      type: Owasp
                      name: Owasp
                      identifier: Owasp
                      spec:
                        mode: orchestration
                        config: default
                        target:
                          type: repository
                          name: iOS app
                          variant: main
                        advanced:
                          log:
                            level: info
                          fail_on_severity: none
                  - step:
                      type: Gitleaks
                      name: Gitleaks
                      identifier: Gitleaks
                      spec:
                        mode: orchestration
                        config: default
                        target:
                          type: repository
                          detection: auto
                        advanced:
                          log:
                            level: info
                          fail_on_severity: low
```

### Unit tests

We will make some code changes related to unit tests.

Your project will have a `tests/App.test.tsx` file with one [Jest](https://jestjs.io/) unit test.

Run the tests from the root of your repository.

```
npm test
```

You will see this output.

```
> io.harness.exampleapp@0.0.1 test
> jest

 PASS  __tests__/App.test.tsx
  ✓ renders correctly (97 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.495 s, estimated 1 s
Ran all test suites.
```

Harness supports test results that are in [JUnit XML format](../../../continuous-integration/use-ci/run-tests/test-report-ref/), which is supported by jest-junit.

Install jest-junit.

```
npm install --save-dev jest-junit
```

Edit the file `jest.config.js`.

```
module.exports = {
  preset: 'react-native',
  reporters: [ "default", "jest-junit" ],
};
```

Run the tests again.

```
npm test
```

The tests will generate a `junit.xml` file which can be read by Harness.

:::tip

You can optionally add `junit.xml` to your repository’s `.gitignore` file.

There is no need to check this file into your repository, since it is automatically generated.

:::

Commit and push all changes to your Git repository.

### Build stage

Create a new stage in your pipeline stage named "Build". Select "MacOS" from the "Infrastructure" tab.

In the pipeline YAML editor, add a "Run" step named __Run NPM Tests__.

```yaml
              - step:
                  type: Run
                  name: Run NPM Tests
                  identifier: Run_NPM_Tests
                  spec:
                    shell: Sh
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - junit.xml
                    command: |
                      yarn
                      npm test
```

Add a "Run" step named Install Build Dependencies.

```yaml
              - step:
                  identifier: Install_Build_Dependencies
                  type: Run
                  name: Install Build Dependencies
                  spec:
                    shell: Sh
                    envVariables:
                      BUNDLE_JOBS: "4"
                      BUNDLE_RETRY: "3"
                    command: |-
                      cd ios

                      gem update --system
                      gem install bundler
                      bundle install
                      gem install cocoapods

                      chmod 0600 /Users/anka/.netrc
                      pod install
```

Add a "Run" step named Build.

```yaml
              - step:
                  identifier: Build
                  type: Run
                  name: Build
                  spec:
                    shell: Bash
                    envVariables:
                      CI: "true"
                      APPLE_USERNAME: <+secrets.getValue("APPLE_USERNAME")>
                      APPLE_API_KEY_ID: <+secrets.getValue("APPLE_API_KEY_ID")>
                      APPLE_API_KEY_ISSUER_ID: <+secrets.getValue("APPLE_API_KEY_ISSUER_ID")>
                      APPLE_API_KEY_CONTENT: <+secrets.getValue("APPLE_API_KEY_CONTENT")>
                      MATCH_PASSWORD: <+secrets.getValue("MATCH_PASSWORD")>
                      MATCH_USERNAME: APPLE_ID_USERNAME
                    command: |-
                      cd ios

                      # Pin Xcode version
                      sudo xcode-select -switch /Applications/Xcode_15.2.app
                      
                      if [ "$CI_BUILD_EVENT" == "pull_request" ]; then
                        FASTLANE_LANE=build
                      else
                        FASTLANE_LANE=beta
                      fi
                      bundle exec fastlane $FASTLANE_LANE
```

Replace `APPLE_ID_USERNAME` with your Apple ID username.

:::tip

You may need to pass additional [match](https://docs.fastlane.tools/actions/match/) secrets.

For example, if you are storing your certificates in Git, you will also need to pass `MATCH_GIT_BASIC_AUTHORIZATION`.

:::

## Trigger pipeline

Save and manually trigger the pipeline.

The __Security Scans__ stage execution will look like this.

![Security scans stage](./static/securitystage.png)

The __Build__ stage execution will look like this.

![Build stage](./static/buildstage.png)

When complete, you will see a successful message from Fastlane.

```
fastlane.tools finished successfully 🎉
```

To see your published build:
1. Login to https://appstoreconnect.apple.com
2. Select "Apps"
3. Select your app from the list
4. Click the "TestFlight" tab
5. The build of your app will appear in the list

## Next steps

- Learn about [TestFlight](https://testflight.apple.com/) and install your app on your iOS devices
- [Invite testers](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers/) to try your app on their devices
- Learn how to [submit your app for review](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-for-review/)