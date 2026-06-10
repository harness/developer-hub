---
id: az-blackhole
title: AZ blackhole
sidebar_label: AZ Blackhole
description: Isolate network traffic for one or more AWS Availability Zones (optionally scoped to specific VPCs or subnets) for a configurable duration and restore connectivity afterwards so you can test how multi-AZ workloads handle a zone-level outage.
keywords:
  - chaos engineering
  - aws az blackhole
  - aws fault
  - availability zone outage
  - network chaos
tags:
  - chaos-engineering
  - aws-faults
  - network-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AZ blackhole is an AWS chaos fault that simulates an Availability Zone outage by isolating network traffic in the AZs listed in `AVAILABILITY_ZONES` (optionally restricted to specific VPCs in `VPC_IDS`, subnets in `SUBNET_IDS`, or subnets matching `SUBNET_TAG`) within `REGION` for `TOTAL_CHAOS_DURATION` seconds, then restores network access. The fault modifies network ACLs on the target subnets so that traffic in and out of the zone is blocked.

Use this fault to test how a multi-AZ workload handles a zone-level outage: whether load balancers shift traffic to healthy zones, whether stateful workloads (EBS, RDS, OpenSearch, ElastiCache) survive a single-AZ failure, whether monitoring detects the outage within the SLA, and whether downstream consumers degrade gracefully under partial regional failure.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Multi-AZ failover:** When an AZ goes dark, do Application Load Balancers / Network Load Balancers shift traffic to remaining zones cleanly?
- **Stateful service tolerance:** Do RDS Multi-AZ, ElastiCache, OpenSearch, MSK survive a single-AZ blackhole without data loss?
- **Auto Scaling behaviour:** Do Auto Scaling groups detect unhealthy instances in the blackholed zone and launch replacements in healthy zones?
- **Monitoring fidelity:** Do CloudWatch alarms on per-AZ health, target group health, and end-to-end p99 fire within the SLA?
- **Disaster recovery rehearsal:** Validate that DR runbooks and AZ-failover automation work end to end.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target VPC and subnets:** The subnets selected by `VPC_IDS`, `SUBNET_IDS`, or `SUBNET_TAG` exist in `REGION` and span the AZs listed in `AVAILABILITY_ZONES`.
- **Workload deployed across multiple AZs:** To observe a meaningful response, the workload under test should span more than one AZ.
- **Scope control:** Use `VPC_IDS` / `SUBNET_IDS` / `SUBNET_TAG` to limit the blast radius. Without any of those filters, every subnet in the affected AZ is blackholed (every workload in the account that lives in those subnets is affected).
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

:::caution Wide blast radius
AZ blackhole is one of the highest-impact AWS faults. Run it first in a non-production account or staging VPC, and always scope it with `VPC_IDS`, `SUBNET_IDS`, or `SUBNET_TAG` before running it in production.
:::

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS VPCs in any commercial region | Supported |
| Workloads using EC2, EKS, ECS, RDS, ElastiCache, OpenSearch, Lambda (in VPC) | Supported |
| AWS Outposts, AWS Wavelength, Local Zones | Not supported |

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
        "ec2:DescribeVpcs",
        "ec2:DescribeSubnets",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeNetworkAcls",
        "ec2:CreateNetworkAcl",
        "ec2:CreateNetworkAclEntry",
        "ec2:DeleteNetworkAcl",
        "ec2:DeleteNetworkAclEntry",
        "ec2:ReplaceNetworkAclAssociation",
        "ec2:CreateTags"
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

---

## Fault tunables

