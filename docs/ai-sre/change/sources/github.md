---
title: Configure GitHub for pull request ingestion
description: Connect GitHub as a source-control change source so the Deploy Change Investigator ingests merged pull requests
sidebar_label: GitHub
sidebar_position: 4
keywords:
  - ai-sre
  - change detection
  - github
  - pull request ingestion
  - source control
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Connect GitHub as a source-control change source so the Deploy Change Investigator ingests the pull requests merged into your deploy branch and links them to builds and deployments.

## Before you begin

- **Deploy Change Investigator setup**: Build and deploy webhook integrations created in AI SRE. Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to set up the webhook endpoints.
- **A GitHub connector**: A Harness GitHub connector configured in your project. Go to [Connect to a code repo](/docs/platform/connectors/code-repositories/connect-to-code-repo) to create one.
- **Connector permissions**: Account, organization, or project **Admin**, or a role with **Manage Connectors**, to create a connector. Go to the [permissions reference](/docs/platform/role-based-access-control/permissions-reference) to review required permissions.

---

## How GitHub pull request ingestion works

The Deploy Change Investigator ingests GitHub pull requests by **polling**, not through webhooks. You do not paste a webhook URL into GitHub. Instead, AI SRE uses your GitHub connector to periodically query the GitHub API for pull requests that have merged into your deploy branch.

- **Mechanism**: AI SRE polls the GitHub REST API for closed and merged pull requests on the tracked repository.
- **Frequency**: The ingestion job runs approximately once per hour.
- **Lookback**: On first activation, the job backfills merged pull requests from the previous 60 days when it is created automatically from a build webhook, or 90 days when you create it manually. It then syncs incrementally.
- **Stored data**: Each pull request is stored with its branch, PR number, commit SHA, title, merge timestamp, and author.

:::info Polling, not webhooks
Unlike the CI/CD build and deploy integrations, source-control change sources do not require a webhook. There is nothing to configure inside GitHub beyond the access granted to your Harness connector.
:::

---

## Supported GitHub platforms

| Platform | Supported |
|----------|-----------|
| GitHub.com | Yes |
| GitHub Enterprise Cloud | Yes |
| GitHub Enterprise Server | Yes |

Authentication uses your GitHub connector's credentials, either a personal access token (PAT) or a GitHub App. Go to [GitHub App support](/docs/platform/connectors/code-repositories/git-hub-app-support) to configure a GitHub App connector, or go to the [GitHub connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference) to review connector fields.

---

## Select the connector for AI SRE

Map the GitHub source to a connector so AI SRE knows which credentials to use.

1. In the left navigation, click **Project Settings** (gear icon).
2. Under **Project-level resources**, select **Third Party Integrations (AI SRE)**.
3. On the **Third-Party Integrations for AI SRE** page, find the **Github** row.
4. Select your GitHub connector from the dropdown. The scope tag (for example, **PROJECT**) shows where the connector is defined.

![Third-Party Integrations for AI SRE page with a connector selected for each source, including Github](../static/third-party-integrations-ai-sre.png)

:::note Project-scoped page
This page is scoped to the project shown in the **PROJECT** selector at the top of the left navigation. Confirm the correct project is selected before you map connectors.
:::

---

## Create a pull request ingestion

1. In the AI SRE left navigation, go to **Integrations**.
2. Open the **PR Ingestions** tab.
3. Click **+ New PR Ingestion**.
4. In the **Create New PR Ingestion** dialog, under **Select Git Provider**, choose **GitHub**.
5. Enter the **Repository URL** of the repository to track.
6. Click **Create**.

![Create New PR Ingestion dialog with GitHub selected as the Git provider and a repository URL field](../static/create-pr-ingestion.png)

:::tip Automatic creation from build webhooks
You do not have to create the ingestion by hand. When you send your first build webhook that includes a `source.repository_url` pointing at a GitHub repository, AI SRE creates the pull request ingestion job automatically.
:::

---

## Verify pull request ingestion

1. Navigate to **AI SRE** → **PR Ingestions** (tab next to Integrations).
2. Confirm an ingestion job exists for your repository with:
   - Repository name
   - Branch being tracked (usually `main`)
   - Last sync status and timestamp
3. After the next hourly sync, confirm merged pull requests appear against your deployments in **Change Management**.

---

## Troubleshooting

<Troubleshoot
  issue="GitHub pull request ingestion job not created after sending build webhooks"
  mode="docs"
  fallback="Confirm a GitHub connector exists at Project Settings → Connectors, that the Github row is mapped to it under Project Settings → Third Party Integrations (AI SRE), and that your build webhook payload includes the source.repository_url field. AI SRE creates the ingestion job on the first build webhook that identifies a repository. You can also create it manually under Integrations → PR Ingestions → New PR Ingestion."
/>

<Troubleshoot
  issue="GitHub pull request ingestion job created but no PRs are syncing"
  mode="docs"
  fallback="Confirm the connector has read access to the repository, the tracked branch matches your actual deploy branch, and pull requests have merged into that branch within the lookback window. Open the job details for specific error messages."
/>

<Troubleshoot
  issue="GitHub Enterprise Server pull requests are not ingested"
  mode="general"
  fallback="Confirm the GitHub connector points at your GitHub Enterprise Server URL and that the Harness Delegate or Platform can reach that host over HTTPS. Network egress or an incorrect base URL is the usual cause."
/>

---

## Next steps

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for the complete setup guide.
- Go to [Configure Bitbucket](/docs/ai-sre/change/sources/bitbucket) to add Bitbucket as a source-control change source.
- Go to [AI Agent RCA](/docs/ai-sre/ai-agent/rca-change-agent) to learn how change detection works during incidents.
