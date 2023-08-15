---
title: Built-in CI codebase variables reference
description: Use Harness' built-in expressions to reference various Git codebase attributes in pipeline stages.
sidebar_position: 30
helpdocs_topic_id: 576gjpak61
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

In Harness CI, you set up a [codebase](./create-and-configure-a-codebase.md) by creating a [Harness connector](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo) that connects to a Git repo. Pipelines use this connector to clone the code that you want to build and test. When a pipeline runs, Harness also fetches Git details and displays them in the [build details](../viewing-builds.md).

This topic describes how codebase variables are resolved and the built-in Harness expressions that you can use to reference Git codebase attributes in your pipelines.

For more information about variables and expressions, go to:

* [Built-in and custom Harness variables reference](../../../platform/12_Variables-and-Expressions/harness-variables.md)
* [CI environment variables reference](../optimize-and-more/ci-env-var.md)

## Requirements

You must use a supported codebase: GitHub, Bitbucket, or GitLab.

Your [code repo connector](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo) must use **Username and Token** authentication and allow API access (**Enable API access**).

## Variable resolution

The value of codebase variables depends on the pipeline's [codebase](./create-and-configure-a-codebase.md) and the build start conditions (webhook trigger or manual). A variable is resolved only if the build includes the necessary information for that variable. For example, `<+codebase.prNumber>` is only resolved if the build started from a pull request. Builds that aren't started from a PR won't have a PR number to assign to that variable. Builds that aren't associated with a PR won't have a PR number to apply to that variable.

:::info

Codebase variables are local to the **Build** (`CI`) stage where they were resolved. For example, if your pipeline has a **Build** stage and a **Deploy** stage, the codebase variables are accessible in the **Build** stage only.

:::

### Manual builds

Manual builds occur when you manually run a pipeline from within Harness. You can specify a branch, PR, or tag to build.

* **Manual branch builds:** Manually run a pipeline and select the **Git Branch** build type. Harness looks for the source code attached to the specified **Branch Name**, and it clones that specific source code for the build.
* **Manual pull request (PR) builds**: Manually run a pipeline and select the **Git Pull Request** build type. Harness looks for the source code attached to the specified **Pull Request Number**, and it clones that specific source code for the build.
* **Manual tag builds:** Manually run a pipeline and select the **Git Tag** build type. Harness looks for the source code attached to the specified **Tag Name**, and it clones that specific source code for the build.

### Webhook triggers

You can automatically [trigger pipelines using Git events](/docs/platform/Triggers/triggering-pipelines). [Webhook triggers](/docs/platform/Pipelines/w_pipeline-steps-reference/triggers-reference) listen for specific events in your code repo, and then trigger builds when those events occur.

Values in the webhook payload are mapped to the build's codebase variables. The variables that get resolved are based on the event type and the payload contents.

* **Pull request (PR) triggers:** A **Pull Request Webhook Event** automatically starts a build in Harness when there is a new pull request event on the pipeline's associated Git repo. You can specify the type of [pull request events](/docs/platform/Pipelines/w_pipeline-steps-reference/triggers-reference#event-and-actions) to track, such as close, open, update/edit, reopen, and so on.
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

Codebase variables aren't resolved in these scenarios:

* **Cron triggers:** Builds started from cron triggers don't contain specific Git event information and, therefore, don't provide a payload to resolve codebase variables in the same way as PR and push triggers.
* **Non-default codebases:** Codebase variables are only resolved for the pipeline's [default codebase](./create-and-configure-a-codebase.md). If a pipeline [clones additional codebases](./clone-and-process-multiple-codebases-in-the-same-pipeline.md) through **Run** or **Git Clone** steps, codebase variables are not produced for these additional codebases.

## Reference codebase variables

