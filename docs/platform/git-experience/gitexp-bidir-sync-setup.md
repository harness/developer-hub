---
title: Set up bidirectional sync for Git Experience
description: learn how to set up and use bidirectional sync for Git Experience.
sidebar_position: 3
canonical_url: https://www.harness.io/blog/git-sync-experience
---

By default, Harness Git Experience syncs unidirectionally, from Harness to your Git repos. You can also have Harness Git Experience sync bidirectionally between Harness and your Git repo.

With bidirectional sync for Git Experience, changes made on either the Git repo or Harness are synced automatically.

This topic explains how to set up and use bidirectional sync.

### Supported Entities

#### Generally Available
- Pipelines
- Templates
- Input Sets
- Services
- Environments
- Infrastructure

## Important notes

- If users make changes on the Harness and Git side at the same time, precedence is given on a first come, first served basis.
- If you make an invalid YAML change to the YAML in the Git repo file an **Invalid YAML Detected** error appears in the Harness UI. You can fix the invalid YAML in Harness or in the Git repo.
- If your Git repo server is on-premise, it must have connectivity to Harness SaaS. 
- Currently, only `.yaml` and `.yml` files are supported for bi-directional sync.
- When configuring a webhook, you need to be the owner of the relevant git repository.
- Bidirectional sync is not supported for Harness Code.
- If a change is made to a Git-backed entity directly in the Git repository with bidirectional sync enabled, it will bypass `On Save` OPA policies. To ensure these entities comply with your OPA policies, define your policies as `On Run` for these entities.

## Bi-directional Sync

GitX supports **bi-directional sync** by capturing changes committed directly to Git using webhook events. With bi-directional sync enabled, Harness treats its own cached copy of Git data as the source of truth, and uses this cached data for all operations—including pipeline execution. 

This ensures fast, consistent execution of remote pipelines based on the latest committed changes received through webhooks.

## Webhook Registration

Harness attempts to register webhooks automatically for GitX resources using the **Git connector** associated with the entity (e.g., pipeline, input set). This removes the need for most manual setup and helps prevent outdated pipeline configurations.

Automatic webhook registration follows these principles:

- Webhooks are registered using the **same connector** that was used to create the entity.
- Registration is performed on a **best-effort basis**:
  - If the connector has sufficient permissions (e.g., `admin:repo_hook` for GitHub), the webhook is created.
  - If not, the operation is skipped, and users can manually register the webhook.
- Harness does **not create duplicate webhooks**:
  - A webhook is only registered if one doesn't already exist for the given entity.
- Webhooks are registered at the **nearest matching scope**:
  - For example, if an entity is created at the **org level**, the webhook is registered at the **org level**.

### Disable Automatic Webhook Registration

By default, Harness attempts to register webhooks automatically for GitX entities using the associated Git connector. If your organization prefers to manage webhook registration externally, you can now disable webhook creation entirely from the Harness platform.


#### Skip Git Webhook Registration Setting

To disable automatic webhook registration:

1. Go to **Account Settings** → **Git Experience Settings**.
2. Enable the **Skip Git Webhook Registration** checkbox.
3. Save your changes.

When this setting is enabled:

- Harness will not attempt to create or validate webhooks in your Git provider.
- When creating Git triggers, you will see a message indicating that webhook registration is skipped.
- You are responsible for manually creating and managing webhooks in your Git system.

This is useful for organizations that:

- Do not allow outbound connections or webhook creation from Harness.
- Use Git systems like GitLab with restricted permissions or intermediaries.
- Need full control over webhook behavior without triggering permission issues.

Here is an example of the message displayed during Git Webhook creation when this setting is enabled.

<div align="center">
  <DocImage path={require('./static/manual-webhook.png')} width="60%" height="60%" title="Manual Webhook Registration" />
</div>

## Manual Webhook Setup for Bi-directional Sync

There are three ways to manually set up a webhook when automatic registration is not preferred or not possible.

### Setup Webhook via Banner Prompt

When an entity is not set up for bidirectional sync (that is, no webhook is registered for the corresponding Git repo or file path), Harness displays a **banner** to simplify webhook registration.

To register a webhook:

