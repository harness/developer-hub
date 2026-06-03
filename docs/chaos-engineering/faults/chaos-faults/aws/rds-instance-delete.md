---
id: rds-instance-delete
title: RDS instance delete
sidebar_label: RDS Instance Delete
description: Delete a target RDS DB instance so you can test how applications behave when a database disappears permanently and how disaster-recovery procedures handle the loss.
keywords:
  - chaos engineering
  - rds instance delete
  - aws fault
  - rds chaos
  - disaster recovery
tags:
  - chaos-engineering
  - aws-faults
  - rds-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/rds-instance-delete
  - /docs/chaos-engineering/chaos-faults/aws/rds-instance-delete
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

RDS instance delete is an AWS chaos fault that deletes a target RDS DB instance. The fault calls AWS RDS APIs directly; no agent on the instance is required.

Use this fault to test how applications behave when a database disappears permanently: do they surface a clean error, do they fall back to a cached read path, does the runbook for "primary deleted" actually work end to end, does the disaster-recovery procedure restore service in the expected time?

:::danger Destructive fault
This fault permanently deletes the target DB instance. Data on the instance is removed (subject to your snapshot configuration on the DB instance). Restoration must come from a snapshot or your DR procedure. Run this fault only in non-production or in production drills where the recovery procedure is well rehearsed and audited.
:::

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **DR rehearsal:** Validate the runbook for restoring a deleted DB instance from snapshot — can your team complete it within the documented RTO?
- **Replica promotion:** When the primary disappears, does the read replica promote cleanly?
- **Application error handling:** When the database is gone, does the application surface a clean error, fall back to a degraded read path, or crash?
- **Detection coverage:** Does monitoring detect the deletion within the expected window, and does the alert text point at the right runbook?
- **Disaster-recovery automation:** Does any automated recovery (Lambda triggered by `DBInstanceDeleted` events) work as designed?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target identified:** Either `RDS_INSTANCE_IDENTIFIER` (single instance) or `CLUSTER_NAME` (every instance in the cluster) is set.
- **DB instance is in available state:** The instance is `available` when the fault starts.
- **Deletion is allowed:** The DB instance does not have `deletion-protection-enabled` (the fault cannot delete a protected instance).
- **Recovery plan in place:** You have a tested snapshot-restore procedure or replica promotion procedure for the target instance.
- **AWS credentials available:** Either an AWS credentials file uploaded as a **File Secret in Harness Secret Manager** (see Authentication below) or IRSA on the chaos infrastructure service account.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon RDS (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server) | Supported |
| Amazon Aurora (MySQL and PostgreSQL compatible) | Supported (use `CLUSTER_NAME` to target every instance in the cluster) |
| Read replicas | Supported as targets |
| DB instances with deletion protection enabled | Not supported (the fault errors out cleanly) |
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
        "rds:DeleteDBInstance",
        "rds:DescribeDBInstances",
        "rds:DescribeDBClusters"
      ],
      "Resource": "*"
    }
  ]
}
```

- `rds:DeleteDBInstance` drives the fault.
- `rds:DescribeDBInstances` confirms the target before the delete and tracks state transitions.
- `rds:DescribeDBClusters` resolves `CLUSTER_NAME` to a list of member instances.

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
| `INSTANCE_AFFECTED_PERC` | Percentage of cluster member instances to delete (only with `CLUSTER_NAME`). `0` targets one instance. | `0` |
| `TOTAL_CHAOS_DURATION` | Duration of the fault in seconds. The chaos pod waits this long for the deletion to complete. | `30` |
| `CHAOS_INTERVAL` | Time interval between successive delete iterations (in seconds). | `30` |
| `DEFAULT_HEALTH_CHECK` | When `true`, the fault performs default health checks after the delete. | `false` |
| `SEQUENCE` | Order in which multiple instances are deleted: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `ASSUME_ROLE_ARN` | ARN of an IAM role to assume on top of the base credentials. | `""` |
| `AWS_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the AWS credentials file. Not required when using IRSA. | `""` |

:::danger No automatic restore
This fault does not restore the deleted instance. Recovery is your team's responsibility (restore from snapshot, promote replica, run DR runbook). Verify your recovery procedure works end to end before running this fault.
:::

---

## Fault execution in brief

Calls `DeleteDBInstance` against `RDS_INSTANCE_IDENTIFIER` (or every instance in `CLUSTER_NAME` filtered to `INSTANCE_AFFECTED_PERC`), then polls `DescribeDBInstances` until the target reports `deleted` (or disappears) or `TOTAL_CHAOS_DURATION` is reached.

---

