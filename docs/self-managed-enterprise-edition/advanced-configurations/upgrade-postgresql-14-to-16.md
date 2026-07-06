---
title: Upgrade the in-cluster PostgreSQL database from version 14 to version 16
sidebar_label: Upgrade PostgreSQL 14 to 16
description: Learn how to upgrade your in-cluster PostgreSQL database from version 14 to version 16 in Harness Self-Managed Enterprise Edition.
sidebar_position: 50
keywords:
  - postgresql
  - pg_upgrade
  - database upgrade
  - self-managed enterprise edition
  - smp
  - postgres 14 to 16
tags:
  - postgresql
  - database
  - self-managed enterprise edition
---

This guide explains how to upgrade the in-cluster PostgreSQL database in a Harness Self-Managed Enterprise Edition (SMP) deployment from PostgreSQL 14 to PostgreSQL 16 using `pg_upgrade --link`. 

It also explains how to back up your data, validate the upgrade, and restore the database if necessary.

:::warning Important
This guide and the included scripts apply only to the **Harness-provided internal PostgreSQL** deployed as part of the SMP Helm chart. If you use an external PostgreSQL database provided by a cloud provider (such as Amazon RDS, Google Cloud SQL, or Azure Database for PostgreSQL), refer to your cloud provider documentation for the PostgreSQL upgrade process.
:::

## Before you begin

