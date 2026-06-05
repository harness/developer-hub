---
id: ecs-container-network-latency
title: ECS container network latency
sidebar_label: ECS Container Network Latency
description: Add a configurable amount of network latency on a specific interface inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration so you can test how the workload behaves when the network is slow.
keywords:
  - chaos engineering
  - ecs container network latency
  - aws fault
  - ecs fault
  - network latency
tags:
  - chaos-engineering
  - aws-faults
  - ecs-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ecs-container-network-latency
  - /docs/chaos-engineering/chaos-faults/aws/ecs-container-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ECS container network latency is an AWS chaos fault that adds `NETWORK_LATENCY` milliseconds of one-way latency on the network interface `NETWORK_INTERFACE` inside a percentage of running ECS tasks (EC2 launch type) for a configurable duration. The fault uses AWS Systems Manager Run Command on the EC2 host of each selected task and applies the latency inside the affected container, scoped via ECS container metadata.

Use this fault to test how a workload behaves when network latency rises between an ECS task and its dependencies: whether timeouts and retries are sized correctly, whether circuit breakers engage, and whether latency-sensitive features (synchronous calls, streaming) degrade gracefully or fail outright.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Timeout sizing:** When the network slows by `NETWORK_LATENCY` ms, do client timeouts fire correctly without cascading failures?
- **Retry storms:** Do retries amplify the latency into an outage, or does an exponential backoff calm the system?
- **User-perceived latency:** Does the application surface user-visible latency increases, and do dashboards reflect them?
- **Synchronous-call chains:** For services with deep synchronous call graphs, does the added latency push end-to-end latency over SLO?
- **Streaming workloads:** Do long-lived streams (gRPC, WebSocket) tolerate the latency change, or do they drop?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ECS service or cluster:** `CLUSTER_NAME` exists in `REGION` and uses the EC2 launch type.
- **Container instances are SSM-managed:** Every EC2 container instance is registered with AWS Systems Manager.
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

Configure the following fault parameters when you add ECS container network latency to an experiment in Chaos Studio. Defaults are shown for reference.

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
| `NETWORK_LATENCY` | Amount of one-way latency to inject (in milliseconds). | `2000` |
| `NETWORK_INTERFACE` | Network interface to apply the latency on, inside the container. `auto` discovers the primary egress interface automatically. | `auto` |
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

Resolves the running tasks for `SERVICE_NAME` (or all tasks in `CLUSTER_NAME`), picks `TASK_REPLICA_AFFECTED_PERC` of them, and dispatches a network-latency rule via AWS Systems Manager Run Command to the EC2 host of each selected task. The rule is applied inside the target container on `NETWORK_INTERFACE` and held for `TOTAL_CHAOS_DURATION` seconds, then reversed.

---

## Expected behavior during fault execution

- New network packets leaving the affected containers via `NETWORK_INTERFACE` are delayed by `NETWORK_LATENCY` ms.
- End-to-end request latency rises by approximately `NETWORK_LATENCY` ms per hop traversed by the affected interface.
- Application timeouts that were sized below the added latency begin to fire.
- CloudWatch latency metrics (where exported) rise on the affected service.

:::info When the fault ends
The chaos pod removes the latency rule on each host. Network latency returns to baseline immediately for new packets.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency rises by approximately `NETWORK_LATENCY` ms during the fault.
- **Timeout failures:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-level timeout counters.
- **Network metrics:** Use a Prometheus probe on `aws_ecs_network_tx_bytes` and `aws_ecs_network_rx_bytes` to confirm traffic continues but slowly.
- **Downstream dependency calls:** Use a Prometheus probe on retry counters to detect retry storms.

---

## Verify the fault execution effect

While the experiment is running, confirm latency rose and recovered:

1. **Probe from a peer.**

   ```bash
   curl -w "@curl-format.txt" -o /dev/null -s http://<service-endpoint>/healthz
   ```

   Request time should rise by approximately `NETWORK_LATENCY` ms during the chaos window.

2. **Inspect the latency rule on the host (via SSM).**

   ```bash
   aws ssm send-command \
     --region <region> \
     --document-name AWS-RunShellScript \
     --instance-ids <container-instance-id> \
     --parameters 'commands=["tc qdisc show dev '"$NETWORK_INTERFACE"'"]'
   ```

   Output should show a netem rule during the chaos window and no chaos rule afterwards.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the latency rule on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and removes the rule.
- **Manual recovery:** If the fault exits before the rule is removed, send an SSM command to clear the rule on the affected interface.
- **Workload recovery:** Long-lived TCP connections may benefit from a reset after the latency disappears if congestion windows are stuck at the higher RTT estimate.

---

## Limitations

- **EC2 launch type only:** The fault uses SSM Run Command against the underlying EC2 host. Fargate is not supported.
- **Container metadata must be enabled.**
- **SSM-managed hosts only.**
- **Linux-only.**
- **One direction only:** Latency is applied on egress from the container on `NETWORK_INTERFACE`; return-path delays from peers are unaffected. Combine with a peer-side fault for round-trip emulation.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ECS container network latency fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ECS or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ecs:DescribeServices, ecs:DescribeTasks, ssm:SendCommand, and ssm:GetCommandInvocation."
/>

<Troubleshoot
  issue="ECS container network latency reports interface not found"
  mode="docs"
  fallback="NETWORK_INTERFACE=auto attempts to find the container's primary egress interface; if discovery fails, supply an explicit name (typically 'eth0' inside the container). Confirm the interface exists with 'ip link show' inside the container (via SSM exec). For tasks with multiple ENIs, choose the correct interface for the traffic you want to slow."
/>

<Troubleshoot
  issue="Latency rule applied but client latency does not rise"
  mode="docs"
  fallback="The most common causes are: the affected interface is not the path the traffic takes (set NETWORK_INTERFACE explicitly); the rule was applied to a sibling task on the same host (verify with the SSM command output); the load balancer routed traffic away from the affected tasks because of failing health checks; or the application uses a long-lived TCP connection that was already established before the rule (new packets on the existing connection still see the latency, but the application may be CPU-bound on a single connection)."
/>

<Troubleshoot
  issue="Latency rule remains after the chaos window"
  mode="docs"
  fallback="If the cleanup SSM command failed (timeout, transient SSM error), the rule may persist. Send an SSM AWS-RunShellScript command to the affected container instance that removes the tc qdisc rule from the root of the chosen network interface. The exact command is recorded in the chaos pod logs."
/>

---

## Related faults

- [ECS container network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-network-loss): Drop packets instead of adding latency.
- [ECS container HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ecs-container-http-latency): Add latency only to HTTP traffic on a specific port.
- [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency): Add latency at the EC2 host level instead of the container.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
