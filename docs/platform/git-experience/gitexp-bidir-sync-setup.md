---
title: Set up bidirectional sync for Git Experience
description: learn how to set up and use bidirectional sync for Git Experience.
sidebar_position: 3
---

:::note

Currently, Bi-Directional sync is behind the feature flag `PIE_GIT_BI_DIRECTIONAL_SYNC`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

By default, Harness Git Experience syncs unidirectionally, from Harness to your Git repos. Enable this setting to have Git Experience sync two-way (bidirectionally) between Harness and your Git repo.

Changes made on either the Git repo or Harness are synched automatically.

This topic explains how to set up and use bidirectional sync.

## Important notes

Please review the following important notes:

- Phase 1 of the bi-directional sync feature applies to Harness pipelines, templates, and input sets. Phase 2 of this feature will include Harness services and environments.
- If users make changes on the Harness and Git side at the same time, precedence is given on a first come, first served basis.
- Customers using the current unidirectional sync (Harness --> Git) functionality can migrate to bi-directional sync using the steps in this topic. The process involves enabling an account-level setting. 
- If you make an invalid YAML change to the YAML in the Git repo file, Harness will not accept the invalid YAML during sync. An **Invalid YAML Detected** error appears. You can fix the invalid YAML in Harness and save the entity.
- If your Git repo server is on-premise, it must have connectivity to Harness SaaS. 


## Configure bi-directional sync

To set up bi-directional sync, do the following:

1. In your Harness account, go to **Account Settings**, select **Account Resources**, and then select **Default Settings**.
2. Expand **Git Experience**, and then enable the **Enable Bi-Directional Sync** setting.
   
   <docimage path={require('./static/ecce92a26a5f4f2e902240c10010066d329b54bc0a3515b58a1e5f2d1e8c9b6c.png')} width="60%" height="60%" title="Click to view full size image" />  
3. Select **Save**.

### Create the webhook

When you create the webhook in Harness, it is automatically registered in your repo. For webhook registration, ensure that Harness Git connector you use in the steps below has the necessary credentials. For example, for GitHub, ensure that you use a GitHub user account that is a repo admin and that the Personal Access Token includes all repo, user, and `admin:repo_hook` options for scopes.

You will need a webhook to your repo to use bi-directional sync:

1. In Harness, go back to **Account Resources**. You will see a new option named **Webhooks**.
2. Select **Webhooks**, and then select **New Webhook**.
3. In **Git Connector**, select or create a [Harness Git Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference) for your repo.
4. In **Repository**, select the repo where you are going to store the Harness entities, such as pipelines.
5. In **Folder Path**, enter the path to the location in the repo that stores your Harness entities. Typically, the path starts with `.harness` and is followed by subfolders.
   
   ![picture 1](static/794c4a80c5fb3a9d9c3e290781ce64fa99bd788ea8106f786d1d75776dae164a.png)  

   The **Folder Path** setting is optional. If you omit a folder path, Harness will sync everything in the repo.

6. Select **Add**. The webhook is added. You can navigate to your repo webhook settings to see the new webhook.

In the **Webhooks** page, you can see the **Events** tab. Once you have synched an entity with the Git repo, the Git events are displayed here. You can view Git event Ids for troubleshooting.

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


