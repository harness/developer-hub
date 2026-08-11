---
title: Resource sizing
sidebar_label: Resource Sizing
description: Review default CPU and memory allocations and resize when recommended.
sidebar_position: 3
keywords:
  - resource sizing
  - requests and limits
  - cpu
  - memory
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The installer sets CPU and memory requests and limits for the operator container and the satellite pod. Resize these values only if there is a recommendation from the Harness SMP team.

---

## Default values

Two keys control sizing, one for the operator container and one for the satellite pod.

- `resources` applies to the main operator container used by the installer StatefulSet (and manager Deployment mode).
- `satellite.resources` applies to the satellite DaemonSet pod that runs on cluster nodes.

```yaml
resources:
  requests:
    cpu: 100m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 1Gi

satellite:
  resources:
    requests:
      cpu: 100m
      memory: 200Mi
    limits:
      cpu: "1"
      memory: 200Mi
```

---

## Resize the allocations

Resize only if there is a recommendation from the Harness SMP team. The following examples increase the allocations for both the operator and the satellite. Select the tab that matches your installation method.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

Add the following to `override.yaml` to increase resources for both the installer and the satellite:

```yaml
resources:
  requests:
    cpu: 250m
    memory: 512Mi
  limits:
    cpu: "1"
    memory: 2Gi

satellite:
  resources:
    requests:
      cpu: 250m
      memory: 256Mi
    limits:
      cpu: "1"
      memory: 512Mi
```

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

Pass the equivalent values with `--pi-set` on the install command:

```bash
--pi-set resources.requests.cpu=250m \
--pi-set resources.requests.memory=512Mi \
--pi-set resources.limits.cpu=1 \
--pi-set resources.limits.memory=2Gi \
--pi-set satellite.resources.requests.cpu=250m \
--pi-set satellite.resources.requests.memory=256Mi \
--pi-set satellite.resources.limits.cpu=1 \
--pi-set satellite.resources.limits.memory=512Mi
```

</TabItem>
</Tabs>

Start with the defaults, then resize gradually based on observed usage.

---

## Related articles

- [Pod security context](/docs/self-managed-enterprise-edition/smp-operator/advanced-configuration/pod-security-context): Set the user and group IDs the containers run as.
- [CLI reference](/docs/self-managed-enterprise-edition/smp-operator/cli-reference): Installation parameters for the helm and clustermgr flows.
- [Kubernetes cluster requirements](/docs/self-managed-enterprise-edition/smp-operator/prerequisites/kubernetes-cluster-requirements): Cluster capacity to confirm before you install.
