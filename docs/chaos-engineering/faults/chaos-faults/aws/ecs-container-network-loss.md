---
id: ecs-container-network-loss
title: ECS container network loss
sidebar_label: ECS Container Network Loss
description: Drop a configurable percentage of network packets on a specific interface inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration so you can test how the workload behaves when the network is lossy.
keywords:
  - chaos engineering
  - ecs container network loss
  - aws fault
  - ecs fault
  - packet loss
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-network-loss
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container network loss is an AWS chaos fault that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of network packets on the network interface `NETWORK_INTERFACE` inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration. The fault uses AWS Systems Manager Run Command on the EC2 host of each selected task and applies the rule inside the affected container, scoped via ECS container metadata.

Use this fault to test how a workload behaves when the network becomes lossy: whether application retries recover, whether TCP backoff and congestion control degrade gracefully, and whether monitoring detects the packet loss correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Retry behaviour:** When `NETWORK_PACKET_LOSS_PERCENTAGE` percent of packets is dropped, do application-level retries recover requests within SLO?
- **TCP congestion control:** Does the connection survive, or does it back off so far that it stalls?
- **UDP-based workloads:** For UDP applications (DNS, metrics, video), does the application detect and respond to loss?
- **Long-lived streams:** Do gRPC, WebSocket, and other long-lived streams survive a loss window, or do they drop?
- **Monitoring fidelity:** Do dashboards and alerts identify the packet loss quickly?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service or cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type.
- **Container instances are SSM-managed.**
- **ECS container metadata enabled.**
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

Configure the following fault parameters when you add ECS container network loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CLUSTER_NAME` | Name of the target ECS cluster. | (required) |
| `REGION` | AWS region that hosts the ECS cluster (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SERVICE_NAME` | Name of the target ECS service. When set, the fault selects `TASK_REPLICA_AFFECTED_PERC` of the service's running tasks. | `""` |
| `TASK_REPLICA_AFFECTED_PERC` | Percentage of running tasks to affect when `SERVICE_NAME` is set. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of packets to drop on the affected interface (0-100). | `100` |
| `NETWORK_INTERFACE` | Network interface inside the container on which to apply the loss. `auto` discovers the primary egress interface. | `auto` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `INSTALL_DEPENDENCIES` | Install the networking tooling on each container instance if missing. | `true` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault runs additional checks against ECS to verify task health. | `false` |
| `SEQUENCE` | Order in which multiple tasks are stressed: `parallel` issues the rule on all selected tasks at once; `serial` does so one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the running tasks for `SERVICE_NAME` (or all tasks in `CLUSTER_NAME`), picks `TASK_REPLICA_AFFECTED_PERC` of them, and dispatches a packet-loss rule via AWS Systems Manager Run Command to the EC2 host of each selected task. The rule is applied inside the target container on `NETWORK_INTERFACE` and held for `TOTAL_CHAOS_DURATION` seconds, then reversed.

---

## Expected behavior during fault execution

- New network packets leaving the affected containers via `NETWORK_INTERFACE` are dropped at the configured percentage.
- TCP connections experience retransmissions; congestion windows shrink. Throughput drops sharply.
- UDP-based workloads see lost datagrams; application-level error counters rise.
- Application-level timeouts may fire if retransmissions exceed the configured timeout.

:::info When the fault ends
The chaos pod removes the loss rule on each host. New packets are not dropped; TCP congestion windows recover over the next several round-trip times.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-level retry and error counters.
- **TCP retransmissions:** Use a Prometheus probe on host-level `node_netstat_Tcp_RetransSegs` (if exported).
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert success rate stays above SLO.
- **Throughput:** Use a Prometheus probe on `aws_ecs_network_tx_bytes` to see the drop in throughput during the loss window.

---

## Verify the fault execution effect

While the experiment is running, confirm packets are dropped and then recover:

1. **Probe from a peer with ping.**

   ```bash
   ping -c 20 <service-endpoint>
   ```

   Loss percentage should be approximately `NETWORK_PACKET_LOSS_PERCENTAGE` during the chaos window.

2. **Inspect the loss rule on the host (via SSM).**

   ```bash
   aws ssm send-command \
     --region <region> \
     --document-name AWS-RunShellScript \
     --instance-ids <container-instance-id> \
     --parameters 'commands=["tc qdisc show dev '"$NETWORK_INTERFACE"'"]'
   ```

   Output should show a netem rule with loss during the chaos window.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the loss rule on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and removes the rule.
- **Manual recovery:** If the fault exits before the rule is removed, send an SSM command to clear the rule.
- **Workload recovery:** TCP connections may experience reduced throughput briefly after the loss ends while congestion windows recover; application behaviour should return to baseline within seconds.

---

## Limitations

- **EC2 launch type only.**
- **Container metadata must be enabled.**
- **SSM-managed hosts only.**
- **Linux-only.**
- **One direction only:** Loss is applied on egress from the container; return-path losses from peers are unaffected.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).
- **At 100% loss the container is effectively isolated:** Health checks and other probes will fail; expect ECS to restart the tasks if probes have a tight failure threshold.

---

## Troubleshooting

<Troubleshoot
  issue="ECS container network loss fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTasks, ssm:SendCommand, and ssm:GetCommandInvocation."
/>

<Troubleshoot
  issue="Loss is applied but application keeps working without errors"
  mode="docs"
  fallback="The most common causes are: NETWORK_PACKET_LOSS_PERCENTAGE is low enough that TCP retransmissions absorb the loss invisibly; the application uses long-lived idempotent gRPC calls that automatically retry; or the affected interface is not the path the traffic takes (set NETWORK_INTERFACE explicitly). Try a higher loss percentage or pick a different interface."
/>

<Troubleshoot
  issue="Tasks are killed by health checks during the loss window"
  mode="docs"
  fallback="At high loss percentages, health probes may fail, causing ECS to restart the task. Either lower NETWORK_PACKET_LOSS_PERCENTAGE, increase the health check failure threshold during the experiment, or disable health-check-driven restarts on a test service used only for chaos."
/>

<Troubleshoot
  issue="Loss rule remains after the chaos window"
  mode="docs"
  fallback="If the cleanup SSM command failed (timeout, transient SSM error), the rule may persist. Send an SSM AWS-RunShellScript command to the affected container instance that removes the tc qdisc rule from the root of the chosen network interface. The exact command is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS container network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-network-latency): Add latency instead of dropping packets.
- [ECS container HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-http-latency): Affect only HTTP traffic on a specific port.
- [EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-loss): Drop packets at the EC2 host level instead of the container.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
