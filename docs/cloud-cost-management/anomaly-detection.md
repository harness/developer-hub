---
title: Anomalies
description: Learn how to detect and manage unexpected changes in cloud spend using Harness CCM Anomaly Detection.
# sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What Are Cloud Cost Anomalies?
Harness CCM Anomaly Detection uses machine learning to identify unexpected spikes or drops in cloud spend. Anomalies are flagged when a resource's usage or cost significantly deviates from its historical pattern, for example, a dramatic cost increase caused by high traffic to a compute instance.

This might reflect:
- **Expected behaviour**, like traffic surging during a major live-streamed event.
- **Unexpected issues**, such as a misconfigured service or sudden scale-up.
- **False positives**, such as minor fluctuations in test environments.

To help teams stay in control, each anomaly can be reviewed, marked as **resolved** or **ignored**, and will be automatically **archived after 90 days**.

---

## Prerequisites
Before using CCM Anomalies, ensure the following:

- Your cloud infrastructure is connected to Harness using a [Cloud Cost Connector](/docs/cloud-cost-management/get-started/).
- Billing data ingestion is active and running for your cloud provider.
- You have appropriate permissions to access [Cost Reporting features](/docs/cloud-cost-management/use-ccm-cost-reporting/).

---

## Set Up anomaly detection
Harness starts detecting anomalies as soon as your billing data is available. Here's how to access and review anomalies:
<Tabs>
<TabItem value="Interactive Guide" label="Interactive Guide">
<DocVideo src="https://app.tango.us/app/embed/492131d4-a5ea-45e2-bf96-654db9ddf2f1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Detection in Harness CCM" />
</TabItem>
<TabItem value="Step-by-Step" label="Step-by-Step">
### 1. Navigate to Anomalies
- In Harness, go to **Cloud Cost Management > Anomalies**.
- You’ll see a list of anomalies with filters for **date**, **severity**, and **status**.

### 2. Review anomalies
Each anomaly contains:
- **Resource name**
- **Service and project**
- **Cloud provider**
- **Severity** (Low, Medium, High, or Critical)
- **Expected vs actual cost**
- **Detected date**

Use this data to assess if the anomaly is relevant or expected.

### 3. Mark as resolved or ignored
- Select an anomaly to view full details.
- Choose one of the following actions:
  - **Mark as Resolved** – the issue was investigated and acknowledged.
  - **Ignore** – typically used for low-value anomalies or noise.
  
Anomalies are archived automatically after **90 days**, regardless of resolution.
</TabItem>
</Tabs>

---

## Advanced Settings
<Tabs groupId="anomaly-settings">
<TabItem value="alerts" label="Alerts">

### Configure anomaly alerts
1. Go to **Cloud Cost Management > Anomalies > Alerts and Preferences**.
2. Enable **Daily Summary Emails** to get a digest of recent anomalies.
3. Add notification channels (email, Slack, etc.) under **Notification Rules**.

<DocVideo src="https://app.tango.us/app/embed/3536272f-5e99-4280-a983-81f710de4199?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Alerts in Harness CCM" />

</TabItem>
<TabItem value="preferences" label="Preferences">

### Configure preferences and thresholds
Harness uses ML models to determine expectations, but you can fine-tune detection thresholds.

1. In **Cloud Cost Management > Anomalies > Settings**, click **Thresholds**.
2. Adjust per-project or per-cloud service thresholds to minimize false positives.

<DocVideo src="https://app.tango.us/app/embed/1ccb1269-f454-40cc-876e-cb4ab0301896?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Anomaly Preferences in Harness CCM" />

</TabItem>
<TabItem value="severity" label="Severity Levels">

### Understand severity levels
Anomalies are categorized by severity based on deviation from expected behaviour:
- **Low**: Minor deviations, usually safe to ignore.
- **Medium**: Noticeable change—warrants review.
- **High**: Significant impact or deviation.
- **Critical**: Large cost jumps—requires immediate investigation.
</TabItem>
</Tabs>

---

## Summary
Harness CCM Anomaly Detection helps you catch unusual cloud spend early—before it escalates into a billing surprise. Whether it’s a traffic surge, misconfiguration, or billing error, anomalies surface the data you need to take action fast.

Harness gives you the tools to:
- Automatically detect and classify anomalies.
- Take action through review and resolution flows.
- Tailor notifications and thresholds to your environment.

Start using Anomalies to reconcile your cloud spend like a financial audit—review, tag, and archive with confidence.

---

Need help troubleshooting anomalies? Check out the [Anomaly Detection FAQ](/docs/cloud-cost-management/use-ccm-cost-reporting/anomaly-detection/a-detect-cloud-cost-anomalies-with-ccm#faqs).