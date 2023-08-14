---
title: CI environment variables reference
description: Learn about environment variables in Harness CI pipelines.
sidebar_position: 40
---

This topic describes the Harness CI built-in environment variables, namely those prefixed by `DRONE_` or `CI_`. These variables contain information about the build, such as how the build started, codebase information, build infrastructure, step identifiers, and more. These are [pipeline variables](/docs/platform/Variables-and-Expressions/harness-variables#pipeline), and they are available to all stages and steps in the pipeline.

Many `DRONE_` and `CI_` variables are identical or have equivalent [Harness expressions](/docs/platform/Variables-and-Expressions/harness-variables). For example `DRONE_BUILD_NUMBER` is the same as `<+pipeline_sequenceId>`.

## Difference between DRONE_, CI_, and PLUGIN_ variables

`DRONE_` and `CI_` variables are environment variables that are automatically set at the pipeline level. These are [pipeline variables](/docs/platform/Variables-and-Expressions/harness-variables#pipeline), and they are available to all stages and steps in the pipeline. You might notice that many `DRONE_` and `CI_` variables are the same. The `DRONE_` variables are derived from Drone, which is part of Harness CI. Providing first-class support for [Drone environment variables](https://docs.drone.io/pipeline/environment/reference/) makes it easier to migrate from standalone Drone to Harness CI and provides better support for [Drone plugins](../use-drone-plugins/explore-ci-plugins.md) that use those variables.

`PLUGIN_` variables represent [plugin](../use-drone-plugins/explore-ci-plugins.md) settings, and they are defined in either:

* In the [plugin step's settings](../use-drone-plugins/plugin-step-settings-reference.md#settings). For example, a `setting.url` becomes `PLUGIN_URL` at runtime.
* As stage variables. For example, you can use the `PLUGIN_DRY_RUN` stage variable to [Build a Docker image without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#build-a-docker-image-without-pushing).

## Reference environment variables

There are several ways to reference Harness CI environment variables.

* Direct reference, when available, such as `DRONE_BUILD_NUMBER`.
* The pipeline variable expression syntax: `<+pipeline.variable.VARIABLE_NAME>`. For example, to reference `DRONE_BUILD_NUMBER`, you would use the expression `<+pipeline.variable.DRONE_BUILD_EVENT>`.
* Equivalent [Harness expressions](/docs/platform/Variables-and-Expressions/harness-variables), such as expressions for [built-in CI codebase variables](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference).

## How and when environment variables get resolved

`DRONE_` environment variables are based on each pipeline run. A variable is resolved only if the build includes the necessary information for that variable. For example, `DRONE_PULL_REQUEST` is only resolved if the build started from a pull request. Builds that aren't started from a PR won't have a PR number to assign to that variable.

This page describes the expected content for `DRONE` variables for the following scenarios:

* Manual branch builds: Manual branch builds occur when you manually run your pipeline in the Harness UI and select the **Git Branch** build type. Harness looks for the source code attached to the specified **Branch Name**, and it clones that specific source code for the build.
* Manual pull request (PR) builds: Manual pull request builds occur when you manually run your pipeline in the Harness UI and select the **Git Pull Request** build type. Harness looks for the source code attached to the specified **Pull Request Number**, and it clones that specific source code for the build.
* Manual tag builds: Manual tag builds occur when you manually run your Harness pipeline from the Harness UI and select the **Git Tag** build type. Harness looks for the source code attached to the specified **Tag Name**, and it clones that specific source code for the build.
* pull request (PR) triggers: A **Pull Request Webhook Event** automatically starts a build in Harness when there is a new pull request event on the pipeline's associated Git repo. You can specify the type of pull request [events](/docs/platform/Pipelines/w_pipeline-steps-reference/triggers-reference#event-and-actions) to track, such as close, open, update/edit, reopen, and so on.
* Push triggers: A **Push Webhook Event** automatically starts a build in Harness when there is a new branch or tag push event on the pipeline's associated Git repo.

For more information about Git triggers, go to [Trigger pipelines using Git events](/docs/platform/Triggers/triggering-pipelines) and the [Webhook triggers reference](/docs/platform/Pipelines/w_pipeline-steps-reference/triggers-reference).

<!-- Tag push trigger YAML example

```yaml
        payloadConditions:
          - key: <+trigger.payload.ref>
            operator: StartsWith
            value: refs/tags/
```
-->

## CI

## DRONE

## DRONE_BRANCH

## DRONE_BUILD_ACTION

## DRONE_BUILD_CREATED

## DRONE_BUILD_EVENT

## DRONE_BUILD_FINISHED

## DRONE_BUILD_LINK

## DRONE_BUILD_NUMBER

## DRONE_BUILD_PARENT

## DRONE_BUILD_STARTED

## DRONE_BUILD_STATUS

## DRONE_BUILD_TRIGGER

## DRONE_CALVER

## DRONE_COMMIT

## DRONE_COMMIT_AFTER

## DRONE_COMMIT_AUTHOR

## DRONE_COMMIT_AUTHOR_AVATAR

## DRONE_COMMIT_AUTHOR_EMAIL

## DRONE_COMMIT_AUTHOR_NAME

## DRONE_COMMIT_BEFORE

## DRONE_COMMIT_BRANCH

## DRONE_COMMIT_LINK

## DRONE_COMMIT_MESSAGE

## DRONE_COMMIT_REF

## DRONE_COMMIT_SHA

## DRONE_DEPLOY_TO

## DRONE_FAILED_STAGES

## DRONE_FAILED_STEPS

## DRONE_GIT_HTTP_URL

## DRONE_GIT_SSH_URL

## DRONE_PULL_REQUEST

## DRONE_PULL_REQUEST_TITLE

## DRONE_REMOTE_URL

## DRONE_REPO

## DRONE_REPO_BRANCH

## DRONE_REPO_LINK

## DRONE_REPO_NAME

## DRONE_REPO_NAMESPACE

## DRONE_REPO_OWNER

## DRONE_REPO_PRIVATE

## DRONE_REPO_SCM

## DRONE_REPO_VISIBILITY

## DRONE_SEMVER

## DRONE_SEMVER_BUILD

## DRONE_SEMVER_ERROR

## DRONE_SEMVER_MAJOR

## DRONE_SEMVER_MINOR

## DRONE_SEMVER_PATCH

## DRONE_SEMVER_PRERELEASE

## DRONE_SEMVER_SHORT

## DRONE_SOURCE_BRANCH

## DRONE_STAGE_ARCH

## DRONE_STAGE_DEPENDS_ON

## DRONE_STAGE_FINISHED

## DRONE_STAGE_KIND

## DRONE_STAGE_MACHINE

## DRONE_STAGE_NAME

## DRONE_STAGE_NUMBER

## DRONE_STAGE_OS

## DRONE_STAGE_STARTED

## DRONE_STAGE_STATUS

## DRONE_STAGE_TYPE

## DRONE_STAGE_VARIANT

## DRONE_STEP_NAME

## DRONE_STEP_NUMBER

## DRONE_SYSTEM_HOST

## DRONE_SYSTEM_HOSTNAME

## DRONE_SYSTEM_PROTO

## DRONE_SYSTEM_VERSION

## DRONE_TAG

## DRONE_TARGET_BRANCH

## DRONE_WORKSPACE
