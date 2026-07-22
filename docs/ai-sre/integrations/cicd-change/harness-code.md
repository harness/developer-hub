---
title: Harness Code Integration
sidebar_label: Harness Code
sidebar_position: 5
description: Connect Harness Code to Harness AI SRE to ingest pull requests with no connector required.
keywords:
  - ai-sre
  - integrations
  - harness-code
tags:
  - integrations
---

Harness Code is the Git-based source control module built into the Harness Platform for hosting repositories and managing pull requests.

## How AI SRE supports Harness Code

AI SRE treats Harness Code as a change source for the Deploy Change Investigator. Because Harness Code is native to the Harness Platform, AI SRE ingests pull requests automatically without an external connector.

- **Pull request ingestion:** AI SRE records Harness Code pull requests as changes for correlation with incidents.
- **No connector required:** The integration is internal to the Harness Platform, so no external credentials or connector setup is needed.

## Set up Harness Code

- Go to [Harness Code change source](/docs/ai-sre/change/sources/harness-code) to enable pull request ingestion from Harness Code repositories.

## Related integrations

- Go to [GitHub Integration](/docs/ai-sre/integrations/cicd-change/github) to ingest pull requests from GitHub.
- Go to [Harness Pipelines Integration](/docs/ai-sre/integrations/cicd-change/harness-pipelines) to send build and deploy data and trigger pipelines from runbooks.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
