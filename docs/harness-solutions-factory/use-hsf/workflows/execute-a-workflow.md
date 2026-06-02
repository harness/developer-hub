---
title: Execute A Workflow
description: Start using HSF by understanding and executing workflows in IDP.
sidebar_position: 2
---
# Execute a workflow

This guide walks through executing an HSF workflow end to end — from finding
it in IDP to verifying the output is visible in the catalog.

## Before you begin

- You have been added to the **HSF Users** group (or HSF Admins).
- HSF has been deployed and post-deployment configuration is complete.
- You know which workflow you want to run. See
  [How workflows work](../workflows/overview.md) for the full list of default workflows.

## Steps

### 1. Find the workflow in IDP

1. Navigate to **IDP** in your Harness account.
2. Select **Workflows** from the left navigation.
3. Browse or search for the workflow you want to run.

:::tip
If you don't see the workflow you're looking for, it may not be registered in
IDP yet. Ask your HSF Admin to run **Register Custom IDP Templates** to sync
the latest workflows.
:::

### 2. Execute the workflow

1. Click the workflow to open it.
2. Click **Execute**.
3. Fill in the required inputs. Each field has a description explaining what
   it expects — refer to the individual workflow reference page for a full
   breakdown of all inputs and valid values.
4. Click **Create** to submit.

### 3. Monitor the execution

After submitting, HSF starts the **Create and Manage IACM Workspaces**
pipeline in the background. To monitor progress:

1. After clicking **Create**, select **Show Logs** to see the initial output.
2. Scroll down in the logs panel — you'll see a link to the running
   **Create and Manage IACM Workspaces** pipeline. Click it to open the
   pipeline execution view.
3. Monitor the pipeline run. Once it completes, it will automatically
   trigger the **Provision Workspace** pipeline.

### 4. Respond to approval requests

At two points during execution, an HSF Admin will receive an email notification
asking them to approve the next step:

1. **Entity creation approval** — review the summary of what will be
   provisioned and approve or reject.
2. **Terraform plan approval** — review the full resource diff and confirm
   the changes are expected before approving.

Approvals are completed directly inside the pipeline execution view in Harness.

:::note
If no approval notification arrives within a few minutes of submission,
check that the HSF Admins group has notification settings configured. See
[Post-deployment configuration](../../new-to-hsf/get-started.md).
:::

### 5. Verify the output

Once the workflow completes successfully:

- Navigate to **IDP** → **Catalog** and search for the resource that was
  provisioned. The workflow output is automatically registered as a catalog
  entry.
- Navigate to **IaCM** → **Workspaces** and confirm the workspace was created
  in the correct project.

## Making changes to an existing resource

You don't need to re-run the workflow from IDP to update a resource. Because
each workflow creates an IaCM workspace, you can:

1. Navigate to **IaCM** → **Workspaces** and find the workspace for the
   resource you want to update.
2. Under **Variables** → **OpenTofu Variables**, update the relevant variable.
3. Save the variable, then run **Provision Workspace** on the workspace to
   apply the change (this will go through the approval flow again).

## Troubleshoot a failed workflow

If a pipeline step fails during workflow execution:

- **Open the pipeline execution view** — navigate to the pipeline run link
  visible in the IDP execution log or find it directly under the Solutions
  Factory project in Harness.
- **Check the step logs** — click the failed step to expand its log output.
  Most failures will have a clear error message.

Common failure causes:

| Symptom | Likely cause |
|---|---|
| Pipeline fails immediately at start | An account-level OPA policy is blocking execution — check with your Harness admin |
| Approval notification never arrives | HSF Admins group notification settings not configured |
| Image pull failure | DockerHub connector is using anonymous auth and has been rate limited — add credentials to `hsf_dockerhub_connector` |
| IDP catalog entry not appearing after completion | Run **Register Custom IDP Templates** to re-sync |

<!--
## Executing a Workflow 
1. Go to **IDP**, then select **Workflows** to see available workflows or deploy a workflow.

   <DocImage path={require('../static/hsf-execute-workflow-1.png')} title="Click to view full size image" />

2. Click **Execute** and follow the prompts to add in additional configurations. 

   <DocImage path={require('../static/hsf-execute-workflow-2.png')} title="Click to view full size image" />

For this example, we are going to create a new project managed by HSF.

### Debug or monitor workflows
3. Click create to run the workflow, and select **Show Logs** to see the output. 

   <DocImage path={require('../static/hsf-execute-workflow-3.png')} title="Click to view full size image" />

4. Scroll down to see another link that will direct you to the **Create and Manage IACM Workspaces** pipeline that is being run to start the workflow.

   <DocImage path={require('../static/hsf-execute-workflow-4.png')} title="Click to view full size image" />

5. After this pipeline is done, it will kick off the **Execute IACM Workspace** pipeline. 

   <DocImage path={require('../static/hsf-execute-workflow-5.png')} title="Click to view full size image" />

To see the logs, navigate to the running instance of the pipeline and monitor it.

   <DocImage path={require('../static/hsf-execute-workflow-6.png')} title="Click to view full size image" />

## Execution Flow

The below diagram shows how the different components of the HSF work together when provisioning patterns through workflows:

<DocImage path={require('../static/hsf-execute-workflow-7.png')} title="Click to view full size image" />
-->
