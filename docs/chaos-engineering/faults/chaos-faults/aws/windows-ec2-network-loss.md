---
id: windows-ec2-network-loss
title: Windows EC2 network loss
sidebar_label: Windows EC2 Network Loss
description: Drop a configurable percentage of network packets destined for specific IPs or hosts on one or more Windows EC2 instances (selected by ID or tag) for a configurable duration so you can test how Windows-hosted workloads behave when the network is lossy.
keywords:
  - chaos engineering
  - windows ec2 network loss
  - aws fault
  - ec2 fault
  - windows chaos
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/windows-ec2-network-loss
  - /docs/chaos-engineering/chaos-faults/aws/windows-ec2-network-loss
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows EC2 network loss is an AWS chaos fault that drops `NETWORK_PACKET_LOSS_PERCENTAGE` percent of network packets destined for `DESTINATION_IPS` and/or `DESTINATION_HOSTS` on one or more Windows EC2 instances for a configurable duration. Targets are selected by `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG`. The fault dispatches a Windows traffic-shaping command via AWS Systems Manager Run Command and removes the rule at the end of the fault.

Use this fault to test how a Windows-hosted workload behaves when the network becomes lossy on a specific path: whether retries recover requests, whether TCP backoff is acceptable, and whether monitoring detects the loss correctly.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Retry behaviour:** When `NETWORK_PACKET_LOSS_PERCENTAGE` percent of packets to a specific dependency is dropped, do retries recover requests?
- **TCP congestion control:** Does the connection survive, or does it back off so far that it stalls?
- **Replica failover:** For workloads with cross-AZ or cross-region replicas, does traffic shift away from the lossy path?
- **Monitoring fidelity:** Do dashboards and alerts identify the packet loss quickly?
- **Recovery time:** When the chaos ends, how quickly does throughput return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Windows EC2 instances:** Each instance is in the `running` state and registered with AWS Systems Manager.
- **Selection criteria:** Either `EC2_INSTANCE_ID` is set or `EC2_INSTANCE_TAG` is set.
- **Destinations:** At least one of `DESTINATION_IPS` or `DESTINATION_HOSTS` is set.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server 2016 / 2019 / 2022 EC2 | Supported |
| Linux EC2 instances | Not supported (use [EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-loss)) |
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
        "ssm:DescribeInstanceInformation"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
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

Configure the following fault parameters when you add Windows EC2 network loss to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |
| `NETWORK_PACKET_LOSS_PERCENTAGE` | Percentage of packets to drop on the affected path (0-100). | `100` |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to affect. | `""` |
| `EC2_INSTANCE_TAG` | Tag in `Key:Value` form matching candidate instances when `EC2_INSTANCE_ID` is empty. | `""` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances (by tag) to affect. | `0` |
| `DESTINATION_IPS` | Comma-separated list of destination IPs/CIDRs to drop traffic for. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames to drop traffic for. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `INSTALL_DEPENDENCIES` | Install the traffic-shaping tooling on the Windows host if missing. | `true` |
| `SEQUENCE` | Order in which multiple instances are affected: `parallel` applies the rule on all selected instances at once; `serial` does so one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Resolves the target instance list from `EC2_INSTANCE_ID` (or by `EC2_INSTANCE_TAG`), dispatches a Windows traffic-shaping command via AWS Systems Manager Run Command to each selected instance, installs a packet-drop rule for traffic destined for `DESTINATION_IPS` and `DESTINATION_HOSTS`, holds the rule for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- New packets leaving the target instances destined for the configured IPs or hosts are dropped at the configured percentage.
- TCP connections experience retransmissions; congestion windows shrink. Throughput drops sharply.
- UDP-based workloads see lost datagrams; application-level error counters rise.
- Application timeouts may fire if retransmissions exceed the configured timeout.

:::info When the fault ends
The chaos pod removes the loss rule on each host. New packets are not dropped; TCP congestion windows recover over the next several round-trip times.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Loss observation:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `ping <dest>` and asserts packet-loss percentage.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-level retry and error counters.
- **Throughput:** Use a Prometheus probe on network throughput metrics to see the drop in throughput.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert success rate stays above SLO.

---

## Verify the fault execution effect

While the experiment is running, confirm packets are dropped and then recover:

1. **Ping from the affected host (via SSM Session Manager).**

   ```powershell
   Test-Connection -ComputerName <destination> -Count 20
   ```

   Reply success ratio should drop to approximately `100 - NETWORK_PACKET_LOSS_PERCENTAGE` during the chaos window.

2. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

3. **Compare to a control host.**

   Run Test-Connection from a peer Windows instance that is not part of the experiment; loss should remain at baseline.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the loss rule on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and removes the rule.
- **Manual recovery:** If the fault exits before the rule is removed, send an SSM command (PowerShell) to clear the rule, or reboot the host.
- **Workload recovery:** TCP throughput may take a few seconds to recover as congestion windows grow.

---

## Limitations

- **Windows-only.**
- **SSM-managed hosts only.**
- **One direction only:** Loss is applied on egress; return-path losses are unaffected.
- **At 100% loss the destination is effectively isolated.**
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Windows EC2 network loss fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeInstances, ssm:SendCommand, ssm:GetCommandInvocation, and the ec2messages:* actions used by SSM."
/>

<Troubleshoot
  issue="Loss is applied but application keeps working without errors"
  mode="docs"
  fallback="The most common causes are: NETWORK_PACKET_LOSS_PERCENTAGE is low enough that TCP retransmissions absorb the loss invisibly; the dependency resolves to an IP not in DESTINATION_IPS; or a long-lived TCP connection bypasses the rule. Add the resolved IPs to DESTINATION_IPS explicitly, raise NETWORK_PACKET_LOSS_PERCENTAGE, or force a fresh connection."
/>

<Troubleshoot
  issue="Loss rule persists after the chaos window"
  mode="docs"
  fallback="If the cleanup SSM command failed, the rule may persist. Use SSM Session Manager to log in to the host and remove the traffic-shaping rule using the PowerShell command shown in the chaos pod logs, or reboot the host."
/>

<Troubleshoot
  issue="Tags match more instances than expected"
  mode="docs"
  fallback="EC2_INSTANCE_TAG matches any instance carrying that tag in the target REGION. Use a more specific tag or set INSTANCE_AFFECTED_PERC to bound the blast radius. Verify with 'aws ec2 describe-instances --filters Name=tag:Key,Values=Value'."
/>

---

## Related faults

- [Windows EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-network-latency): Add latency instead of dropping packets.
- [Windows EC2 blackhole chaos](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-blackhole-chaos): Blackhole specific IPs/hosts entirely.
- [EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-loss): Network loss on Linux EC2 instances.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
