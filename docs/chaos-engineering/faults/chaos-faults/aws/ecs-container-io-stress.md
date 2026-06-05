---
id: ecs-container-io-stress
title: ECS container IO stress
sidebar_label: ECS Container IO Stress
description: Stress filesystem IO using a configurable number of workers writing to a configurable mount path inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration so you can test how the workload behaves when disk IO is saturated.
keywords:
  - chaos engineering
  - ecs container io stress
  - aws fault
  - ecs fault
  - filesystem stress
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-io-stress
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container IO stress is an AWS chaos fault that runs `NUMBER_OF_WORKERS` IO-stress workers inside a percentage of running ECS tasks (EC2 launch type), writing `FILESYSTEM_UTILIZATION_BYTES` GB (or `FILESYSTEM_UTILIZATION_PERCENTAGE` percent of free space) to `VOLUME_MOUNT_PATH` for a configurable duration. The fault discovers the EC2 container instances hosting the target tasks and runs IO-stress commands inside the relevant containers via AWS Systems Manager Run Command on each host.

Use this fault to test how an ECS workload behaves when filesystem IO is saturated: whether log shippers fall behind, whether applications that write checkpoints or queues stall, and whether the host's other tenants are affected. It is also useful to validate IO-based monitoring and alerting.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Disk saturation handling:** When the container's mounted volume is full, does the application surface a clear "disk full" error or silently corrupt data?
- **IO latency impact:** When IOPS are saturated, does request latency rise predictably, and does the application back off?
- **Log shipper resilience:** Do log shippers (Fluent Bit, Vector) buffer cleanly when the disk is busy, or do they drop logs?
- **Noisy-neighbour isolation:** Does IO pressure on one container affect sibling containers on the same EC2 host?
- **Recovery time:** When the stress ends, how quickly does free space and IOPS return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service or cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type.
- **Container instances are SSM-managed:** Every EC2 container instance is registered with AWS Systems Manager.
- **ECS container metadata enabled.**
- **Writable mount path:** `VOLUME_MOUNT_PATH` exists inside the target container and is writable.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Not supported |
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

Configure the following fault parameters when you add ECS container IO stress to an experiment in Chaos Studio. Defaults are shown for reference.

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
| `FILESYSTEM_UTILIZATION_BYTES` | Amount of data per worker to write (in GB). Set to `0` and use `FILESYSTEM_UTILIZATION_PERCENTAGE` for percentage-based stress. | `1` |
| `FILESYSTEM_UTILIZATION_PERCENTAGE` | Percentage of free space to write per worker. Used only when `FILESYSTEM_UTILIZATION_BYTES=0`. | `0` |
| `VOLUME_MOUNT_PATH` | Path inside the container at which to perform the writes. Must be writable. | `/tmp` |
| `NUMBER_OF_WORKERS` | Number of worker threads that each perform the writes in parallel. | `1` |
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

Resolves the running tasks for `SERVICE_NAME` (or all tasks in `CLUSTER_NAME`), picks `TASK_REPLICA_AFFECTED_PERC` of them, and dispatches an IO-stress command via AWS Systems Manager Run Command to the EC2 host of each selected task. Each worker writes data to `VOLUME_MOUNT_PATH` inside the target container until `TOTAL_CHAOS_DURATION` elapses or the configured size is reached, then deletes the test files.

---

## Expected behavior during fault execution

- The targeted containers' filesystem usage on `VOLUME_MOUNT_PATH` rises by (`FILESYSTEM_UTILIZATION_BYTES` × `NUMBER_OF_WORKERS`) GB, or by the equivalent percentage.
- Disk IOPS and throughput on the underlying volume rise; competing readers and writers experience higher latency.
- If the workload writes to the same path and that path fills up, the application may receive `ENOSPC` errors.
- CloudWatch IO metrics on the underlying EBS volume reflect the elevated activity.

:::info When the fault ends
The chaos pod stops the IO workers and removes the test files. Free space and IOPS return to baseline within seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Disk space:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `df` on the underlying host (via SSM) or inside the container and asserts free space stays above a threshold.
- **IO latency:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ebs_volume_read_latency` and `aws_ebs_volume_write_latency` to detect IO saturation.
- **Application errors:** Use a Prometheus probe on application-level error counters that include `ENOSPC` or "disk full" exceptions.
- **Log shipper backlog:** Use a Prometheus probe on the log shipper's buffer size.

---

## Verify the fault execution effect

While the experiment is running, confirm disk activity rose and recovered:

1. **Check disk usage inside the container.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --document-name AWS-RunShellScript \
     --instance-ids <container-instance-id> \
     --parameters 'commands=["df -h"]'
   ```

   Usage on the relevant filesystem should rise during the chaos window and fall after recovery.

2. **Check EBS IO metrics.**

   In the AWS console (CloudWatch → EBS → VolumeId), `VolumeWriteBytes` and `VolumeWriteOps` should spike during the chaos window.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

   During the fault, in-progress commands should appear on the affected container instances.

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops the IO workers and deletes the test files. Free space and IO activity return to baseline.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and cleans up the test files.
- **Manual recovery:** If the fault exits before cleanup, remove the test files inside `VOLUME_MOUNT_PATH` by sending an SSM `rm` command. The chaos pod logs include the exact file path pattern.
- **Workload recovery:** Tasks killed because of disk-full conditions are rescheduled by the ECS service controller.

---

## Limitations

- **EC2 launch type only.**
- **Container metadata must be enabled.**
- **SSM-managed hosts only.**
- **Linux-only.**
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).
- **Writes are to `VOLUME_MOUNT_PATH`:** Writes go where you point them; if that path is shared with the application's working set, you may cause it to spill or fail. Use a dedicated scratch path when possible.

---

## Troubleshooting

<Troubleshoot
  issue="ECS container IO stress fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTasks, ssm:SendCommand, and ssm:GetCommandInvocation."
/>

<Troubleshoot
  issue="ECS container IO stress reports VOLUME_MOUNT_PATH does not exist or is not writable"
  mode="docs"
  fallback="The fault writes test files inside the container at VOLUME_MOUNT_PATH. Confirm the path exists in the container image (or is mounted by the task), and that the user the container runs as has write permission. The default '/tmp' is writable in most images; non-default paths must be created explicitly in the Dockerfile."
/>

<Troubleshoot
  issue="Disk usage rises but the application does not surface any errors"
  mode="docs"
  fallback="The most common causes are: the application does not write to VOLUME_MOUNT_PATH and is unaffected; the filesystem has plenty of headroom and your FILESYSTEM_UTILIZATION_BYTES did not fill it; or the application is reading from a different volume. Pick VOLUME_MOUNT_PATH that overlaps the application's working set, and consider FILESYSTEM_UTILIZATION_PERCENTAGE=90 to drive the volume close to full."
/>

<Troubleshoot
  issue="Test files remain on disk after the experiment"
  mode="docs"
  fallback="If the experiment was killed before cleanup, the test files may remain. Send an SSM command to the affected hosts to remove them using AWS-RunShellScript with a rm -f command targeting the iostress files under /tmp. The chaos pod logs include the exact filename pattern used."
/>

---

## Related faults

- [ECS container CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-cpu-hog): Stress CPU inside containers instead of disk.
- [ECS container memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-memory-hog): Stress memory inside containers.
- [ECS container volume detach](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-volume-detach): Detach a volume from a task instead of saturating it.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
