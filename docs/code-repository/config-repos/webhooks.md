---
title: Configure webhooks
description: Set up webhooks for your Harness Code repositories.
sidebar_position: 40
---

You can set up webhooks for your Harness Code repositories. Webhooks can serve a variety of purposes, such as sending notifications or triggering builds.

## Harness triggers and webhooks

In Harness, you can [create triggers](../pipelines/code-triggers.md) to automatically run your CI/CD pipelines in response to push events in your Harness Code repos. You don't need to create a webhook to do this.

## Create a webhook

You can create ad hoc webhooks to integrate your repository with other services, such as notification services or third party CI/CD providers.

1. When viewing a repository in Harness Code, go to **Webhooks**, and select **New Webhook**.
2. Enter a webhook **Name** and optional **Description**.
3. Enter your endpoint URL in the **Payload URL**.
4. You can provide a **Secret** to sign the payload so the server can verify authenticity. If you provide a secret, the webhook call contains an `X-Harness-Signature` header.
5. Specify the events that you want to trigger this webhook.

   * **Send me everything:** All applicable events trigger the webhook. Payloads are sent to your endpoint for all events in this repo.
   * **Let me select individual events:** Select specific events that you want to trigger this webhook. Payloads are sent to your endpoint only when the specified events occur in this repo.

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
