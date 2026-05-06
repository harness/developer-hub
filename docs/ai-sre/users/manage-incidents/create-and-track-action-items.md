---
title: Create and Track Action Items
description: Capture follow-up tasks during and after incidents in Harness AI SRE, assign owners, and track completion.
sidebar_label: Action Items
sidebar_position: 6
---

# Create and Track Action Items

Action items capture work that needs to happen during or after an incident — things like deploying a permanent fix, updating documentation, adding monitoring coverage, or following up with an affected customer. 

Tracking them inside the incident ensures nothing falls through the cracks.

AI SRE detects action items automatically in real-time from Slack conversations, meeting transcriptions, and incident notes, then surfaces them in the **Action Items** pane with assignee and due date information extracted from context.

## AI-Powered Action Item Detection

AI SRE automatically detects action items in real-time during active incidents from multiple sources:

### Detection Sources

- **Slack chat messages**: Conversations in the incident channel where someone commits to a task
- **Meeting transcriptions**: Zoom and Microsoft Teams meeting recordings where action items are discussed
- **Incident notes**: Notes added to the incident timeline

### What Gets Detected

Each AI-detected action item includes:

- **Description**: A clear summary of the task extracted from the conversation
- **Assignee**: The name of the person who committed to the task (extracted from conversation context)
- **Due date**: When it needs to be done (if mentioned in the conversation)

### How It Works

The AI analyzes communications during the incident and identifies when someone explicitly commits to doing something. For example:

**Slack message:**
```
@sarah I'll deploy the connection pool fix to production by end of day tomorrow
```

**AI-detected action item:**
```
Description: Deploy connection pool fix to production
Assignee: Sarah
Due date: Tomorrow (end of day)
```

### Deduplication

The system automatically avoids creating duplicate action items. If an action item is mentioned multiple times in different conversations or worded slightly differently, the AI recognizes it as the same task and does not create redundant entries.

Detected action items appear in the **Action Items** pane on the incident detail page alongside manually created items.

## Create an Action Item Manually

You can also create action items manually when needed:

1. Open the **Incident Details** page.
2. Navigate to the **Action Items** tab.
3. Click **Create Action Item**.
4. Fill in the details:
   - **Description**: A clear, specific description of what needs to be done (e.g., "Add connection pool monitoring alert for db-primary-01").
   - **Assignee**: The person responsible for completing the task.
   - **Due date**: When it needs to be done.
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