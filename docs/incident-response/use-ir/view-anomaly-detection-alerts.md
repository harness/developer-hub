---
title: Viewing Real-Time Anomaly Detection Alerts in IR
sidebar_label: Real-Time Anomaly Detection
description: Learn how to monitor and analyze real-time anomaly detection alerts in Harness Incident Response.
---

# Viewing Real-Time Anomaly Detection Alerts in IR

Harness Incident Response (**IR**) provides **real-time anomaly detection** to proactively **identify, alert, and mitigate performance issues** before they escalate into full-blown incidents.

---

## Why Monitor Anomaly Detection Alerts?

✅ **Early issue detection** – Identify potential problems before they impact users.  
✅ **Improved response times** – Reduce incident resolution time with proactive insights.  
✅ **Enhanced visibility** – Detect unusual behavior across applications, infrastructure, and services.  
✅ **AI-powered insights** – IR correlates anomaly patterns with past incidents to improve accuracy.  

---

## Where to View Anomaly Detection Alerts

### **1. Incident Response Dashboard**
The **Incident Response Dashboard** displays **real-time anomaly alerts** alongside active incidents.

#### **Steps to View Anomalies:**
1. Go to **Incident Response** → **Dashboard**.
2. Locate the **Anomaly Detection** section.
3. View **live alerts** triggered by abnormal system behavior.
4. Click on an alert to **expand details**, including:
   - Affected service or component
   - Time of detection
   - Predicted impact level
   - Suggested mitigation steps

> **Example:** A **CPU utilization spike** beyond the expected threshold generates an anomaly alert.

---

### **2. Incident Timeline & Alert Context**
When an anomaly contributes to an incident, IR **automatically logs it in the Incident Timeline**.

#### **Steps to Review Anomaly Events in Incidents:**
1. Open an **Active Incident**.
2. Navigate to the **Incident Timeline**.
3. Look for **AI-detected anomalies**.
4. Expand an anomaly event to view:
   - The detected abnormal behavior.
   - How it correlates with past incidents.
   - Recommendations for resolution.

> **Tip:** AI insights **highlight patterns** of recurring anomalies for faster decision-making.

---

### **3. Slack & Microsoft Teams Notifications**
IR **sends anomaly detection alerts** to integrated communication tools like Slack and Microsoft Teams.

#### **Enabling Notifications:**
1. Go to **Settings** → **Notifications**.
2. Enable **Anomaly Detection Alerts** for Slack or Teams.
3. Configure alert conditions, such as:
   - **Service impact** (e.g., Database, API)
   - **Severity threshold** (e.g., High, Critical)
   - **Escalation rules** for major anomalies.

#### **Example Slack Notification:**

🚨 Anomaly Alert: Unexpected Memory Usage Spike in Database
🔹 Detected: 5 minutes ago
🔹 Predicted Impact: High
🔹 Suggested Action: Scale database instance

Tip: Use Slack commands like /ir  anomalies list to retrieve active anomaly alerts.

---

### **4. Monitoring via API & Webhooks**
For deeper integrations, IR provides API endpoints & webhooks to fetch anomaly detection data.

#### **Example API Call:**
```
GET /api/anomalies?service=api-gateway&severity=high
Authorization: Bearer {API_TOKEN}

Example JSON Response:

{
  "anomaly_id": "anomaly-12345",
  "service": "api-gateway",
  "detected_at": "2025-03-12T14:32:00Z",
  "impact_level": "High",
  "suggested_action": "Restart affected pods"
}
```

⸻

Best Practices for Monitoring Anomalies
   •  ✅ Set up anomaly alert thresholds – Customize alert conditions to avoid noise.
   •  ✅ Integrate with monitoring tools – Sync with Datadog, New Relic, and Prometheus for real-time insights.
   •  ✅ Leverage AI-powered recommendations – Use suggested remediation actions to speed up response.
   •  ✅ Monitor historical anomaly trends – Identify recurring patterns and optimize systems proactively.

⸻

Next Steps
   •  Setting Up Anomaly Detection in IR
   •  Configuring AI-Driven Incident Alerts
   •  Automating Anomaly-Triggered Remediation