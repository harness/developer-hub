---
id: gcp-sql-instance-failover
title: GCP SQL instance failover
sidebar_label: GCP SQL Instance Failover
description: Trigger a failover on a GCP Cloud SQL high-availability instance so you can test how the application behaves when the primary node fails over to its standby.
keywords:
  - chaos engineering
  - gcp sql instance failover
  - gcp fault
  - cloud sql
tags:
  - chaos-engineering
  - gcp-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/gcp/gcp-sql-instance-failover
- /docs/chaos-engineering/chaos-faults/gcp/gcp-sql-instance-failover
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

GCP SQL instance failover is a GCP chaos fault that triggers a failover on a managed Cloud SQL instance (`SQL_INSTANCE_NAME` in project `GCP_PROJECT_ID`). The fault calls the Cloud SQL `failover` API, which promotes the high-availability standby node to primary; the original primary becomes the new standby once the failover completes.

Use this fault to test how an application behaves when a Cloud SQL primary becomes unavailable and traffic shifts to the standby: whether application connection handling reconnects cleanly, whether transactions in flight surface clean errors, whether read/write split logic copes with the brief outage, and whether monitoring detects the failover within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Reconnect handling:** When the primary fails over, do application connection pools reconnect cleanly inside the SLA?
- **Transaction safety:** Do in-flight transactions surface clean rollback errors rather than data corruption?
- **Read/write split correctness:** If the application uses a proxy or read replicas, does it pause writes and resume cleanly when the new primary is healthy?
- **Failover budget:** Does the actual failover time (typically 30-90s for Cloud SQL HA) fit your application's SLO?
- **Monitoring fidelity:** Do alerts on Cloud SQL `replica/replica_lag`, `database/up`, and application connection errors fire within the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **HA Cloud SQL instance:** `SQL_INSTANCE_NAME` is a Cloud SQL instance configured for high availability (a standby exists in another zone). Non-HA instances are not eligible for failover.
- **Instance is `RUNNABLE`:** A failover cannot start on an instance that is `MAINTENANCE`, `STOPPED`, or `FAILED`.
- **GCP credentials available:** Either a Google service account JSON key uploaded as a **File Secret in Harness Secret Manager** (referenced via `GCP_AUTHENTICATION_SECRET`) or Workload Identity bound to the chaos infrastructure service account.
- **IAM permissions granted:** The service account includes the permissions listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Cloud SQL for MySQL (HA) | Supported |
| Cloud SQL for PostgreSQL (HA) | Supported |
| Cloud SQL for SQL Server (HA) | Supported |
| Cloud SQL without HA | Not supported (no standby to fail over to) |
| Cloud SQL read replicas | Supported only when configured for HA failover (use the primary's `SQL_INSTANCE_NAME`) |

---

## Permissions required

The Google service account used by the chaos pod needs the following IAM permissions on the target project.

```json
{
  "permissions": [
    "cloudsql.instances.get",
    "cloudsql.instances.failover",
    "cloudsql.instances.list"
  ]
}
```

Granting the predefined role `roles/cloudsql.admin` covers these.

---

## Authentication

The fault supports two credential delivery models.

| Method | When to use it | How to configure |
| --- | --- | --- |
| Harness Secret Manager File Secret | Chaos infrastructure runs outside GKE, or you want explicit static credentials | Upload the GCP service account JSON key as a **File Secret** in Harness Secret Manager and reference its identifier via `GCP_AUTHENTICATION_SECRET` |
| Workload Identity | Chaos infrastructure runs on GKE with Workload Identity enabled | Bind a Google service account to the chaos infra Kubernetes service account; no tunable changes required |

Go to [Creating secrets for GCP experiments](/docs/chaos-engineering/faults/chaos-faults/gcp/security-configurations/prepare-secret-for-gcp) to read the secret format.

---

## Fault tunables

Configure the following fault parameters when you add GCP SQL instance failover to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `SQL_INSTANCE_NAME` | Name of the Cloud SQL instance to failover. | (required) |
| `GCP_PROJECT_ID` | ID of the GCP project that contains the Cloud SQL instance. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `GCP_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the GCP service account JSON key. Not required when using Workload Identity. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::info Failover is a single API call
This fault does not take a `TOTAL_CHAOS_DURATION`. It triggers the failover and reports completion when the Cloud SQL operation finishes. The actual outage duration depends on Cloud SQL's failover time (typically 30-90s).
:::

---

## Fault execution in brief

Calls the Cloud SQL `instances.failover` API on `SQL_INSTANCE_NAME` in `GCP_PROJECT_ID`, waits for the failover operation to reach the `DONE` state, and exits.

---

## Expected behavior during fault execution

- The primary Cloud SQL node enters a brief unavailable window (typically 30-90 seconds for HA failover).
- Application connections to the old primary are reset; new connections to the instance hostname route to the new primary once DNS/proxy updates.
- Transactions in flight at the time of failover are rolled back.
- Cloud SQL metrics show a brief drop in `database/up` and `database/network/connections` on the failing primary.
- After the failover completes, the standby becomes the new primary; the old primary becomes the new standby.

:::info When the fault ends
Cloud SQL marks the failover operation `DONE` once the new primary is serving. Application reconnection time depends on the connection pool's reconnect backoff.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Database availability:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on `cloudsql_database_up` and assert the gap is inside the SLA.
- **Application connection errors:** Use a Prometheus probe on the application's connection-error counter.
- **End-to-end availability:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a user-visible endpoint backed by the database.

---

## Verify the fault execution effect

1. **Inspect the failover operation.**

   ```bash
   gcloud sql operations list \
     --instance=<SQL_INSTANCE_NAME> \
     --filter="operationType=FAILOVER" \
     --limit=5
   ```

   The most recent operation should be `FAILOVER` with status `DONE`.

2. **Inspect Cloud SQL instance state.**

   ```bash
   gcloud sql instances describe <SQL_INSTANCE_NAME> \
     --format="value(state,settings.availabilityType)"
   ```

   The instance should be `RUNNABLE` with `REGIONAL` availability after the failover.

3. **Inspect Cloud Monitoring.**

   Use the Cloud Console to confirm `cloudsql.googleapis.com/database/up` briefly dropped during the failover window.

---

## Recovery and cleanup

- **Automatic:** Cloud SQL completes the failover automatically; no manual cleanup is required.
- **Application recovery:** Reconnect time depends on the application's connection-pool retry/backoff policy.
- **Re-balance:** If you want the original primary to return to the primary role, run another failover (Cloud SQL alternates which zone is primary on each failover).

---

## Limitations

- **HA only:** Non-HA Cloud SQL instances are not supported.
- **One instance per run:** Each fault run targets one `SQL_INSTANCE_NAME`.
- **No duration tunable:** The fault is event-based; the outage duration is driven by Cloud SQL, not by `TOTAL_CHAOS_DURATION`.
- **Concurrent failovers blocked:** Cloud SQL queues subsequent failover requests; spacing them by at least 5 minutes is recommended.
- **Cross-region replicas:** Cross-region read replicas continue to operate independently and replicate from the new primary.

---

## Troubleshooting

<Troubleshoot
  issue="GCP SQL instance failover fails with FAILED_PRECONDITION in Harness Chaos Engineering"
  mode="docs"
  fallback="The Cloud SQL instance must be configured for high availability (availabilityType=REGIONAL) and in state RUNNABLE. Verify with gcloud sql instances describe <name> --format='value(state,settings.availabilityType)'."
/>

<Troubleshoot
  issue="GCP SQL instance failover fails with PermissionDenied"
  mode="docs"
  fallback="The service account used by the chaos pod is missing cloudsql.instances.failover. Grant roles/cloudsql.admin on the target project."
/>

<Troubleshoot
  issue="Application connections did not recover after the failover"
  mode="docs"
  fallback="Most connection pools need a sane reconnect/backoff policy. Verify the pool: tcpKeepalive, validateOnReturn, maxLifetime should all be set. For JDBC/Postgres, ensure tcpKeepAlive=true and the driver's reconnect logic is enabled."
/>

---

## Related faults

- [GCP VM instance stop](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop): Stop the VM hosting the application instead of the database.
- [GCP VM disk loss](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-disk-loss): Detach disks instead of failing over a managed database.
