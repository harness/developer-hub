---
title: Configure Alert Rules
description: Set up automatic alert routing rules in Harness AI SRE to page the correct on-call team when monitoring alerts fire.
sidebar_label: Configure Alert Rules
sidebar_position: 5
---

# Configure Alert Rules

Alert rules connect incoming monitoring alerts to the correct on-call team. 

When an alert fires, AI SRE evaluates your rules to determine whether to page a responder and which escalation policy to use.

## Create an Alert Rule

1. Navigate to **On-Call** → **Alert Rules**.
2. Click **Create Alert Rule**.
3. Configure the rule:
   - **Name** — A descriptive name (e.g., "Payments Alerts → Payments On-Call").
   - **Service** — Select the service this rule applies to. The service list is populated from the [service directory](./integrate-service-directory.md).
   - **Paging toggle** — Enable to automatically page the on-call responder when this rule matches. Disable to log the alert without paging.
   - **Escalation policy** — Select which escalation policy to invoke when this rule triggers.
4. Click **Save**.

## How Alert Routing Works

1. An alert arrives from a monitoring integration (Datadog, New Relic, Grafana, etc.).
2. AI SRE extracts the **impacted service** from the alert payload.
3. The system evaluates your alert rules to find a **matching service**.
4. If the matching rule has paging enabled, the **escalation policy** is invoked, which identifies the current on-call responder and sends notifications.

If no alert rule matches the incoming service, the alert is logged but no page is triggered.

## Configure Default and Impacted Services

Each alert rule can be configured with:

- **Default service** — The service assumed if the alert payload doesn't include a service identifier.
- **Impacted service** — Extracted automatically from the alert payload when available, overriding the default.

This lets you handle both well-structured alert payloads and those that lack service metadata.

## Best Practices

- **Create specific rules per service** — Broad, catch-all rules risk paging the wrong team. Map each production service to its own alert rule.
- **Be deliberate with the paging toggle** — Not every alert should wake someone up. Enable paging only for alerts that require immediate human attention. Use the toggle to suppress paging for informational or low-severity alerts.
- **Align rules with your service directory** — Alert rules rely on service mappings. If a service isn't in the directory or is mapped to the wrong team, routing will fail silently.
- **Test end-to-end** — Send a test alert from your monitoring tool and verify that it matches the correct rule, pages the right person, and uses the expected escalation policy.
- **Review rules regularly** — As services are added, renamed, or retired, update your alert rules to stay in sync.