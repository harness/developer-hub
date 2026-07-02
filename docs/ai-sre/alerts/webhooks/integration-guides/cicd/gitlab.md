---
title: GitLab Integration Guide
description: Configure GitLab webhooks to send events to Harness AI SRE.
sidebar_label: GitLab
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure GitLab to Send Webhooks

Configure GitLab project or group webhooks to send event notifications to Harness AI SRE for deployments, pipelines, and security alerts.

## Before you begin

- **Harness webhook endpoint**: Create a GitLab webhook in Harness AI SRE using the [GitLab webhook template](../../templates/cicd/gitlab.md).
- **GitLab permissions**: Maintainer or Owner role for the project/group.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **GitLab webhooks documentation**: Go to [Webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html) for webhook configuration guide.
- **Webhook events reference**: Go to [Webhook Events](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html) for event-specific payload structures.

---

## Create project webhook

### Navigate to webhook settings

<Tabs>
<TabItem value="project" label="Project webhook" default>

1. Go to your GitLab project
2. Click **Settings** → **Webhooks**
3. Expand **Add new webhook**

</TabItem>
<TabItem value="group" label="Group webhook">

1. Go to your GitLab group
2. Click **Settings** → **Webhooks**
3. Click **Add new webhook**

Group webhooks receive events from all projects in the group.

</TabItem>
</Tabs>

### Configure webhook

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

- **URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Secret token**: (Optional) Sent as plain text for token comparison, not cryptographic signature verification
- **Trigger**: Select events to trigger webhook
- **SSL verification**: Enable SSL verification

</TabItem>
<TabItem value="with-secret" label="With secret validation">

- **URL**: Your Harness webhook URL
- **Secret token**: Enter a secure token
  - GitLab sends this in `X-Gitlab-Token` header
  - Harness can verify this header
- **Trigger**: Select events
- **SSL verification**: Enable

</TabItem>
<TabItem value="custom-events" label="Custom event selection">

- **URL**: Your Harness webhook URL
- **Trigger**: Select specific events

Common events for monitoring:
- ☑ Push events
- ☑ Tag push events
- ☑ Merge request events
- ☑ Pipeline events
- ☑ Deployment events
- ☑ Releases events
- ☐ Issues events (optional)
- ☐ Confidential issues events
- ☐ Merge request approval events
- ☐ Job events (optional)

</TabItem>
</Tabs>

### Test webhook

Click **Test** → Select event type → Click **Test** button

GitLab sends a test payload to verify the webhook is reachable.

### Add webhook

Click **Add webhook** to save.

---

## Configure field mapping in Harness

### GitLab webhook payload structure

<Tabs>
<TabItem value="pipeline" label="Pipeline event" default>

```json
{
  "object_kind": "pipeline",
  "object_attributes": {
    "id": 123,
    "ref": "main",
    "tag": false,
    "sha": "abc123def456",
    "before_sha": "def456abc123",
    "source": "push",
    "status": "failed",
    "detailed_status": "failed",
    "stages": ["build", "test", "deploy"],
    "created_at": "2025-07-01 10:30:00 UTC",
    "finished_at": "2025-07-01 10:35:00 UTC",
    "duration": 300,
    "variables": []
  },
  "user": {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "project": {
    "id": 456,
    "name": "my-app",
    "description": "My application",
    "web_url": "https://gitlab.com/mygroup/my-app",
    "path_with_namespace": "mygroup/my-app"
  },
  "commit": {
    "id": "abc123def456",
    "message": "Fix production bug",
    "title": "Fix production bug",
    "timestamp": "2025-07-01T10:30:00Z",
    "url": "https://gitlab.com/mygroup/my-app/-/commit/abc123def456",
    "author": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "builds": [
    {
      "id": 789,
      "stage": "deploy",
      "name": "deploy_production",
      "status": "failed",
      "created_at": "2025-07-01 10:33:00 UTC",
      "started_at": "2025-07-01 10:33:05 UTC",
      "finished_at": "2025-07-01 10:35:00 UTC",
      "when": "on_success",
      "manual": false,
      "allow_failure": false,
      "user": {
        "name": "John Doe",
        "username": "johndoe",
        "email": "john@example.com"
      },
      "runner": null,
      "environment": {
        "name": "production",
        "action": "start"
      }
    }
  ]
}
```

</TabItem>
<TabItem value="deployment" label="Deployment event">

