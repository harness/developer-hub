---
title: Storage classes
sidebar_label: Storage Classes
description: Configure storage classes for EKS, AKS, and GKE before you install with the SMP Operator.
sidebar_position: 3
keywords:
  - storage classes
  - eks
  - aks
  - gke
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Harness Platform requires dynamic volume provisioning via a Kubernetes StorageClass. The correct storage class depends on your cluster provider.

## Storage classes by platform

Use the recommended storage class for your provider. Each provider names its classes differently, so confirm the exact name against the provider documentation in the last column.

| Platform | Recommended StorageClass | Documentation |
| --- | --- | --- |
| **AWS EKS** | `gp2` or `gp3` | [EKS Storage Classes](https://docs.aws.amazon.com/eks/latest/userguide/create-storage-class.html) |
| **Azure AKS** | `managed-csi` or `managed-csi-premium` | [AKS Storage Classes](https://learn.microsoft.com/en-us/azure/aks/concepts-storage#storage-classes) |
| **GKE** | `standard-rwo` or `premium-rwo` | [GKE Storage Classes](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes#storageclasses) |

## Verify available storage classes

Run the following command to list the storage classes your cluster already provides.

```bash
kubectl get storageclass
```

## Set the storage class

Set the storage class with whichever method you use to install.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

Set the storage class in `values.yaml`:

```yaml
cluster:
  tfi:
    storageClass: gp3
```

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

Pass the storage class during installation:

```bash
--pi-set cluster.tfi.storageClass=gp3
```

Or use the `-i` shorthand:

```bash
-i storageClass=gp3
```

</TabItem>
</Tabs>

The operator passes this value to all platform services that require persistent storage.
