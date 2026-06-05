---
id: ecs-update-container-resource-limit
title: ECS update container resource limit
sidebar_label: ECS Update Container Resource Limit
description: Re-register the task definition of an ECS service with smaller CPU and memory limits for a configurable duration so you can test how the workload behaves when its container resources shrink.
keywords:
  - chaos engineering
  - ecs update container resource limit
  - aws fault
  - ecs fault
  - resource limits
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-update-container-resource-limit
  - /docs/chaos-engineering/chaos-faults/aws/ecs-update-container-resource-limit
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS update container resource limit is an AWS chaos fault that registers a new revision of the target service's task definition with the container CPU (`CPU_LIMIT`, in CPU units) and memory (`MEMORY_LIMIT`, in MB) set to lower chaos values, updates the service to that revision for a configurable duration, then re-registers and restores the original revision. New tasks scheduled during the chaos window run with the tighter limits; the kernel and the ECS agent enforce them through cgroups (and Fargate enforces them at the VM boundary).

Use this fault to test how a workload behaves when its container resources shrink: whether the application throttles cleanly, whether OOM kills happen at predictable thresholds, and whether autoscaling, retries, and alerting respond correctly to a slow service.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **CPU throttling impact:** When CPU is squeezed, does the application throttle gracefully (request latency rises predictably), or does it deadlock and stop serving?
- **OOM behaviour:** When memory drops below the working-set size, does the container OOM-kill cleanly and restart, and does the orchestrator launch a replacement?
- **Sidecar interplay:** Do log shippers, proxies, and other sidecars survive when the main container is starved, or do they fail in surprising ways?
- **Autoscaling triggers:** Does an autoscaling alarm on CPU utilization fire as expected when resources shrink, and does it eventually scale out?
- **Capacity-aware scheduling:** For EC2 launch type, does the scheduler find capacity for the new task with the smaller limits, or does it stall?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service:** `SERVICE_NAME` exists in `CLUSTER_NAME` within `REGION` and has at least one running task.
- **Pick safe limits:** `CPU_LIMIT` and `MEMORY_LIMIT` are at or above the absolute minimums the application needs to start (otherwise the chaos tasks will fail to start cleanly and the deployment circuit breaker may trip).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below, including `iam:PassRole`.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Supported (only certain CPU/memory pairings are valid on Fargate; see Limitations) |
| Services with task-level and container-level limits | Supported (the fault changes container-level limits) |
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

Configure the following fault parameters when you add ECS update container resource limit to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAME` | Name of the target ECS service. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_LIMIT` | CPU limit (in CPU units; 1024 = 1 vCPU) to apply to each container in the task during the chaos window. | `250` |
| `MEMORY_LIMIT` | Memory limit (in MB) to apply to each container in the task during the chaos window. | `250` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of task replicas to affect through the deployment. | `100` |
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

Reads the current task definition for `SERVICE_NAME`, registers a new revision with each container's `cpu` and `memory` set to `CPU_LIMIT` and `MEMORY_LIMIT`, updates the service to that revision, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original revision and deregisters the chaos revision.

---

## Expected behavior during fault execution

- A new task definition revision is registered with the smaller limits.
- The service deploys new tasks on the chaos revision; old tasks drain according to the deployment configuration.
- New tasks run under tighter CPU and memory caps. The kernel throttles CPU through cgroups; the kubelet/agent OOM-kills processes that exceed memory.
- Application latency and error rates change in proportion to the resource cut.
- ECS service events and CloudWatch metrics (CPUUtilization, MemoryUtilization) reflect the new limits.

