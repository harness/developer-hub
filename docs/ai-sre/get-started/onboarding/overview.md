---
title: AI SRE Onboarding Guide for Administrators
description: How administrators set up AI SRE for their team.
sidebar_label: Overview
sidebar_position: 1
redirect_from:
- /docs/ai-sre/get-started/onboarding-guide-admins
keywords:
  - ai sre
  - incident response
  - getting started
  - onboarding
tags:
  - ai-sre
  - getting-started
---

import DocImage from '@site/src/components/DocImage';

This guide introduces you to the capabilities of Harness AI SRE, providing a comprehensive approach to proactively managing and resolving incidents with real-time insights, alerts, and seamless integration.

When you configure AI SRE in Harness, you orchestrate intelligent incident detection, automated response workflows, and collaborative resolution processes across your monitoring and communication tools.

## Prerequisites

Before beginning the walkthroughs in this guide, ensure you have:

| Item | Details / Link |
| --- | --- |
| Harness account | AI SRE Feature flag enabled (contact your sales representative or reach out to the team at [support@harness.io](mailto:support@harness.io)) |
| Monitoring tools | Integration with monitoring systems like Datadog, New Relic, or Grafana |
| Communication platforms | Slack, Microsoft Teams, or Zoom for incident collaboration |
| On-call management | PagerDuty, OpsGenie, or similar on-call scheduling tools (optional) |

:::info supported tools & platforms
Go to [What's supported with Harness AI SRE](/docs/ai-sre/resources/whats-supported) for a full list of supported **monitoring & observability** tools, **communication & collaboration** platforms, and **on-call & escalation management** tools.
:::

---

## Onboarding steps

Follow these steps to get started with AI SRE:

1. **[Integrate Tools](/docs/ai-sre/get-started/onboarding/integrate-tools):** Connect your collaboration and monitoring tools.
2. **[Set Up Incident Types](/docs/ai-sre/get-started/onboarding/setup-incident-types):** Define incident types and severity levels.
3. **[Configure Webhooks](/docs/ai-sre/get-started/onboarding/configure-webhooks):** Enable external tools to create alerts.
4. **[Create Runbooks](/docs/ai-sre/get-started/onboarding/create-runbooks):** Automate incident response workflows.
5. **[Expression Languages](/docs/ai-sre/get-started/onboarding/expression-languages):** Learn about CEL and Mustache for dynamic content.

---

## Next steps

After completing the onboarding steps, enhance your incident response capabilities:

- Go to [Managing Incidents in Slack](/docs/ai-sre/get-started/slack-commands) to use Slack slash commands for incident management.
- Go to [Advanced Runbooks](/docs/ai-sre/runbooks/create-runbook) to build sophisticated automation workflows.
- Go to [Integration Library](/docs/category/integrations) to connect with ServiceNow, Jira, and other ITSM tools.
- Go to [AI Scribe Agent](/docs/ai-sre/ai-agent) to leverage AI-powered documentation and insights.
