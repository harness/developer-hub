---
title: Create a remote step template
description: This topic explains how to add a remote Step template in Harness.
sidebar_position: 6
helpdocs_topic_id: u1ozbrk1rh
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the feature flag `NG_TEMPLATE_GITX`. Contact [Harness Support](mailto:support@harness.io) to enable it. ​Harness enables you to add templates to create re-usable logic and Harness entities (like steps, stages, and pipelines) in your pipelines. You can link these templates in your pipelines or share them with your teams for improved efficiency.

Templates enhance developer productivity, reduce onboarding time, and enforce standardization across the teams that use Harness.

You can create a template and save it either in Harness or in a Git repository using the **Inline** or **Remote** option, respectively.

![](./static/create-a-remote-step-template-16.png)

This topic walks you through the steps to create a remote step template.

### Objectives

You'll learn how to: 

* Create a remote run step template.
* Define template parameters.​

### Before you begin

* Review [Harness Key Concepts](../../first-gen/starthere-firstgen/harness-key-concepts.md)
* Go to [Templates overview](template.md)
* Go to [CI pipeline tutorials](../../continuous-integration/ci-quickstarts/ci-pipeline-quickstart.md)

### Permissions

You must have **Create/Edit** and **Access** permissions for templates to create a remote step template.

### Remote Step Template overview

Harness' templates allow you to design reusable content, logic, and parameters, ensuring that the application is the major focus of your pipelines.​ Instead of creating pipelines from scratch each time, Harness lets you select from pre-built templates and link them to your pipelines. The process of developing pipelines thus becomes easier by reducing duplication and increasing reusability.

You can share your work with your team and reuse it in your pipelines.​

You can view all your templates in Harness under **Templates** based on their scope. ​We will also call this the Template Library in this topic.

Harness lets you save your templates in Git repositories.​ For example, if you have a core step that you want all of your pipelines to use, you can put the template in a core repo and then refer to it. Now you can reuse this step template in multiple pipelines.

For information on inline step templates, go to [Create a step template](run-step-template-quickstart.md).

### Use a template in a pipeline

Harness resolves the repositories when your pipeline starts up. After that, the same resource is used during the execution of the pipeline. When you use the templates in your pipelines, once the templates are fully expanded, the final pipeline runs as if it were defined entirely in the source repo.​

You can have one of the following scenarios when using a template in your pipeline:

* The remote stage template and the pipeline exist in the same Git repo.
* The remote stage template and the pipeline exist in different Git repos​.
* The pipeline exists in Harness and the stage template exists in a Git repo.​

Let's see how you can use a template in each of these situations.​

#### Remote step template and the pipeline exist in the same Git repo

To use the template in your pipeline if your remote step template and pipeline are both present in the same Git repository, make sure your pipeline and template are both present in the same branch.​

#### Remote step template and the pipeline exist in different Git repos

To use the template in your pipeline if your remote step template and pipeline are present in different Git repositories,​ make sure your template is present in the default branch of the specific repo.

#### Pipeline exists in Harness and the Step Template exists in Git repo

To use the template in your inline pipeline​, make sure your template is present in the default branch of your Git repository.

### Step 1: Create a remote step template

You can create a step template from your account, org, or project. ​This topic explains the steps to create a step template from the project scope.

To create a remote step template from the project scope, do the following:

1. In your Harness account, go to your project.​
2. In **Project SETUP**, select **Templates**.
3. Select **New Template**, and then select **Step**. ​The **Create New Step Template** settings appear.
4. In **Name**, enter a name for the template.​
5. In **Version Label**, enter a version for the template.​
6. Select **Remote**.
7. In **Git Connector**, select or create a Git connector to the repo for your project.​ For steps, go to [Code Repo Connectors](/docs/category/code-repo-connectors). Important: The connector must use the **Enable API access** option and **Username and Token** authentication. ​Harness requires the token for API access. Generate the token in your account on the Git provider, and add it to Harness as a secret. Next, use the token in the credentials for the Git connector.​​

   ![](./static/create-a-remote-step-template-18.png)

    For GitHub, the token must have the following scopes:​

    ![](./static/create-a-remote-step-template-19.png)

8. In **Repository**, select your repository. If your repository isn't listed, enter its name. ​Create the repository in Git before entering it in **Select Repository** . Harness does not create the repository for you.
9. In **Git Branch**, select your branch. If your branch isn't listed, enter its name. ​Create the branch in your repository before entering it in Git Branch. Harness does not create the branch for you.​
10. Harness auto-populates the **YAML Path**. You can change this path and the file name.
11. Select **Start**.​  

    Your step template is created and you can now add steps from the step Library.

    ![](./static/create-a-remote-step-template-20.png)

### Step 2: Add Step Parameters

To add step parameters, do the following:

1. In **Step Library**, select **Shell Script** under **Utilities**.  
The **Step Parameters** settings appear.​
2. ​In **Script**, enter your script.
3. Specify your **Input Variables** and **Output Variables**.
4. In **Execution Target**,​ specify where you want to execute the script.  
You can select **Specify on Target Host** or **On Delegate**.  
For more information, go to [Using shell scripts in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts).
5. Select **Save**. The **Save Template to Git** settings appear.

    ![](./static/create-a-remote-step-template-21.png)

6. In **Select Branch to Commit**, You can select one of the following:
	- **Commit to an existing branch:** You can start a pull request if you like.​
	- **Commit to a new branch**:​ Enter the new branch name. You can start a pull request if you like.

7. Select **Save**. 

    Your step template is saved to the repo branch.
	
	​![](./static/create-a-remote-step-template-22.png)

8. Click the YAML file to see the YAML for the step template.
9. Edit the YAML. For example, change the name of the template.​
10. Commit your changes to Git.​
11. Return to Harness and refresh the page.​​

    A **Template Updated** message appears.
	
	![](./static/create-a-remote-step-template-23.png)

12. Select **Update**.

    The changes you made in Git are now applied to Harness.​​

### Next steps

* [Use a template](use-a-template.md)
