---
id: alb-az-down
title: ALB AZ down
sidebar_label: ALB AZ Down
description: Detach one or more availability zones from an Application Load Balancer for a configurable duration so you can test how clients, target groups, and AZ-aware routing behave when a zone is taken out of the load balancer rotation.
keywords:
  - chaos engineering
  - alb az down
  - aws fault
  - load balancer fault
  - availability zone
tags:
  - chaos-engineering
  - aws-faults
  - alb-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/alb-az-down
  - /docs/chaos-engineering/chaos-faults/aws/alb-az-down
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

ALB AZ down is an AWS chaos fault that detaches one or more availability zones (`ZONES`) from an Application Load Balancer (`LOAD_BALANCER_ARN`) for a configurable duration, then reattaches them. While a zone is detached, the load balancer stops accepting traffic from clients in that zone (the corresponding ALB IP addresses are removed from DNS), and targets in that zone are removed from rotation.

Use this fault to test how a multi-AZ workload behaves when a single AZ disappears from the load balancer's surface: whether DNS-based client failover works within the TTL budget, whether the remaining zones absorb the traffic without saturation, and whether autoscaling responds correctly to the concentrated load.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **AZ-level resilience:** When one AZ disappears from the ALB, do clients fail over via DNS, and do remaining AZs absorb the traffic without breaching latency SLOs?
- **Capacity planning:** Is the workload provisioned for `N-1` AZ availability, or does the remaining capacity hit CPU/memory caps?
- **DNS TTL behaviour:** Do clients with stale DNS cache continue to attempt the removed AZ until the TTL expires, and does the application handle the resulting failures?
- **Cross-zone load balancing:** When cross-zone is enabled, do targets in the remaining AZs serve traffic from clients that previously hit the removed zone? When disabled, does AZ-affinity break?
- **Recovery and reattach:** When the AZ returns, do targets re-register cleanly and resume serving?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target ALB:** `LOAD_BALANCER_ARN` exists in `REGION` and is configured for at least two AZs. The set `ZONES` must be a subset of the ALB's current AZ list (leaving at least one AZ attached).
- **Target group health in other AZs:** Targets in the remaining AZs are healthy and provisioned to absorb the additional traffic.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Application Load Balancer (ALB) | Supported |
| Internet-facing or internal ALB | Supported |
| ALB with at least two AZs configured | Supported |
| ALB with only one AZ configured | Not supported (cannot detach the only AZ) |
| Classic Load Balancer (CLB) | Not supported (use [CLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/clb-az-down)) |
| Network Load Balancer (NLB) | Not supported (use [NLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/nlb-az-down)) |
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

- `elasticloadbalancing:DescribeLoadBalancers` reads the ALB's current subnet/AZ mapping before the fault.
- `elasticloadbalancing:SetSubnets` removes and restores subnets to detach/attach an AZ on an ALB.
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

Configure the following fault parameters when you add ALB AZ down to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LOAD_BALANCER_ARN` | ARN of the target Application Load Balancer. | (required) |
| `REGION` | AWS region that hosts the ALB (for example `us-east-1`). | (required) |
| `ZONES` | Comma-separated list of availability zone names to detach (for example `us-east-1a,us-east-1b`). The list must leave at least one AZ attached to the ALB. | (required) |

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

- The IP addresses of the detached AZs are removed from the ALB's DNS A records. New DNS resolutions return only the surviving AZ IPs.
- Existing clients with stale DNS cache continue to connect to the removed AZ IPs until the TTL expires; those connections fail or time out.
- Targets in the detached AZs are removed from the load balancer's target group registration. Cross-zone routing (when enabled) routes traffic to targets in the remaining AZs.
- Latency and throughput on the surviving AZs rise as they absorb the redirected traffic.
- CloudWatch metrics for the ALB (`HealthyHostCount`, `ActiveConnectionCount`) reflect the AZ removal.

:::info When the fault ends
The chaos pod calls `SetSubnets` with the original subnet list. DNS records are updated within seconds, and targets in the restored AZs re-register.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **DNS resolution:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `dig +short <alb-dns-name>` and asserts that the number of A records drops by the number of detached AZs.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert success rate stays above SLO.
- **Healthy host count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_applicationelb_healthy_host_count` to confirm the surviving AZs continue to serve.
- **CPU saturation on surviving AZs:** Use a Prometheus probe on `aws_ecs_cpu_utilization` (for ECS) or `aws_ec2_cpuutilization` to detect saturation.

---

## Verify the fault execution effect

While the experiment is running, confirm the AZ is detached and then reattached:

1. **Inspect the ALB's current AZ list.**

   ```bash
   aws elbv2 describe-load-balancers \
     --region <region> \
     --load-balancer-arns <arn> \
     --query "LoadBalancers[].AvailabilityZones[].ZoneName"
   ```

   During the fault the listed zones should not include `ZONES`. After recovery the original list should be back.

2. **Check DNS resolution.**

   ```bash
   dig +short <alb-dns-name>
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
- **Workload recovery:** Targets re-register quickly; client DNS caches may take up to the configured TTL to pick up the restored IPs.

---

## Limitations

- **At least one AZ must remain attached:** The fault refuses to detach every AZ (the ALB requires at least one subnet).
- **DNS TTL is honoured by clients:** Even after the fault ends, clients with a stale DNS cache continue to attempt to reach the removed AZ until the TTL expires. Most modern resolvers respect the ALB TTL (60s by default).
- **Connection draining:** Existing connections to targets in the removed AZ are not actively terminated by `SetSubnets`; they continue until the client closes them, hits a connection idle timeout, or the target deregistration delay elapses.
- **No effect on cross-zone-disabled target health:** When cross-zone load balancing is disabled and the AZ is removed, all targets in that AZ are also removed; the target group's healthy host count reflects this.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="ALB AZ down fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ELB or EC2 permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes elasticloadbalancing:DescribeLoadBalancers, elasticloadbalancing:SetSubnets, ec2:DescribeSubnets, and ec2:DescribeAvailabilityZones."
/>

<Troubleshoot
  issue="ALB AZ down fails because the resulting subnet list is too small"
  mode="docs"
  fallback="ALB requires at least one subnet (and at least two for some configurations). If the values in ZONES would leave the ALB with too few subnets, the API call fails. Remove a smaller set of zones, or use multiple smaller experiments instead of detaching all but one zone at once."
/>

<Troubleshoot
  issue="Clients keep hitting the detached AZ for several minutes after the fault starts"
  mode="docs"
  fallback="Clients respect the DNS TTL of the ALB A records (default 60 seconds). Some applications cache DNS for longer than the TTL because of their HTTP client or JVM behaviour. Verify the cache duration in the client, and consider adjusting the application's DNS TTL handling for tests. ALB does not actively close existing connections when an AZ is removed."
/>

<Troubleshoot
  issue="Subnets not restored after the chaos window"
  mode="docs"
  fallback="If the SetSubnets restore call failed (for example because a permission was revoked mid-experiment), the ALB is left with the reduced subnet list. Run 'aws elbv2 set-subnets --load-balancer-arn <arn> --subnets <original-subnet-list>' with the original subnet IDs (recorded in the chaos pod logs) to restore."
/>

---

## Related faults

- [CLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/clb-az-down): Detach AZs from a Classic Load Balancer.
- [NLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/nlb-az-down): Detach AZs from a Network Load Balancer.
- [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole): Blackhole all VPC traffic to an AZ instead of just LB rotation.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
