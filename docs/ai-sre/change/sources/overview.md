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
- Connect a source-control change source for pull request ingestion. If your code is in [Harness Code](/docs/ai-sre/change/sources/harness-code), ingestion is automatic with no connector required. Otherwise, go to [Configure GitHub](/docs/ai-sre/change/sources/github) or [Configure Bitbucket](/docs/ai-sre/change/sources/bitbucket) to set up polling-based pull request ingestion.

---

## Available integration guides

### CI/CD tools

- **[Harness Pipelines](/docs/ai-sre/change/deploy-change-investigator)**: Native integration with Harness build and deployment pipelines.
- **[Jenkins](/docs/ai-sre/change/sources/jenkins)**: Configure Jenkins pipelines to send build and deploy webhooks.
- **[GitHub Actions](/docs/ai-sre/change/sources/github-actions)**: Add webhook steps to GitHub Actions workflows.
- **[GitLab CI](/docs/ai-sre/change/sources/gitlab-ci)**: Configure GitLab CI/CD pipelines with webhook notifications.
- **[CircleCI](/docs/ai-sre/change/sources/circleci)**: Send build and deploy data from CircleCI workflows.

### Source control

Source-control change sources ingest merged pull requests by **polling**, not webhooks. There is no webhook URL to paste into your repository. AI SRE uses your Harness connector to query the provider's API, approximately once per hour, for pull requests merged into your deploy branch.

- **[GitHub](/docs/ai-sre/change/sources/github)**: Ingest merged pull requests from GitHub.com, GitHub Enterprise Cloud, or GitHub Enterprise Server.
- **[Bitbucket](/docs/ai-sre/change/sources/bitbucket)**: Ingest merged pull requests from Bitbucket Cloud.
- **[Harness Code](/docs/ai-sre/change/sources/harness-code)**: Ingest merged pull requests automatically, with no connector required.

### Change tracking systems

- **[Jira](/docs/ai-sre/change/sources/jira)**: Track Jira issue deployments and releases.
- **[Terraform](/docs/ai-sre/change/sources/terraform)**: Send Terraform apply events as deployment data.
- **[ServiceNow](/docs/ai-sre/change/sources/servicenow)**: Ingest ServiceNow change records automatically once a ServiceNow connector exists.

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

The deploy payload also accepts these optional fields:

- **metadata:** Arbitrary JSON object for additional context.
- **deployment_url:** Link to the deployment.
- **ticket_url:** Link to a related ticket.
- **tags:** Labels for the deployment.
- **summary:** Short description of the deployment.
- **change_type:** Classifier for the change.

**Critical requirement:** The `service` name and `version` in deploy webhooks **must match** the corresponding fields from build webhooks.

:::warning The Harness Deployment template does not record deploy status
The stock Harness Deployment template records every deploy activity as `success`. A `"status": "FAILURE"` value in the payload is accepted but not stored as a failed deployment. Do not rely on sending a failure status to record failed deploys through this template.
:::

:::danger Correlation is an exact match with no time window
Build and deploy events are correlated by an exact string match on `service` name and `version`, with no time window. A mismatch does not raise an error. The deploy event is still created, but with no linked build, commit, or pull request data. If a multi-service deploy includes services that are already at their current version, the `services` array is pruned after ingestion to only the changed services, so the recorded value can be smaller than what you sent.
:::

---

## Authentication and delivery

Build and deploy webhooks use the following delivery model:

- **No HMAC signature is required.** The secret is the opaque webhook URL itself. Treat the URL as a credential.
- **Rate limiting is per organization.** When you exceed the limit, the endpoint returns HTTP `429`. The limit is tier-configurable, so do not hardcode a value.
- **There is no server-side retry of failed inbound webhooks.** Retrying a failed send is the responsibility of your CI/CD tool.

:::note No privileged Harness channel
"Harness Deployment" and "Harness Build" are webhook-template presets. They use the same generic webhook mechanism as Jenkins, GitHub Actions, and CircleCI. There is no privileged native path for Harness CD or CI.
:::

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
