---
title: Overview
description: Administrator guide for setting up on-call management in Harness AI SRE, including schedules, escalation policies, alert rules, and team configuration.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/incident-response/oncall/oncall
---

# Overview

This section covers the administrative setup required to get your organization's on-call management running in Harness AI SRE. 

Once configured, your team members will be able to receive pages, acknowledge incidents, and collaborate across web, mobile, and Slack.

## Setup Sequence

Complete these tasks in order to stand up on-call for your organization:

| Step | Task | Description |
| --- | --- | --- |
| 1 | [Integrate with the Service Directory](./integrate-service-directory) | Connect Harness CD services and map them to teams |
| 2 | [Create On-Call Schedules](./create-oncall-schedules) | Build rotation schedules with time zones, patterns, and overrides |
| 3 | [Define Escalation Policies](./define-escalation-policies) | Set up multi-level escalation chains with timeouts and retries |
| 4 | [Configure Alert Rules](./configure-alert-rules) | Route monitoring alerts to the correct on-call teams automatically |
| 5 | [Manage Teams and Notifications](./manage-teams-and-notifications) | Define team structures, assign routing rules, and configure notification channels |