---
title: Manage input sets and triggers in Git Experience
description: Once you have saved your pipeline in your repo, you can set up your input sets and triggers.
sidebar_position: 9
helpdocs_topic_id: 8tdwp6ntwz
helpdocs_category_id: rv2jo2hoiy
helpdocs_is_private: false
helpdocs_is_published: true
---

Once you have saved your pipeline in your repo, you can set up your input Sets and triggers. You can set up your input set definitions in your repo along with your pipeline. You can then set up your triggers to use specific input sets in your repo.

This topic covers a simple workflow for setting up your input sets and triggers. It does not cover these topics in detail. For details on those, see:

* [Input sets and overlays](/docs/platform/pipelines/input-sets/)
* [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines/)

### Before you begin

You'll need the following:

* A Git repo with at least one branch and a Personal Access Token (PAT) for your account. Harness needs the PAT to use the Git platform APIs. The PAT is encrypted using a Harness Secret Manager. Your Git Personal Access Token is stored in your Harness secret and is a private key to which only you have access. This secret cannot be accessed or referenced by any other user.Make sure your repo has at least one branch, such as main or master. For most Git providers, you simply add a README file to the repo, and the branch is created.
* A Harness pipeline with Git Experience enabled. In this how-to, you will cross-check your updates in both your codebase and in the Harness UI. See [Harness Git Experience QuickStart](configure-git-experience-for-harness-entities.md).

### Initial setup

#### Step 1: Select the branch

When you edit your pipeline in the Harness UI, you are editing a branched version of that pipeline. Make sure that you are editing in the correct branch. You can switch branches using the branch picker in the top left.

![](./static/manage-input-sets-in-simplified-git-experience-06.png)

#### Step 2: Create an input set

With Git Experience enabled, any input sets you create get stored in the same repo and branch as the pipeline definition. In this step, you will create a simple input set and save it with your pipeline.

Select **Run**. The **Run Pipeline** screen appears.

Under **Build Type**, select **Git Branch**.

For the **Branch Name**, select **Expression** and enter `<+trigger.targetBranch>` as a runtime expression.

![](./static/manage-input-sets-in-simplified-git-experience-07.png)

Select **Save as Input Set**. In the popup that appears, enter the name of the input set. (Note that the Yaml Path field auto-populates with the path (.harness/) and filename based on the name you enter.)

![](./static/manage-input-sets-in-simplified-git-experience-08.png)

Select **Save**. The **Save Input Sets to Git** screen appears.

Select **Commit to an existing branch** and select **Save**. The input set is now saved with your pipeline under `.harness` in your repo and branch.

![](./static/manage-input-sets-in-simplified-git-experience-09.png)

In the **Run Pipeline** screen, select **Cancel**.

#### Step 3: Create a trigger for the pipeline

Now that you have a pipeline and input set in your default branch, create a trigger that uses the input set you just created.

In the Pipeline Studio, create a new trigger as described in [Trigger pipelines using Git event payload conditions](/docs/platform/triggers/triggering-pipelines/).

In the **Pipeline Input** tab, select the input set you just created and select **Create Trigger**.

![](./static/manage-input-sets-in-simplified-git-experience-10.png)

You now have a pipeline, input set, and trigger that you can use in new branches that you create from the default branch. When a webhook payload arrives, the trigger selects the branch to use based on the **Pipeline Reference Branch** field (`<+trigger.branch>`) and the **Git Branch** field in the input set (`<+trigger.branch>`).

### Example workflow: Create a custom pipeline in a new branch

Suppose you're a developer working on a new feature in your own branch. You want your pipeline to run some additional tests on your code before it generates an artifact. In this example workflow, we customize the pipeline and input set in a new branch. Then we create a trigger specifically for that branch.

#### Step 1: Check `.harness` is in the new branch

This workflow assumes that your branch has a `.harness` subfolder with the same pipeline and input set as `main`.

If you created the new branch from `main` *after* you did the initial setup described above, proceed to the next step.

If you created the new branch from `main` *before* you did the initial setup, commit the `.harness` folder in `main` to the new branch.

#### Step 2: Update the pipeline

In the Pipeline Studio, check the branch pull-down to make sure you're in the correct branch. (You might need to refresh the page to see the new branch.)

![](./static/manage-input-sets-in-simplified-git-experience-11.png)

Update the pipeline with the branch-specific behavior you want the pipeline to perform. (In this example workflow, you would add some Run Test Steps to your Build Stage.)

When you finish updating, select **Save** and save the pipeline in your new branch.

#### Step 3: Create a branch-specific trigger

In this step, you will create a trigger specifically for the new branch. Do the following:

* In the Configuration tab, include the branch in the trigger name. For example, **build-on-push-to-my-new-feature-branch**.
* In the Conditions tab, set the Condition to trigger on the specified branch only. If you want to trigger on a Pull Request, for example, set the Target Branch field to `my-new-feature-branch`.  
You might also want to set the Changed Files field to exclude the `.harness` folder. This will ensure that updates to your Harness configs don't trigger unwanted builds.

  ![](./static/manage-input-sets-in-simplified-git-experience-12.png)

* In the **Pipeline Input** tab, specify the branch name in the **Pipeline Reference Branch** field.
  
  ![](./static/manage-input-sets-in-simplified-git-experience-13.png)

### Notes

Review the following notes in case you encounter issues using Git Experience with input sets.

#### Pipeline reference branch field

When Git Experience is enabled for your pipeline, the **Pipeline Input** tab includes the **Pipeline Reference Branch** field. This field is set to `<+trigger.branch>` by default. This means that any build started by this trigger uses the pipeline and input set definitions in the branch specified in the webhook payload.

This default is applicable *only* if the trigger is webhook-based. For all other trigger types, you need to enter a specific branch name.

#### Create input set before creating trigger

If you want to use an input set as part of a trigger, create and sync the input set before creating the trigger.

For more details, go to [Manage a Harness Pipeline Repo Using Git Experience](manage-a-harness-pipeline-repo-using-git-experience.md).

