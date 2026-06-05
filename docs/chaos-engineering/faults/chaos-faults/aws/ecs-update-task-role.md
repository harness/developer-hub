---
id: ecs-update-task-role
title: ECS update task role
sidebar_label: ECS Update Task Role
description: Swap the task role of an ECS service to a chaos value (or empty) for a configurable duration so you can test how the workload behaves when its IAM identity loses or changes permissions.
keywords:
  - chaos engineering
  - ecs update task role
  - aws fault
  - ecs fault
  - iam permissions
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-update-task-role
  - /docs/chaos-engineering/chaos-faults/aws/ecs-update-task-role
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS update task role is an AWS chaos fault that registers a new revision of the target service's task definition with the IAM task role swapped to `TASK_ROLE` (or removed if `TASK_ROLE` is empty), updates the service to that revision for a configurable duration, then re-registers and restores the original revision. New tasks scheduled during the chaos window run under the chaos task role and any application call that depended on the original role's permissions starts failing with `AccessDeniedException`.

Use this fault to test how a workload behaves when its IAM identity loses permissions: whether the application surfaces a clear error, whether retries and circuit breakers protect downstream systems, and whether monitoring catches the regression.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Permission failure handling:** When the task can no longer call (for example) `s3:PutObject`, does the application return a clear error to the caller, or does it retry forever and burn threads?
- **Cross-service impact:** Does a permission failure in one service cascade into upstream timeouts, or is it isolated?
- **Audit trail:** Do CloudTrail and your SIEM detect the role change quickly, and is the alert wired to the on-call?
- **Default role hygiene:** When the task role is unset entirely, does the application detect the missing credentials and fail safe, or does it fall back to the EC2 instance role and continue silently?
- **Rollback safety:** Does the original task definition revision restore cleanly, and do new tasks recover the original permissions?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service:** `SERVICE_NAME` exists in `CLUSTER_NAME` within `REGION` and has a non-empty `taskRoleArn` (otherwise removing the role has no effect).
- **Chaos task role (when used):** If `TASK_ROLE` is set, the role exists in the same account and has a trust policy that allows ECS tasks to assume it (`ecs-tasks.amazonaws.com`).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below, including `iam:PassRole` for the chaos role (when supplied).

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Supported |
| Services with task role configured | Supported |
| Services without task role | Supported with `TASK_ROLE=""` is a no-op; supply a non-empty `TASK_ROLE` to add a (mismatched) role for the chaos window |
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
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:RegisterTaskDefinition",
        "ecs:DeregisterTaskDefinition",
        "ecs:UpdateService",
        "ecs:ListTasks",
        "ecs:DescribeTasks"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "*"
    }
  ]
}
```

- `ecs:DescribeServices` and `ecs:DescribeTaskDefinition` read the original revision.
- `ecs:RegisterTaskDefinition` and `ecs:DeregisterTaskDefinition` publish the chaos revision and clean up.
- `ecs:UpdateService` points the service at the chaos revision and back.
- `iam:PassRole` is required for both the task execution role and (if set) the chaos task role.

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

Go to [AWS named profile for chaos](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-switch-profile) to switch between profiles inside a single credentials file.

---

## Fault tunables

Configure the following fault parameters when you add ECS update task role to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAME` | Name of the target ECS service. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TASK_ROLE` | ARN of the IAM role to set as the chaos task role. Leave empty to remove the task role entirely. | `""` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of task replicas to affect through the deployment (used to compute `maximumPercent` for the chaos deployment). | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The service runs on the chaos revision for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Reads the current task definition for `SERVICE_NAME`, registers a new revision with `taskRoleArn` set to `TASK_ROLE` (or removed if empty), updates the service to that revision, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original revision and deregisters the chaos revision.

---

## Expected behavior during fault execution

- A new task definition revision is registered with the changed (or empty) task role.
- The service starts new tasks on the chaos revision; old tasks are drained according to the deployment configuration.
- New tasks call AWS APIs under `TASK_ROLE` (or with no task role at all). Any API call that the original role permitted but the chaos role does not begins to fail with `AccessDeniedException`.
- CloudWatch metrics and application error counters reflect the new permission failures.
- CloudTrail records the role change via the `RegisterTaskDefinition` and `UpdateService` calls.

:::info When the fault ends
The chaos pod calls `UpdateService` with the original task definition revision and waits for at least one task on the original revision to reach `RUNNING`. The chaos revision is then deregistered. Application calls regain the original permissions on the new tasks; running tasks on the chaos revision are drained as the rollout completes.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-level error counters (HTTP 5xx, custom AWS-call error counters) to detect the permission failures.
- **CloudWatch metric:** If you publish metrics on AWS-call success/failure (recommended), assert the failure metric spikes during the fault and returns to baseline afterwards.
- **CloudTrail:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that queries CloudTrail for `AccessDenied` events tied to the affected service identity.
- **Deployment status:** Use `aws ecs describe-services --query "services[].deployments"` to confirm the deployment rolled over and back cleanly.

---

## Verify the fault execution effect

While the experiment is running, confirm the task role changed and then restored:

1. **Inspect the active task definition.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].taskDefinition"
   ```

   The active revision should change at the start of the chaos window and return to the original revision at the end.

