---
title: Built-in CI codebase variables reference
description: Use Harness' built-in expressions to reference various Git codebase attributes in pipeline stages.
sidebar_position: 30
helpdocs_topic_id: 576gjpak61
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

In Harness, you set up your [codebase](./create-and-configure-a-codebase.md) by creating a [Harness connector](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo) that connects to a Git repo. Pipelines use this connector to clone the code you want to build and test. When a pipeline runs, Harness also fetches your Git details and displays them in the **Build**. You can use Harness' built-in expressions to reference various codebase attributes in Harness pipeline stages.

This topic describes the built-in Harness expressions that you can use to refer to your Git codebase attributes. These variables are available for GitHub, Bitbucket, and GitLab codebases.

For the list of all Harness built-in expressions, go to [Built-in and Custom Harness Variables Reference](../../../platform/12_Variables-and-Expressions/harness-variables.md).

## How and when codebase variables get resolved

If you want to use codebase variables in your pipelines, you need to know how and when these variables get resolved.

Codebase variables are based on the codebase defined for a pipeline and the information in the **Triggers** and **Input Sets** used to start a build. For more information about Git triggers, go to [Built-in Git Trigger Reference](../../../platform/8_Pipelines/w_pipeline-steps-reference/triggers-reference.md#built-in-git-trigger-and-payload-expressions). A codebase variable is resolved only if the build includes the necessary information for that variable. For example, the variable `<+codebase.prNumber>` gets resolved only if there is a pull request (PR) associated with the build. Builds that aren't associated with a PR won't have a PR number to apply to that variable.

To be able to return codebase variables to Harness, the code repo connector's **Credentials** settings must use **Username and Token** authentication and have the **Enable API access** option selected. For details about configuring code repo connectors, go to [Connect to a Git Repo](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo).

Codebase variables are local to the stage that ran the build. Therefore, if your pipeline includes a CI **Build** stage and a CD **Deploy** stage, the codebase variables are accessible in the CI stage only.

The following use cases specify which codebase variables get resolved and when.

<details>
<summary>Manual builds</summary>

When you start a build manually using **Input Sets**, the variables are based on the input set defined for the **Trigger** type:

* [Manual branch build](#manual-branch-build)
* [Manual tag build](#manual-tag-build-expressions)
* [Manual pull request build](#manual-pull-request-build)

</details>

<details>
<summary>Builds from Git webhook triggers</summary>

The most common use case for triggering CI builds is in response to a Git event. When the pipeline receives a webhook payload that matches a **Trigger**, it starts a build. The build maps the trigger variables in the payload to the codebase variables in the build. The variables that get resolved are based on the event type and the payload:

* [Pull request webhook event](#pull-request-webhook-event)
* [Push webhook event](#push-webhook-event)

</details>

<details>
<summary>Builds that can't use webhook payloads to set codebase variables</summary>

* [Manual branch build](#manual-branch-build)
* A cron Trigger starts a new build every night at midnight. In this case, the incoming payload has no information about a specific Git event.
* A Run step clones a repo, and then builds and pushes an image using Docker-in-Docker commands. This repo is not specified in the codebase for the Build stage. In this case, the codebase variables don't apply to this repo. If a Git event arrives from this repo and triggers a build, then [Trigger variables](../../../platform/8_Pipelines/w_pipeline-steps-reference/triggers-reference.md) will describe this build.

</details>

## Expression Example

Here's a simple example of a shell script in a Run step that echoes some codebase variable expressions:

```sh
echo <+codebase.commitSha>
echo <+codebase.targetBranch>
echo <+codebase.sourceBranch>
echo <+codebase.prNumber>
echo <+codebase.prTitle>
echo <+codebase.commitRef>
echo <+codebase.repoUrl>
echo <+codebase.gitUserId>
echo <+codebase.gitUserEmail>
echo <+codebase.gitUser>
echo <+codebase.gitUserAvatar>
echo <+codebase.pullRequestLink>
echo <+codebase.pullRequestBody>
echo <+codebase.state>
```

Here's an example of possible output from that shell script:

```
+ echo 85116fa2f04858cd5e946d69f24d7359205a0737
85116fa2f04858cd5e946d69f24d7359205a0737
+ echo main
main
+ echo **************-patch-5-1
**************-patch-5-1
+ echo 8
8
+ echo Update README.md
Update README.md
+ echo https://github.com/**************/CI-How-Tos
https://github.com/**************/CI-How-Tos
+ echo **************
**************
+ echo
+ echo
+ echo 'https://avatars.githubusercontent.com/u/89968129?v=4'
https://avatars.githubusercontent.com/u/89968129?v=4
+ echo https://github.com/**************/CI-How-Tos/pull/8
https://github.com/**************/CI-How-Tos/pull/8
+ echo open
Open
```

Here's how the Run step and the output look in the Harness UI:

![](./static/built-in-cie-codebase-variables-reference-512.png)

## Manual tag build expressions

Manual tag builds are builds that occur when you manually run your Harness pipeline from the Harness UI and select the **Git Tag** build type. Harness looks for the source code attached to the specified **Tag Name**, and it clones that specific source code for the build.

You can refer to manual tag builds in Harness with the expression `<+codebase.build.type>=="tag"`.

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
* `<+trigger.sourceRepo`: The source repo. Can be `null`.
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
* `<+trigger.sourceRepo`: The source repo. Can be `null`.
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
* `<+trigger.sourceRepo`: The source repo. Can be `null`.
* `<+codebase.state>`: State of the Git working directory associated with a PR. `null` for tag builds.
* `<+codebase.tag>`: The build's Git tag.
* `<+codebase.targetBranch>`, `<+trigger.targetBranch>`: Build target branch. For tag builds, this can be `null` or the tag path, such as `refs/tags/TAG_NAME`.
* `<+trigger.event>`: The trigger event type. For push triggers, it is `PUSH`.
* `<+trigger.type>`: The trigger type. For webhook triggers, it is `Webhook`.
