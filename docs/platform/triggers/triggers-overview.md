---
title: Triggers overview
description: An overview of the types of triggers available in Harness.
keywords:
  - triggers
  - webhook trigger
  - artifact trigger
  - manifest trigger
  - scheduled trigger
  - cron trigger
  - event-driven CI/CD
tags:
  - triggers
  - pipelines
sidebar_position: 1
---

Harness uses triggers to automate and streamline deployment workflows. A trigger starts a pipeline execution in response to an event, such as a new artifact or manifest, an external webhook, or a schedule. Triggers give you a versatile, event-driven way to initiate pipelines based on specific events, changes, or conditions.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- Identify the [four trigger types](#types-of-triggers) available in Harness and when to use each.
- [Add a trigger](#add-a-trigger-to-a-pipeline) to a pipeline.
- [View trigger events](#view-trigger-events) for the triggers in a pipeline.

---

## Before you begin

Before you create a trigger, ensure you have the following:

- **Harness pipeline**: An existing pipeline to attach the trigger to. Go to <a href="/docs/category/triggers" target="_blank">Triggers</a> for more information on trigger setup.
- **Pipeline access**: <a href="/docs/platform/role-based-access-control/add-manage-roles#manage-roles-in-harness" target="_blank">Permissions</a> to create and edit triggers on the pipeline.
- **Event source access**: Access to the Git repository, artifact registry, or Helm repository that the trigger listens to.

---

## Types of triggers

Harness supports four trigger types. Select the one that fits your use case:

- **Webhook**: Trigger Harness pipelines in response to Git events that match specific payload conditions you set up in a Harness trigger. Go to [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines) to configure Git event triggers.

    - Trigger Harness pipelines in response to specific Slack events. Go to <a href="/docs/platform/triggers/trigger-pipelines-using-slack-events" target="_blank">Trigger pipelines using Slack events</a> for more information on Slack event triggers.

    - Trigger Harness pipelines in response to events from third-party artifact repositories that match specific payload conditions. Go to <a href="/docs/platform/triggers/trigger-pipelines-using-generic-events" target="_blank">Trigger pipelines using Generic events</a> for more information on generic event triggers.

- **Artifact**: Trigger Harness pipelines in response to a new artifact version being added to a registry. Go to <a href="/docs/platform/triggers/trigger-on-a-new-artifact" target="_blank">Trigger pipelines on a new artifact</a> for more information on artifact triggers.
- **Manifest**: Trigger Harness pipelines in response to a new Helm chart version being added to an HTTP Helm repository. Go to <a href="/docs/platform/triggers/trigger-pipelines-on-new-helm-chart" target="_blank">Trigger pipelines on new Helm chart</a> for more information on manifest triggers.
- **Scheduled**: Schedule Harness pipeline executions using Cron-based triggers. Go to <a href="/docs/platform/triggers/schedule-pipelines-using-cron-triggers" target="_blank">Schedule pipelines using triggers</a> for more information on scheduled triggers.

---

### Webhook triggers

Use a webhook trigger to run a pipeline in response to Git events that match specific payload conditions you set up in a Harness trigger. For example, when a pull request or push event occurs on a Git repo and your trigger settings match the payload conditions, a CI or CD pipeline runs.

Webhook triggers enable event-driven CI/CD and support the practice of every commit building or deploying to a target environment. Role-based access control (RBAC) does not apply to webhook triggers, because the events occur on the repository side.

Harness supports the following source control management (SCM) providers:

- Artifact Registry
- Azure Repos
- Bitbucket
- Custom
- Event Relay
- GitHub
- GitLab
- Harness

---

### Artifact triggers

Use an artifact trigger to run a pipeline automatically when a new version of an artifact is added to a registry. For example, when a new Docker image is uploaded to your Docker Hub account, it can trigger a CD pipeline that automatically deploys the image.

:::note
Currently, this feature is behind the feature flag `CD_TRIGGERS_REFACTOR`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

#### Supported artifact providers for artifact triggers

You can use the following artifact providers to trigger pipelines:

- <a href="/docs/artifact-registry/manage-registries/ar-webhooks" target="_blank">Harness Artifact Registry</a>
- ACR (Azure Container Registry)
- Amazon Machine Image (AMI)
- Amazon S3
- Artifactory
- Azure Artifacts
- Bamboo
- Custom
- Docker Registry
- ECR (Amazon Elastic Container Registry)
- GCE Image (Google Compute Engine Image)
- GCR (Google Container Registry)
- GitHub Package Registry
- Google Artifact Registry
- Google Cloud Storage
- Jenkins
- Nexus2
- Nexus3

Google Container Registry (GCR) is deprecated and was shut down on March 18, 2025. Migrate to Google Artifact Registry (GAR) instead. Go to [Google's official transition documentation](https://cloud.google.com/artifact-registry/docs/transition/transition-from-gcr) to review the migration path, and go to the [Harness GCR documentation](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#google-container-registry-gcr) to review GCR support in Harness.

---

### Manifest triggers

Use a manifest trigger to automate deployments when a new Helm chart version is published. Helm chart triggers listen to the repo where one or more of the Helm charts in your pipeline are hosted. You can set conditions on the triggers, such as matching one or more chart versions.

---

### Scheduled triggers

Use a scheduled trigger to run pipelines at fixed times without a source event. With scheduled triggers, you automate pipeline executions by setting up Cron-based triggers to run pipelines at specific times and intervals, which makes your workflow more efficient and reliable.

---

## Add a trigger to a pipeline

Add a trigger to connect a pipeline to the event that should start it. To add a trigger to a pipeline, do the following:

1. Open your Harness pipeline in Pipeline Studio.
2. Select **Triggers**.
3. Click **+ New Trigger** or **Add New Trigger**. The **Triggers** pane opens.
4. Select the Webhook, Artifact, Manifest, or Scheduled trigger.
5. Complete the required fields for your trigger type. Go to the <a href="/docs/category/triggers" target="_blank">Triggers documentation</a> for more information on setting up each trigger type.

:::note
You can also add Git, Generic, and Slack Webhook trigger for account level, organization level, and project level using:

- **Account Level**:
Account Settings → Account-level Resources → Webhooks → New Webhook

- **Organization Level**:
Organization Resources → Organization-level Resources → Webhooks → New Webhook

- **Project Level**:
Project Settings → Project-level Resources → Webhooks → New Webhook
:::

---

## View trigger events

View trigger events to monitor how and when your triggers fire. You can view trigger events for all triggers created within a pipeline in the **Events** tab.

:::note
Currently, this feature is behind the feature flag `PIPE_TRIGGER_EVENTS_PAGE_UI`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

The **Events** tab provides information on **Event Correlation ID**, **Trigger Status**, **Time**, and **Trigger Name**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-events-page.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

Select the three dots next to each trigger to view additional details, including the **Payload** and **Trigger Details**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-info.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

You can filter triggers based on **Trigger Name**, **Trigger Type**, and **Status**:

- **Trigger Type** includes **All**, **Webhook**, **Artifact**, **Manifest**, and **Scheduled**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-type.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

- **Trigger Status** includes **Success**, **Failed**, and **Skipped**.

<div style={{textAlign: 'center'}}>
   <DocImage path={require('./static/trigger-status.png')} width="80%" height="40%" title="Click to view full size image" />
</div>

---

## Related articles

- <a href="/docs/platform/triggers/triggering-pipelines" target="_blank">Trigger pipelines using Git events</a>
- <a href="/docs/platform/triggers/trigger-on-a-new-artifact" target="_blank">Trigger pipelines on a new artifact</a>
- <a href="/docs/platform/triggers/trigger-pipelines-on-new-helm-chart" target="_blank">Trigger pipelines on new Helm chart</a>
- <a href="/docs/platform/triggers/schedule-pipelines-using-cron-triggers" target="_blank">Schedule pipelines using triggers</a>
