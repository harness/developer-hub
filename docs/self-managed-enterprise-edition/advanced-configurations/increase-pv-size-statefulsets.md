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

1. Ensure your storage class supports volume expansion. Refer to the documentation for your volume driver:
   - **AWS**: `ebs.csi.aws.com` supports [volume expansion](https://github.com/kubernetes-sigs/aws-ebs-csi-driver#features).
   - **GCP**: `pd.csi.storage.gke.io` supports [volume expansion](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/gce-pd-csi-driver).
   - **Other Drivers**: Check the specific documentation for your storage class.

2. Install `yq` if you plan to use **Method 1**.
3. Ensure you have the necessary permissions to delete StatefulSets and perform Helm upgrades.

## Recommendation

- **Take a Backup**: Before proceeding, create a backup to ensure data can be restored in case of failures. Refer to [Back up and restore Harness](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-restore-helm) for guidance.

## Method 1: Using shell script

1. Download the [Shell Script](https://raw.githubusercontent.com/harness/helm-charts/refs/heads/main/src/harness/scripts/update-pvc.sh) 

2. Make the script executable:

   ```
   chmod +x update-pvc.sh
   ```

3. Run the script and provide the required arguments:

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

Follow these steps to manually increase PV size associated with a StatefulSet in your Kubernetes cluster manually:

1. Run the following command to list all the Persistent Volume Claims (PVCs) in your Kubernetes cluster.

   ```
   kubectl get pvc
   ```

2. Identify the PV that corresponds to the StatefulSet you are currently working with.


3. Edit the PV configuration to update the storage size. Replace `<YOUR_PVC_NAME>` with the name of your PVC and `<YOUR_UPDATED_SIZE>` with the desired storage size.

   ```
   kubectl patch pvc <YOUR_PVC_NAME> -p '{"spec":{"resources":{"requests":{"storage":"<YOUR_UPDATED_SIZE>"}}}}' -n <namespace>
   ```

4. Verify that the PV and PVC have been updated with the new size. Replace `<YOUR_PV_NAME>` and `<YOUR_PVC_NAME>` with your applicable names.

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

6. Ensure the StatefulSet is recreated to pick up the changes. Replace `<YOUR_STATEFULSET-NAME>`, `<YOUR_RELEASE_NAME>`, and `<YOUR_CHART_NAME>` with your StatefulSet name, Helm release name, and Helm chart name, and change the `override.yaml` file name.

   ```
   kubectl delete statefulset <YOUR_STATEFULSET-NAME>
   ```

   ```
   helm upgrade <YOUR_RELEASE_NAME> <YOUR_CHART_NAME> -f override.yaml
   ```

:::note
The field `PersistentVolumesTemplates` is immutable in StatefulSet, which means that you must recreate it for any changes to take effect.

:::

## Troubleshoot

If database pods fail to come online or restart frequently, try these steps:

1. **Adjust Probes**: Increase the readiness/liveness probe timeout values for the StatefulSet.
2. **Scale Down and Up**: Scale down the database StatefulSet to zero pods, then scale it back to one pod. After the master pod is stable, scale it further as needed.
3. **Restore Data**: Restore the database from a backup if taken earlier.
4. **Contact Support**: If issues persist, reach out to [Harness support](mailto:support@harness.io) for assistance.
