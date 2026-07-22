---
title: Bitbucket Integration
sidebar_label: Bitbucket
sidebar_position: 1
description: Connect Bitbucket to Harness AI SRE to ingest pull requests as a source of change.
keywords:
  - ai-sre
  - integrations
  - bitbucket
tags:
  - integrations
---

Bitbucket is a Git-based source control platform for hosting repositories and managing pull requests.

## How AI SRE supports Bitbucket

AI SRE treats Bitbucket as a change source for the Deploy Change Investigator. It polls Bitbucket Cloud for pull request activity and ingests merged pull requests as code changes, which are then correlated with incidents during investigation.

- **Pull request ingestion:** AI SRE polls Bitbucket Cloud on a schedule and records pull request events as changes.
- **Bitbucket Cloud only:** Pull request ingestion is supported for Bitbucket Cloud, not Bitbucket Data Center or Server.

## Set up Bitbucket

- Go to [Bitbucket change source](/docs/ai-sre/change/sources/bitbucket) to connect Bitbucket Cloud and configure pull request polling.

## Related integrations

- Go to [GitHub Integration](/docs/ai-sre/integrations/cicd-change/github) to ingest pull requests and send build and deploy webhooks.
- Go to [Harness Code Integration](/docs/ai-sre/integrations/cicd-change/harness-code) to ingest pull requests with no connector required.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
