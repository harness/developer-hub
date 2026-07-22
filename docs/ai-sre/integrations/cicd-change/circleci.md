---
title: CircleCI Integration
sidebar_label: CircleCI
sidebar_position: 2
description: Connect CircleCI to Harness AI SRE to send build and deploy data as a source of change.
keywords:
  - ai-sre
  - integrations
  - circleci
tags:
  - integrations
---

CircleCI is a continuous integration and delivery platform that runs build, test, and deploy workflows.

## How AI SRE supports CircleCI

AI SRE treats CircleCI as a change source for the Deploy Change Investigator. CircleCI workflows POST build and deploy webhooks to an AI SRE endpoint, which records them as changes for correlation with incidents.

- **Build and deploy webhooks:** CircleCI workflows send build and deploy events to AI SRE over HTTP.
- **Change correlation:** AI SRE correlates the ingested builds and deployments with active incidents during investigation.

## Set up CircleCI

- Go to [CircleCI change source](/docs/ai-sre/change/sources/circleci) to configure the build and deploy webhooks from your CircleCI workflows.

## Related integrations

- Go to [Jenkins Integration](/docs/ai-sre/integrations/cicd-change/jenkins) to send build and deploy webhooks from Jenkins pipelines.
- Go to [Travis CI Integration](/docs/ai-sre/integrations/cicd-change/travis-ci) to send build and deploy webhooks from Travis CI.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
