---
title: GitLab Integration
sidebar_label: GitLab
sidebar_position: 4
description: Connect GitLab to Harness AI SRE to send build and deploy data and forward alerts.
keywords:
  - ai-sre
  - integrations
  - gitlab
tags:
  - integrations
---

GitLab is a DevOps platform for source control, continuous integration, and continuous delivery through GitLab CI/CD pipelines.

## How AI SRE supports GitLab

AI SRE supports GitLab through two mechanisms. GitLab CI sends build and deploy data as a change source, and GitLab forwards alerts that create or update incidents.

- **Build and deploy webhooks:** GitLab CI pipelines POST build and deploy events to AI SRE as change data for the Deploy Change Investigator.
- **Alert webhooks:** GitLab POSTs alerts to an AI SRE webhook URL, which creates or updates incidents.

## Set up GitLab

- Go to [GitLab CI change source](/docs/ai-sre/change/sources/gitlab-ci) to send build and deploy webhooks from GitLab CI pipelines.
- Go to [GitLab alert webhook](/docs/ai-sre/alerts/webhooks/integration-guides/cicd/gitlab) to forward GitLab alerts as incidents.

## Related integrations

- Go to [GitHub Integration](/docs/ai-sre/integrations/cicd-change/github) to ingest pull requests and send build and deploy webhooks.
- Go to [Jenkins Integration](/docs/ai-sre/integrations/cicd-change/jenkins) to send build and deploy webhooks from Jenkins pipelines.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
