---
id: windows-ec2-blackhole-chaos
title: Windows EC2 blackhole chaos
sidebar_label: Windows EC2 Blackhole Chaos
description: Blackhole all network traffic destined for specific IPs or hosts on one or more Windows EC2 instances (selected by ID or tag) for a configurable duration so you can test how Windows-hosted workloads behave when a specific dependency is completely unreachable.
keywords:
  - chaos engineering
  - windows ec2 blackhole chaos
  - aws fault
  - ec2 fault
  - windows chaos
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/windows-ec2-blackhole-chaos
  - /docs/chaos-engineering/chaos-faults/aws/windows-ec2-blackhole-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Windows EC2 blackhole chaos is an AWS chaos fault that drops 100% of network traffic destined for `IP_ADDRESSES` and/or `DESTINATION_HOSTS` on one or more Windows EC2 instances for a configurable duration. Targets are selected by `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG`. The fault installs a Windows firewall block rule via AWS Systems Manager Run Command and removes it at the end of the fault.

Use this fault to test how a Windows-hosted workload behaves when a specific dependency is completely unreachable: whether application timeouts engage, whether retries back off, whether circuit breakers open, and whether replicated services fail over to an alternate path.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Dependency unavailability:** When a critical dependency (database, cache, third-party API) is unreachable, does the application fail fast with a clear error or hang waiting on the network?
- **Circuit breaker:** Does the application's circuit breaker open and serve a fallback?
- **Cross-region failover:** For multi-region workloads, does traffic shift to the alternate region when the primary becomes unreachable?
- **Monitoring fidelity:** Do alerts on "dependency unreachable" fire within the SLA?
- **Recovery time:** When the chaos ends, how quickly does the dependency become reachable and the workload return to normal?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target Windows EC2 instances:** Each instance is in the `running` state and registered with AWS Systems Manager.
- **Selection criteria:** Either `EC2_INSTANCE_ID` is set or `EC2_INSTANCE_TAG` is set.
- **Destinations:** At least one of `IP_ADDRESSES` or `DESTINATION_HOSTS` is set.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Windows Server 2016 / 2019 / 2022 EC2 | Supported |
| Linux EC2 instances | Not supported (use [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole) for cross-AZ blackholing) |
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

Configure the following fault parameters when you add Windows EC2 blackhole chaos to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REGION` | AWS region that hosts the target instances (for example `us-east-1`). | (required) |

**Targeting parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `EC2_INSTANCE_ID` | Comma-separated list of EC2 instance IDs to affect. | `""` |
| `EC2_INSTANCE_TAG` | Tag in `Key:Value` form matching candidate instances when `EC2_INSTANCE_ID` is empty. | `""` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances (by tag) to affect. `0` corresponds to one instance. | `0` |
| `IP_ADDRESSES` | Comma-separated list of destination IPs/CIDRs to blackhole. | `""` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames to blackhole. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The block rule is held for this period. | `60` |
| `INSTALL_DEPENDENCIES` | Install supporting tooling on the Windows host if missing. | `true` |
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

Resolves the target instance list from `EC2_INSTANCE_ID` (or by `EC2_INSTANCE_TAG`), dispatches a Windows firewall block-rule command via AWS Systems Manager Run Command to each selected instance for traffic destined for `IP_ADDRESSES` and `DESTINATION_HOSTS`, holds the rule for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- New connections from the target instances to the configured destinations fail with `connect timeout` or `host unreachable`.
- Existing connections may continue or break depending on whether the firewall rule applies to established flows.
- Application timeouts fire on calls to the blackholed dependency; retries amplify briefly before backoff settles in.
- Circuit breakers (when present) trip open.

:::info When the fault ends
The chaos pod removes the block rule on each host. New connections succeed; the application may need to retry or trigger circuit-breaker reset logic for full recovery.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Reachability:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `Test-NetConnection` from the affected host.
- **Application errors:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on application-level dependency-call error counters.
- **Circuit breaker state:** Use a Prometheus probe on the circuit-breaker open/closed counter.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert success rate stays above SLO.

---

## Verify the fault execution effect

While the experiment is running, confirm the destination is blackholed:

1. **Probe from the affected host (via SSM Session Manager).**

   ```powershell
   Test-NetConnection -ComputerName <destination> -Port <port> -InformationLevel Detailed
   ```

   The probe should report failure during the chaos window and success after recovery.

2. **Compare to a control host.**

   Run Test-NetConnection from a peer Windows instance that is not part of the experiment; the destination should remain reachable.

3. **Inspect SSM command status.**

   ```bash
   aws ssm list-command-invocations --region <region> --details --filters "key=Status,value=InProgress"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the firewall block rule on each host.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the SSM command and removes the rule.
- **Manual recovery:** If the fault exits before the rule is removed, log in via SSM Session Manager and remove the firewall rule with `Remove-NetFirewallRule -DisplayName <name>`, or reboot the host.
- **Workload recovery:** Circuit breakers may need to be reset by the application; some workloads require an explicit restart to re-establish pooled connections.

---

## Limitations

- **Windows-only.**
- **SSM-managed hosts only.**
- **At least one destination required:** With both `IP_ADDRESSES` and `DESTINATION_HOSTS` empty, the rule matches nothing and the fault has no visible effect.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).
- **Existing connection handling:** Windows Firewall behaviour on already-established connections depends on the rule type; new connections are always affected.

---

## Troubleshooting

<Troubleshoot
  issue="Windows EC2 blackhole chaos fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 or SSM permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeInstances, ssm:SendCommand, ssm:GetCommandInvocation, and the ec2messages:* actions used by SSM."
/>

<Troubleshoot
  issue="Destination is still reachable during the chaos window"
  mode="docs"
  fallback="The most common causes are: the destination resolves to an IP not in IP_ADDRESSES (verify with Resolve-DnsName); the application uses a long-lived connection that was established before the rule; or another firewall rule (corporate, GPO-pushed) is more specific and overrides the chaos block. Add the resolved IPs explicitly, force a fresh connection, and confirm the firewall rule was created with 'Get-NetFirewallRule -DisplayName <chaos-rule-name>'."
/>

<Troubleshoot
  issue="Firewall block rule persists after the chaos window"
  mode="docs"
  fallback="If the cleanup SSM command failed, the firewall rule may persist. Log in via SSM Session Manager and remove the rule manually with 'Remove-NetFirewallRule -DisplayName <chaos-rule-name>'. The exact rule name is recorded in the chaos pod logs. Rebooting the host clears all temporary rules created in the temporary scope."
/>

<Troubleshoot
  issue="Instance becomes unreachable from outside during the chaos window"
  mode="docs"
  fallback="If you set IP_ADDRESSES or DESTINATION_HOSTS to a value that includes the SSM endpoint or your management station, the chaos blocks the very channel needed to manage the host. Avoid blackholing AWS service endpoints (SSM, EC2 metadata, S3) and your own management CIDRs. Use a peer instance to verify the chosen rule does not isolate the host completely."
/>

---

## Related faults

- [Windows EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-network-loss): Partial loss instead of full blackhole.
- [Windows EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-network-latency): Slow the path instead of blocking it.
- [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole): Blackhole an entire AZ at the VPC level.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