:::info When the fault ends
The chaos pod calls `UpdateService` with the original task definition revision and waits for at least one task on the original revision to reach `RUNNING`. The chaos revision is then deregistered. New tasks run with the original limits; running tasks on the chaos revision are drained as the rollout completes.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service endpoint and assert on the percentile latency SLO.
- **OOM kills:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_task_oomkilled` (if exported) or on a custom counter incremented when the application receives a non-zero exit code.
- **Resource utilization:** Use a Prometheus probe on `aws_ecs_cpu_utilization` and `aws_ecs_memory_utilization` to confirm utilization rises as the cap shrinks.
- **Autoscaling alarms:** Confirm the expected autoscaling alarms (CPU above threshold) fire during the chaos window.

---

## Verify the fault execution effect

While the experiment is running, confirm the limits change and then restore:

1. **Inspect the active task definition revision.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].taskDefinition"
   ```

   The active revision should change at the start of the chaos window and return to the original at the end.

2. **Inspect container limits.**

   ```bash
   aws ecs describe-task-definition \
     --task-definition <active-arn> \
     --region <region> \
     --query "taskDefinition.containerDefinitions[].[name,cpu,memory]"
   ```

   During the fault each container's `cpu` and `memory` should equal `CPU_LIMIT` and `MEMORY_LIMIT`.

3. **Check CloudWatch utilization metrics.**

   In the AWS console, the service's `CPUUtilization` and `MemoryUtilization` metrics should rise during the chaos window as the smaller cap forces higher utilization at the same workload.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original revision and deregisters the chaos revision.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore-and-deregister cleanup.
- **Manual recovery:** If the fault exits before cleanup, roll the service back manually with `aws ecs update-service --task-definition <original-arn>` and deregister the chaos revision.
- **Workload recovery:** OOM-killed processes restart with the original limits on the new tasks; any data not persisted by the killed process is lost.

---

## Limitations

- **Fargate CPU/memory pairings:** Fargate allows only a fixed set of CPU/memory combinations. If the chaos values fall outside that table, registration fails and the fault errors out. Go to [Fargate task size](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html) to review valid combinations.
- **Existing tasks keep original limits:** Running tasks are not resized in place; only new tasks scheduled during the chaos window get the new limits. Combine with [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop) to force a rollover.
- **Single service per experiment:** Use multiple experiments to target multiple services with different limits.
- **`iam:PassRole` is required:** The chaos infrastructure must be allowed to re-register the task definition with the same task execution role.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS update container resource limit fails with InvalidParameterException task cpu/memory invalid"
  mode="docs"
  fallback="Fargate enforces a fixed table of valid (CPU, memory) pairings at the task level. If the sum of the chaos container limits does not map to a valid task size, registration fails. Pick CPU_LIMIT and MEMORY_LIMIT values that, when summed across containers, fall on a valid Fargate task size (for example 512 CPU with 1024 MB memory). The valid combinations are documented in the AWS Fargate task definition guide."
/>

<Troubleshoot
  issue="New tasks OOM-kill immediately after deployment"
  mode="docs"
  fallback="MEMORY_LIMIT is below the application's startup working-set. Either increase MEMORY_LIMIT to a value that still constrains but allows startup, or test the OOM path in isolation with a smaller affected percentage so only a fraction of the service crashes at once. Application logs in CloudWatch report the OOM kill as a non-zero exit code on the container."
/>

<Troubleshoot
  issue="Application latency increased but no autoscaling triggered"
  mode="docs"
  fallback="The autoscaling alarm threshold is higher than the utilization the chaos window produces. Either lower the threshold for the test, or pick a smaller CPU_LIMIT that drives utilization higher. Also check that the alarm period and evaluation periods are short enough for the alarm to fire within TOTAL_CHAOS_DURATION."
/>

<Troubleshoot
  issue="Service is left on the chaos task definition after the experiment"
  mode="docs"
  fallback="If the experiment was killed mid-cleanup, the service may still be on the chaos revision. Run 'aws ecs update-service --cluster <c> --service <s> --task-definition <original-arn>' to roll back, then 'aws ecs deregister-task-definition --task-definition <chaos-arn>' to clean up. The original ARN is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS update container timeout](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-timeout): Modify container start and stop timeouts.
- [ECS update task role](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-task-role): Swap the task role to test permission failures.
- [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog): Stress CPU inside running containers without changing limits.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
