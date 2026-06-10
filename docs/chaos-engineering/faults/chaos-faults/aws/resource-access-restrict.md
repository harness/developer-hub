---
id: resource-access-restrict
title: Resource access restrict
sidebar_label: Resource Access Restrict
description: Temporarily strip ingress or egress rules from one or more AWS security groups for a configurable duration and restore them afterwards so you can test how the workload behaves when network access to (or from) an AWS resource disappears.
keywords:
  - chaos engineering
  - resource access restrict
  - aws fault
  - network chaos
  - security group
tags:
  - chaos-engineering
  - aws-faults
  - network-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/resource-access-restrict
  - /docs/chaos-engineering/chaos-faults/aws/resource-access-restrict
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Resource access restrict is an AWS chaos fault that removes the ingress or egress rules (selected by `RULE_TYPE`) from the security groups listed in `SECURITY_GROUP_IDS` within `REGION` for `TOTAL_CHAOS_DURATION` seconds, then reinstalls the original rules. While the rules are removed, every resource that uses one of the targeted security groups loses the corresponding inbound or outbound network access.

Use this fault to test how a workload behaves when network access to (or from) an AWS resource disappears: whether the workload fails fast with a clear error, whether monitoring detects the connectivity loss, whether retries amplify the load, and whether downstream consumers degrade gracefully under partial network failure.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Outbound dependency outage:** When `RULE_TYPE=outbound`, can workloads still reach internal services through other paths, or do they fail clean?
- **Inbound traffic block:** When `RULE_TYPE=inbound`, do load balancers detect unhealthy targets and shift traffic?
- **Multi-AZ resilience:** Do redundant resources in other AZs absorb the additional load while the affected security group is restricted?
- **Monitoring fidelity:** Do CloudWatch alarms on connection errors, target health, or application-level errors fire within the SLA?
- **Recovery:** When the rules are reinstalled, do new connections succeed without manual intervention?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target security groups:** Every ID in `SECURITY_GROUP_IDS` exists in `REGION`.
- **Resources attached:** The targeted security groups are attached to at least one resource (EC2, RDS, ELB target, Lambda ENI, ECS task, EKS node) so that the rule changes have visible effect.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

:::caution Wide blast radius
A single security group can be attached to many resources. Resource access restrict affects every resource that uses the security group, not just one EC2 instance or one ENI. Always confirm the attached resources with `aws ec2 describe-network-interfaces --filters Name=group-id,Values=<sg>` before running in production.
:::

---

## Supported environments

| Platform | Support status |
| --- | --- |
| EC2, RDS, ELB, Lambda (in VPC), ECS, EKS workloads using security groups | Supported |
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
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSecurityGroupRules",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:AuthorizeSecurityGroupEgress",
        "ec2:RevokeSecurityGroupIngress",
        "ec2:RevokeSecurityGroupEgress"
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

Configure the following fault parameters when you add Resource access restrict to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SECURITY_GROUP_IDS` | Comma-separated list of security group IDs to modify. | (required) |
| `REGION` | AWS region where the security groups exist. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RULE_TYPE` | Direction of rules to restrict: `inbound` (revoke ingress rules) or `outbound` (revoke egress rules). | `outbound` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple security groups are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Captures the current ingress or egress rules (per `RULE_TYPE`) for each security group in `SECURITY_GROUP_IDS`, revokes them, waits for `TOTAL_CHAOS_DURATION` seconds, then reauthorizes the original rules.

---

## Expected behavior during fault execution

- New network connections in the restricted direction fail (the resource no longer has permission to send or receive on the affected ports).
- Existing connections that were established before the rule removal may continue (security group rules are evaluated on connection establishment for TCP).
- Load balancer health checks against affected targets may start failing.
- Application-level error metrics rise for code paths that depend on the restricted connectivity.

:::info When the fault ends
The chaos pod reauthorizes every revoked rule. New connections succeed; the workload converges back to baseline.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint.
- **Target health:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on per-target health metrics.
- **Application errors:** Use a Prometheus probe on your application-level error counter.

---

## Verify the fault execution effect

While the experiment is running, confirm the rules are revoked and then reauthorized:

1. **Inspect security group rules.**

   ```bash
   aws ec2 describe-security-groups \
     --region <region> \
     --group-ids <sg-id> \
     --query "SecurityGroups[0].{Ingress:IpPermissions,Egress:IpPermissionsEgress}"
   ```

   During the chaos window, the direction selected by `RULE_TYPE` should be empty; after recovery, the original rules should reappear.

2. **Test connectivity from an attached resource.**

   ```bash
   ssh ec2-user@<instance> "curl -m 5 -s -o /dev/null -w '%{http_code}' https://<destination>"
   ```

   The request should fail (timeout or refused) during the chaos window and succeed afterwards.

---

## Recovery and cleanup

- **End of duration:** The chaos pod reauthorizes every revoked rule.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the reauthorize call.
- **Manual recovery:** If the fault exits before restore, run `aws ec2 authorize-security-group-ingress --group-id <sg> --ip-permissions ...` (or `authorize-security-group-egress`) with the original rule set recorded in the chaos pod logs.
- **Workload recovery:** TCP connections that were established before the rule removal continue; new connections succeed as soon as the rules are reauthorized.

---

## Limitations

- **Established TCP connections:** Existing connections may not be terminated when a rule is revoked; the impact lands on new connections.
- **Cross-account targeting:** Use `ASSUME_ROLE_ARN` to target a security group in a different account.
- **Both directions:** A single experiment targets one direction (per `RULE_TYPE`). Chain experiments for both directions.
- **Rule encoding edge cases:** Highly complex rules (large IP set lists, prefix-list-based rules) are captured and restored verbatim; manual rule changes during the chaos window are overwritten on restore.
- **No multi-region:** A single experiment targets one region (the value of `REGION`).

---

## Troubleshooting

<Troubleshoot
  issue="Resource access restrict fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 security group permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeSecurityGroups, ec2:AuthorizeSecurityGroupIngress, ec2:AuthorizeSecurityGroupEgress, ec2:RevokeSecurityGroupIngress, and ec2:RevokeSecurityGroupEgress."
/>

<Troubleshoot
  issue="No rules removed even though the security group had rules"
  mode="docs"
  fallback="Confirm that RULE_TYPE matches the direction that actually has rules. The default (outbound) only removes egress rules; if your security group only has ingress rules, set RULE_TYPE to inbound. Use 'aws ec2 describe-security-groups --group-ids <sg-id>' to inspect both directions before running the experiment."
/>

<Troubleshoot
  issue="Workload still has connectivity after the rules are revoked"
  mode="docs"
  fallback="The resource may have multiple security groups; another security group attached to the same ENI can still permit the connection. List the ENIs and security groups with 'aws ec2 describe-network-interfaces --filters Name=group-id,Values=<sg>' and include every relevant security group in SECURITY_GROUP_IDS."
/>

<Troubleshoot
  issue="Rules not reauthorized after the chaos window"
  mode="docs"
  fallback="If the reauthorize call failed, the security group may stay with empty rules. Recreate the original rules with 'aws ec2 authorize-security-group-ingress --group-id <sg> --ip-permissions ...' (or authorize-security-group-egress) using the original rule set recorded in the chaos pod logs."
/>

---

## Related faults

- [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole): Blackhole an entire Availability Zone at the subnet boundary.
- [VPC route misconfiguration](/docs/chaos-engineering/faults/chaos-faults/aws/vpc-route-misconfiguration): Remove specific routes from a VPC route table.
- [EC2 network latency](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-network-latency): Add latency between an EC2 instance and a destination instead of removing access.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
