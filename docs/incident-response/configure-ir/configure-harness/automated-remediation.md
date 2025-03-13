---
title: Automated Remediation & Triggering Actions
sidebar_label: Automated Remediation
description: Learn how Harness Incident Response automates remediation actions, integrates with external tools, and triggers mitigation workflows.
---

# Automated Remediation & Triggering Actions

Harness Incident Response (**IR**) enables **automated remediation workflows** to **reduce manual intervention** and ensure **faster incident resolution**. By leveraging **Runbooks, AI-powered insights, and third-party integrations**, teams can proactively **mitigate incidents** and restore services.

---

## How IR Executes Remediation Actions Automatically

IR provides **event-driven remediation** by executing predefined **Runbooks and workflows** in response to incidents.

### **Key Benefits of Automated Remediation**
✅ **Reduces Mean Time to Resolution (MTTR)** by eliminating manual steps.  
✅ **Enforces consistency** with standardized response workflows.  
✅ **Minimizes human error** by automating repeatable remediation steps.  
✅ **Triggers rollback actions** to restore system health.  

### **How Automated Remediation Works**
1. **Incident triggers remediation workflow**  
   - Anomaly detection, alerting, or policy violations **trigger Runbooks**.  
2. **Runbook executes predefined actions**  
   - **Service restarts, database recovery, traffic rerouting, rollback deployments**.  
3. **Validation & Monitoring**  
   - Post-remediation monitoring confirms resolution.  
4. **Post-Incident Analysis**  
   - IR logs **actions, recommendations, and learnings**.  

---

## Using Runbooks to Trigger Mitigation Workflows

Runbooks **enable automated incident resolution** by executing predefined steps **without human intervention**.

### **Common Runbook Use Cases**
| **Scenario**                           | **Runbook Action** |
|----------------------------------------|--------------------|
| **Database Connection Failures**       | Restart DB services, validate query health. |
| **High CPU or Memory Usage**           | Scale up compute resources dynamically. |
| **Service Downtime Detected**          | Restart pods, trigger traffic failover. |
| **Deployment Impacting Performance**   | Rollback to last known stable release. |
| **Expired SSL Certificate**            | Auto-renew certificate, restart affected services. |

### **Steps to Configure a Remediation Runbook**
1. **Define Runbook Trigger Criteria**  
   - Based on **alerts, anomaly detection, policy violations**.  
2. **Configure Actions**  
   - Restart services, adjust configurations, execute scripts, or **trigger external APIs**.  
3. **Integrate with Monitoring Tools**  
   - Pull telemetry data from **Datadog, New Relic, Prometheus**.  
4. **Enable Approvals (Optional)**  
   - Require human review before execution.  
5. **Test & Validate**  
   - Ensure remediation works under **different failure scenarios**.  

---

## How IR Integrates with External Tools for Recovery

IR provides **seamless integration** with external remediation platforms, allowing teams to **extend their automation capabilities**.

### **Supported Integrations**
✅ **Incident Management** – PagerDuty, ServiceNow, FireHydrant, VictorOps  
✅ **Monitoring & Observability** – Datadog, New Relic, Splunk, Prometheus  
✅ **CI/CD & Infrastructure** – Kubernetes, Terraform, AWS Lambda  
✅ **ITSM & Ticketing** – Jira, ServiceNow  

### **Example: ServiceNow Integration for Automated Recovery**
1. Incident **creates a ServiceNow ticket**.  
2. IR **assesses impact** using AI-driven telemetry.  
3. Runbook **triggers corrective actions** (e.g., scaling services).  
4. IR **updates ticket** with remediation status & logs.  

---

## Configuring Automated Remediation Workflows

To enable **end-to-end remediation**, teams must configure **event-driven workflows** in IR.

### **Steps to Set Up Automated Remediation**
1. **Define Incident Triggers**
   - Link **alerts, SLO breaches, anomaly detection events** to remediation actions.
2. **Select Remediation Actions**
   - Choose between **Runbooks, external APIs, rollback workflows**.
3. **Integrate Monitoring & ITSM**
   - Connect observability tools to **track post-remediation impact**.
4. **Enable AI-Based Decision Making**
   - Use **AI recommendations** to validate remediation actions.
5. **Test & Deploy**
   - Run **simulated failure scenarios** to validate response workflows.

---

## Next Steps

- [Creating Runbooks for Incident Resolution](#)  
- [Integrating ITSM & Monitoring Tools](#)  
- [Using AI for Automated Remediation](#)  