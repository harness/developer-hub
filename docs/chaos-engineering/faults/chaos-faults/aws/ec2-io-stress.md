---
id: ec2-io-stress
title: EC2 IO stress
sidebar_label: EC2 IO Stress
description: Generate sustained filesystem read and write load on a target EC2 instance via AWS Systems Manager so you can test how the workload behaves under disk pressure or near-full storage.
keywords:
  - chaos engineering
  - ec2 io stress
  - aws fault
  - disk pressure
  - filesystem chaos
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-io-stress
  - /docs/chaos-engineering/chaos-faults/aws/ec2-io-stress
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 IO stress is an AWS chaos fault that generates sustained filesystem read and write load on a target EC2 instance for a configurable duration. The fault writes a configurable number of bytes (or fills a configurable percentage of the filesystem) at `VOLUME_MOUNT_PATH` and runs `NUMBER_OF_WORKERS` worker threads. The workload is dispatched via AWS Systems Manager Run Command.

Use this fault to test how a workload reacts when its disk is saturated: do writes block, does the database fall behind on WAL flushes, does an ephemeral-storage limit kick in, does log rotation fail?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Disk-bound latency:** When the filesystem is saturated, how much does p99 application latency rise?
- **Near-full disk handling:** When `FILESYSTEM_UTILIZATION_PERCENTAGE` pushes the disk past 90%, does the application detect it and fall back gracefully, or does it crash on the first failed write?
- **WAL flush stalls:** For a database, does the WAL writer keep up under disk pressure, or does transaction throughput collapse?
- **Log rotation failure:** Does the logger handle write failures without crashing the application?
- **Ephemeral-storage limits:** On EKS, does kubelet evict pods that exceed their `ephemeral-storage` limits?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **Volume mount path is writable:** `VOLUME_MOUNT_PATH` is a directory the stress workload can write to.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Targeting by tag | Supported via `EC2_INSTANCE_TAG` |
| Targeting by ID | Supported via `EC2_INSTANCE_ID` |
| Windows instances | Not supported (Linux-only stress payload) |

---

## Permissions required

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ssm:SendCommand",
        "ssm:CancelCommand",
        "ssm:GetCommandInvocation",
        "ssm:DescribeInstanceInformation",
        "ssm:GetDocument",
        "ssm:DescribeDocument"
      ],
      "Resource": "*"
    }
  ]
}
```

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy.

---

## Authentication

The fault supports three credential delivery models. Pick one based on how your chaos infrastructure is deployed.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager file secret | Chaos infrastructure runs outside EKS, or you want explicit static credentials | Upload the AWS credentials file as a **File Secret** in Harness Secret Manager and reference its identifier via `AWS_AUTHENTICATION_SECRET` |
| IAM Roles for Service Accounts (IRSA) | Chaos infrastructure runs in EKS and uses an OIDC-bound service account | No tunable changes; the chaos pod inherits the role automatically. Go to [AWS IAM integration](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-iam-integration) to set it up |
| Assume role | The fault needs to act in a different account or with elevated permissions | Set `ASSUME_ROLE_ARN` to the role ARN; the chaos pod assumes the role on top of its base credentials |

When using the Harness Secret Manager method, the File Secret should contain an AWS credentials file in the standard `~/.aws/credentials` format:

```ini
[default]
aws_access_key_id = REPLACE_WITH_ACCESS_KEY_ID
aws_secret_access_key = REPLACE_WITH_SECRET_ACCESS_KEY
```

Upload this file as a **File Secret** in Harness Secret Manager (Project Setup → Secrets → New File Secret), and pass the secret identifier in `AWS_AUTHENTICATION_SECRET`.

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instance. | (required) |
| `EC2_INSTANCE_ID` *or* `EC2_INSTANCE_TAG` | One of these must be set to select the target instance(s). | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FILESYSTEM_UTILIZATION_BYTES` | Number of bytes to write to the filesystem. Mutually exclusive with `FILESYSTEM_UTILIZATION_PERCENTAGE`. | `0` |
| `FILESYSTEM_UTILIZATION_PERCENTAGE` | Percentage of the target filesystem to fill (1-100). | `10` |
| `VOLUME_MOUNT_PATH` | Path on the target instance where the stress workload writes. | `/tmp` |
| `NUMBER_OF_WORKERS` | Number of worker threads to use for IO stress. | `1` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install the in-instance stress tool if missing. Set to `False` to skip. | `True` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::warning Pick the right mount path
The default `VOLUME_MOUNT_PATH=/tmp` may be on the root filesystem on small instances. Filling the root filesystem can prevent the application (or kubelet) from writing logs and recovering. Point `VOLUME_MOUNT_PATH` at a separate volume for production-like blast radius.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that runs `NUMBER_OF_WORKERS` filesystem-stress threads against `VOLUME_MOUNT_PATH`, writing `FILESYSTEM_UTILIZATION_BYTES` bytes (or filling `FILESYSTEM_UTILIZATION_PERCENTAGE` of the filesystem) for `TOTAL_CHAOS_DURATION` seconds.

