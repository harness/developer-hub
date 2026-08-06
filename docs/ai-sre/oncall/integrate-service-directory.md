---
title: Integrate with the Service Directory
description: Connect Harness CD services to the AI SRE on-call system for automatic service-to-team mapping.
sidebar_label: Integrate with the Service Directory
sidebar_position: 2
keywords:
  - service directory
  - on-call
  - service mapping
  - routing
tags:
  - on-call
  - service-directory
---

The service directory is the foundation of on-call routing in Harness AI SRE.

It determines which User Group gets paged when an alert fires for a given service. The directory is automatically populated by services defined in Harness CD, so your on-call routing stays in sync with your deployment topology.

## What you will learn

- **How the directory syncs:** How Harness CD services populate the AI SRE service directory.
- **How to map services:** How to assign an owning User Group and escalation policy to each service.
- **How to add subscribers:** How to give stakeholders status updates without joining incident war rooms.
- **How to enable paging:** How to turn on a service paging webhook for external alert sources.

## How service directory integration works

In AI SRE, a **User Group** is the organizational unit that acts as the on-call team for a service. Go to [Configure On-Call Teams and Routing](/docs/ai-sre/oncall/manage-teams-and-notifications) to understand how User Groups own services and escalation policies.

- Services defined in your **Harness CD project** are automatically synchronized into the AI SRE service directory.
- Each service can be mapped to a **User Group** and an **escalation policy**, which determines who gets paged when an alert for that service arrives.
- When an alert payload includes a service identifier, AI SRE uses the directory to look up the correct on-call responder.

---

## Set up service mapping

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Verify that your Harness CD services appear in the list. If they do not, confirm that AI SRE is enabled for the same project where your CD services are defined.
3. For each service, assign:
   - **Owning User Group:** The User Group responsible for this service.
   - **Escalation policy:** The escalation chain to use when this service is impacted.
4. Save your mappings.

---

## Configure service subscribers

Service subscribers receive status updates during incidents affecting their subscribed services. Configure subscribers to enable stakeholder communication without requiring stakeholders to join incident war rooms.

To add a subscriber, navigate to **Project Settings** → **Service Directory (AI SRE)**, select a service, select the **Subscribers** tab, then add a **User** or a **User Group**. When an incident commander sends a status update for an incident affecting this service, all subscribers receive an email with incident details, current status, and mitigation actions.

Go to [Configure Status Updates and Service Subscribers](/docs/ai-sre/incidents/status-updates) to configure the full subscription model and delivery options.

---

## Enable a service paging webhook

Each service can expose a dedicated paging webhook so external monitoring tools, legacy systems, and custom applications can trigger on-call notifications by sending alerts directly to the service. When you enable the webhook, AI SRE creates a unique HTTPS endpoint, a unique email address, and an alert rule that pages the service's on-call User Group.

Go to [Configure Service Paging Webhooks](/docs/ai-sre/oncall/service-paging-webhook) to enable the webhook, map alert fields, and use the HTTP and email integration methods.

---

## Best practices

- **Map every production service:** Unmapped services cannot be automatically routed, which means alerts may go unnoticed.
- **Keep mappings current:** When service ownership changes, update the directory promptly. Stale mappings page the wrong User Group.
- **Align with your CD project structure:** The service directory pulls from CD, so organizing your CD services cleanly pays off in on-call routing accuracy.
- **Use User Groups for subscribers:** Subscribe User Groups (for example, "Platform Leadership") rather than individual users to reduce maintenance when membership changes.
- **Align subscribers with on-call structure:** If a User Group is on-call for a service, its leadership should be subscribed for status updates.

---

## Next steps

With services mapped, build the rotations and routing that use them.

- Go to [Configure On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to build rotation schedules for your User Groups.
- Go to [Configure Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to set up multi-level escalation chains.
- Go to [Route Alerts](/docs/ai-sre/oncall/configure-alert-rules) to page the correct on-call User Group when monitoring alerts fire.
