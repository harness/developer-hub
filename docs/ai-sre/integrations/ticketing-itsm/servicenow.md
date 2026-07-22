---
title: ServiceNow Integration
sidebar_label: ServiceNow
sidebar_position: 4
description: Connect ServiceNow to Harness AI SRE to ingest change records and automate incident actions.
keywords:
  - ai-sre
  - integrations
  - servicenow
tags:
  - integrations
---

ServiceNow is an ITSM platform for managing change records, incidents, and IT workflows across an organization.

## How AI SRE supports ServiceNow

AI SRE supports ServiceNow through two mechanisms. It ingests change records as a change source and automates incident operations through runbook actions.

- **Change source:** When you save a ServiceNow connector, AI SRE automatically ingests change records so the Deploy Change Investigator can correlate ServiceNow changes with incidents.
- **Runbook actions:** Runbooks create, update, resolve, and comment on ServiceNow incidents during a response.

## Set up ServiceNow

- Go to [ServiceNow change source](/docs/ai-sre/change/sources/servicenow) to ingest change records automatically.
- Go to [ServiceNow runbook actions](/docs/ai-sre/runbooks/integrations/ticketing/servicenow) to automate incident creation, updates, resolution, and comments.

## Related integrations

- Go to [Jira Integration](/docs/ai-sre/integrations/ticketing-itsm/jira) to track Jira deployments and automate ticket actions.
- Go to [Confluence Integration](/docs/ai-sre/integrations/ticketing-itsm/confluence) to create and update Confluence pages from runbooks.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
