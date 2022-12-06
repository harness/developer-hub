---
title: Manage a Harness Pipeline Repo Using Git Experience
description: Git Experience enables you to store and manage your Harness Pipelines and configs in your Git repos.
# sidebar_position: 2
helpdocs_topic_id: 5nz7j3e1yc
helpdocs_category_id: rv2jo2hoiy
helpdocs_is_private: false
helpdocs_is_published: true
---

Git Experience enables you to store and manage your Harness Pipelines and Input Sets as YAML definition files in your Git repos. You can store your Harness definitions in the same repo with your code. You can also store your Harness definitions in a separate repo from your codebase.

This topic describes the second workflow. We start with two code repos in Git, for a front-end service and a back-end service. Then we create Pipelines, Input Sets, and Triggers for the two codebases in a separate Harness repo.

![](./static/manage-a-harness-pipeline-repo-using-git-experience-14.png)

### Before you begin

This topic assumes that you are familiar with the following:

* How to create a Pipeline using Git Experience. See [Harness Git Experience QuickStart](configure-git-experience-for-harness-entities.md).
* How to create Input Sets and Triggers using Git Experience. See [Manage Input Sets and Triggers in Git Experience](manage-input-sets-in-simplified-git-experience.md).
* A basic understanding of how Pipelines, Input Sets, and Triggers work together:
	+ [Run Pipelines using Input Sets and Overlays](../8_Pipelines/run-pipelines-using-input-sets-and-overlays.md)
	+ [Trigger Pipelines using Git Event Payloads](../11_Triggers/trigger-pipelines-using-custom-payload-conditions.md)

This topic also assumes you have a Git repo with the codebase you want to build and at least one branch.

### Step 1: Create the Harness repo

Log in to your Git provider and create a new repo. In this workflow we call it **myHarnessConfigs**.

### Step 2: Create a new pipeline

In the Harness Pipeline Studio, go to your CI project and then click **Pipelines** > **+New Pipeline**. The **Create New Pipeline** window appears.

Enter a name that corresponds to the code repo for the Pipeline. In this case we use the same name as the repo: **myFrontEndService**. Under **How do you want to set up your pipeline**, select **Remote**.

Select the Git Connector and the Git repo where you want to save the Pipeline. In this case, we select **myHarnessConfigs**.

For the YAML path, enter **.harness/{PIPELINE\_SUBFOLDER}/{PIPELINE\_NAME}.yml**. The root folder **.harness** is required. The **{*****PIPELINE\_SUBFOLDER*****}** is not required, but it is good practice if you want to store multiple Pipelines in the same repo. This makes it much easier to manage all of your Harness definitions.

In this case, we save the Pipeline YAML as `./harness/myFrontEndService/myFrontEndService.yaml`.

![](./static/manage-a-harness-pipeline-repo-using-git-experience-15.png)

Click **Start**. You can now set up your Pipeline.

### Step 3: Set up your build stage and codebase

In the Pipeline Studio, click **Add Stage** and select **Build** for the stage type.

In About your Stage, select the Git repo with the codebase that you want the Pipeline to build. Click **Set Up Stage**.

![](./static/manage-a-harness-pipeline-repo-using-git-experience-16.png)

Set up your Build Stage in the Pipeline Studio: define the build infrastructure and add at least one Step. Click **Save**. The **Save Pipelines to Git** window appears.

Select the branch where you want to save the Pipeline and click **Save**. You generally want to save it to the default branch on the first save. You can then create different branches in the Harness repo if you want to create different versions of your Pipeline.

![](./static/manage-a-harness-pipeline-repo-using-git-experience-17.png)

### Step 4: Create an input set

With Git Experience enabled, any Input Sets you create get stored in the same repo and branch as the Pipeline definition. In this step, you will create a simple Input Set and save it with your Pipeline.

Click **Run**. The **Run Pipeline** screen appears.

Under **Build Type**, select **Git Branch**.

For the **Branch Name**, select **Expression** and enter `<+trigger.targetBranch>` as a runtime expression.

Click **Save as Input Set**. The Save InputSets to Git screen appears.

Select **Commit to an existing branch**.

Enter the name and YAML path for the Input Set. For the YAML path, use the same format as you did with the Pipeline: `.harness` root folder, Pipeline subfolder, filename. In this example, we enter `.harness/myFrontEndService/trigger-target-branch.yaml`.

