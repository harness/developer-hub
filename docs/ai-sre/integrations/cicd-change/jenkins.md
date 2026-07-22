---
title: Jenkins Integration
sidebar_label: Jenkins
sidebar_position: 7
description: Connect Jenkins to Harness AI SRE to send build and deploy data as a source of change.
keywords:
  - ai-sre
  - integrations
  - jenkins
tags:
  - integrations
---

Jenkins is an open-source automation server for building, testing, and deploying software through pipelines.

## How AI SRE supports Jenkins

AI SRE treats Jenkins as a change source for the Deploy Change Investigator. Jenkins pipelines POST build and deploy webhooks to an AI SRE endpoint using shell scripts, and AI SRE records them as changes for correlation with incidents.

- **Build and deploy webhooks:** Jenkins pipelines send build and deploy events to AI SRE through shell scripts.
- **Change correlation:** AI SRE correlates the ingested builds and deployments with active incidents during investigation.

## Set up Jenkins

- Go to [Jenkins change source](/docs/ai-sre/change/sources/jenkins) to configure the build and deploy webhooks from your Jenkins pipelines.

## Related integrations

- Go to [CircleCI Integration](/docs/ai-sre/integrations/cicd-change/circleci) to send build and deploy webhooks from CircleCI workflows.
- Go to [GitLab Integration](/docs/ai-sre/integrations/cicd-change/gitlab) to send build and deploy webhooks from GitLab CI.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
