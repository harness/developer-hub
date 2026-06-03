---
id: ebs-loss-by-id
title: EBS loss by ID
sidebar_label: EBS Loss by ID
description: Detach an EBS volume by volume ID for a configurable duration and reattach it afterwards so you can test how a workload behaves when its storage disappears.
keywords:
  - chaos engineering
  - ebs loss by id
  - aws fault
  - ebs detach
  - storage chaos
tags:
  - chaos-engineering
  - aws-faults
  - ebs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ebs-loss-by-id
  - /docs/chaos-engineering/chaos-faults/aws/ebs-loss-by-id
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EBS loss by ID is an AWS chaos fault that detaches an EBS volume by its volume ID for a configurable duration and reattaches it at the end of the fault. The fault calls AWS EC2 APIs directly; no agent on the host instance is required.

Use this fault to test how a workload behaves when its storage disappears: does the application surface a clean IO error, does the database fail over to a replica, does the application crash, does monitoring fire the right alert?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **IO error handling:** When the data volume disappears, does the application surface a clean error or hang?
- **Database failover:** Does a stateful workload (database, message broker) fail over to a replica, and how long until the replica is fully promoted?
- **Recovery after reattach:** When the volume comes back, does the application reconnect cleanly, or does it require manual intervention (remount, restart)?
- **Detached-volume detection:** Does monitoring fire the right alert at the right time, and does the runbook actually point at the cause?
- **Disaster-recovery rehearsal:** Validate that the recovery procedure for a missing volume works end to end.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target volume identified:** `EBS_VOLUME_ID` is the ID of an existing EBS volume in `REGION` that is in `in-use` state.
- **Volume is detachable:** The volume is not the root volume of a running instance, or `force=true` is acceptable (root volumes can be detached but require the instance to be stopped first).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EBS (gp2, gp3, io1, io2, st1, sc1) | Supported |
| EBS volumes attached to EC2 instances | Supported |
| EBS volumes attached to Outposts instances | Supported |
| AWS regions | Supported in every commercial region; pass the region in `REGION` |
| Root volumes of running instances | Not directly supported; stop the instance first |
| Volumes attached to multiple instances (`MultiAttachEnabled`) | Detach is supported, but reattach must restore the original attachment topology |

---

## Permissions required

```json
{
  "Version": "2012-10-17",
  "Statement": [
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

- `ec2:DescribeVolumes` resolves `EBS_VOLUME_ID` and captures the current attachment (instance ID + device name) so the volume can be reattached after the fault.
- `ec2:DetachVolume` drives the fault.
- `ec2:AttachVolume` restores the attachment at the end of the fault.
- `ec2:DescribeInstances` confirms the instance the volume reattaches to is still running.

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
| `EBS_VOLUME_ID` | ID of the target EBS volume (for example `vol-0a1b2c3d4e5f67890`). | (required) |
| `REGION` | AWS region that hosts the target volume. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the detached state in seconds. | `30` |
| `CHAOS_INTERVAL` | Time interval between successive iterations of the detach-attach cycle (in seconds). | `30` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault performs default health checks against the volume's attachment state. | `false` |
| `SEQUENCE` | Reserved for parity with other faults; this fault targets one volume. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::warning Detach is disruptive
A detach call interrupts in-flight IO on the volume. Plan around the workload's tolerance for sudden IO loss, and ensure backups exist before targeting a production volume.
:::

---

## Fault execution in brief

Looks up `EBS_VOLUME_ID` in `REGION`, captures its current attachment (instance ID and device name), calls `DetachVolume`, waits `TOTAL_CHAOS_DURATION` seconds, then calls `AttachVolume` to restore the original attachment.

---

## Expected behavior during fault execution

- The volume transitions from `in-use` to `detaching` to `available` within seconds.
- The instance that owned the volume sees an IO error on the device once in-flight IO completes or fails.
- Filesystems mounted from the volume become inaccessible; reads and writes return EIO.
- Applications either log the IO failure cleanly or hang waiting for it, depending on how they handle disk errors.
- At the end of the fault, the volume transitions back to `in-use` and the original instance may need to remount the filesystem (the device file path returns but the kernel may have given up on the mountpoint).

:::info When the fault ends
The chaos pod calls `AttachVolume` for the original instance and device. The volume is available again from the AWS perspective, but the kernel on the original instance may need a manual remount (`mount <device> <path>`).
:::

### Signals to watch

- **Volume state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ec2 describe-volumes --volume-ids <id>` and asserts on `State`.
- **CloudWatch volume metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ebs_volume_queue_length`; the metric goes to 0 while the volume is detached.
- **Application IO errors:** Use a Prometheus probe on the application's IO-error counter (or any database-specific WAL-error metric).

---

## Verify the fault execution effect

While the experiment is running:

1. **Confirm the volume is detached.**

   ```bash
   aws ec2 describe-volumes \
     --region <region> \
     --volume-ids <volume-id> \
     --query "Volumes[0].[State,Attachments]"
   ```

   The state should be `available` and `Attachments` empty.

2. **After the fault ends, confirm the volume is attached again.**

   ```bash
   aws ec2 describe-volumes \
     --region <region> \
     --volume-ids <volume-id> \
     --query "Volumes[0].[State,Attachments[0].InstanceId,Attachments[0].Device]"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod reattaches the volume to the original instance and device.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the reattach call.