Click **Save** and save the Input Set into the default branch in your Harness repo.

Every Input Set is associated with a specific Pipeline, which is specified by the `pipeline : identifier` element in the Input Set YAML.

![](./static/manage-a-harness-pipeline-repo-using-git-experience-18.png)

### Step 5: Create a trigger

Now that you have a Pipeline and Input Set in your default branch, you create a Trigger that uses the Input Set you just created.

**Create Input Set before Creating Trigger:** If you want to use an Input Set as part of a Trigger, create and sync the Input Set before creating the Trigger.In the Pipeline Studio, click **Triggers** and create a new Trigger. Note the following:

* In the **Configuration** tab > **Repository Name** field, make sure you specify the codebase repo and not the Harness repo.
* In the **Pipeline Input Repo** > **Pipeline Input**, select the Input Set you just created.
* In the **Pipeline Input Repo** > **Pipeline Reference Branch** field, specify the default branch in the Harness repo where you initially saved the Pipeline. When the Trigger receives a payload, it looks in the repo where you store your Harness definitions. Then it uses the Pipeline in the branch specified by this field.The default setting for the Pipeline Reference Branch field is `<+trigger.branch>`. This is a reasonable default the Trigger is webhook-based AND your code and Harness configs are in the same repo. The second condition does not apply in this case. Therefore, you must set this field manually.
* For information on other fields, [Trigger Pipelines using Git Event Payload Conditions](../11_Triggers/trigger-pipelines-using-custom-payload-conditions.md).

In the Pipeline Input tab, select the Input Set you just created and click **Create Trigger**.

You now have a Pipeline, Input Set, and Trigger that you can use in new branches that you create from the default branch.

Unlike Pipelines and Input Sets, Trigger definitions are saved in the Harness database and not in your Git repo. Each Trigger is associated with a specific Pipeline, which is specified by the `pipelineIdentifier` element in the Trigger YAML.![](./static/manage-a-harness-pipeline-repo-using-git-experience-19.png)

### Next steps

You now have a Pipeline, Input Set, and Trigger for your codebase. The Pipeline and Input Set are in one repo, `myHarnessConfigs`. The code is in another repo, `myFrontEndService`. Note that both repos have the same default branch, `main`. When your Trigger receives a matching payload, it starts a build using the Pipeline in `myHarnessConfigs`. The Trigger uses its `pipelineBranchName` element in its YAML definition and uses the Pipeline in this branch (`main`) to run the build.

#### Set up more pipelines

Follow the previous workflow for each additional codebase you want to build in Harness. When saving multiple Pipelines in the same repo, remember to save your Pipelines and Input Sets in separate subfolders. In this example, we've added a Pipeline and Input Set for our `myBackEndService` codebase:


```
% pwd  
~/myHarnessConfigs/.harness  
% ls -aR    
.	..	myBackEndService	myFrontEndService  
./myBackEndService:  
.	..	myBackEndService.yaml	trigger-target-branch.yaml  
./myFrontEndService:  
.	..	myFrontEndService.yaml	trigger-target-branch.yaml
```
#### Create branch-specific pipelines

You might find that you can use the default Pipeline, Input Set, and Trigger you just created for most of your builds, regardless of which codebase branch gets updated. The codebase sends a payload; the payload includes the updated branch; the Trigger builds from this branch using the runtime expression `<+trigger.targetBranch>`.

Git Experience enables you to create branches in your Harness repo so you can create different versions of the same Pipeline for different use cases. For example, suppose you want your Pipeline to push to different registries depending on the updated branch. Updates to `main` push to a public registry; updates to all other branches push to a private registry. To implement this, do the following:

1. Customize your default Pipeline and click Enter.
2. Select **Commit to a new branch** and enter the branch name. In this case, we save the Pipeline in a new branch `push-to-private`:![](./static/manage-a-harness-pipeline-repo-using-git-experience-20.png)
3. Customize the Input Sets and Triggers for the new Pipeline as needed. For this specific use case, you would add a condition to the Trigger so it uses the Pipeline in `push-to-private` when it receives a payload from any branch except `main`.![](./static/manage-a-harness-pipeline-repo-using-git-experience-21.png)
4. In the Trigger editor > Pipeline Input field, make sure that the Pipeline Reference Branch field references the new branch:![](./static/manage-a-harness-pipeline-repo-using-git-experience-22.png)

