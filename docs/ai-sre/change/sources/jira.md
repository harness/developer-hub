---
title: Configure Jira for Deploy Change Investigator
description: Track Jira issue deployments by sending webhooks when issues transition to deployment states
sidebar_label: Jira
sidebar_position: 9
keywords:
  - ai-sre
  - change detection
  - jira
  - build webhooks
  - deployment tracking
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Track Jira issue deployments by sending deployment webhooks when issues are released or deployed.

## Before you begin

- **Deploy Change Investigator setup**: Deploy webhook integration created in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to create webhook endpoint.
- **Jira Cloud access**: Administrator permissions to create automation rules.
- **Deploy webhook URL**: Deploy webhook URL from AI SRE integrations page.
- **Deployment workflow**: Status workflow that includes deployment states (for example, "In Production", "Deployed").

---

## Configure Jira automation

Use Jira automation rules to send webhooks when issues transition to deployment states.

### Create automation rule for status transitions

Send a webhook when issues move to deployment statuses.

1. Navigate to **Project settings** → **Automation**
2. Click **Create rule**
3. Configure trigger:
   - **When:** Issue transitioned
   - **From status:** Any status
   - **To status:** Select deployment statuses (for example, "In Production", "Deployed to Staging")
4. Click **New condition** → **Issue fields condition**:
   - **Field:** Fix Version/s
   - **Condition:** is not empty
5. Click **New action** → **Send web request**
6. Configure webhook:
   - **Webhook URL:** Paste deploy webhook URL from AI SRE
   - **HTTP method:** POST
   - **Headers:** Add `Content-Type: application/json`
   - **Webhook body:** Custom data
7. Paste webhook payload (see below)
8. Click **Turn it on**

---

## Webhook payload

### Status transition payload

```json
{
  "services": [{
    "service": "{{issue.key}}",
    "version": "{{issue.fixVersions.first.name}}"
  }],
  "environments": ["{{issue.status.name}}"],
  "changeId": "{{issue.key}}-{{now}}",
  "status": "SUCCESS",
  "deployedBy": "{{initiator.emailAddress}}",
  "deployTimestamp": "{{now.jiraDateTime}}"
}
```

### Release version payload

For version release events:

```json
{
  "services": [{
    "service": "{{version.project.key}}",
    "version": "{{version.name}}"
  }],
  "environments": ["production"],
  "changeId": "release-{{version.id}}",
  "status": "SUCCESS",
  "deployedBy": "{{initiator.emailAddress}}",
  "deployTimestamp": "{{now.jiraDateTime}}"
}
```

---

## Smart Values reference

Jira automation provides Smart Values for accessing issue and version data:

| Smart Value | Description | Example |
|-------------|-------------|---------|
| `{{issue.key}}` | Issue key | `PROJ-123` |
| `{{issue.fixVersions.first.name}}` | First fix version | `1.2.3` |
| `{{issue.status.name}}` | Current status | `In Production` |
| `{{issue.components.first.name}}` | First component | `frontend` |
| `{{initiator.emailAddress}}` | User who triggered transition | `user@example.com` |
| `{{now}}` | Current Unix timestamp | `1704067200000` |
| `{{now.jiraDateTime}}` | ISO 8601 timestamp | `2025-01-01T00:00:00.000+0000` |
| `{{version.name}}` | Version name | `1.2.3` |
| `{{version.project.key}}` | Project key | `PROJ` |
| `{{version.id}}` | Version ID | `10001` |

---

## Service identification strategies

Map Jira issues to services using different approaches:

### Option 1: Use issue key

```json
{
  "services": [{
    "service": "{{issue.key}}",
    "version": "{{issue.fixVersions.first.name}}"
  }]
}
```

Best for: Single-service projects where each issue represents a deployable change

### Option 2: Use component

```json
{
  "services": [{
    "service": "{{issue.components.first.name}}",
    "version": "{{issue.fixVersions.first.name}}"
  }]
}
```

Best for: Multi-service projects using Jira components to identify services

### Option 3: Use custom field

```json
{
  "services": [{
    "service": "{{issue.Service Name}}",
    "version": "{{issue.fixVersions.first.name}}"
  }]
}
```

Replace `Service Name` with your custom field name. Best for: Projects with custom service tracking fields.

---

## Environment mapping

Map Jira statuses to deployment environments:

| Jira Status | Environment Value |
|-------------|------------------|
| In Production | `production` |
| Deployed to Staging | `staging` |
| In UAT | `uat` |
| Deployed to Development | `development` |

Use the status name directly:

```json
{
  "environments": ["{{issue.status.name}}"]
}
```

Or map to standardized names using conditions in your automation rule.

---

## Testing webhooks

### Test status transition

1. Create or select a test issue
2. Add a Fix Version to the issue
3. Transition issue to deployment status (for example, "In Production")
4. Navigate to **AI SRE** → **Integrations**
5. Click **...** menu on DEPLOY integration
6. Select **Debug**
7. Verify webhook appears with correct payload

### Verify automation execution

1. Navigate to **Project settings** → **Automation**
2. Click on your automation rule
3. Select **Audit log** tab
4. Verify rule executed and webhook was sent
5. Check for any error messages

---

## Troubleshooting

<Troubleshoot
  issue="Jira automation webhook not received in AI SRE"
  mode="docs"
  fallback="Confirm the automation rule is turned on, verify the webhook URL matches the AI SRE integration, and check that the rule execution appears in the automation audit log. Ensure Jira Cloud allows outbound HTTPS, and open the audit log to find the failed execution and its error message."
/>

<Troubleshoot
  issue="Jira deployments not showing in AI SRE Change Management"
  mode="docs"
  fallback="Ensure the issue has a Fix Version set before the transition, keep services[].service and services[].version consistent across deployments, and confirm the webhook payload is valid JSON by checking the automation audit log."
/>

<Troubleshoot
  issue="Jira Smart Values returning empty in AI SRE webhook payloads"
  mode="docs"
  fallback={"Empty Smart Values are usually caused by a missing Fix Version, an unassigned component, or an empty or misnamed custom field. Add a condition to check the field is not empty before sending the webhook, or use fallback values such as {{issue.fixVersions.first.name.or(\"unknown\")}}."}
/>

<Troubleshoot
  issue="Jira timestamp format issues in AI SRE deploy webhooks"
  mode="docs"
  fallback="Use {{now.jiraDateTime}} for ISO 8601 format, which is recommended for APIs. Avoid using {{now}} alone because it returns a Unix timestamp in milliseconds."
/>

---

## Multi-service releases

For releases that deploy multiple services, create separate webhook calls or construct a services array:

```json
{
  "services": [
    {"service": "frontend", "version": "{{version.name}}"},
    {"service": "backend", "version": "{{version.name}}"},
    {"service": "worker", "version": "{{version.name}}"}
  ],
  "environments": ["production"],
  "changeId": "release-{{version.id}}",
  "status": "SUCCESS",
  "deployedBy": "{{initiator.emailAddress}}",
  "deployTimestamp": "{{now.jiraDateTime}}"
}
```

---

## Best practices

- **Set Fix Version before deployment**: Ensure issues have Fix Version set before transitioning to deployment statuses
- **Use consistent service names**: Keep service identifiers consistent across issues and deployments
- **Test with real issues**: Verify automation rule works with actual project data before enabling
- **Monitor audit logs**: Regularly check automation audit logs for failures

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for complete setup instructions.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how the AI agent uses change detection during incidents.
- Go to [Configure Jenkins](/docs/ai-sre/change/sources/jenkins) for webhook setup in Jenkins pipelines.
