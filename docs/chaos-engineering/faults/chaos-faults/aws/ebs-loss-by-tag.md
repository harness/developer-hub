---
id: ebs-loss-by-tag
title: EBS loss by tag
sidebar_label: EBS Loss by Tag
description: Detach EBS volumes selected by tag for a configurable duration and reattach them afterwards so you can test how workloads behave when a tagged subset of storage disappears.
keywords:
  - chaos engineering
  - ebs loss by tag
  - aws fault
  - ebs detach
  - storage chaos
tags:
  - chaos-engineering
  - aws-faults
  - ebs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ebs-loss-by-tag
  - /docs/chaos-engineering/chaos-faults/aws/ebs-loss-by-tag
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EBS loss by tag is an AWS chaos fault that resolves EBS volumes by tag, detaches a configurable percentage of them for a configurable duration, and reattaches them afterwards. The fault calls AWS EC2 APIs directly; no agent on the host instances is required. Use this fault when you want to act on a logical group of volumes (a tier, an environment, a service) without pinning to specific volume IDs.

Use this fault to test how workloads behave when a tagged subset of storage disappears: do replicas absorb the load, does a stateful workload fail over cleanly, does monitoring isolate the failure to the affected volumes?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Replica absorption:** When a percentage of volumes tagged for a specific tier are detached, do remaining replicas serve the workload without dropping requests?
- **Stateful failover:** Does a database cluster fail over from primary to replica when the primary's data volume disappears?
- **Blast-radius validation:** Confirm that `VOLUME_AFFECTED_PERC` keeps the impact within the planned blast radius.
- **Observability:** Does the failure show up scoped to the tagged volumes rather than firing as a broad storage outage?
- **Disaster-recovery drills:** Rehearse the recovery procedure for losing a tagged subset of storage.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target volumes exist:** At least one volume in `REGION` carries the tag in `EBS_VOLUME_TAG` and is in `in-use` state.
- **Volumes are detachable:** Targets are not the root volumes of running instances.
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
| Multi-attach volumes | Detach is supported, but reattach must restore the original attachment topology |

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

- `ec2:DescribeVolumes` resolves `EBS_VOLUME_TAG` to volume IDs and captures the current attachments so the volumes can be reattached after the fault.
- `ec2:DetachVolume` drives the fault.
- `ec2:AttachVolume` restores attachments at the end of the fault.
- `ec2:DescribeInstances` confirms the instances the volumes reattach to are still running.

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
| `EBS_VOLUME_TAG` | Tag selector for target volumes (for example `tier:cache`). | (required) |
| `REGION` | AWS region that hosts the target volumes. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VOLUME_AFFECTED_PERC` | Percentage of matching volumes to detach. `0` targets one volume. | `0` |
| `TOTAL_CHAOS_DURATION` | Duration of the detached state in seconds. | `30` |
| `CHAOS_INTERVAL` | Time interval between successive detach-attach iterations (in seconds). | `30` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault performs default health checks against the volumes' attachment states. | `false` |
| `SEQUENCE` | Order in which selected volumes are detached: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::warning Detach is disruptive
Each detach call interrupts in-flight IO on the volume. Plan blast radius with `VOLUME_AFFECTED_PERC` and ensure backups exist before targeting production volumes.
:::

---

## Fault execution in brief

Resolves the tag in `EBS_VOLUME_TAG` to a list of volume IDs in `REGION`, captures the current attachment of each (instance ID + device name), calls `DetachVolume` on the chosen percentage (`VOLUME_AFFECTED_PERC`), waits `TOTAL_CHAOS_DURATION` seconds, then calls `AttachVolume` to restore the original attachments.

---

## Expected behavior during fault execution

- Each selected volume transitions from `in-use` to `detaching` to `available` within seconds.
- The instances that owned the volumes see IO errors on the affected devices once in-flight IO completes or fails.
- Filesystems mounted from the affected volumes become inaccessible; reads and writes return EIO.
- At the end of the fault, the volumes transition back to `in-use` on their original instances; the kernel may need a manual remount.

:::info When the fault ends
The chaos pod calls `AttachVolume` for each affected volume on its original instance and device. AWS reports the volumes attached again, but the kernel on each instance may need a manual `mount`.
:::

### Signals to watch

- **Volume state per ID:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ec2 describe-volumes --filters "Name=tag:<key>,Values=<value>"` and asserts on `State`.
- **CloudWatch volume metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ebs_volume_queue_length` for the affected volumes.
- **Application IO error rate:** Use a Prometheus probe on the application's IO-error or database-error counter.

---

## Verify the fault execution effect

While the experiment is running:

1. **Confirm the tagged volumes are detached.**

   ```bash
   aws ec2 describe-volumes \
     --region <region> \
     --filters "Name=tag:<key>,Values=<value>" \
     --query "Volumes[].[VolumeId,State,Attachments[0].InstanceId]"
   ```

   The expected fraction of volumes should report `available` during the fault and `in-use` after.

---

## Recovery and cleanup

- **End of duration:** The chaos pod reattaches each affected volume to its original instance and device.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the reattach calls for any volumes already detached.
- **Manual recovery:** For each volume the fault failed to reattach, call `aws ec2 attach-volume --volume-id <id> --instance-id <id> --device <device>` manually.
- **Filesystem remount:** Even after a clean reattach, the kernel on each original instance may need a manual `mount`.

---

## Limitations

- **No agent control on the instances:** This fault operates at the EBS API layer. Filesystems are not unmounted cleanly first, so workloads see hard IO failures.
- **Reattach may fail for a subset:** If any original instance is stopped or terminated between detach and reattach, that volume needs manual reattach.
- **Tag must resolve to at least one volume:** If `EBS_VOLUME_TAG` matches nothing in `REGION`, the fault fails fast with no impact.
- **Root volumes:** Cannot detach the root volume of a running instance. Stop the instance first.
- **Cross-AZ:** Volumes cannot move between AZs; the fault always reattaches in the same AZ.

---

## Troubleshooting

<Troubleshoot
  issue="EBS loss by tag selects zero volumes"
  mode="docs"
  fallback="The most common causes are: EBS_VOLUME_TAG is misformatted (correct form is key:value); the tag key or value has a typo; the tag exists in a different region than REGION; or all matching volumes were in 'available' state (already detached) before the experiment started. Verify with aws ec2 describe-volumes --filters 'Name=tag:<key>,Values=<value>' --query 'Volumes[].[VolumeId,State]'."
/>

<Troubleshoot
  issue="EBS loss by tag detached the volumes but failed to reattach some of them"
  mode="docs"
  fallback="The most common causes are: an original instance was stopped or terminated between detach and reattach; the device name on the original instance is now occupied; or the volume is in a different AZ than the instance. For each affected volume run aws ec2 describe-volumes --volume-ids <id> to see the current state, then call aws ec2 attach-volume manually with the captured instance ID and device name."
/>

<Troubleshoot
  issue="EBS loss by tag triggered a wider outage than expected"
  mode="docs"
  fallback="VOLUME_AFFECTED_PERC may have selected more volumes than intended, or the tag matched volumes outside the intended scope. List affected volumes with aws ec2 describe-volumes --filters 'Name=tag:<key>,Values=<value>' --query 'Volumes[].VolumeId' before re-running. Reduce VOLUME_AFFECTED_PERC and narrow the tag selector to constrain the blast radius."
/>

---

## Related faults

- [EBS loss by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ebs-loss-by-id): Detach a specific EBS volume by ID.
- [EC2 IO stress](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-io-stress): Saturate filesystem IO instead of detaching volumes.
- [EC2 stop by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-tag): Stop tagged EC2 instances entirely.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
