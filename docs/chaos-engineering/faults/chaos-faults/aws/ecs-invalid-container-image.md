---
id: ecs-invalid-container-image
title: ECS invalid container image
sidebar_label: ECS Invalid Container Image
description: Swap the container image of an ECS service to an invalid value for a configurable duration so you can test how ECS, your deployment guardrails, and your alerting respond to a failed image pull.
keywords:
  - chaos engineering
  - ecs invalid container image
  - aws fault
  - ecs fault
  - image pull failure
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-invalid-container-image
  - /docs/chaos-engineering/chaos-faults/aws/ecs-invalid-container-image
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS invalid container image is an AWS chaos fault that registers a new revision of the target service's task definition with an invalid container image (`IMAGE`, default `nginx` with a deliberately wrong tag in practice), updates the service to that revision for a configurable duration, then re-registers the original revision and restores the service. The new tasks fail to start with `CannotPullContainerError` and the service deployment stalls until the fault ends.

Use this fault to test how a deployment behaves when the build pipeline produces a broken image, when an image-tag or registry permission changes break image pulls, and to verify that deployment circuit breakers, alerting, and rollback playbooks all work as expected.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Deployment circuit breaker:** When new tasks cannot start, does the ECS deployment circuit breaker (`deploymentCircuitBreaker.enable=true`) roll back automatically, and within what window?
- **Failure alerting:** Do alarms on `RunningTaskCount`, `PendingTaskCount`, or service events fire and reach the on-call within the SLA?
- **Customer impact during stalled deployment:** Does the existing healthy task continue to serve traffic while the bad deployment is stuck, or does the load balancer mark the service unhealthy because of the stuck pending tasks?
- **Registry permissions:** Does a regression in registry IAM (for example a missing `ecr:GetDownloadUrlForLayer` permission) produce the same symptoms, and is the runbook to detect that ready?
- **Rollback procedure:** Is your manual rollback runbook still accurate when applied under time pressure during a broken deployment?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service:** `SERVICE_NAME` exists in `CLUSTER_NAME` within `REGION` and has at least one running task at the start of the experiment.
- **Service can register new task definition revisions:** The task execution role on the service has permission to pull from your default registry (the fault re-uses the existing role and only swaps the image).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Supported |
| Services with deployment circuit breaker enabled | Supported (the deployment rolls back automatically; restore is a no-op) |
| Services with `maximumPercent=100` | Supported (the existing tasks stay until they are forcibly replaced) |
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

- `ecs:DescribeServices` and `ecs:DescribeTaskDefinition` are used to read the original task definition.
- `ecs:RegisterTaskDefinition` and `ecs:DeregisterTaskDefinition` are used to publish the chaos revision and clean up afterwards.
- `ecs:UpdateService` is used to point the service at the chaos revision and back.
- `iam:PassRole` is required to re-register the task definition with the same task execution role.

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

Configure the following fault parameters when you add ECS invalid container image to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAME` | Name of the target ECS service. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `IMAGE` | Image to inject in the chaos task definition revision. The default value is treated as an obviously invalid reference. Override only if you need to test with a specific bad image (for example a non-existent ECR tag). | `nginx` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of task replicas to affect through the deployment (used to compute `maximumPercent` for the chaos deployment). | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The service runs on the chaos revision for this period before the original revision is restored. | `30` |
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

Reads the current task definition for `SERVICE_NAME`, registers a new revision with the container image swapped to `IMAGE`, calls `UpdateService` to point the service at the chaos revision, waits for `TOTAL_CHAOS_DURATION` seconds, then calls `UpdateService` again with the original revision and deregisters the chaos revision.

---

## Expected behavior during fault execution

- A new task definition revision is registered with the invalid image.
- The service deployment starts launching tasks on the new revision; those tasks transition to `STOPPED` with a stopped reason of `CannotPullContainerError` (or registry-specific error if the image is private without permissions).
- Depending on `deploymentCircuitBreaker.enable` on the service, the deployment either stays in `IN_PROGRESS` indefinitely or rolls back automatically.
- Existing healthy tasks (on the original revision) continue to serve traffic while ECS retries the new revision, up to the `maximumPercent` cap.
- CloudWatch service events report repeated task start failures.

:::info When the fault ends
The chaos pod calls `UpdateService` with the original task definition revision and waits for tasks on the original revision to take over before deregistering the chaos revision. If the deployment circuit breaker already rolled the service back to the original revision, the restore step is a no-op.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service endpoint to confirm existing healthy tasks continue to serve traffic during the bad deployment.
- **Deployment status:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ecs describe-services --query "services[].deployments"` and asserts the deployment circuit breaker triggers a rollback (or asserts that the deployment is stuck, depending on the expected behaviour).
- **Failed tasks:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_pending_task_count` to detect the buildup of failed task attempts.
- **Service events:** Inspect `aws ecs describe-services --query "services[].events"` for repeated `(service ...) was unable to place a task` messages.

---

## Verify the fault execution effect

While the experiment is running, confirm tasks fail to start and the service eventually returns to the original revision:

1. **Inspect deployment list.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].deployments"
   ```

   During the fault you should see two deployments: the new (PRIMARY) deployment on the chaos revision with `pendingCount > 0` and `failedTasks > 0`, and the existing deployment on the original revision serving traffic.

