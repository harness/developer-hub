---
title: Configure webhooks
description: Set up webhooks for your Harness Code repositories.
sidebar_position: 40
---

You can set up webhooks for your Harness Code repositories. Webhooks can serve a variety of purposes, such as sending notifications or triggering builds.

## Harness triggers and webhooks

In Harness, you can [create triggers](../pipelines/code-triggers.md) to automatically run your CI/CD pipelines in response to Git events in your Harness Code repos. When you create a trigger for a Harness Code repository, a webhook is automatically created in your Harness Code repository.

## Create a webhook

You can create ad hoc webhooks to integrate your repository with other services, such as notification services or third party CI/CD providers.

1. When viewing a repository in Harness Code, go to **Webhooks**, and select **New Webhook**.
2. Enter a webhook **Name** and optional **Description**.
3. Enter your endpoint URL in the **Payload URL**.
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

## Toggle webhooks

You can toggle webhooks on and off.

1. Go to your repository and select **Webhooks**.
2. Use the switch next to each webhook to enable or disable webhooks.

You can also [edit the webhook](#edit-or-delete-a-webhook) and use the **Enabled** setting to enable or disable the webhook.

## Edit or delete a webhook

1. Go to your repository and select **Webhooks**.
2. Locate the webhook that you want to edit or delete, select **More options** (&vellip;), and then select **Edit** or **Delete**.

You can also edit webhooks by selecting them directly on the webhooks list.
