---
title: Create Incidents
sidebar_label: Create Incidents
description: Learn how to create incidents manually or automatically in Harness Incident Response.
---

# Create Incidents

Incidents in **Harness Incident Response** coordinate team members across work channels, centralizing investigation and resolution efforts.

Each incident maintains a **timeline** of updates, including **comments from users, automation triggers, and service integration updates**. Incidents can be generated through automation, integrations, or manual creation.

## **Ways to Create an Incident**

Incidents can be initiated in three different ways:

### **1. Alerts (Automated Incident Creation)**
Incidents can be **automatically created** when alerts match predefined rules.

- **Alert Rules**: Incoming alerts trigger incidents based on **configured conditions**.  
- **Webhooks**: External services send alerts to Harness Incident Response.  
- **Configuration Required**: See [Configuring Alerts & Webhooks](/docs/ir-response/configure-ir/setup-integrations).  

### **2. Slack Commands**
Incident responders can use **Harness IR Slack commands** to create incidents from Slack.

- **Example:**  
```
  /ir new
```
:::info
If your organization uses Slack for incident response, ensure that an admin has completed the necessary [Slack configuration](docs/ir-response/configure-ir/configure-comms-tools/set-up-slack) to enable seamless communication and automation.
:::

### **3. Manual Incident Creation**

Incident responders can manually create incidents via the Harness Incident Response UI.

Steps to Manually Create an Incident
	1.	In the Incident Response module, choose Incidents from the side menu
	2.	Click New Incident in the top right corner of the UI.
	2.	Select an Incident Type – Your admin may have pre-configured different incident types.
	3.	Define the Incident – Fill in the required fields.
	4.	(Optional) Enable Quiet Mode to prevent notifications (useful for testing workflows).
	5.	Confirm the Incident by clicking Create.

:::info
What is Quiet Mode?
Quiet mode prevents user notifications, on-call pages, and automated messages from being sent. This is useful when testing webhook or incident flows during configuration.
:::

Tracking & Resolving the Incident

Once the incident is created, you can:
- Monitor its progress in the Incident Timeline.
- Trigger runbooks to accelerate resolution.
- Communicate in Slack for updates and collaboration.

⸻

Next Steps

- [Run Automations](#)
- [Use the Timeline to Track Incidents](#)
- [Use Slack Commands for Incident Management](#)