---
id: ec2-stop-by-id
title: EC2 stop by ID
sidebar_label: EC2 Stop by ID
description: Stop one or more EC2 instances selected by instance ID for a configurable duration so you can test how the workload running on those instances behaves during and after the outage.
keywords:
  - chaos engineering
  - ec2 stop by id
  - aws fault
  - ec2 fault
  - instance stop
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-stop-by-id
  - /docs/chaos-engineering/chaos-faults/aws/ec2-stop-by-id
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 stop by ID is an AWS chaos fault that stops one or more EC2 instances identified by their instance IDs for a configurable duration and then starts them again. Only the listed instances are affected; other instances in the same account or region keep running normally. When the fault ends, the chaos pod issues a start call and waits for each instance to return to the `running` state.

Use this fault to test how a workload behaves when one or more EC2 instances disappear: replicas served by other instances pick up the load, an auto-scaling group provisions a replacement, an instance behind a load balancer is taken out of rotation, or a stateful service has to recover from a host going away.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Replica failover:** When a specific instance hosting a workload is stopped, do remaining replicas absorb the traffic without dropping requests?
- **Load balancer health checks:** Does the target group or classic load balancer detach the stopped instance quickly, and does it reattach cleanly when the instance returns?
- **Auto-scaling group response:** For instances inside an ASG, does a replacement instance launch within the expected window, and does the application register correctly on the new host?
- **Managed node group resilience (EKS):** When a worker node is stopped, are pods evicted to other nodes, and does the cluster recover its desired capacity?
- **Stateful workload recovery:** For databases, queues, or services with local state, does the service recover cleanly when the host returns, or does it require manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target instances exist and are reachable:** Every ID in `EC2_INSTANCE_ID` exists in `REGION` and is in the `running` state at the start of the experiment.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.
- **ASG awareness (only when targeting nodes in a managed node group):** If the target is a node in an EKS managed node group, set `MANAGED_NODEGROUP=enable` so the fault waits for a replacement node instead of attempting to start the original instance.

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

The IAM principal that the chaos pod uses (the credentials mounted from the Harness Secret Manager file secret, the IRSA role on the chaos service account, or the role assumed via `ASSUME_ROLE_ARN`) needs the following AWS actions.

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

- `ec2:StopInstances` and `ec2:StartInstances` are required to drive the fault.
- `ec2:DescribeInstances` and `ec2:DescribeInstanceStatus` are used to confirm the instance reaches `stopped` and `running` states.
- `autoscaling:DescribeAutoScalingInstances` is only required when `MANAGED_NODEGROUP=enable`; it lets the fault detect that the ASG has launched a replacement instead of waiting forever to start the original.

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

Configure the following fault parameters when you add EC2 stop by ID to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to stop (for example `i-0abc123,i-0def456`). | (required) |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive stop iterations when running for longer than one cycle. | `60` |
| `SEQUENCE` | Order in which multiple instances are stopped: `parallel` stops all listed instances at once; `serial` stops them one at a time. | `parallel` |
| `MANAGED_NODEGROUP` | Set to `enable` when the target instance is part of an EKS managed node group; the fault then waits for a replacement node instead of starting the original instance. | `disable` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |
| `AWS_SHARED_CREDENTIALS_FILE` | Path inside the chaos pod where the AWS credentials file from `AWS_AUTHENTICATION_SECRET` is mounted. | `/tmp/cloud_config.yml` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

:::warning Drain managed node group instances before the fault
If the target EC2 instance is part of a managed node group, drain the node and cordon it before running the fault so that workload pods are not scheduled onto an instance that is about to disappear. Go to the Kubernetes [drain documentation](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/) to review the procedure.
:::

---

## Fault execution in brief

Calls `StopInstances` on every instance ID in `EC2_INSTANCE_ID` within `REGION`, waits for `TOTAL_CHAOS_DURATION` seconds, then calls `StartInstances` to bring each instance back to the `running` state (unless `MANAGED_NODEGROUP=enable`, in which case it waits for a replacement node from the ASG).

---

## Expected behavior during fault execution

- Each listed instance transitions from `running` to `stopping` to `stopped` within seconds of the stop call.
- Instances behind a load balancer or in a target group are marked unhealthy and removed from rotation according to the target group's health-check configuration.
- Applications running on the stopped instances become unreachable; replicas on other instances should absorb the traffic if the workload is horizontally scaled.
- For EKS worker nodes, pods on the stopped node enter the `Terminating` then `Pending` state; the scheduler places them on other nodes if capacity is available.
- When `MANAGED_NODEGROUP=enable`, the ASG launches a replacement node and the fault waits for the new node to join the cluster before reporting success.

