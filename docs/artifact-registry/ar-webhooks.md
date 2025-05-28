---
title: Webhooks
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the Artifact Registry in Harness, **Triggers** automate actions based on events related to your artifacts, and allow you to streamline workflows by responding dynamically to changes in your artifact repositories.

## Types of triggers
1. **Artifact Creation**
    - Executes when a new artifact is pushed to the registry.
    - Useful for automating deployments or notifying downstream systems.
2. **Artifact Deletion**
    - Triggers when an artifact version is deleted.
---
A webhook sends a notification to your app when a new artifact is pushed to the registry, and the trigger in your CD build pipeline automatically starts a deployment or build process in response to that notification.
To configure and use a webhook, you need to:

1. Create a webhook in the Artifact Registry.
2. Create a trigger in the CD build pipeline.
3. Configure the trigger to run against the webhook.

<Tabs>
<TabItem value="Add a webhook">
<DocVideo src="https://app.tango.us/app/embed/291ffc6f-26a4-4868-b0a7-946654e13bba" title="Creating a New Webhook in Harness Workspaces" />
</TabItem>
<TabItem value="Artifact source">
<DocVideo src="https://app.tango.us/app/embed/b82ecc59-130a-4c96-a7cb-c96c66d5c890" title="Find artifact source in deployment pipeline" />  
</TabItem>
<TabItem value="Create trigger">
<DocVideo src="https://app.tango.us/app/embed/b7effac1-e800-4567-adcc-d31881787c80" title="Create Trigger to run against your artifact registry webhook in Harness" />
</TabItem>
</Tabs>

## Test your webhook
Test your webhook by [pushing an artifact to the registry](/docs/artifact-registry/manage-artifacts/artifact-management#push-an-artifact).

1. Select your artifact registry.
2. Select **Set up client**.
3. Follow the on-screen instructions to test your webhook.

Once logged in to your registry type, the steps should look like this (using Docker as an example):

```bash
docker tag <IMAGE_NAME>:<TAG> pkg.app.harness.io/<ACCOUNT_ID>/<REGISTRY_NAME>/<IMAGE_NAME>:<TAG>
# e.g. docker tag my-image:latest pkg.app.harness.io/123456/my-registry/demoimg:v1

docker push pkg.app.harness.io/<ACCOUNT_ID>/<REGISTRY_NAME>/<IMAGE_NAME>:<TAG>
# e.g. docker push pkg.app.harness.io/123456/my-registry/demoimg:v1
```

Once you have pushed an artifact to the registry, you can review the trigger and executions in the Artifact Registry.
:::info
As this webhook was created by the trigger, while reviewing it, you cannot edit its configuration.
:::

<DocVideo src="https://app.tango.us/app/embed/7c7bfa7d-7643-4b7a-ace1-ff4f0b3d70f2" title="Review your trigger Webhook configuration and executions in Harness Artifact Registry" />

## Use cases for triggers
- **CI/CD Automation:** Start a pipeline when a new artifact is ingested.
- **Version Control:** Notify teams when a new version of an artifact is available.
- **Security & Compliance:** Scan artifacts when they are pushed or updated.
- **Cleanup & Retention Policies:** Automatically remove outdated artifacts.

## Webhooks and artifact registry triggers
Webhooks allow external systems to interact with Artifact Registry events in real time. Depending on your configuration, webhooks can either notify external systems about artifact-related events or enable external systems to trigger specific actions in Harness.

**Example Use Case:**
- **Outgoing Webhooks:** Notify a monitoring system when a new artifact is ingested or updated, enabling real-time tracking and validation.
- **Incoming Webhooks:** A third-party build system triggers an artifact ingestion event in Harness, automating downstream workflows.

Go to [platform triggers](/docs/platform/triggers/triggers-overview) to find out more about the types of triggers that are at your disposal including webhooks, artifacts, manifests and schedules triggers.