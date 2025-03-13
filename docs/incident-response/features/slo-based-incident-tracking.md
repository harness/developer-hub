---
title: SLO-Based Incident Tracking and Planning
sidebar_label: SLO-Based Tracking
description: Learn how to track incidents and plan responses using SLOs in Harness Incident Response.
---

# SLO-Based Incident Tracking and Planning

Harness Incident Response (**IR**) enables teams to leverage **Service Level Objectives (SLOs)** to proactively track incidents and drive operational improvements.

---

## Why Use SLOs for Incident Tracking?

✅ **Proactive Incident Detection** – Identify issues **before they cause outages**.  
✅ **Data-Driven Response Planning** – Use **error budgets** to prioritize incident handling.  
✅ **Align Engineering & Business Goals** – Track **SLIs** to maintain user experience.  
✅ **Improve Post-Incident Analysis** – Use **historical SLO data** for root cause analysis.  

---

## How SLO-Based Tracking Works

### **1. Defining SLOs and SLIs**
- **Service Level Objectives (SLOs)** define the **acceptable performance level** for a service.
- **Service Level Indicators (SLIs)** track real-time **latency, availability, and reliability**.
- **Error budgets** help teams **balance feature velocity with reliability**.

### **2. Monitoring & Alerting Based on SLOs**
- IR **tracks SLO breaches** to detect early signs of degradation.
- Use **SLO-based alerting** to trigger **automated remediations**.
- **Example:** If error budget consumption exceeds **80%**, auto-create a **Jira ticket**.

### **3. Automating Work Item Creation Based on SLO Trends**
- If an SLO violation occurs, IR **automatically logs work items** in:
  - **Jira**
  - **ServiceNow**
  - **PagerDuty**
- Engineers receive **actionable insights** on **how incidents impact SLOs**.

---

## Where SLO-Based Tracking Helps in Incident Response

### **📌 Early Detection of Performance Issues**
- **Example:** API latency exceeds **200ms** → **IR triggers a scaling Runbook**.
- **Example:** Service availability drops **below 99.9%** → **Slack alert is sent**.

### **📌 Automating Incident Response**
- Define **automated actions** when **error budgets are exhausted**.
- IR can **escalate incidents** based on **SLO compliance trends**.

### **📌 Using AI to Predict Future SLO Violations**
- IR’s **AI models analyze past incidents** to predict future SLO breaches.
- Teams can proactively adjust capacity **before outages occur**.

---

## Example: SLO-Based Ticket Creation Workflow

```yaml
slo_monitor:
  name: API Latency SLO
  threshold: 200ms
  alert:
    - condition: "Latency > 200ms for 5 min"
      action: "create_ticket"
  integration:
    - jira: "Jira_Project"
    - slack: "Slack_Channel"
```
Example Execution Flow
	1.	📊 SLO Deviation Detected: API latency crosses 200ms threshold.
	2.	🚨 Incident Triggered: Error budget consumption exceeds 80%.
	3.	📌 Work Item Created: IR logs a Jira issue with details.
	4.	✅ Team Notified: Slack notification sent with AI-based resolution steps.

⸻

Best Practices for SLO-Based Tracking
-Use historical SLO trends – Identify patterns before incidents happen.
-Tie SLOs to incident response – Automate ticketing when error budgets deplete.
-Integrate monitoring tools – Connect Datadog, Prometheus, New Relic.
-Optimize error budgets – Adjust SLO targets dynamically based on service performance.

⸻

Next Steps
- Configuring SLO Alerts in IR
- Using AI to Predict SLO Breaches
- Automating Ticket Creation for SLO Violations

---

### **What This Includes:**
✅ **Overview of how SLOs help in incident response**  
✅ **Monitoring and alerting based on SLO breaches**  
✅ **Automating work item creation from SLO violations**  
✅ **Example YAML workflow for SLO-based tracking**  
✅ **Best practices for using SLOs in IR**  