---
id: generic-experiment-template
title: Generic FIS experiment template
sidebar_label: Generic FIS Experiment Template
description: Trigger any pre-built AWS Fault Injection Service (FIS) experiment template by ID from Harness Chaos Engineering so you can fold native AWS-managed faults into your chaos experiments and probe / verify / report on the result as you do with any other Harness fault.
keywords:
  - chaos engineering
  - generic fis experiment template
  - aws fault
  - aws fis
tags:
  - chaos-engineering
  - aws-faults
  - fis
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Generic FIS experiment template is an AWS chaos fault that starts a pre-existing AWS Fault Injection Service (FIS) experiment template (identified by `EXPERIMENT_TEMPLATE_ID` in `REGION`) for `TOTAL_CHAOS_DURATION` seconds. Use this fault to fold a native AWS-managed FIS scenario (EC2 reboot, EBS pause IO, RDS reboot, ECS task stop, network blackhole, and many more) into a Harness chaos experiment so you can apply Harness probes, attach SLOs, and report on the result alongside non-AWS faults.

Use this fault when AWS already provides the exact action or scenario you need through FIS, and you want a single Harness experiment that orchestrates both AWS-native faults and Harness-native faults end to end.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Wrap an existing FIS template:** Drive an existing FIS experiment template from Chaos Studio so you can attach probes, hypothesis criteria, and reports.
- **Mix-and-match faults:** Combine an AWS-native FIS action (for example `aws:ec2:reboot-instances`) with Harness-native Kubernetes faults in a single chaos experiment.
- **Centralized reporting:** Surface FIS results alongside every other Harness chaos run in the Harness dashboards.
- **Reusable templates:** Maintain FIS templates as configuration and trigger them from Harness without rebuilding them.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **FIS experiment template:** `EXPERIMENT_TEMPLATE_ID` exists in `REGION` and points to a working template with its own actions, targets, and execution role.
- **FIS execution role:** The FIS template references an IAM role that AWS FIS can assume to perform the actions inside the template.
- **AWS Fault Injection Service available:** FIS is supported in `REGION` and your account is opted in to use the actions referenced by the template.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS Fault Injection Service in any commercial region where FIS is available | Supported |
| FIS templates targeting any supported AWS service action | Supported (subject to FIS action availability) |
| AWS GovCloud / China regions | Subject to FIS availability in those regions |

---

## Permissions required

