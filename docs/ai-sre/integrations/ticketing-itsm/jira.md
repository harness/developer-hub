---
title: Jira Integration
sidebar_label: Jira
sidebar_position: 2
description: Ingest deployments as a source of change and automate ticket actions from runbooks.
keywords:
  - ai-sre
  - integrations
  - jira
tags:
  - integrations
---

Jira is Atlassian's issue and project tracking tool for planning work, managing tickets, and tracking deployments.

## How AI SRE supports Jira

AI SRE supports Jira through two mechanisms. It tracks Jira deployments as a change source and automates ticket operations through runbook actions.

- **Change source:** Jira sends deployment activity to AI SRE through webhooks, so the [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) can correlate Jira deployments with incidents.
- **Runbook actions:** Runbooks create, update, transition, and comment on Jira tickets during a response.

## Set up Jira

Use these resources to connect Jira to AI SRE:

- Go to [Jira change source](/docs/ai-sre/change/sources/jira) to track Jira deployments through webhooks.
- Go to [Jira runbook actions](/docs/ai-sre/runbooks/integrations/ticketing/jira) to automate ticket creation, updates, transitions, and comments.

## Related integrations

Explore other ticketing and ITSM integrations that work with AI SRE:

- Go to [Jira Service Management Integration](/docs/ai-sre/integrations/ticketing-itsm/jira-service-management) to create Jira Service Management alerts from runbooks.
- Go to [Confluence Integration](/docs/ai-sre/integrations/ticketing-itsm/confluence) to create and update Confluence pages from runbooks.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.

## Next steps

- Go to the [runbooks documentation](/docs/ai-sre/runbooks) to automate Jira ticket actions during incident response.
