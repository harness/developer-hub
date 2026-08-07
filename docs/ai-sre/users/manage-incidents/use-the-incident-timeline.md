---
title: Use the Incident Timeline
description: Post updates, coordinate with responders, and review automated activity.
sidebar_label: Use the Incident Timeline
sidebar_position: 4
keywords:
  - incident timeline
  - post messages
  - audit trail
  - incident channel
tags:
  - ai-sre
  - incidents
---

The incident timeline is a chronological record of everything that happens during an incident, automated actions, status changes, runbook executions, key events, and messages from responders. 

It serves as both a coordination tool during the incident and a permanent audit trail after resolution.

## View the timeline

To open the timeline for an incident, follow these steps:

1. Open the **Incident Details** page.
2. Click the **Timeline** tab.
3. Scroll through events in chronological order.

The timeline automatically captures:

- Status changes
- Field updates
- Runbook execution start, progress, and completion
- Key events
- Alert correlations
- Paging and acknowledgment activity

---

## Post messages

Use the timeline to share updates, findings, and coordination notes with other responders.

1. Type your message in the text field at the bottom of the timeline.
2. Press **Enter** to post.

Timeline messages are visible to everyone with access to the incident and become part of the permanent record.

---

## Timeline versus incident channel

Both the timeline and the auto-created Slack or Teams incident channel serve as communication spaces, but they have different purposes:

| | Timeline | Incident Channel |
| --- | --- | --- |
| **Purpose** | Permanent record of key updates and actions | Real-time discussion and troubleshooting |
| **What to post** | Findings, decisions, status updates, coordination notes | Brainstorming, questions, quick back-and-forth |
| **Audience** | Anyone reviewing the incident (including after resolution) | Active responders during the incident |
| **Persistence** | Part of the incident record forever | Channel history (subject to your Slack/Teams retention settings) |

A good rule of thumb: if something is important enough that someone reviewing the incident later should see it, put it in the timeline.

---

## Best practices

Keep these practices in mind when you work in the incident timeline:

- **Post findings as you go:** Do not wait until resolution to document what you discovered. Real-time updates help other responders and create a better post-incident record.
- **Summarize, do not duplicate:** You do not need to copy every Slack message into the timeline. Post concise summaries of key decisions and actions.
- **Use key events for milestones:** For major turning points (root cause found, mitigation applied, service restored), use [key events](/docs/ai-sre/users/manage-incidents/update-incident-details#add-key-events) rather than timeline messages. Key events have higher visibility in summaries and reports.

---

## Next steps

Continue managing the incident with these related tasks:

- Go to [Update incident details](/docs/ai-sre/users/manage-incidents/update-incident-details) to edit fields, send status updates, and add key events.
- Go to [Resolve and review](/docs/ai-sre/users/manage-incidents/resolve-and-review) to close the incident and contribute to the post-incident review.
- Go to [Manage incidents](/docs/ai-sre/users/manage-incidents) to review the full responder workflow.