The IAM principal that the chaos pod uses (the credentials mounted from the Harness Secret Manager file secret, the IRSA role on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the following AWS actions. The FIS execution role referenced by the template needs additional permissions specific to the actions in the template.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "fis:GetExperimentTemplate",
        "fis:ListExperimentTemplates",
        "fis:StartExperiment",
        "fis:StopExperiment",
        "fis:GetExperiment",
        "fis:ListExperiments",
        "fis:TagResource",
        "iam:PassRole"
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

Configure the following fault parameters when you add the generic FIS experiment template to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EXPERIMENT_TEMPLATE_ID` | ID of the FIS experiment template to start. | (required) |
| `REGION` | AWS region where the FIS template exists and the experiment runs. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds (passed to the FIS experiment where applicable). | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of task replicas to affect (only used when the underlying FIS template references replica-based targets). | `100` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Starts the FIS experiment template identified by `EXPERIMENT_TEMPLATE_ID` in `REGION`, waits for the experiment to complete (subject to `TOTAL_CHAOS_DURATION` and any stop conditions defined inside the template), then reports the FIS experiment outcome back to Chaos Studio.

---

## Expected behavior during fault execution

- The FIS experiment moves to `running`; the actions defined inside the template execute according to FIS scheduling.
- Targets selected by the template (EC2 instances, EBS volumes, RDS clusters, ECS tasks, network paths, and so on) experience the action described by the template.
- CloudWatch metrics for the targeted AWS service reflect the action; FIS provides per-action status in the experiment record.

:::info When the fault ends
FIS marks the experiment `completed` or `stopped`; AWS reverses any reversible actions (for example, a paused-IO action resumes IO when the action duration expires).
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) appropriate to the action inside the FIS template:

- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.
- **Service-specific metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on metrics specific to the affected service (for example RDS connection count, ECS service desired count, EBS read/write throughput).
- **CloudWatch alarms:** If the FIS template defines stop-condition alarms, monitor the same alarms from Harness so you can correlate the early-termination cause.

---

## Verify the fault execution effect

While the experiment is running, monitor FIS directly:

1. **Inspect the FIS experiment.**

   ```bash
   aws fis list-experiments --region <region>
   aws fis get-experiment --region <region> --id <experiment-id>
   ```

   Status moves `pending` → `initiating` → `running` → `completed` (or `stopped`). The `actions` field reports per-action state and error messages.

2. **Verify the action took effect.**

   The exact verification depends on the template; for example, for a reboot-instances template, confirm the EC2 instance state transitions through `stopping` and back to `running`.

3. **Confirm cleanup.**

   FIS automatically reverses reversible actions (pause-IO, blackhole, throttle) at the end of the action duration; non-reversible actions (terminate-instance, delete-resource) remain.

---

## Recovery and cleanup

- **End of duration:** FIS marks the experiment complete; reversible actions are undone automatically by the FIS service.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also stops the FIS experiment.
- **Manual recovery:** If the FIS experiment is stuck, run `aws fis stop-experiment --id <id> --region <region>` to terminate it.
- **Workload recovery:** Depends on the action inside the template. For non-reversible actions, follow your standard recovery playbook (replace terminated instances, recreate deleted resources).

---

## Limitations

- **Template must pre-exist:** The fault starts an existing FIS template; it does not create or modify templates. Use AWS console / IaC to maintain the templates.
- **Region scoping:** A single experiment targets one `REGION`; the template itself can only target resources reachable inside that region's FIS scope.
- **Action availability:** Different FIS actions are available in different regions; the fault inherits whatever FIS supports.
- **Stop conditions:** Stop conditions defined inside the FIS template still apply; a CloudWatch alarm tied to the template can terminate the experiment early.
- **Cross-account targeting:** Use `ASSUME_ROLE_ARN` to run an FIS template in a different account.

---

## Troubleshooting

<Troubleshoot
  issue="Generic FIS experiment template fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required FIS permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes fis:GetExperimentTemplate, fis:StartExperiment, fis:GetExperiment, fis:StopExperiment, and iam:PassRole. The FIS template's own execution role needs the service-specific permissions for the actions inside the template."
/>

<Troubleshoot
  issue="EXPERIMENT_TEMPLATE_ID not found"
  mode="docs"
  fallback="Confirm the template exists in REGION and is visible to the principal used by the chaos pod. Run 'aws fis list-experiment-templates --region <region>' to enumerate templates, and copy the ID exactly into EXPERIMENT_TEMPLATE_ID."
/>

<Troubleshoot
  issue="FIS experiment ends quickly with the wrong outcome"
  mode="docs"
  fallback="Inspect the FIS experiment in the AWS console for stop-condition triggers or per-action errors. A CloudWatch alarm referenced as a stop condition in the template may have been in ALARM state at start, which causes FIS to abort immediately. Either clear the alarm or remove it from the template's stop conditions."
/>

<Troubleshoot
  issue="The FIS template's role cannot be assumed by FIS"
  mode="docs"
  fallback="The execution role referenced by the FIS template must trust the FIS service principal (fis.amazonaws.com). Update the role's trust policy to include a statement that allows sts:AssumeRole from fis.amazonaws.com."
/>

---

## Related faults

- [DynamoDB replication pause](/docs/chaos-engineering/faults/chaos-faults/aws/dynamodb-replication-pause): Pause global-table replication via FIS.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
- [AWS chaos faults](/docs/chaos-engineering/faults/chaos-faults/aws): Browse the full catalog of AWS faults.
