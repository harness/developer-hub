---
title: Increase Persistent Volume (PV) size for StatefulSets
sidebar_label: Increase PV size for StatefulSets
description: Learn how to increase the PV size for StatefulSets in your Kubernetes cluster during a Helm upgrade.
sidebar_position: 1
---

You can manually update the Persistent Volume (PV) size associated with a StatefulSet in your Kubernetes clusters. This topic describes how to increase the PV size for StatefulSets in your Kubernetes clusters during a Helm upgrade.

For more information on Helm upgrades, go to [Upgrade the Helm chart](/docs/self-managed-enterprise-edition/self-managed-helm-based-install/upgrade-helm-chart).

:::info Important
This is only applicable to storage file systems that support dynamic provisioning. For more information, go to [Resizing Persistent Volumes using Kubernetes](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/).

:::

## Update the PV size for StatefulSets

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
