---
title: How to Trigger Runbook Automation
sidebar_label: Triggering Runbook Automation
description: Learn how to trigger Runbook automation for efficient incident resolution in Harness Incident Response.
---

# How to Trigger Runbook Automation

Harness Incident Response (**IR**) allows teams to **automate incident resolution** by leveraging **Runbook automation**. Runbooks provide predefined workflows that execute **automated actions** based on specific triggers.

---

## Why Use Runbook Automation?

**Reduces manual effort** – Automates response actions without requiring human intervention.  
**Ensures consistency** – Standardized workflows ensure repeatable and predictable incident handling.  
**Speeds up resolution** – Faster incident response by automating key mitigation steps.  
**Integrates with external tools** – Supports integrations with Jira, ServiceNow, Slack, Microsoft Teams, and more.  

---

## How to Trigger Runbook Automation

### **1. Automatically Trigger Runbooks from an Incident or Alert**
Runbooks can be configured to **automatically execute** when a new incident or alert meets predefined conditions.

#### **Steps to Configure Automatic Runbook Triggers:**
1. Navigate to **Runbooks** →
2. Edit an existing runbook or [create a new one](#)
	- Select the Trigger tab
3. Define trigger conditions, such as:
   - **Incident severity** (e.g., P1 or P2)
   - **Service impacted** (e.g., API Gateway, Database)
   - **Specific integration type** (e.g., Integration:Datadog)
4. Click **Save** to apply the trigger rule.

> **Example:** If an incident is categorized as **Sev0**, a **Runbook can automatically scale additional resources** to mitigate impact.

### **2. Manually Trigger a Runbook from an Active Incident or Alert**
Teams can **manually trigger** Runbooks to **execute predefined actions** during an active incident or an alert.

#### **Steps to Manually Trigger a Runbook:**
1. Open the **Incident or Alert Details** page.
2. Click **Runbooks**.
3. Select **Execute Additional Runbook** and choose from the available list.
4. Confirm execution to **initiate**.
5. Track Runbook progress in the **Timeline**.

⸻

Best Practices for Using Runbook Automation
- Use automatic triggers for predictable and repeatable resolutions.
- Ensure Runbooks are thoroughly tested before deployment.
- Integrate with monitoring tools to trigger Runbooks based on alerts.
- Leverage AI-powered insights to determine the most effective Runbook action.

⸻

Next Steps
- [Configuring Automated Incident Response](#)
- [Integrating Runbooks with Monitoring Tools](#)
- [Using AI Insights to Trigger Runbook Actions](#)