- **kubectl access:** Configured with access to the target namespace where PostgreSQL runs.
- **Helm upgrade:** Run `helm upgrade` to deploy the `pg-upgrade-config` ConfigMap that provides the upgrade and PG16 images to the script.
- **Backup:** Back up the PostgreSQL data volume before starting the upgrade. For available backup methods, go to [Backup and restore options](#backup-and-restore-options).

---

## Data verification

The `pg-upgrade.sh` script automatically captures a verification baseline before the upgrade and runs verification again after the upgrade completes. It then generates a comparison report showing row-count changes per table with a pass/fail status (within a 5% tolerance).

The verification captures:

- **Database sizes** (`pg_database_size`)
- **Per-table row counts** (`n_live_tup` from `pg_stat_user_tables`)

Verification output files are saved locally with timestamps:

- `pg-verify-before-<namespace>-<timestamp>.txt`
- `pg-verify-after-<namespace>-<timestamp>.txt`
- `pg-upgrade-report-<namespace>-<timestamp>.txt`

:::info
`n_live_tup` provides an estimated row count. After a restart or restore, PostgreSQL resets these statistics. 

Run `ANALYZE`, then query `pg_stat_user_tables` to generate updated estimates.

```bash
kubectl exec -n <namespace> postgres-0 -- \
  bash -c "PGPASSWORD=\$(cat \$POSTGRES_PASSWORD_FILE) vacuumdb -U postgres --all --analyze-only --jobs=4"
```
:::

---

## Run the upgrade

The `pg-upgrade.sh` script performs the following actions:

1. Verifies the current PostgreSQL version (scales up the pod if necessary).
2. Captures pre-upgrade data verification baseline.
3. Prompts for backup confirmation.
4. Scales down the PostgreSQL StatefulSet.
5. Launches a temporary upgrade pod (`pg-upgrade-job`) with both PG14 and PG16 binaries.
6. Runs `pg_upgrade --check` (dry run).
7. Runs `pg_upgrade --link` to perform the upgrade by creating hard links instead of copying data files.
8. Swaps data directories.
9. Patches the StatefulSet image to PG16.
10. Scales up the StatefulSet and runs `ANALYZE`.
11. Captures post-upgrade data verification and generates a comparison report.

### Run the script

```bash
./pg-upgrade.sh <namespace>
```

### Image configuration

The script reads image values from the `pg-upgrade-config` ConfigMap in the target namespace. This ConfigMap is created automatically during `helm upgrade`. It provides:

- `PG_NEW_IMAGE`: the PG16 runtime image.
- `UPGRADE_IMAGE`: the image containing both PG14 and PG16 binaries.

You can override these values by setting the corresponding environment variables before running the script.

### Environment variable overrides

| Variable | Default | Description |
| --- | --- | --- |
| `PG_OLD_VERSION` | `14` | Source PostgreSQL major version |
| `PG_NEW_VERSION` | `16` | Target PostgreSQL major version |
| `PG_STS_NAME` | `postgres` | StatefulSet name |
| `PG_USER` | `postgres` | PostgreSQL superuser name |
| `PG_NEW_IMAGE` | From `pg-upgrade-config` ConfigMap | PG16 runtime image |
| `UPGRADE_IMAGE` | From `pg-upgrade-config` ConfigMap | Image with both PG14 and PG16 binaries |
| `PG_UPGRADE_JOBS` | `4` | Parallel jobs for `pg_upgrade` |
| `PG_OLD_BINDIR` | `/usr/lib/postgresql/14/bin` | Path to PG14 binaries in upgrade image |
| `PG_NEW_BINDIR` | `/usr/lib/postgresql/16/bin` | Path to PG16 binaries in upgrade image |
| `PG_DATADIR` | `/bitnami/postgresql/data` | PostgreSQL data directory path |

### Interactive prompts

During execution, the script prompts you to confirm the following actions:

1. Backup confirmation
2. Scale-down confirmation
3. After `--check` passes, before the actual upgrade

### About link mode

`pg_upgrade --link` creates hard links to the existing data files instead of copying them into a new data directory. This significantly reduces upgrade time, especially for large databases. Because the upgraded data shares the original files, you cannot use the original data directory after the upgrade completes. Use the backup you created before the upgrade if you need to roll back.

---

## Review the upgrade report

After the upgrade completes, the script generates a comparison report (`pg-upgrade-report-<namespace>-<timestamp>.txt`) that compares row counts before and after the upgrade.

Expected results:

- **PASS:** Row counts match or differ by less than 5%.
- **SKIP:** A table exists in the pre-upgrade capture but was not found in the post-upgrade capture (review manually).
- **FAIL:** Row counts differ by more than 5% (investigate before restoring application traffic).

Small differences in batch or queue tables are expected due to application activity between captures.

---

## Update your Helm values

After the upgrade completes successfully, update your Helm values file to use the PostgreSQL 16 image for future deployments.

Add the following override:

```yaml
platform:
  bootstrap:
    database:
      postgresql:
        image:
          tag: 16.14-bookworm
```

This ensures that subsequent `helm upgrade` operations continue using the PostgreSQL 16 image. Without this override, a future `helm upgrade` can revert the PostgreSQL StatefulSet to the PostgreSQL 14 image.

---

## Roll back to PostgreSQL 14

:::warning
This rollback procedure applies only if the actual `pg_upgrade --link` step fails. The script interactively prompts for confirmation before running the real upgrade. All steps before that prompt are pre-upgrade checks and are safe to abort without rollback. If the upgrade completes successfully, no rollback is needed.
:::

If the upgrade fails after the `--link` step:

1. Scale down the StatefulSet:

   ```bash
   kubectl scale sts -n <namespace> postgres --replicas=0
   kubectl wait --for=delete pod/postgres-0 -n <namespace> --timeout=180s
   ```

2. Delete the upgraded PostgreSQL data volume (PVC).

   ```bash
   kubectl delete pvc data-postgres-0 -n <namespace>
   ```

3. Restore the PostgreSQL data volume by using the same backup method you selected in [Backup and restore options](#backup-and-restore-options).

4. Set the image back to PG14 and scale up:

   ```bash
   kubectl set image sts/postgres -n <namespace> postgresql=<original-pg14-image>
   kubectl scale sts -n <namespace> postgres --replicas=1
   kubectl wait --for=condition=ready pod/postgres-0 -n <namespace> --timeout=300s
   ```

5. Run `ANALYZE` (statistics reset after restore):

   ```bash
   kubectl exec -n <namespace> postgres-0 -- \
     bash -c "PGPASSWORD=\$(cat \$POSTGRES_PASSWORD_FILE) vacuumdb -U postgres --all --analyze-only --jobs=4"
   ```

6. Verify restored data by comparing against the pre-upgrade baseline:

   ```bash
   ./pg-backup-restore.sh <namespace> verify
   ```

   Compare the output report with the pre-upgrade verification file:

   ```bash
   diff pg-verify-before-<namespace>-<timestamp>.txt pg-verify-<namespace>-<timestamp>.txt
   ```

---

## Troubleshooting

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

<Troubleshoot
  issue="pg_upgrade --check fails with 'could not load library'"
  mode="general"
  fallback="An extension .so is missing from the upgrade image's PG16 lib path. Check which extension is missing with: kubectl exec -n <namespace> pg-upgrade-job -- ls /usr/lib/postgresql/16/lib/ | grep -i <extension>. Add the missing .so to Dockerfile.upgrade and rebuild the image."
/>

<Troubleshoot
  issue="Upgrade pod stuck or failing during PostgreSQL 14 to 16 upgrade"
  mode="general"
  fallback="The pod remains running after a failure to simplify troubleshooting. Connect with: kubectl exec -n <namespace> -it pg-upgrade-job -- bash. Then check logs: cat /tmp/pg_upgrade_internal.log. Delete the upgrade pod after troubleshooting: kubectl delete pod -n <namespace> pg-upgrade-job."
/>

<Troubleshoot
  issue="Verification report shows 0 rows after PostgreSQL restore"
  mode="general"
  fallback="This is expected before ANALYZE runs. The n_live_tup stat is an estimate that resets on restart. Run: kubectl exec -n <namespace> postgres-0 -- bash -c 'PGPASSWORD=$(cat $POSTGRES_PASSWORD_FILE) vacuumdb -U postgres --all --analyze-only --jobs=4'. Then query pg_stat_user_tables to see updated counts."
/>

---

## Backup and restore options

Choose one of the following options based on your environment:

- [Use your existing backup process](#use-your-existing-backup-process)
- [Back up with pg_dump](#back-up-with-pg_dump)
- [Use Kubernetes VolumeSnapshot](#use-kubernetes-volumesnapshot)
- [Use a direct cloud disk snapshot](#use-a-direct-cloud-disk-snapshot)

---

### Use your existing backup process

If you already have a backup process in place, such as Velero, a cloud-native backup service, or scheduled `pg_dumpall` jobs, continue using it. Ensure you have a restorable backup taken after a `CHECKPOINT`:

```bash
kubectl exec -n <namespace> postgres-0 -- \
  bash -c "PGPASSWORD=\$(cat \$POSTGRES_PASSWORD_FILE) psql -U postgres -c 'CHECKPOINT;'"
```

Then take the backup using your existing process. For rollback, follow your existing restore procedure to recreate the `data-postgres-0` PVC.

---

### Back up with pg_dump

:::info
For large databases, `pg_dump` can take significantly longer than snapshot-based backups. If your storage platform supports snapshots, consider using [Kubernetes VolumeSnapshot](#use-kubernetes-volumesnapshot) or [a direct cloud disk snapshot](#use-a-direct-cloud-disk-snapshot).
:::

**Backup:**

```bash
./pg-backup-restore.sh <namespace> backup
```

**Restore:**

```bash
# Restore from latest backup
./pg-backup-restore.sh <namespace> restore

# Restore from a specific backup
./pg-backup-restore.sh <namespace> restore pg_backup_20260702-120000
```

**Verify (on-demand):**

```bash
./pg-backup-restore.sh <namespace> verify
```

The `verify` action runs `ANALYZE` and captures database sizes and per-table row counts. Use it to generate a report at any point and compare against a prior baseline.

A row-count verification report is also generated automatically after backup and restore operations.

---

### Use Kubernetes VolumeSnapshot

**Prerequisites:**

- The PVC uses a CSI-based StorageClass that implements VolumeSnapshot (in-tree provisioners, NFS, EFS, Local PV, and RWX volumes do not support snapshots).
- A `VolumeSnapshotClass` whose driver matches your StorageClass provisioner.

:::warning
Installing CRDs and the snapshot-controller requires cluster-level permissions. Ensure these installations are approved for your cluster.
:::

**Install VolumeSnapshot CRDs (if not already present):**

```bash
kubectl get crd | grep snapshot
```

If you see `volumesnapshots.snapshot.storage.k8s.io`, `volumesnapshotcontents.snapshot.storage.k8s.io`, and `volumesnapshotclasses.snapshot.storage.k8s.io`, skip to the next step. Otherwise install them:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/master/client/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml
```

**Install snapshot-controller (if not running):**

- **GKE:** The snapshot-controller is managed by Google on the control plane. No installation needed.
- **EKS:** AWS does not include the snapshot-controller. Check if already running:

  ```bash
  kubectl get pods -A | grep snapshot-controller
  ```

  If not running, install it:

  ```bash
  kubectl apply -k "github.com/kubernetes-csi/external-snapshotter/deploy/kubernetes/snapshot-controller?ref=master"
  ```

**Create a VolumeSnapshotClass (if not present):**

Find your provisioner:

```bash
kubectl get storageclass <storage-class-name> -o jsonpath='{.provisioner}'
```

GCP (GKE with Persistent Disk CSI):

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: regional-snapshot-class
driver: pd.csi.storage.gke.io
deletionPolicy: Retain
parameters:
  storage-locations: <region>
```

AWS (EKS with EBS CSI):

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: ebs-snapshot-class
driver: ebs.csi.aws.com
deletionPolicy: Retain
parameters: {}
```

```bash
kubectl apply -f volumesnapshotclass.yaml
```

**Create a snapshot:**

```bash
kubectl exec -n <namespace> postgres-0 -- \
  bash -c "PGPASSWORD=\$(cat \$POSTGRES_PASSWORD_FILE) psql -U postgres -c 'CHECKPOINT;'"

kubectl apply -f snapshot.yaml
kubectl get volumesnapshot pg-snapshot-before-16 -n <namespace> -w
```

Wait until the `READYTOUSE` field changes to `true`.

`snapshot.yaml`:

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: pg-snapshot-before-16
  namespace: <namespace>
spec:
  volumeSnapshotClassName: <your-snapshot-class>
  source:
    persistentVolumeClaimName: data-postgres-0
```

**Restore from VolumeSnapshot:**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-postgres-0
  namespace: <namespace>
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: <your-storage-class>
  resources:
    requests:
      storage: <same-as-original>
  dataSource:
    name: pg-snapshot-before-16
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
```

```bash
kubectl apply -f pvc-restore.yaml
```

---

### Use a direct cloud disk snapshot

Use this option if your storage platform supports native disk snapshots. This works for any PV regardless of how it was provisioned. No VolumeSnapshot CRDs, snapshot-controller, or CSI format requirement needed.

**Prerequisites:**

- CLI access to the cloud account (`gcloud`, `aws`, or `az`).

**Take snapshot:**

```bash
# Run CHECKPOINT
kubectl exec -n <namespace> postgres-0 -- \
  bash -c "PGPASSWORD=\$(cat \$POSTGRES_PASSWORD_FILE) psql -U postgres -c 'CHECKPOINT;'"

# Get disk identifier
kubectl get pv $(kubectl get pvc data-postgres-0 -n <namespace> -o jsonpath='{.spec.volumeName}') \
  -o jsonpath='{.spec.csi.volumeHandle}'
```

GCP:

```bash
gcloud compute disks snapshot <disk-name> \
  --zone=<zone> \
  --snapshot-names=pg14-before-upgrade \
  --storage-location=<region> \
  --project=<project>
```

For other cloud providers, refer to your provider documentation for taking a disk snapshot (for example, `aws ec2 create-snapshot` for AWS, `az snapshot create` for Azure).

**Restore from cloud disk snapshot:**

Create a new disk from the snapshot, then create a PV and PVC pointing to it.

GCP:

```bash
gcloud compute disks create pg14-restored \
  --source-snapshot=pg14-before-upgrade \
  --zone=<zone> \
  --project=<project>
```

Create a PV pointing to the restored disk:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pg14-restored-pv
spec:
  capacity:
    storage: <same-as-original>
  accessModes: ["ReadWriteOnce"]
  persistentVolumeReclaimPolicy: Delete
  storageClassName: <your-storage-class>
  volumeMode: Filesystem
  csi:
    driver: pd.csi.storage.gke.io
    volumeHandle: projects/<project>/zones/<zone>/disks/pg14-restored
    fsType: ext4
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: topology.gke.io/zone
              operator: In
              values: ["<zone>"]
```

Create a PVC bound to it:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-postgres-0
  namespace: <namespace>
spec:
  accessModes: ["ReadWriteOnce"]
  storageClassName: <your-storage-class>
  resources:
    requests:
      storage: <same-as-original>
  volumeName: pg14-restored-pv
```

```bash
kubectl apply -f pv-restore.yaml
kubectl apply -f pvc-restore.yaml
kubectl get pvc data-postgres-0 -n <namespace>  # verify Bound
```

For other cloud providers, the disk create command differs per provider. The PV/PVC structure is the same. Only the `csi.driver`, `csi.volumeHandle`, and the nodeAffinity zone label change per provider.

---

## Included scripts

| File | Description |
| --- | --- |
| `pg-upgrade.sh` | Main upgrade script (PG14 to PG16) with built-in data verification |
| `pg-backup-restore.sh` | Logical backup, restore, and on-demand data verification using `pg_dump` |
