---
id: dynamodb-replication-pause
title: DynamoDB replication pause
sidebar_label: DynamoDB Replication Pause
description: Pause cross-region replication on one or more Amazon DynamoDB global tables for a configurable duration using an AWS Fault Injection Service (FIS) experiment so you can test how your application handles a brief stop in multi-region consistency.
keywords:
  - chaos engineering
  - dynamodb replication pause
  - aws fault
  - dynamodb
  - aws fis
tags:
  - chaos-engineering
  - aws-faults
  - dynamodb-chaos
redirect_from:
  - /docs/chaos-engineering/chaos-faults/aws/dynamo-db-replication-pause
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

DynamoDB replication pause is an AWS chaos fault that pauses cross-region replication for the DynamoDB global tables listed in `TABLE_NAMES` for `TOTAL_CHAOS_DURATION` seconds by launching an [AWS Fault Injection Service (FIS)](https://docs.aws.amazon.com/fis/) experiment using the `aws:dynamodb:global-table-pause-replication` action. While replication is paused, writes accepted by the primary region are not propagated to the replica regions; once the FIS experiment ends, replication resumes and the table catches up.

Use this fault to test how a multi-region workload built on DynamoDB global tables behaves when replication is briefly paused: whether the application tolerates eventual-consistency lag spikes, whether failover decisions are robust, and whether monitoring detects the replication gap within the SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Replication lag tolerance:** Does your application's eventual-consistency model gracefully tolerate a temporary increase in replication lag?
- **Monitoring fidelity:** Do CloudWatch alarms on `ReplicationLatency` (or your own application lag metric) fire within the SLA?
- **Cross-region read safety:** Do replica-region reads still serve consistent data for application-level read patterns, or do clients need to fall back to the primary region?
- **Failover decisioning:** Does any cross-region failover automation correctly avoid false positives during a temporary replication pause?
- **Recovery:** When replication resumes, does the table catch up within the expected window without operator intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Global tables:** Every entry in `TABLE_NAMES` is a DynamoDB global table with at least two replicas across regions.
- **AWS Fault Injection Service available:** FIS is supported in `REGION` and your account is opted in to use the `aws:dynamodb:global-table-pause-replication` action.
- **FIS execution role:** A pre-existing IAM role at `FIS_ROLE_ARN` that FIS can assume, with permission to call the DynamoDB pause/resume replication actions on the target tables.
- **FIS account:** `FIS_ACCOUNT_ID` is the AWS account ID where the FIS experiment runs.
- **Optional stop conditions:** Define CloudWatch alarms in `STOP_CONDITION_CLOUDWATCH_ALARMS` to terminate the FIS experiment early when application-level guardrails breach.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| DynamoDB global tables (v2) in any commercial region where FIS supports the action | Supported |
| DynamoDB non-global tables | Not applicable |
| AWS GovCloud / China regions | Subject to FIS availability in those regions |

---

## Permissions required

The fault uses two IAM identities:

1. The chaos pod's principal (the credentials mounted from the Harness Secret Manager file secret, the IRSA role on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the permissions below to drive the FIS experiment.
2. The FIS execution role at `FIS_ROLE_ARN` needs DynamoDB permissions for the pause/resume action; AWS publishes the exact permission set for the `aws:dynamodb:global-table-pause-replication` action.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "fis:CreateExperimentTemplate",
        "fis:DeleteExperimentTemplate",
        "fis:GetExperimentTemplate",
        "fis:UpdateExperimentTemplate",
        "fis:ListExperimentTemplates",
        "fis:StartExperiment",
        "fis:StopExperiment",
        "fis:GetExperiment",
        "fis:ListExperiments",
        "fis:TagResource",
        "iam:PassRole",
        "dynamodb:DescribeTable",
        "dynamodb:ListTables",
        "dynamodb:DescribeGlobalTable",
        "dynamodb:ListGlobalTables",
        "cloudwatch:DescribeAlarms"
      ],
      "Resource": "*"
    }
  ]
}
```

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

---

## Authentication

The fault supports three credential delivery models for the chaos pod's principal. Pick one based on how your chaos infrastructure is deployed.

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

Configure the following fault parameters when you add DynamoDB replication pause to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TABLE_NAMES` | Comma-separated list of DynamoDB global table names whose replication should be paused. | (required) |
| `REGION` | AWS region where the FIS experiment runs. | (required) |
| `FIS_ROLE_ARN` | ARN of the pre-existing IAM role that AWS FIS assumes to perform the replication pause action. | (required) |
| `FIS_ACCOUNT_ID` | AWS account ID under which the FIS experiment runs. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds (passed to the FIS experiment as the action duration). | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `COUNT` | Number of tables to affect when more than one is listed. Use `0` to affect every table. | `0` |
| `STOP_CONDITION_CLOUDWATCH_ALARMS` | Comma-separated list of CloudWatch alarm ARNs that terminate the FIS experiment early when any alarm enters `ALARM` state. | `""` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Creates an AWS FIS experiment template that targets `TABLE_NAMES` with the `aws:dynamodb:global-table-pause-replication` action for `TOTAL_CHAOS_DURATION` seconds (with optional `STOP_CONDITION_CLOUDWATCH_ALARMS`), starts the experiment, waits for it to complete, then deletes the experiment template.

