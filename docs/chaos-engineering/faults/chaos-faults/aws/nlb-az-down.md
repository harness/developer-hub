---
id: nlb-az-down
title: NLB AZ down
sidebar_label: NLB AZ Down
description: Detach one or more availability zones from a Network Load Balancer for a configurable duration so you can test how clients, target groups, and AZ-aware routing behave when a zone is taken out of the load balancer rotation.
keywords:
  - chaos engineering
  - nlb az down
  - aws fault
  - network load balancer
  - availability zone
tags:
  - chaos-engineering
  - aws-faults
  - nlb-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/nlb-az-down
  - /docs/chaos-engineering/chaos-faults/aws/nlb-az-down
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

NLB AZ down is an AWS chaos fault that detaches one or more availability zones (`ZONES`) from a Network Load Balancer (`LOAD_BALANCER_ARN`) for a configurable duration, then reattaches them. While a zone is detached, the load balancer stops serving traffic on the corresponding zonal endpoint (the AZ's IP/EIP is removed from DNS), and targets in that zone are removed from rotation.

Use this fault to test how a multi-AZ NLB workload (typically high-throughput TCP/UDP services) behaves when an AZ disappears from the load balancer surface: whether DNS-based client failover works within the TTL budget, whether the remaining zones absorb the traffic without saturation, and whether long-lived TCP connections to the removed AZ recover.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **AZ-level resilience:** When one AZ disappears from the NLB, do clients fail over via DNS, and do remaining AZs absorb the traffic without breaching latency SLOs?
- **TCP connection behaviour:** Do long-lived TCP connections that terminate in the removed AZ get reset gracefully and re-establish on the surviving AZs?
- **Capacity planning:** Is the workload provisioned for `N-1` AZ availability, or does the remaining capacity saturate?
- **DNS TTL behaviour:** Do clients with stale DNS cache continue to attempt the removed AZ until the TTL expires?
- **Cross-zone behaviour:** When NLB cross-zone load balancing is disabled (the default for NLB), AZ removal cuts the targets in that AZ off completely; verify that clients shift to the surviving AZs cleanly.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target NLB:** `LOAD_BALANCER_ARN` exists in `REGION` and is configured for at least two AZs. The set `ZONES` must be a subset of the NLB's current AZ list (leaving at least one AZ attached).
- **Target group health in other AZs:** Targets in the remaining AZs are healthy and provisioned to absorb the additional traffic.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Network Load Balancer (NLB) | Supported |
| Internet-facing or internal NLB | Supported |
| NLB with at least two AZs configured | Supported |
| NLB with only one AZ configured | Not supported (cannot detach the only AZ) |
| Application Load Balancer (ALB) | Not supported (use [ALB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/alb-az-down)) |
| Classic Load Balancer (CLB) | Not supported (use [CLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/clb-az-down)) |
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
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:SetSubnets",
        "ec2:DescribeSubnets",
        "ec2:DescribeAvailabilityZones"
      ],
      "Resource": "*"
    }
  ]
}
```

- `elasticloadbalancing:DescribeLoadBalancers` reads the NLB's current subnet/AZ mapping before the fault.
- `elasticloadbalancing:SetSubnets` removes and restores subnets to detach/attach an AZ on an NLB.
- `ec2:DescribeSubnets` and `ec2:DescribeAvailabilityZones` resolve `ZONES` to the matching subnet IDs.

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

Configure the following fault parameters when you add NLB AZ down to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LOAD_BALANCER_ARN` | ARN of the target Network Load Balancer. | (required) |
| `REGION` | AWS region that hosts the NLB (for example `us-east-1`). | (required) |
| `ZONES` | Comma-separated list of availability zone names to detach (for example `us-east-1a,us-east-1b`). The list must leave at least one AZ attached to the NLB. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The AZs stay detached for this period. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple zones are detached: `parallel` detaches them all at once; `serial` detaches them one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Reads the current subnet/AZ mapping of `LOAD_BALANCER_ARN`, calls `SetSubnets` with the AZs in `ZONES` removed, waits for `TOTAL_CHAOS_DURATION` seconds, then calls `SetSubnets` again with the original subnet list to restore the AZ attachments.

---

## Expected behavior during fault execution

- The zonal endpoint (IP or EIP) of each detached AZ is removed from the NLB's DNS A records.
- Existing TCP connections that terminate in the removed AZ are reset, since the NLB stops routing through that AZ.
- New connections from clients with fresh DNS resolutions land on the surviving AZ endpoints; clients with stale DNS continue to attempt the removed AZ until the TTL expires.
- Targets in the detached AZs are removed from the load balancer's target group registration.
- Latency and throughput on the surviving AZs rise as they absorb the redirected traffic.
- CloudWatch metrics (`HealthyHostCount`, `ActiveFlowCount_TCP`) reflect the AZ removal.

