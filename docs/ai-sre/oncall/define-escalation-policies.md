---
title: Define Escalation Policies
description: Create multi-level escalation policies in Harness AI SRE to ensure incidents always reach a responder.
sidebar_label: Define Escalation Policies
sidebar_position: 4
---

# Define Escalation Policies

Escalation policies control what happens when an on-call responder doesn't acknowledge a page. 

By setting up multi-level escalation chains, you ensure that incidents always reach someone who can respond — even if the primary responder is unavailable.

## Create an Escalation Policy

<DocVideo src="https://app.tango.us/app/embed/004cfc98-17f2-4947-84a3-75dfbb3aeeaf?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Create Escalation Policy" />

1. Navigate to **On-Call** → **Escalation Policies**.
2. Click **Create Escalation Policy**.
3. Configure the policy:
   - **Name** — A descriptive name (e.g., "Payments Team Escalation").
   - **Levels** — Add one or more escalation levels. Each level defines:
     - **Target** — A specific user or group to notify.
     - **Timeout** — How long to wait (in minutes) for acknowledgment before escalating.
     - **Retries** — Number of retry attempts at this level before moving to the next.
4. **Attach a schedule** to the policy so the system knows which on-call rotation to page at the first level.
5. Click **Save**.

## How Escalation Works

When a page is triggered:

1. The **current on-call responder** (from the attached schedule) is notified on all configured channels.
2. If no acknowledgment is received within the **timeout period**, the system retries based on the retry count.
3. If the first level is exhausted, the page **escalates to the next level** — typically a team lead, manager, or secondary on-call group.
4. This continues through all configured levels until someone acknowledges.

## Best Practices

- **Always configure at least two levels** — A primary responder and a backup prevents incidents from going unacknowledged.
- **Set appropriate timeouts** — Too short and you escalate before someone has time to respond; too long and incidents sit idle. A common starting point is 5–10 minutes per level.
- **Use groups at higher levels** — Escalating to a team or group at level 2+ increases the chance of a quick response.
- **Attach the right schedule** — Make sure the escalation policy points to the correct on-call rotation. A misconfigured attachment pages the wrong team.
- **Test the full chain** — Run a test page through every level of the policy before relying on it in production. Verify that notifications reach each target correctly.