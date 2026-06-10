---
id: lambda-toggle-event-mapping-state
title: Lambda toggle event mapping state
sidebar_label: Lambda Toggle Event Mapping State
description: Disable one or more event source mappings on an AWS Lambda function for a configurable duration and re-enable them afterwards so you can test how the workload behaves when the function temporarily stops receiving events from its source.
keywords:
  - chaos engineering
  - lambda toggle event mapping state
  - aws fault
  - lambda fault
tags:
  - chaos-engineering
  - aws-faults
  - lambda-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-toggle-event-mapping-state
  - /docs/chaos-engineering/chaos-faults/aws/lambda-toggle-event-mapping-state
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Lambda toggle event mapping state is an AWS chaos fault that disables one or more event source mappings (identified by UUIDs in `EVENT_UUIDS`) on a target Lambda function (`FUNCTION_NAME` in `REGION`) for `TOTAL_CHAOS_DURATION` seconds, then re-enables them. Unlike [Lambda delete event source mapping](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-delete-event-source-mapping), the mapping is not destroyed; its `Enabled` flag is flipped to `false` and back.

Use this fault to test how an event-driven Lambda workload behaves when its source (SQS queue, Kinesis stream, DynamoDB Stream, Kafka topic, MSK cluster, MQ broker) stops delivering events: whether the source backlogs without loss, whether monitoring detects the gap, and whether the function drains the backlog cleanly once the mapping is re-enabled.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Event backlog handling:** When the mapping is disabled, do events accumulate in the source (SQS queue depth grows, Kinesis records age) without loss?
- **Drain behaviour:** When the mapping is re-enabled, does the function drain the backlog within the expected window?
- **Monitoring fidelity:** Do CloudWatch alarms on iterator age, queue depth, or "no invocations" fire within the SLA?
- **Downstream impact:** Do consumers downstream of the Lambda function detect the gap and degrade gracefully?
- **Idempotency:** When the function eventually processes the backlog, are messages handled idempotently?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Lambda function:** `FUNCTION_NAME` exists in `REGION` and is in the `Active` state.
- **Event source mappings:** Each UUID in `EVENT_UUIDS` is currently attached to the function and in the `Enabled` state.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Lambda event sources: SQS, Kinesis, DynamoDB Streams, MSK, self-managed Kafka, MQ | Supported |
| API Gateway, EventBridge rule, S3 notification triggers | Not applicable (these use invocations, not event source mappings) |
| AWS regions | Supported in every commercial region; pass the region in `REGION` |

---

## Permissions required

The IAM principal that the chaos pod uses (the credentials mounted from the Harness Secret Manager file secret, the IRSA role on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the following AWS actions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:GetFunction",
        "lambda:GetEventSourceMapping",
        "lambda:ListEventSourceMappings",
        "lambda:UpdateEventSourceMapping"
      ],
      "Resource": "*"
    }
  ]
}
```

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

---

## Authentication

The fault supports three credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager file secret | Chaos infrastructure runs outside EKS, or you want explicit static credentials | Upload the AWS credentials file as a **File Secret** in Harness Secret Manager and reference its identifier via `AWS_AUTHENTICATION_SECRET` |
| IAM Roles for Service Accounts (IRSA) | Chaos infrastructure runs in EKS and uses an OIDC-bound service account | No tunable changes; the chaos pod inherits the role automatically. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set it up |
| Assume role | The fault needs to act in a different account or with elevated permissions | Set `ASSUME_ROLE_ARN` to the role ARN; the chaos pod assumes the role on top of its base credentials |

When using the Harness Secret Manager method, the contents of the File Secret should be the AWS credentials file in the standard `~/.aws/credentials` format:

```ini
[default]
aws_access_key_id = REPLACE_WITH_ACCESS_KEY_ID
aws_secret_access_key = REPLACE_WITH_SECRET_ACCESS_KEY
```

Upload this file as a **File Secret** in Harness Secret Manager (Project Setup → Secrets → New File Secret), and pass the secret identifier in `AWS_AUTHENTICATION_SECRET` when configuring the fault.

---

## Fault tunables

Configure the following fault parameters when you add Lambda toggle event mapping state to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FUNCTION_NAME` | Name of the target Lambda function. | (required) |
| `REGION` | AWS region where the Lambda function is deployed. | (required) |
| `EVENT_UUIDS` | Comma-separated list of event source mapping UUIDs to toggle. Use `aws lambda list-event-source-mappings` to enumerate them. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple mappings are toggled: `parallel` toggles them all at once; `serial` toggles them one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Disables each event source mapping in `EVENT_UUIDS` by setting its `Enabled` flag to `false`, waits for `TOTAL_CHAOS_DURATION` seconds, then re-enables each mapping.

