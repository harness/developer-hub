---
id: ecs-fargate-memory-hog
title: ECS Fargate memory hog
sidebar_label: ECS Fargate Memory Hog
description: Consume a configurable amount of memory inside a percentage of running ECS Fargate tasks for a configurable duration via a sidecar container so you can test how the service behaves under sustained memory pressure.
canonical_url: https://www.harness.io/blog/aws-fargate-a-cloud-based-container-solution-without-kubernetes
keywords:
  - chaos engineering
  - ecs fargate memory hog
  - aws fault
  - ecs fault
  - memory stress
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-fargate-memory-hog
  - /docs/chaos-engineering/chaos-faults/aws/ecs-fargate-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS Fargate memory hog is an AWS chaos fault that consumes `MEMORY_IN_MEGABYTE` MB of memory inside a percentage of running ECS Fargate tasks for a configurable duration. Because Fargate does not expose the underlying host, the fault adds a chaos sidecar container (`SIDECAR_CONTAINER`) to a new task definition revision and rolls the service onto that revision; the sidecar allocates and holds memory inside the same task boundary as the main container. When the fault ends, the original revision is restored and the sidecar is removed.

Use this fault to test how a Fargate service behaves under sustained memory pressure inside the same task as the workload: whether the main container is OOM-killed first, whether the application detects low-memory conditions and sheds load, and whether memory-based autoscaling reacts correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **OOM behaviour:** When the sidecar consumes most of the task's memory budget, does the main container OOM-kill first, and does the task restart cleanly?
- **Autoscaling response:** Does the service's memory-based scaling policy fire and add capacity within the expected window?
- **Cache eviction:** For caches that hold a large working set in process memory, do they evict gracefully under pressure, or do they crash?
- **Memory-safe languages vs unsafe:** Does the application's GC behaviour stabilize, or does it enter a death spiral?
- **Recovery time:** When the chaos sidecar is removed, how quickly does the workload return to baseline memory utilization?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS Fargate service:** `SERVICE_NAME` exists in `CLUSTER_NAME` within `REGION` and runs on the Fargate launch type with at least one running task.
- **Sufficient task memory budget:** The task definition has enough memory allocated that adding the sidecar's reservation is meaningful but does not violate Fargate's valid CPU/memory combinations.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below, including `iam:PassRole`.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on Fargate launch type | Supported |
| Amazon ECS on EC2 launch type | Not supported (use [ECS container memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-memory-hog) instead) |
| Services with task-level memory defined | Supported |
| Tasks that already contain a container named `SIDECAR_CONTAINER` | Not supported; pick a unique sidecar name |
| AWS regions | Supported in every commercial region where Fargate is available; pass the region in `REGION` |

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

Configure the following fault parameters when you add ECS Fargate memory hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAME` | Name of the target ECS service. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MEMORY_IN_MEGABYTE` | Amount of memory (in MB) the chaos sidecar allocates inside the task. | `500` |
| `SIDECAR_CONTAINER` | Name to use for the chaos sidecar container in the task definition. Must not clash with any existing container name in the task. | `default` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of task replicas to affect through the deployment. | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The service runs on the chaos revision (with the stress sidecar) for this period. | `30` |
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

Reads the current task definition for `SERVICE_NAME`, registers a new revision with an additional chaos sidecar (`SIDECAR_CONTAINER`) configured to allocate `MEMORY_IN_MEGABYTE` MB, updates the service to that revision, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original revision and deregisters the chaos revision.

---

## Expected behavior during fault execution

- A new task definition revision is registered with the chaos sidecar added.
- The service deploys new tasks on the chaos revision; old tasks drain.
- Inside the new tasks, the sidecar allocates and holds the requested memory. Because Fargate enforces task-level memory, the main container's available memory is reduced.
- If the combined working set exceeds the task's memory limit, ECS OOM-kills the container that exceeded its limit (usually whichever container hit its container-level limit first). Frequently, this is the chaos sidecar itself.
- Application latency may rise; the memory-based autoscaling alarm may fire.