```json
{
  "object_kind": "deployment",
  "status": "failed",
  "status_changed_at": "2025-07-01 10:35:00 UTC",
  "deployment_id": 123,
  "deployable_id": 789,
  "deployable_url": "https://gitlab.com/mygroup/my-app/-/jobs/789",
  "environment": "production",
  "project": {
    "id": 456,
    "name": "my-app",
    "description": "My application",
    "web_url": "https://gitlab.com/mygroup/my-app",
    "path_with_namespace": "mygroup/my-app"
  },
  "short_sha": "abc123d",
  "user": {
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "user_url": "https://gitlab.com/johndoe",
  "commit_url": "https://gitlab.com/mygroup/my-app/-/commit/abc123def456",
  "commit_title": "Fix production bug"
}
```

</TabItem>
<TabItem value="release" label="Release event">

```json
{
  "id": 123,
  "created_at": "2025-07-01T10:30:00Z",
  "description": "Release notes here",
  "name": "v1.2.3",
  "released_at": "2025-07-01T10:30:00Z",
  "tag": "v1.2.3",
  "object_kind": "release",
  "project": {
    "id": 456,
    "name": "my-app",
    "description": "My application",
    "web_url": "https://gitlab.com/mygroup/my-app",
    "path_with_namespace": "mygroup/my-app"
  },
  "url": "https://gitlab.com/mygroup/my-app/-/releases/v1.2.3",
  "action": "create",
  "assets": {
    "count": 4,
    "links": [],
    "sources": []
  },
  "commit": {
    "id": "abc123def456",
    "message": "Release v1.2.3",
    "title": "Release v1.2.3",
    "timestamp": "2025-07-01T10:30:00Z",
    "url": "https://gitlab.com/mygroup/my-app/-/commit/abc123def456",
    "author": {
      "name": "Release Bot",
      "email": "bot@example.com"
    }
  }
}
```

</TabItem>
</Tabs>

### Field mapping by event type

<Tabs>
<TabItem value="pipeline-mapping" label="Pipeline event" default>

```cel
title: "Pipeline " + webhook.object_attributes.status + ": " + webhook.project.path_with_namespace
message: "Pipeline for " + webhook.object_attributes.ref + " " + webhook.object_attributes.status + "\n\n" +
         "Commit: " + webhook.commit.title + "\n" +
         "Author: " + webhook.user.name + "\n" +
         "Duration: " + string(webhook.object_attributes.duration) + "s"

severity: webhook.object_attributes.status == "failed" ? "critical" :
          webhook.object_attributes.status == "canceled" ? "medium" : "info"

source: "gitlab"
link: webhook.project.web_url + "/-/pipelines/" + string(webhook.object_attributes.id)

filter: webhook.object_attributes.status in ["failed", "canceled"]
```

</TabItem>
<TabItem value="deployment-mapping" label="Deployment event">

```cel
title: "Deployment " + webhook.status + " to " + webhook.environment + ": " + webhook.project.path_with_namespace
message: "Deployment to " + webhook.environment + " " + webhook.status + "\n\n" +
         "Commit: " + webhook.commit_title + "\n" +
         "SHA: " + webhook.short_sha + "\n" +
         "User: " + webhook.user.name

severity: webhook.status == "failed" ? "critical" :
          webhook.status == "canceled" ? "medium" : "info"

source: "gitlab"
link: webhook.deployable_url

filter: webhook.status in ["failed", "canceled"] && webhook.environment == "production"
```

</TabItem>
<TabItem value="release-mapping" label="Release event">

```cel
title: "Release " + webhook.tag + ": " + webhook.project.path_with_namespace
message: "New release published: " + webhook.name + "\n\n" + webhook.description
severity: "info"
source: "gitlab"
link: webhook.url
filter: webhook.action == "create"
```

</TabItem>
</Tabs>

---

## Available GitLab webhook headers

| Header | Description | Example |
|--------|-------------|---------|
| `X-Gitlab-Event` | Event type | `Pipeline Hook`, `Deployment Hook`, `Release Hook` |
| `X-Gitlab-Token` | Secret token, sent as plain text (if configured) | (if configured) |
| `X-Gitlab-Instance` | GitLab instance URL | `https://gitlab.com` |
| `webhook-signature` | HMAC-SHA256 signature (if a signing token is configured) | `v1,<base64_signature>` |
| `webhook-id` | Unique message ID used in signature computation | `msg_2wF...` |
| `webhook-timestamp` | Unix timestamp used in signature computation | `1717000000` |

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route GitLab events.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) for advanced filtering.
- Go to [GitLab Template](../../templates/cicd/gitlab.md) for the pre-configured template.

---

## Further reading

### GitLab Official Documentation
- [Webhooks](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html) - Complete guide to GitLab webhook configuration and setup
- [Webhook Events](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html) - Event-specific payload structures (pipeline, deployment, release)
- [Pipeline Events](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html#pipeline-events) - Pipeline webhook payload structure and build details
- [Deployment Events](https://docs.gitlab.com/ee/user/project/integrations/webhook_events.html#deployment-events) - Deployment webhook payload and environment information
