---
title: How to Enable AI-Driven Summaries for Incidents
sidebar_label: AI-Driven Incident Summaries
description: Learn how to enable and configure AI-driven summaries for incident response in Harness Incident Response.
---

# How to Enable AI-Driven Summaries for Incidents

Harness Incident Response (**IR**) provides **AI-powered incident summaries** to **automate real-time insights, reduce manual effort, and improve decision-making**. AI-driven summaries extract critical information from incident discussions, chat logs, and event data.

---

## Why Enable AI-Driven Summaries?

✅ **Automates incident documentation** – AI extracts key details from discussions and logs.  
✅ **Enhances situational awareness** – Responders get real-time updates without manually compiling information.  
✅ **Improves post-incident analysis** – AI-generated summaries provide a structured incident history.  
✅ **Reduces time spent on reporting** – No need to manually compile postmortems.  

---

## Steps to Enable AI-Driven Incident Summaries

### **Step 1: Enable AI Summaries in Harness IR**
1. Navigate to **Settings** in the Incident Response module.
2. Select **AI & Automation** from the left-hand menu.
3. Toggle **Enable AI-Driven Summaries** to **ON**.
4. Define the **data sources** for AI analysis:
   - **Slack conversations**  
   - **Zoom transcriptions**  
   - **Incident comments & logs**  
   - **External monitoring alerts**  

### **Step 2: Configure Summary Triggers**
1. Navigate to **Incident Workflows**.
2. Select **Automation Rules**.
3. Click **New Rule** and configure:
   - **Trigger Event** → Incident creation, status change, major incident declaration.  
   - **Summary Output** → Choose **AI-generated summary** as an action.  
4. Save and apply the automation rule.

### **Step 3: Review AI-Generated Summaries**
- Once enabled, AI will automatically generate summaries at key incident stages.
- Summaries will be posted in **Slack, Incident Timeline, and Summary Reports**.
- Users can **edit or enhance summaries manually** if needed.

---

## Example of AI-Generated Incident Summaries

### **Before AI Summaries**
Manually written incident summary:  

_"An issue was reported in the payment processing service. Logs indicate a connection timeout. After investigation, it was found that the database cluster was experiencing high latency. The database was restarted, and the issue was resolved."_

### **After AI-Driven Summaries**
AI-generated summary:  

_"Payment processing experienced a connection timeout due to high database latency. Root cause traced to a performance degradation in the DB cluster. Restart action restored normal operations. Monitoring for anomalies over the next 24 hours."_  

---

## Where AI Summaries Appear
- **Slack Notifications** → AI posts summaries in incident Slack channels.  
- **Incident Timeline** → AI updates timelines with key findings and resolution steps.  
- **Incident Summary Reports** → Used for postmortems and learning reviews.  

---

## Next Steps
- [Using AI to Enhance Incident Response](#)  
- [Configuring Automated Incident Reporting](#)  
- [Leveraging AI in Slack & Zoom](#)  