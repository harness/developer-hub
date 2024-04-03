---
title: CI environment variables reference
description: Learn about environment variables in Harness CI pipelines.
sidebar_position: 50
---

This topic describes some Harness CI built-in environment variables. These variables contain information about the build, such as how the build started, codebase information, build infrastructure, step identifiers, and more. These are [pipeline variables](/docs/platform/variables-and-expressions/harness-variables#pipeline), and they are available to all stages and steps in the pipeline.

Additional environment variables can be present based on your build infrastructure and pipeline configuration. You can use a `printenv` command in a [Run step](/docs/continuous-integration/use-ci/run-step-settings.md) to get a list of environment variables.

## Reference environment variables

You can reference Harness CI environment variables through either:

* Direct reference in scripts and commands, when available, such as `machine ${DRONE_NETRC_MACHINE}`.
* Equivalent [Harness expressions](/docs/platform/variables-and-expressions/harness-variables), such as `<+pipeline.sequenceId>` for `HARNESS_BUILD_ID`.

## Variable resolution

The value of an environment variable depends on the build conditions. A variable is resolved only if the build includes the necessary information for that variable.

For example, `DRONE_PULL_REQUEST` is only resolved if the build started from a pull request. Builds that aren't started from a PR won't have a PR number to assign to that variable.

### Environment variable values in manual builds

Manual builds occur when you manually run a pipeline from within Harness. If your pipeline has a [codebase configuration](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md), you can select a branch, PR, or tag to build.

* **Manual branch builds:** Manually run a pipeline and select the **Git Branch** build type. Harness looks for the source code attached to the specified **Branch Name**, and it clones that specific source code for the build.
* **Manual pull request (PR) builds**: Manually run a pipeline and select the **Git Pull Request** build type. Harness looks for the source code attached to the specified **Pull Request Number**, and it clones that specific source code for the build.
* **Manual tag builds:** Manually run a pipeline and select the **Git Tag** build type. Harness looks for the source code attached to the specified **Tag Name**, and it clones that specific source code for the build.

### Webhook triggers

You can automatically [trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines). [Webhook triggers](/docs/platform/triggers/triggers-reference) listen for specific events in your code repo, and then trigger builds when those events occur.

* **Pull request (PR) triggers:** A **Pull Request Webhook Event** automatically starts a build in Harness when there is a new pull request event on the pipeline's associated Git repo. You can specify the type of [pull request events](/docs/platform/triggers/triggers-reference#event-and-actions) to track, such as close, open, update/edit, reopen, and so on.
* **Push triggers:** A **Push Webhook Event** automatically starts a build in Harness when there is a new branch or tag push event on the pipeline's associated Git repo.

## Difference between DRONE and PLUGIN variables

`DRONE_` variables are environment variables that are automatically set at the pipeline level. These are [pipeline variables](/docs/platform/variables-and-expressions/harness-variables#pipeline), and they are available to all stages and steps in the pipeline. Many `DRONE_` variables have equivalent `CI_` or `HARNESS_` environment variables. The `DRONE_` variables are derived from Drone, which is part of Harness CI. Providing first-class support for [Drone environment variables](https://docs.drone.io/pipeline/environment/reference/) makes it easier to migrate from standalone Drone to Harness CI and provides better support for [Drone plugins](../use-drone-plugins/run-a-drone-plugin-in-ci.md) that use those variables.

`PLUGIN_` variables represent [plugin settings](../use-drone-plugins/plugin-step-settings-reference.md#settings). There are three ways they can be defined depending on their usage and the build infrastructure:

   * The [plugin step's settings](../use-drone-plugins/plugin-step-settings-reference.md#settings). For example, `setting.url` becomes `PLUGIN_URL` at runtime.
   * Stage variables. For example, you can use the `PLUGIN_DRY_RUN` stage variable to [Build a Docker image without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push.md).
   * Environment variables in Build and Push steps running on Kubernetes cluster build infrastructure.

## Codebase and trigger variables

These variables contain codebase attributes and information about how builds start (triggers). For more information about codebase attributes and expressions you can use to reference codebase attributes, go to the [CI codebase variables reference](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference).

### DRONE_BRANCH

For branch builds and PR builds, this variable's value is the target branch for the build.

For tag push webhook triggers, this variable's value is the tag reference, such as `refs/tags/TAG_NAME`.

For manual tag builds, this variable is not applicable and can be empty.

Depending on the build type, this can be equivalent to the expressions `<+codebase.targetBranch>` or `<+codebase.branch>`.

This variable is similar to [`DRONE_COMMIT_BRANCH`](#drone_commit_branch) and [`DRONE_TARGET_BRANCH`](#drone_target_branch).

### DRONE_BUILD_ACTION

Only applicable to [PR webhook triggers](#webhook-triggers), this variable describes the PR event that triggered the build, such as `open` or `reopen`.

For all other build types, this variable is not applicable.

This variable is similar, but not equivalent, to the expression `<+trigger.event>`.

### DRONE_BUILD_EVENT

The type of event that started the build, such as `push`, `pull_request`, or `tag`.

This is similar to the expressions `<+codebase.build.type>` and `<+pipeline.triggerType>`.

### DRONE_BUILD_TRIGGER

Source that started the build, a user or webhook. Similar, but not equivalent, to the expressions `<pipeline.triggerType>` or `<pipeline.triggeredBy.name>`. May be empty.

### DRONE_CALVER

Only applicable to build started by tag push webhook triggers. If the Git tag is a valid [calendar version](https://calver.org/) string, this value represents the tag as a valid calver string, such as `19.1.0-beta.20190318`.

Harness CI doesn't support `DRONE_CALVER` variations, such as `DRONE_CALVER_SHORT`.

### DRONE_COMMIT

The full Git commit SHA for the latest commit in the branch, tag, or PR. Corresponds with the expressions `<+codebase.commitSha>` or `<+trigger.commitSha>`.

It can be the same as [`DRONE_COMMIT_SHA`](#drone_commit_sha).

:::info

For Bitbucket PR builds (manual or webhook), this expression returns a shortened SHA due to the Bitbucket webhook payload only sending shortened SHAs.

This isn't the same as the short SHA returned by <+codebase.shortCommitSha>.

:::

### DRONE_COMMIT_AFTER

This variable provides the Git commit SHA after applying a patch. It can be used in conjunction with [`DRONE_COMMIT_BEFORE`](#drone_commit_before) to create a diff.

Possible values include: a unique commit SHA, the same SHA as [`DRONE_COMMIT`](#drone_commit), empty, or all zeros.

### CI_COMMIT_AUTHOR/DRONE_COMMIT_AUTHOR

User name of the Git account associated with the build. Equivalent to the expressions `<+codebase.gitUser>` and `<+trigger.gitUser>`. Can be `null` or masked in build logs.

### CI_COMMIT_AUTHOR_AVATAR/DRONE_COMMIT_AUTHOR_AVATAR

User avatar of the Git account associated with the build. Equivalent to the expression `<+codebase.gitUserAvatar>`. Can be empty.

### CI_COMMIT_AUTHOR_EMAIL/DRONE_COMMIT_AUTHOR_EMAIL

User email of the Git account associated with the build. Equivalent to the expression `<+codebase.gitUserEmail>`. Can be empty/`null` or masked in build logs.

### CI_COMMIT_AUTHOR_NAME/DRONE_COMMIT_AUTHOR_NAME

User-defined display name for the Git user associated with the build. Can be empty.

### DRONE_COMMIT_BEFORE

This variable provides the Git commit SHA before applying a patch. It can be used in conjunction with [`DRONE_COMMIT_AFTER`](#drone_commit_after) to create a diff.

Possible values include: a unique commit SHA, the same SHA as [`DRONE_COMMIT`](#drone_commit), empty, or all zeros.

### CI_COMMIT_BRANCH/DRONE_COMMIT_BRANCH

For branch builds and PR builds, this variable's value is the target branch for the build.

For tag push webhook triggers, this variable's value is the tag reference, such as `refs/tags/TAG_NAME`.

For manual tag builds, this variable is not applicable and can be empty.

Depending on the build type, this can be equivalent to the expressions `<+codebase.targetBranch>` or `<+codebase.branch>`.

This variable is similar to [`DRONE_BRANCH`](#drone_branch) and [`DRONE_TARGET_BRANCH`](#drone_target_branch).

### DRONE_COMMIT_LINK

Provides a link to the commit, PR, or tag in SCM.

For PR builds, this is equivalent to the expression `<+codebase.pullRequestLink>`.

### CI_COMMIT_MESSAGE/DRONE_COMMIT_MESSAGE

The latest commit message from a tag, branch, or PR. Equivalent to the expression `<+codebase.commitMessage>`.

When referenced in an `echo`, this value can cause execution errors if the message has multiple lines. The shell might attempt to execute the commit message as a command. You might need to include additional handling if you want to echo multiline commit messages.

### CI_COMMIT_REF/DRONE_COMMIT_REF

Provides a Git reference corresponding to the branch, tag, or PR. For example:

* Branch reference: `refs/heads/main`
* Tag reference: `refs/tags/v1.0.0`
* PR reference: `refs/pull/1/head`

For manual builds, this can be empty.

This is similar to `<+codebase.commitRef>`.

### CI_COMMIT_SHA/DRONE_COMMIT_SHA

The full Git commit SHA for the latest commit in the branch, tag, or PR. Corresponds with the expressions `<+codebase.commitSha>` or `<+trigger.commitSha>`.

It can be the same as [DRONE_COMMIT](#drone_commit).

### CI_REPO_REMOTE/DRONE_GIT_HTTP_URL

Provides the HTTP(S) URL to clone a pipeline's [codebase](../codebase-configuration/create-and-configure-a-codebase.md), such as `https://github.com/octocat/hello-world.git`.

### DRONE_GIT_SSH_URL

Provides the SSH URL to clone a pipeline's [codebase](../codebase-configuration/create-and-configure-a-codebase.md), such as `ssh://git@github.com:octocat/hello-world.git`.

### DRONE_PULL_REQUEST

For pull request builds, this variable provides the pull request number. For other builds, this variable is empty. This is equivalent to the expressions `<+codebase.prNumber>` and `<+trigger.prNumber>`.

### DRONE_PULL_REQUEST_TITLE

For pull request builds, this variable provides the pull request title. For other builds, this variable is empty. This is equivalent to the expressions `<+codebase.prTitle>` and `<+trigger.prTitle>`.

### CI_REMOTE_URL/DRONE_REMOTE_URL

Legacy variable provided for backward compatibility only. It is the same as [`DRONE_GIT_HTTP_URL`](#drone_git_http_url).

### CI_REPO/DRONE_REPO

Provides the full repository name (account/organization namespace and repository name) for the repo associated with the build, such as `octocat/hello-world`. By comparison, [`DRONE_REPO_NAME`](#drone_repo_name) includes only the repo name and no namespace.

### DRONE_REPO_BRANCH

Provides the name of the default branch for the repo associated with the build. This can be different from the build's target branch.

### CI_REPO_LINK/DRONE_REPO_LINK

Provides the standard repository link for the repo associated with the build, such as `https://github.com/octocat/hello-world`. It is equivalent to the expressions `<+codebase.repoUrl>` and `<+trigger.repoUrl>`.

`DRONE_REPO_LINK` is different from [`DRONE_GIT_HTTP_URL`](#drone_git_http_url), which is formatted to clone the repo.

### DRONE_REPO_NAME

Provides only the name of the repo associated with the build, such as `hello-world` in `octocat/hello-world`. By comparison, [DRONE_REPO](#drone_repo) includes both the account/organization namespace and repo name, and [`DRONE_REPO_NAMESPACE`](#drone_repo_namespace) includes only the namespace.

### DRONE_REPO_NAMESPACE

Provides only the account/organization namespace of the repo associated with the build, such as `octocat` in `octocat/hello-world`. By comparison, [DRONE_REPO](#drone_repo) includes both the account/organization namespace and repo name, and [`DRONE_REPO_NAME`](#drone_repo_name) includes only the repo name.

### DRONE_REPO_OWNER

Duplicate of [`DRONE_REPO_NAMESPACE`](#drone_repo_namespace).

### DRONE_REPO_PRIVATE

A Boolean that indicates whether the repository is private or not.

If `true`, the repo is private.

If `false`, the repo is public.

It defaults to `true` for manual builds, regardless of actual privacy.

Similar to [`DRONE_REPO_VISIBILITY`](#drone_repo_visibility).

### DRONE_REPO_SCM

Identifies the SCM provider, such as `Github`.

### DRONE_REPO_VISIBILITY

Describes repo visibility as `public`, `private`, or `internal`.

It defaults to `private` for manual builds, regardless of actual visibility.

Similar to [`DRONE_REPO_PRIVATE`](#drone_repo_private).

### DRONE_SEMVER

Only applicable to tag builds. If the Git tag is a valid [semantic version](https://semver.org/) string, this value represents the tag as a valid semver string, such as `1.2.3-alpha.1`.

Harness CI also supports these `DRONE_SEMVER` variations:

* `DRONE_SEMVER_MAJOR`: Provides the major version number from the semver string, such as `1` in `1.2.3`.
* `DRONE_SEMVER_MINOR`: Provides the minor version number from the semver string, such as `2` in `1.2.3`.
* `DRONE_SEMVER_PATCH`: Provides the patch number from the semver string, such as `3` in `1.2.3`.
* `DRONE_SEMVER_PRERELEASE`: Provides the prelease value from the semver string, such as `alpha.1` in `1.2.3-alpha.1`.
* `DRONE_SEMVER_SHORT`: Provides the short version of the semver string with truncated labels and metadata,such as `1.2.3` in `1.2.3-alpha.1`.
* `DRONE_SEMVER_BUILD`: Provides the build from the semver string, such as `001` in `1.2.3+001`.
* `DRONE_SEMVER_ERROR`: Provides the semver parsing error if the tag is *not* a valid semver string.

### DRONE_SOURCE_BRANCH

For PR builds, this value provides the PR source branch. You can use this value along with [`DRONE_TARGET_BRANCH`](#drone_target_branch) to get the PR base and head branches.

For branch builds, this value can be the same as [`DRONE_BRANCH`](#drone_branch) or [`DRONE_COMMIT_BRANCH`](#drone_commit_branch).

For tag push webhook triggers, this variable's value is the tag reference, such as `refs/tags/TAG_NAME`

For manual tag builds, this variable can be empty.

Depending on the build type, this value can be equivalent to the expressions `<+codebase.sourceBranch>` and `<+trigger.sourceBranch>`.

This variable is similar to [`DRONE_BRANCH`](#drone_branch) and [`DRONE_COMMIT_BRANCH`](#drone_commit_branch).

### DRONE_TAG

For tag builds, this is the tag associated with the build. It is equivalent to `<+codebase.tag>`.

### DRONE_TARGET_BRANCH

For branch builds and PR builds, this variable's value is the target branch for the build. You can use this value along with [`DRONE_SOURCE_BRANCH`](#drone_source_branch) to get the PR base and head branches.

For tag push webhook triggers, this variable's value is the tag reference, such as `refs/tags/TAG_NAME`.

For manual tag builds, this variable is not applicable and can be empty.

This can be equivalent to the expressions `<+codebase.targetBranch>` or `<+trigger.targetBranch>`.

This variable is similar to [`DRONE_BRANCH`](#drone_branch) and [`DRONE_COMMIT_BRANCH`](#drone_commit_branch).

## Timestamp variables

These variables provide unix timestamps.

* `CI_BUILD_CREATED`/`DRONE_BUILD_CREATED`: The unix timestamp indicating the time the build object (the execution instance) was created.
* `CI_BUILD_FINISHED`/`DRONE_BUILD_FINISHED`: Provides the unix timestamp for when the build is finished. However, a running build cannot have a finish timestamp, therefore, the system always sets this value to the same as `DRONE_BUILD_CREATED`.
* `CI_BUILD_STARTED`/`DRONE_BUILD_STARTED`: Provides the unix timestamp for when the build was started by the system. Equivalent to `<+pipeline.startTs>`, and the same as `DRONE_BUILD_CREATED`.
* `DRONE_STAGE_FINISHED`: Provides the unix timestamp for when the stage ends. However, a running stage cannot have a finish timestamp, therefore, the system always sets this value to the same as `DRONE_STAGE_STARTED`.
* `DRONE_STAGE_STARTED`: Provides the unix timestamp for when a stage started.

If the pipeline's first stage is a CI stage, all timestamps are the same.

## Lite-engine environment variables

These variables are related to the lite-engine service.

### HARNESS_WORKSPACE/DRONE_WORKSPACE

Always `/harness`, which is the default [workspace](../caching-ci-data/share-ci-data-across-steps-and-stages.md#share-data-between-steps-in-a-stage). This is where Harness clones the codebase, and it is the working directory for all steps in a stage.

The `DRONE_WORKSPACE` environment variable doesn't exist in local runner build infrastructures.

### \_ID variables

* `HARNESS_ACCOUNT_ID`
* `HARNESS_BUILD_ID`/`DRONE_BUILD_NUMBER`
* `HARNESS_EXECUTION_ID`
* `HARNESS_ORG_ID`
* `HARNESS_PIPELINE_ID`
* `HARNESS_PROJECT_ID`
* `HARNESS_STAGE_ID`

For descriptions of these and other identifier variables, go to [Identifiers and status variables](#identifier-and-status-variables).

### \_SERVICE_ variables

* `DELEGATE_SERVICE_TOKEN`
* `DELEGATE_SERVICE_ENDPOINT`
* `DELEGATE_SERVICE_ID`
* `HARNESS_LOG_SERVICE_ENDPOINT`
* `HARNESS_LOG_SERVICE_TOKEN`
* `HARNESS_STO_SERVICE_ENDPOINT`: The URL for STO service.
* `HARNESS_STO_SERVICE_TOKEN`: Authentication for the STO service.
* `HARNESS_TI_SERVICE_ENDPOINT`: The URL for Test Intelligence service.
* `HARNESS_TI_SERVICE_TOKEN`: Authentication for the Test Intelligence service.

### Other lite-engine variables

* `HARNESS_LOG_PREFIX`
* `HARNESS_SECRETS_LIST`
* `DRONE_NETRC_USERNAME`, `DRONE_NETRC_PASSWORD`, `DRON_NETRC_MACHINE`: [.netrc files store Git credentials](/kb/continuous-integration/articles/Using_Git_Credentials_from_Codebase_Connector_in_CI_Pipelines_Run_Step).

## Identifier and status variables

These variables provide identifiers, statuses, and other references for pipelines, builds, stages, and steps.

For commit SHAs and other codebase-related identifiers, go to [Codebase and trigger variables](#codebase-and-trigger-variables) and the [CI codebase variables reference](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference).

### CI/DRONE

Identifies the build environment as CI. Always `true` for all builds.

### CI_BUILD_LINK/DRONE_BUILD_LINK

Provides a deep link to the Harness [build details](../viewing-builds.md). This value is immutable. Equivalent to the expression `<+pipeline.executionUrl>`.

### CI_BUILD_STATUS/DRONE_BUILD_STATUS

Provides the overall build status at a point in time. If the stages and steps were passing at that time, the build status defaults to `success`. At build initialization, this may be empty.

### DRONE_FAILED_STAGES

Can provide a comma-separated list of failed stages at a point in time, if available.

### DRONE_FAILED_STEPS

Can provide a comma-separated list of failed steps at a point in time, if available.

### DRONE_STAGE_KIND

Always `pipeline`.

### DRONE_STAGE_NAME

The name of the stage that is running. Equivalent to `<+stage.name>`.

### DRONE_STAGE_STATUS

Provides the overall pipeline status. If all steps up to the current time have passed, then the status is `success` or `true`. If any steps have failed, the status is `failed` or `false`.

### DRONE_STEP_NAME

The name of the currently-running step. Equivalent to `<+step.name>`.

### DRONE_STEP_NUMBER

The numerical identifier of the currently-running step, if available.

### HARNESS_ACCOUNT_ID

Your Harness account ID. Equivalent to `<+account.identifier>`.

### HARNESS_BUILD_ID/CI_BUILD_NUMBER/DRONE_BUILD_NUMBER

The incremental build ID for pipeline runs. This value is immutable. Equivalent to the expression `<+pipeline.sequenceId>`.

### HARNESS_DELEGATE_ID

Delegate identifier.

### HARNESS_EXECUTION_ID

A pipeline's immutable UUID. Equivalent to `<pipeline.executionId>`.

### HARNESS_ORG_ID

Your Harness organization ID. Equivalent to `<+org.identifier>`.

### HARNESS_PIPELINE_ID

A pipeline's identifier, usually based on the pipeline's name. Equivalent to `<+pipeline.identifier>`.

### HARNESS_PROJECT_ID

The Harness project ID. Equivalent to `<+project.identifier>`.

### HARNESS_STAGE_ID/DRONE_STAGE_NUMBER

The identifier for a stage. Equivalent to `<+stage.identifier>`.

### HARNESS_USER_ID

ID of the user that started the build.

## Infrastructure variables

* `HARNESS_INFRA`/`DRONE_STAGE_TYPE`: The stage build infrastructure type, such as `HOSTED_VM`, `KUBERNETES_DIRECT`, or `docker`.
* `PLATFORM`, `VERSION`, `DRONE_STAGE_OS`, and `DRONE_STAGE_MACHINE`: Build infrastructure platform and machine details.
* `HARNESS_HTTP_PROXY`, `HARNESS_HTTPS_PROXY`: For [Secure connect for Harness Cloud](/docs/continuous-integration/secure-ci/secure-connect).
* `DRONE_STAGE_ARCH`: Reports `Amd64` or `Arm64` for VM build infrastructures only.
* `DRONE_SYSTEM_HOST` and `DRONE_SYSTEM_HOSTNAME`: Provides the hostname used by the build infrastructure, such as `localhost`. Combine with `DRONE_SYSTEM_PROTO` to construct the server URL.
* `DRONE_SYSTEM_PROTO`: The protocol used by the build infrastructure, such as `https`. Combine with `DRONE_SYSTEM_HOST` to construct the server URL.

## Matrix strategy variables

These variables track [matrix strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).

* `HARNESS_NODE_INDEX`: Provides the index of a parallel run within a matrix strategy. Ranges from `0` to `parallelism -1`.
* `HARNESS_NODE_TOTAL`: Provides the total number of elements in a matrix strategy. Equivalent to the value of `parallelism` in the pipeline's YAML.
* `HARNESS_STAGE_INDEX`: Matrix index within a stage.
* `HARNESS_STAGE_TOTAL`: Total elements in a matrix within a stage.
* `HARNESS_STEP_INDEX`: Matrix index within a step.
* `HARNESS_STEP_TOTAL`: Total elements in a matrix within a step.

## Other variables

Other environment variables might existing in your pipelines depending on the build infrastructure, specific steps used, and other configurations, for example:

* `AGENT_TOOLSDIRECTORY`
* `ANDROID_HOME`
* `ANT_HOME`
* `BUILD_PURPOSE`
* `CHROME_BIN`
* `GCP_BAZEL_CACHE_CRED_PATH`
* `GCP_KEY`
* `GRADLE_HOME`
* `HOME`: Working directory home path, such as `/home/harness`.
* `JAVA_HOME`
* `JDK`
* `JFROG_PASSWORD`
* `JFROG_USERNAME`
* `LANG`
* `PATH`
* `PLUGIN_ARTIFACT_FILE`: Harness uses this to show links on the [Artifacts tab](../viewing-builds.md).
* `PLUGIN_PIPELINE`
* `PWD`: Print working directory.
* `SHELL`
* `SHLVL`
* `SSH_CLIENT`
* `SSH_CONNECTION`
* `USER`: The root or default user ID relative to the build. Not the same as [`HARNESS_USER_ID`](#harness_user_id).
* `XDG_CONFIG_HOME`

### DRONE_OUTPUT

As an environment variable, `DRONE_OUTPUT` is the path to a `DRONE_OUTPUT.env` file where Plugin steps can write output variables. This is not supported by all plugins or build infrastructures. For more information, go to [Plugin step settings: Output variables](../use-drone-plugins/plugin-step-settings-reference.md#output-variables).

## Unsupported variables

These variables are not supported because they are not applicable or incompatible with Harness CI.

* `DRONE_BUILD_PARENT`: This variable is not applicable because it is for the Drone-specific *promotions* feature.
* `DRONE_CALVER_SHORT`, `DRONE_CALVER_MAJOR_MINOR`, `DRONE_CALVER_MAJOR`, `DRONE_CALVER_MINOR`, `DRONE_CALVER_MICRO`, `DRONE_CALVER_MODIFIER`: Harness CI supports `DRONE_CALVER`, but not it's variations.
* `DRONE_DEPLOY_TO`: This variable is not applicable because it is for continuous delivery in Drone.
* `DRONE_ENV`: Not supported for all builds.
* `DRONE_STAGE_VARIANT`: This variable is not supported because it is optional and only applies to ARM architectures.
* `DRONE_STAGE_DEPENDS_ON`
* `DRONE_SYSTEM_VERSION`: This variable is not applicable because it describes the Drone server version.