---

## Expected behavior during fault execution

- The Lambda function stops receiving new events from the toggled mappings.
- Events accumulate in the source: SQS queue depth grows, Kinesis records age increases, DynamoDB Stream iterator age rises.
- CloudWatch Lambda invocation metrics drop to zero for the affected event source.
- Downstream consumers of the Lambda output see a gap or backlog.

:::info When the fault ends
The chaos pod re-enables each mapping. The function resumes consuming events; the source backlog drains over the next several minutes depending on throughput.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Source queue depth:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_sqs_approximate_number_of_messages_visible` (SQS) or equivalent.
- **Iterator age:** Use a Prometheus probe on `aws_kinesis_get_records_iterator_age_milliseconds` (Kinesis/DynamoDB Streams).
- **Lambda invocation rate:** Use a Prometheus probe on `aws_lambda_invocations_sum` and assert it drops during the chaos window.
- **Downstream availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.

---

## Verify the fault execution effect

While the experiment is running, confirm the mappings are disabled and then re-enabled:

1. **Inspect event source mapping state.**

   ```bash
   aws lambda get-event-source-mapping --uuid <uuid> --region <region>
   ```

   `State` should report `Disabled` or `Disabling` during the chaos window and return to `Enabled` afterwards.

2. **Check source backlog.**

   For SQS:

   ```bash
   aws sqs get-queue-attributes --region <region> --queue-url <url> \
     --attribute-names ApproximateNumberOfMessages
   ```

   The depth should grow during the chaos window and drain after recovery.

3. **Check Lambda invocations.**

   ```bash
   aws cloudwatch get-metric-statistics --region <region> \
     --namespace AWS/Lambda --metric-name Invocations \
     --dimensions Name=FunctionName,Value=<name> \
     --start-time <iso> --end-time <iso> \
     --period 60 --statistics Sum
   ```

   Invocations from the affected source should drop to zero during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod re-enables each toggled mapping.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the re-enable call.
- **Manual recovery:** If the fault exits before re-enable, run `aws lambda update-event-source-mapping --uuid <uuid> --enabled --region <region>` for each affected UUID.
- **Workload recovery:** Backlog drains at the function's normal throughput rate; consider scaling up after a long chaos window.

---

## Limitations

- **Disable vs delete:** The mapping persists; only its `Enabled` flag is toggled. Use [Lambda delete event source mapping](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-delete-event-source-mapping) to test mapping recreation behaviour.
- **Source-side TTL:** Sources with a retention window shorter than the chaos duration (for example Kinesis streams with a low retention) may drop events permanently.
- **State transitions are not instant:** AWS reports `Disabling` / `Enabling` for a short period before the final state. Treat the metric pause as the source of truth for "really disabled".
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Lambda toggle event mapping state fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required Lambda permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes lambda:GetEventSourceMapping and lambda:UpdateEventSourceMapping."
/>

<Troubleshoot
  issue="EVENT_UUIDS not found"
  mode="docs"
  fallback="The UUIDs in EVENT_UUIDS must belong to the function specified in FUNCTION_NAME and exist in REGION. Enumerate the current mappings with 'aws lambda list-event-source-mappings --function-name <name> --region <region>' and copy the UUID values into EVENT_UUIDS."
/>

<Troubleshoot
  issue="Mapping reports Enabled but no invocations occur"
  mode="docs"
  fallback="After re-enable, AWS may report Enabling for a short transition. Wait a minute and re-check the State. If invocations still do not resume, confirm the source itself is delivering records (queue not empty, stream has shards with records, topic has unconsumed offsets)."
/>

<Troubleshoot
  issue="Function did not drain the backlog after recovery"
  mode="docs"
  fallback="Lambda concurrency limits or reserved concurrency may cap drain throughput. Check the function's concurrency configuration, raise reserved concurrency temporarily, or accept a longer drain window."
/>

---

## Related faults

- [Lambda delete event source mapping](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-delete-event-source-mapping): Delete mappings instead of toggling them.
- [Lambda update function memory](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-memory): Test function behaviour under tightened memory.
- [Lambda update function timeout](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-update-function-timeout): Test function behaviour under tightened timeout.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
