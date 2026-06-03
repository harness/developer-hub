---
id: ec2-stop-by-tag
title: EC2 stop by tag
sidebar_label: EC2 Stop by Tag
description: Stop EC2 instances selected by tag for a configurable duration so you can test how the workload running on those instances behaves when a tagged subset disappears.
keywords:
  - chaos engineering
  - ec2 stop by tag
  - aws fault
  - ec2 fault
  - instance stop
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-stop-by-tag
  - /docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-tag
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 stop by tag is an AWS chaos fault that resolves EC2 instances by tag, stops a configurable percentage of them for a configurable duration, and then starts them again. The fault is useful when you want to act on a logical group of instances (an environment, a service, a role) without pinning to specific instance IDs.

Use this fault to test how a workload behaves when a tagged subset of its capacity disappears: replicas served by other instances pick up the load, an auto-scaling group provisions replacements, or a tier behind a load balancer is taken out of rotation.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Replica failover for a tagged tier:** When a percentage of instances tagged for a specific service are stopped, do remaining replicas absorb the traffic without dropping requests?
- **Load balancer health checks:** Does the target group detach stopped instances quickly and reattach them cleanly when they return?
- **Auto-scaling group response:** Do ASGs provision replacements within the expected window?
- **Managed node group resilience (EKS):** When tagged worker nodes are stopped, are pods rescheduled across the cluster and does capacity recover?
- **Blast-radius validation:** Confirm that targeting by tag plus `INSTANCE_AFFECTED_PERCENTAGE` keeps the impact within the planned blast radius.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instances exist and are reachable:** At least one instance in `REGION` carries the tag in `EC2_INSTANCE_TAG` and is in the `running` state at the start of the experiment.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.
- **ASG awareness (only when targeting nodes in a managed node group):** If targets are EKS managed node group instances, set `MANAGED_NODEGROUP=enable` so the fault waits for replacement nodes instead of attempting to start the originals.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (standalone instances) | Supported |
| Amazon EKS managed worker nodes | Supported (set `MANAGED_NODEGROUP=enable`) |
| Amazon EKS self-managed worker nodes | Supported |
| AWS regions | Supported in every commercial region; pass the region in `REGION` |
| Linux instances | Supported |
| Windows instances | Supported |
| Spot instances | Supported (the start call may fail if capacity is unavailable; see Limitations) |
| Instances behind ALB, NLB, or CLB | Supported |

---

## Permissions required

The IAM principal that the chaos pod uses needs the following AWS actions.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:StartInstances",
        "ec2:StopInstances",
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:DescribeAutoScalingInstances"
      ],
      "Resource": "*"
    }
  ]
}
```

- `ec2:StopInstances` and `ec2:StartInstances` drive the fault.
- `ec2:DescribeInstances` is used to resolve `EC2_INSTANCE_TAG` to a list of instance IDs and to confirm state transitions.
- `ec2:DescribeInstanceStatus` confirms each instance reaches `stopped` and `running` states.
- `autoscaling:DescribeAutoScalingInstances` is only required when `MANAGED_NODEGROUP=enable`.

Go to [common policy for all AWS faults](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to use a single superset IAM policy across every AWS fault.

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

Configure the following fault parameters when you add EC2 stop by tag to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_TAG` | Tag selector in `key:value` format (for example `app:frontend`). | (required) |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |
| `INSTANCE_AFFECTED_PERCENTAGE` | Percentage of matching instances to stop. `0` targets exactly one instance. | `0` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive stop iterations. | `60` |
| `SEQUENCE` | Order in which selected instances are stopped: `parallel` stops them at once; `serial` stops them one at a time. | `parallel` |
| `MANAGED_NODEGROUP` | Set to `enable` when targets are EKS managed node group instances; the fault then waits for replacement nodes from the ASG. | `disable` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

:::warning Drain managed node group instances before the fault
If targets are part of a managed node group, drain and cordon them before running the fault so that workload pods are not scheduled onto instances about to disappear.
:::

---

## Fault execution in brief

Resolves the tag in `EC2_INSTANCE_TAG` to a list of instance IDs in `REGION`, calls `StopInstances` on the chosen percentage (`INSTANCE_AFFECTED_PERCENTAGE`), waits for `TOTAL_CHAOS_DURATION` seconds, then calls `StartInstances` to bring them back (unless `MANAGED_NODEGROUP=enable`).

