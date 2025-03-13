---
title: Using Microsoft Teams, Slack, or Voice Integrations in IR
sidebar_label: Communication Integrations in IR
description: Learn how to integrate and use Microsoft Teams, Slack, and voice communications in Harness Incident Response.
---

# Using Microsoft Teams, Slack, or Voice Integrations in Harness IR

Harness Incident Response (**IR**) integrates with **Slack, Microsoft Teams, and voice communication tools** to streamline collaboration, automate notifications, and enhance real-time incident management.

---

## Why Use Communication Integrations?

✅ **Centralizes incident collaboration** – All responders receive updates in their preferred platform.  
✅ **Automates incident notifications** – Reduce manual alerts by pushing key updates automatically.  
✅ **Enables chat-driven incident management** – Take incident actions directly from Slack or Teams.  
✅ **Supports AI-driven interactions** – AI summarizes incidents in chat and assists with resolution.  

---

## Setting Up Slack, Microsoft Teams, and Voice Integration

### **1. Configure Slack for Harness IR**
Harness IR integrates with Slack to enable:
- **Incident notifications & status updates**  
- **Slash commands (`/ir `) for quick actions**  
- **AI-generated summaries and automated responses**  

#### **Steps to Connect Slack:**
1. Navigate to **Settings** → **Communication & Integrations**.
2. Click **Slack** → **Connect Workspace**.
3. Select the **Slack workspace** and grant necessary permissions.
4. Choose the **default Slack channel** for incident notifications.
5. Save settings and test the connection.

Once connected, incidents can be **managed directly from Slack** using commands like:

/ir  create
/ir  status
/ir  resolve

> **Note:** AI-generated summaries can be posted to incident Slack channels.

---

### **2. Configure Microsoft Teams for Harness IR**
Microsoft Teams integration enables:
- **Automated incident notifications in Teams channels**  
- **Interactive incident management via Teams messages**  
- **Integration with Runbooks for automated response**  

#### **Steps to Connect Microsoft Teams:**
1. Go to **Settings** → **Communication & Integrations**.
2. Click **Microsoft Teams** → **Connect Account**.
3. Authorize Harness IR to access Teams.
4. Select a **default Teams channel** for incident updates.
5. Save settings and verify connection.

> **Tip:** You can **mention the IR bot** in Teams to trigger incident actions.

---

### **3. Configure Voice Alerts & Notifications**
Harness IR supports **voice-based alerts** to notify on-call teams during critical incidents.

#### **Steps to Enable Voice Alerts:**
1. Navigate to **Settings** → **Notifications & Alerts**.
2. Select **Voice & Call Alerts**.
3. Add a **phone number list** for on-call responders.
4. Define escalation rules for when alerts should be triggered.
5. Save settings and test an alert.

> **Example:** During a **P1 incident**, Harness IR can **call on-call responders** if no action is taken in Slack or Teams within a defined timeframe.

---

## Best Practices for Communication Integrations
- ✅ **Use Slack for real-time chat-driven incident management.**  
- ✅ **Leverage Microsoft Teams for structured collaboration and Runbook execution.**  
- ✅ **Enable voice alerts for critical incidents requiring immediate response.**  
- ✅ **Combine AI-driven summaries with Slack & Teams notifications.**  

---

## Next Steps
- [Configuring Automated Incident Notifications](#)  
- [Using AI Summaries in Slack & Teams](#)  
- [Setting Up On-Call Voice Alerts](#)  