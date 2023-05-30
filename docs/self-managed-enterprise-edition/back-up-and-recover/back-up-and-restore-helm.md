---
title: Back up and restore Harness Self-Managed Enterprise Edition Helm installations
sidebar_label: Back up and restore Helm installations
description: Learn how to back up and restore Self-Managed Enterprise Edition Helm installations. 
sidebar_position: 26
---

Harness recommends using Velero to back up and restore Helm-based installations of Harness Self-Managed Enterprise Edition.

## Install Velero 

You can install Velero using several methods, but Harness recommends installation using a Container Storage Interface (CSI) plugin. CSI is a standard interface that enables container orchestrators, such as Kubernetes, to manage different storage systems in a consistent and modular way. The CSI specification defines a set of APIs that container orchestrators can use to discover and manage storage systems, create and delete volumes, attach and detach volumes from nodes, and perform other storage-related operations. CSI drivers implement these APIs to provide integration with specific storage systems. 

If installation with a CSI plugin is not a viable option for your environment, you may use one of the Velero integrations with cloud providers. For more information, go to [Providers](https://velero.io/docs/v1.11/supported-providers/) in the Velero documentation.

:::info note

The following backup solution has been tested for Istio-based environments. It can restore the sidecars when backing up the Kubernetes objects. 

:::

To install Velero, do the following:

1. Create a VolumeSnapshot with `velero.io/csi-volumesnapshot-class: "true"`, and ensure you are using the Storage class and snapshot with the same CSI driver. 

2. Follow the instructions in the [Velero documentation](https://velero.io/docs/v1.11/csi/) to install Velero with CSI support. 

    When the installation is complete, create a backup.

## Backup and restore recommendations and examples

Harness recommends that you perform a full backup of the Harness namespace at least once a week, preferably every 24 hours.

The following commands show an example daily cron backup with TTL to specify how long to keep backups:

`velero backup create harness-backup --selector <labelsForThePods>`

`velero schedule create <SCHEDULE NAME> --schedule "0 7 * * *" --ttl<DURATION>`

The following command shows an example restore:

`velero restore create --from-backup harness-backup`

:::info note

Delete TimescaleDB endpoints after restoring data. TimescaleDB cannot operate on stale endpoints and needs to be refreshed on system restart. 

:::

### Example backup and restore workflow

In this example, the Harness application is deployed in the Harness namespace. Velero and Minio are deployed in a namespace Velero. 

Velero takes two kinds of backups: Backups with Volume (VolumeSnapshots) and Kubernetes resource Backups. For VolumeSnapshots, the CSI supported storage class is required. In this example, The application is deployed in a `standard-rwo` storage class, which is driven by pd.csi.storage.gke.io. This driver is used in VolumeSnapshotClass as well. Make sure the VolumeSnapshotClass is labeled with `velero.io/csi-volumesnapshot-class: "true"` so Velero recognizes it.

To backup with volume, do the following:

1. Create a VolumeSnapshotClass.

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

2. Create a Minio override.

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

3. Deploy Minio.

    `helm install minio bitnami/minio -f minio-ov.yaml -n velero--create-namespace`

4. Create a file credentials-velero. Match the S3 blob user name and password.

    ```
    [default]
    aws_access_key_id = admin
    aws_secret_access_key = admin123
    ```

5. Install Velero using the CLI. Use the AWS plugin to store directly to Minio.

    ```
    velero install \
    --provider aws \
    --plugins
    velero/velero-plugin-for-aws:v1.6.1,velero/velero-plugin-for-csi:v0.4.1 \
    --bucket velero  \
    --secret-file ./credentials-velero  \
    --use-volume-snapshots=true \
    --backup-location-config
    region=default,s3ForcePathStyle="true",s3Url=http://minio.velero.svc.cluster.local:9000 \
    --snapshot-location-config region="default" \
    --features=EnableCSI
    ```

6. Create a backup. The following command is an example of deploying a Harness application in the Harness namespace and taking a backup of MongoDB persistent volumes (PVs).

    ```
    velero backup create harness-backup --selector
    app.kubernetes.io/name=mongodb --include-resources
    persistentvolumeclaims,persistentvolumes
    ```

    After the backup completes, you can see the volumeSnapShotContents were created. The snapshots of the MongoDB PVs are stored there.

7. Create a disaster, scale the MongoDB pods down, and delete the PVs. 

8. Restore the MongoDB from a backup.

    `velero restore create --from-backup harness-backup`

    The PVs are recreated, but the PVs are not bound to the Harness namespace. Scale the MongoDB pods back to 3. This creates the PVs with the data that was backed up from the volumeSnapshots. 