---

## Expected behavior during fault execution

- Writes accepted by the primary region of each affected global table stop being propagated to replica regions for the duration of the experiment.
- CloudWatch metric `ReplicationLatency` for each affected replica rises sharply.
- Reads from replica regions return data that lags the primary region by an amount that grows over the chaos window.
- Application-level lag metrics (last-update timestamp, version vector skew) drift while the experiment runs.

:::info When the fault ends
The FIS action stops; DynamoDB resumes replication. The replica regions catch up over the next several minutes depending on write rate.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Replication latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_dynamodb_replication_latency` per replica region.
- **Application lag metrics:** Use a Prometheus probe on your own consistency-lag counter.
- **End-to-end correctness:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) or [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that performs a write in one region and reads from another to assert lag stays inside the SLO.

---

## Verify the fault execution effect

While the experiment is running, confirm the pause is active and then released:

1. **Track the FIS experiment.**

   ```bash
   aws fis list-experiments --region <region>
   aws fis get-experiment --region <region> --id <experiment-id>
   ```

   The FIS experiment should be `running` during the chaos window and `completed` afterwards.

2. **Check replication latency.**

   ```bash
   aws cloudwatch get-metric-statistics --region <replica-region> \
     --namespace AWS/DynamoDB --metric-name ReplicationLatency \
     --dimensions Name=TableName,Value=<table> Name=ReceivingRegion,Value=<replica> \
     --start-time <iso> --end-time <iso> \
     --period 60 --statistics Maximum
   ```

   Maximum should rise during the chaos window and return to baseline afterwards.

3. **Verify replica catches up.**

   Perform a write in the primary region, then read from each replica region. Within a few minutes after the experiment ends, the replica should return the latest write.

---

## Recovery and cleanup

- **End of duration:** FIS stops the action and DynamoDB resumes replication; the chaos pod deletes the FIS experiment template it created.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops the FIS experiment.
- **Manual recovery:** If the FIS experiment is stuck, run `aws fis stop-experiment --id <id> --region <region>` to terminate it; AWS will resume replication automatically when the action stops.
- **Workload recovery:** Replica regions catch up at the natural replication rate; no operator action is required.

---

## Limitations

- **Action duration:** AWS FIS defines a minimum and maximum duration for the action; values outside that range are rejected.
- **Per-region:** A single experiment runs in one `REGION`; chain experiments to test multi-primary topologies.
- **FIS availability:** This fault depends on FIS being available in `REGION` and on the `aws:dynamodb:global-table-pause-replication` action being supported in that region.
- **Stop conditions:** When `STOP_CONDITION_CLOUDWATCH_ALARMS` is provided, an alarm transitioning to `ALARM` terminates the action; replication resumes early.
- **Cross-account targeting:** Use `ASSUME_ROLE_ARN` to run the FIS experiment in a different account.

---

## Troubleshooting

<Troubleshoot
  issue="DynamoDB replication pause fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required FIS or DynamoDB permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes fis:CreateExperimentTemplate, fis:StartExperiment, fis:GetExperiment, fis:StopExperiment, fis:DeleteExperimentTemplate, iam:PassRole, dynamodb:DescribeGlobalTable, and cloudwatch:DescribeAlarms."
/>

<Troubleshoot
  issue="FIS rejects the experiment template"
  mode="docs"
  fallback="Common causes are: TABLE_NAMES contains a table that is not a global table; FIS_ROLE_ARN lacks the permissions FIS needs to perform the action; FIS_ACCOUNT_ID does not match the account where the chaos pod credentials live; the region does not support the aws:dynamodb:global-table-pause-replication action. Cross-check each input against the AWS FIS documentation for this action."
/>

<Troubleshoot
  issue="FIS_ROLE_ARN cannot be assumed by FIS"
  mode="docs"
  fallback="The role's trust policy must allow the FIS service principal (fis.amazonaws.com) to assume it. Update the trust policy to include a statement that allows sts:AssumeRole from fis.amazonaws.com, and ensure the chaos pod's principal has iam:PassRole permission for FIS_ROLE_ARN."
/>

<Troubleshoot
  issue="Replication did not pause despite the experiment showing as running"
  mode="docs"
  fallback="Confirm that the tables in TABLE_NAMES are actually global tables with active replicas; non-global tables silently produce no effect. Inspect the FIS experiment in the AWS console for action-level errors and refer to the experiment's CloudWatch Logs."
/>

---

## Related faults

- [Generic FIS experiment template](/docs/chaos-engineering/faults/chaos-faults/aws/generic-experiment-template): Run any pre-built FIS experiment by template ID.
- [Lambda inject latency](/docs/chaos-engineering/faults/chaos-faults/aws/lambda-inject-latency): Add latency to a Lambda function instead of pausing replication.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
