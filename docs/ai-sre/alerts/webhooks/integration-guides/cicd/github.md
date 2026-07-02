---
title: GitHub Integration Guide
description: Configure GitHub repository webhooks to send events to Harness AI SRE.
sidebar_label: GitHub
sidebar_position: 8
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure GitHub to Send Webhooks

Configure GitHub repository webhooks to send event notifications to Harness AI SRE for deployments, releases, and security alerts.

## Before you begin

- **Harness webhook endpoint**: Create a GitHub webhook in Harness AI SRE using the [GitHub webhook template](../../templates/cicd/github.md).
- **GitHub permissions**: Admin access to the repository or organization.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **GitHub webhooks documentation**: Go to [Webhooks Documentation](https://docs.github.com/webhooks) to understand webhook configuration and event types.
- **Event payloads reference**: Go to [Webhook Events and Payloads](https://docs.github.com/webhooks/webhook-events-and-payloads) for event-specific payload structures.

---

## Create repository webhook

### Navigate to webhook settings

<Tabs>
<TabItem value="repo" label="Repository webhook" default>

1. Go to your GitHub repository
2. Click **Settings** → **Webhooks**
3. Click **Add webhook**

</TabItem>
<TabItem value="org" label="Organization webhook">

1. Go to your GitHub organization
2. Click **Settings** → **Webhooks**
3. Click **Add webhook**

Organization webhooks receive events from all repositories in the organization.

</TabItem>
</Tabs>

### Configure webhook

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

- **Payload URL**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Content type**: `application/json`
- **Secret**: (Optional) Webhook secret for signature verification
- **SSL verification**: Enable SSL verification
- **Which events**: Select events to trigger webhook

</TabItem>
<TabItem value="with-secret" label="With secret validation">

- **Payload URL**: Your Harness webhook URL
- **Content type**: `application/json`
- **Secret**: Enter a secure secret
  - GitHub signs payloads with HMAC-SHA256
  - Harness can verify the `X-Hub-Signature-256` header
- **SSL verification**: Enable SSL verification
- **Which events**: Select events

**Note**: Store the secret securely and configure it in your Harness webhook validation settings.

</TabItem>
<TabItem value="custom-events" label="Custom event selection">

- **Payload URL**: Your Harness webhook URL
- **Content type**: `application/json`
- **Which events**: Select **Let me select individual events**

Common events for monitoring:
- ☑ Deployments
- ☑ Deployment statuses
- ☑ Releases
- ☑ Pull requests
- ☑ Pull request reviews
- ☑ Issues
- ☑ Issue comments
- ☑ Security and analysis (code scanning alerts, secret scanning alerts)
- ☑ Workflow runs

</TabItem>
</Tabs>

### Activate webhook

- Check **Active** to enable the webhook
- Click **Add webhook**

---

## Select events to monitor

### Deployment events

Monitor deployment activities:

**Events**:
- **Deployments**: Deployment created
- **Deployment statuses**: Deployment status changed (pending, success, failure, error)

**Use cases**:
- Track deployment failures
- Alert on production deployments
- Monitor deployment rollbacks

### Release events

Monitor software releases:

**Events**:
- **Releases**: Release published, created, edited, deleted

**Use cases**:
- Notify on new releases
- Track release cadence
- Monitor hotfix releases

### Pull request events

Monitor code changes:

**Events**:
- **Pull requests**: Opened, closed, merged, reopened
- **Pull request reviews**: Submitted, edited, dismissed
- **Pull request review comments**: Created, edited, deleted

**Use cases**:
- Track deployment-related PRs
- Monitor high-impact changes
- Alert on emergency merges

### Security events

Monitor security findings:

**Events**:
- **Code scanning alerts**: Created, fixed, dismissed, reopened
- **Secret scanning alerts**: Created, resolved, reopened
- **Dependabot alerts**: Created, dismissed, fixed, reintroduced

**Use cases**:
- Alert on critical security vulnerabilities
- Track secret leaks
- Monitor dependency vulnerabilities

---

## Configure field mapping in Harness

In your Harness webhook configuration, map GitHub payload fields to alert properties.

### GitHub webhook payload structure

Payload varies by event type. Common structure:

<Tabs>
<TabItem value="deployment" label="Deployment status" default>

```json
{
  "action": "created",
  "deployment_status": {
    "id": 123,
    "state": "failure",
    "description": "Deployment failed",
    "environment": "production",
    "target_url": "https://example.com/deployment/123",
    "created_at": "2025-07-01T10:30:00Z",
    "updated_at": "2025-07-01T10:35:00Z"
  },
  "deployment": {
    "id": 456,
    "sha": "abc123def456",
    "ref": "main",
    "task": "deploy",
    "payload": {},
    "environment": "production",
    "description": "Deploy to production",
    "creator": {
      "login": "deployer"
    }
  },
  "repository": {
    "name": "my-app",
    "full_name": "myorg/my-app",
    "html_url": "https://github.com/myorg/my-app"
  },
  "sender": {
    "login": "github-actions[bot]"
  }
}
```

</TabItem>
<TabItem value="release" label="Release">

```json
{
  "action": "published",
  "release": {
    "id": 789,
    "tag_name": "v1.2.3",
    "name": "Release v1.2.3",
    "body": "Release notes here",
    "draft": false,
    "prerelease": false,
    "created_at": "2025-07-01T10:00:00Z",
    "published_at": "2025-07-01T10:30:00Z",
    "html_url": "https://github.com/myorg/my-app/releases/tag/v1.2.3"
  },
  "repository": {
    "name": "my-app",
    "full_name": "myorg/my-app",
    "html_url": "https://github.com/myorg/my-app"
  },
  "sender": {
    "login": "release-bot"
  }
}
```

</TabItem>
<TabItem value="security" label="Code scanning alert">

```json
{
  "action": "created",
  "alert": {
    "number": 42,
    "created_at": "2025-07-01T10:30:00Z",
    "url": "https://api.github.com/repos/myorg/my-app/code-scanning/alerts/42",
    "html_url": "https://github.com/myorg/my-app/security/code-scanning/42",
    "state": "open",
    "dismissed_by": null,
    "dismissed_at": null,
    "dismissed_reason": null,
    "rule": {
      "id": "sql-injection",
      "severity": "error",
      "description": "SQL injection vulnerability",
      "name": "SQL injection"
    },
    "tool": {
      "name": "CodeQL",
      "version": "2.7.6"
    },
    "most_recent_instance": {
      "ref": "refs/heads/main",
      "analysis_key": ".github/workflows/codeql.yml:analyze",
      "category": ".github/workflows/codeql.yml:analyze/language:javascript",
      "environment": "",
      "state": "open",
      "location": {
        "path": "src/database.js",
        "start_line": 42,
        "end_line": 42
      }
    }
  },
  "repository": {
    "name": "my-app",
    "full_name": "myorg/my-app",
    "html_url": "https://github.com/myorg/my-app"
  },
  "sender": {
    "login": "security-bot"
  }
}
```

</TabItem>
</Tabs>

### Field mapping by event type

<Tabs>
<TabItem value="deployment-mapping" label="Deployment status" default>

**Basic mapping**:
```yaml
title: "Deployment {{webhook.deployment_status.state}}: {{webhook.repository.full_name}}"
message: |
  Deployment to {{webhook.deployment_status.environment}} {{webhook.deployment_status.state}}
  
  Description: {{webhook.deployment_status.description}}
  SHA: {{webhook.deployment.sha}}
  Ref: {{webhook.deployment.ref}}
  
  View: {{webhook.deployment_status.target_url}}
severity: "{{webhook.deployment_status.state}}"
source: "github"
link: "{{webhook.deployment_status.target_url}}"
tags:
  - "repository:{{webhook.repository.full_name}}"
  - "environment:{{webhook.deployment_status.environment}}"
  - "state:{{webhook.deployment_status.state}}"
  - "ref:{{webhook.deployment.ref}}"
```

**CEL mapping**:
```cel
title: "Deployment " + webhook.deployment_status.state + ": " + webhook.repository.full_name
message: "Deployment to " + webhook.deployment_status.environment + " " + 
         webhook.deployment_status.state + "\n\n" +
         webhook.deployment_status.description

// Map deployment state to severity
severity: webhook.deployment_status.state == "failure" ? "critical" :
          webhook.deployment_status.state == "error" ? "high" :
          webhook.deployment_status.state == "pending" ? "info" : "info"

source: "github"
link: webhook.deployment_status.target_url

// Filter: only failures and errors
filter: webhook.deployment_status.state in ["failure", "error"]
```

</TabItem>
<TabItem value="release-mapping" label="Release">

**Basic mapping**:
```yaml
title: "Release {{webhook.release.tag_name}}: {{webhook.repository.full_name}}"
message: |
  New release published: {{webhook.release.name}}
  
  {{webhook.release.body}}
  
  View: {{webhook.release.html_url}}
severity: "info"
source: "github"
link: "{{webhook.release.html_url}}"
tags:
  - "repository:{{webhook.repository.full_name}}"
  - "tag:{{webhook.release.tag_name}}"
  - "prerelease:{{webhook.release.prerelease}}"
```

**CEL mapping**:
```cel
title: "Release " + webhook.release.tag_name + ": " + webhook.repository.full_name
message: "New release published: " + webhook.release.name + "\n\n" + webhook.release.body
severity: webhook.release.prerelease ? "medium" : "info"
source: "github"
link: webhook.release.html_url

// Filter: only production releases (not prereleases or drafts)
filter: !webhook.release.prerelease && !webhook.release.draft
```

</TabItem>
<TabItem value="security-mapping" label="Code scanning alert">

**Basic mapping**:
```yaml
title: "Security Alert: {{webhook.alert.rule.name}} in {{webhook.repository.full_name}}"
message: |
  Code scanning alert: {{webhook.alert.rule.description}}
  
  Severity: {{webhook.alert.rule.severity}}
  Tool: {{webhook.alert.tool.name}}
  File: {{webhook.alert.most_recent_instance.location.path}}:{{webhook.alert.most_recent_instance.location.start_line}}
  
  View: {{webhook.alert.html_url}}
severity: "{{webhook.alert.rule.severity}}"
source: "github"
link: "{{webhook.alert.html_url}}"
tags:
  - "repository:{{webhook.repository.full_name}}"
  - "rule:{{webhook.alert.rule.id}}"
  - "tool:{{webhook.alert.tool.name}}"
  - "file:{{webhook.alert.most_recent_instance.location.path}}"
```

**CEL mapping**:
```cel
title: "Security: " + webhook.alert.rule.name + " in " + webhook.repository.full_name
message: webhook.alert.rule.description + "\n\n" +
         "File: " + webhook.alert.most_recent_instance.location.path + ":" + 
         string(webhook.alert.most_recent_instance.location.start_line) + "\n" +
         "Tool: " + webhook.alert.tool.name + " " + webhook.alert.tool.version

// Map GitHub severity to Harness severity
severity: webhook.alert.rule.severity == "error" ? "critical" :
          webhook.alert.rule.severity == "warning" ? "high" :
          webhook.alert.rule.severity == "note" ? "medium" : "low"

source: "github"
link: webhook.alert.html_url

// Filter: only critical and high severity
filter: webhook.alert.rule.severity in ["error", "warning"] && 
        webhook.alert.state == "open"
```

</TabItem>
</Tabs>

---

## Test the integration

### Test with webhook delivery

1. Go to **Settings** → **Webhooks** in your repository
2. Click on your webhook
3. Go to **Recent Deliveries** tab
4. Click **Redeliver** on any past delivery to test

### Trigger real events

<Tabs>
<TabItem value="test-deployment" label="Test deployment" default>

Create a test deployment using GitHub API:

```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/OWNER/REPO/deployments \
  -d '{
    "ref": "main",
    "environment": "staging",
    "description": "Test deployment for Harness integration"
  }'
```

</TabItem>
<TabItem value="test-release" label="Test release">

Create a test release:

1. Go to **Releases** in your repository
2. Click **Draft a new release**
3. Enter tag version (e.g., `v0.0.1-test`)
4. Enter release title and notes
5. Check **This is a pre-release**
6. Click **Publish release**

</TabItem>
</Tabs>

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the event appears
3. Verify field mapping is correct

---

## Available GitHub webhook headers

GitHub sends these headers with all webhooks:

| Header | Description | Example |
|--------|-------------|---------|
| `X-GitHub-Event` | Event type | `deployment_status`, `release`, `code_scanning_alert` |
| `X-GitHub-Delivery` | Unique delivery ID | `12345678-1234-1234-1234-123456789012` |
| `X-Hub-Signature-256` | HMAC-SHA256 signature | `sha256=...` (if secret configured) |
| `X-GitHub-Hook-ID` | Webhook configuration ID | `123456` |
| `X-GitHub-Hook-Installation-Target-ID` | Installation/org ID | `456789` |
| `X-GitHub-Hook-Installation-Target-Type` | Target type | `repository`, `organization` |

---

## Advanced configuration

### Filter by environment

Only process production deployments:

```cel
filter: has(webhook.deployment_status) && 
        webhook.deployment_status.environment == "production" &&
        webhook.deployment_status.state in ["failure", "error"]
```

### Filter by branch

Only process events from main branch:

```cel
filter: (has(webhook.deployment) && webhook.deployment.ref == "refs/heads/main") ||
        (has(webhook.release) && webhook.release.target_commitish == "main")
```

### Route by repository

Create separate webhooks for different repositories or use routing:

```cel
// Tag by repository for routing
tags: [
  "repository:" + webhook.repository.full_name,
  "repo_name:" + webhook.repository.name,
  "event:" + // Extract from X-GitHub-Event header if available
]
```

### Security alert prioritization

Prioritize critical security alerts:

```cel
severity: has(webhook.alert) && webhook.alert.rule.severity == "error" 
  ? "critical" 
  : "high"

// Filter: only security errors
filter: has(webhook.alert) && 
        webhook.alert.rule.severity == "error" && 
        webhook.alert.state == "open"
```

---

## Troubleshooting

### Webhook not sending

**Cause**: Webhook configuration error or GitHub can't reach endpoint.

**Solution**:
- Check webhook **Recent Deliveries** for errors
- Verify webhook URL is publicly accessible
- Ensure SSL certificate is valid
- Review response codes (200 = success, 4xx/5xx = error)

### Events not triggering

**Cause**: Event not selected in webhook configuration.

**Solution**:
- Edit webhook in GitHub
- Go to **Which events would you like to trigger this webhook?**
- Select **Let me select individual events**
- Enable required events
- Click **Update webhook**

### Signature verification failing

**Cause**: Secret mismatch or signature not verified.

**Solution**:
- Ensure secret in GitHub matches Harness configuration
- Verify Harness is checking `X-Hub-Signature-256` header
- GitHub uses HMAC-SHA256, not HMAC-SHA1 (legacy)

### Payload fields missing

**Cause**: Event type doesn't include expected fields.

**Solution**:
- Check GitHub webhook documentation for event-specific payload structure
- Use CEL `has()` to check field existence:
```cel
message: has(webhook.deployment_status) 
  ? webhook.deployment_status.description 
  : "No description"
```

---

## Example: Complete integration

### GitHub webhook configuration

- **Payload URL**: `https://app.harness.io/gateway/ai-sre/api/webhooks/wh_abc123`
- **Content type**: `application/json`
- **Secret**: `your-secure-secret`
- **Events**:
  - Deployment statuses
  - Releases
  - Code scanning alerts
- **Active**: ✓

### Harness webhook field mapping

```yaml
# Deployment status events
title: |
  webhook.deployment_status ? 
    "Deployment " + webhook.deployment_status.state + ": " + webhook.repository.full_name :
  webhook.release ?
    "Release " + webhook.release.tag_name + ": " + webhook.repository.full_name :
  webhook.alert ?
    "Security: " + webhook.alert.rule.name + " in " + webhook.repository.full_name :
  "GitHub Event"

message: |
  webhook.deployment_status ?
    "Deployment to " + webhook.deployment_status.environment + " " + webhook.deployment_status.state :
  webhook.release ?
    "Release published: " + webhook.release.name :
  webhook.alert ?
    webhook.alert.rule.description + " (" + webhook.alert.most_recent_instance.location.path + ")" :
  "GitHub event received"

severity: |
  webhook.deployment_status && webhook.deployment_status.state == "failure" ? "critical" :
  webhook.deployment_status && webhook.deployment_status.state == "error" ? "high" :
  webhook.alert && webhook.alert.rule.severity == "error" ? "critical" :
  webhook.alert && webhook.alert.rule.severity == "warning" ? "high" :
  webhook.release ? "info" : "medium"

source: "github"

link: |
  webhook.deployment_status ? webhook.deployment_status.target_url :
  webhook.release ? webhook.release.html_url :
  webhook.alert ? webhook.alert.html_url :
  webhook.repository.html_url

tags:
  - "source:github"
  - "repository:{{webhook.repository.full_name}}"

filter: |
  (webhook.deployment_status && webhook.deployment_status.state in ["failure", "error"]) ||
  (webhook.release && !webhook.release.prerelease && !webhook.release.draft) ||
  (webhook.alert && webhook.alert.rule.severity in ["error", "warning"] && webhook.alert.state == "open")
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate GitHub events.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) for advanced event filtering.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated incident investigation.
- Go to [GitHub Template](../../templates/cicd/github.md) for the pre-configured template.

---

## Further reading

### GitHub Official Documentation
- [Webhooks Documentation](https://docs.github.com/webhooks) - Complete guide to GitHub webhooks configuration and event types
- [Webhook Events and Payloads](https://docs.github.com/webhooks/webhook-events-and-payloads) - Event-specific payload structures (`deployment_status`, `release`, `code_scanning_alert`)
- [Validating Webhook Deliveries](https://docs.github.com/webhooks/using-webhooks/validating-webhook-deliveries) - Signature validation (`X-Hub-Signature-256`) and secret configuration
- [Deployments API](https://docs.github.com/rest/deployments/deployments) - Deployment and deployment status payload structures
