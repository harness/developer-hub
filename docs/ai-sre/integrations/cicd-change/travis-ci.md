---
title: Travis CI Integration
sidebar_label: Travis CI
sidebar_position: 10
description: Connect Travis CI to Harness AI SRE to send build and deploy data as a source of change.
keywords:
  - ai-sre
  - integrations
  - travis-ci
tags:
  - integrations
---

Travis CI is a hosted continuous integration service for building, testing, and deploying projects.

## How AI SRE supports Travis CI

AI SRE treats Travis CI as a change source for the Deploy Change Investigator. Travis CI POSTs build and deploy webhooks to an AI SRE endpoint, and AI SRE records them as changes for correlation with incidents.

- **Build and deploy webhooks:** Travis CI sends build and deploy events to AI SRE over HTTP.
- **Change correlation:** AI SRE correlates the ingested builds and deployments with active incidents during investigation.

## Set up Travis CI

- Go to [Travis CI webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/travis-ci) to configure the build and deploy webhooks from Travis CI.

## Related integrations

- Go to [CircleCI Integration](/docs/ai-sre/integrations/cicd-change/circleci) to send build and deploy webhooks from CircleCI workflows.
- Go to [Jenkins Integration](/docs/ai-sre/integrations/cicd-change/jenkins) to send build and deploy webhooks from Jenkins pipelines.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
