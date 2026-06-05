---
id: ecs-container-memory-hog
title: ECS container memory hog
sidebar_label: ECS Container Memory Hog
description: Consume a configurable amount of memory (absolute or percentage) using a configurable number of workers inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration so you can test how the workload behaves under sustained memory pressure.
keywords:
  - chaos engineering
  - ecs container memory hog
  - aws fault
  - ecs fault
  - memory stress
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-memory-hog
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-memory-hog
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container memory hog is an AWS chaos fault that allocates `MEMORY_CONSUMPTION` MB (or `MEMORY_PERCENTAGE` percent of the container's memory limit) using `NUMBER_OF_WORKERS` worker threads inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration. The fault discovers the EC2 container instances hosting the target tasks and runs memory-stress commands inside the relevant containers via AWS Systems Manager Run Command on each host, scoped by ECS container metadata.

Use this fault to test how an ECS workload behaves under sustained memory pressure that is contained to a subset of tasks: whether the container OOM-kills cleanly, whether application-level memory limits engage, whether replacement tasks recover quickly, and whether memory-based autoscaling responds correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **OOM kill behaviour:** When memory exceeds the container limit, does ECS OOM-kill the container cleanly, and does the service controller launch a replacement?
- **Cache eviction:** For caches that hold a large working set in memory, do they evict gracefully under pressure, or do they crash?
- **Memory leak detection:** Does monitoring detect rapidly rising memory usage within the alarm SLA?
- **GC pressure (managed runtimes):** Does the JVM/CLR/Go runtime stabilize, or does it enter a GC death spiral?
- **Recovery time:** When the stress ends, how quickly does memory return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service or cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type. If `SERVICE_NAME` is set, the fault selects from that service's running tasks.
- **Container instances are SSM-managed:** Every EC2 container instance is registered with AWS Systems Manager.
- **ECS container metadata enabled:** Container metadata must be enabled so the fault can locate the target container on each host. Go to [Container metadata file](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html) to enable it.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Not supported (use [ECS Fargate memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-memory-hog) instead) |
| Linux container instances | Supported |
| Windows container instances | Not supported |
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
        "ecs:ListContainerInstances",
        "ecs:DescribeContainerInstances"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:SendCommand",
        "ssm:CancelCommand",
        "ssm:GetCommandInvocation",
        "ssm:DescribeInstanceInformation"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2messages:AcknowledgeMessage",
        "ec2messages:DeleteMessage",
        "ec2messages:FailMessage",
        "ec2messages:GetEndpoint",
        "ec2messages:GetMessages",
        "ec2messages:SendReply"
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

Configure the following fault parameters when you add ECS container memory hog to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_NAME` | Name of the target ECS service. When set, the fault selects `TASK_REPLICA_AFFECTED_PERC` of the service's running tasks. | `""` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of running tasks to stress when `SERVICE_NAME` is set. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `MEMORY_CONSUMPTION` | Amount of memory in MB to allocate per worker inside the container. Set to `0` and use `MEMORY_PERCENTAGE` for a percentage-based allocation. | `100` |
| `MEMORY_PERCENTAGE` | Percentage of the container's memory limit to allocate. Used only when `MEMORY_CONSUMPTION=0`. | `0` |
| `NUMBER_OF_WORKERS` | Number of worker threads that each allocate `MEMORY_CONSUMPTION` MB. | `1` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTALL_DEPENDENCIES` | Install the stress tooling on each container instance if missing. | `true` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault runs additional checks against ECS to verify task health. | `false` |
| `SEQUENCE` | Order in which multiple tasks are stressed: `parallel` issues the stress on all selected tasks at once; `serial` does so one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the running tasks for `SERVICE_NAME` (or all tasks in `CLUSTER_NAME`), picks `TASK_REPLICA_AFFECTED_PERC` of them, and dispatches a memory-allocation command via AWS Systems Manager Run Command to the EC2 host of each selected task. The command is scoped to the target container via ECS container metadata, holds the memory for `TOTAL_CHAOS_DURATION` seconds, and releases it at the end.

---

## Expected behavior during fault execution

- The targeted containers' memory usage rises to (`MEMORY_CONSUMPTION` × `NUMBER_OF_WORKERS`) MB or to `MEMORY_PERCENTAGE` of the container limit.
- If the allocation exceeds the container's memory limit, ECS OOM-kills the container; the service controller launches a replacement.
- Application latency may rise; the memory-based autoscaling alarm may fire.
- Other containers on the same EC2 host may experience pressure depending on cgroup limits.
- CloudWatch metrics (MemoryUtilization) reflect the elevated usage.

:::info When the fault ends
The chaos pod releases the allocated memory on each host. Memory returns to baseline within seconds; any tasks killed by OOM during the stress are rescheduled by the ECS service controller.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Memory utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_memory_utilization` for the affected service.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency SLOs.
- **OOM kills:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ecs describe-tasks --query "tasks[].containers[].[exitCode,reason]"` and asserts on expected (or unexpected) OOM behaviour.
- **Autoscaling alarms:** Confirm memory-based scaling policy alarms fire when expected.

---

## Verify the fault execution effect

While the experiment is running, confirm memory pressure is applied:

1. **Check memory utilization metrics.**

   In the AWS console (CloudWatch → ECS → ClusterName → ServiceName), `MemoryUtilization` should rise sharply during the chaos window and fall after recovery.

2. **Check for OOM kills.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --desired-status STOPPED --region <region>
   aws ecs describe-tasks --cluster <cluster> --tasks <arn> --region <region> \
     --query "tasks[].containers[].[name,exitCode,reason]"
   ```

   Look for `OutOfMemoryError` in the reason field for containers that were OOM-killed.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

   During the fault, you should see in-progress commands on the affected container instances.

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the stress process on each host. Memory returns to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command.
- **Manual recovery:** If the fault exits before cleanup runs, stop the stress process by sending an SSM command to kill the relevant process on the affected hosts.
- **Workload recovery:** Tasks killed by OOM during the stress are rescheduled by the ECS service controller.

---

## Limitations

- **EC2 launch type only:** This fault uses SSM Run Command against the underlying EC2 host. For Fargate use [ECS Fargate memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-memory-hog).
- **Container metadata must be enabled.**
- **SSM-managed hosts only.**
- **Linux-only.**
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS container memory hog fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTasks, ssm:SendCommand, and ssm:GetCommandInvocation. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="ECS container memory hog reports the container instance is not SSM-managed"
  mode="docs"
  fallback="The fault uses AWS Systems Manager Run Command on the underlying EC2 host. Confirm the SSM Agent is installed and running on the host, the host has an instance profile with AmazonSSMManagedInstanceCore (or equivalent), and the host appears in 'aws ssm describe-instance-information'. After enabling SSM the instance may take a few minutes to register."
/>

<Troubleshoot
  issue="Memory utilization rises but containers are not OOM-killed"
  mode="docs"
  fallback="The most common causes are: MEMORY_CONSUMPTION is below the container's memory limit; the host has swap configured and the workload swapped instead of OOM-killing; or the container limit is very high and you set MEMORY_PERCENTAGE too low. Raise MEMORY_CONSUMPTION (or use MEMORY_PERCENTAGE=90) and verify the container's memory limit in the task definition."
/>

<Troubleshoot
  issue="ECS container memory hog reports container metadata is missing"
  mode="docs"
  fallback="ECS container metadata must be enabled on the cluster for the fault to find the target container on the host. Set ECS_ENABLE_CONTAINER_METADATA=true in the ECS agent configuration on each container instance and restart the agent; existing tasks may need to be restarted to populate the metadata directory."
/>

---

## Related faults

- [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog): Stress CPU inside containers instead of memory.
- [ECS container IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-io-stress): Stress filesystem IO inside containers.
- [ECS Fargate memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-fargate-memory-hog): Memory stress for Fargate tasks (different mechanism).
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
