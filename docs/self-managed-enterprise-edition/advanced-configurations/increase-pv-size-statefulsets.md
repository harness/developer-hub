---
title: Increase Persistent Volume (PV) size for StatefulSets
sidebar_label: Increase PV size for StatefulSets
description: Learn how to increase the PV size for StatefulSets in your Kubernetes cluster during a Helm upgrade.
sidebar_position: 4
---

You can manually update the Persistent Volume (PV) size associated with a StatefulSet in your Kubernetes clusters. This topic describes how to increase the PV size for StatefulSets in your Kubernetes clusters during a Helm upgrade.

For more information on Helm upgrades, go to [Upgrade the Helm chart](/docs/self-managed-enterprise-edition/install/upgrade-helm-chart).

:::info Important
This is only applicable to storage file systems that support dynamic provisioning and volume expansion. 

This document is a general guide to increase PVC size of harness statefulset. The actual volume is managed by kubernetes volume driver provided by your cloud provider.

For more information, go to [Resizing Persistent Volumes using Kubernetes](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/).

:::

## Prerequisite

1. Make sure your storage class support volume expansion. If you are unsure about this, please don't proceed.
2. Make sure you have `yq` installed if you are using **Method 1**
3. Make sure you have access to delete statefulsets and do helm upgrades

## Recommendation

It is recommended to take a backup before proceeding with increasing the pvc size. This will help in restoring data in case of failures.

For a reference on how to take backups, please go to [Back up and restore Harness](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-restore-helm)

## Method 1: Using shell script

1. Download the [Shell Script from here](https://github.com/harness/helm-charts/blob/main/src/harness/scripts/update-pvc.sh) 

2. After downloading, change the script permission to execute it

   ```
   chmod +x update-pvc.sh
   ```
3. Run the script and enter correct arguments when prompted

   ```
   ./pvc-update.sh
   ```
   Example:
   ```
   ./pvc-update.sh
   Enter Namespace: harness
   Enter Override file: ./override-values.yaml
   Enter new pvc size in Gi (eg: 30Gi): 20Gi
   Enter database to increase pvc size (mongodb, timescaledb, minio, postgresql, timescaledb-wal): minio
   Enter release name: harness
   Enter chart path/name: harness/harness
   ```
4. Wait for the script to complete successfully.

## Method 2: Manually Update the PV size for StatefulSets

You can increase the PV size associated with a StatefulSet in your Kubernetes cluster manually.

To increase the PV size, do the following:

1. Run the following to list all the Persistent Volume Claims (PVCs) in your Kubernetes cluster.

   ```
   kubectl get pvc
   ```

2. Identify the PV that corresponds to the StatefulSet you are currently working with.


3. Edit the PV configuration to update the storage size. Replace \<YOUR_PVC_NAME> with the name of your PVC and \<YOUR_UPDATED_SIZE> with the desired storage size.

   ```
   kubectl patch pvc <YOUR_PVC_NAME> -p '{"spec":{"resources":{"requests":{"storage":"<YOUR_UPDATED_SIZE>"}}}}' -n <namespace>
   ```

4. Verify that the PV and PVC have been updated with the new size. Replace \<YOUR_PV_NAME> and \<YOUR_PVC_NAME> with your applicable names.

   ```
   kubectl get pv <YOUR_PV_NAME> -o=jsonpath='{.spec.capacity.storage}'
   ```

   ```
   kubectl get pvc <YOUR_PVC_NAME> -o=jsonpath='{.spec.resources.requests.storage}' -n <namespace>
   ```

5. Edit the storage values in the values `override.yaml` file you use to deploy Helm to reflect the new requirements.

   When upgrading storage for TimescaleDB, the values will look similar to the example below:

   ```yaml
      platform:
        bootstrap:
          database:
            timescaledb:
              persistentVolumes:
                data:
                  size: 120Gi
                wal:
                  size: 5Gi
   ```

6. Ensure the StatefulSet is recreated to pick up the changes. Replace \<YOUR_STATEFULSET-NAME>, \<YOUR_RELEASE_NAME>, and \<YOUR_CHART_NAME> with your StatefulSet name, Helm release name, and Helm chart name, and change the `override.yaml` file name.

   ```
   kubectl delete statefulset <YOUR_STATEFULSET-NAME>
   ```

   ```
   helm upgrade <YOUR_RELEASE_NAME> <YOUR_CHART_NAME> -f override.yaml
   ```

:::info note
The field `PersistentVolumesTemplates` is immutable in StatefulSet, which means that you must recreate it for any changes to take effect.

:::

## Troubleshoot

There could be scenarios where the database pods do not come up online and restart frequently.

In those scenarios, please try the following

1. Update readiness/liveness probe settings of the statefulset to some higher value.
2. Scale down database pods to 0 and then scale the pods to 1. Once the master is up, scale the statefulset to 2/3 based on its earlier pods.
3. Do a restore of the database if a backup was taken.
4. Raise harness support ticket.
