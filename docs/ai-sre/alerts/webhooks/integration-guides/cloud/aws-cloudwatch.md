---
title: AWS CloudWatch Integration Guide
description: Configure AWS CloudWatch alarms to send webhooks to Harness AI SRE via SNS.
sidebar_label: AWS CloudWatch
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure AWS CloudWatch to Send Webhooks

Configure AWS CloudWatch alarms to send webhook notifications to Harness AI SRE using Amazon SNS with HTTPS subscription.

## Before you begin

- **Harness webhook endpoint**: Create an AWS CloudWatch webhook in Harness AI SRE using the [AWS CloudWatch webhook template](../../templates/cloud/aws-cloudwatch.md).
- **AWS permissions**: Access to create SNS topics, CloudWatch alarms, and manage subscriptions.
- **Webhook URL**: Copy the webhook URL from your Harness webhook configuration.
- **CloudWatch alarms documentation**: Go to [CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html) to understand alarm configuration.
- **SNS HTTPS subscriptions**: Go to [SNS HTTPS Subscriptions](https://docs.aws.amazon.com/sns/latest/dg/sns-http-https-endpoint-as-subscriber.html) for subscription setup details.

---

## Architecture overview

CloudWatch alarms → SNS Topic → HTTPS Subscription → Harness Webhook

CloudWatch does not send webhooks directly. Use Amazon SNS as an intermediary:

1. CloudWatch alarm state changes
2. Alarm publishes to SNS topic
3. SNS sends HTTPS POST to Harness webhook
4. Harness processes the alert

---

## Create SNS topic

### Navigate to SNS

1. Open AWS Console and go to **Simple Notification Service (SNS)**
2. Click **Topics** → **Create topic**

### Configure topic

<Tabs>
<TabItem value="standard" label="Standard topic" default>

- **Type**: Standard
- **Name**: `harness-ai-sre-alerts`
- **Display name**: `Harness AI SRE Alerts`
- **Encryption**: (Optional) Enable encryption at rest
- **Access policy**: Default (allow publishers)

</TabItem>
<TabItem value="fifo" label="FIFO topic">

FIFO topics are not recommended for CloudWatch alarms as they require message group IDs.

Use **Standard** topic instead.

</TabItem>
</Tabs>

### Save topic

Click **Create topic** and note the **Topic ARN**.

---

## Create HTTPS subscription

### Add subscription to topic

1. In the SNS topic details, click **Create subscription**

### Configure subscription

<Tabs>
<TabItem value="basic" label="Basic configuration" default>

- **Protocol**: HTTPS
- **Endpoint**: Your Harness webhook URL
  ```
  https://<your-harness-instance>/gateway/ai-sre/api/webhooks/<webhook-id>
  ```
- **Enable raw message delivery**: Uncheck (keep message wrapper)
- **Redrive policy**: (Optional) Configure DLQ for failed deliveries

</TabItem>
<TabItem value="with-filter" label="With filter policy">

- **Protocol**: HTTPS
- **Endpoint**: Your Harness webhook URL
- **Subscription filter policy**: JSON filter to process only specific alarms

```json
{
  "AlarmName": [
    {"prefix": "Production-"}
  ],
  "NewStateValue": [
    "ALARM"
  ]
}
```

This filters to only production alarms in ALARM state.

</TabItem>
</Tabs>

### Confirm subscription

1. Click **Create subscription**
2. SNS sends a confirmation request to your Harness webhook
3. Harness must respond with subscription confirmation

**Note**: Configure your Harness webhook to automatically confirm SNS subscriptions by responding to `SubscribeURL` in the payload.

---

## Create CloudWatch alarm

### Navigate to CloudWatch

1. Open AWS Console and go to **CloudWatch**
2. Click **Alarms** → **Create alarm**

### Select metric

<Tabs>
<TabItem value="ec2-cpu" label="EC2 CPU usage" default>

1. Click **Select metric**
2. Choose **EC2** → **Per-Instance Metrics**
3. Select **CPUUtilization** for your instance
4. Click **Select metric**

**Conditions**:
- **Threshold type**: Static
- **Whenever CPUUtilization is...**: Greater than `80`
- **Datapoints to alarm**: `2 out of 2`

</TabItem>
<TabItem value="rds-connections" label="RDS connections">

1. Click **Select metric**
2. Choose **RDS** → **Per-Database Metrics**
3. Select **DatabaseConnections** for your DB instance
4. Click **Select metric**

**Conditions**:
- **Threshold type**: Static
- **Whenever DatabaseConnections is...**: Greater than `100`
- **Datapoints to alarm**: `3 out of 5`

</TabItem>
<TabItem value="lambda-errors" label="Lambda errors">

1. Click **Select metric**
2. Choose **Lambda** → **Per-Function Metrics**
3. Select **Errors** for your function
4. Click **Select metric**

**Conditions**:
- **Threshold type**: Static
- **Whenever Errors is...**: Greater than `10`
- **Datapoints to alarm**: `1 out of 1`

</TabItem>
</Tabs>

### Configure actions

In the **Configure actions** step:

- **Notification**: 
  - **Alarm state trigger**: In alarm
  - **Send notification to**: Select your SNS topic `harness-ai-sre-alerts`
- **Additional actions**: (Optional) Configure Auto Scaling or EC2 actions

### Set alarm details

- **Alarm name**: `Production-EC2-HighCPU`
- **Alarm description**: `EC2 instance CPU usage above 80%`
- **Treat missing data as**: Choose appropriate option (default: `missing`)

### Create alarm

Click **Create alarm**.

---

## Configure field mapping in Harness

In your Harness webhook configuration, map CloudWatch/SNS payload fields to alert properties.

### CloudWatch alarm SNS payload structure

```json
{
  "Type": "Notification",
  "MessageId": "abc-123-def-456",
  "TopicArn": "arn:aws:sns:us-east-1:123456789012:harness-ai-sre-alerts",
  "Subject": "ALARM: \"Production-EC2-HighCPU\" in US East (N. Virginia)",
  "Message": "{\"AlarmName\":\"Production-EC2-HighCPU\",\"AlarmDescription\":\"EC2 instance CPU usage above 80%\",\"AWSAccountId\":\"123456789012\",\"AlarmConfigurationUpdatedTimestamp\":\"2025-07-01T10:00:00.000Z\",\"NewStateValue\":\"ALARM\",\"NewStateReason\":\"Threshold Crossed: 2 datapoints [85.0 (01/07/25 10:00:00), 90.0 (01/07/25 10:05:00)] were greater than the threshold (80.0).\",\"StateChangeTime\":\"2025-07-01T10:10:00.000Z\",\"Region\":\"US East (N. Virginia)\",\"AlarmArn\":\"arn:aws:cloudwatch:us-east-1:123456789012:alarm:Production-EC2-HighCPU\",\"OldStateValue\":\"OK\",\"OKActions\":[],\"AlarmActions\":[\"arn:aws:sns:us-east-1:123456789012:harness-ai-sre-alerts\"],\"InsufficientDataActions\":[],\"Trigger\":{\"MetricName\":\"CPUUtilization\",\"Namespace\":\"AWS/EC2\",\"StatisticType\":\"Statistic\",\"Statistic\":\"AVERAGE\",\"Unit\":null,\"Dimensions\":[{\"value\":\"i-1234567890abcdef0\",\"name\":\"InstanceId\"}],\"Period\":300,\"EvaluationPeriods\":2,\"ComparisonOperator\":\"GreaterThanThreshold\",\"Threshold\":80.0,\"TreatMissingData\":\"missing\",\"EvaluateLowSampleCountPercentile\":\"\"}}",
  "Timestamp": "2025-07-01T10:10:00.000Z",
  "SignatureVersion": "1",
  "Signature": "...",
  "SigningCertURL": "...",
  "UnsubscribeURL": "..."
}
```

**Note**: The `Message` field contains a JSON string that must be parsed.

### Basic field mapping

CloudWatch alarm data is nested in the `Message` field as a JSON string. Use CEL to parse:

```yaml
title: "{{webhook.Subject}}"
message: "{{webhook.Message}}"
severity: "ALARM"
source: "cloudwatch"
link: "https://console.aws.amazon.com/cloudwatch"
tags:
  - "source:cloudwatch"
  - "topic:{{webhook.TopicArn}}"
```

### Advanced field mapping with CEL

Parse the nested JSON message:

```cel
// Parse the Message JSON string
parsed_message: webhook.Message.parseJson()

// Extract alarm details
title: parsed_message.AlarmName + " - " + parsed_message.NewStateValue
message: parsed_message.AlarmDescription + "\n\n" +
         "State: " + parsed_message.OldStateValue + " → " + parsed_message.NewStateValue + "\n" +
         "Reason: " + parsed_message.NewStateReason + "\n" +
         "Region: " + parsed_message.Region + "\n" +
         "Account: " + parsed_message.AWSAccountId

// Map CloudWatch state to Harness severity
severity: parsed_message.NewStateValue == "ALARM" ? "critical" :
          parsed_message.NewStateValue == "INSUFFICIENT_DATA" ? "medium" : "info"

source: "cloudwatch"
link: "https://console.aws.amazon.com/cloudwatch/home?region=" + 
      parsed_message.Region.toLowerCase().replace(" ", "-").replace("(", "").replace(")", "") +
      "#alarmsV2:alarm/" + parsed_message.AlarmName

// Extract metric dimensions as tags
tags: ["source:cloudwatch",
       "alarm:" + parsed_message.AlarmName,
       "state:" + parsed_message.NewStateValue,
       "region:" + parsed_message.Region,
       "account:" + parsed_message.AWSAccountId,
       "metric:" + parsed_message.Trigger.MetricName,
       "namespace:" + parsed_message.Trigger.Namespace] +
      (has(parsed_message.Trigger.Dimensions) 
        ? parsed_message.Trigger.Dimensions.map(d, d.name + ":" + d.value)
        : [])

// Filter: only ALARM states
filter: parsed_message.NewStateValue == "ALARM"

custom_fields: {
  "alarm_arn": parsed_message.AlarmArn,
  "account_id": parsed_message.AWSAccountId,
  "region": parsed_message.Region,
  "metric_name": parsed_message.Trigger.MetricName,
  "threshold": string(parsed_message.Trigger.Threshold),
  "comparison_operator": parsed_message.Trigger.ComparisonOperator
}
```

---

## Test the integration

### Test with CloudWatch console

1. Go to **CloudWatch** → **Alarms**
2. Select your alarm
3. Click **Actions** → **Set alarm state**
4. Choose **In alarm**
5. Click **Confirm**

This manually triggers the alarm to test the integration.

### Test SNS subscription

```bash
aws sns publish \
  --topic-arn arn:aws:sns:us-east-1:123456789012:harness-ai-sre-alerts \
  --message '{"AlarmName":"Test","NewStateValue":"ALARM","NewStateReason":"Test"}' \
  --subject "TEST: Alarm"
```

### Verify in Harness

1. Navigate to **Alerts** in Harness AI SRE
2. Check that the alarm appears
3. Verify field mapping parsed the message correctly

---

## Available CloudWatch alarm fields

Fields in the parsed `Message` JSON:

| Field | Description | Example |
|-------|-------------|---------|
| `AlarmName` | Alarm name | `Production-EC2-HighCPU` |
| `AlarmDescription` | Alarm description | `EC2 instance CPU usage above 80%` |
| `AWSAccountId` | AWS account ID | `123456789012` |
| `NewStateValue` | New alarm state | `ALARM`, `OK`, `INSUFFICIENT_DATA` |
| `OldStateValue` | Previous alarm state | `OK`, `ALARM` |
| `NewStateReason` | State change reason | `Threshold Crossed: ...` |
| `StateChangeTime` | When state changed | `2025-07-01T10:10:00.000Z` |
| `Region` | AWS region | `US East (N. Virginia)` |
| `AlarmArn` | Alarm ARN | `arn:aws:cloudwatch:...` |
| `Trigger.MetricName` | Metric name | `CPUUtilization` |
| `Trigger.Namespace` | Metric namespace | `AWS/EC2` |
| `Trigger.Statistic` | Statistic type | `AVERAGE`, `SUM`, `MAXIMUM` |
| `Trigger.Dimensions` | Metric dimensions | `[{name: "InstanceId", value: "i-..."}]` |
| `Trigger.Period` | Evaluation period (seconds) | `300` |
| `Trigger.EvaluationPeriods` | Number of periods | `2` |
| `Trigger.Threshold` | Alarm threshold | `80.0` |
| `Trigger.ComparisonOperator` | Comparison operator | `GreaterThanThreshold` |

---

## Advanced configuration

### Filter by namespace

Only process specific AWS service alarms:

```cel
filter: parsed_message.NewStateValue == "ALARM" &&
        parsed_message.Trigger.Namespace in ["AWS/EC2", "AWS/RDS", "AWS/Lambda"]
```

### Route by region

Tag and route by AWS region:

```cel
tags: ["source:cloudwatch",
       "region:" + parsed_message.Region,
       "environment:" + (parsed_message.Region.contains("us-east") ? "production" : "staging")]
```

### Extract EC2 instance details

For EC2 alarms, extract instance ID:

```cel
instance_id: has(parsed_message.Trigger.Dimensions)
  ? parsed_message.Trigger.Dimensions.filter(d, d.name == "InstanceId")[0].value
  : ""

message: parsed_message.AlarmDescription + "\n\n" +
         "Instance: " + instance_id + "\n" +
         "Metric: " + parsed_message.Trigger.MetricName
```

### Create composite alert messages

Combine multiple alarm details:

```cel
message: "**CloudWatch Alarm**: " + parsed_message.AlarmName + "\n\n" +
         "**Description**: " + parsed_message.AlarmDescription + "\n" +
         "**State Change**: " + parsed_message.OldStateValue + " → " + parsed_message.NewStateValue + "\n" +
         "**Reason**: " + parsed_message.NewStateReason + "\n\n" +
         "**Metric Details**:\n" +
         "- Namespace: " + parsed_message.Trigger.Namespace + "\n" +
         "- Metric: " + parsed_message.Trigger.MetricName + "\n" +
         "- Statistic: " + parsed_message.Trigger.Statistic + "\n" +
         "- Threshold: " + string(parsed_message.Trigger.Threshold) + "\n" +
         "- Comparison: " + parsed_message.Trigger.ComparisonOperator + "\n\n" +
         "**AWS Details**:\n" +
         "- Account: " + parsed_message.AWSAccountId + "\n" +
         "- Region: " + parsed_message.Region + "\n" +
         "- Time: " + parsed_message.StateChangeTime
```

---

## Troubleshooting

### SNS subscription not confirming

**Cause**: Harness webhook not responding to subscription confirmation request.

**Solution**:
- Check Harness webhook logs for `SubscribeURL` in payload
- Configure Harness to automatically confirm subscriptions:
```cel
// Detect SNS subscription confirmation
filter: webhook.Type != "SubscriptionConfirmation"

// Or handle it separately by fetching SubscribeURL
```
- Manually confirm via AWS Console: SNS → Subscriptions → Confirm

### Message field not parsing

**Cause**: Message is double-encoded or in unexpected format.

**Solution**:
- Check raw webhook payload in Harness logs
- Verify Message is a JSON string: `webhook.Message.parseJson()`
- Handle parsing errors:
```cel
parsed_message: webhook.Message.parseJson()

title: has(parsed_message.AlarmName) ? parsed_message.AlarmName : webhook.Subject
```

### Alarms not triggering

**Cause**: CloudWatch alarm not configured with SNS topic.

**Solution**:
- Edit alarm in CloudWatch
- Go to **Actions** section
- Add notification action with your SNS topic ARN
- Ensure alarm state matches trigger (In alarm, OK, Insufficient data)

### Signature verification failing

**Cause**: SNS message signature verification issues.

**Solution**:
- SNS signs all messages with certificates
- Verify signature using AWS SDK or certificate URL
- Or accept messages without verification if within VPC/private network

---

## Example: Complete integration

### AWS SNS topic

- **Name**: `harness-ai-sre-alerts`
- **Type**: Standard
- **Subscription**:
  - Protocol: HTTPS
  - Endpoint: `https://app.harness.io/gateway/ai-sre/api/webhooks/wh_abc123`
  - Status: Confirmed

### CloudWatch alarm

- **Name**: `Production-RDS-HighConnections`
- **Metric**: `AWS/RDS` → `DatabaseConnections`
- **Condition**: Greater than 100 for 3 out of 5 datapoints
- **Actions**: Notify `harness-ai-sre-alerts` when in ALARM state

### Harness webhook field mapping

```yaml
# Parse nested Message JSON
parsed_message: webhook.Message.parseJson()

title: |
  parsed_message.AlarmName + " - " + parsed_message.NewStateValue

message: |
  **CloudWatch Alarm**: {{parsed_message.AlarmName}}
  
  **Description**: {{parsed_message.AlarmDescription}}
  **State**: {{parsed_message.OldStateValue}} → {{parsed_message.NewStateValue}}
  **Reason**: {{parsed_message.NewStateReason}}
  
  **Metric**: {{parsed_message.Trigger.MetricName}} ({{parsed_message.Trigger.Namespace}})
  **Threshold**: {{parsed_message.Trigger.ComparisonOperator}} {{parsed_message.Trigger.Threshold}}
  **Statistic**: {{parsed_message.Trigger.Statistic}} over {{parsed_message.Trigger.Period}}s
  
  **AWS Account**: {{parsed_message.AWSAccountId}}
  **Region**: {{parsed_message.Region}}
  **Time**: {{parsed_message.StateChangeTime}}
  
  **View in AWS Console**: https://console.aws.amazon.com/cloudwatch/home#alarmsV2:alarm/{{parsed_message.AlarmName}}

severity: |
  parsed_message.NewStateValue == "ALARM" ? "critical" :
  parsed_message.NewStateValue == "INSUFFICIENT_DATA" ? "medium" : "info"

source: "cloudwatch"

link: |
  "https://console.aws.amazon.com/cloudwatch/home#alarmsV2:alarm/" + parsed_message.AlarmName

tags:
  - "source:cloudwatch"
  - "alarm:{{parsed_message.AlarmName}}"
  - "state:{{parsed_message.NewStateValue}}"
  - "account:{{parsed_message.AWSAccountId}}"
  - "region:{{parsed_message.Region}}"
  - "namespace:{{parsed_message.Trigger.Namespace}}"
  - "metric:{{parsed_message.Trigger.MetricName}}"

filter: |
  webhook.Type == "Notification" &&
  parsed_message.NewStateValue == "ALARM"

custom_fields:
  alarm_arn: "{{parsed_message.AlarmArn}}"
  aws_account: "{{parsed_message.AWSAccountId}}"
  aws_region: "{{parsed_message.Region}}"
  metric_namespace: "{{parsed_message.Trigger.Namespace}}"
  metric_name: "{{parsed_message.Trigger.MetricName}}"
  threshold: "{{parsed_message.Trigger.Threshold}}"
```

---

## Next steps

- Go to [Route Alerts](../../../alert-rules/overview.md) to route and deduplicate CloudWatch alarms.
- Go to [Use CEL in Webhooks](../../use-cel-webhooks.md) for JSON parsing and filtering.
- Go to [AI Agent](../../../../ai-agent/ai-agent.md) to enable automated alarm investigation.
- Go to [AWS CloudWatch Template](../../templates/cloud/aws-cloudwatch.md) for the pre-configured template.

---

## Further reading

### AWS Official Documentation
- [CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html) - Complete guide to CloudWatch alarm configuration and SNS integration
- [SNS HTTPS Subscriptions](https://docs.aws.amazon.com/sns/latest/dg/sns-http-https-endpoint-as-subscriber.html) - HTTPS subscription setup and subscription confirmation process
- [CloudWatch and EventBridge](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-and-eventbridge.html) - CloudWatch alarm message format and payload structure
- [SNS Message Formats](https://docs.aws.amazon.com/sns/latest/dg/sns-message-and-json-formats.html) - SNS notification wrapper and Message field structure
