---
id: windows-ec2-network-latency
title: Windows EC2 network latency
sidebar_label: Windows EC2 Network Latency
description: Add a configurable amount of latency to network traffic destined for specific IPs or hosts on one or more Windows EC2 instances (selected by ID or tag) for a configurable duration so you can test how Windows-hosted workloads behave when the network is slow.
keywords:
  - chaos engineering
  - windows ec2 network latency
  - aws fault
  - ec2 fault
  - windows chaos
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/windows-ec2-network-latency
  - /docs/chaos-engineering/chaos-faults/aws/windows-ec2-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows EC2 network latency is an AWS chaos fault that adds `NETWORK_LATENCY` milliseconds of latency to network traffic destined for `DESTINATION_IPS` and/or `DESTINATION_HOSTS` on one or more Windows EC2 instances for a configurable duration. Targets are selected by `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG`. The fault dispatches a Windows traffic-shaping command via AWS Systems Manager Run Command and removes the rule at the end of the fault.

Use this fault to test how a Windows-hosted workload behaves when network latency to a specific dependency rises: whether application timeouts engage, whether retries amplify the latency, and whether monitoring detects the slowdown.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Targeted dependency slowdown:** When the latency to a specific database, cache, or third-party API rises, do timeouts and circuit breakers protect upstream callers?
- **End-to-end latency budget:** How much added latency can a transaction tolerate before SLO breach?
- **Replica failover:** For workloads with cross-region or cross-AZ replicas, does traffic shift away from the slow target?
- **Monitoring fidelity:** Do dashboards on `Network Out Latency` or application-level RTT histograms catch the change?
- **Recovery time:** When the chaos ends, how quickly does latency return to baseline?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Windows EC2 instances:** Each instance is in the `running` state and registered with AWS Systems Manager.
- **Selection criteria:** Either `EC2_INSTANCE_ID` is set or `EC2_INSTANCE_TAG` is set.
- **Destinations:** At least one of `DESTINATION_IPS` or `DESTINATION_HOSTS` is set so the latency rule has something to match.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server 2016 / 2019 / 2022 EC2 | Supported |
| Linux EC2 instances | Not supported (use [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency)) |
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

Configure the following fault parameters when you add Windows EC2 network latency to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |
| `NETWORK_LATENCY` | Amount of latency to add to traffic destined for the configured IPs/hosts (in milliseconds). | `2000` |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to affect. | `""` |
| `EC2_INSTANCE_TAG` | Tag in `Key:Value` form matching candidate instances when `EC2_INSTANCE_ID` is empty. | `""` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances (by tag) to affect. `0` corresponds to one instance. | `0` |
| `DESTINATION_IPS` | Comma-separated list of destination IPs/CIDRs that the latency rule should match. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames that the latency rule should match. | `""` |

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

Resolves the target instance list from `EC2_INSTANCE_ID` (or by `EC2_INSTANCE_TAG`), dispatches a Windows traffic-shaping command via AWS Systems Manager Run Command to each selected Windows instance, installs a latency rule for traffic destined for `DESTINATION_IPS` and `DESTINATION_HOSTS`, holds the rule for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- New packets leaving the target instances destined for the configured IPs or hosts are delayed by `NETWORK_LATENCY` ms.
- Application latency to those dependencies rises; other traffic is unaffected.
- Application timeouts that were sized below the added latency begin to fire.
- CloudWatch and application-level latency dashboards reflect the increase.

:::info When the fault ends
The chaos pod removes the latency rule on each host. New packets are not delayed.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Latency to dependency:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `Test-NetConnection` or `ping` from the host to the dependency.
- **Application timeout counters:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on client-side timeout counters.
- **Application latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert percentile latency SLOs.

---

## Verify the fault execution effect

While the experiment is running, confirm latency rose and recovered:

1. **Probe from the affected host (via SSM Session Manager).**

   ```powershell
   Test-NetConnection -ComputerName <destination-host> -InformationLevel Detailed
   ```

   RTT to the destination should rise by approximately `NETWORK_LATENCY` ms during the chaos window.

2. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

3. **Compare to a control host.**

   Run the same Test-NetConnection from a peer Windows instance that is not part of the experiment; latency to the same destination should remain at baseline.

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the latency rule on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and removes the rule.
- **Manual recovery:** If the fault exits before the rule is removed, send an SSM command (PowerShell) to clear the rule.
- **Workload recovery:** Long-lived TCP connections may benefit from a reset after the latency disappears.

---

## Limitations

- **Windows-only.**
- **SSM-managed hosts only.**
- **At least one destination required:** With both `DESTINATION_IPS` and `DESTINATION_HOSTS` empty, the rule matches nothing and the fault has no visible effect.
- **One direction only:** Latency is applied on egress; return-path latency from peers is unaffected.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Windows EC2 network latency fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeInstances, ssm:SendCommand, ssm:GetCommandInvocation, and the ec2messages:* actions used by SSM."
/>

<Troubleshoot
  issue="Latency rule applied but client latency does not rise"
  mode="docs"
  fallback="The most common causes are: the destination resolves to an IP that does not match DESTINATION_IPS (verify with Resolve-DnsName on the host); the dependency uses a different protocol than the rule covers; or a long-lived TCP connection bypasses the rule for in-flight packets. Add the resolved IPs to DESTINATION_IPS explicitly and force a new connection."
/>

<Troubleshoot
  issue="Latency rule persists after the chaos window"
  mode="docs"
  fallback="If the cleanup SSM command failed, the rule may persist. Use SSM Session Manager to log in to the host and run the PowerShell command shown in the chaos pod logs to remove the traffic-shaping rule, or reboot the host to clear all temporary rules."
/>

<Troubleshoot
  issue="Tags match more instances than expected"
  mode="docs"
  fallback="EC2_INSTANCE_TAG matches any instance carrying that tag in the target REGION. Use a more specific tag, or use INSTANCE_AFFECTED_PERC to bound the blast radius. Verify the candidate list with 'aws ec2 describe-instances --filters Name=tag:Key,Values=Value'."
/>

---

## Related faults

- [Windows EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-network-loss): Drop packets instead of adding latency.
- [Windows EC2 blackhole chaos](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-blackhole-chaos): Blackhole specific IPs/hosts entirely.
- [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency): Network latency on Linux EC2 instances.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
