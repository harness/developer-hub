---
description: KB - Trigger Deployments when Pipelines Complete
title: Trigger Deployments when Pipelines Complete in NextGen
---

# Introduction

You can trigger Harness Pipeline deployments when specific Harness Pipelines complete their deployments.

For example, you might create a Pipeline to test a deployment in one environment. When it completes its deployment, a Trigger executes a second Pipeline to deploy to your stage environment.

## Problem Statement

How can I trigger deployments or a pipeline after the completion of another pipeline, similar to the current generation feature "Trigger Deployments when Pipelines Complete"? https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/triggers/trigger-a-deployment-on-pipeline-completion

## Resolution

The solution involves automating the triggering of a pipeline upon the successful completion of another pipeline by using custom triggers and webhooks. Here's a breakdown:

### 1. **Create a Custom Trigger in the Target Pipeline:**
   - **Target Pipeline:** This is the pipeline that you want to start automatically after the completion of another pipeline (the source pipeline).
   - **Custom Trigger:** A custom trigger is set up in the target pipeline, which listens for specific events (like a webhook call) to start the pipeline. This trigger can be configured to start the pipeline when it receives a specific request or notification.
   - **Custom Webhook Trigger** https://developer.harness.io/docs/platform/triggers/custom-trigger-passing-data

### 2. **Add a Webhook Notification in the Source Pipeline:**
   - **Source Pipeline:** This is the pipeline that, once it finishes, should trigger the target pipeline.
   - **Webhook Notification:** A webhook is a way for an application to send real-time data to other applications. In this case, when the source pipeline finishes, it sends a webhook notification.
   - **Passing the Custom Trigger URL:** The webhook notification includes the URL of the custom trigger created in the target pipeline. This URL is the endpoint that the webhook will hit to trigger the target pipeline.
   - **Passing Token (if mandatory):** Some systems require authentication for security reasons. If the custom trigger requires authentication, you would pass a token as part of the request header in the webhook. This token is often stored as a secret to keep it secure.
   - **Webhook Notifications:** https://developer.harness.io/docs/platform/notifications/notification-settings/#configure-pipeline-notifications

### **Workflow Summary:**
1. **Setup the Custom Trigger:** In the target pipeline, create a custom trigger that listens for a webhook event.
2. **Configure the Source Pipeline:** Add a webhook notification to the source pipeline that will be triggered upon its completion.
3. **Trigger the Target Pipeline:** When the source pipeline finishes, it sends a webhook request to the custom trigger URL of the target pipeline. If required, it includes a secret token for authentication.
4. **Target Pipeline Starts:** The target pipeline starts executing based on the custom trigger's configuration.

This setup ensures that the target pipeline automatically runs after the successful completion of the source pipeline, creating a seamless automation flow between the two pipelines.