1. Click **Setup Webhook** on the banner.
2. Harness automatically registers the webhook using the same Git connector that was used when the entity was created.
3. Upon success, a confirmation message appears.

![](./static/webhook_register_pipelinestudio.png)

:::info Note: 300 File Limit
When using Git Experience with GitHub in bidirectional sync mode, **merging a commit with 300 or more files may cause some files to not sync properly in the GitEx cache**. This is due to GitHub API limitations, which parse up to 300 files between two commits. Customers may see that the webhook payload lists a full list of files, but only 300 will be processed.  

Additionally, such large merges has the potential to increase the possibility of hitting the GitHub API rate limit. This is due to the fact that each commit has three API calls correlated to each file transfer, and if multiple files across multiple pipelines are being committed at the same time, it can increase the possibility of a rate-limit situation.

It is recommended to keep the number of files in a single commit below 300 to ensure consistency and avoid potential rate limit issues.
:::

:::info note
To successfully register a webhook, ensure that the Harness Git connector you use has the necessary credentials. For example, when using GitHub, the GitHub user account must be a repo admin, and the Personal Access Token must include all repo, user, and `admin:repo_hook` scopes.

It is important to note that if you use a banner to set up the webhook, it will use the same connector that was used during the entity creation to create the webhook. Therefore, ensure that the connector has adequate permissions.
:::

![](./static/success_webhook_registered.png)


To view registered webhooks:  
**Project Settings** → **Project-level Resources** → **Webhooks**

![](./static/webhook_register_page.png)

You can also explore [Git Sync Activity](./git-sync-health-page.md) to track webhook events.

### Setup via Webhooks Page

If you want full control over webhook setup or if banner setup was skipped:

#### Choose the Scope
- **Account Level:**  
  `Account Settings → Account-level Resources → Webhooks → New Webhook`
- **Organization Level:**  
  `Organization Resources → Organization-level Resources → Webhooks → New Webhook`
- **Project Level:**  
  `Project Settings → Project-level Resources → Webhooks → New Webhook`

#### Webhook Configuration Steps

1. In **Git Connector**, select or create a [Git Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference).
2. In **Repository**, select the Git repo where your Harness entities are stored.
3. In **Folder Path**, specify the directory (e.g., `.harness/`). This is optional.

   ![Folder Path Example](static/794c4a80c5fb3a9d9c3e290781ce64fa99bd788ea8106f786d1d75776dae164a.png)

:::info
Harness tracks the `.harness` folder by default in all webhooks.
:::

4. Click **Add** to register the webhook.

Once synced, Git events appear in the **Events** tab under **Webhooks**, including event IDs for troubleshooting.

### Sync a Harness entity

For this example, we'll create a new remote pipeline, sync it with the repo, make a change on the Git side, and then see the change on the Harness side.

1. In Harness, in **Pipelines**, select **Create a Pipeline**.
2. In **How do you want to setup your pipeline?**, select **Remote**.
3. Specify the **Git Connector**, **Repository**, and **Git branch** for storing and syncing the pipeline.
4. In **YAML Path**, you can enter the path to a repo folder where, if needed.
5. Select **Start**. The pipeline is created.
6. Add a CD or Custom stage to the pipeline and save it.
7. In your repo, confirm that the YAML file for the pipeline exists.
8. In your repo, open the YAML file for the pipeline and commit a change. For example, add a `description`.
9. Back in Harness, review the pipeline to see the changes.


## Troubleshooting

Harness provides the following troubleshooting features to help you diagnose sync errors:

- **Webhooks** page: In **Account Settings**, **Account Resources**, **Webhooks**, you can select the webhook for your Harness entity sync and view each event on the **Events** tab. For each event, you can select **Payload Details** to see the payload.
- **View Webhook Events**: in the Git information on your Harness entity, you can select **View Webhook Events** and see each event and payload for that entity.
  
  ![picture 2](static/73011f2a1eb78aaef5b0cbe0fc162bdaf451ef49b934020e7e97c3bb4cb0075d.png)  
- You can view the [audit trail](/docs/platform/governance/audit-trail/audit-trail.md) for webhooks that were created, deleted, or when webhook was enabled or disabled.

![](./static/audit_bidir.png)
