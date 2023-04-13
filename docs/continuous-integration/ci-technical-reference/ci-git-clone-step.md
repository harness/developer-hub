---
title: Git Clone step settings
description: The Git Clone step clones a repo to the pipeline workspace.
sidebar_position: 70
helpdocs_topic_id: nl3ixvew4o
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings for the **Git Clone** step, which clones a repo to the pipeline workspace. This step is useful when you want to [include multiple repositories in your build](../use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline.md). For example, if you maintain your code files in one repo and your build files (such as Dockerfiles) in a separate repo, you can [configure the pipeline's default codebase](../use-ci/codebase-configuration/create-and-configure-a-codebase.md) to clone your code files and use a **Git Clone** step to clone your build files into the pipeline's workspace.

:::info

Depending on the stage's build infrastructure, some settings may be unavailable.

:::

## Name

Enter a name summarizing the step's purpose. Harness automatically assigns an **Id** ([Entity Identifier Reference](../../platform/20_References/entity-identifier-reference.md)) based on the **Name**. You can change the **Id**.

## Description

Optional text string.

## Connector

A connector for the source control provider hosting the code repo that you want the step to clone.

The following topics provide more information about creating code repo connectors:

* AWS CodeCommit: [Connect to an AWS CodeCommit Repo](/docs/platform/Connectors/connect-to-code-repo#add-aws-codecommit-repo)
* Azure Repos: [Connect to Azure Repos](/docs/platform/Connectors/connect-to-a-azure-repo)
* Bitbucket: [Bitbucket Connector Settings Reference](../../platform/7_Connectors/ref-source-repo-provider/bitbucket-connector-settings-reference.md)
* GitHub:
  * [Add a GitHub connector](/docs/platform/Connectors/add-a-git-hub-connector)
  * [GitHub connector settings reference](/docs/platform/Connectors/ref-source-repo-provider/git-hub-connector-settings-reference)
  * [Use a GitHub App in a GitHub connector](/docs/platform/Connectors/git-hub-app-support)
* GitLab: [GitLab Connector Settings Reference](../../platform/7_Connectors/ref-source-repo-provider/git-lab-connector-settings-reference.md)
* Other Git providers:
  * [Connect to a Git repo](/docs/platform/Connectors/connect-to-code-repo)
  * [Git connector settings reference](/docs/platform/Connectors/ref-source-repo-provider/git-connector-settings-reference)

## Repository Name

If the connector's [URL Type](/docs/platform/Connectors/ref-source-repo-provider/git-connector-settings-reference#url-type) is **Repository**, then **Repository Name** is automatically populated based on the repository defined in the connector's configuration.

If the connector's URL Type is **Account**, then you must specify the name of the code repo that you want to clone into the pipeline workspace.

## Build Type, Branch Name, and Tag Name

For **Build Type**, select **Git Branch** if you want the step to clone code from a specific branch within the repo, or select **Git Tag** if you want the step to clone code from a specific commit tag. Based on your selection, specify a **Branch Name** or **Tag Name**.

:::tip

You can use [fixed values, runtime input, or variable expressions](/docs/platform/references/runtime-inputs/) for the branch and tag names. For example, you can enter `<+input>` for the branch or tag name to supply a branch or tag name at runtime. You could also use expressions to match the pipeline's [codebase](../use-ci/codebase-configuration/create-and-configure-a-codebase.md) branch or tag so that, for example, the pipeline and the Git Clone step both pull code from the same environment, such as `production` when a production build runs or `development` when a development build runs.

:::

This setting applies only to the repo specified in this **Git Clone** step. It is separate from the `codebase` object for the pipeline's **Build** stage. If you want this **Git Clone** step's repo to use the same branch or commit as the primary codebase, specify either `<+codebase.branch>` or `<+codebase.tag>` for **Branch Name** or **Tag Name**. These expressions pull runtime input from the pipeline; for example, if the pipeline's primary codebase uses the `development` branch, then the **Git Clone** step clones the `development` branch from its repo. For more information, go to the [Built-in CI codebase variables reference](../use-ci/codebase-configuration/built-in-cie-codebase-variables-reference.md).

## Clone Directory

An optional target path in the pipeline workspace where you want to clone the repo.

You can't specify `/harness/` as a target directory for a **Git Clone** step because this folder is reserved for the **Build** stage's [codebase](../use-ci/codebase-configuration/create-and-configure-a-codebase.md). You can specify **Shared Paths** in your [CI Build stage settings](../use-ci/set-up-build-infrastructure/ci-stage-settings.md) to share data across steps in your **Build** stage.

## Additional Configuration

Use the following settings to add additional configuration to the step.

### Depth

The number of commits to fetch when the step clones the repo.

For manually-triggered builds, the default depth is `50`. This means each `git clone` operation fetches the 50 most recent commits. For all other trigger types, the default depth is `0`, which fetches all commits from the relevant branch.

For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).

### SSL Verify

If **True**, which is the default value, the pipeline verifies your Git SSL certificates. The build fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your builds anyway.

If you want to use self-signed certificates in a Kubernetes Cluster build infrastructure, go to [Configure a Kubernetes Build Farm to use Self-Signed Certificates](../use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

### Run as User

Specify the user ID to use to run all processes in the pod if running in containers. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

### Set Container Resources

Set maximum resource limits for the resources used by the container at runtime:

* **Limit Memory:** The maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number using the suffixes `G` or `M`. You can also use the power-of-two equivalents `Gi` and `Mi`.
* * **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed; for example, you can specify one hundred millicpu as `0.1` or `100m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy settings](../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
