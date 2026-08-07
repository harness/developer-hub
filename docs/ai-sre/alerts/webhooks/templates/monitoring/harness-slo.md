---
title: Harness SLO Integration Webhook Template
description: Receive SLO violation alerts.
sidebar_label: Harness SLO Webhook Template
sidebar_position: 7
keywords:
  - Harness SLO
  - webhook
  - monitoring
  - alerts
  - AI SRE
  - error budget
tags:
  - ai-sre
  - webhooks
  - monitoring
---

Configure Harness SLO integration to receive service level objective violation alerts in Harness AI SRE.

## Overview

Harness SLO provides:
- **Error budget alerts:** Automated notifications when error budgets are depleted
- **SLO violation tracking:** Monitor error budget remaining percentage and minutes
- **Burn rate monitoring:** Track error budget consumption rate
- **Service correlation:** Link alerts to monitored services and SLOs
- **Cross-module integration:** Connect Service Reliability Management with AI SRE

---

## Set up Harness SLO integration

### Step 1: Create webhook integration in AI SRE

Create the webhook endpoint in Harness AI SRE:

1. Navigate to **Integrations** in the main menu.
2. Click **New Integration**.
3. Select **Harness SLO** from the template options under Alert type.
4. Enter a name for the integration.
5. Click **Save** to generate the webhook endpoint.
6. Copy the generated webhook URL from the integration configuration page.

### Step 2: Configure SLO notification rule in SRM

Configure the notification rule in Service Reliability Management to send alerts to the webhook:

1. In your Harness account, navigate to **Service Reliability** > **SLOs**.
2. Select the SLO for which you want to send alerts to AI SRE.
3. In the **Error Budget Policy** section, click **+ New Notification Rule**.
4. Enter a name for the notification rule, then click **Continue**.
5. Configure the condition that should trigger the alert:
   - **Error Budget remaining percentage:** Alert when remaining budget reaches a threshold
   - **Error Budget remaining minutes:** Alert when remaining minutes depletes to a specific value
   - **Error budget Burn rate is above:** Alert when burn rate exceeds a threshold
6. In the **Notification Method** dropdown, select **Webhook**.
7. Paste the webhook URL copied from AI SRE in Step 1.
8. Click **Test** to verify the integration.
9. Click **Save**, then enable the notification rule.

---

## Example alert payload

```json
{
  "title": "Harness Incident Response",
  "description": "The remaining minutes for the error budget of SLO measure-p95-latency-for-cartservice-boutique-app are critically low under project matt_dev, in organization default.",
  "fields": [
    {
      "label": "SLO Status",
      "value": "Error Budget Remaining Minutes Critically Low"
    },
    {
      "label": "Account ID",
      "value": "y5XRnxw5TZ2S3S2hJnv6pQ"
    },
    {
      "label": "Account Name",
      "value": "Abhinav - Kitchen Sink License"
    },
    {
      "label": "Organization ID",
      "value": "default"
    },
    {
      "label": "Project ID",
      "value": "matt_dev"
    },
    {
      "label": "SLO URL",
      "value": "https://app.harness.io/ng/account/y5XRnxw5TZ2S3S2hJnv6pQ/module/ir/orgs/default/projects/matt_dev/slos/measurep95latencyforcartserviceboutiqueapp"
    },
    {
      "label": "SLO ID",
      "value": "measurep95latencyforcartserviceboutiqueapp"
    },
    {
      "label": "SLO Name",
      "value": "measure-p95-latency-for-cartservice-boutique-app"
    },
    {
      "label": "Incident Unix Timestamp",
      "value": "1738954696"
    },
    {
      "label": "Incident Time",
      "value": "Incident detected at Fri Feb 07 18:58:16 Z 2025"
    }
  ]
}
```

---

## Mapped alert fields

The following fields are extracted from Harness SLO alerts:

- **Title:** Alert summary from the SLO notification
- **Description:** Detailed message about the error budget status
- **SLO Status:** Current state of the error budget
- **Account Information:** Account ID and name
- **Organization and Project:** Context for the SLO
- **SLO URL:** Direct link to the SLO details in Harness
- **SLO Identifier:** Unique identifier and name for the SLO
- **Timestamp:** Unix timestamp and human-readable time of detection

---

## Use cases

### Error budget depletion

Configure alerts when error budgets reach critical thresholds to proactively address service reliability issues before SLO violations occur.

### Burn rate detection

Set up alerts based on error budget burn rate to detect anomalies in service health and respond before budgets are exhausted.

### Multi-service correlation

Combine SLO violation alerts with other monitoring data in AI SRE to identify cascading failures across dependent services.

---

## Next steps

- Go to [Composite SLO](/docs/service-reliability-management/slo/composite-slo) to create SLOs based on user journeys.
- Go to [Route Alerts](/docs/ai-sre/alerts/alert-rules/overview) to route Harness SLO alerts.
- Go to [Ingest Alerts Overview](/docs/ai-sre/alerts/webhooks/templates/overview) to view other integrations.
