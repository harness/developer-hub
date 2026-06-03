---
id: ec2-network-latency
title: EC2 network latency
sidebar_label: EC2 Network Latency
description: Add configurable latency and jitter to outbound traffic on an EC2 instance via AWS Systems Manager so you can test how the workload reacts when network round-trip times grow.
keywords:
  - chaos engineering
  - ec2 network latency
  - aws fault
  - network chaos
  - latency injection
  - systems manager
tags:
  - chaos-engineering
  - aws-faults
  - ec2-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/ec2-network-latency
  - /docs/chaos-engineering/chaos-faults/aws/ec2-network-latency
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

EC2 network latency is an AWS chaos fault that adds a configurable amount of latency (with optional jitter) to outbound network traffic on a target EC2 instance for a configurable duration. The latency can be scoped to specific destination hosts or IPs, and applied on a specific network interface. The fault dispatches the shaping rules via AWS Systems Manager Run Command.

Use this fault to test how a workload reacts when network round-trip times grow: do timeouts trigger correctly, do retries amplify load, do connection pools become exhausted, does observability surface the increased latency?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Cross-AZ latency simulation:** When latency to a specific destination rises by 50-100 ms, does the application degrade gracefully or do downstream timeouts cascade?
- **Database call timeouts:** When latency to the database is added, does the client-side timeout fire at the expected point and does the application surface a clean error?
- **Connection pool exhaustion:** Do connection pools (HTTP, database, queue) survive added latency, or do they exhaust and block all callers?
- **Retry storm protection:** Do retries with exponential backoff and jitter prevent storms, or do they pile on?
- **SLO validation:** When latency is added, does the SLO error budget burn at the expected rate?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target instance is reachable via SSM:** The instance has the SSM Agent running and an instance profile with `AmazonSSMManagedInstanceCore`.
- **Selector provided:** Either `EC2_INSTANCE_ID` or `EC2_INSTANCE_TAG` is set.
- **Network shaping tools installable:** `tc` / `iproute2` must be installable on the target. Set `INSTALL_NETEM=true` (default) to install them if missing.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EC2 (Linux instances with SSM Agent) | Supported |
| Amazon EKS managed worker nodes | Supported (if SSM Agent is installed) |
| Amazon EKS self-managed worker nodes | Supported (if SSM Agent is installed) |
| Targeting by tag | Supported via `EC2_INSTANCE_TAG` |
| Targeting by ID | Supported via `EC2_INSTANCE_ID` |
| Windows instances | Not supported (Linux-only network shaping) |

---

## Permissions required

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
        "ssm:DescribeInstanceInformation",
        "ssm:GetDocument",
        "ssm:DescribeDocument"
      ],
      "Resource": "*"
    }
  ]
}
```

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
| `REGION` | AWS region that hosts the target instance. | (required) |
| `EC2_INSTANCE_ID` *or* `EC2_INSTANCE_TAG` | One of these must be set to select the target instance(s). | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `NETWORK_LATENCY` | Latency to inject (in milliseconds). | `3000` |
| `JITTER` | Random variation in latency (in milliseconds). | `2000` |
| `NETWORK_INTERFACE` | Network interface to apply shaping on. | `eth0` |
| `DESTINATION_HOSTS` | Comma-separated list of destination hostnames to target. Leave empty to affect all destinations. | `""` |
| `DESTINATION_IPS` | Comma-separated list of destination IPs/CIDRs to target. Leave empty to affect all destinations. | `""` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `INSTANCE_AFFECTED_PERC` | Percentage of matching instances to target (only with `EC2_INSTANCE_TAG`). `0` targets one instance. | `0` |
| `INSTALL_DEPENDENCIES` | Install dependencies inside the target instance if missing. Set to `False` to skip. | `True` |
| `INSTALL_NETEM` | Install the `tc` / netem networking tools if missing. | `true` |
| `PROXY` | HTTP/HTTPS proxy used by the in-instance installer (for example `https_proxy=http://proxy.server:3128`). | `""` |
| `SEQUENCE` | Order in which multiple instances are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::tip Scope the blast radius with destinations
Without `DESTINATION_HOSTS` or `DESTINATION_IPS`, the latency applies to all outbound traffic, including the SSM control channel back to AWS. Scope to specific destinations whenever possible.
:::

---

## Fault execution in brief