:::info When the fault ends
The chaos pod calls `SetSubnets` with the original subnet list. DNS records update within seconds, and targets in the restored AZs re-register and accept new connections.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **DNS resolution:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `dig +short <nlb-dns-name>` and asserts that the number of A records drops by the number of detached AZs.
- **TCP connection success:** Use a command probe that runs `nc -vz <nlb-dns> <port>` against the NLB and asserts new connections succeed.
- **Healthy host count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_networkelb_healthy_host_count`.
- **Application availability:** Use the application's own probe (HTTP, TCP, custom) to assert end-to-end success rate stays above SLO.

---

## Verify the fault execution effect

While the experiment is running, confirm the AZ is detached and then reattached:

1. **Inspect the NLB's current AZ list.**

   ```bash
   aws elbv2 describe-load-balancers \
     --region <region> \
     --load-balancer-arns <arn> \
     --query "LoadBalancers[].AvailabilityZones[].ZoneName"
   ```

   During the fault the listed zones should not include `ZONES`. After recovery the original list should be back.

2. **Check DNS resolution.**

   ```bash
   dig +short <nlb-dns-name>
   ```

   Number of A records should drop during the chaos window.

3. **Inspect target group health.**

   ```bash
   aws elbv2 describe-target-health \
     --region <region> \
     --target-group-arn <target-group-arn>
   ```

   Targets in the detached AZs should report `unused` (no LB attachment) during the fault and `healthy` after recovery.

---

## Recovery and cleanup

- **End of duration:** The chaos pod calls `SetSubnets` with the original subnet list.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before the restore call, run `aws elbv2 set-subnets --load-balancer-arn <arn> --subnets <original-subnet-ids>` with the original subnet list (recorded in the chaos pod logs).
- **Workload recovery:** Targets re-register quickly; client DNS caches may take up to the configured TTL to pick up the restored IPs. Long-lived clients that were reset during the fault need to reconnect.

---

## Limitations

- **At least one AZ must remain attached:** The fault refuses to detach every AZ (the NLB requires at least one subnet).
- **DNS TTL is honoured by clients:** Even after the fault ends, clients with a stale DNS cache continue to attempt to reach the removed AZ until the TTL expires.
- **NLB cross-zone load balancing default is off:** Unlike ALB, NLB defaults to cross-zone disabled. Targets in a detached AZ are completely cut off; surviving-zone traffic does not flow to them.
- **EIP retention:** When the AZ is reattached, the same EIPs (if any were assigned) are reused; verify the subnet IDs you supplied match the original ones.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="NLB AZ down fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ELB or EC2 permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes elasticloadbalancing:DescribeLoadBalancers, elasticloadbalancing:SetSubnets, ec2:DescribeSubnets, and ec2:DescribeAvailabilityZones."
/>

<Troubleshoot
  issue="NLB AZ down fails because of subnet/EIP mismatch on reattach"
  mode="docs"
  fallback="If the NLB uses Elastic IPs, the SetSubnets call must include each subnet's original EIP allocation to preserve it. Use the SubnetMapping form of SetSubnets and pass the original AllocationId for each subnet. The chaos pod records the original mapping in the experiment logs."
/>

<Troubleshoot
  issue="Long-lived TCP connections do not reconnect after the AZ is detached"
  mode="docs"
  fallback="When an AZ is removed from an NLB, in-flight TCP connections terminated in that AZ are reset. Some clients do not reconnect automatically on RST; verify your client library handles broken connections (for example by tuning the connection pool's eviction policy). Most clients reconnect on the next request and resolve a surviving AZ IP."
/>

<Troubleshoot
  issue="Subnets not restored after the chaos window"
  mode="docs"
  fallback="If the SetSubnets restore call failed (for example because a permission was revoked mid-experiment), the NLB is left with the reduced subnet list. Run 'aws elbv2 set-subnets --load-balancer-arn <arn> --subnets <original-subnet-ids>' with the original subnet IDs (recorded in the chaos pod logs). If the NLB uses EIPs, use the SubnetMapping form with the original AllocationIds."
/>

---

## Related faults

- [ALB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/alb-az-down): Detach AZs from an Application Load Balancer.
- [CLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/clb-az-down): Detach AZs from a Classic Load Balancer.
- [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole): Blackhole all VPC traffic to an AZ instead of just LB rotation.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
