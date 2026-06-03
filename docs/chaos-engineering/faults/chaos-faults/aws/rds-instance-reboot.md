---
id: rds-instance-reboot
title: RDS instance reboot
sidebar_label: RDS Instance Reboot
description: Reboot a target RDS DB instance (with optional Multi-AZ failover) for a configurable duration so you can test how applications behave when their database restarts.
keywords:
  - chaos engineering
  - rds instance reboot
  - aws fault
  - rds chaos
  - database failover
tags:
  - chaos-engineering
  - aws-faults
  - rds-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/rds-instance-reboot
  - /docs/chaos-engineering/chaos-faults/aws/rds-instance-reboot
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

RDS instance reboot is an AWS chaos fault that reboots a target RDS DB instance for a configurable duration. The reboot can be ordinary (in-place restart) or failover-triggering (Multi-AZ promotion of the standby). The fault calls AWS RDS APIs directly; no agent on the instance is required.

Use this fault to test how applications behave when their database restarts: do connection pools reconnect cleanly, do reads succeed on a replica, do writes resume after promotion, does the connection-string DNS resolve to the new endpoint, does monitoring fire the right alert?

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Connection-pool resilience:** When the DB instance reboots, does the application's connection pool reconnect cleanly, or does it serve stale connections that hang on first use?
- **Multi-AZ failover (with `FAILOVER=true`):** Does the standby promote within the expected window, and does the application's connection string resolve to the new endpoint?
- **Read-replica behaviour:** Do read replicas keep serving reads through the reboot, or do they fall behind on replication?
- **Write-path timeout:** When writes are blocked during reboot, does the application queue them, retry them, or fail them cleanly?
- **Observability:** Does monitoring fire one cohesive alert for the database reboot, or does it cascade into a noise storm?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target identified:** Either `RDS_INSTANCE_IDENTIFIER` (single instance) or `CLUSTER_NAME` (every instance in the cluster) is set.
- **DB instance is available:** The instance is in `available` state when the fault starts.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon RDS (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server) | Supported |
| Amazon Aurora (MySQL and PostgreSQL compatible) | Supported (use `CLUSTER_NAME` to target every instance in the cluster) |
| Multi-AZ deployments | Supported (set `FAILOVER=true` to force a failover during reboot) |
| Single-AZ deployments | Supported (in-place restart only; `FAILOVER=true` is ignored) |
| Read replicas | Supported as targets (`RDS_INSTANCE_IDENTIFIER`) |
| Custom engines / on-cluster databases | Not supported |

---

