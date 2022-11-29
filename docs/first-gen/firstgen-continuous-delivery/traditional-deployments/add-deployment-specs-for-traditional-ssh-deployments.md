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

In this topic, we will discuss the default commands and scripts, their processing order, and how to add additional scripts:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Review: Script Execution Order](#review_script_execution_order)
* [Step 1: Add Commands and Scripts](#step_1_add_commands_and_scripts)
* [Review: Download Artifact and Exec Scripts](#undefined)
* [Review: Harness and Custom Variables](#undefined)
* [See Also](#see_also)
* [Configure As Code](#configure_as_code)

### Before You Begin

* [Connect to Your Repos and Target SSH Platforms](/article/mk5pjqyugc-connect-to-your-target-ssh-platform)
* [Traditional Deployments Overview](/article/6pwni5f9el-traditional-deployments-overview)
* [Add Artifacts and App Stacks for Traditional (SSH) Deployments](/article/umpe4zfnac-add-artifacts-for-ssh-deployments)

### Visual Summary

Here is an example of the default scripts and commands Harness generates when you first create your Secure Shell (SSH) Service:

![](https://files.helpdocs.io/kw8ldg1itf/articles/ih779z9kb6/1598399100086/image.png)### Review: Script Execution Order

When you look at the default commands in a file-based Service, their order of execution might be confusing. For example, it looks like they are executed like this: 

![](https://files.helpdocs.io/kw8ldg1itf/articles/ih779z9kb6/1598399230051/image.png)But they are actually executed like this: 

![](https://files.helpdocs.io/kw8ldg1itf/articles/ih779z9kb6/1598399242531/image.png)The order is clearer when you see the deployment in the **Deployments** page:

![](https://files.helpdocs.io/kw8ldg1itf/articles/ih779z9kb6/1598399260632/image.png)### Step 1: Add Commands and Scripts

The default scripts Harness generates will deploy the artifact and app package you add to the Service. No further changes are required.

If you like, you can add commands and scripts using the **Add Command** settings, and by clicking the plus icon in the commands.

![](https://files.helpdocs.io/kw8ldg1itf/articles/ih779z9kb6/1598399287929/image.png)All of the scripts include tooltips to explain how to use them:

![](https://files.helpdocs.io/kw8ldg1itf/articles/ih779z9kb6/1598399301934/image.png)### Review: Download Artifact and Exec Scripts

The Download Artifact script is supported for Amazon S3, Artifactory, SMB (PowerShell-only), SFTP (PowerShell-only), Azure DevOps artifacts, Nexus, Jenkins, and Bamboo. For other artifact sources, add a new command and use the Exec script to download the artifact. For more information, see  [Exec Script](/article/qluiky79j8-service-types-and-artifact-sources#exec_script).

### Review: Harness and Custom Variables

You can use Harness built-in variables in your Service scripts, or add your own variables and reference them in your scripts.

For information on Harness built-in variables, see  [What is a Harness Variable Expression?](/article/9dvxcegm90-variables). For information on using variables in your scripts, see  [Add Service Config Variables](/article/q78p7rpx9u-add-service-level-config-variables) and [Add Service Config Files](/article/iwtoq9lrky-add-service-level-configuration-files).

### See Also

* [Set Default Application Directories as Variables](/article/lgg12f0yry-set-default-application-directories-as-variables)
* [Override Variables at the Infrastructure Definition Level](/article/cc59hfou9c-override-variables-per-infrastructure-definition)

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

