---
title: Use the Incident Timeline
description: Post updates, coordinate with responders, and review automated activity in the Harness AI SRE incident timeline.
sidebar_label: Use the Incident Timeline
sidebar_position: 4
---

# Use the Incident Timeline

The incident timeline is a chronological record of everything that happens during an incident — automated actions, status changes, runbook executions, key events, and messages from responders. 

It serves as both a coordination tool during the incident and a permanent audit trail after resolution.

## View the Timeline

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

## Post Messages

Use the timeline to share updates, findings, and coordination notes with other responders.

1. Type your message in the text field at the bottom of the timeline.
2. Press **Enter** to post.

Timeline messages are visible to everyone with access to the incident and become part of the permanent record.

## Timeline vs. Incident Channel

Both the timeline and the auto-created Slack/Teams incident channel serve as communication spaces, but they have different purposes:

| | Timeline | Incident Channel |
| --- | --- | --- |
| **Purpose** | Permanent record of key updates and actions | Real-time discussion and troubleshooting |
| **What to post** | Findings, decisions, status updates, coordination notes | Brainstorming, questions, quick back-and-forth |
| **Audience** | Anyone reviewing the incident (including after resolution) | Active responders during the incident |
| **Persistence** | Part of the incident record forever | Channel history (subject to your Slack/Teams retention settings) |

A good rule of thumb: if something is important enough that someone reviewing the incident later should see it, put it in the timeline.

## Best Practices

- **Post findings as you go** — Don't wait until resolution to document what you discovered. Real-time updates help other responders and create a better post-incident record.
- **Summarize, don't duplicate** — You don't need to copy every Slack message into the timeline. Post concise summaries of key decisions and actions.
- **Use key events for milestones** — For major turning points (root cause found, mitigation applied, service restored), use [key events](./update-incident-details.md#add-key-events) rather than timeline messages. Key events have higher visibility in summaries and reports.