---

## Expected behavior during fault execution

- Each selected instance transitions from `running` to `stopping` to `stopped` within seconds of the stop call.
- Instances behind a load balancer are marked unhealthy and removed from rotation according to target-group health-check settings.
- Workloads on stopped instances become unreachable; replicas elsewhere should absorb the traffic if the workload is horizontally scaled.
- For EKS worker nodes, pods enter `Terminating` then `Pending`; the scheduler places them on other nodes if capacity allows.
- When `MANAGED_NODEGROUP=enable`, the ASG launches replacement nodes and the fault waits for them to join the cluster before reporting success.

:::info When the fault ends
The chaos pod issues `StartInstances` and polls until each target reaches `running`. Long-lived TCP connections dropped during the outage need to be re-established by the caller.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) to detect downtime and measure recovery time.
- **Target group health:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_applicationelb_healthy_host_count` to confirm the load balancer detected the outage.
- **EC2 instance state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `aws ec2 describe-instances --filters "Name=tag:<key>,Values=<value>"` to assert the expected state.
- **CloudWatch metrics:** Use a Prometheus probe on `aws_ec2_status_check_failed` to confirm instances went down and came back.

---

## Verify the fault execution effect

While the experiment is running, confirm the tagged instances are stopped and then restored:

1. **List instances by tag.**

   ```bash
   aws ec2 describe-instances \
     --region <region> \
     --filters "Name=tag:<key>,Values=<value>" \
     --query "Reservations[].Instances[].[InstanceId,State.Name]"
   ```

   The expected fraction of instances should report `stopping` or `stopped` during the fault, then `running` after recovery.

2. **Check load balancer target health (if applicable).**

   ```bash
   aws elbv2 describe-target-health \
     --region <region> \
     --target-group-arn <target-group-arn>
   ```

3. **For EKS managed node groups, confirm replacements joined.**

   ```bash
   kubectl get nodes -o wide
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod issues `StartInstances` for affected instances (unless `MANAGED_NODEGROUP=enable`) and polls until each reaches `running`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same start call.
- **Manual recovery:** If the fault exits with an error before issuing the start call, start affected instances manually with `aws ec2 start-instances --instance-ids <ids>`.

---

## Limitations

- **Tag must resolve to at least one instance:** If `EC2_INSTANCE_TAG` matches nothing in `REGION`, the fault fails fast with no impact.
- **Spot instance start failures:** Start calls may fail with `InsufficientInstanceCapacity`; recover via your autoscaling configuration.
- **Stop protection:** Instances with `disableApiStop` enabled will reject the stop call.
- **Instance store data loss:** EC2 instance-store volumes are destroyed when an instance stops.
- **Cross-region targeting:** One experiment targets one region.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 stop by tag experiment fails with UnauthorizedOperation in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 permissions in the target region. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:StopInstances, ec2:StartInstances, ec2:DescribeInstances, and ec2:DescribeInstanceStatus, and that the policy condition (if any) allows the target region. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="EC2 stop by tag selects zero instances"
  mode="docs"
  fallback="The most common causes are: EC2_INSTANCE_TAG is misformatted (correct form is key:value); the tag key or value has a typo; the tag exists in a different region than REGION; or all matching instances were already stopped before the experiment started. Verify with aws ec2 describe-instances --filters 'Name=tag:<key>,Values=<value>'."
/>

<Troubleshoot
  issue="EC2 stop by tag experiment hangs waiting for instances to start"
  mode="docs"
  fallback="The most common causes are: targets are spot instances and AWS could not reclaim capacity (InsufficientInstanceCapacity); targets have stop protection (disableApiStop) and the prior stop call failed silently; or MANAGED_NODEGROUP was not set to enable for ASG-managed instances. Inspect chaos pod logs and EC2 console events, then either start instances manually or rerun with MANAGED_NODEGROUP=enable."
/>

---

## Related faults

- [EC2 stop by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id): Stop EC2 instances selected by instance ID instead of by tag.
- [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill): Kill a specific process inside an EC2 instance without stopping the host.
- [SSM chaos by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ssm-chaos-by-tag): Inject CPU, memory, or IO stress inside tagged EC2 instances via AWS Systems Manager.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
