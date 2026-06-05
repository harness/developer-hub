---
id: ecs-container-volume-detach
title: ECS container volume detach
sidebar_label: ECS Container Volume Detach
description: Detach the data volume attached to a percentage of running ECS tasks for a configurable duration so you can test how the workload behaves when its storage disappears.
keywords:
  - chaos engineering
  - ecs container volume detach
  - aws fault
  - ecs fault
  - volume detach
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-volume-detach
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-volume-detach
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container volume detach is an AWS chaos fault that detaches the data EBS volume attached to a percentage of running ECS tasks (filtered by compatibility through `REQUIRED_COMPATIBILITIES`) for a configurable duration, then reattaches the volume when the fault ends. While the volume is detached the application loses access to its mounted data; reads and writes against the detached path fail.

Use this fault to test how a workload behaves when its mounted storage briefly disappears: whether the application surfaces a clear error, whether stateful services (databases, queues) recover cleanly when the volume returns, and whether your monitoring detects the storage outage quickly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Stateful workload resilience:** When the data volume disappears, does the application fail fast with a clear error or hang waiting on IO?
- **Recovery after reattach:** When the volume returns, does the application reattach to the mount cleanly, or does it require a restart?
- **Replication failover:** For stateful services with replicas, does a healthy replica take over when its peer loses storage?
- **Storage monitoring:** Does CloudWatch (or your monitoring) detect the volume outage within the alarm SLA?
- **Backup readiness:** Is the runbook to restore from snapshot accurate and timed correctly when a volume becomes unreachable in production?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service:** `CLUSTER_NAME` exists in `REGION`. If `SERVICE_NAME` is set, the fault selects from that service's running tasks.
- **Tasks use an attachable volume:** The task definition mounts an EBS volume (Fargate task volume support) or the EC2 launch type uses an EBS-backed bind mount that can be detached at the EC2 level.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type with EBS-backed volumes | Supported |
| Amazon ECS on Fargate launch type with EBS volume attachments | Supported |
| Tasks without attached EBS volumes | Not supported (nothing to detach) |
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
        "ecs:DescribeTaskDefinition",
        "ecs:ListTasks"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeVolumes",
        "ec2:DescribeInstances",
        "ec2:AttachVolume",
        "ec2:DetachVolume"
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

Configure the following fault parameters when you add ECS container volume detach to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_NAME` | Name of the target ECS service. When set, the fault selects `TASK_REPLICA_AFFECTED_PERC` of the service's running tasks. | `""` |
| `REQUIRED_COMPATIBILITIES` | Comma-separated list of compatibilities (`fargate`, `ec2`) that a task must support to be considered. | `fargate,ec2` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of qualifying tasks to detach volumes from. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The volume stays detached for this period. | `30` |
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

Resolves the running tasks for `SERVICE_NAME` filtered by `REQUIRED_COMPATIBILITIES`, picks `TASK_REPLICA_AFFECTED_PERC` of them, and calls `DetachVolume` on the EBS volume attached to each selected task. After `TOTAL_CHAOS_DURATION` seconds, the chaos pod calls `AttachVolume` to restore each volume to its original device.

---

## Expected behavior during fault execution

- The target volumes transition from `in-use` to `detaching` to `available`.
- Reads and writes against the mount point inside the affected containers return IO errors.
- Stateful applications that depend on the volume (databases, queues) may exit, restart, or enter a degraded mode.
- ECS may attempt to restart the task if the application exits; without the volume, restarts may fail.
- CloudWatch EBS volume metrics show the detach.

:::info When the fault ends
The chaos pod calls `AttachVolume` to reattach each volume to its original device. The application may need to remount or restart to see the returned volume.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Volume state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ec2 describe-volumes --volume-ids <id>` and asserts on `State`.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-level IO error counters.
- **Task lifecycle:** Use a command probe that runs `aws ecs describe-tasks` and asserts on `lastStatus` and `desiredStatus`.
- **Replication health:** For replicated stateful workloads, use a Prometheus probe on replication-lag metrics.

---

## Verify the fault execution effect

While the experiment is running, confirm the volume is detached and then reattached:

1. **Inspect volume state.**

   ```bash
   aws ec2 describe-volumes \
     --region <region> \
     --volume-ids <vol-id> \
     --query "Volumes[].[VolumeId,State,Attachments[].Device]"
   ```

   During the fault `State` should be `available` (detached). After recovery it should be `in-use` again.

2. **Inspect task state.**

   ```bash
   aws ecs describe-tasks --cluster <cluster> --tasks <arn> --region <region> \
     --query "tasks[].[lastStatus,desiredStatus]"
   ```

   The task may be restarted; the resulting state depends on the application.

3. **Check application logs.**

   ECS task logs in CloudWatch should show IO errors during the chaos window and recovery messages after the volume returns.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `AttachVolume` for every detached volume.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the reattach.
- **Manual recovery:** If the fault exits before reattach, run `aws ec2 attach-volume --volume-id <vol-id> --instance-id <i> --device <device>` with the values recorded in the chaos pod logs.
- **Workload recovery:** Depending on the application, you may need to remount the filesystem or restart the task.

---

## Limitations

- **Volume must be attachable:** Only EBS volumes that support detach/attach are affected; instance-store and ephemeral storage are not detached by this fault.
- **Multi-attach behaviour:** If the volume uses Multi-Attach, detaching from one instance leaves the volume available on the other; the fault still records the original attachment for reattach.
- **AZ constraints on reattach:** EBS volumes can only attach to instances in the same AZ; this fault preserves the original instance, so AZ constraints are honoured automatically.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS container volume detach fails with VolumeInUse or InvalidVolume.NotFound"
  mode="docs"
  fallback="VolumeInUse means another operation is in progress on the volume (a snapshot, another detach, or an attachment change). Wait a few seconds and retry. InvalidVolume.NotFound usually means the volume was deleted between discovery and the detach call; the most common cause is a parallel autoscaling or replacement event. Inspect 'aws ec2 describe-volumes' and rerun."
/>

<Troubleshoot
  issue="Volume reattach fails after the chaos window"
  mode="docs"
  fallback="The most common causes are: the original instance was replaced during the chaos window (autoscaling, manual termination), so the device path is no longer valid; or another volume was attached to the same device path while the chaos volume was detached. Reattach the volume to the new instance manually with 'aws ec2 attach-volume' to an unused device path."
/>

<Troubleshoot
  issue="Application does not see the volume after reattach"
  mode="docs"
  fallback="Even after reattach, the OS may not automatically remount the filesystem. SSH or SSM into the container instance and run 'mount -a' (Linux) or restart the affected task so the mount is re-established. For stateful applications, follow the application's documented restart procedure to ensure clean recovery."
/>

<Troubleshoot
  issue="ECS container volume detach reports no candidate volumes were found"
  mode="docs"
  fallback="The most common causes are: SERVICE_NAME does not have tasks that match REQUIRED_COMPATIBILITIES; the task definition does not declare any EBS volume mounts; or the fault could not resolve the underlying volume ID from the task definition. Confirm with 'aws ecs describe-tasks' and 'aws ecs describe-task-definition' that the tasks expose an EBS volume."
/>

---

## Related faults

- [EBS loss by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ebs-loss-by-id): Detach a specific EBS volume outside an ECS context.
- [EBS loss by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ebs-loss-by-tag): Detach EBS volumes selected by tag.
- [ECS container IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-io-stress): Stress filesystem IO instead of detaching the volume.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