---

## Expected behavior during fault execution

- IO operations per second on the target filesystem climb to the saturation point of the underlying EBS volume.
- CloudWatch `VolumeReadOps` / `VolumeWriteOps` and `VolumeQueueLength` rise correspondingly.
- Application latency typically rises for any read or write path that touches the same volume.
- Free space on `VOLUME_MOUNT_PATH` decreases according to `FILESYSTEM_UTILIZATION_PERCENTAGE`; if it reaches 100%, further writes fail with `ENOSPC`.
- On EKS, pods writing to ephemeral storage may be evicted if they exceed their `ephemeral-storage` limit.

:::info When the fault ends
The chaos pod stops the stress workload and removes the temporary files it wrote to `VOLUME_MOUNT_PATH`. Free space returns to the prior level; CloudWatch IO metrics drop within minutes.
:::

### Signals to watch

- **EBS IO utilization:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ebs_volume_queue_length` to confirm saturation.
- **Free space:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `df -h <mount>` via SSM to track utilization.
- **Application write errors:** Use a Prometheus probe on application-specific write-error counters.

---

## Verify the fault execution effect

While the experiment is running:

1. **Check free space via SSM.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["df -h <VOLUME_MOUNT_PATH>"]'
   ```

2. **Check IO activity.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["iostat -x 1 5"]'
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod terminates the stress workload and removes the temporary files it wrote.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command.
- **Manual cleanup of orphan files:** If the experiment exited unexpectedly, log into the instance via SSM Session Manager and remove temporary files under `VOLUME_MOUNT_PATH`.

---

## Limitations

- **Linux-only payload:** This fault stresses Linux instances.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **Filesystem may not recover free space immediately:** Some filesystems (XFS, ext4) hold deleted-but-still-open file handles. Free space may take a moment to reflect after cleanup.
- **EBS burst credits:** Sustained IO consumes EBS burst credits on gp2 / st1 / sc1 volumes. After the fault, IO performance may stay degraded until credits replenish.
- **Disk quotas:** If the target uses quotas, the stress workload may stop early when it hits the quota instead of reaching `FILESYSTEM_UTILIZATION_PERCENTAGE`.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 IO stress experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 IO stress runs but no IO activity is visible"
  mode="docs"
  fallback="The most common causes are: VOLUME_MOUNT_PATH does not exist on the target or is read-only; the in-instance stress tool failed to install (set INSTALL_DEPENDENCIES=True and verify network egress, or use PROXY); FILESYSTEM_UTILIZATION_BYTES is set to a tiny value; or you are watching CloudWatch metrics on the wrong volume. Run 'iostat -x 1 5' via SSM during the fault to confirm activity locally."
/>

<Troubleshoot
  issue="EC2 IO stress filled the root filesystem and broke the instance"
  mode="docs"
  fallback="VOLUME_MOUNT_PATH was on the root filesystem, and the fault filled it to 100%. Connect via SSM Session Manager and free space by removing the temporary files under VOLUME_MOUNT_PATH. For future runs, point VOLUME_MOUNT_PATH at a dedicated data volume."
/>

---

## Related faults

- [EC2 CPU hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-cpu-hog): Stress CPU instead of disk.
- [EC2 memory hog](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-memory-hog): Stress memory instead of disk.
- [EBS loss by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ebs-loss-by-id): Detach a specific EBS volume entirely instead of stressing IO.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
