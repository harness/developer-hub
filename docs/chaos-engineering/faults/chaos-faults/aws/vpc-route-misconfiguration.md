---
id: vpc-route-misconfiguration
title: VPC route misconfiguration
sidebar_label: VPC Route Misconfiguration
description: Temporarily remove specified CIDR routes from one or more VPC route tables for a configurable duration and restore them afterwards so you can test how the workload behaves when egress to a Transit Gateway, NAT Gateway, VPC peer, or internet gateway disappears.
keywords:
  - chaos engineering
  - vpc route misconfiguration
  - aws fault
  - network chaos
tags:
  - chaos-engineering
  - aws-faults
  - network-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

VPC route misconfiguration is an AWS chaos fault that removes one or more CIDR routes (listed in `TARGET_ROUTE_CIDRS`) from the route tables associated with the target VPC (`VPC_ID` in `REGION`), optionally restricted to the route table IDs in `TARGET_ROUTE_TABLE_IDS` or tagged with `TARGET_ROUTE_TABLE_TAG`, for `TOTAL_CHAOS_DURATION` seconds. Local routes are always left untouched. After the chaos window the original routes are reinstalled.

Use this fault to test how a workload behaves when egress to a specific CIDR (a Transit Gateway, NAT Gateway, VPC peer, internet gateway, or internal service network) disappears: whether the workload fails fast with a clear error, whether retries amplify load, whether monitoring detects the routing change, and whether downstream consumers degrade gracefully under a partial network partition.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Misconfigured route changes:** Detect blast radius of a future change to a VPC route table before it is rolled out.
- **Connectivity loss to TGW / NATGW / peer:** When the route to a critical CIDR disappears, do workloads fail fast with a clear error?
- **Monitoring fidelity:** Do CloudWatch alarms on NAT bytes, TGW packet drops, or application-level errors fire within the SLA?
- **Retry storms:** Do retries amplify failure when egress is broken?
- **Recovery:** When the route is reinstalled, do existing connections recover automatically?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **Target VPC and routes:** `VPC_ID` exists in `REGION`, and at least one route table in the VPC currently contains every CIDR in `TARGET_ROUTE_CIDRS`.
- **Scope control:** Use `TARGET_ROUTE_TABLE_IDS` or `TARGET_ROUTE_TABLE_TAG` to limit which route tables are affected. Without those filters, every non-default route table that contains the CIDR is modified, scaled by `ROUTE_TABLE_AFFECTED_PERCENTAGE`.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or an IAM role for service accounts (IRSA) bound to the chaos infrastructure service account.
- **IAM permissions granted:** The credentials or role include the permissions listed below.

:::caution Wide blast radius
Removing a route used by many subnets affects every workload in those subnets. Always scope with `TARGET_ROUTE_TABLE_IDS` or `TARGET_ROUTE_TABLE_TAG` in shared accounts.
:::

---

## Supported environments

| Platform | Support status |
| --- | --- |
| AWS VPC route tables in any commercial region | Supported |
| Local routes | Not affected (the fault explicitly skips them) |
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
        "ec2:DescribeRouteTables",
        "ec2:CreateRoute",
        "ec2:DeleteRoute",
        "ec2:ReplaceRoute",
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

Configure the following fault parameters when you add VPC route misconfiguration to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `VPC_ID` | ID of the target VPC. | (required) |
| `REGION` | AWS region where the VPC is deployed. | (required) |
| `TARGET_ROUTE_CIDRS` | Comma-separated list of destination CIDRs to remove from the route tables (for example `10.20.0.0/16,0.0.0.0/0`). Local routes are skipped automatically. | (required) |

**Scope filters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_ROUTE_TABLE_IDS` | Comma-separated list of route table IDs to target. Leave empty to consider every route table in the VPC. | `""` |
| `TARGET_ROUTE_TABLE_TAG` | Tag (`key=value`) to filter target route tables. | `""` |
| `ROUTE_TABLE_AFFECTED_PERCENTAGE` | Percentage of matching route tables to affect. | `100` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. | `60` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `60` |
| `SEQUENCE` | Order in which multiple route tables are processed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. Leave empty to use the base credentials directly. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Discovers route tables in `VPC_ID` that match the scope filters and contain any CIDR in `TARGET_ROUTE_CIDRS`, captures the existing route entries, deletes them, waits for `TOTAL_CHAOS_DURATION` seconds, then recreates the original routes with their original targets.

---

## Expected behavior during fault execution

- Workloads in subnets associated with the affected route tables can no longer reach destinations covered by the deleted CIDRs.
- Outbound calls to the affected CIDRs hang or fail (no route to host).
- NAT Gateway / Transit Gateway metrics for the affected destinations drop to zero; per-target health on dependent load balancers may degrade.
- Application-level error metrics rise for code paths that depend on the unreachable destinations.

:::info When the fault ends
The chaos pod recreates each deleted route with its original target (Transit Gateway, NAT Gateway, peering connection, internet gateway, instance, network interface). Connectivity resumes within seconds.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on the user-visible endpoint and assert it stays inside the SLO.
- **NAT/TGW bytes:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_natgateway_bytes_out_to_destination` or TGW packet drop metrics for the affected CIDR.
- **Application errors:** Use a Prometheus probe on your application-level error counter.

