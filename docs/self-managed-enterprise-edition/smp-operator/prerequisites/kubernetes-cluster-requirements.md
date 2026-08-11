---
title: Kubernetes cluster requirements
sidebar_label: Kubernetes Cluster Requirements
description: Review the resource profiles and node sizing required before you install with the SMP Operator.
sidebar_position: 2
keywords:
  - kubernetes cluster requirements
  - resource profiles
  - node sizing
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Your cluster must provide enough capacity for the deployment scale you expect, and you set that scale through a resource profile. This topic covers the available profiles and the namespace you install into.

## Resource profiles

The Harness Platform uses **resource profiles** to match your deployment scale. Select a profile based on your expected usage.

The following table lists each profile with the concurrent pipeline capacity, the team size it suits, and the YAML file that defines it.

| Profile | Concurrent Pipelines | Recommended Team Size | YAML File |
| --- | --- | --- | --- |
| **Small** | Up to 50 | Fewer than 50 users | `override-small.yaml` |
| **Medium** | Up to 200 | 50 to 200 users | `override-medium.yaml` |
| **Large** | Over 200 | 200+ users | `override-large.yaml` |

Set the profile during installation.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

```yaml
cluster:
  profile: medium
```

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

```bash
--pi-set cluster.profile=medium
```

</TabItem>
</Tabs>

For detailed resource allocations per profile, see the [Harness resource profiles documentation](/docs/self-managed-enterprise-edition/smp-basic-configuration#resource-profiles).

## Namespace configuration

Install the platform into a dedicated namespace. Specify the namespace with whichever method you use to install.

<Tabs>
<TabItem value="helm-t2" label="helm" default>

Use `helm install ... -n <namespace> --create-namespace`.

</TabItem>
<TabItem value="clustermgr-t2" label="clustermgr">

Use `--namespace <namespace>`. The default namespace is `harness`.

</TabItem>
</Tabs>
