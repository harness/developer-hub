---
id: ecs-instance-stop
title: ECS instance stop
sidebar_label: ECS Instance Stop
description: Stop one or more EC2 container instances that back an ECS cluster for a configurable duration so you can test how the cluster reschedules tasks, drains workloads, and recovers when capacity disappears.
keywords:
  - chaos engineering
  - ecs instance stop
  - aws fault
  - ecs fault
  - container instance
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-instance-stop
  - /docs/chaos-engineering/chaos-faults/aws/ecs-instance-stop
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS instance stop is an AWS chaos fault that stops one or more EC2 container instances behind a target ECS cluster for a configurable duration and then starts them again. Tasks running on the stopped instances are terminated; the ECS scheduler must reschedule them onto remaining capacity (or onto replacement instances provisioned by an Auto Scaling group). When the fault ends, the chaos pod issues a start call on each instance and waits for it to return to the `running` state, unless `MANAGED_NODEGROUP=enable`, in which case it waits for the ASG to provide a replacement.

Use this fault to test how an ECS workload behaves when EC2 container capacity disappears: whether services reschedule onto surviving instances, whether an ASG launches replacements within the expected window, whether load balancers reroute traffic, and whether stateful workloads pinned to a host recover cleanly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Task rescheduling:** When a container instance is stopped, does the ECS scheduler reschedule the lost tasks onto remaining instances within the deployment's recovery SLA?
- **Auto Scaling group replacement:** Does the ASG that backs the ECS capacity provider launch a replacement instance within the expected window, and does it register cleanly with the cluster?
- **Load balancer health:** Does the target group for the ECS service mark the lost tasks unhealthy quickly enough, and does it reattach the rescheduled tasks?
- **Capacity provider behaviour:** For clusters with managed capacity providers, does the cluster scale up automatically when an instance disappears?
- **Stateful workload recovery:** For tasks with mounted EBS volumes or local state, does the workload recover cleanly when rescheduled, or does it require manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type. Either `EC2_INSTANCE_ID` is set to a specific container instance, or the fault picks one from the cluster's container instance list.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.
- **ASG awareness (only when targeting nodes in an ECS managed ASG or EKS managed node group):** If the target instance is part of an Auto Scaling group that ECS uses for capacity provisioning, set `MANAGED_NODEGROUP=enable` so the fault waits for a replacement instance instead of attempting to start the original.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon ECS on EC2 launch type | Supported |
| Amazon ECS on Fargate launch type | Not supported (no EC2 host to stop) |
| ECS capacity providers backed by an ASG | Supported (set `MANAGED_NODEGROUP=enable`) |
| Linux container instances | Supported |
| Windows container instances | Supported |
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
        "ecs:DescribeClusters",
        "ecs:ListContainerInstances",
        "ecs:DescribeContainerInstances",
        "ecs:ListTasks",
        "ecs:DescribeTasks"
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
- `ec2:DescribeInstances` and `ec2:DescribeInstanceStatus` are used to confirm the instance reaches `stopped` and `running` states.
- `ecs:*` actions are used to discover the container instances behind the cluster and (with `DEFAULT_HEALTH_CHECK=true`) to verify tasks reschedule.
- `autoscaling:DescribeAutoScalingInstances` is only required when `MANAGED_NODEGROUP=enable`; it lets the fault detect that the ASG has launched a replacement.

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

