---
id: ecs-task-scale
title: ECS task scale
sidebar_label: ECS Task Scale
description: Force one or more ECS services to a configurable replica count for a configurable duration so you can test how the workload, dependent services, and autoscaling logic behave when capacity is suddenly scaled up or down.
keywords:
  - chaos engineering
  - ecs task scale
  - aws fault
  - ecs fault
  - service scaling
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-task-scale
  - /docs/chaos-engineering/chaos-faults/aws/ecs-task-scale
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS task scale is an AWS chaos fault that calls `UpdateService` on one or more ECS services to set their desired count to a chaos value (`REPLICAS`) for the duration of the fault, then restores the original desired count when the fault ends. The fault works with both EC2-backed and Fargate services and triggers normal ECS deployment behaviour (tasks are added or stopped to match the new desired count).

Use this fault to test how a service behaves when it suddenly scales up (cold-start storms, throttled downstream dependencies, license consumption) or scales down (request loss, latency spikes, downstream connection pool churn), and to validate that autoscaling alarms and dashboards respond as expected.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Scale-down impact:** When the service is scaled below its normal desired count, do remaining tasks absorb the traffic and stay within latency SLOs?
- **Scale-up cold start:** When the service suddenly doubles in size, do new tasks start, register with the load balancer, and warm up within the deployment health check window?
- **Downstream connection pools:** Does a scale-up cause connection-pool exhaustion in a downstream database or cache, and does the system shed load gracefully?
- **Autoscaling alarms:** Do CloudWatch alarms (CPU, memory, request count) fire and unmuted within the expected SLA when the service deliberately undersize?
- **Capacity provider behaviour:** For ASG-backed capacity providers, does the cluster scale out to meet the new desired count, and is the time to ready reasonable?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS services:** Every service named in `SERVICE_NAMES` exists in `CLUSTER_NAME` within `REGION` and has a non-zero desired count at the start of the experiment.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.
- **Capacity to scale up (when `REPLICAS` is larger than current):** The cluster has free CPU and memory to host the additional tasks, or the capacity provider is allowed to scale.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Supported |
| Services with capacity-provider strategies | Supported |
| Services with deployment circuit breaker | Supported (a failed deployment rolls back automatically) |
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
        "ecs:DescribeClusters",
        "ecs:DescribeServices",
        "ecs:UpdateService",
        "ecs:ListTasks",
        "ecs:DescribeTasks"
      ],
      "Resource": "*"
    }
  ]
}
```

- `ecs:DescribeServices` is used to read the current desired count before the fault.
- `ecs:UpdateService` drives the fault.
- `ecs:ListTasks` and `ecs:DescribeTasks` are used by the verification step to confirm the new desired count is reached.

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

Configure the following fault parameters when you add ECS task scale to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAMES` | Comma-separated list of ECS service names to scale. Every named service is set to `REPLICAS`. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |
| `REPLICAS` | Desired count to set for each target service during the fault. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The service is held at `REPLICAS` for this period, then restored to its original count. | `60` |
| `SEQUENCE` | Order in which multiple services are scaled: `parallel` issues all `UpdateService` calls at once; `serial` issues them one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Reads the current desired count of every service in `SERVICE_NAMES`, calls `UpdateService` to set the desired count to `REPLICAS`, waits for `TOTAL_CHAOS_DURATION` seconds, then calls `UpdateService` again to restore each service's original desired count.

---

## Expected behavior during fault execution

- When `REPLICAS` is lower than the current desired count, the ECS service controller stops `current - REPLICAS` tasks (oldest first by default).
- When `REPLICAS` is higher than the current desired count, the controller calls `RunTask` to launch `REPLICAS - current` additional tasks; if there is insufficient capacity, the deployment stalls until capacity becomes available or the deployment circuit breaker fires.
- The load balancer target group is updated as tasks register and deregister.
- CloudWatch metrics such as `RunningTaskCount` and (for ALB-backed services) `HealthyHostCount` reflect the new size.
- Autoscaling alarms (if configured) may trigger; this fault overrides the autoscaling controller only for the duration of the experiment.