---

## Verify the fault execution effect

While the experiment is running, confirm the route is removed and then restored:

1. **Inspect the route table.**

   ```bash
   aws ec2 describe-route-tables \
     --region <region> \
     --route-table-ids <rtb-id> \
     --query "RouteTables[0].Routes"
   ```

   During the chaos window the CIDRs in `TARGET_ROUTE_CIDRS` should be missing; after recovery they should reappear with the original target.

2. **Test connectivity from an instance in a subnet associated with the route table.**

   ```bash
   ssh ec2-user@<instance> "curl -m 5 -s -o /dev/null -w '%{http_code}' https://<destination-in-cidr>"
   ```

   The request should fail (timeout) during the chaos window and succeed afterwards.

---

## Recovery and cleanup

- **End of duration:** The chaos pod recreates every deleted route with its original target.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the restore call.
- **Manual recovery:** If the fault exits before restore, use `aws ec2 create-route --route-table-id <rtb-id> --destination-cidr-block <cidr> --transit-gateway-id <tgw>` (or the appropriate `--nat-gateway-id`, `--vpc-peering-connection-id`, `--gateway-id`, `--network-interface-id`, `--instance-id`) using the original target recorded in the chaos pod logs.
- **Workload recovery:** TCP connections that were already established may break and need to be re-established by the application.

---

## Limitations

- **Local routes excluded:** The local CIDR (the VPC CIDR itself) is never removed; pass any non-local CIDR.
- **Single VPC per experiment:** Each run targets one `VPC_ID`. Chain experiments for multi-VPC scenarios.
- **No multi-region:** A single experiment targets one region (the value of `REGION`).
- **Route replacement edge cases:** If the route table was modified by another process during the chaos window, the restore reverts those external changes.
- **Cross-account targeting:** Use `ASSUME_ROLE_ARN` to target a VPC in a different account.

---

## Troubleshooting

<Troubleshoot
  issue="VPC route misconfiguration fails with AccessDeniedException in Harness Chaos Engineering"
  mode="docs"
  fallback="The credentials supplied to the chaos pod do not have the required EC2 routing permissions. Confirm the IAM policy attached to the user, role, or IRSA service account includes ec2:DescribeRouteTables, ec2:CreateRoute, ec2:DeleteRoute, and ec2:ReplaceRoute."
/>

<Troubleshoot
  issue="No matching routes were found"
  mode="docs"
  fallback="The fault aborts when no route table in the VPC contains any CIDR in TARGET_ROUTE_CIDRS. List the route tables with 'aws ec2 describe-route-tables --filters Name=vpc-id,Values=<vpc-id>' and confirm the CIDR exists; adjust scope filters (TARGET_ROUTE_TABLE_IDS, TARGET_ROUTE_TABLE_TAG, ROUTE_TABLE_AFFECTED_PERCENTAGE) accordingly."
/>

<Troubleshoot
  issue="Workload still has connectivity after the route is removed"
  mode="docs"
  fallback="Traffic may flow over a different path: a more specific route, a different VPC, a Transit Gateway, AWS PrivateLink, or a VPN. Use the AWS reachability analyzer or 'aws ec2 describe-route-tables' to see which route table actually serves the source subnet, and run the fault with the correct TARGET_ROUTE_TABLE_IDS."
/>

<Troubleshoot
  issue="Routes not restored after the chaos window"
  mode="docs"
  fallback="If the restore call failed, run 'aws ec2 create-route --route-table-id <id> --destination-cidr-block <cidr> --<target-type-flag> <target>' with the original target recorded in the chaos pod logs. Inspect the temporary ACL/route entries created by the fault and clean them up if necessary."
/>

---

## Related faults

- [AZ blackhole](/docs/chaos-engineering/faults/chaos-faults/aws/az-blackhole): Blackhole an entire Availability Zone instead of specific CIDRs.
- [Resource access restrict](/docs/chaos-engineering/faults/chaos-faults/aws/resource-access-restrict): Restrict network access at the security group level.
- [EC2 stop by tag](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-tag): Take down EC2 instances instead of removing routes.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
