---
title: CI codebase variables reference
description: Use Harness' built-in expressions to reference various Git codebase attributes in pipeline stages.
sidebar_position: 40
helpdocs_topic_id: 576gjpak61
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


In Harness CI, you set up a [codebase](./create-and-configure-a-codebase.md) by creating a [Harness connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) that connects to a Git repo. Pipelines use this connector to clone the code that you want to build and test. When a pipeline runs, Harness also fetches Git details and displays them in the [build details](../viewing-builds.md).

This topic describes how codebase [environment variables](../optimize-and-more/ci-env-var.md) are resolved and the [Harness expressions](../../../platform/variables-and-expressions/harness-variables.md) that you can use to reference Git codebase attributes in your pipelines.

## Variable resolution

The values of codebase variables depends on:

* The pipeline's [codebase](./create-and-configure-a-codebase.md) configuration. For full support, you must use a supported codebase: GitHub, Bitbucket, or GitLab. With other providers, some variables might not be resolved.
* The pipeline's [code repo connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) must use **Username and Token** authentication and allow API access (**Enable API access**).
* How the build started, whether manually or by a webhook trigger.

A variable is resolved only if the build includes the necessary information for that variable. For example, `<+codebase.prNumber>` is only resolved if the build started from a pull request. Builds that aren't started from a PR won't have a PR number to assign to that variable.

:::info

Codebase variables are local to the **Build** (`CI`) stage where they were resolved. For example, if your pipeline has a **Build** stage and a **Deploy** stage, the codebase variables are accessible in the **Build** stage only.

:::

### Manual builds

Manual builds occur when you manually run a pipeline from within Harness. You can specify a branch, PR, or tag to build.

* **Manual branch builds:** Manually run a pipeline and select the **Git Branch** build type. Harness looks for the source code attached to the specified **Branch Name**, and it clones that specific source code for the build.
* **Manual pull request (PR) builds**: Manually run a pipeline and select the **Git Pull Request** build type. Harness looks for the source code attached to the specified **Pull Request Number**, and it clones that specific source code for the build.
* **Manual tag builds:** Manually run a pipeline and select the **Git Tag** build type. Harness looks for the source code attached to the specified **Tag Name**, and it clones that specific source code for the build.

:::info

`trigger.*` expressions are always `null` for manual builds. Trigger expressions get values from automated triggers, such as webhook triggers. Since manual builds don't use an automated trigger, there are no values available for these expressions.

If you build both manually and through triggers, consider using expressions that can resolve for both build types, such as `<+codebase.prNumber>` instead of `<+trigger.prNumber>`.

:::

### Webhook triggers

You can automatically [trigger pipelines using Git events](/docs/platform/Triggers/triggering-pipelines). [Webhook triggers](/docs/platform/triggers/triggers-reference) listen for specific events in your code repo, and then trigger builds when those events occur.

Values in the webhook payload are mapped to the build's codebase variables. The variables that get resolved are based on the event type and the payload contents.

* **Pull request (PR) triggers:** A **Pull Request Webhook Event** automatically starts a build in Harness when there is a new pull request event on the pipeline's associated Git repo. You can specify the type of [pull request events](/docs/platform/triggers/triggers-reference#event-and-actions) to track, such as close, open, update/edit, reopen, and so on.
* **Push triggers:** A **Push Webhook Event** automatically starts a build in Harness when there is a new branch or tag push event on the pipeline's associated Git repo.

<!-- Tag push trigger YAML example

```yaml
        payloadConditions:
          - key: <+trigger.payload.ref>
            operator: StartsWith
            value: refs/tags/
```
-->

### Unresolved variables

Some codebase variables aren't resolved in these scenarios:

* **Cron triggers:** Builds started from cron triggers don't contain specific Git event information and, therefore, don't provide a payload to resolve codebase variables in the same way as PR and push triggers.
* **Non-default codebases:** Codebase variables are only resolved for the pipeline's [default codebase](./create-and-configure-a-codebase.md). If you [disable clone codebase](./create-and-configure-a-codebase/#disable-clone-codebase-for-specific-stages) or a stage [clones additional codebases](./clone-and-process-multiple-codebases-in-the-same-pipeline.md) through **Run** or **Git Clone** steps, codebase variables are not produced for these non-default codebases.
* **Git provider:** Not all Git providers are supported. Some providers don't provide relevant values for all expressions.

## Reference codebase variables

