---
title: Route Alerts
description: Page the correct on-call team automatically when monitoring alerts fire.
sidebar_label: Route Alerts
sidebar_position: 5
---

Alert rules connect incoming monitoring alerts to the correct on-call team.

When an alert fires, AI SRE evaluates your rules to determine whether to page a responder and which escalation policy to use.

## Create an alert rule

Follow these steps to create an alert rule that routes alerts to an on-call team:

1. Navigate to **On-Call** → **Route Alerts**.
2. Click **Create Alert Rule**.
3. Configure the rule:
   - **Name:** A descriptive name (for example, "Payments Alerts → Payments On-Call").
   - **Service:** Select the service this rule applies to. The service list is populated from the [service directory](/docs/ai-sre/oncall/integrate-service-directory).
   - **Paging toggle:** Enable to automatically page the on-call responder when this rule matches. Disable to log the alert without paging.
   - **Escalation policy:** Select which escalation policy to invoke when this rule triggers.
4. Click **Save**.

---

## How alert routing works

AI SRE routes an incoming alert to a responder through the following steps:

1. An alert arrives from a monitoring integration (Datadog, New Relic, Grafana, and similar).
2. AI SRE extracts the **impacted service** from the alert payload.
3. The system evaluates your route alerts to find a **matching service**.
4. If the matching rule has paging enabled, the **escalation policy** is invoked, which identifies the current on-call responder and sends notifications.

If no alert rule matches the incoming service, the alert is logged but no page is triggered.

---

## Configure default and impacted services

Each alert rule can be configured with:

- **Default service:** The service assumed if the alert payload does not include a service identifier.
- **Impacted service:** Extracted automatically from the alert payload when available, overriding the default.

This lets you handle both well-structured alert payloads and those that lack service metadata.

---

## Best practices

Follow these practices to keep alert routing reliable:

- **Create specific rules per service:** Broad, catch-all rules risk paging the wrong team. Map each production service to its own alert rule.
- **Be deliberate with the paging toggle:** Not every alert should wake someone up. Enable paging only for alerts that require immediate human attention. Use the toggle to suppress paging for informational or low-severity alerts.
- **Align rules with your service directory:** Alert rules rely on service mappings. If a service is not in the directory or is mapped to the wrong team, routing fails silently.
- **Test end-to-end:** Send a test alert from your monitoring tool and verify that it matches the correct rule, pages the right person, and uses the expected escalation policy.
- **Review rules regularly:** As services are added, renamed, or retired, update your route alerts to stay in sync.

---

## Next steps

- Go to [Integrate with the Service Directory](/docs/ai-sre/oncall/integrate-service-directory) to map services to on-call teams.
- Go to [Configure Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to define the escalation chains that alert rules invoke.
