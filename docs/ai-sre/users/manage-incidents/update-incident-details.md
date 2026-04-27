---
title: Update Incident Details
description: Edit incident fields, change status, and add key events to keep the incident record current in Harness AI SRE.
sidebar_label: Update Incident Details
sidebar_position: 3
---

# Update Incident Details

As you investigate and work toward resolution, keep the incident record current. 

Accurate details help stakeholders stay informed, trigger the right automated workflows, and create a reliable record for post-incident review.

## Edit Incident Fields

- Use the **pencil icon** next to any field to edit it inline (severity, assignee, affected services, etc.).
- Click **Edit** on the **Incident Summary** to update the description with new findings or context.
- Click **Save** after making changes.

Update fields whenever the situation changes — for example, if you discover additional affected services or need to reassign the incident to another responder.

## Update Incident Status

Keep the status current as you work through the incident. Status changes are visible to all stakeholders and may trigger automated workflows.

| Status | Meaning |
| --- | --- |
| **Investigating** | You're actively looking into the issue. |
| **Identified** | Root cause or a contributing factor has been found. |
| **Monitoring** | A fix has been applied; you're watching for stability. |
| **Resolved** | The incident is closed. |

Change the status from the incident details page by clicking the status field and selecting the new value.

![Incident status dropdown](../../get-started/static/incident-status-dropdown.png)

## Add Key Events

Key events mark important milestones: root cause identified, mitigation applied, service restored, a decision to escalate, an external communication sent, etc.

1. Click **Add Key Event** on the incident details page.
2. Type a description of what happened.
3. Click the **check mark** to save.
4. Click **Save** from the top right.

Key events appear in the incident timeline and are used by the [AI Scribe Agent](/docs/ai-sre/ai-agent) when generating post-incident summaries. Adding them as they happen — rather than reconstructing after the fact — produces a more accurate record.

## Best Practices

- **Update status as soon as the phase changes** — don't wait until resolution to batch-update. Real-time status drives stakeholder confidence and automated workflows.
- **Be specific in key events** — "Identified root cause: connection pool exhaustion on db-primary-01" is far more useful than "Found the issue."
- **Reassign when appropriate** — If you've identified that the incident belongs to another team or specialist, update the assignee and notify them.