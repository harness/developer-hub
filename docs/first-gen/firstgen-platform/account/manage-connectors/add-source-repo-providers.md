---
title: Add Source Repo Providers
description: Integrating and syncing with Git repositories (GitHub, Bitbucket, GitLab, CodeCommit, etc.).
# sidebar_position: 2
helpdocs_topic_id: ay9hlwbgwa
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Source Repo Providers connect your Harness account with your Git platform accounts to synchronize your Harness account and Applications and pull important files, such as Helm charts, Kubernetes manifests, and Terraform scripts.

## Connect to Your Repo

* [Add a GitHub Repo](add-github-repo.md)
* [Add a Bitbucket Repo](add-bitbucket-repo.md)
* [Add a GitLab Repo](add-a-gitlab-repo.md)
* [Add a CodeCommit Repo](add-a-code-commit-repo.md)
* [Add an Azure DevOps Repo](add-an-azure-dev-ops-repo.md)

:::note
CodeCommit is supported as a Source Repo only. It cannot be used with [Harness Git Sync](../../config-as-code/configuration-as-code.md).
:::
:::note
Ensure your Git repo is initialized (`git init`) before connecting Harness to it.
:::

## See Also

* To use Git repos to sync Harness accounts and Application, see [Configuration as Code](../../config-as-code/configuration-as-code.md) and [Onboard Teams Using Git](../../../continuous-delivery/harness-git-based/onboard-teams-using-git-ops.md).
* To trigger Harness Workflows and Pipelines using Git Webhooks, see [Add a Trigger](../../../continuous-delivery/model-cd-pipeline/triggers/add-a-trigger-2.md).

