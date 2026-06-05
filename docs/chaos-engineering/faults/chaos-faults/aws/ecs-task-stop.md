---
id: ecs-task-stop
title: ECS task stop
sidebar_label: ECS Task Stop
description: Stop a configurable percentage of ECS tasks (selected by task ID or by service) for a configurable duration so you can test how the service reschedules, how dependent traffic reroutes, and how the workload recovers.
keywords:
  - chaos engineering
  - ecs task stop
  - aws fault
  - ecs fault
  - task termination
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-task-stop
  - /docs/chaos-engineering/chaos-faults/aws/ecs-task-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS task stop is an AWS chaos fault that stops a configurable percentage of running ECS tasks (selected by explicit task IDs or by `SERVICE_NAME`) for a configurable duration. Stopped tasks transition to `STOPPED` immediately and the ECS service controller (for service-managed tasks) launches replacements to restore the desired count. Standalone tasks started with `run-task` are not replaced.

Use this fault to test how an ECS service behaves when individual task replicas disappear: whether traffic reroutes to healthy replicas, whether the deployment reaches steady state again within the recovery SLA, and whether dependent services (caches, databases, sidecars) survive the partial outage.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Replica failover:** When a percentage of replicas is stopped, do remaining tasks absorb the traffic without dropping requests?
- **Service recovery time:** How long does the service controller take to bring the desired count back, and does the deployment ever stall?
- **Load balancer rotation:** Does the target group remove stopped tasks quickly enough, and does it register replacement tasks cleanly?
- **Sidecar dependencies:** For tasks with sidecars (Envoy, log shippers, etc.), do the sidecars in surviving tasks remain healthy when peer tasks disappear?
- **Connection draining:** Does the ECS `stopTimeout` and `SIGTERM` handling give the application enough time to drain long-lived connections?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS cluster and service:** `CLUSTER_NAME` exists in `REGION`. Either `SERVICE_NAME` is set (so the fault stops a percentage of the service's tasks), or `TASK_REPLICA_IDS` is set (so the fault stops those exact task IDs).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Supported |
| Service-managed tasks | Supported (tasks are rescheduled automatically) |
| Standalone tasks (run-task) | Supported (tasks are stopped but not rescheduled) |
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
        "ecs:DescribeTasks",
        "ecs:ListTasks",
        "ecs:StopTask"
      ],
      "Resource": "*"
    }
  ]
}
```

- `ecs:ListTasks` and `ecs:DescribeTasks` are used to enumerate candidate task IDs from `SERVICE_NAME` or to validate the explicit IDs in `TASK_REPLICA_IDS`.
- `ecs:StopTask` drives the fault.
- `ecs:DescribeServices` and `ecs:DescribeClusters` are used to validate the target and (optionally) to confirm desired count is restored.

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

Configure the following fault parameters when you add ECS task stop to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_NAME` | Name of the target ECS service. When set (and `TASK_REPLICA_IDS` is empty), the fault selects `TASK_REPLICA_AFFECTED_PERC` of the service's running tasks. | `""` |
| `TASK_REPLICA_IDS` | Comma-separated list of explicit ECS task IDs to stop (overrides `SERVICE_NAME` and percentage selection). | `0` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of the service's running tasks to stop when `SERVICE_NAME` is set. `0` corresponds to one task. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive stop iterations when running for more than one cycle. | `60` |
| `SEQUENCE` | Order in which multiple tasks are stopped: `parallel` stops all selected tasks at once; `serial` stops them one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the target task list from `TASK_REPLICA_IDS` or `SERVICE_NAME` + `TASK_REPLICA_AFFECTED_PERC`, calls `StopTask` on every selected task in `CLUSTER_NAME` / `REGION`, then waits for `TOTAL_CHAOS_DURATION` seconds before letting the service controller restore the desired count.

---

## Expected behavior during fault execution

- Selected tasks transition from `RUNNING` to `DEPROVISIONING` to `STOPPED` within seconds of the stop call. The `SIGTERM` and `stopTimeout` from the task definition are honoured, so well-behaved applications get the chance to drain.
- Targets in the load balancer target group for those tasks are marked unhealthy and removed from rotation.
- For service-managed tasks, the ECS service controller observes that running count is below desired count and launches replacements according to the deployment configuration.
- For standalone tasks (started with `run-task`), no replacement is launched; the running task count for the workload remains reduced after the fault.
- Customer requests in flight to a stopped task either drain via `SIGTERM` or are reset, depending on the application.

