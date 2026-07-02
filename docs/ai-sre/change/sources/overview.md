---
title: Configure Sources of Change
description: Configure your CI/CD tools to send build and deployment webhooks to the Deploy Change Investigator
sidebar_label: Overview
sidebar_position: 1
---


Configure your CI/CD tools to send build and deployment data to the Deploy Change Investigator for incident correlation.

## Overview

The Deploy Change Investigator requires two types of webhooks from your CI/CD pipeline:

1. **Build webhooks** - Send artifact versions and commit information when builds complete
2. **Deploy webhooks** - Track when services are deployed to which environments

This section provides configuration guides for popular CI/CD tools and change tracking systems.

---

## Before you begin

Complete the Deploy Change Investigator setup:

- Create build webhook integration in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to set up the webhook endpoints.
- Copy the build and deploy webhook URLs from your integrations.
- Configure your source control connector (GitHub or Bitbucket) for PR ingestion.

---

## Available integration guides

### CI/CD tools

- **[Harness Pipelines](/docs/ai-sre/change/deploy-change-investigator)**: Native integration with Harness build and deployment pipelines.
- **[Jenkins](/docs/ai-sre/change/sources/jenkins)**: Configure Jenkins pipelines to send build and deploy webhooks.
- **[GitHub Actions](/docs/ai-sre/change/sources/github-actions)**: Add webhook steps to GitHub Actions workflows.
- **[GitLab CI](/docs/ai-sre/change/sources/gitlab-ci)**: Configure GitLab CI/CD pipelines with webhook notifications.
- **[CircleCI](/docs/ai-sre/change/sources/circleci)**: Send build and deploy data from CircleCI workflows.

### Change tracking systems

- **[Jira](/docs/ai-sre/change/sources/jira)**: Track Jira issue deployments and releases.
- **[Terraform](/docs/ai-sre/change/sources/terraform)**: Send Terraform apply events as deployment data.

---

## Webhook payload requirements

### Build webhook payload

```json
{
  "artifact": {
    "name": "registry.example.com/myapp",
    "version": "1.2.3"
  },
  "source": {
    "commitSha": "abc123...",
    "kind": "branch",
    "value": "main",
    "repository_url": "https://github.com/org/repo"
  },
  "service": {
    "name": "myapp",
    "version": "1.2.3"
  },
  "buildId": "unique-build-id"
}
```

### Deploy webhook payload

```json
{
  "services": [
    {
      "service": "myapp",
      "version": "1.2.3"
    }
  ],
  "environments": ["production"],
  "changeId": "unique-deploy-id",
  "status": "SUCCESS",
  "deployedBy": "user@example.com",
  "deployTimestamp": "2025-01-01T12:00:00Z"
}
```

**Critical requirement:** The `service` name and `version` in deploy webhooks **must match** the corresponding fields from build webhooks.

---

## Testing webhooks

After configuration, verify webhooks are being received:

1. Navigate to **AI SRE** → **Integrations**
2. Click the three-dot menu (**...**) on your BUILD or DEPLOY integration
3. Select **Debug**
4. Trigger a build or deployment
5. Verify the webhook appears with correct payload data

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to understand the complete setup.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how change detection works during incidents.
