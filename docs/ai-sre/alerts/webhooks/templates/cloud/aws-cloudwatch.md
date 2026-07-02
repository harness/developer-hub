---
title: AWS CloudWatch Integration Webhook Template
description: Configure AWS CloudWatch integration for Harness AI SRE to receive metric alarms and monitoring alerts.
sidebar_label: AWS CloudWatch Webhook Template
sidebar_position: 3
---

# AWS CloudWatch Integration Webhook Template

Configure AWS CloudWatch integration to receive metric alarms and monitoring alerts in Harness AI SRE.

## Overview

AWS CloudWatch provides:
- **Metric alarms**: Threshold-based alerting on AWS metrics
- **Composite alarms**: Combine multiple alarms with boolean logic
- **Log insights**: Query and analyze log data
- **Cross-account monitoring**: Monitor resources across AWS accounts
- **Resource health**: Track AWS service and resource status

---

## Set up AWS CloudWatch integration

1. Navigate to **Integrations** in the main menu
2. Click **New Integration**
3. Select **AWS CloudWatch** from the template options
4. Enter a name and generate an ID
5. Copy the generated webhook URL
6. In your AWS console, configure an SNS topic or EventBridge rule to send CloudWatch alarms to the webhook URL
7. Configure payload mapping to match CloudWatch alarm fields to Harness AI SRE fields
8. Set up route alerts to route and filter incoming CloudWatch alarms

---

## Example Alert Payload

```json
{
  "version": "0",
  "id": "12345678-1234-1234-1234-123456789012",
  "detail-type": "CloudWatch Alarm State Change",
  "source": "aws.cloudwatch",
  "account": "123456789012",
  "time": "2025-03-16T15:00:00Z",
  "region": "us-west-2",
  "resources": [
    "arn:aws:cloudwatch:us-west-2:123456789012:alarm:HighCPUAlarm"
  ],
  "detail": {
    "alarmName": "HighCPUAlarm",
    "state": {
      "value": "ALARM",
      "reason": "Threshold Crossed: 1 datapoint [99.5 (16/03/25 14:55:00)] was greater than the threshold (90.0).",
      "reasonData": "{\"version\":\"1.0\",\"queryDate\":\"2025-03-16T15:00:00.000+0000\",\"startDate\":\"2025-03-16T14:55:00.000+0000\",\"statistic\":\"Average\",\"period\":300,\"recentDatapoints\":[99.5],\"threshold\":90.0}",
      "timestamp": "2025-03-16T15:00:00.000+0000"
    },
    "configuration": {
      "description": "CPU usage has exceeded 90%",
      "metrics": [
        {
          "id": "m1",
          "metricStat": {
            "metric": {
              "namespace": "AWS/EC2",
              "name": "CPUUtilization",
              "dimensions": {
                "InstanceId": "i-1234567890abcdef0"
              }
            },
            "period": 300,
            "stat": "Average"
          },
          "returnData": true
        }
      ]
    }
  }
}
```

---

## Next Steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route CloudWatch alerts.
- Go to [Ingest Alerts Overview](../overview.md) to view other integrations.