You can use [Harness' expressions](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) to reference various codebase attributes in your **Build** (`CI`) stages. Expressions are formatted as `<+PARENT.CHILD>`, such as `<+codebase.commitSha>`, where `commitSha` is an attribute within `codebase`.

For example, you can add a [Run step](../run-ci-scripts/run-step-settings.md) with a series of `echo` commands to your pipeline to reference codebase variables:


<Tabs>
  <TabItem value="Visual" label="Visual">


![A Run step with echo commands and the corresponding build logs.](./static/built-in-cie-codebase-variables-reference-512.png)


</TabItem>
  <TabItem value="YAML" label="YAML" default>


```yaml
              - step:
                  type: Run
                  name: echo codebase
                  identifier: echo_codebase
                  spec:
                    shell: Sh
                    command: |-
                      echo <+codebase.repoUrl>
                      echo <+codebase.prNumber>
                      echo <+codebase.prTitle>
                      echo <+codebase.pullRequestLink>
                      echo <+codebase.targetBranch>
                      echo <+codebase.sourceBranch>
                      echo <+codebase.commitSha>
                      echo <+codebase.gitUserId>
                      echo <+codebase.gitUserEmail>
                      echo <+codebase.state>
```

In the [build logs](../viewing-builds.md), you can see the value of each variable:

```
+ echo https://github.com/**************/CI-How-Tos
+ echo 8
+ echo Update README.md
+ echo https://github.com/**************/CI-How-Tos/pull/8
+ echo main
+ echo **************-patch-5-1
+ echo 85116fa2f04858cd5e946d69f24d7359205a0737
+ echo **************
+ echo
+ echo open
```


</TabItem>
</Tabs>


:::tip

You can use expressions to reference the value of some `DRONE_` environment variables. For more information, go to the [CI environment variables reference](../optimize-and-more/ci-env-var.md).

:::

## Build start variables

These variables describe how the build started.

### codebase.build.type

* Value: Provides the type of event that started the build:
   * `tag`: Manual tag build
   * `branch`: Manual branch build
   * `PR`: PR build (manual or webhook)
   * `Push`: Push webhook trigger (branch or tag)
* Expression: `<+codebase.build.type>`

You can use this expression to create conditions based on build type, such as `<+codebase.build.type>=="TYPE"`, where `TYPE` is `tag`, `PR`, `branch`, or `Push`.

### trigger.type

* Value: Identifies the trigger type. For PR and push webhook triggers, it is `Webhook`.
* Expression: `<+trigger.type>`
* Exclusions: Not available for manual builds.

### trigger.event

* Value: The webhook trigger event category, `PR` or `PUSH`.
* Expression: `<+trigger.event>`
* Exclusions: Not available for manual builds.

## Branch, PR, and tag variables

These variables provide information about the branch, PR, or tag associated with the build.

### codebase.branch

* Value: The PR's target branch or the branch specified for a branch build.
* Expression: `<+codebase.branch>`
* Exclusions: For tag builds, this is `null` or the tag path (such as `refs/tags/TAG_NAME`). Instead, use [`<+codebase.tag>`](#codebasetag).

`<+codebase.branch>` always resolves to the target branch, which is the PR target branch or the branch selected for a branch build.

For PR builds/triggers, Harness recommends using [`<+codebase.sourceBranch>`](#codebasesourcebranch) and [`<+codebase.targetBranch>`](#codebasetargetbranch) instead of `<+codebase.branch>`.

### codebase.prNumber

* Value: The Git PR number.
* Expression:
   * Manual PR builds: `<+codebase.prNumber>`
   * PR webhook triggers: `<+codebase.prNumber>` or `<+trigger.prNumber>`
* Exclusions: `null` for all tag and branch builds.

### codebase.prTitle

* Value: The Git PR title.
* Expression:
   * Manual PR builds: `<+codebase.prTitle>`
   * PR webhook triggers: `<+codebase.prTitle>` or `<+trigger.prTitle>`
* Exclusions: `null` for all tag and branch builds.

### codebase.pullRequestBody

* Value: The Git PR description.
* Expression: `<+codebase.pullRequestBody>`
* Exclusions: `null` for all tag and branch builds.

### codebase.pullRequestLink

* Value: Link to the PR.
* Expression: `<+codebase.pullRequestLink>`
* Exclusions: `null` for all tag and branch builds.

### codebase.sourceBranch

* Value: The source branch for a PR.
* Expression:
   * Manual PR builds: `<+codebase.sourceBranch>`
   * Webhook triggers: `<+codebase.sourceBranch>` or `<+trigger.sourceBranch>`
* Exclusions:
   * Tag builds: Always `null`. Instead, use [`<+codebase.tag>`](#codebasetag).
   * Branch builds: Always `null`. Instead, use [`<+codebase.branch>`](#codebasebranch).
   * Reruns of webhook trigger or manual PR builds: Resolves to `null` when manually rerun, despite being resolved as expected in the initial run. Instead of rerunning the build (with the **Re-run** option on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds)), initiate a new build (for example, push a change to trigger the webhook or run a new manual PR build).

### codebase.tag

* Value: The Git tag specified for a tag build.
* Expression: `<+codebase.tag>`
* Exclusions: `null` for all PR and branch builds.

### codebase.targetBranch

* Value: The target branch for a PR.
* Expression:
   * Manual PR builds: `<+codebase.targetBranch>`
   * Webhook triggers: `<+codebase.targetBranch>` or `<+trigger.targetBranch>`
* Exclusions:
   * Tag builds: Always `null`. Instead, use [`<+codebase.tag>`](#codebasetag).
   * Branch builds: Always `null`. Instead, use [`<+codebase.branch>`](#codebasebranch).
   * Reruns of webhook trigger or manual PR builds: Resolves to `null` when manually rerun, despite being resolved as expected in the initial run. Instead of rerunning the build (with the **Re-run** option on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds)), initiate a new build (for example, push a change to trigger the webhook or run a new manual PR build).

## Commit variables

These variables provide information about some commits associated with the build.

### codebase.baseCommitSha

* Value: The Git commit SHA of a PR's base commit.
* Expression:
   * Manual PR builds: `<+codebase.baseCommitSha>`
   * PR webhook triggers: `<+codebase.baseCommitSha>` or `<+trigger.baseCommitSha>`
* Exclusions: `null` for all tag and branch builds.

### codebase.commitMessage

* Value: The latest commit message in the branch, tag, or PR.
* Expression: `<+codebase.commitMessage>`

### codebase.commitRef

* Value: A Git commit reference.
* Expression: `<+codebase.commitRef>`

### codebase.commitSha

* Value: The full Git commit SHA for the latest commit in the branch, tag, or PR.
* Expression:
   * Manual builds: `<+codebase.commitSha>`
   * Webhook triggers: `<+codebase.commitSha>` or `<+trigger.commitSha>`

:::info

For Bitbucket PR builds (manual or webhook), this expression returns a *shortened* SHA due to the Bitbucket webhook payload only sending shortened SHAs.

This *isn't* the same as the short SHA returned by [`<+codebase.shortCommitSha>`](#codebaseshortcommitsha).

:::

### codebase.mergeSha

* Value: The commit SHA of the merge commit that occurs when a Bitbucket PR is merged.
* Expression: `<+codebase.mergeSha>`
* Exclusions: Only applicable to merged PRs in Bitbucket SCM.

### codebase.shortCommitSha

* Value: The short SHA (seven characters) of the build's [commit SHA](#codebasecommitsha).
* Expression: `<+codebase.shortCommitSha>`

## Git user variables

These variables provide information about the Git user account associated with the build.

### codebase.gitUser

* Value: User name of the Git account associated with the build. Can be `null` or masked in build logs.
* Expression:
   * Manual builds: `<+codebase.gitUser>`
   * Webhook triggers: `<+codebase.gitUser>` or `<+trigger.gitUser>`

### codebase.gitUserAvatar

* Value: Link to user avatar of the Git account associated with the build.
* Expression: `<+codebase.gitUserAvatar>`

### codebase.gitUserEmail

* Value: User email of the Git account associated with the build. Can be `null` or masked in build logs.
* Expression: `<+codebase.gitUserEmail>`

### codebase.gitUserId

* Value: User ID of the Git account associated with the build. Can be `null` or masked in build logs.
* Expression: `<+codebase.gitUserId>`

## Repo variables

These variables provide information about the Git repo associated with the build.

### codebase.repoUrl

* Value: Link to the Git repo associated with the build.
* Expression:
   * Manual builds: `<+codebase.repoUrl>`
   * Webhook triggers: `<+codebase.repoUrl>` or `<+trigger.repoUrl>`

### codebase.state

* Value: State of the Git working directory associated with a PR.
* Expression: `<+codebase.state>`
* Exclusions: `null` for all tag and branch builds.

### trigger.sourceRepo

* Value: The PR, branch, or tag's source repo, if applicable. Otherwise, `null`.
* Expression: `<+trigger.sourceRepo>`
* Exclusions: Not available for manual builds.