:::info When the fault ends
The chaos pod restores the original task definition revision and waits for the rollout to begin. The chaos revision (and its sidecar) is removed from the service; the chaos task definition revision is deregistered.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Memory utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_memory_utilization` for the service to confirm utilization rises.
- **Task OOM count:** Use a Prometheus probe on a counter incremented when ECS reports OOM-killed containers (visible via `aws ecs describe-tasks --query "tasks[].containers[].exitCode"`).
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency stays within SLO.
- **Autoscaling alarm:** Confirm the memory-based scaling policy alarm fires when expected.

---

## Verify the fault execution effect

While the experiment is running, confirm the chaos revision is active and memory utilization rose:

1. **Inspect the active task definition.**

   ```bash
   aws ecs describe-services \
     --cluster <cluster> \
     --services <service> \
     --region <region> \
     --query "services[].taskDefinition"
   aws ecs describe-task-definition \
     --task-definition <active-arn> \
     --region <region> \
     --query "taskDefinition.containerDefinitions[].name"
   ```

   During the fault the container list should include `SIDECAR_CONTAINER`; afterwards it should not.

2. **Check memory utilization.**

   In the AWS console (or via CloudWatch Insights), the service's `MemoryUtilization` should rise during the chaos window and fall after recovery.

3. **Check for OOM kills.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --desired-status STOPPED --region <region>
   aws ecs describe-tasks --cluster <cluster> --tasks <arn> --region <region> \
     --query "tasks[].containers[].[name,exitCode,reason]"
   ```

   Look for `OutOfMemoryError` in the reason field for containers that were OOM-killed.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original revision and deregisters the chaos revision.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore-and-deregister cleanup.
- **Manual recovery:** If the fault exits before cleanup, roll the service back manually with `aws ecs update-service --task-definition <original-arn>` and deregister the chaos revision.
- **Workload recovery:** Restarting tasks pick up the original memory layout; in-memory state held by the OOM-killed processes is lost.

---

## Limitations

- **Fargate-only:** This fault is meaningful only on Fargate; for EC2 launch type, use [ECS container memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-memory-hog).
- **Valid CPU/memory pairings:** Adding the sidecar must not push the task definition outside Fargate's valid CPU/memory combinations; otherwise registration fails.
- **No in-place stress:** Existing tasks are not stressed; only new tasks on the chaos revision feel the load.
- **Sidecar name must be unique:** If a container named `SIDECAR_CONTAINER` already exists in the task, registration fails.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS Fargate memory hog fails with InvalidParameterException task cpu/memory invalid"
  mode="docs"
  fallback="Adding the chaos sidecar pushed the task definition outside Fargate's valid CPU/memory combinations. Either lower MEMORY_IN_MEGABYTE, increase the task-level memory allocation in the base task definition, or pick a different (CPU, memory) pairing that accommodates the sidecar. Valid combinations are documented in the AWS Fargate task definition guide."
/>

<Troubleshoot
  issue="Chaos sidecar is OOM-killed but main container is not"
  mode="docs"
  fallback="ECS OOM kills the container that first exceeds its container-level memory limit. If the sidecar has a smaller container-level memory limit than its allocation, it is killed first and the main container is not stressed. Either raise the sidecar's memory limit (it's part of the chaos revision) by increasing MEMORY_IN_MEGABYTE relative to the task budget, or pick a smaller task to make the effect visible."
/>

<Troubleshoot
  issue="Memory utilization does not rise during the chaos window"
  mode="docs"
  fallback="The most common causes are: the deployment never rolled over because maximumPercent prevents new tasks from starting; the sidecar started but exited immediately (check the container's logs); or the task-level memory allocation is so large that MEMORY_IN_MEGABYTE does not move the needle. Increase MEMORY_IN_MEGABYTE, set maximumPercent to 200, or pick a smaller task."
/>

<Troubleshoot
  issue="Service is left on the chaos task definition after the experiment"
  mode="docs"
  fallback="If the experiment was killed mid-cleanup, the service may still be on the chaos revision. Run 'aws ecs update-service --cluster <c> --service <s> --task-definition <original-arn>' to roll back, then 'aws ecs deregister-task-definition --task-definition <chaos-arn>' to clean up. The original ARN is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS Fargate CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-cpu-hog): Stress CPU inside Fargate tasks instead of memory.
- [ECS container memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-memory-hog): Stress memory inside containers on the EC2 launch type.
- [ECS update container resource limit](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-resource-limit): Reduce memory limits to simulate starvation instead of injection.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
