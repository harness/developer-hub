---
title: Change Management
description: Understand and track code changes that impact your incidents using the Deploy Change Investigator
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/change/change
---

# Change Management

Change management in Harness AI SRE helps you understand what code, configuration, and infrastructure changes were deployed when incidents occur. By connecting your CI/CD pipeline data—builds, deployments, and pull requests—you gain precise visibility into what changed and when.

## Key capabilities

- **Deployment tracking:** Automatically capture which services and versions were deployed to each environment
- **Build correlation:** Link deployments back to specific builds and commit SHAs
- **Code change visibility:** See which PRs and code changes were included in each deployment
- **Incident correlation:** During incidents, instantly identify what changed in your system

## How it works

The Deploy Change Investigator connects three data streams from your CI/CD pipeline:

1. **Build webhooks** — Capture artifact versions and commit information when builds complete
2. **Deploy webhooks** — Track when services are deployed and to which environments
3. **PR ingestion** — Automatically sync merged pull requests from your repositories

When an incident occurs, the AI SRE agent uses this data to show you exactly which changes were deployed around the time of the incident, helping you quickly identify potential root causes.

## Get started

To enable change management capabilities:

1. [Set up the Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) — Configure webhooks in your CI/CD pipelines
2. Learn how the [AI Agent uses change detection](/docs/ai-sre/ai-agent/rca-change-agent) during incident investigation

## What's tracked

Change management tracks:

- **Service deployments** — Which services were deployed, when, and by whom
- **Artifact versions** — Specific versions and build IDs for each deployment
- **Code changes** — Pull requests, commits, and files changed
- **Environments** — Deployment targets (production, staging, QA, etc.)
- **Timeline correlation** — Map deployments to incident timelines

This data enables the AI SRE agent to provide context-aware insights during incident response and root cause analysis.