Sends an SSM Run Command to the selected instance(s) in `REGION` that adds a network-shaping rule on `NETWORK_INTERFACE` to delay outbound traffic to `DESTINATION_HOSTS`/`DESTINATION_IPS` by `NETWORK_LATENCY` ± `JITTER` milliseconds for `TOTAL_CHAOS_DURATION` seconds, then removes the rule.

---

## Expected behavior during fault execution

- Outbound RTT to the targeted destinations rises by approximately `NETWORK_LATENCY` ± `JITTER` milliseconds.
- TCP connections established during the fault have inflated handshake times.
- Long-running connections continue working but with higher latency per round trip.
- Latency-sensitive operations (synchronous RPCs, database queries) may time out depending on client configuration.
- CloudWatch network metrics (`NetworkIn`, `NetworkOut`) typically do not visibly change; latency does not affect throughput unless callers retry aggressively.

:::info When the fault ends
The chaos pod removes the network-shaping rule. Latency to the targeted destinations returns to baseline within seconds. Connections that timed out during the fault must be re-established.
:::

### Signals to watch

- **End-to-end latency:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint that calls one of the affected destinations.
- **Synthetic RTT from the target:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `ping -c 3 <destination>` via SSM during the fault.
- **Connection-pool saturation:** Use Prometheus probes on application-specific pool-size metrics.

---

## Verify the fault execution effect

While the experiment is running:

1. **Confirm the shaping rule is in place via SSM.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["tc qdisc show dev <NETWORK_INTERFACE>"]'
   ```

2. **Measure RTT to the destination.**

   ```bash
   aws ssm send-command \
     --region <region> \
     --instance-ids <id> \
     --document-name AWS-RunShellScript \
     --parameters 'commands=["ping -c 5 <destination-host>"]'
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod removes the network-shaping rule.
- **Abort the experiment:** Stopping the experiment from Chaos Studio cancels the in-flight SSM command and removes any installed rules.
- **Manual cleanup:** If a rule is left behind, remove it via SSM: `tc qdisc del dev <NETWORK_INTERFACE> root`.

---

## Limitations

- **Linux-only payload:** This fault shapes traffic on Linux instances. For Windows hosts, use `windows-ec2-network-latency`.
- **SSM Agent required:** Instances without the SSM Agent online cannot be targeted.
- **Outbound only:** Latency is applied to traffic leaving `NETWORK_INTERFACE`. Inbound latency is not directly controllable from the receiver side.
- **Control-channel impact:** Without `DESTINATION_HOSTS`/`DESTINATION_IPS`, the rule affects all outbound traffic including the SSM control channel; very high latency values may delay cleanup.
- **DNS resolution:** Hosts in `DESTINATION_HOSTS` are resolved once at the start of the fault. IPs that change during the experiment are not picked up.

---

## Troubleshooting

<Troubleshoot
  issue="EC2 network latency experiment fails with InvalidInstanceId in Harness Chaos Engineering"
  mode="docs"
  fallback="The SSM Agent is not online for the target instance. Confirm with aws ssm describe-instance-information --filters 'Key=InstanceIds,Values=<id>'. If missing, install the SSM Agent and attach an instance profile that includes AmazonSSMManagedInstanceCore."
/>

<Troubleshoot
  issue="EC2 network latency runs but RTT to the destination does not change"
  mode="docs"
  fallback="The most common causes are: tc/iproute2 failed to install (set INSTALL_NETEM=true and verify network egress from the instance, or use PROXY); NETWORK_INTERFACE is wrong (use 'ip link show' to confirm); or DESTINATION_HOSTS resolved to IPs that the target reaches via a different interface. Run 'tc qdisc show dev <interface>' via SSM during the fault to verify the rule is in place."
/>

<Troubleshoot
  issue="EC2 network latency disrupted my SSM connection and the fault hangs"
  mode="docs"
  fallback="DESTINATION_HOSTS / DESTINATION_IPS were left empty, so latency applied to all outbound traffic including the SSM control channel. Wait for TOTAL_CHAOS_DURATION to elapse and the cleanup command to land, then rerun with explicit DESTINATION_HOSTS or DESTINATION_IPS that exclude the SSM endpoint."
/>

---

## Related faults

- [EC2 network loss](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-loss): Drop a percentage of packets instead of adding latency.
- [EC2 DNS chaos](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-dns-chaos): Block DNS resolution for specific hostnames.
- [EC2 HTTP latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-http-latency): Add latency only to HTTP traffic on a specific port.
- [Windows EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/windows-ec2-network-latency): Network latency for Windows instances.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
