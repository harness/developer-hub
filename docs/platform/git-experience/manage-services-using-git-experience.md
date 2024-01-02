---
title: Manage services using Git Experience 
description: Git experience allows you to manage and store your services in Git
sidebar_position: 11
---

Harness lets you create a service in the following ways:

* Create an inline service and save its configuration in Harness.
* Create a remote service and save its configuration in Git.

The topic explains how you can store your services in Git.

## Before you begin

* Make sure you have a Git repo with at least one branch.​
* Make sure you have a [Harness Git connector](/docs/platform/connectors/code-repositories/connect-to-code-repo) with a Personal Access Token (PAT) for your Git account.​

## Create a remote service

You can create a service from your account, organization or project. This topic explains the steps to create a service from the project scope.

To create a remote service, do the following:

1. In your Harness Account, go to your project.
2. To create a service from outside of a pipeline, you use **Services** in the navigation pane.
To learn more about creating services refer [Create Services](docs/continuous-delivery/x-platform-cd-features/services/create-services.md)
3. Select **+ New Service**. The **Add Service** settings appear.
![](./static/Gitex_service.png) 
4. In **Name**, enter a name for the service.
5. Select **Remote**.
6. In **Git Connector**, select or create a Git connector to the repo for your project.​ For steps, go to [Code Repo Connectors](/docs/category/code-repo-connectors).
7. In **Repository**, select your repository. If your repository isn't listed, enter its name. Create the repository in Git before entering it in **Select Repository**. Harness does not create the repository for you.
8. In **Git Branch**, select your branch. If your branch isn't listed, enter its name. Create the branch in your repository before entering it in **Git Branch**. Harness does not create the branch for you.

Select the branch where you want to save your Service . You generally want to save it to the default branch on the first save. You can then create different branches in the Harness repo if you want to create different versions of your service.

![](./static/branch_switching.png)

9. Harness Git experience auto-populates the **YAML Path**. You can change this path and the file name.
10. Select **Save**.

![](./static/save_service_config.png) 

Click on the the yaml path provided (The one highlighted under rectangular box), it will take you github file where the service is stored.

![](./static/service_remote_git.png) 

### Adding services in Pipeline.
Once the service is created you can use it in your CD pipeline, or you can create services within in your pipeline. 

1. Go to stage settings and click on **Service**.
![](./static/stage_service_settings.png)
2. Select **Services** if service is already created, if not it can easily be created by clicking on **+ Add Services** and following the steps mentioned above for creating remote services.
3. You can select the branch for selecting the version of service you want to use in your pipeline.
![](./static/branches_adding_services.png)
:::note
By default it will pick up the branch of the pipeline, suppose you are creating service at branch named as `remote-services` it will pick up the service version created at branch `remote-services`.
:::
4. Click on **Apply Selected**.

## Inline service to remote

Suppose the service is stored as ``Inline`` that is it's configuration stored in Harness, it can be easily moved to ``Git`` afterwards. 

1. Click on **Services**
2. Click on vertical ellipsis as shown below in the image. 
3. Click on **Move to Git**.
It will pop up the similar settings as shown above in **Create Remote Service** section for storing service configuration in Git.

![](./static/inline_to_remote.png) 
