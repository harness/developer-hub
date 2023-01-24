---
title: Trigger Deployments when Pipelines Complete
description: You can trigger Harness Workflow and Pipeline deployments when specific Harness Pipelines complete their deployments. For example, you might create a Pipeline to test a deployment in one environment.…
sidebar_position: 30
helpdocs_topic_id: nihs2y2z61
helpdocs_category_id: weyg86m5qp
helpdocs_is_private: false
helpdocs_is_published: true
---

You can trigger Harness Workflow and Pipeline deployments when specific Harness Pipelines complete their deployments.

For example, you might create a Pipeline to test a deployment in one environment. When it completes its deployment, a Trigger executes a second Pipeline to deploy to your stage environment.

### Before You Begin

* [Add a Service](../setup-services/service-configuration.md)
* [Workflows](../workflows/workflow-configuration.md)
* [Add Environment](../environments/environment-configuration.md)
* [Create a Pipeline](../pipelines/pipeline-configuration.md)

### Supported Platforms and Technologies

See  [Supported Platforms and Technologies](https://docs.harness.io/article/220d0ojx5y-supported-platforms).

### Step 1: Add a Trigger

Typically, Triggers are set up after you have successfully deployed and tested a Workflow or Pipeline.

To add a trigger, do the following:

1. Ensure that you have a Harness Service, Environment, and Workflow set up. If you want to Trigger a Pipeline, you'll need one set up also.
2. In your Harness Application, click **Triggers**.
3. Click **Add Trigger**. The **Trigger** settings appear.
4. In **Name**, enter a name for the Trigger. This name will appear in the **Deployments** page to indicate the Trigger that initiated a deployment.
5. Click **Next**.

### Step 2: Select the Pipeline the Initiates this Trigger

1. In **Condition**, select **On New Pipeline**.
2. In **Pipeline**, select the Pipeline that will initiate this Trigger when the Pipeline completes its deployment.
3. Click **Next**.

### Step 3: Select the Workflow or Pipeline to Deploy

1. In **Execution Type**, select **Workflow** or **Pipeline**.
2. In **Execute Workflow**/**Pipeline**, select the Workflow or Pipeline to deploy.

### Step 4: Provide Values for Workflow Variables

If the Workflow or Pipeline you selected to deploy uses Workflow variables, you will need to provide values for these variables.

You can also use variable expressions for these values. See [Passing Variables into Workflows from Triggers](../expressions/passing-variable-into-workflows.md).

### Step 5: Select the Artifact to Deploy

Since Workflows deploy Harness Services, you are also prompted to provide the Artifact Source for the Service(s) the Workflow(s) will deploy.

There are three main settings:

#### From Triggering Artifact Source

Select this option to use the artifact identified in Artifact Source you selected in **Condition**.

#### Last Collected

Select this option to use the last artifact collected by Harness in the Harness Service. Artifact metadata is collected automatically every minute by Harness.

You can also manually collect artifact metadata using the Service's **Manually pull artifact** feature.

#### Last Successfully Deployed

The last artifact that was deployed by the Workflow you select.

### Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

### Related Topics

* [Passing Variables into Workflows from Triggers](../expressions/passing-variable-into-workflows.md)
* For information on using Triggers as part of Harness Git integration, see [Onboard Teams Using Git](../../harness-git-based/onboard-teams-using-git-ops.md).
* [Trigger Deployments When a New Artifact is Added to a Repo](trigger-a-deployment-on-new-artifact.md)
* [Schedule Deployments using Triggers](trigger-a-deployment-on-a-time-schedule.md)
* [Trigger Deployments using Git Events](trigger-a-deployment-on-git-event.md)
* [Trigger a Deployment using cURL](trigger-a-deployment-using-c-url.md)
* [Trigger a Deployment when a File Changes](trigger-a-deployment-when-a-file-changes.md)
* [Get Deployment Status using REST](get-deployment-status-using-rest.md)
* [Pause All Triggers using Deployment Freeze](freeze-triggers.md)

