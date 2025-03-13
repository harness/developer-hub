---
title: Monitoring & Anomaly Detection
sidebar_label: Monitoring & Anomaly Detection
description: Learn how to set up anomaly detection, integrate with CI/CD and Kubernetes, and enable automated rollbacks.
---

# Monitoring & Anomaly Detection

Proactively identifying **anomalies in applications and infrastructure** is key to preventing incidents before they impact users. Harness Incident Response (**IR**) leverages **machine learning (ML)** and integrations with observability tools to detect **early warning signals** and automate **remediation workflows**.

---

## Setting Up Anomaly Detection for Applications & Infrastructure

Anomaly detection in **Harness IR** helps teams identify **unexpected behavior, performance degradation, or security issues** before they escalate into full-blown outages.

### **Steps to Enable Anomaly Detection**
1. **Define Key Metrics & SLOs**
   - Identify critical **latency, error rates, and throughput** indicators.
   - Set **SLO targets** and alert thresholds.

2. **Integrate Monitoring Tools**
   - Connect **Datadog, New Relic, Prometheus, or Splunk**.
   - Define **custom anomaly detection rules**.

3. **Configure AI-Based Anomaly Alerts**
   - Use **ML-driven pattern recognition** to identify unusual trends.
   - Set up alerts for **spikes in error rates, CPU usage, or network latency**.

4. **Trigger Automated Incident Creation**
   - Generate incidents automatically when **anomalies breach SLOs**.
   - Correlate alerts across **multiple monitoring sources**.

---

## ML-Based Verification for Anomaly Detection

Harness IR supports **machine learning (ML)-based anomaly detection** to **automate incident detection and triage**.

### **How ML-Based Verification Works**
✅ **Learns from historical data** to identify patterns of normal behavior.  
✅ Detects **deviations from baseline performance** in real-time.  
✅ **Reduces noise** by filtering out false positives.  
✅ Prioritizes incidents based on **impact and severity**.

### **Example ML Use Cases**
| **Use Case**                         | **Example Scenario** |
|--------------------------------------|----------------------|
| **Traffic Spike Detection**          | Sudden surge in API calls triggering infrastructure scaling. |
| **Error Rate Anomalies**             | Error budget consumption exceeding 50% in an hour. |
| **Memory Leak Prediction**           | Increasing memory usage across deployments before a crash. |
| **Unusual Deployment Impact**        | A new release causes **5x increase in latency** compared to previous versions. |

---

## Integration with Kubernetes & CI/CD for Real-Time Monitoring

Harness IR integrates with **Kubernetes and CI/CD pipelines** to **track real-time changes** and detect anomalies caused by deployments.

### **How to Enable CI/CD & Kubernetes Integration**
1. **Connect IR to Your Kubernetes Cluster**
   - Use **Harness Cloud Cost Management (CCM)** to track **resource utilization**.
   - Enable **real-time monitoring of pod restarts, scaling events, and failures**.

2. **Enable Deployment Change Monitoring**
   - Track **every code deployment and configuration change**.
   - Correlate **deployments with performance anomalies**.

3. **Detect & Roll Back Faulty Deployments**
   - Identify performance degradation after a **new release**.
   - **Automatically roll back deployments** when anomalies exceed thresholds.

---

## Examples of Automated Rollback Scenarios

Harness IR can **automate rollback actions** when anomalies are detected, minimizing service disruptions.

### **Common Automated Rollback Scenarios**
| **Scenario**                          | **Rollback Action** |
|--------------------------------------|--------------------|
| **Increased Latency Post-Deploy**    | Revert to previous stable release. |
| **Memory Leak Detected**             | Restart affected pods. |
| **Database Query Performance Issues** | Scale up database resources or revert query optimizations. |
| **Configuration Error in Kubernetes** | Apply last known good configuration. |

---

## Next Steps

- [Integrating Observability Tools](#)
- [Configuring Automated Rollbacks](#)
- [Using AI to Detect Early Warning Signs](#)