Configure the following fault parameters when you add ECS instance stop to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the ECS cluster and container instances (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. Required when `EC2_INSTANCE_ID` is empty, so the fault can pick a container instance from the cluster. | `""` |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to stop. When set, the fault targets exactly these hosts instead of picking from the cluster. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive stop iterations when running for longer than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple instances are stopped: `parallel` stops all listed instances at once; `serial` stops them one at a time. | `parallel` |
| `MANAGED_NODEGROUP` | Set to `enable` when the target instance is part of an ASG-managed capacity provider; the fault then waits for a replacement instance instead of starting the original. | `disable` |
| `DEFAULT_HEALTH_CHECK` | When set to `true`, the fault runs additional checks against ECS to verify tasks reschedule after the stop. | `false` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

:::warning Drain tasks from managed instances before the fault
If the target container instance is part of a managed capacity provider, drain its tasks (set the container instance state to `DRAINING` and wait for replicas to migrate) before running the fault so that workload tasks are not hard-killed by the stop. Use `aws ecs update-container-instances-state` to drain.
:::

---

## Fault execution in brief

Resolves `EC2_INSTANCE_ID` (or picks one from `CLUSTER_NAME`), calls `StopInstances` in `REGION`, waits for `TOTAL_CHAOS_DURATION` seconds, then calls `StartInstances` to bring each instance back to the `running` state (unless `MANAGED_NODEGROUP=enable`, in which case it waits for a replacement instance from the ASG).

---

## Expected behavior during fault execution

- The target EC2 container instance transitions from `running` to `stopping` to `stopped` within seconds of the stop call.
- The instance is reported in ECS as `INACTIVE` once the agent stops responding.
- Tasks running on the stopped instance are terminated. The ECS scheduler attempts to reschedule them on remaining capacity, subject to the service's task placement constraints.
- Targets in the load balancer target group for the lost tasks are marked unhealthy and removed from rotation.
- When `MANAGED_NODEGROUP=enable`, the ASG launches a replacement instance and the fault waits for the new instance to register with the cluster before reporting success.

:::info When the fault ends
The chaos pod calls `StartInstances` (or waits for ASG replacement) and polls until each target reaches `running`. Tasks recover on their own schedule, driven by the desired-count of the affected services.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against the service endpoint to measure recovery time.
- **Task count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_ecs_running_task_count` for the affected service to confirm tasks reschedule.
- **Target group health:** Use a Prometheus probe on `aws_applicationelb_healthy_host_count` or `aws_elb_healthy_host_count` to confirm the load balancer detected the outage and recovered.
- **EC2 instance state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `aws ec2 describe-instances` to assert the expected state at each phase.

---

## Verify the fault execution effect

While the experiment is running, confirm the instance is stopped and the cluster recovers:

1. **Inspect EC2 instance state.**

   ```bash
   aws ec2 describe-instances \
     --region <region> \
     --instance-ids <instance-id> \
     --query "Reservations[].Instances[].State.Name"
   ```

   During the fault the state should be `stopping` or `stopped`. After `TOTAL_CHAOS_DURATION` it should return to `running` (or a new instance ID appears when `MANAGED_NODEGROUP=enable`).

2. **Confirm tasks reschedule onto other container instances.**

   ```bash
   aws ecs list-tasks --cluster <cluster> --service-name <service> --region <region>
   aws ecs describe-tasks --cluster <cluster> --tasks <task-arn> --region <region> \
     --query "tasks[].containerInstanceArn"
   ```

   After recovery the `containerInstanceArn` should point to a different (or new) container instance.

3. **For ASG-managed capacity, confirm a replacement joined the cluster.**

   ```bash
   aws ecs list-container-instances --cluster <cluster> --region <region>
   ```

   A new container instance ARN should appear by the end of the experiment.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `StartInstances` for every target instance (unless `MANAGED_NODEGROUP=enable`) and polls until each reaches `running`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio triggers the same start call.
- **Manual recovery:** If the fault exits with an error before the start call (for example because of an IAM permission failure), start the affected instances manually with `aws ec2 start-instances --instance-ids <ids>`.
- **Task recovery:** Lost tasks are rescheduled by the ECS service controller; for services with `desiredCount > 0` no manual intervention is needed. Standalone tasks (those started with `aws ecs run-task`) are not rescheduled and must be re-started by the caller.

---

## Limitations

- **Spot instance start failures:** When the target is a spot instance, the start call may fail with `InsufficientInstanceCapacity` if AWS cannot reclaim the capacity. Recover the workload by relaunching from the ASG.
- **Stop protection:** Instances with `disableApiStop` enabled will reject the `StopInstances` call and the fault will fail fast.
- **Local data loss:** Tasks that wrote to host bind-mounts or instance-store volumes will lose that state when the instance stops. Use EBS-backed task volumes if persistence across the fault matters.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).
- **Standalone tasks are not rescheduled:** Only tasks managed by a service are rescheduled automatically; tasks started ad hoc via `run-task` are gone after the fault.

---

## Troubleshooting

<Troubleshoot
  issue="ECS instance stop experiment fails with UnauthorizedOperation in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 or ECS permissions in the target region. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:StopInstances, ec2:StartInstances, ec2:DescribeInstances, ecs:DescribeClusters, ecs:ListContainerInstances, and ecs:DescribeContainerInstances. When using ASSUME_ROLE_ARN, also confirm the source identity is trusted to assume the role."
/>

<Troubleshoot
  issue="ECS instance stop hangs waiting for the instance to start"
  mode="docs"
  fallback="The most common causes are: the instance is a spot instance and AWS could not reclaim capacity (InsufficientInstanceCapacity); the instance has stop protection (disableApiStop) so the prior stop call failed silently; or MANAGED_NODEGROUP was not set to enable for an ASG-managed capacity provider. Inspect the chaos pod logs with kubectl logs and the EC2 console events to identify the underlying AWS error, then either start the instance manually or rerun with MANAGED_NODEGROUP=enable."
/>

<Troubleshoot
  issue="ECS instance stop completes but tasks did not reschedule"
  mode="docs"
  fallback="The most common causes are: the service has placement constraints (memberOf attributes or distinctInstance) that no other instance satisfies; the remaining cluster capacity is insufficient (check CPU and memory reservation); the affected tasks were standalone (started with run-task) rather than service-managed and therefore are not rescheduled automatically; or the service has reached maximumPercent during a deployment. Verify with 'aws ecs describe-services' and adjust placement or capacity accordingly."
/>

<Troubleshoot
  issue="ECS instance stop reports InvalidInstanceID.NotFound"
  mode="docs"
  fallback="The instance ID does not exist in the supplied REGION. Verify that the ID is correct, that REGION matches the instance's region exactly (for example us-east-1 vs us-east-2), and that the AWS account used by the credentials owns the instance. When using CLUSTER_NAME alone (without EC2_INSTANCE_ID), also confirm the cluster has at least one registered container instance with agentConnected=true."
/>

---

## Related faults

- [ECS agent stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-agent-stop): Stop the ECS agent on container instances without stopping the underlying EC2 host.
- [ECS task stop](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-task-stop): Stop specific ECS tasks while leaving container instances running.
- [EC2 stop by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id): Stop EC2 instances outside an ECS context.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