## Permissions required

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:RebootDBInstance",
        "rds:DescribeDBInstances",
        "rds:DescribeDBClusters"
      ],
      "Resource": "*"
    }
  ]
}
```

- `rds:RebootDBInstance` drives the fault.
- `rds:DescribeDBInstances` confirms the target reaches `available` again after the reboot.
- `rds:DescribeDBClusters` resolves `CLUSTER_NAME` to a list of member instances when targeting an Aurora cluster.

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
| `REGION` | AWS region that hosts the target RDS instance or cluster (for example `us-east-1`). | (required) |
| `RDS_INSTANCE_IDENTIFIER` *or* `CLUSTER_NAME` | One of these must be set. `RDS_INSTANCE_IDENTIFIER` targets a specific DB instance; `CLUSTER_NAME` targets every instance in an Aurora cluster. | `""` |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `FAILOVER` | When `true` and the target is Multi-AZ, the reboot forces a failover to the standby. Ignored on single-AZ instances. | `false` |
| `INSTANCE_AFFECTED_PERC` | Percentage of cluster member instances to reboot (only with `CLUSTER_NAME`). | `100` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The chaos pod waits this long for the instance(s) to reach `available` again. | `30` |
| `CHAOS_INTERVAL` | Time interval between successive reboot iterations (in seconds). | `30` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault performs default health checks against the instance(s) after the reboot. | `false` |
| `SEQUENCE` | Order in which multiple instances are rebooted: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::tip Use FAILOVER deliberately
`FAILOVER=true` exercises the Multi-AZ failover path including DNS cutover. `FAILOVER=false` reboots in place and is faster but exercises a different recovery path. Run both to validate full coverage.
:::

---

## Fault execution in brief

Calls `RebootDBInstance` against `RDS_INSTANCE_IDENTIFIER` (or every instance in `CLUSTER_NAME` filtered to `INSTANCE_AFFECTED_PERC`) with `ForceFailover` set to the value of `FAILOVER`, then polls `DescribeDBInstances` until the target reaches `available` again or `TOTAL_CHAOS_DURATION` is reached.

---

## Expected behavior during fault execution

- The target instance transitions through `rebooting` → `available` (for in-place reboot) or `rebooting` → `failing-over` → `available` (for Multi-AZ failover).
- Active database connections are dropped; applications see "connection reset" or "lost connection" errors.
- For Multi-AZ failover with `FAILOVER=true`, the cluster endpoint DNS is updated to point at the new primary; cached connections need to be refreshed.
- Writes are unavailable during the reboot window (typically 30 seconds to a few minutes depending on engine and instance size).
- Reads continue working on read replicas (if any), but replicas may briefly fall behind on replication.

:::info When the fault ends
The chaos pod stops polling once the instance reports `available`. Connection pools that closed during the reboot must be re-established by the application.
:::

### Signals to watch

- **DB instance status:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `aws rds describe-db-instances --db-instance-identifier <id>` to track `DBInstanceStatus`.
- **CloudWatch DB metrics:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `aws_rds_database_connections_average` to confirm connections drop to zero and recover.
- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint that uses the database to detect downtime and measure recovery time.

---

## Verify the fault execution effect

While the experiment is running:

1. **Check DB instance status.**

   ```bash
   aws rds describe-db-instances \
     --region <region> \
     --db-instance-identifier <id> \
     --query "DBInstances[0].[DBInstanceStatus,Endpoint.Address]"
   ```

   Status should be `rebooting` (or `failing-over` with FAILOVER), then `available`.

2. **For Multi-AZ failover, confirm AZ switched.**

   ```bash
   aws rds describe-db-instances \
     --region <region> \
     --db-instance-identifier <id> \
     --query "DBInstances[0].[AvailabilityZone,SecondaryAvailabilityZone]"
   ```

---

## Recovery and cleanup

- **End of duration:** The chaos pod stops polling once the instance is back to `available`.
- **Abort the experiment:** Stopping the experiment from Chaos Studio stops polling; AWS still completes any in-flight reboot.
- **Manual recovery:** If the instance is stuck in `rebooting` beyond the normal window, contact AWS Support; you cannot cancel a reboot once it has been issued.

---

## Limitations

- **Reboot cannot be cancelled:** Once `RebootDBInstance` is accepted, AWS proceeds. The fault cannot abort it mid-reboot.
- **Multi-AZ failover is only available on Multi-AZ deployments:** `FAILOVER=true` is silently ignored on single-AZ instances.
- **DNS TTL after failover:** The RDS endpoint's DNS TTL determines how quickly clients see the new primary. Long TTLs delay failover.
- **Write availability:** Writes are unavailable for the duration of the reboot; the fault does not provide a write-availability surrogate.
- **Cluster targeting limitations:** When using `CLUSTER_NAME`, `INSTANCE_AFFECTED_PERC` controls how many writer/reader instances reboot, but a cluster only has one writer; targeting the writer always disrupts writes.

---

## Troubleshooting

<Troubleshoot
  issue="RDS instance reboot experiment fails with InvalidDBInstanceState"
  mode="docs"
  fallback="The DB instance is not in 'available' state when the fault starts (it may be 'modifying', 'rebooting', or 'creating'). Confirm with aws rds describe-db-instances --db-instance-identifier <id> --query 'DBInstances[0].DBInstanceStatus' and wait for the instance to reach 'available' before re-running."
/>

<Troubleshoot
  issue="RDS instance reboot completed but the application did not recover"
  mode="docs"
  fallback="The most common causes are: the application's connection pool is holding dead connections that need explicit eviction; the application's DNS cache is still pointing at the old endpoint after a Multi-AZ failover; or the application uses long-lived prepared statements that were invalidated by the reboot. Restart the application or trigger a pool reset; verify the application is resolving the current RDS endpoint."
/>

<Troubleshoot
  issue="RDS instance reboot with FAILOVER=true did not trigger a failover"
  mode="docs"
  fallback="The target is not a Multi-AZ deployment; AWS silently ignores ForceFailover for single-AZ instances. Confirm with aws rds describe-db-instances --db-instance-identifier <id> --query 'DBInstances[0].MultiAZ'. If false, convert the instance to Multi-AZ before re-running with FAILOVER=true."
/>

---

## Related faults

- [RDS instance delete](/docs/chaos-engineering/faults/chaos-faults/aws/rds-instance-delete): Delete the DB instance entirely instead of rebooting it.
- [EC2 stop by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id): Stop a self-managed database EC2 instance instead of an RDS instance.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
