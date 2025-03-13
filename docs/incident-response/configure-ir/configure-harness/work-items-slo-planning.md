---
title: Work Items & SLO-Based Planning
sidebar_label: Work Items & SLO-Based Planning
description: Learn how to configure work item synchronization and leverage SLO impact for automated ticketing.
---

# Work Items & SLO-Based Planning

Service Level Objectives (**SLOs**) are critical for measuring **service reliability**. Harness Incident Response (IR) allows teams to **create work items based on SLO impact**, ensuring that incidents affecting reliability are **tracked, assigned, and resolved efficiently**.

## How Incident Impact on SLOs Drives Work Item Creation

Work items can be **automatically generated** when an incident **violates an SLO threshold** or consumes an error budget. This ensures that teams take action on **service degradations before they escalate into outages**.

### **Steps to Enable SLO-Based Work Items:**
1. **Define SLOs for Critical Services:**
   - Navigate to **Service Reliability Management (SRM)**.
   - Set **SLO targets** (e.g., **99.9% uptime**) for key services.
   - Configure **error budgets** and burn rate alerts.

2. **Enable Work Item Creation for SLO Violations:**
   - Go to **Incident Response > Automation**.
   - Set a trigger:  
     - **Create a work item if SLO error budget drops below X%.**
     - **Generate an incident if response time exceeds Y seconds.**

3. **Map Incidents to Work Items:**
   - Link **SLO violations** to work items in **Jira, ServiceNow, or PagerDuty**.
   - Assign work items to the **relevant on-call teams**.

---

## Configuring Work Item Synchronization

Work items can be synchronized across **Jira, ServiceNow, PagerDuty**, and other tracking systems. This ensures that every incident is **captured, triaged, and addressed without manual intervention**.

### **Supported Work Item Synchronization Platforms**
| **Platform**    | **Functionality** |
|----------------|----------------|
| **Jira**        | Create and update issues for incident tracking. |
| **ServiceNow**  | Generate and sync tickets with real-time status updates. |
| **PagerDuty**   | Assign incidents to the appropriate on-call team. |

### **Steps to Configure Work Item Syncing:**
1. **Go to Integrations**  
   - Navigate to **Settings** > **Integrations**.
2. **Select Your Tracking System**  
   - Choose **Jira, ServiceNow, or PagerDuty**.
3. **Configure Synchronization Rules**  
   - Define what **triggers** a work item (e.g., SLO violation, severity threshold).
   - Set **field mappings** between Harness IR and your tracking tool.
4. **Enable Auto-Sync**  
   - Save and test synchronization.

---

## API Documentation for Custom Integrations & Automated Ticketing

Harness IR offers **API-driven automation** for custom integrations, enabling teams to **automate ticketing workflows**.

### **Example API Call: Creating a Work Item in Jira**
```json
POST /api/work-items
{
  "title": "SLO Violation: Increased Response Time",
  "description": "Response time exceeded SLO target",
  "priority": "High",
  "assigned_team": "SRE Team",
  "source": "SLO Monitoring System"
}

For a full list of API endpoints, visit the API Documentation.
```
⸻

Next Steps
- Automating Incident Response
- Integrating ServiceNow & PagerDuty for Ticketing
- Using AI for Work Item Prioritization