---
title: Add Scripts for Traditional (SSH) Deployments
description: When you create the Harness Secure Shell (SSH) Service, Harness automatically generates the commands and scripts needed to install the app and stack on the target host, copy the file(s) to the correc…
sidebar_position: 40
helpdocs_topic_id: ih779z9kb6
helpdocs_category_id: td451rmlr3
helpdocs_is_private: false
helpdocs_is_published: true
---

When you create the Harness Secure Shell (SSH) Service, Harness automatically generates the commands and scripts needed to install the app and stack on the target host, copy the file(s) to the correct folder, and start the app.


### Before You Begin

* [Connect to Your Repos and Target SSH Platforms](connect-to-your-target-ssh-platform.md)
* [Traditional Deployments Overview](traditional-deployments-overview.md)
* [Add Artifacts and App Stacks for Traditional (SSH) Deployments](add-artifacts-for-ssh-deployments.md)

### Visual Summary

Here is an example of the default scripts and commands Harness generates when you first create your Secure Shell (SSH) Service:

![](./static/add-deployment-specs-for-traditional-ssh-deployments-02.png)

### Review: Script Execution Order

When you look at the default commands in a file-based Service, their order of execution might be confusing. For example, it looks like they are executed like this: 

![](./static/add-deployment-specs-for-traditional-ssh-deployments-03\.png)

But they are actually executed like this: 

![](./static/add-deployment-specs-for-traditional-ssh-deployments-04\.png)

The order is clearer when you see the deployment in the **Deployments** page:

![](./static/add-deployment-specs-for-traditional-ssh-deployments-05.png)

### Step 1: Add Commands and Scripts

The default scripts Harness generates will deploy the artifact and app package you add to the Service. No further changes are required.

If you like, you can add commands and scripts using the **Add Command** settings, and by clicking the plus icon in the commands.

![](./static/add-deployment-specs-for-traditional-ssh-deployments-06\.png)

All of the scripts include tooltips to explain how to use them:

![](./static/add-deployment-specs-for-traditional-ssh-deployments-07.png)

### Review: Download Artifact and Exec Scripts

The Download Artifact script is supported for Amazon S3, Artifactory, SMB (PowerShell-only), SFTP (PowerShell-only), Azure DevOps artifacts, Nexus, Jenkins, and Bamboo. For other artifact sources, add a new command and use the Exec script to download the artifact. For more information, see  [Exec Script](https://docs.harness.io/article/qluiky79j8-service-types-and-artifact-sources#exec_script).

### Review: Harness and Custom Variables

You can use Harness built-in variables in your Service scripts, or add your own variables and reference them in your scripts.

For information on Harness built-in variables, see  [What is a Harness Variable Expression?](https://docs.harness.io/article/9dvxcegm90-variables). For information on using variables in your scripts, see  [Add Service Config Variables](https://docs.harness.io/article/q78p7rpx9u-add-service-level-config-variables) and [Add Service Config Files](https://docs.harness.io/article/iwtoq9lrky-add-service-level-configuration-files).

### See Also

* [Set Default Application Directories as Variables](https://docs.harness.io/article/lgg12f0yry-set-default-application-directories-as-variables)
* [Override Variables at the Infrastructure Definition Level](../kubernetes-deployments/override-variables-per-infrastructure-definition.md)

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

