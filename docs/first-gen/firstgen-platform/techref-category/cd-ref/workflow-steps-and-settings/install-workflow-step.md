---
title: Install Workflow Step
description: The Install step runs the command scripts in your Harness SSH and IIS Services on the target host. In this topic --  Summary. Not Seeing the Install Step in a Workflow?. Name. Command. Timeout. Related…
# sidebar_position: 2
helpdocs_topic_id: 2q8vjxdjcq
helpdocs_category_id: idvvqrrfr9
helpdocs_is_private: false
helpdocs_is_published: true
---

The Install step runs the command scripts in your Harness SSH and IIS Services on the target host.

In this topic:

* [Summary](#summary)
* [Not Seeing the Install Step in a Workflow?](#not_seeing_the_install_step_in_a_workflow)
* [Name](#name)
* [Command](#command)
* [Timeout](#timeout)
* [Related Reference Material](#related_reference_material)

### Summary

The Install step is added in the Basic Workflow as part of its **Deploy Service** section.

The Install step is used after the [Select Nodes step](/article/9h1cqaxyp9-select-nodes-workflow-step), which select the target nodes on which to run the Install step.

The following image shows the Install step in the deployed Workflow and its corresponding Service commands and scripts.

![](https://files.helpdocs.io/kw8ldg1itf/articles/2q8vjxdjcq/1598378385484/image.png)### Not Seeing the Install Step in a Workflow?

Install commands are added in a Harness SSH Service, and then used in a Harness Workflow that uses the Service.

When you create the SSH Service, you select an **Artifact Type**. For all of the non-Docker artifact types (ZIP, TAR, etc), the **Install** command is added to the Service automatically.

When that Service is used by a Workflow, the **Install** Workflow step is added automatically.

#### SSH Service with Docker Image Artifact Type

For SSH Services using the **Docker Image** artifact type, the Install command is not added. Consequently, there will be no Install step available in the Workflow using that Service.

To overcome this limitation, in the SSH Service using the Docker Image artifact type, click **Add Command**, and then select **Install** in **Command Type**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/2q8vjxdjcq/1612914919416/image.png)Next, in the **Install** command you just added to the Service, click **Add**, and select a Docker script.

![](https://files.helpdocs.io/kw8ldg1itf/articles/2q8vjxdjcq/1612915009687/image.png)Now, when you use this Service to a Workflow, the **Install** step is added to the Workflow.

### Name

The default name is Install.

### Command

This setting cannot be edited.

### Timeout

You can use:

* `**w**`  for weeks
* `**d**`  for days
* `**h**`  for hours
* `**m**`  for minutes
* `**s**`  for seconds
* `**ms**` for milliseconds

### Related Reference Material

* [Select Nodes Workflow Step](/article/9h1cqaxyp9-select-nodes-workflow-step)