:::info When the fault ends
The chaos pod calls `UpdateService` again with the original desired count. The service controller drains or launches tasks until that count is restored. Autoscaling resumes acting on the restored baseline.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to detect downtime when scaling down, and to measure cold-start latency when scaling up.
- **Running task count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_running_task_count` to confirm the target count is reached.
- **Latency:** Use a Prometheus probe on a percentile latency metric (for example `aws_applicationelb_target_response_time`) to detect SLO breaches during scale changes.
- **Downstream dependencies:** Use a Prometheus probe on database connection counts or queue depths to detect scale-induced fan-out problems.

---

## Verify the fault execution effect

While the experiment is running, confirm the service is at the chaos size and then restored:

1. **Inspect service desired vs running count.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].[serviceName,desiredCount,runningCount,pendingCount]"
   ```

   During the fault `desiredCount` should equal `REPLICAS`. After recovery it should return to the pre-fault value.

2. **List running tasks.**

   ```bash
   aws ecs list-tasks \
     --cluster <cluster> \
     --service-name <service> \
     --desired-status RUNNING \
     --region <region>
   ```

   The number of returned ARNs should match the current desired count once the deployment stabilizes.

3. **Watch the service event stream.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].events[0:10]"
   ```

   Look for "service ... has started ... tasks" and "service ... has stopped ... tasks" events confirming the scale change.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `UpdateService` with the original desired count. The ECS service controller restores the count on its own schedule.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before the restore call (for example because of an IAM failure on the restore), set the desired count manually with `aws ecs update-service --desired-count <original>`.
- **Autoscaling reconciliation:** Application Auto Scaling may take a few minutes to converge on the steady-state target after the fault ends; this is normal.

---

## Limitations

- **Single chaos size per experiment:** The fault sets every service in `SERVICE_NAMES` to the same `REPLICAS` value. Use multiple experiments if different services need different chaos sizes.
- **Autoscaling override window:** While the fault is active, the desired count is held; autoscaling alarms may fire but cannot scale the service until the fault ends.
- **Deployment circuit breaker can roll back:** If the new desired count cannot be reached because of capacity or task-start failures, the deployment circuit breaker rolls the service back, which the fault treats as a failure.
- **No per-task targeting:** This fault changes service capacity, not individual task identity. Use [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop) when you need to kill specific replicas.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS task scale experiment fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices and ecs:UpdateService for the target cluster. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="ECS task scale leaves runningCount below REPLICAS at the end of the chaos window"
  mode="docs"
  fallback="The service could not reach the target desired count within the chaos window. The most common causes are: insufficient cluster capacity (CPU or memory) to schedule more tasks; the capacity provider could not scale the ASG fast enough; task placement constraints (distinctInstance, attribute, instanceType) cannot be satisfied; or container start failures are tripping the deployment circuit breaker. Inspect 'aws ecs describe-services' events and check the ASG scaling activity."
/>

<Troubleshoot
  issue="Autoscaling fights with ECS task scale"
  mode="docs"
  fallback="Application Auto Scaling continues to compute target capacity based on alarms while the fault is active. The fault holds the desired count via UpdateService, which overrides autoscaling for that window; autoscaling resumes when the fault ends. If you need to suppress autoscaling during the experiment, suspend the scalable target before the fault and resume after."
/>

<Troubleshoot
  issue="ECS task scale does not restore the original desired count"
  mode="docs"
  fallback="The fault stores the pre-fault desired count and calls UpdateService with that value at the end. If the restore fails (for example because of an IAM permission failure on the restore call only), the service is left at REPLICAS. Set the desired count manually with 'aws ecs update-service' and check the chaos pod logs for the cause."
/>

---

## Related faults

- [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop): Stop specific tasks instead of changing service capacity.
- [ECS instance stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-instance-stop): Reduce capacity at the container-instance level.
- [ECS update container resource limit](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-resource-limit): Reduce CPU/memory limits to simulate resource starvation.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
