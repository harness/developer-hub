---
title: Import a Pipeline From Git
description: Topic describing how to import a Pipeline from Git to Harness.
# sidebar_position: 2
helpdocs_topic_id: q1nnyk7h4v
helpdocs_category_id: rv2jo2hoiy
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness lets you create a Pipeline in the following ways:

* Create an inline Pipeline and save its configuration in Harness.
* Create a remote Pipeline and save its configuration in Git.
* Import a Pipeline from Git and save its configuration in Git.

This topic explains how to import a Pipeline from your Git repo to Harness.

### Before You Begin

* [Harness Git Experience Overview](/article/xl028jo9jk-git-experience-overview)
* [Harness Git Experience Quickstart​](/article/grfeel98am-configure-git-experience-for-harness-entities)
* [Manage a Harness Pipeline Repo Using Git Experience](/article/5nz7j3e1yc-manage-a-harness-pipeline-repo-using-git-experience)

### Permissions

* Make sure you have **Create/Edit** permissions for Pipelines.

### Step: Import Pipeline

You can import a Pipeline from the CI or CD module in Harness.

This topic shows you how to import a Pipeline to the CD module.

1. In Harness, click **Deployments**.
2. Select your Project and click on **Pipelines**.
3. Select **Import From Git**.![](https://files.helpdocs.io/kw8ldg1itf/articles/q1nnyk7h4v/1657547262527/screenshot-2022-07-06-at-11-47-45-am.png)The **Import Pipeline From Git** settings appear.![](https://files.helpdocs.io/kw8ldg1itf/articles/q1nnyk7h4v/1657609330124/screenshot-2022-07-12-at-12-31-29-pm.png)
4. Enter a **Name** for your Pipeline.
5. In **Git Connector**, select or create a Git Connector to connect to your Git repo. For steps, see [Code Repo Connectors](/category/xyexvcc206-ref-source-repo-provider).Important: Connector must use the Enable API access option and Token**Important**: The Connector must use the Enable API access option and Username and Token authentication. Harness requires the token for API access. Generate the token in your account on the Git provider and add it to Harness as a Secret. Next, use the token in the credentials for the Git Connector.​  
![](https://files.helpdocs.io/i5nl071jo5/articles/grfeel98am/1654228978563/git-hub-connector.png)  
For GitHub, the token must have the following scopes:  
![](https://files.helpdocs.io/i5nl071jo5/articles/grfeel98am/1654230836471/githubpatscope.png)Here's an example of a GitHub Connector that has the correct settings:​![](https://files.helpdocs.io/i5nl071jo5/articles/grfeel98am/1654231477325/git-hub-connector.png)
6. In **Repository**, select the repository from where you want to import the Pipeline. If your repository isn't listed, enter its name since only a select few repositories are filled here.Create the repository in Git before entering it in **Select Repository**. Harness does not create the repository for you.
7. In **Git Branch**, select the branch from where you want to import the Pipeline. If your branch isn't listed, enter its name since only a select few branches are filled here.Create the branch in your repository before entering it in **Git Branch**. Harness does not create the branch for you.
8. Enter the **YAML Path** from where you want to import the Pipeline. All your configurations are stored in Git in the [Harness Folder](/article/utikdyxgfz-harness-git-experience-overview#harness_folder).Make sure that your YAML path starts with `.harness/` and the YAML file already exists in the specified Git repo and branch.
9. Click **Import**.  
Click on your Pipeline to proceed.  
By default, Harness fetches your Pipeline details from the default branch. If you have imported Pipeline from some other branch you will see the below error.![](https://files.helpdocs.io/kw8ldg1itf/articles/q1nnyk7h4v/1657704761073/screenshot-2022-07-12-at-2-05-37-pm.png)Select the branch from where you imported the Pipeline and continue.

### See Also

* [Manage Input Sets and Triggers in Simplified Git Experience​](https://docs.harness.io/article/8tdwp6ntwz)
* [Manage a Harness Pipeline Repo Using Git Experience](/article/5nz7j3e1yc-manage-a-harness-pipeline-repo-using-git-experience)

