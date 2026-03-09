---
title: Acknowledge and Triage Incidents
description: Learn how to respond to an incident notification, review the incident summary, and acknowledge in Harness AI SRE.
sidebar_label: Acknowledge & Triage
sidebar_position: 2
---

# Acknowledge and Triage Incidents

When you're paged for an incident, the first few minutes matter. 

This page walks you through opening the incident, understanding what's happening, and letting your team know you're responding.

## Respond to the Notification

You'll receive an incident notification through one or more channels — Slack, Microsoft Teams, PagerDuty, OpsGenie, mobile push, email, SMS, or phone call, depending on your contact settings.

1. Click the notification link to open the **Incident Details** page in Harness.
2. If you're on mobile, you can also acknowledge directly from the Harness On-Call app.

## Review the Incident Summary

Before taking action, orient yourself:

- **Severity** and **incident type** — Understand the scope and priority level.
- **Timeline** — See the sequence of alerts and events that triggered the incident.
- **Related alerts** — View correlated monitoring data and identify affected services.
- **Assignee** — Check if someone else is already working on it.

## Acknowledge the Incident

Click **Acknowledge** to signal to your team that you're on it. Acknowledging:

- Stops escalation at your level (the page won't continue climbing the escalation policy).
- Updates the incident status so teammates and stakeholders know someone is responding.
- Logs the acknowledgment in the incident timeline with a timestamp.

You can acknowledge from any platform — web, Slack, or the mobile app — and it syncs everywhere in real time.

## Assess Impact

Once acknowledged, quickly assess the blast radius before diving into troubleshooting:

- **Which services are affected?** Check the related alerts and monitoring dashboards.
- **Who is impacted?** Determine whether this affects internal users, external customers, or both.
- **What's the business impact?** Consider revenue, SLA commitments, and reputational risk.
- **Is the severity accurate?** If the impact is larger or smaller than the initial classification, update the severity field now.

This assessment informs your next steps — whether you handle it yourself, pull in additional responders, or escalate.

## Next Steps

- [Update incident details](./update-incident-details.md) — Edit fields, change status, and add key events.
- [Execute runbooks](./execute-runbooks.md) — Run the response procedures associated with the incident.