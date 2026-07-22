---
title: Configure ServiceNow change records as a change source
description: ServiceNow change records are ingested automatically once a ServiceNow connector exists, with no separate setup
sidebar_label: ServiceNow
sidebar_position: 10
keywords:
  - ai-sre
  - change detection
  - servicenow
  - change records
  - itsm
tags:
  - change-management
  - integrations
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ServiceNow change records are ingested automatically as a change source. Once a Harness ServiceNow connector exists, the RCA Change Agent correlates change records with active incidents. No separate ingestion setup is required.

## Before you begin

- **A ServiceNow connector**: A Harness ServiceNow connector configured in your organization, typically the one used for pipeline approvals. Go to [Connect to ServiceNow](/docs/platform/connectors/ticketing-systems/connect-to-service-now) to create one.
- **Read access**: The connector must have read access to the `change_request` table in ServiceNow.

---

## How ServiceNow change ingestion works

Ingestion is provisioned automatically when a ServiceNow connector is saved. You do not configure a webhook, and you do not create an ingestion job by hand.

- **Trigger**: Saving a ServiceNow connector provisions the ingestion automatically.
- **Mechanism**: AI SRE polls the ServiceNow Table API for change records. This is a scheduled poll, not a webhook.
- **Frequency**: The poll runs every 5 minutes.
- **Backfill**: On first activation, the job retrieves change records from the previous 90 days, then syncs incrementally using `sys_updated_on` checkpointing.
- **Authentication**: Basic authentication through the ServiceNow connector.

:::info Document the connector, not a button
Ingestion provisions when the connector is saved. Do not rely on a manual "New ServiceNow Ingestion" action to enable it.
:::

---

## Fields captured

Each change record is ingested with the following fields:

| Field | Notes |
|-------|-------|
| `number` | Change record number |
| `state` | Current state |
| `cmdb_ci` | Configuration item |
| `business_service` | Affected business service |
| `risk` | Risk rating |
| `impact` | Impact rating |
| `type` | Change type |
| `start_date` / `end_date` | Planned change window |
| `assignment_group` | Owning group |
| `implementation_plan` | First-class field |
| `backout_plan` | Captured in a catch-all custom fields structure, not as a filterable field |
| `test_plan` | Captured in a catch-all custom fields structure, not as a filterable field |

---

## Verify change ingestion

1. Confirm a ServiceNow connector exists and is saved in your organization.
2. Open an incident and review the RCA Change Agent theories panel.
3. Confirm ServiceNow change records appear alongside deployments and pull requests as candidate root causes.

Go to [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent) to review how ServiceNow changes surface during incidents.

---

## Troubleshooting

<Troubleshoot
  issue="ServiceNow change records not appearing in the RCA Change Agent"
  mode="docs"
  fallback="Confirm a ServiceNow connector is saved in your organization and that the connector has read access to the change_request table. Ingestion provisions automatically when the connector is saved, and the poll runs every 5 minutes."
/>

<Troubleshoot
  issue="ServiceNow backout plan or test plan fields are not filterable"
  mode="docs"
  fallback="This is expected. The backout_plan and test_plan fields are captured in a catch-all custom fields structure rather than as first-class, filterable fields. The implementation_plan field is captured as a first-class field."
/>

---

## Next steps

- Go to [RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent) to learn how ServiceNow changes are correlated with incidents.
- Go to [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator) for build, deploy, and pull request correlation.
