---
title: Harness Git Integration Overview
description: Harness' GitOps integration enables you to use Git as a single source of truth to trigger Harness deployments.
sidebar_position: 10
helpdocs_topic_id: khbt0yhctx
helpdocs_category_id: goyudf2aoh
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness enables a developer-centric experience for managing applications by implementing the Git-based methodology across its components. For example, you can trigger deployments in Harness using Git Pull and Push events. As a result, Harness Git integration allows you to use Git as the single source of truth when maintaining the state of the deployment process in Harness.

In addition, Harness lets you sync any Harness Application with a Git repo, using either a one-way or two-way sync. Almost anything you can do in the Harness UI, you can do in YAML in Git. For more information, see [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code).The following table describes the many Git-enabled components of Harness.



|  |  |  |
| --- | --- | --- |
| **Harness Feature** | **Git Functionality** | **Links to Topics** |
| Triggers with Git Webhooks | Use a Harness Trigger Git Webhook URL to execute a Harness deployment in response to a Github, BitBucket, or GitLab event. | [Trigger Deployments using Git Events](../model-cd-pipeline/triggers/trigger-a-deployment-on-git-event.md) |
| File-based Repo Triggers | Initiate the Harness Trigger only when **specific files** in the repo are changed. For example, initiate the Trigger only when a Helm values.yaml file in Git is changed. | [Trigger a Deployment when a File Changes](../model-cd-pipeline/triggers/trigger-a-deployment-when-a-file-changes.md) |
| Using Git Push and Pull Request Variables in Harness Applications | Git push and pull request variables are available in a Trigger, and can be passed to the Workflows (and Pipelines) executed by the Trigger. An example variable is `${pullrequest.id}` for Pull request ID. <br />Examples:<br /> &#9642; Map the Git payload to create uniquely-named Harness Environments and [Infrastructure Definitions](../model-cd-pipeline/environments/environment-configuration.md#add-an-infrastructure-definition).<br /> &#9642; Use the Git payload with Git events, and Harness can respond to a Git event to build the artifact and deploy it to a unique infrastructure. | <br /> &#9642; [Push and Pull Request Variables](../model-cd-pipeline/expressions/passing-variable-into-workflows.md#push-and-pull-request-variables)<br /><br /> &#9642;[Passing Variables into Workflows and Pipelines from Triggers](../model-cd-pipeline/expressions/passing-variable-into-workflows.md) |
| Helm and Kubernetes Deployments |  <br /><br /> &#9642; Pull a Helm chart from a Git repo.<br /> <br /> &#9642; Specify values or a full values.yaml file in Git repo and Harness will fetch the values during runtime.<br /> <br /> &#9642; Override Workflow variables using values added via a Git connector. <br /><br /> &#9642; Map a Git payload, such as a PR number, to a Kubernetes namespace via variables. For example, you could use the PR number to create a unique Kubernetes namespace and deploy to that namespace to evaluate the PR build. |<br /><br /> &#9642; [Helm Native Deployment Guide Overview](https://docs.harness.io/article/ii558ppikj-helm-deployments-overview)<br /><br /> &#9642; [Kubernetes How-tos](https://docs.harness.io/article/pc6qglyp5h-kubernetes-deployments-overview) |

:::note
Webhooks do not work with older versions of Bitbucket and will cause issues with push events sent to Harness. You need to install the [Post Webhooks for Bitbucket](https://marketplace.atlassian.com/apps/1215474/post-webhooks-for-bitbucket?hosting=server&tab=overview) plugin in Bitbucket to enable Harness to allow two-way sync with Bitbucket. For more information, see [Bitbucket Post Webhooks Plugin](https://docs.harness.io/article/ay9hlwbgwa-add-source-repo-providers#bitbucket_post_webhooks_plugin).
:::