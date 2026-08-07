---
title: GitHub Integration
sidebar_label: GitHub
sidebar_position: 3
description: Ingest pull requests and build and deploy data as change sources, and run pull request actions from runbooks.
keywords:
  - ai-sre
  - integrations
  - github
tags:
  - integrations
---

GitHub is a Git-based source control and automation platform for hosting repositories, managing pull requests, and running GitHub Actions workflows.

## How AI SRE supports GitHub

AI SRE supports GitHub through two mechanisms. It ingests pull requests as a change source and receives alert webhooks that create or update incidents.

- **Pull request ingestion:** AI SRE polls GitHub for pull request activity and records merged pull requests as changes for the [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator).
- **Build and deploy webhooks:** GitHub Actions workflows POST build and deploy events to AI SRE as change data.
- **Alert webhooks:** GitHub POSTs alerts to an AI SRE webhook URL, which creates or updates incidents.

## Set up GitHub

Configure GitHub as a change source and alert webhook with the following steps:

- Go to [GitHub change source](/docs/ai-sre/change/sources/github) to configure pull request ingestion.
- Go to [GitHub Actions change source](/docs/ai-sre/change/sources/github-actions) to send build and deploy webhooks from GitHub Actions workflows.
- Go to [GitHub alert webhook](/docs/ai-sre/alerts/webhooks/integration-guides/cicd/github) to forward GitHub alerts as incidents.

## Next steps

- Go to [GitLab Integration](/docs/ai-sre/integrations/cicd-change/gitlab) to send build and deploy webhooks and forward alerts.
- Go to [Bitbucket Integration](/docs/ai-sre/integrations/cicd-change/bitbucket) to ingest pull requests from Bitbucket Cloud.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
