---
title: Back up and restore Harness Self-Managed Enterprise Edition Helm installations
sidebar_label: Back up and restore Helm installations
description: Learn how to back up and restore on-prem Harness Self-Managed Enterprise Edition Helm installations.
sidebar_position: 26
---

Harness recommends using Velero to back up and restore Helm-based installations of Harness Self-Managed Enterprise Edition.

## Install Minio

1. Create a MinIO override.

    ```
    ### filename minio-ov.yaml
    fullnameOverride: "minio"
    mode: standalone
    ### we require the bucket to be matching the value on velero-cli
    defaultBuckets: "velero"
    persistence:
        size: 200Gi
    ### un-necessary, it can create random rootPassword
    auth:
        rootUser: admin
        rootPassword: "admin123"
    ```

2. Deploy MinIO.

    `helm install minio bitnami/minio -f minio-ov.yaml -n velero --create-namespace`

## Install Velero

You can install Velero using several methods, but Harness recommends installation using a Container Storage Interface (CSI) plugin. CSI is a standard interface that enables container orchestrators, such as Kubernetes, to manage different storage systems in a consistent and modular way. The CSI specification defines a set of APIs that container orchestrators can use to discover and manage storage systems, create and delete volumes, attach and detach volumes from nodes, and perform other storage-related operations. CSI drivers implement these APIs to provide integration with specific storage systems.

If installation with a CSI plugin is not a viable option for your environment, you may use one of the Velero integrations with cloud providers. For more information, go to [Providers](https://velero.io/docs/main/supported-providers/) in the Velero documentation.

:::info note

The following backup solution has also been tested for istio-based environments. It can restore the sidecars when backing up the Kubernetes objects.

:::

To install Velero, do the following:

1. Create a VolumeSnapshot object, and ensure you are using the Storage class and snapshot with the same CSI driver.
    ```
    apiVersion: snapshot.storage.k8s.io/v1
    kind: VolumeSnapshotClass
    metadata:
        name: velero-snapshot-class
        labels:
            velero.io/csi-volumesnapshot-class: "true"
    driver: pd.csi.storage.gke.io
    deletionPolicy: Delete
    ```

2. Install velero using the above minio credentials. Please refer to [Velero documentation](https://velero.io/docs/main/csi/) for detailed instructions.
   1. Create a file `credentials-velero`. Match the S3 blob user name and password.


    ```
    [default]
    aws_access_key_id = admin
    aws_secret_access_key = admin123
    ```

   2. Install Velero using the CLI. Use the AWS plugin to store directly to MinIO.


    ```
    velero install \
    --provider aws \
    --plugins velero/velero-plugin-for-aws:v1.11.0,velero/velero-plugin-for-csi:v0.7.1 \
    --bucket velero  \
    --secret-file ./credentials-velero  \
    --use-volume-snapshots=true \
    --backup-location-config region=default,s3ForcePathStyle="true",s3Url=http://minio.velero.svc.cluster.local:9000 \
    --snapshot-location-config region="default" \
    --features=EnableCSI
    ```

## Backup and restore

### Recommendations

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours.

### Example workflow

In this example, the Harness application is deployed in the Harness namespace. Velero and MinIO are deployed in a namespace Velero.

Velero takes two kinds of backups: Backups with Volume (VolumeSnapshots) and Kubernetes resource Backups. For VolumeSnapshots, the CSI supported storage class is required. In this example, The application is deployed in a `standard-rwo` storage class of GKE, which is driven by `pd.csi.storage.gke.io`. This driver is used in VolumeSnapshotClass as well. Make sure the VolumeSnapshotClass is labeled with `velero.io/csi-volumesnapshot-class: "true"` so Velero recognizes it.

To backup with volume, do the following:

1. Create a backup. The following command is an example of deploying a Harness application in the Harness namespace and taking a backup of the whole namespace.

    ```
    velero backup create harness-backup --include-namespaces harness
    ```

    After the backup completes, you can see the `volumeSnapShotContents` were created in `harness` namespace.

    ```
    kubectl get volumesnapshotcontent -n harness
    ```
2. Create a disaster by deleting the harness namespace.

3. Restore the namespace from a backup.

    `velero restore create --from-backup harness-backup`

    Confirm if the PVs are bound
4. Delete old timescaledb endpoints

    `kubectl delete endpoints timescaledb-single-chart timescaledb-single-chart-config timescaledb-single-chart-replica -n harness`

## Troubleshoot

### Using new minio credentials after velero installation

- Velero creates a kubernetes secret with the provided credentials.
- To update the credentials, delete the existing secret from velero namespace.
  `kubectl delete secret cloud-credentials -n velero`
- Run velero installation command after updating credentials file.

### Mirror minio data to cloud storage

- Minio deployment contains a mirror utility which can be used to mirror local data to cloud buckets.
- Exec into the minio pod of velero namespace.
  `kubectl exec -it <minio-pod-name> -n velero -- sh`
- Add remote storage bucket entry in minio config.
  `mc alias set s3 <remote-bucket-url> <access-key> <secret-key>`
- Run mirror command.
  `mc mirror local s3`

### Backup Failed

- When you describe a backup and the status reflects `Failed` state, capture the velero pods logs.
  `kubectl logs deployment/velero -n velero > logs.txt`
- Check the error in logs.txt file and take required actions.
- Common errors include
  - **BackupLocation is unavailable with 403 forbidden status**: This indicates that the credentials used are wrong. Update the credentials using above approach.
  - **Bucket does not exist**: This indicates that the bucket used in velero install command does not exist. Create the required bucket in your desired storage.
  - **Waiting for CSI driver to reconcile volumesnapshot**: This indicates that csi driver is not able to create volumesnapshotcontent. Please make sure that you csi snapshot-controller is correctly installed.
