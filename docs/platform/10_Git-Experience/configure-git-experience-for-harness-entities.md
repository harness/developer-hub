---
title: Harness Git Experience Quickstart
description: This topic explains steps to configure Git Experience for Harness Entities.
sidebar_position: 3
helpdocs_topic_id: grfeel98am
helpdocs_category_id: rv2jo2hoiy
helpdocs_is_private: false
helpdocs_is_published: true
---

This quickstart shows you how to enable and use Git Experience for your Harness resources, such as pipelines.

Harness Git Experience lets you store your resources and configurations in Git and pick Git repos as the source of truth.

### Objectives

You'll learn how to:

1. Enable Git Experience for a pipeline.
2. Create and sync a pipeline with your Git repo.
3. Execute a pipeline

### Before you begin

Make sure you have the following set up Before you begin this quickstart:

* Make sure you have a Git repo with at least one branch.
* Make sure you have a Git connector with a Personal Access Token (PAT) for your Git account.​​
* A Personal Access Token (PAT) for your Git account.
	+ Harness needs the PAT to use the Git platform APIs.
	+ You add the PAT to Harness as a Text Secret and it is encrypted using a Harness Secret Manager.
	+ Your Git Personal Access Token is stored in your Harness secret and is a private key to which only you have access. This secret cannot be accessed or referenced by any other user.
	+ The PAT must have the following scope:
		- GitHub:![](./static/configure-git-experience-for-harness-entities-35.png)
		- Bitbucket:![](./static/configure-git-experience-for-harness-entities-36.png)
	+ To enable Git Experience for your resources, make sure that you have Create/Edit permissions for them.​​


:::note
Make sure your repo has at least one branch, such as main or master. For most Git providers, you simply add a README file to the repo, and the branch is created.

:::

### Supported Git providers

The following section lists the support for Git providers for Harness Git Sync:​

* GitHub
* Bitbucket Cloud
* Bitbucket Server
* Azure Repos

Make sure `feature.file.editor` is not set to `false` in the `bitbucket.properties` file if you are using Bitbucket on-prem.

### Git experience requirements

You can store your resources and configurations in Git by selecting the **Remote** option while creating the resources.

For this, you must specify a Harness Git Connector, a repo, branch details, and a file path.

This topic explains how to create a remote pipeline and execute it using Harness Git Experience.

