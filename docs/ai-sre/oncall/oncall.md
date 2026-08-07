---
title: Overview
description: Administrator guide for setting up on-call management, including schedules, escalation policies, route alerts, and team configuration.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/oncall/oncall
---

This section covers the administrative setup required to get your organization's on-call management running in Harness AI SRE.

Once configured, your team members can receive pages, acknowledge incidents, and collaborate across web, mobile, and Slack.

## Setup sequence

Complete these tasks in order to stand up on-call for your organization:

| Step | Task | Description |
| --- | --- | --- |
| 1 | [Integrate with the Service Directory](/docs/ai-sre/oncall/integrate-service-directory) | Connect Harness CD services and map them to User Groups |
| 2 | [Configure On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) | Build rotation schedules with time zones, patterns, and overrides |
| 3 | [Configure Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) | Set up multi-level escalation chains with timeouts and retries |
| 4 | [Route Alerts](/docs/ai-sre/oncall/configure-alert-rules) | Route monitoring alerts to the correct on-call teams automatically |
| 5 | [Configure On-Call Teams and Routing](/docs/ai-sre/oncall/manage-teams-and-notifications) | Define team structures, assign routing rules, and configure notification channels |
| 6 | [Configure Service Paging Webhooks](/docs/ai-sre/oncall/service-paging-webhook) | Configure external monitoring tools, legacy systems, and custom applications to trigger on-call notifications by sending alerts directly to a service |
| 7 | [Configure Notification Fallback](/docs/ai-sre/oncall/notification-fallback) | Configure multi-channel notification fallback with automatic retry logic |

---

## Next steps

- Go to [Integrate with the Service Directory](/docs/ai-sre/oncall/integrate-service-directory) to connect Harness CD services and map them to User Groups.
- Go to [Configure On-Call Schedules](/docs/ai-sre/oncall/create-oncall-schedules) to build rotation schedules for your teams.
- Go to [Configure Escalation Policies](/docs/ai-sre/oncall/define-escalation-policies) to set up multi-level escalation chains.