You can use [Harness' expressions](/docs/platform/references/runtime-inputs/#expressions) to reference various codebase attributes in your **Build** (`CI`) stages.

For example, you can add a [Run step](../run-ci-scripts/run-step-settings.md) with a series of `echo` commands to your pipeline to reference codebase variables:

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

![A Run step with echo commands and the corresponding build logs.](./static/built-in-cie-codebase-variables-reference-512.png)

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

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

```mdx-code-block
  </TabItem>
</Tabs>
```

:::tip

You can use expressions to reference the value of some `DRONE_` environment variables. For more information, go to the [CI environment variables reference](../optimize-and-more/ci-env-var.md).

:::

## codebase.build.type

The type of event that started the build, such as `push`, `pull_request`, or `tag`.

`<+codebase.build.type>=="TYPE"`

Manual tag build: `<+codebase.build.type>=="tag"`

Related: `<+pipeline.triggerType>`


## Manual tag build expressions

Manual tag builds are builds that occur when you manually run your Harness pipeline from the Harness UI and select the **Git Tag** build type. Harness looks for the source code attached to the specified **Tag Name**, and it clones that specific source code for the build.

You can refer to manual tag builds in Harness with the expression .

To refer to specific Git attributes associated with a manual tag build, use the following expressions in your Harness stages:

* `<+codebase.baseCommitSha>`: Git base commit id of the build. `null` for tag builds.
* `<+codebase.branch>`: The name of the Git branch used for the build. `null` for tag builds.
* `<+codebase.commitMessage>`: The latest commit message from a tag.
* `<+codebase.commitRef>`: Git commit id reference.
* `<+codebase.commitSha>`: The build's full Git commit id.
* `<+codebase.shortCommitSha>`: The short SHA (seven characters) version of the build's commit SHA.
* `<+codebase.gitUser>`: User name of the Git account associated with the build.
* `<+codebase.gitUserAvatar>`: User avatar of the Git account associated with the build.
* `<+codebase.gitUserEmail>`: User email of the Git account associated with the build.
* `<+codebase.gitUserId>`: User id of the Git account associated with the build.
* `<+codebase.prNumber>`: Git pull request number. `null` for tag builds.
* `<+codebase.prTitle>`: Git pull request title. `null` for tag builds.
* `<+codebase.pullRequestBody>`: Git pull request description. `null` for tag builds.
* `<+codebase.pullRequestLink>`: Git pull request link. `null` for tag builds.
* `<+codebase.repoUrl>`: Git repo URL of the build.
* `<+codebase.sourceBranch>`: PR source branch. `null` for tag builds.
* `<+codebase.state>`: State of the Git working directory associated with a PR. `null` for tag builds.
* `<+codebase.tag>`: The build's Git tag.
* `<+codebase.targetBranch>`: Build target branch. Can be `null` for tag builds.

## Manual branch build expressions

Manual branch builds are the builds that occur when you manually run your pipeline in the Harness UI and select the **Git Branch** build type. Harness looks for the source code attached to the specified **Branch Name**, and it clones that specific source code for the build.

You can refer to manual branch builds in Harness with the expression `<+codebase.build.type>=="branch"`.

To refer to specific Git attributes associated with a manual branch build, use the following expressions in your Harness stages:

* `<+codebase.baseCommitSha>`: Git base commit id of the build. `null` for branch builds.
* `<+codebase.branch>`: The name of the Git branch used for the build.
* `<+codebase.commitMessage>`: The latest commit message from a branch.
* `<+codebase.commitRef>`: Git commit id reference.
* `<+codebase.commitSha>`: The build's full Git commit id.
* `<+codebase.shortCommitSha>`: The short SHA (seven characters) version of the build's commit SHA.
* `<+codebase.gitUser>`: User name of the Git account associated with the build.
* `<+codebase.gitUserAvatar>`: User avatar of the Git account associated with the build.
* `<+codebase.gitUserEmail>`: User email of the Git account associated with the build.
* `<+codebase.gitUserId>`: User id of the Git account associated with the build.
* `<+codebase.prNumber>`: Git pull request number. `null` for branch builds.
* `<+codebase.prTitle>`: Git pull request title. `null` for branch builds.
* `<+codebase.pullRequestBody>`: Git pull request description. `null` for branch builds.
* `<+codebase.pullRequestLink>`: Git pull request link. `null` for branch builds.
* `<+codebase.repoUrl>`: Git repo URL of the build.
* `<+codebase.sourceBranch>`: PR source branch. For branch builds, this can be `null` or the same as `<+codebase.branch>`.
* `<+codebase.state>`: State of the Git working directory associated with a PR. `null` for branch builds.
* `<+codebase.tag>`: The build's Git tag. `null` for branch builds.
* `<+codebase.targetBranch>`: Build target branch. Can be `null` for branch builds.

## Manual pull request build expressions

Manual pull request builds are builds that occur when you manually run your pipeline in the Harness UI and select the **Git Pull Request** build type. Harness looks for the source code attached to the specified **Pull Request Number**, and it clones that specific source code for the build.

You can refer to manual pull request builds in Harness with the expression `<+codebase.build.type>=="PR"`.

To refer to specific Git attributes associated with a manual pull request build, use the following expressions in your Harness stages:

* `<+codebase.baseCommitSha>`: Git base commit id of the build.
* `<+codebase.branch>`: The name of the PR target branch.
* `<+codebase.commitMessage>`: The latest commit message from a PR.
* `<+codebase.commitRef>`: Git commit id reference.
* `<+codebase.commitSha>`: The build's full Git commit id.
* `<+codebase.shortCommitSha>`: The short SHA (seven characters) version of the build's commit SHA.
* `<+codebase.gitUser>`: User name of the Git account associated with the build.
* `<+codebase.gitUserAvatar>`: User avatar of the Git account associated with the build.
* `<+codebase.gitUserEmail>`: User email of the Git account associated with the build.
* `<+codebase.gitUserId>`: User id of the Git account associated with the build.
* `<+codebase.prNumber>`: Git pull request number.
* `<+codebase.prTitle>`: Git pull request title.
* `<+codebase.pullRequestBody>`: Git pull request description.
* `<+codebase.pullRequestLink>`: Git pull request link.
* `<+codebase.repoUrl>`: Git repo URL of the build.
* `<+codebase.sourceBranch>`: PR source branch.
* `<+codebase.state>`: State of the Git working directory associated with a PR.
* `<+codebase.tag>`: The build's Git tag. `null` for PR builds.
* `<+codebase.targetBranch>`: PR target branch.

:::info

For Bitbucket PR builds (whether by Trigger, Manual, or PR number), the variable `<+codebase.commitSha>` returns a shortened SHA. This is due to the Bitbucket webhook payload only sending shortened SHA.

This is not the same as a short SHA, which is returned by the variable `<+codebase.shortCommitSha>`.

:::

## Pull request webhook event expressions

You can configure [Triggers](/docs/category/triggers) in Harness for an event on your Git repo, and Harness automatically triggers a build whenever there is a new instance of that event type on your Git repo. A **Pull Request Webhook Event** automatically starts a build in Harness when there is a new pull request event on the pipeline's associated Git repo. For information about setting up triggers, go to [Trigger Pipelines using Git Events](../../../platform/11_Triggers/triggering-pipelines.md).

You can refer to webhook pull request builds in Harness with the expression `<+codebase.build.type>=="PR"`.

To refer to specific Git attributes associated with a webhook-triggered pull request build, use the following expressions in your Harness stages:


* `<+codebase.baseCommitSha>`, `<+trigger.baseCommitSha>`: Git base commit id of the build.
* `<+codebase.branch>`: The name of the PR target branch.
* `<+codebase.commitMessage>`: The latest commit message from a PR.
* `<+codebase.commitRef>`: Git commit id reference.
* `<+codebase.commitSha>`, `<+trigger.commitSha>`: The build's full Git commit id.
* `<+codebase.shortCommitSha>`: The short SHA (seven characters) version of the build's commit SHA.
* `<+codebase.gitUser>`, `<+trigger.gitUser>`: User name of the Git account associated with the build.
* `<+codebase.gitUserAvatar>`: User avatar of the Git account associated with the build.
* `<+codebase.gitUserEmail>`: User email of the Git account associated with the build.
* `<+codebase.gitUserId>`: User id of the Git account associated with the build.
* `<+codebase.prNumber>`, `<+trigger.prNumber>`: Git pull request number.
* `<+codebase.prTitle>`, `<+trigger.prTitle>`: Git pull request title.
* `<+codebase.pullRequestBody>`: Git pull request description.
* `<+codebase.pullRequestLink>`: Git pull request link.
* `<+codebase.repoUrl>`, `<+trigger.repoUrl>`: Git repo URL of the build.
* `<+codebase.sourceBranch>`, `<+trigger.sourceBranch>`: PR source branch.
* `<+trigger.sourceRepo>`: The source repo. Can be `null`.
* `<+codebase.state>`: State of the Git working directory associated with a PR.
* `<+codebase.tag>`: The build's Git tag. `null` for PR builds.
* `<+codebase.targetBranch>`, `<+trigger.targetBranch>`: PR target branch.
* `<+trigger.event>`: The trigger event type. For PR triggers, it is `PR`.
* `<+trigger.type>`: The trigger type. For webhook triggers, it is `Webhook`.

:::info

For Bitbucket PR builds (whether by Trigger, Manual, or PR number), the variable `<+codebase.commitSha>` returns a shortened SHA. This is due to the Bitbucket webhook payload only sending shortened SHA.

This is not the same as a short SHA, which is returned by the variable `<+codebase.shortCommitSha>`.

:::

## Push webhook event expressions

You can configure [Triggers](/docs/category/triggers) in Harness for an event on your Git repo, and Harness automatically triggers a build whenever there is a new instance of that event type on your Git repo. A **Push Webhook Event** automatically starts a build in Harness when there is a new push event on the pipeline's associated Git repo. For information about setting up triggers, go to [Trigger Pipelines using Git Events](../../../platform/11_Triggers/triggering-pipelines.md).

You can refer to webhook push builds in Harness with the expression `<+codebase.build.type>=="Push"`.

To refer to specific Git attributes associated with a webhook-triggered push build, use the following expressions in your Harness stages.

### Branch push triggers

* `<+codebase.baseCommitSha>`,  `<+trigger.baseCommitSha>`: Git base commit id of the build. `null` for branch builds.
* `<+codebase.branch>`: The name of the Git branch used for the build.
* `<+codebase.commitMessage>`: The latest commit message from a branch.
* `<+codebase.commitRef>`: Git commit id reference.
* `<+codebase.commitSha>`, `<+trigger.commitSha>`: The latest commit's full Git commit id.
* `<+codebase.shortCommitSha>`: The short SHA (seven characters) version of the branch's latest commit SHA.
* `<+codebase.gitUser>`, `<+trigger.gitUser>`: User name of the Git account associated with the build.
* `<+codebase.gitUserAvatar>`: User avatar of the Git account associated with the build.
* `<+codebase.gitUserEmail>`: User email of the Git account associated with the build.
* `<+codebase.gitUserId>`: User id of the Git account associated with the build.
* `<+codebase.prNumber>`, `<+trigger.prNumber>`: Git pull request number. `null` for branch builds.
* `<+codebase.prTitle>`, `<+trigger.prTitle>`: Git pull request title. `null` for branch builds.
* `<+codebase.pullRequestBody>`: Git pull request description. `null` for branch builds.
* `<+codebase.pullRequestLink>`: Git pull request link. `null` for branch builds.
* `<+codebase.repoUrl>`, `<+trigger.repoUrl>`: Git repo URL of the repo associated with the build.
* `<+codebase.sourceBranch>`, `<+trigger.sourceBranch>`: PR source branch. `null` for branch builds.
* `<+trigger.sourceRepo>`: The source repo. Can be `null`.
* `<+codebase.state>`: State of the Git working directory associated with a PR. `null` for branch builds.
* `<+codebase.tag>`: The build's Git tag. `null` for branch builds.
* `<+codebase.targetBranch>`, `<+trigger.targetBranch>`: Build target branch. For branch builds, this can be `null` or the same as `<+codebase.branch>`.
* `<+trigger.event>`: The trigger event type. For push triggers, it is `PUSH`.
* `<+trigger.type>`: The trigger type. For webhook triggers, it is `Webhook`.

### Tag push triggers

* `<+codebase.baseCommitSha>`,  `<+trigger.baseCommitSha>`: Git base commit id of the build. `null` for tag builds.
* `<+codebase.branch>`: The name of the Git branch used for the build. `null` for tag builds.
* `<+codebase.commitMessage>`: The latest commit message from a tag.
* `<+codebase.commitRef>`: Git commit id reference.
* `<+codebase.commitSha>`, `<+trigger.commitSha>`: The latest commit's full Git commit id.
* `<+codebase.shortCommitSha>`: The short SHA (seven characters) version of the tag's latest commit SHA.
* `<+codebase.gitUser>`, `<+trigger.gitUser>`: User name of the Git account associated with the build.
* `<+codebase.gitUserAvatar>`: User avatar of the Git account associated with the build.
* `<+codebase.gitUserEmail>`: User email of the Git account associated with the build.
* `<+codebase.gitUserId>`: User id of the Git account associated with the build.
* `<+codebase.prNumber>`, `<+trigger.prNumber>`: Git pull request number. `null` for tag builds.
* `<+codebase.prTitle>`, `<+trigger.prTitle>`: Git pull request title. `null` for tag builds.
* `<+codebase.pullRequestBody>`: Git pull request description. `null` for tag builds.
* `<+codebase.pullRequestLink>`: Git pull request link. `null` for tag builds.
* `<+codebase.repoUrl>`, `<+trigger.repoUrl>`: Git repo URL of the repo associated with the build.
* `<+codebase.sourceBranch>`, `<+trigger.sourceBranch>`: PR source branch. `null` for tag builds.
* `<+trigger.sourceRepo>`: The source repo. Can be `null`.
* `<+codebase.state>`: State of the Git working directory associated with a PR. `null` for tag builds.
* `<+codebase.tag>`: The build's Git tag.
* `<+codebase.targetBranch>`, `<+trigger.targetBranch>`: Build target branch. For tag builds, this can be `null` or the tag path, such as `refs/tags/TAG_NAME`.
* `<+trigger.event>`: The trigger event type. For push triggers, it is `PUSH`.
* `<+trigger.type>`: The trigger type. For webhook triggers, it is `Webhook`.


<!-- Tag push trigger YAML example

```yaml
        payloadConditions:
          - key: <+trigger.payload.ref>
            operator: StartsWith
            value: refs/tags/
```
-->
