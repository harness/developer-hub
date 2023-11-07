---
title: Configure webhooks
description: Use webhooks to automatically trigger pipelines from Git events.
sidebar_position: 20
---

Use webhooks to automatically trigger pipelines when certain Git events occur in your Harness Code repositories.

## Create a webhook

1. When viewing a repository in Harness Code, go to **Webhooks**, and select **New Webhook**.
2. Enter a webhook **Name** and optional **Description**.
3. Enter your endpoint URL in the **Payload URL**. <!-- what is the payload URL? -->
4. If the endpoint requires authentication, provide your [Harness API token](/docs/platform/automation/api/add-and-manage-api-keys) in **Secret**. You can use the same token generated when you [cloned the repo](../work-in-repos/clone-repos.md) or a new API token.
5. Specify the events that you want to trigger this webhook.

   * **Send me everything:** All applicable Git events trigger the webhook. Payloads are sent to your endpoint for all Git events in this repo.
   * **Let me select individual events:** Select specific Git events that you want to trigger this webhook. Payloads are sent to your endpoint only when the specified events occur in this repo.

   Webhook triggering events include:

   * Branch created, updated, or deleted
   * Tag created, updated, or deleted
   * PR created, closed, or reopened
   * PR branch updated
   * PR comment created

6. Select **Enable SSL verification**, if your endpoint supports it.
7. Webhooks are **Enabled** by default. If you don't want this webhook to be enabled yet, deselect **Enabled**.
8. Select **Create Webhook**.

## Create a trigger

After you create a webhook, you can create [triggers](/docs/category/triggers) to automatically run your CI/CD pipelines in response to Git events in your Harness Code repos.

Currently, Harness Code webhook triggers must be configured in the YAML editor.

1. Go to the pipeline where you want to add a trigger for a Harness Code webhook.
2. Select **Triggers** in the Pipeline Studio header.
3. Switch to the YAML editor, and use the following template to configure the trigger, and then save the trigger.

```yaml
   trigger:
  name: CodePushTrigger ## Provide a trigger name.
  identifier: CodePushTrigger ## Provide an ID based on the name.
  enabled: true ## Set to 'false' to turn off the trigger.
  description: ""
  tags: {}
  orgIdentifier: default ## Leave as default or specify an org.
  stagesToExecute: []
  projectIdentifier: YOUR_HARNESS_PROJECT_ID ## Specify the project associated with your Harness Code repo.
  pipelineIdentifier: YOUR_PIPELINE_ID ## Specify the pipeline associated with this trigger.
  source:
    type: Webhook
    spec:
      type: Harness
      spec:
        type: Push
        spec:
          connectorRef: ""
          autoAbortPreviousExecutions: true
          payloadConditions: []
          headerConditions: []
          repoName: YOUR_HARNESS_CODE_REPO_NAME ## Specify your Harness Code repository name.
          actions: []
  inputYaml: |
    pipeline:
      identifier: YOUR_PIPELINE_ID ## Specify the pipeline associated with this trigger.
      properties:
        ci:
          codebase:
            build:
              type: branch
              spec:
                branch: <+trigger.branch>
```

## Toggle webhooks

You can toggle webhooks on and off.

1. Go to your repository and select **Webhooks**.
2. Use the switch next to each webhook to enable or disable webhooks.

You can also [edit the webhook](#edit-or-delete-a-webhook) and use the **Enabled** setting to enable or disable the webhook.

## Edit or delete a webhook

1. Go to your repository and select **Webhooks**.
2. Locate the webhook that you want to edit or delete, select **More options** (&vellip;), and then select **Edit** or **Delete**.

You can also edit webhooks by selecting them directly on the webhooks list.
