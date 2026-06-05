---
id: ecs-fargate-cpu-hog
title: ECS Fargate CPU hog
sidebar_label: ECS Fargate CPU Hog
description: Inject CPU stress inside a percentage of running ECS Fargate tasks for a configurable duration via a sidecar container so you can test how the service behaves under sustained CPU pressure.
canonical_url: https://www.harness.io/blog/aws-fargate-a-cloud-based-container-solution-without-kubernetes
keywords:
  - chaos engineering
  - ecs fargate cpu hog
  - aws fault
  - ecs fault
  - cpu stress
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-fargate-cpu-hog
  - /docs/chaos-engineering/chaos-faults/aws/ecs-fargate-cpu-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS Fargate CPU hog is an AWS chaos fault that stresses `CPU_CORES` worth of CPU inside a percentage of running ECS Fargate tasks for a configurable duration. Because Fargate does not expose the underlying host, the fault adds a chaos sidecar container (`SIDECAR_CONTAINER`) to a new task definition revision and rolls the service onto that revision; the sidecar generates the CPU load alongside the main container, sharing the task's CPU budget. When the fault ends, the original revision is restored and the sidecar is removed.

Use this fault to test how a Fargate service behaves under sustained CPU pressure inside the same task boundary as the workload: whether request latency degrades predictably, whether application-level circuit breakers shed load, and whether CPU-based autoscaling reacts correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Workload behaviour under CPU pressure:** When a sidecar consumes most of the task's CPU budget, does the main container throttle gracefully or fail health checks?
- **Autoscaling response:** Does the service's CPU-based scaling policy fire and add capacity within the expected window?
- **Latency degradation curve:** How does percentile latency change as CPU saturation increases, and does the application's circuit breaker engage?
- **Noisy-neighbour isolation:** Within a single Fargate task, do sidecars compete with the main container in surprising ways (for example a logging sidecar starves the workload)?
- **Recovery time:** When the chaos sidecar is removed, how quickly does latency return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS Fargate service:** `SERVICE_NAME` exists in `CLUSTER_NAME` within `REGION` and runs on the Fargate launch type with at least one running task.
- **Sufficient task CPU budget:** The task definition has enough CPU allocated that adding the sidecar's CPU load is meaningful but does not violate Fargate's valid CPU/memory combinations.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below, including `iam:PassRole`.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on Fargate launch type | Supported |
| Amazon ECS on EC2 launch type | Not supported (use [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog) instead) |
| Services with task-level CPU defined | Supported |
| Tasks that already contain a container named `SIDECAR_CONTAINER` | Not supported; pick a unique sidecar name to avoid conflicts |
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

- `ecs:*` actions register the chaos task definition revision and roll the service.
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

Configure the following fault parameters when you add ECS Fargate CPU hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `SERVICE_NAME` | Name of the target ECS service. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CPU_CORES` | Number of CPU cores the chaos sidecar consumes inside the task. | `1` |
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

Reads the current task definition for `SERVICE_NAME`, registers a new revision with an additional chaos sidecar (`SIDECAR_CONTAINER`) configured to stress `CPU_CORES` cores, updates the service to that revision, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original revision and deregisters the chaos revision.

---

## Expected behavior during fault execution

- A new task definition revision is registered that contains every container in the original plus the chaos sidecar.
- The service deploys new tasks on the chaos revision; old tasks drain.
- Inside the new tasks, the sidecar consumes CPU continuously for the fault duration. Because Fargate enforces task-level CPU, the main container's CPU share is reduced.
- Application latency rises and CPU-based scaling alarms may fire.
- The deployment circuit breaker may roll back if new tasks repeatedly fail to become healthy under the load.

:::info When the fault ends
The chaos pod restores the original task definition revision and waits for the rollout to begin. The chaos revision (and its sidecar) is removed from the service; the chaos task definition revision is deregistered.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert on percentile latency SLOs.
- **CPU utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_cpu_utilization` for the service to confirm utilization rises.
- **Autoscaling alarm:** Confirm the CPU-based scaling policy alarm fires and (optionally) that desired count increases.
- **Application errors:** Use a Prometheus probe on application-level error counters to detect degraded behaviour under CPU pressure.

---

## Verify the fault execution effect

While the experiment is running, confirm the chaos revision is active and the sidecar is consuming CPU:

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

2. **Check CPU utilization.**

   In the AWS console (or via CloudWatch Insights), the service's `CPUUtilization` should rise sharply at the start of the chaos window and fall after recovery.

3. **Inspect task IDs across the rollover.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --desired-status RUNNING --region <region>
   ```

   The task ARN list should change at the start of chaos (new tasks on the chaos revision) and again at recovery (back on the original revision).

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original revision and deregisters the chaos revision.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore-and-deregister cleanup.
- **Manual recovery:** If the fault exits before cleanup, roll the service back manually with `aws ecs update-service --task-definition <original-arn>` and deregister the chaos revision.
- **Workload recovery:** Once the chaos sidecar is removed, CPU pressure ends immediately on new tasks; existing draining tasks keep the sidecar until they exit.

---

## Limitations

- **Fargate-only:** This fault is meaningful only on Fargate; for EC2 launch type, use [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog).
- **Valid CPU/memory pairings:** Adding the sidecar must not push the task definition outside Fargate's valid CPU/memory combinations; otherwise registration fails.
- **No in-place stress:** Existing tasks are not stressed; only new tasks on the chaos revision feel the load.
- **Sidecar name must be unique:** If a container named `SIDECAR_CONTAINER` already exists in the task, registration fails.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS Fargate CPU hog fails with InvalidParameterException task cpu/memory invalid"
  mode="docs"
  fallback="Adding the chaos sidecar pushed the task definition outside Fargate's valid CPU/memory combinations. Either lower CPU_CORES, increase the task-level CPU allocation in the base task definition, or pick a different (CPU, memory) pairing that accommodates the sidecar. Valid combinations are documented in the AWS Fargate task definition guide."
/>

<Troubleshoot
  issue="Tasks fail to start on the chaos revision"
  mode="docs"
  fallback="The most common causes are: the chaos sidecar's image cannot be pulled in the task's network configuration (private subnet without NAT, missing VPC endpoint); the task execution role lacks ECR or CloudWatch Logs permissions; or the task does not have enough memory for the sidecar plus the existing containers. Check task stoppedReason via 'aws ecs describe-tasks'."
/>

<Troubleshoot
  issue="CPU utilization does not rise during the chaos window"
  mode="docs"
  fallback="The most common causes are: the deployment never rolled over because maximumPercent prevents new tasks from starting; the sidecar started but exited immediately (check the container's logs); or the task-level CPU allocation is so large that CPU_CORES does not move the needle. Increase CPU_CORES, set maximumPercent to 200, or pick a smaller task to make the effect visible."
/>

<Troubleshoot
  issue="Service is left on the chaos task definition after the experiment"
  mode="docs"
  fallback="If the experiment was killed mid-cleanup, the service may still be on the chaos revision. Run 'aws ecs update-service --cluster <c> --service <s> --task-definition <original-arn>' to roll back, then 'aws ecs deregister-task-definition --task-definition <chaos-arn>' to clean up. The original ARN is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS Fargate memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-memory-hog): Stress memory inside Fargate tasks instead of CPU.
- [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog): Stress CPU inside containers on the EC2 launch type.
- [ECS update container resource limit](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-update-container-resource-limit): Reduce CPU limits to simulate starvation instead of injection.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
