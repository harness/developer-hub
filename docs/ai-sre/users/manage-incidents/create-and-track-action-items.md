---
title: Create and Track Action Items
description: Capture follow-up tasks during and after incidents in Harness AI SRE, assign owners, and track completion.
sidebar_label: Action Items
sidebar_position: 6
---

# Create and Track Action Items

Action items capture work that needs to happen during or after an incident — things like deploying a permanent fix, updating documentation, adding monitoring coverage, or following up with an affected customer. 

Tracking them inside the incident ensures nothing falls through the cracks.

## Create an Action Item

1. Open the **Incident Details** page.
2. Navigate to the **Action Items** tab.
3. Click **Create Action Item**.
4. Fill in the details:
   - **Description** — A clear, specific description of what needs to be done (e.g., "Add connection pool monitoring alert for db-primary-01").
   - **Assignee** — The person responsible for completing the task.
   - **Due date** — When it needs to be done.
5. Click the **check mark** to save.

## Track Progress

- Action items appear in a list on the **Action Items** tab with their current status.
- Use the **pencil icon** to update an action item's status, reassign it, or adjust the due date.
- Completed action items remain visible in the list for historical reference.

## When to Create Action Items

**During the incident:**
- A workaround is in place but a permanent fix is needed.
- You discover a monitoring gap that should be closed.
- A manual step needs to happen outside of AI SRE (e.g., vendor notification, customer communication).

**After resolution:**
- Post-incident review identifies process improvements.
- Runbook steps need to be added or updated based on what you learned.
- Infrastructure changes are needed to prevent recurrence.

## Best Practices

- **Be specific** — "Fix the database" is too vague. "Increase connection pool max from 50 to 200 on db-primary-01 and add a CloudWatch alarm at 80% utilization" is actionable.
- **Always assign an owner** — Unassigned action items don't get done. Every item needs a name next to it.
- **Set realistic due dates** — Urgent follow-ups (like deploying a permanent fix for a workaround) should have short deadlines. Process improvements can have longer timelines, but should still have a date.
- **Review before closing the incident** — Before marking an incident resolved, scan the action items tab. Make sure everything that came up during the incident has been captured.