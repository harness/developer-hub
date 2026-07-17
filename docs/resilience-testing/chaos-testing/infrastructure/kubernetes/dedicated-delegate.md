---
title: Dedicated delegate approach
sidebar_label: Dedicated delegate approach
sidebar_position: 20
description: Install the Harness Delegate inside the target cluster and create a Kubernetes chaos infrastructure. Covers the standard cluster-admin install and a least-privilege install scoped to a dedicated namespace.
keywords:
  - dedicated delegate
  - chaos infrastructure
  - DDCR
  - DDCI
  - delegate install
  - limited permissions
  - least privilege
tags:
  - chaos-engineering
  - infrastructure
  - kubernetes
  - delegate
redirect_from:
  - /docs/chaos-engineering/guides/infrastructures/ddcr/installation
  - /docs/chaos-engineering/guides/infrastructures/ddcr/dedicated-delegate
  - /docs/chaos-engineering/guides/infrastructures/types/ddcr/installation
  - /docs/chaos-engineering/guides/infrastructures/types/ddcr/dedicated-delegate
  - /docs/resilience-testing/chaos-testing/infrastructure/types/ddcr/installation
  - /docs/resilience-testing/chaos-testing/infrastructure/types/ddcr/dedicated-delegate
  - /docs/resilience-testing/chaos-testing/infrastructure/kubernetes-harness/dedicated-delegate
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

In the dedicated delegate approach, the Harness Delegate runs **inside the target cluster** (one Delegate per cluster). The Delegate's own service account is the chaos service account. This is the strongest isolation pattern and the simplest single-cluster setup.

![Dedicated Delegate on the target cluster](./static/delegate/dedicated-delegate.png)

---

## Before you begin

- **Harness Delegate version `24.09.83900` or above.** Earlier versions cannot execute DDCR experiments.
- **`kubectl` access** to the target cluster.
- **A Kubernetes connector** in Harness, or the ability to create one.
- **A Harness environment** to attach the infrastructure to. Go to [Create an environment](/docs/chaos-engineering/guides/chaos-experiments/create-experiments#create-environment) if you do not have one.

---

## Choose your install method

- **Basic** *(default)*: the Delegate runs with the standard `cluster-admin` role. Recommended for first installs and dev clusters.
- **Limited Permissions:** the Delegate runs in a dedicated namespace with a custom `Role` and `ClusterRole`. Recommended for production clusters where `cluster-admin` is not acceptable.

<DynamicMarkdownSelector
  options={{
    "Basic": {
      path: "/resilience-testing/chaos-testing/infrastructure/kubernetes/content/dedicated-delegate/basic.md"
    },
    "Limited Permissions": {
      path: "/resilience-testing/chaos-testing/infrastructure/kubernetes/content/dedicated-delegate/limited-permissions.md"
    }
  }}
  toc={toc}
  precedingHeadingID="choose-your-install-method"
  nextHeadingID="next-steps"
  disableSort={true}
/>

## Next steps

- [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions): the full API permission reference for the chaos service account, with copy-paste RBAC manifests.
- [Centralized delegate approach](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/centralized-delegate): if one Delegate must serve many target clusters.
- [Network configuration](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/network-config): mTLS and proxy settings for the Delegate and Discovery Agent.
