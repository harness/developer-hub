---
title: Configure Harness Code for pull request ingestion
description: Harness Code is ingested automatically as a source-control change source, with no connector setup required
sidebar_label: Harness Code
sidebar_position: 7
keywords:
  - ai-sre
  - change detection
  - harness code
  - pull request ingestion
  - source control
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness Code repositories are ingested as a source-control change source automatically. No connector and no webhook setup are required.

## Before you begin

- **Deploy Change Investigator setup**: Build and deploy webhook integrations created in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to set up the webhook endpoints.
- **A Harness Code repository**: The service you deploy is built from a Harness Code repository.

---

## How Harness Code pull request ingestion works

The Deploy Change Investigator ingests Harness Code pull requests by **polling** the internal Harness Code service. Because Harness Code runs inside your Harness account, ingestion uses internal service authentication.

- **Mechanism**: AI SRE polls the internal Harness Code API for merged pull requests on the tracked repository.
- **Frequency**: The ingestion job runs approximately once per hour.
- **Authentication**: None. Harness Code is an internal service, so no connector and no credentials are needed.

:::tip No setup required
Unlike GitHub and Bitbucket, Harness Code needs no connector and no webhook. When you create a pull request ingestion, you provide only the repository URL. Ingestion is also created automatically once you send build webhooks that reference a Harness Code repository.
:::

---

## Create a pull request ingestion

Ingestion is created automatically from your build webhooks. To create one by hand:

1. In the AI SRE left navigation, go to **Integrations**.
2. Open the **PR Ingestions** tab.
3. Click **+ New PR Ingestion**.
4. In the **Create New PR Ingestion** dialog, under **Select Git Provider**, choose **Harness Code**.
5. Enter the **Repository URL** of the Harness Code repository, for example `https://app.harness.io/ng/account/ACCOUNT_ID/module/code/orgs/ORG_ID/projects/PROJECT_ID/repos/REPO_NAME`.
6. Click **Create**.

![Create New PR Ingestion dialog with Harness Code selected as the Git provider and a repository URL field](../static/create-pr-ingestion.png)

No connector selection is required, because Harness Code is an internal service.

---

## Known limitation: missing commit SHA

For Harness Code pull requests, the ingested `commitSha` is always empty. The Harness Code API does not return the merge commit SHA to the ingestion job, so pull requests are stored without it.

:::warning Commit SHA is not available for Harness Code
Harness Code pull requests are ingested with their branch, PR number, title, merge timestamp, and author, but **without a commit SHA**. Correlation that relies on matching a build's commit SHA to a pull request does not apply to Harness Code. Pull requests still surface against deployments through service and version matching.
:::

---

## Verify pull request ingestion

1. Navigate to **AI SRE** → **PR Ingestions** (tab next to Integrations).
2. Confirm an ingestion job exists for your Harness Code repository with a tracked branch and a recent sync timestamp.
3. After the next hourly sync, confirm merged pull requests appear against your deployments in **Change Management**.

---

## Troubleshooting

<Troubleshoot
  issue="Harness Code pull request ingestion job not created after sending build webhooks"
  mode="docs"
  fallback="Confirm your build webhook payload includes a source.repository_url that points at the Harness Code repository. Harness Code needs no connector, but AI SRE still creates the ingestion job from the first build webhook that identifies the repository."
/>

<Troubleshoot
  issue="Harness Code pull requests appear without a commit SHA"
  mode="docs"
  fallback="This is expected. The Harness Code API does not return the merge commit SHA, so Harness Code pull requests are ingested without one. Pull requests still link to deployments through service and version matching."
/>

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for the complete setup guide.
- Go to [Configure GitHub](/docs/ai-sre/change/sources/github) or [Configure Bitbucket](/docs/ai-sre/change/sources/bitbucket) for external source control.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how change detection works during incidents.
