---
title: Jira Integration
sidebar_label: Jira
sidebar_position: 2
description: Connect Jira to Harness AI SRE to track Jira deployments and automate ticket actions.
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

- **Change source:** Jira sends deployment activity to AI SRE through webhooks, so the Deploy Change Investigator can correlate Jira deployments with incidents.
- **Runbook actions:** Runbooks create, update, transition, and comment on Jira tickets during a response.

## Set up Jira

- Go to [Jira change source](/docs/ai-sre/change/sources/jira) to track Jira deployments through webhooks.
- Go to [Jira runbook actions](/docs/ai-sre/runbooks/integrations/ticketing/jira) to automate ticket creation, updates, transitions, and comments.

## Related integrations

- Go to [Jira Service Management Integration](/docs/ai-sre/integrations/ticketing-itsm/jira-service-management) to create Jira Service Management alerts from runbooks.
- Go to [Confluence Integration](/docs/ai-sre/integrations/ticketing-itsm/confluence) to create and update Confluence pages from runbooks.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
