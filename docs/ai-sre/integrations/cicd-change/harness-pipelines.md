---
title: Harness Pipelines Integration
sidebar_label: Harness Pipelines
sidebar_position: 6
description: Connect Harness Pipelines to Harness AI SRE to send build and deploy data and trigger pipelines from runbooks.
keywords:
  - ai-sre
  - integrations
  - harness-pipelines
tags:
  - integrations
---

Harness Pipelines are the CI/CD pipelines built into the Harness Platform for building, testing, and deploying applications.

## How AI SRE supports Harness Pipelines

AI SRE supports Harness Pipelines through two mechanisms. Pipelines send build and deploy data natively as a change source, and runbooks trigger pipelines as an automated response action.

- **Build and deploy data:** Harness Pipelines send build and deploy events to the Deploy Change Investigator as native change data.
- **Runbook actions:** Runbooks trigger Harness Pipelines to automate remediation and response steps during incidents.

## Set up Harness Pipelines

- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) to configure build and deploy data from Harness Pipelines.
- Go to [Harness Pipelines runbook action](/docs/ai-sre/runbooks/integrations/automation/harness-pipelines) to trigger pipelines from runbooks.

## Related integrations

- Go to [Harness Code Integration](/docs/ai-sre/integrations/cicd-change/harness-code) to ingest pull requests with no connector required.
- Go to [GitHub Integration](/docs/ai-sre/integrations/cicd-change/github) to ingest pull requests and send build and deploy webhooks.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