You can also store your configurations in Harness, by selecting the **Inline** option while creating resources. For more information on creating an inline pipeline, see [Pipelines and Stages](https://developer.harness.io/docs/category/pipelines).

![](./static/configure-git-experience-for-harness-entities-37.png)

You can store configurations of the following resources in Git:

* Pipelines
* Input sets

Harness tracks where your configuration is kept and manages the whole lifespan of resources by maintaining metadata for each resource.

### Add a remote pipeline

This quickstart explains how to add a pipeline and sync it with your Git repo. This is called the Remote option. To add an inline pipeline, see **Remote** option. To add an inline pipeline, see [Create a Pipeline](../8_Pipelines/add-a-stage.md#step-1-create-a-pipeline).

In your Project, click **Pipelines** and then click **Create a Pipeline**. The **Create New Pipeline** settings appear.

![](./static/configure-git-experience-for-harness-entities-38.png)

Enter a **Name** for your pipeline.

Click **Remote**. The additional settings appear to configure Git Experience.

![](./static/configure-git-experience-for-harness-entities-39.png)

In **Git Connector**, select or create a Git Connector to the repo for your Project. For steps, see [Code Repo Connectors](../7_Connectors/connect-to-code-repo.md).

![](./static/configure-git-experience-for-harness-entities-40.png)

<details>
<summary> IMPORTANT </summary>

Connector must use the Enable API access option and Token
The Connector must use the Enable API access option and Username and Token authentication. Harness requires the token for API access. Generate the token in your account on the Git provider and add it to Harness as a Secret. Next, use the token in the credentials for the Git Connector.​

![](./static/configure-git-experience-for-harness-entities-41.png) 

For GitHub, the token must have the following scopes: 

![](./static/configure-git-experience-for-harness-entities-42.png)

</details>

Here's an example of a GitHub Connector with the correct settings:​

![](./static/configure-git-experience-for-harness-entities-43.png)

In **Repository**, select your repository. If your repository isn't listed, enter its name since only a select few repositories are filled here.

![](./static/configure-git-experience-for-harness-entities-44.png)


:::note
Create the repository in Git before entering it in **Select Repository**. Harness does not create the repository for you.

:::

In **Git Branch**, select your branch. If your branch isn't listed, enter its name since only a select few branches are filled here.

![](./static/configure-git-experience-for-harness-entities-45.png)


:::note
Create the branch in your repository before entering it in **Git Branch**. Harness does not create the branch for you. 

:::

Harness pre-populates the **YAML Path**. You can change this path and the file name. All your configurations are stored in Git in the [Harness Folder](harness-git-experience-overview.md#harness-folder).


:::note
Make sure that your YAML path starts with `.harness/` and is unique.
:::

Click **Start**.

The pipeline Studio is displayed with your repo and branch name.

![](./static/configure-git-experience-for-harness-entities-46.png)

### Add a stage

Click **Add Stage**. The stage options appear.

Select a stage type and follow its steps.

The steps you see depend on the type of stage you selected.​

For more information, see [Add Stage](../8_Pipelines/add-a-stage.md).

Add a step and click **Save**.

The **Save Pipelines to Git** settings appear.

![](./static/configure-git-experience-for-harness-entities-47.png)

In **Select Branch to Commit**, commit to an existing or new branch.

* **Commit to an existing branch**: you can start a pull request if you like.
* **Commit to a new branch**: enter the new branch name. You can start a pull request if you like.

Click **Save**. 


:::note
If you are using Bitbucket on-prem and `feature.file.editor` is set to `false` in the `bitbucket.properties`, make sure you enable **Use Git client for commits** in the [default settings](../17_Settings/default-settings.md) at the account scope. Harness will check out the code on the delegate and use the Git client to make the commits to your Git repository.
:::


Your pipeline is saved to the repo branch.

![](./static/configure-git-experience-for-harness-entities-48.png)

Click the YAML file to see the YAML for the pipeline.

Edit the pipeline YAML. For example, change the name of a step.

Commit your changes to Git.

Return to Harness and refresh the page.​

A Pipeline Updated message appears.

Click **Update**.

The changes you made in Git are now applied to Harness.​

### Execute pipeline

In your Project, click **Pipelines**.

Click on your pipeline.

Harness loads your pipeline depending on where you saved your remote pipeline.

- If you saved your pipeline on the default branch, Harness loads it from the default branch.
- If you saved your pipeline on a non-default branch, Harness uses the metadata of this pipeline to load it from the non-default branch.
- If you saved your pipeline in a branch that is no longer available, Harness throws an error. You must select a branch to load your pipeline in this case.
  

:::caution
Harness fetches your pipeline details from the default branch if you created your remote pipeline before version 77808. Select the corresponding branch and proceed to load a pipeline residing in a branch other than the default branch.

:::


<!-- ![](./static/configure-git-experience-for-harness-entities-49.png) -->

Click **Run**.

![](./static/configure-git-experience-for-harness-entities-50.png)

Click **Run Pipeline**.

### Branch selection logic for referencing remote entities in pipelines

The configurations of the required resources and any referenced entities like Input Sets, are fetched from Git during pipeline fetch, creation, or execution.

#### Referenced entities are in the same repository

If the referenced entities exist in the same repo, they are fetched from the same branch that you have selected for pipeline execution.​

Let us look at an example: 

There is a pipeline `DocRemotePipeline` that references a remote pipeline template named `remotedocpipelinetemplate`. This remote pipeline template references a remote stage template named `RemoteStageTemplate`. These 3 entities are in the same Git repo.

![](./static/entities-in-same-repo.png)

When you execute this pipeline, Harness fetches these entities from the branch that you have selected.

![](./static/entities-in-same-git-repo.png)

#### Referenced entities are in different repositories

If the referenced entities exist in a different repo, they are fetched from the default branch of the repo where the entities are stored.​
  
Let us look at an example: 
  
There is a pipeline `remoteDocrepoPipeline` that references a remote pipeline template named `remotepipelinetemplate_docrepo`. This remote pipeline template references a remote stage template named `RemoteStageTemplate`. These 3 entities are in different Git repos.

When you execute this pipeline, Harness fetches these nested entities from the default branch of the respective repositories.

![](./static/entities-in-diff-repo.png)
  
Harness resolves all the dependencies and then proceeds with Pipeline execution.​

### Next steps

* [Manage Input Sets and Triggers in Simplified Git Experience​](manage-input-sets-in-simplified-git-experience.md)