2. **Inspect the task role on the active task definition.**

   ```bash
   aws ecs describe-task-definition \
     --task-definition <active-arn> \
     --region <region> \
     --query "taskDefinition.taskRoleArn"
   ```

   During the fault this should be `TASK_ROLE` (or unset). After recovery it should be the original ARN.

3. **Inspect CloudTrail for permission failures.**

   ```bash
   aws cloudtrail lookup-events \
     --lookup-attributes AttributeKey=Username,AttributeValue=<role-name-of-task> \
     --region <region>
   ```

   Look for repeated `AccessDenied` events during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `UpdateService` with the original task definition revision and waits for the rollout to start. The chaos revision is deregistered.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore-and-deregister cleanup.
- **Manual recovery:** If the fault exits before cleanup, set the service back to the original revision manually with `aws ecs update-service --task-definition <original-arn>` and deregister the chaos revision.
- **Workload recovery:** Application-level state that was not persisted because of permission failures during the chaos window is not recreated automatically; replay or reconciliation may be required.

---

## Limitations

- **Task execution role is not changed:** This fault changes `taskRoleArn` only. To test failures of the image pull or log push (which use `executionRoleArn`), use a different chaos or change the role manually.
- **Existing tasks keep their original role:** Tasks already running keep their original credentials; only new tasks scheduled during the chaos window use `TASK_ROLE`. Combine with [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop) to force a rollover.
- **`iam:PassRole` is required:** The chaos infrastructure must be allowed to pass `TASK_ROLE` (and the existing task execution role) to ECS; otherwise registration fails.
- **Single service per experiment:** Use multiple experiments to target multiple services.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS update task role fails with AccessDeniedException iam:PassRole"
  mode="docs"
  fallback="The IAM principal of the chaos pod cannot pass TASK_ROLE (or the existing task execution role) to ECS. Add iam:PassRole on the role ARNs to the policy attached to the IRSA service account or the assumed role. The policy condition should allow PassRole for the specific role ARNs used by the service."
/>

<Troubleshoot
  issue="Application does not show permission failures during the chaos window"
  mode="docs"
  fallback="The most common causes are: the application caches AWS SDK credentials for the lifetime of the task (existing tasks keep their original role; new tasks get TASK_ROLE); the affected API calls happen to be allowed by both the original and the chaos role; or the deployment did not roll over because of low maximumPercent. Force a rollover with ECS task stop, or pick a TASK_ROLE that explicitly denies the action you want to test."
/>

<Troubleshoot
  issue="New tasks fail to start because they cannot assume the chaos role"
  mode="docs"
  fallback="TASK_ROLE must trust the ecs-tasks.amazonaws.com service principal. Update the chaos role's trust policy to include 'sts:AssumeRole' from 'ecs-tasks.amazonaws.com', then rerun the experiment. You can verify with 'aws iam get-role --role-name <name>' that AssumeRolePolicyDocument lists the service."
/>

<Troubleshoot
  issue="Service is left on the chaos task definition after the experiment"
  mode="docs"
  fallback="The cleanup step calls UpdateService back to the original revision and then deregisters the chaos revision. If the experiment was killed in between, the service is left on the chaos revision. Run 'aws ecs update-service --cluster <c> --service <s> --task-definition <original-arn>' to roll back, then 'aws ecs deregister-task-definition --task-definition <chaos-arn>' to clean up."
/>

---

## Related faults

- [ECS update container resource limit](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-resource-limit): Modify container CPU and memory limits.
- [ECS update container timeout](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-timeout): Modify container start and stop timeouts.
- [ECS invalid container image](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-invalid-container-image): Swap the container image to break image pulls.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
