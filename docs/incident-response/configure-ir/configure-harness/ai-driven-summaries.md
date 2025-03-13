---
title: Enabling AI-Driven Summaries & Incident Timelines
sidebar_label: AI-Driven Summaries & Incident Timelines
description: Learn how to configure AI-driven summaries and automatic incident timeline updates in Harness Incident Response.
---

# Enabling AI-Driven Summaries & Incident Timelines

Harness Incident Response provides **AI-driven summaries** and **real-time updates** to improve incident management efficiency. These features help teams **reduce manual effort, capture key insights**, and **ensure a complete historical record** of incident evolution.

## Overview

AI-driven summaries provide **real-time updates** on incident progress, automatically capturing key details from conversations, system logs, and manual updates. Incident timelines update dynamically, ensuring responders have the latest context.

## Configuring AI-Driven Summaries

To enable AI-driven incident summaries:

1. **Navigate to Incident Response Settings:**
   - Go to **Settings** > **Incident Response** > **AI Summaries**.

2. **Enable AI Summaries:**
   - Toggle on **Enable AI-Generated Incident Summaries**.

3. **Define Summary Triggers:**
   - Choose when AI should generate summaries (e.g., at incident creation, status updates, resolution).
   - Select supported communication channels (**Slack, Microsoft Teams, Email**).

4. **Customize Summary Format:**
   - Configure key fields to include in AI summaries (e.g., **affected services, root cause analysis, resolution actions**).

5. **Save Changes** and test the setup.

## Configuring Incident Timelines for Automatic Updates

Incident timelines **automatically track events** such as status changes, user comments, and AI-generated insights.

1. **Enable Timeline Auto-Updates:**
   - Go to **Settings** > **Incident Response** > **Incident Timeline**.
   - Toggle on **Enable Automatic Timeline Updates**.

2. **Select Events to Capture:**
   - Choose which events should be **automatically logged** in the timeline:
     - **Status changes** (e.g., "Investigating" → "Mitigated").
     - **New comments or analysis** from responders.
     - **AI-generated summaries**.
     - **Runbook execution logs**.

3. **Define Retention Policies:**
   - Set how long **incident timelines** should be retained for compliance and audit purposes.

## Example AI-Generated Incident Reports

Below are sample **AI-generated summaries** for incidents:

**Example 1: Service Degradation**

🚨 Incident #1234: API Latency Spike
- Detected: 12:34 PM UTC
- Root Cause: High database query load
- Resolution: Optimized query indexing, increased database connection pool
- Next Steps: Monitor performance metrics over the next 24 hours

**Example 2: Outage Resolution**

✅ Incident #5678: Service Restored
- Detected: 2:15 AM UTC
- Root Cause: Misconfigured deployment rollback
- Resolution: Fixed rollback scripts and redeployed
- Next Steps: Implement automated rollback validation

## Next Steps

Once AI-driven summaries and timelines are enabled, explore these related topics:

- [Configuring AI-Powered Incident Insights](#)
- [Automating Runbook Execution](#)
- [Integrating AI Summaries into Slack & Teams](#)