## Expected behavior during fault execution

- The target DB instance transitions through `deleting` to gone within minutes.
- All active connections to the instance are dropped; the endpoint stops resolving.
- Applications see "connection refused", "host not found", or engine-specific errors on their next query.
- Read replicas of the deleted instance are promoted to standalone or also deleted, depending on cluster topology and AWS defaults.
- A final snapshot is taken if your DB instance is configured to do so (default behaviour for non-cluster RDS deletes).

:::info When the fault ends
The chaos pod stops polling once the instance is deleted. The instance does not reappear; recovery is via snapshot restore, replica promotion, or your DR procedure.
:::

### Signals to watch

- **DB instance state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `aws rds describe-db-instances --db-instance-identifier <id>` and assert on `deleting` then deletion of the record entirely.
- **Application error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) against an endpoint that uses the database to detect downtime.
- **CloudWatch alerts:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on your CloudWatch DB alarms to confirm they fire within the expected window.

---

## Verify the fault execution effect

While the experiment is running:

1. **Watch the DB instance state.**

   ```bash
   aws rds describe-db-instances \
     --region <region> \
     --db-instance-identifier <id> \
     --query "DBInstances[0].[DBInstanceStatus]"
   ```

   The status should be `deleting`, then the describe call should return `DBInstanceNotFound`.

2. **Confirm final snapshot was created (if your instance is configured to do so).**

   ```bash
   aws rds describe-db-snapshots \
     --region <region> \
     --db-instance-identifier <id> \
     --snapshot-type manual
   ```

---

## Recovery and cleanup

Recovery is not automatic. Pick one of:

- **Restore from final snapshot:** `aws rds restore-db-instance-from-db-snapshot --db-instance-identifier <new-id> --db-snapshot-identifier <snapshot-id>`. The restored instance has a new endpoint; update application config (or DNS CNAME) to point at it.
- **Restore from latest automated backup:** `aws rds restore-db-instance-to-point-in-time` using the most recent restorable time.
- **Promote a read replica:** `aws rds promote-read-replica --db-instance-identifier <replica-id>` if a replica was running.
- **Aurora cluster recovery:** For Aurora clusters, the cluster survives instance deletion as long as at least one member remains; replace deleted instances with `create-db-instance` referencing the cluster.

---

## Limitations

- **Deletion is irreversible:** Once `DeleteDBInstance` succeeds, the instance is gone. The fault provides no rollback.
- **Deletion protection blocks the fault:** Instances with `deletion-protection-enabled` reject the delete call. Disable it before the fault (and re-enable after).
- **Snapshot timing:** Final snapshot creation extends the deletion window; very large instances may take 30+ minutes to fully delete.
- **No payload control:** The fault deletes the instance; it does not corrupt data, simulate disk failure, or simulate partial outages. Use `rds-instance-reboot` for less destructive failures.
- **Endpoint reuse:** A new restored instance has a different endpoint unless you use Aurora's cluster endpoint or a CNAME you control.

---

## Troubleshooting

<Troubleshoot
  issue="RDS instance delete experiment fails with InvalidDBInstanceState"
  mode="docs"
  fallback="The DB instance is not in 'available' state (it may be 'modifying', 'rebooting', or already 'deleting'). Confirm with aws rds describe-db-instances --db-instance-identifier <id> --query 'DBInstances[0].DBInstanceStatus' and wait for the instance to reach 'available' before re-running."
/>

<Troubleshoot
  issue="RDS instance delete experiment fails with InvalidParameterCombination about deletion protection"
  mode="docs"
  fallback="The target instance has deletion-protection-enabled set to true. AWS does not allow DeleteDBInstance on protected instances. Disable deletion protection before the experiment with aws rds modify-db-instance --db-instance-identifier <id> --no-deletion-protection --apply-immediately, run the fault, then re-enable protection after recovery."
/>

<Troubleshoot
  issue="RDS instance delete succeeded but I cannot find a final snapshot to restore from"
  mode="docs"
  fallback="The instance was deleted with skip-final-snapshot, or no snapshot was configured. Check your DB instance's deletion behavior with aws rds describe-db-instances before the experiment. For future runs, ensure final snapshots are enabled. If automated backups exist within the retention window, restore via point-in-time recovery instead."
/>

---

## Related faults

- [RDS instance reboot](/docs/chaos-engineering/faults/chaos-faults/aws/rds-instance-reboot): Reboot the instance instead of deleting it.
- [EC2 stop by ID](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id): Stop a self-managed database EC2 instance instead of an RDS instance.
- [Common AWS fault tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables): Shared environment variables for AWS faults.
