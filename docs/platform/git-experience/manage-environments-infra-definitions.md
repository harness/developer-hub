---
title: Manage environments and infrastructure definitions using Git Experience 
description: Git Experience allows you to manage and store your environments and infrastructure definitions in Git
sidebar_position: 11
---
:::note
Currently, Git Experience support for environments and infrastructure definition is behind the feature flag ``CDS_ENV_GITX`` and 
``CDS_INFRA_GITX``. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Harness lets you create an environment and infrastructure definition in the following ways:

* Create an inline environment and infrastructure definition and save its configuration in Harness.
* Create a remote environment and infrastructure definition and save its configuration in Git.

The topic explains how you can store your environment and infrastructure definition in Git.

## Before you begin

* Make sure you have a Git repo with at least one branch.​
* Make sure you have a [Harness Git connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) with a Personal Access Token (PAT) for your Git account.​

## Create remote environment
You can create an environment from your account, organization, or project. This topic explains the steps to create an environment from the project scope.
1. In your Harness Account, go to your project.
2. To create a environment from outside of a pipeline, under *Project Settings**, select **Envrionment**. To learn more about creating senvironments, go to [Create Environment](docs/continuous-delivery/x-platform-cd-features/environments/create-environments.md).

![](./static/envrionment.png)

3. Select **+ New Environment**. The **Add Environment** settings appear.
![](./static/environment-settings.png)
4. In **Name**, enter a name for the environment.
5. Select **Remote**.
6. In **Git Connector**, select or create a Git connector to the repo for your project.​ For steps, go to [Code Repo Connectors](/docs/category/code-repo-connectors).
7. In **Repository**, select your repository. If your repository isn't listed, enter its name. Create the repository in Git before entering it in **Select Repository**. Harness does not create the repository for you.
8. In **Git Branch**, select your branch. If your branch isn't listed, enter its name. Create the branch in your repository before entering it in **Git Branch**. Harness does not create the branch for you.
9. Select the branch where you want to save your Environment. You generally want to save it to the default branch on the first save. You can then create different branches in the Harness repo if you want to create different versions of your environment. 
![](./static/branch-switching-environment.png)
10. Harness Git Experience auto-populates the **YAML Path**. You can change this path and the file name.
11. Select **Save**.
12. Click on the YAML path provided (the one highlighted under the rectangular box), it will take you GitHub file where the environment is stored.
![](./static/yaml_path.png)

##  Create Remote infrastructure definition
1. On saving, environment configuration will open up, click on **Infrastructure Definition**.
2. Select **+ New Infrastructure Definition**, to know more about Infrastructure Definition refer [Infrastructure Definition](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments.md) .
![](./static/infra_Def1.png)
(You can select either of the two options to create an Infrastructure Definition)
3. In **Name** enter name for the infrastructure definition.
4. Select **Remote**
5. It will auto populate the connector, repository as well as the YAML Path. The auto-population of the connector, repository, and YAML Path is based on your environment configuration, specifically extracted from the Git repository where you've stored your environment details.
 