- **Manual recovery:** If the reattach call fails (instance gone, device name conflict), call `aws ec2 attach-volume --volume-id <id> --instance-id <id> --device <device>` manually.
- **Filesystem remount:** Even after a clean reattach, the kernel on the original instance may need a manual `mount` if the original mount was lost.

---

## Limitations

- **No agent control on the instance:** This fault operates at the EBS API layer. It does not unmount the filesystem cleanly first, so the workload sees a hard IO failure rather than a graceful detach.
- **Reattach may fail:** If the original instance is stopped or terminated between detach and reattach, the reattach call fails. Recover manually.
- **Device name reuse:** The original device name (for example `/dev/xvdf`) must still be available on the original instance at reattach time. The fault does not free it for you.
- **Root volumes:** Cannot detach the root volume of a running instance. Stop the instance first.
- **Cross-AZ:** A volume cannot move between Availability Zones; the fault always reattaches to the same AZ.

---

## Troubleshooting

<Troubleshoot
  issue="EBS loss by ID experiment fails with UnauthorizedOperation"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 permissions in the target region. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DetachVolume, ec2:AttachVolume, ec2:DescribeVolumes, and ec2:DescribeInstances. When using ASSUME_ROLE_ARN, also confirm the trust policy allows the source identity."
/>

<Troubleshoot
  issue="EBS loss by ID experiment failed to reattach the volume"
  mode="docs"
  fallback="The most common causes are: the original instance was stopped or terminated between detach and reattach; the device name on the original instance is now occupied by another volume; or the volume is in a different AZ than the instance. Recover with aws ec2 attach-volume --volume-id <id> --instance-id <id> --device <device>; if that fails, attach to a different instance in the same AZ, mount, copy data off, and reattach to the intended instance manually."
/>

<Troubleshoot
  issue="EBS loss by ID detached but filesystem is read-only after reattach"
  mode="docs"
  fallback="The kernel marked the filesystem read-only after the hard detach. Connect to the instance via SSM Session Manager, unmount with 'umount -lf <mount>' (lazy + force), run fsck if needed, then remount. For production-critical volumes, snapshot the volume before chaos and consider running fsck during a maintenance window after the experiment."
/>

---

## Related faults

- [EBS loss by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ebs-loss-by-tag): Detach EBS volumes selected by tag instead of by ID.
- [EC2 IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-io-stress): Saturate filesystem IO instead of detaching the volume.
- [EC2 stop by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id): Stop the whole host instead of detaching one volume.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
