---
title: Schedule Deployments using Triggers
description: You can trigger Harness Workflow and Pipeline deployments on a time schedule. You can select how often to execute the Trigger by hour, days, etc. All the cron jobs are executed in Universal Time Coor…
sidebar_position: 40
helpdocs_topic_id: tb66fmh4iz
helpdocs_category_id: weyg86m5qp
helpdocs_is_private: false
helpdocs_is_published: true
---

You can trigger Harness Workflow and Pipeline deployments on a time schedule. You can select how often to execute the Trigger by hour, days, etc.

All the cron jobs are executed in Universal Time Coordinated (UTC). You can also apply the time condition to new artifacts only.

## Before You Begin

* [Add a Service](../setup-services/service-configuration.md)
* [Workflows](../workflows/workflow-configuration.md)
* [Add Environment](../environments/environment-configuration.md)
* [Create a Pipeline](../pipelines/pipeline-configuration.md)


:::note 
On Time Schedule Triggers must be equal to or greater than 5 minutes. This includes CRON expressions. If the CRON expression uses a schedule less than 5 minutes, you will see a warning such as:  
`Deployments must be triggered at intervals greater than or equal to 5 minutes.`
:::

## Step 1: Add a Trigger

Typically, Triggers are set up after you have successfully deployed and tested a Workflow or Pipeline.

To add a trigger, do the following:

1. Ensure that you have a Harness Service, Environment, and Workflow set up. If you want to Trigger a Pipeline, you'll need one set up also.
2. In your Harness Application, click **Triggers**.
3. Click **Add Trigger**. The **Trigger** settings appear.
4. In **Name**, enter a name for the Trigger. This name will appear in the **Deployments** page to indicate the Trigger that initiated a deployment.
5. Click **Next**.

## Step 2: Schedule Trigger Execution

You set the schedule for the Trigger using a quartz expression. The Harness Manager uses the schedule you set to execute the Trigger. The Universal Time Coordinated (UTC) time zone is used.

1. In **Condition**, select **On Time Schedule**.
2. In **Trigger Every**, select the schedule.
3. Click **Next**.

If you select **Custom CRON Expression**, the time format must be a cron **quartz** expression.

Harness implicitly adds a prefix for seconds so it does not have to be specified explicitly.

For example, to execute the Trigger every 12 hours, the quartz expression would be `0 0 0/12 ? * * *`, but you would enter `0 0/12 ? * * *` because Harness adds the `0` prefix.

Let's look at another example. If you want to invoke a trigger at a certain time, say at **03:10 at 4 day at February month at 2022 year UTC**, then you can provide custom CRON expression as **10 3 4 FEB ? 2022.**

Harness does not support seconds-level granularity in cron expressions when firing Triggers.For a quartz expression calculator and examples, see  [Cron Expression Generator & Explainer](https://www.freeformatter.com/cron-expression-generator-quartz.html).

### Option: On New Artifact Only

If you want the scheduled Trigger to execute with a new artifact, select **On New Artifact Only**.

If you enable this setting, the Trigger will continue to be executed on schedule, and it will use the last artifact collected when it runs.

There must be at least one successful deployment with the specific artifact for it to be qualified as the new artifact for the Trigger. Then, Harness checks every new artifact against the last deployed artifact.

If the last artifact failed to deploy, Harness will use the last successfully deployed artifact.

Artifact metadata is collected automatically every minute by Harness.

You can also manually collect artifact metadata using the Service's **Manually pull artifact** feature.

## Step 3: Select the Workflow or Pipeline to Deploy

1. In **Execution Type**, select **Workflow** or **Pipeline**.
2. In **Execute Workflow**/**Pipeline**, select the Workflow or Pipeline to deploy.

## Step 4: Provide Values for Workflow Variables

If the Workflow or Pipeline you selected to deploy uses Workflow variables, you will need to provide values for these variables.

You can also use variable expressions for these values. See [Passing Variables into Workflows from Triggers](../expressions/passing-variable-into-workflows.md).

## Step 5: Select the Artifact to Deploy

Since Workflows deploy Harness Services, you are also prompted to provide the Artifact Source for the Service(s) the Workflow(s) will deploy.

### Last Collected

Select this option to use the last artifact collected by Harness in the Harness Service. Artifact metadata is collected automatically every minute by Harness.

You can also manually collect artifact metadata using the Service's **Manually pull artifact** feature.

### Last Successfully Deployed

The last artifact that was deployed by the Workflow you select.

## Configure As Code

To see how to configure the settings in this topic using YAML, configure the settings in the UI first, and then click the **YAML** editor button.

## Related Topics

* [Passing Variables into Workflows from Triggers](../expressions/passing-variable-into-workflows.md)
* For information on using Triggers as part of Harness Git integration, see [Onboard Teams Using Git](../../harness-git-based/onboard-teams-using-git-ops.md).
* [Trigger Deployments When a New Artifact is Added to a Repo](trigger-a-deployment-on-new-artifact.md)
* [Trigger Deployments when Pipelines Complete](trigger-a-deployment-on-pipeline-completion.md)
* [Trigger Deployments using Git Events](trigger-a-deployment-on-git-event.md)
* [Trigger a Deployment using cURL](trigger-a-deployment-using-c-url.md)
* [Trigger a Deployment when a File Changes](trigger-a-deployment-when-a-file-changes.md)
* [Get Deployment Status using REST](get-deployment-status-using-rest.md)
* [Pause All Triggers using Deployment Freeze](freeze-triggers.md)

