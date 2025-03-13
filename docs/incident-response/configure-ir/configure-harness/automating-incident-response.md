---
title: Automating Incident Response
sidebar_label: Automating Incident Response
description: Learn how to configure automation triggers, enable Runbooks, and integrate external tools for streamlined incident response in Harness Incident Response.
---

# Automating Incident Response

Automation is a key component of **efficient incident response**, reducing manual intervention, minimizing resolution time, and ensuring consistency in handling incidents. Harness Incident Response allows teams to **set up automation triggers, execute Runbooks, and integrate with external tools** such as **Slack, PagerDuty, ServiceNow, FireHydrant, and VictorOps**.


## Enabling Runbooks for Automated Resolution

Runbooks automate response actions, reducing **manual effort** and ensuring **consistent** resolutions for common incidents.

### **Steps to Configure Runbook Automation:**
1. **Create a New Runbook:**
   - Navigate to **Runbooks** > **Create New**.
   - Enter a **Runbook Name** and a brief description.

2. **Define the Runbook Steps:**
   - Add predefined steps such as:
     - **Diagnostic Checks** (e.g., querying system logs).
     - **Service Restarts** (e.g., restarting failing microservices).
     - **Automated Rollback** (e.g., deploying a previous stable version).

3. **Set Execution Conditions:**
   - Choose whether the Runbook runs **manually** or **automatically** when certain triggers occur.

4. **Test and Deploy the Runbook.**

---

## Supported Communication Channels

Harness Incident Response integrates with multiple communication platforms to **ensure incident updates and collaboration in real time**:

| **Channel**      | **Use Case** |
|-----------------|-------------|
| **Slack**        | Notify teams, update incident statuses, and execute Runbooks. |
| **Microsoft Teams** | Post updates and automate notifications. |
| **Voice Alerts** | Enable automated voice call notifications for critical incidents. |
| **Chat Integrations** | Provide real-time updates via chatbot interactions. |

---
## Setting Up Automation Triggers

Incident response automation starts with **defining triggers** that execute predefined actions when incidents meet specific conditions.

### **Steps to Configure Automation Triggers:**

1. **Go to Automation Settings:**
   - Navigate to **Settings** > **Incident Response** > **Automation**.

2. **Define Trigger Conditions:**
   - Set conditions for **when automation should activate**, such as:
     - **Incident Creation** (e.g., automatically assign responders).
     - **Severity Level Escalation** (e.g., escalate when P1 incidents occur).
     - **Time-Based Actions** (e.g., trigger notifications after 15 minutes of no response).

3. **Choose Response Actions:**
   - Configure **automated response actions**, including:
     - Sending alerts to **Slack, Teams, PagerDuty, or VictorOps**.
     - Assigning an incident owner.
     - Executing predefined **Runbooks** for remediation.

4. **Test and Save the Configuration.**

---

## External Tool Integrations

Seamlessly integrate **third-party tools** for **automated incident resolution**:

| **Tool**          | **Integration Capabilities** |
|------------------|--------------------------------|
| **PagerDuty**    | Automatically escalate incidents and notify responders. |
| **ServiceNow**   | Create, update, and resolve ServiceNow incidents based on triggers. |
| **FireHydrant**  | Sync incidents and coordinate response efforts. |
| **VictorOps**    | Send real-time incident alerts and updates. |

### **How to Configure External Integrations**
1. **Navigate to Integrations:**  
   - Go to **Settings** > **Integrations**.
2. **Select the Desired Tool:**  
   - Choose **PagerDuty, ServiceNow, FireHydrant, or VictorOps**.
3. **Authenticate and Authorize:**  
   - Provide API credentials or OAuth authorization.
4. **Configure Incident Actions:**  
   - Define what happens when an incident is triggered (e.g., notify a PagerDuty on-call responder).
5. **Save and Test the Integration.**

---

## API Integrations for Extending Automation

For advanced customization, teams can **extend incident automation** by leveraging Harness Incident Response APIs.

### **Common API Use Cases:**
✅ Automatically create incidents from monitoring tools.  
✅ Query incident data to build custom dashboards.  
✅ Trigger Runbooks based on external conditions.  
✅ Push updates to custom-built notification systems.  

### **Example API Call: Create an Incident**
```json
POST /api/ir s
{
  "title": "Service Degradation",
  "severity": "P1",
  "assigned_team": "SRE Team",
  "source": "Monitoring System"
}
```
For a full list of API endpoints, see the API Documentation.

⸻

Next Steps

Now that automation is enabled, explore these related topics:
- Configuring AI-Powered Incident Insights
- Creating and Executing Runbooks
- Integrating AI Summaries into Slack & Teams