:::info When the fault ends
This fault stops tasks but does not start replacements itself; the ECS service controller is responsible for restoring desired count. The fault waits `TOTAL_CHAOS_DURATION` seconds before reporting success so that the resilience signals can be measured during the recovery window.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service endpoint to detect downtime and measure recovery time.
- **Running task count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_running_task_count` to confirm desired count is restored.
- **Target group health:** Use a Prometheus probe on `aws_applicationelb_healthy_host_count` to confirm replacement tasks register cleanly.
- **Task lifecycle:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ecs describe-tasks` and asserts the expected task ARN set at each phase.

---

## Verify the fault execution effect

While the experiment is running, confirm tasks are stopped and the service recovers:

1. **List running tasks for the service.**

   ```bash
   aws ecs list-tasks \
     --cluster <cluster> \
     --service-name <service> \
     --desired-status RUNNING \
     --region <region>
   ```

   The running task count should drop by `TASK_REPLICA_AFFECTED_PERC` during the fault and return to normal afterwards.

2. **Inspect individual task state.**

   ```bash
   aws ecs describe-tasks \
     --cluster <cluster> \
     --tasks <task-arn> \
     --region <region> \
     --query "tasks[].[taskArn,lastStatus,stoppedReason]"
   ```

   Stopped tasks should report `STOPPED` with a stop reason; replacement tasks should appear with new ARNs.

3. **Check service deployment status.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].deployments"
   ```

   The deployment should reach `runningCount == desiredCount` once recovery is complete.

---

## Recovery and cleanup

- **End of duration:** The fault stops driving and the ECS service controller restores desired count on its own schedule.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels any pending iterations; tasks that have already been stopped are not restored by the fault (the service controller restores them as usual).
- **Manual recovery:** For standalone tasks (no service), restart them with `aws ecs run-task` and the appropriate task definition.
- **Workload recovery:** Long-lived TCP connections that were dropped during the outage need to be re-established by the caller. Sticky sessions tied to a specific task IP are broken.

---

## Limitations

- **Standalone tasks are not replaced:** Only service-managed tasks are replaced; tasks started with `run-task` stay stopped after the fault.
- **No fine-grained selection beyond service:** Selection is by service or explicit ID; you cannot target tasks by tag or by container instance in this fault. Use placement-constraint-aware patterns or `TASK_REPLICA_IDS` for finer control.
- **Deployment in progress:** If a deployment is in progress, the fault counts tasks at the moment of execution; behaviour during ongoing deployments is harder to reason about.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).
- **stopTimeout is honoured:** Stopping tasks is not instant; high `stopTimeout` values in the task definition can cause the fault to take longer to fully drain replicas than `TOTAL_CHAOS_DURATION` suggests.

---

## Troubleshooting

<Troubleshoot
  issue="ECS task stop experiment fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS permissions in the target region. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:ListTasks, ecs:DescribeTasks, ecs:StopTask, ecs:DescribeServices, and ecs:DescribeClusters. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="ECS task stop reports no tasks were selected"
  mode="docs"
  fallback="The fault could not find any candidate tasks. The most common causes are: SERVICE_NAME does not exist in CLUSTER_NAME; the service currently has zero running tasks; TASK_REPLICA_IDS were provided but the IDs are stale (already STOPPED); or TASK_REPLICA_AFFECTED_PERC=0 with no specific IDs. Verify with 'aws ecs list-tasks --service-name <svc>' and re-run."
/>

<Troubleshoot
  issue="ECS service did not reschedule tasks after ECS task stop"
  mode="docs"
  fallback="The most common causes are: the affected tasks were standalone (not service-managed) and therefore are not rescheduled automatically; the service has maximumPercent set such that the replacement count is constrained; the cluster does not have enough free capacity (CPU/memory reservation) to schedule replacements; or task placement constraints prevent rescheduling. Inspect 'aws ecs describe-services' for events and adjust capacity or constraints accordingly."
/>

<Troubleshoot
  issue="Customer requests are dropped instead of drained when tasks are stopped"
  mode="docs"
  fallback="The application is not handling SIGTERM gracefully or the task definition's stopTimeout is too short. Increase stopTimeout in the task definition to at least the longest request duration plus a buffer, and ensure the application begins draining (closing keep-alive connections, refusing new requests) on SIGTERM. Also confirm the load balancer's deregistration delay is long enough for in-flight requests."
/>

---

## Related faults

- [ECS task scale](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-scale): Scale a service's desired count up or down to test capacity changes.
- [ECS instance stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-instance-stop): Stop the underlying container instance instead of individual tasks.
- [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog): Stress the CPU inside a running task without stopping it.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