2. **Inspect stopped tasks for failure reason.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --desired-status STOPPED --region <region>
   aws ecs describe-tasks --cluster <cluster> --tasks <arn> --region <region> \
     --query "tasks[].[stoppedReason,containers[0].reason]"
   ```

   The reason should mention `CannotPullContainerError` or `ImagePullBackOff`-like message.

3. **After recovery, confirm the original revision is active.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].taskDefinition"
   ```

   The active task definition ARN should match the pre-fault revision.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `UpdateService` with the original task definition revision and waits for at least one task on that revision to reach `RUNNING`. The chaos revision is then deregistered.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore-and-deregister cleanup.
- **Manual recovery:** If the fault exits before cleanup runs, list task definition revisions with `aws ecs list-task-definitions --family-prefix <family>` and either roll the service back manually or deregister the chaos revision.
- **Workload recovery:** No data loss is expected because the original revision keeps running on at least the minimum healthy percent of tasks; new tasks resume on recovery.

---

## Limitations

- **Service must have a task definition:** Standalone tasks (no service) cannot be targeted by this fault.
- **Requires task execution role permission:** The fault re-registers the task definition with the same task execution role; if that role is restricted such that it cannot publish a new revision (rare), registration will fail.
- **Single service per experiment:** Use multiple experiments to target multiple services with different bad images.
- **maximumPercent constraints:** If the service has `maximumPercent=100`, ECS will not start new tasks until existing tasks are stopped; the bad deployment may not surface until the minimum healthy percent allows it.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS invalid container image experiment fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or IAM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTaskDefinition, ecs:RegisterTaskDefinition, ecs:DeregisterTaskDefinition, ecs:UpdateService, and iam:PassRole for the task execution role used by the target service."
/>

<Troubleshoot
  issue="ECS invalid container image deployment does not stall as expected"
  mode="docs"
  fallback="The most common causes are: the service has deployment circuit breaker enabled with a low failure threshold, so ECS rolled the service back almost immediately; the IMAGE value happens to be a valid pullable reference in your environment (the default 'nginx' will pull successfully on most clusters since Docker Hub is reachable); or the service has very low maximumPercent so ECS never tried to schedule new tasks. Override IMAGE with an obviously invalid value such as 'public.ecr.aws/nonexistent/nope:does-not-exist', or disable the circuit breaker during the experiment."
/>

<Troubleshoot
  issue="Existing healthy tasks were terminated during the chaos window"
  mode="docs"
  fallback="The service's deployment configuration has minimumHealthyPercent=0 or very low, which lets ECS drain healthy tasks before the new tasks are ready. Increase minimumHealthyPercent to 50 or higher on the service before running this fault, so that the existing revision continues to serve traffic while the new revision fails."
/>

<Troubleshoot
  issue="ECS invalid container image does not deregister the chaos revision"
  mode="docs"
  fallback="Cleanup deregisters the chaos task definition revision after the service has switched back. If the fault exits before that point or the deregister call fails on permissions, the chaos revision remains in INACTIVE state in the family (no harm). Deregister it manually with 'aws ecs deregister-task-definition --task-definition <family>:<revision>' if you want to keep the revision list tidy."
/>

---

## Related faults

- [ECS update container resource limit](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-resource-limit): Modify container resource limits in a new revision.
- [ECS update container timeout](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-timeout): Modify container start/stop timeouts in a new revision.
- [ECS update task role](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-task-role): Swap the task role to test permission failures.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