:::info When the fault ends
The chaos pod calls `StartInstances` and polls until each target reaches `running`. Applications recover on their own schedule; long-lived TCP connections that were dropped during the outage typically need to be re-established by the caller.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the public endpoint of the workload to detect downtime and measure recovery time.
- **Target group health:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_applicationelb_healthy_host_count` or `aws_elb_healthy_host_count` to confirm the load balancer detected the outage.
- **EC2 instance state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ec2 describe-instances --instance-ids <id>` to assert the expected state at each phase.
- **CloudWatch metrics:** Use a Prometheus probe (with the CloudWatch exporter) on `aws_ec2_status_check_failed` to confirm the instance went down and came back.

---

## Verify the fault execution effect

While the experiment is running, confirm the instances are stopped and then restored:

1. **Inspect instance state from the AWS CLI.**

   ```bash
   aws ec2 describe-instances \
     --region <region> \
     --instance-ids <instance-id-1> <instance-id-2> \
     --query "Reservations[].Instances[].[InstanceId,State.Name]"
   ```

   During the fault the state should be `stopping` or `stopped`. After `TOTAL_CHAOS_DURATION` (and the start call) it should return to `running`.

2. **Check load balancer target health (if applicable).**

   ```bash
   aws elbv2 describe-target-health \
     --region <region> \
     --target-group-arn <target-group-arn>
   ```

   The targets corresponding to the stopped instances should be `unhealthy` during the fault and `healthy` after recovery.

3. **For EKS managed node groups, confirm a replacement joined.**

   ```bash
   kubectl get nodes -o wide
   ```

   When `MANAGED_NODEGROUP=enable`, a new node with a different name should be visible in the `Ready` state by the end of the experiment.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `StartInstances` for every instance ID (unless `MANAGED_NODEGROUP=enable`) and polls until each reaches `running`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same start call. If the experiment is aborted before the stop call has completed, no recovery is needed.
- **Manual recovery:** If the fault exits with an error before issuing the start call (for example because of an IAM permission failure), start the affected instances manually with `aws ec2 start-instances --instance-ids <ids>`.
- **Workload recovery:** For workloads that pin state to a specific host (databases, brokers, sticky sessions), recovery may continue after the EC2 instance returns. Monitor application logs and reconciliation metrics to confirm the workload has caught up.

---

## Limitations

- **Spot instance start failures:** When the target is a spot instance, the start call may fail with `InsufficientInstanceCapacity` if AWS cannot reclaim the capacity. The fault reports the failure; recover the workload by relaunching from your autoscaling configuration.
- **Stop protection:** Instances with `disableApiStop` enabled will reject the `StopInstances` call and the fault will fail fast. Disable stop protection or pick a different instance.
- **Instance store data loss:** EC2 instance-store volumes are destroyed when the instance stops. If the workload writes important state to instance store, expect data loss across the fault.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`). To exercise multiple regions, run multiple experiments in sequence or in parallel.
- **Reboot vs stop:** This fault stops the instance, which detaches it from the host and clears CPU/memory state. Use a reboot-style fault if you only need to recycle the OS.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 stop by ID experiment fails with UnauthorizedOperation in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 permissions in the target region. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:StopInstances, ec2:StartInstances, ec2:DescribeInstances, and ec2:DescribeInstanceStatus, and that the policy condition (if any) allows the target region. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="EC2 stop by ID experiment hangs waiting for instance to start"
  mode="docs"
  fallback="The most common causes are: the instance is a spot instance and AWS could not reclaim capacity (InsufficientInstanceCapacity); the instance has stop protection (disableApiStop) so the prior stop call failed silently and the chaos pod is now waiting on an unrelated state; or MANAGED_NODEGROUP was not set to enable for an ASG-managed instance. Inspect the chaos pod logs with kubectl logs and the EC2 console events to identify the underlying AWS error, then either start the instance manually or rerun with MANAGED_NODEGROUP=enable."
/>

<Troubleshoot
  issue="EC2 stop by ID experiment fails with InvalidInstanceID.NotFound"
  mode="docs"
  fallback="The instance ID does not exist in the supplied REGION. Verify that the ID is correct, that REGION matches the instance's region exactly (for example us-east-1 vs us-east-2), and that the AWS account used by the credentials is the account that owns the instance."
/>

<Troubleshoot
  issue="EC2 stop by ID experiment runs but the workload does not recover"
  mode="docs"
  fallback="The fault completed successfully but the application is still degraded. Check whether the load balancer health check has rebound to the recovered instance; whether the workload requires a manual reconciliation step after a host returns; or whether a dependent service (database, cache, message broker) needs to be restarted. Application-layer recovery is independent of the EC2 instance state."
/>

---

## Related faults

- [EC2 stop by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-tag): Stop EC2 instances selected by tag instead of by ID.
- [EC2 process kill](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-process-kill): Kill a specific process inside an EC2 instance without stopping the host.
- [SSM chaos by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ssm-chaos-by-id): Inject CPU, memory, or IO stress inside an EC2 instance via AWS Systems Manager.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.

