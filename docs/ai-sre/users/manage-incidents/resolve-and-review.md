---
title: Resolve and Review Incidents
description: Close out an incident in Harness AI SRE, review AI Scribe outputs, and contribute to post-incident learning.
sidebar_label: Resolve & Review
sidebar_position: 7
---

# Resolve and Review Incidents

Once the immediate issue is fixed and services are stable, it's time to close the incident and set your team up for post-incident learning. 

A well-closed incident has a complete record, all action items captured, and a foundation for the retrospective.

## Resolve the Incident

1. Confirm the fix is stable — check monitoring dashboards and verify that the symptoms have not returned.
2. On the **Incident Details** page, update the status to **Resolved**.
3. Review the incident record before closing:
   - **Key events** — Are the major milestones captured (root cause found, mitigation applied, service restored)?
   - **Action items** — Has every follow-up task been logged with an owner and due date?
   - **Summary** — Does the incident summary reflect what actually happened, not just the initial description?
4. Click **Save**.

## Review AI Scribe Outputs

The [AI Scribe Agent](/docs/ai-sre/ai-agent) works alongside you during the incident and generates outputs automatically:

- **AI Summary** — A synthesized summary of the incident drawn from channel conversations, status changes, and key events.
- **Timeline** — A structured timeline reconstructed from incident activity.
- **Post-Incident Report Draft** — A starting point for your retrospective, pulling together the what, when, and how of the incident.

Access these from the **AI Summary** and **Timeline** sections on the incident details page. Review them for accuracy and completeness — they're generated from what was captured during the incident, so the quality of your real-time documentation directly affects the quality of these outputs.

![AI Summary timeline](../../get-started/static/incident-ai-summary-timeline.png)

## Contribute to Post-Incident Learning

Resolving the incident is the end of the immediate response, but the beginning of the learning cycle:

- **Complete your action items** — Follow through on the tasks assigned to you within their deadlines. Check the [Action Items](./create-and-track-action-items.md) tab periodically.
- **Participate in the retrospective** — Bring your perspective on what happened, what went well, and what could be improved. The AI Scribe draft gives the team a head start, but human context is essential.
- **Flag runbook improvements** — If a runbook was missing steps, had outdated instructions, or didn't cover the scenario you encountered, let your administrator know so it can be updated.
- **Share knowledge** — If you learned something that would help the broader team (a new debugging technique, a service behavior you didn't expect, a monitoring gap), communicate it through your team's usual channels.

## Next Steps

- [Managing Incidents in Slack](/docs/ai-sre/get-started/slack-commands) — Slash commands for managing incidents from Slack.
- [AI Scribe Agent](/docs/ai-sre/ai-agent) — Full documentation on AI-powered incident documentation.
- [Runbook Library](/docs/ai-sre/runbooks/create-runbook) — Browse and understand your team's response playbooks.