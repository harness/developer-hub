---
title: Execute a Workflow
description: Start using HSF by finding, executing, and approving a workflow in IDP, then verifying its output in the catalog.
sidebar_label: Execute a Workflow
keywords:
  - execute hsf workflow
  - run hsf workflow
  - approve iacm workspace
tags:
  - hsf
  - workflows
sidebar_position: 20
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide walks through executing an HSF workflow end to end, from finding
it in IDP to verifying the output is visible in the catalog.

---

## Before you begin

- You have been added to the **HSF Users** group (or HSF Admins).
- HSF has been deployed and post-deployment configuration is complete.
- You know which workflow you want to run. Go to
  [How workflows work](/docs/harness-solutions-factory/use-hsf/workflows/overview) for the full list of default workflows.

---

## Steps

Complete the following five steps to run a workflow and confirm its output.

### Step 1: Find the workflow in IDP

Workflows are published in the IDP workflows catalog. To locate the one you want to run, do the following:

1. Navigate to **IDP** in your Harness account.
2. Select **Workflows** from the left navigation.
3. Browse or search for the workflow you want to run.

:::tip
If you do not see the workflow you are looking for, it may not be registered
in IDP yet. Ask your HSF Admin to run **Register Custom IDP Templates** to
sync the latest workflows.
:::

### Step 2: Execute the workflow

Submitting the workflow form starts the provisioning pipeline. To submit it, do the following:

1. Click the workflow to open it.
2. Click **Execute**.
3. Fill in the required inputs. Each field has a description explaining what
   it expects; go to the individual workflow reference page for a full
   breakdown of all inputs and valid values.
4. Click **Create** to submit.

### Step 3: Monitor the execution

After submitting, HSF starts the **Create and Manage IACM Workspaces**
pipeline in the background. To monitor progress:

1. After clicking **Create**, select **Show Logs** to see the initial output.
2. Scroll down in the logs panel. You will see a link to the running
   **Create and Manage IACM Workspaces** pipeline. Click it to open the
   pipeline execution view.
3. Monitor the pipeline run. Once it completes, it will automatically
   trigger the **Provision Workspace** pipeline.

### Step 4: Respond to approval requests

At two points during execution, an HSF Admin will receive an email notification
asking them to approve the next step:

1. **Entity creation approval:** review the summary of what will be
   provisioned and approve or reject.
2. **Terraform plan approval:** review the full resource diff and confirm
   the changes are expected before approving.

Approvals are completed directly inside the pipeline execution view in Harness.

:::note
If no approval notification arrives within a few minutes of submission,
check that the HSF Admins group has notification settings configured. Go to
[Post-deployment configuration](/docs/harness-solutions-factory/new-to-hsf/get-started) to review the notification setup.
:::

### Step 5: Verify the output

Once the workflow completes successfully, confirm the following:

- Navigate to **IDP** → **Catalog** and search for the resource that was
  provisioned. The workflow output is automatically registered as a catalog
  entry.
- Navigate to **IaCM** → **Workspaces** and confirm the workspace was created
  in the correct project.

---

## Update an existing resource

You do not need to re-run the workflow from IDP to update a resource. Because
each workflow creates an IaCM workspace, you can update it directly:

1. Navigate to **IaCM** → **Workspaces** and find the workspace for the
   resource you want to update.
2. Under **Variables** → **OpenTofu Variables**, update the relevant variable.
3. Save the variable, then run **Provision Workspace** on the workspace to
   apply the change (this will go through the approval flow again).

---

## Troubleshooting

If a pipeline step fails during workflow execution, start with the execution view:

- **Open the pipeline execution view:** navigate to the pipeline run link
  visible in the IDP execution log, or find it directly under the Solutions
  Factory project in Harness.
- **Check the step logs:** click the failed step to expand its log output.
  Most failures will have a clear error message.

<Troubleshoot
  issue="HSF workflow pipeline fails immediately at start in Harness"
  mode="docs"
  fallback="An account-level OPA policy is most likely blocking execution. Check the policy evaluation output on the failed pipeline and confirm the policy set with your Harness admin."
/>

<Troubleshoot
  issue="HSF approval notification email never arrives after submitting an IDP workflow"
  mode="docs"
  fallback="The HSF Admins group has no notification settings configured. Add a notification channel to the group, then re-run the workflow."
/>

<Troubleshoot
  issue="Image pull failure in an HSF workflow pipeline due to DockerHub rate limiting"
  mode="docs"
  fallback="The DockerHub connector is using anonymous authentication and has been rate limited. Add credentials to the hsf_dockerhub_connector connector."
/>

<Troubleshoot
  issue="IDP catalog entry does not appear after an HSF workflow completes successfully"
  mode="docs"
  fallback="Run the Register Custom IDP Templates workflow to re-sync the catalog, then reload the IDP catalog page."
/>

---

## Next steps

You have executed a workflow and confirmed its output in the catalog. Continue with the following:

- [How workflows work](/docs/harness-solutions-factory/use-hsf/workflows/overview): Review every default HSF workflow and what it provisions.
- [Central Build Farm Workflow](/docs/harness-solutions-factory/use-hsf/workflows/central-build-farm-workflow): Configure the build infrastructure other workflows depend on.
- [Created resources](/docs/harness-solutions-factory/use-hsf/created-resources): Understand what HSF creates across your account.
