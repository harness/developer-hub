---
title: Import an Input Set From Git
description: This topic explains the steps to import an Inputset from Git.
# sidebar_position: 2
helpdocs_topic_id: j7kdfi3640
helpdocs_category_id: rv2jo2hoiy
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Input Sets are collections of runtime inputs for a Pipeline provided before execution.

All Pipeline settings can be set as runtime inputs in Pipeline Studio **Visual** and **YAML** editors.

Before running a Pipeline, you can select one or more Input Sets and apply them to the Pipeline.

You can either [create](/article/gfk52g74xt-run-pipelines-using-input-sets-and-overlays#step_1_create_the_input_sets) a new Input Set or import one from your Git repo.

This topic explains how to import an Input Set from your Git repo and apply it to your Pipeline.

### Before You Begin

* [Harness Git Experience Overview](/article/xl028jo9jk-git-experience-overview)
* [Harness Git Experience Quickstart​](/article/grfeel98am-configure-git-experience-for-harness-entities)
* [Input Sets and Overlays](https:/article/3fqwa8et3d-input-sets)
* [Manage a Harness Pipeline Repo Using Git Experience](/article/5nz7j3e1yc-manage-a-harness-pipeline-repo-using-git-experience)
* [Manage Input Sets and Triggers in Git Experience](/article/8tdwp6ntwz-manage-input-sets-in-simplified-git-experience)

### Step: Import an Input Set

You can import an Input Set from the CI or CD module in Harness.

This topic shows you how to import an Input Set to the CD module.

1. In Harness, click **Deployments**.
2. Select your Project and click on **Pipelines** and click on **Input Sets**.
3. Click **New Input Set** and select **Import From Git**.![](https://files.helpdocs.io/kw8ldg1itf/articles/j7kdfi3640/1658829738986/screenshot-2022-07-26-at-3-30-31-pm.png)The **Import Input Set From Git** settings appear.![](https://files.helpdocs.io/kw8ldg1itf/articles/j7kdfi3640/1658830029315/screenshot-2022-07-26-at-11-18-41-am.png)
4. Enter a **Name** for your Input Set.
5. Harness fetches the following details and auto-fills them:
	1. **Git Connector**
	2. **Repository**
	3. **Git Branch**
6. Enter the **YAML Path** from where you want to import the Input Set. All your configurations are stored in Git in the [Harness Folder](/article/utikdyxgfz-harness-git-experience-overview#harness_folder).Make sure that your YAML path starts with `.harness/` and the YAML file already exists in the specified Git repo and branch.
7. Click **Import**.  
Click on your **Run Pipeline** to proceed.