Configure the following fault parameters when you add AZ blackhole to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AVAILABILITY_ZONES` | Comma-separated list of AZs to blackhole (for example `us-east-1a,us-east-1b`). | (required) |
| `REGION` | AWS region containing the AZs. | (required) |

**Scope filters (one or more strongly recommended)**

| Tunable | Description | Default |
| --- | --- | --- |
| `VPC_IDS` | Comma-separated list of VPC IDs to limit the scope. | `""` |
| `SUBNET_IDS` | Comma-separated list of subnet IDs to limit the scope. | `""` |
| `SUBNET_TAG` | Tag (`key=value`) to filter target subnets. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `60` |
| `SEQUENCE` | Order in which multiple targets are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Discovers the subnets in `AVAILABILITY_ZONES` that match `VPC_IDS` / `SUBNET_IDS` / `SUBNET_TAG`, captures the current network ACL association for each subnet, swaps them to a deny-all ACL, waits for `TOTAL_CHAOS_DURATION` seconds, then restores the original ACL associations.

---

## Expected behavior during fault execution

- Resources in the targeted subnets can no longer send or receive traffic across the affected boundaries.
- Load balancers mark targets in the affected zone unhealthy and stop routing to them.
- Cross-AZ database replication (RDS Multi-AZ, ElastiCache, OpenSearch) may fail over to a healthy zone.
- Per-AZ CloudWatch metrics for ELB, EC2, RDS show degradation in the affected zone while healthy zones absorb traffic.

:::info When the fault ends
The chaos pod restores the original network ACL associations on every subnet it touched. Connectivity returns to baseline within seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Per-AZ target health:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on per-AZ ALB target health metrics.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint and assert it stays inside the SLO during failover.
- **Database failover:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs a simple read/write against your DB primary.

---

## Verify the fault execution effect

While the experiment is running, confirm the blackhole is active and then restored:

1. **Inspect the network ACL association.**

   ```bash
   aws ec2 describe-network-acls \
     --region <region> \
     --filters Name=association.subnet-id,Values=<subnet-id>
   ```

   During the chaos window, the subnet is associated with a deny-all ACL created by the fault; after recovery it returns to the original ACL.

2. **Test connectivity from inside the zone.**

   ```bash
   ssh ec2-user@<instance-in-az> "curl -s -o /dev/null -w '%{http_code}' https://www.example.com"
   ```

   The request should fail (timeout or refused) during the chaos window and succeed afterwards.

3. **Check ELB target health.**

   ```bash
   aws elbv2 describe-target-health \
     --target-group-arn <arn> \
     --region <region>
   ```

   Targets in the blackholed zone should be `unhealthy` during the chaos window.

---

## Recovery and cleanup

- **End of duration:** The chaos pod restores the original network ACL associations and deletes the temporary deny-all ACLs it created.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, use `aws ec2 replace-network-acl-association --association-id <id> --network-acl-id <original-id>` on each affected subnet (recorded in the chaos pod logs), then delete the temporary deny-all ACLs.
- **Workload recovery:** Load balancers and DNS health checks typically reflect recovery within seconds; in-flight connection failures continue until clients retry.

---

## Limitations

- **NACL-based:** The fault uses network ACLs at the subnet boundary; it does not affect intra-subnet (host-to-host) traffic if hosts share a subnet. To block intra-subnet traffic, use a security-group-based fault like [resource access restrict](/docs/chaos-engineering/faults/chaos-faults/aws/resource-access-restrict).
- **NACL quota:** Each VPC has a soft quota of 200 network ACLs. Large blast radii may need a quota increase.
- **Account-wide if unscoped:** Without `VPC_IDS` / `SUBNET_IDS` / `SUBNET_TAG`, every subnet in the affected AZ in the account is blackholed. Always scope before running in shared accounts.
- **No multi-region:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="AZ blackhole fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 networking permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeSubnets, ec2:DescribeNetworkAcls, ec2:CreateNetworkAcl, ec2:CreateNetworkAclEntry, ec2:DeleteNetworkAcl, ec2:DeleteNetworkAclEntry, and ec2:ReplaceNetworkAclAssociation."
/>

<Troubleshoot
  issue="No subnets selected by VPC_IDS / SUBNET_IDS / SUBNET_TAG"
  mode="docs"
  fallback="The fault aborts when its scope filters resolve to zero subnets. List subnets with 'aws ec2 describe-subnets --filters Name=vpc-id,Values=<id> Name=availability-zone,Values=<az>' and confirm at least one subnet matches the scope filters."
/>

<Troubleshoot
  issue="Workload remains reachable in the blackholed zone"
  mode="docs"
  fallback="If hosts in the affected zone communicate over a different VPC, AWS PrivateLink, Transit Gateway attachment, or Direct Connect that bypasses the affected subnet boundary, those paths are not blocked by the NACL. Confirm where the traffic flows by inspecting the routes, and re-run the fault with the appropriate scope filters."
/>

<Troubleshoot
  issue="ACLs not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, subnets may remain associated with the temporary deny-all ACL. Run 'aws ec2 describe-network-acls --filters Name=association.subnet-id,Values=<subnet-id>' to inspect; use 'aws ec2 replace-network-acl-association --association-id <id> --network-acl-id <original-id>' to restore the original association recorded in the chaos pod logs, then delete the temporary ACLs."
/>

---

## Related faults

- [Resource access restrict](/docs/chaos-engineering/faults/chaos-faults/aws/resource-access-restrict): Block traffic at the security group level instead of NACL.
- [VPC route misconfiguration](/docs/chaos-engineering/faults/chaos-faults/aws/vpc-route-misconfiguration): Simulate a routing misconfiguration in the VPC.
- [EC2 stop by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-tag): Take down a subset of EC2 instances instead of an entire zone.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
