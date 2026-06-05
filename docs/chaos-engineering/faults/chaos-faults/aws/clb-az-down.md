---
id: clb-az-down
title: CLB AZ down
sidebar_label: CLB AZ Down
description: Disable one or more availability zones on a Classic Load Balancer for a configurable duration so you can test how clients and back-end instances behave when an AZ is removed from the load balancer rotation.
keywords:
  - chaos engineering
  - clb az down
  - aws fault
  - classic load balancer
  - availability zone
tags:
  - chaos-engineering
  - aws-faults
  - clb-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/clb-az-down
  - /docs/chaos-engineering/chaos-faults/aws/clb-az-down
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

CLB AZ down is an AWS chaos fault that disables one or more availability zones (`ZONES`) on a Classic Load Balancer (`LOAD_BALANCER_NAME`) for a configurable duration, then re-enables them. While a zone is disabled, the load balancer stops routing traffic to back-end instances in that zone, and the corresponding IP addresses are removed from the load balancer's DNS A records.

Use this fault to test how a multi-AZ workload behaves when a single AZ disappears from a Classic Load Balancer: whether DNS-based client failover works within the TTL budget, whether the remaining zones absorb the traffic without saturation, and whether autoscaling responds correctly to the concentrated load.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **AZ-level resilience:** When one AZ disappears from the CLB, do clients fail over via DNS, and do remaining AZs absorb the traffic without breaching latency SLOs?
- **Capacity planning:** Is the workload provisioned for `N-1` AZ availability, or do the remaining instances saturate?
- **DNS TTL behaviour:** Do clients with stale DNS cache continue to attempt the removed AZ until the TTL expires, and does the application handle the resulting failures?
- **Cross-zone load balancing:** When cross-zone is enabled, do instances in the remaining AZs serve traffic that previously hit the removed zone?
- **Recovery and rebalance:** When the AZ returns, do instances re-register cleanly and resume serving?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target CLB:** `LOAD_BALANCER_NAME` exists in `REGION` and is configured for at least two AZs. The set `ZONES` must be a subset of the CLB's current AZ list (leaving at least one AZ enabled).
- **Instance health in other AZs:** Instances in the remaining AZs are healthy and provisioned to absorb the additional traffic.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Classic Load Balancer (CLB) | Supported |
| Internet-facing or internal CLB | Supported |
| CLB in EC2-Classic | Not supported (deprecated by AWS) |
| Application Load Balancer (ALB) | Not supported (use [ALB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/alb-az-down)) |
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
        "elasticloadbalancing:DisableAvailabilityZonesForLoadBalancer",
        "elasticloadbalancing:EnableAvailabilityZonesForLoadBalancer",
        "elasticloadbalancing:DetachLoadBalancerFromSubnets",
        "elasticloadbalancing:AttachLoadBalancerToSubnets",
        "ec2:DescribeSubnets",
        "ec2:DescribeAvailabilityZones"
      ],
      "Resource": "*"
    }
  ]
}
```

- `DescribeLoadBalancers` reads the CLB's current AZ list.
- `DisableAvailabilityZonesForLoadBalancer` / `EnableAvailabilityZonesForLoadBalancer` apply to EC2-Classic CLBs.
- `DetachLoadBalancerFromSubnets` / `AttachLoadBalancerToSubnets` apply to VPC CLBs.
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

Configure the following fault parameters when you add CLB AZ down to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `LOAD_BALANCER_NAME` | Name of the target Classic Load Balancer. | (required) |
| `REGION` | AWS region that hosts the CLB (for example `us-east-1`). | (required) |
| `ZONES` | Comma-separated list of availability zone names to disable (for example `us-east-1a,us-east-1b`). The list must leave at least one AZ enabled on the CLB. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The AZs stay disabled for this period. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple zones are disabled: `parallel` disables them all at once; `serial` disables them one at a time. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults). AWS-specific shared tunables are documented in [common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables).

---

## Fault execution in brief

Reads the current AZ/subnet mapping of `LOAD_BALANCER_NAME`, calls the disable/detach API to remove the AZs in `ZONES`, waits for `TOTAL_CHAOS_DURATION` seconds, then calls the enable/attach API to restore the original AZ list.

---

## Expected behavior during fault execution

- The IP addresses of the disabled AZs are removed from the CLB's DNS A records. New DNS resolutions return only the surviving AZ IPs.
- Existing clients with stale DNS cache continue to connect to the removed AZ IPs until the TTL expires; those connections fail or time out.
- Back-end instances in the disabled AZs are removed from rotation. When cross-zone load balancing is enabled, the remaining AZs absorb the traffic.
- Latency and throughput on the surviving AZs rise as they absorb the redirected traffic.
- CloudWatch metrics (`HealthyHostCount`, `RequestCount`) reflect the AZ removal.

:::info When the fault ends
The chaos pod restores the original AZ list. DNS records update within seconds and instances re-register.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **DNS resolution:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs `dig +short <clb-dns-name>` and asserts that the number of A records drops by the number of disabled AZs.
- **Application availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) and assert success rate stays above SLO.
- **Healthy host count:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the CLB's `HealthyHostCount` metric to confirm the surviving AZs continue to serve.
- **CPU saturation on surviving AZs:** Use a Prometheus probe on `aws_ec2_cpuutilization` of the back-end instances in the surviving AZs.

---

## Verify the fault execution effect

While the experiment is running, confirm the AZ is disabled and then re-enabled:

1. **Inspect the CLB's current AZ list.**

   ```bash
   aws elb describe-load-balancers \
     --region <region> \
     --load-balancer-names <name> \
     --query "LoadBalancerDescriptions[].AvailabilityZones"
   ```

   During the fault the listed zones should not include `ZONES`. After recovery the original list should be back.

2. **Check DNS resolution.**

   ```bash
   dig +short <clb-dns-name>
   ```

   Number of A records should drop during the chaos window.

3. **Inspect instance health.**

   ```bash
   aws elb describe-instance-health \
     --region <region> \
     --load-balancer-name <name>
   ```

   Instances in the disabled AZs should be removed from the listing during the fault.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original AZ list.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before the restore call, run `aws elb enable-availability-zones-for-load-balancer` (for EC2-Classic) or `aws elb attach-load-balancer-to-subnets` (for VPC) with the original AZ/subnet list (recorded in the chaos pod logs).
- **Workload recovery:** Instances re-register quickly; client DNS caches may take up to the configured TTL to pick up the restored IPs.

---

## Limitations

- **At least one AZ must remain enabled:** The fault refuses to disable every AZ (the CLB requires at least one AZ).
- **DNS TTL is honoured by clients:** Even after the fault ends, clients with a stale DNS cache continue to attempt to reach the removed AZ until the TTL expires.
- **EC2-Classic CLB is deprecated:** This fault works against VPC CLBs only.
- **Connection draining:** Existing connections to instances in the removed AZ are not actively terminated; they continue until the client closes them or the connection idle timeout elapses.
- **Cross-region targeting:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="CLB AZ down fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required ELB or EC2 permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes elasticloadbalancing:DescribeLoadBalancers, elasticloadbalancing:DetachLoadBalancerFromSubnets, elasticloadbalancing:AttachLoadBalancerToSubnets, ec2:DescribeSubnets, and ec2:DescribeAvailabilityZones."
/>

<Troubleshoot
  issue="CLB AZ down fails because the resulting AZ list is empty"
  mode="docs"
  fallback="A Classic Load Balancer requires at least one AZ enabled. If the values in ZONES would leave the CLB with no AZ, the API call fails. Reduce ZONES to a subset that leaves at least one AZ enabled, or split the experiment into multiple iterations."
/>

<Troubleshoot
  issue="Clients keep hitting the disabled AZ for several minutes after the fault starts"
  mode="docs"
  fallback="Clients respect the DNS TTL of the CLB A records (default 60 seconds). Some applications cache DNS for longer than the TTL because of their HTTP client or JVM behaviour. Verify the cache duration in the client. CLB does not actively close existing connections when an AZ is disabled."
/>

<Troubleshoot
  issue="AZ not restored after the chaos window"
  mode="docs"
  fallback="If the enable/attach call failed (for example because a permission was revoked mid-experiment), the CLB is left without the original AZs. Run 'aws elb attach-load-balancer-to-subnets --load-balancer-name <name> --subnets <original-subnet-ids>' (or the EC2-Classic enable equivalent) with the original IDs (recorded in the chaos pod logs)."
/>

---

## Related faults

- [ALB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/alb-az-down): Detach AZs from an Application Load Balancer.
- [NLB AZ down](/docs/chaos-engineering/faults/chaos-faults/aws/nlb-az-down): Detach AZs from a Network Load Balancer.
- [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole): Blackhole all VPC traffic to an AZ instead of just LB rotation.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
