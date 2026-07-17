---
title: Cluster permissions
sidebar_label: Cluster permissions
sidebar_position: 50
description: Kubernetes API permissions the chaos service account needs on the target cluster to inject DDCR-based faults, plus copy-paste RBAC manifests for the two install topologies.
keywords:
  - permissions
  - RBAC
  - service account
  - cluster role
  - kubernetes RBAC
tags:
  - chaos-engineering
  - infrastructure
  - rbac
redirect_from:
  - /docs/chaos-engineering/onboarding/harness-infra/permissions
  - /docs/chaos-engineering/features/chaos-infrastructure/harness-infra/permissions
  - /docs/chaos-engineering/concepts/explore-concepts/infrastructures/delegate/permissions
  - /docs/chaos-engineering/guides/infrastructures/ddcr/permissions
  - /docs/chaos-engineering/guides/infrastructures/types/ddcr/permissions
  - /docs/resilience-testing/chaos-testing/infrastructure/types/ddcr/permissions
  - /docs/resilience-testing/chaos-testing/infrastructure/permissions-and-rbac
  - /docs/resilience-testing/chaos-testing/infrastructure/permissions
  - /docs/resilience-testing/chaos-testing/infrastructure/kubernetes-harness/permissions
---

:::tip Default is `cluster-admin`
The default install grants the Delegate's service account `cluster-admin` and works out of the box. Use the [least-privilege manifests below](#example-rbac-manifests) only if your environment forbids `cluster-admin`.
:::

This page lists the Kubernetes API verbs the chaos service account needs on the target cluster and gives copy-paste `ClusterRole` and `Role` manifests for the two install topologies. For **Harness platform RBAC** (who in your Harness account can View, Create, Edit, Delete, or Execute chaos resources in the UI), go to [Governance and RBAC](/docs/resilience-testing/chaos-testing/governance/rbac).

The chaos service account is the identity the chaos runner uses against the Kubernetes API. Which service account that is depends on where the Delegate runs:

- **Delegate runs inside the target cluster.** The Delegate's own service account is the chaos service account. Bind the chaos RBAC to it.
- **Delegate runs outside the target cluster (centralized).** Each target cluster has its own chaos service account, which the Harness Kubernetes connector authenticates as. Bind the chaos RBAC to that service account on each target cluster.

The table below lists every API resource the service account uses, the verbs it needs, and why. Use it as a reference when you author a least-privilege `ClusterRole` or `Role`. Copy-paste manifests for both topologies are in [Example RBAC manifests](#example-rbac-manifests).

## API permission reference

| Resource | Scope | Verbs | Used for |
|---|---|---|---|
| `pods` | Namespaced + Cluster | create, delete, get, list, patch, update, watch, deletecollection | Inject chaos; create and monitor helper pods |
| `pods/log` | Namespaced + Cluster | get, list, watch | Tail helper-pod logs |
| `pods/exec` | Namespaced + Cluster | create, get, list, watch | Run commands inside helper pods (`pods/exec` only accepts `create` plus read verbs) |
| `secrets`, `configmaps`, `services` | Namespaced (runner namespace) | create, delete, get, list, patch, update, watch, deletecollection | Create and monitor helper resources |
| `jobs`, `cronjobs` (`batch`) | Namespaced (runner namespace) | create, delete, get, list, patch, update, watch, deletecollection | Create and monitor helper jobs |
| `deployments` (`apps`) | Namespaced (runner namespace) | create, delete, get, list, patch, update, watch, deletecollection | Manage the chaos runner deployment lifecycle |
| `deployments`, `replicasets`, `daemonsets`, `statefulsets` (`apps`) | Cluster | get, list, watch, update | Discover app parent resources; scale during faults |
| `replicationcontrollers`, `services` | Cluster | get, list, watch | Discover app parent resources |
| `networkpolicies` (`networking.k8s.io`) | Cluster | create, delete, get, list | Network-fault injection |
| `nodes`, `namespaces` | Cluster | get, list, watch | Node-level faults; auto-create network experiments |
| `pods`, `nodes` (`metrics.k8s.io`) | Cluster | get, list | Optional: read CPU/memory metrics from probes (requires `metrics-server`) |
| `deploymentconfigs` (`apps.openshift.io`) | Cluster | get, list | Optional: discover OpenShift parent resources |
| `rollouts` (`argoproj.io`) | Cluster | get, list | Optional: discover Argo Rollouts as eligible chaos candidates |

The `ClusterRole` and `Role` manifests that combine these rules are in [Example RBAC manifests](#example-rbac-manifests) below. Apply them as part of the install if you do not want to grant the chaos service account `cluster-admin`.

## Optional permissions

- **`metrics.k8s.io`** rules are only needed if a probe in your experiments queries the metrics API (for example a [Command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `kubectl top`). Install `metrics-server` on the cluster first.
- **`apps.openshift.io/deploymentconfigs`** and **`argoproj.io/rollouts`** are only needed if the target cluster runs OpenShift or Argo Rollouts respectively.

## Namespace versus cluster scope

The same resources appear in both scopes because a chaos infrastructure can be installed either way:

- **Cluster-wide.** Bind the `ClusterRole` with a `ClusterRoleBinding`. The chaos service account can target workloads in any namespace.
- **Namespace-scoped.** Bind the `ClusterRole` with a `RoleBinding` in each onboarded application namespace. Faults that need cluster-level resources (node faults, cluster-wide policies) cannot run on this scope.

## Example RBAC manifests

The collapsibles below carry copy-paste-ready RBAC manifests for the two install patterns. Apply the relevant one **before** you create the Kubernetes chaos infrastructure if you want least privilege instead of `cluster-admin`.

<details>
<summary>Dedicated delegate approach (Delegate in target cluster)</summary>

Pairs with the [dedicated delegate install](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/dedicated-delegate#choose-your-install-method) under **Limited Permissions**. The Delegate's service account is the chaos service account. Apply the manifests below in the order shown.

**1. Service account:**

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: chaos-delegate
  namespace: harness-delegate-ng
```

**2. Namespace `Role` and `RoleBinding`** (lets the Delegate manage chaos runner pods in its own namespace):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: chaos-runner-role
  namespace: harness-delegate-ng
rules:
- apiGroups: ["apps"]
  resources: [deployments, replicasets, daemonsets, statefulsets]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
- apiGroups: [""]
  resources: [pods, pods/log, secrets, services, configmaps]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
- apiGroups: [""]
  resources: [pods/exec]
  verbs: [create, get, list, watch]
- apiGroups: [batch]
  resources: [jobs, cronjobs]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: chaos-runner-rolebinding
  namespace: harness-delegate-ng
subjects:
- kind: ServiceAccount
  name: chaos-delegate
  namespace: harness-delegate-ng
roleRef:
  kind: Role
  name: chaos-runner-role
  apiGroup: rbac.authorization.k8s.io
```

**3. Chaos `ClusterRole`** (discovery + chaos permissions, applied once per cluster):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: chaos-clusterrole
rules:
# Discovery: find app workloads as chaos candidates; scale during faults
- apiGroups: [apps]
  resources: [deployments, replicasets, daemonsets, statefulsets]
  verbs: [get, list, watch, update]
- apiGroups: [""]
  resources: [replicationcontrollers, services, nodes, namespaces]
  verbs: [get, list, watch]
- apiGroups: [batch]
  resources: [jobs, cronjobs]
  verbs: [get, list, watch]
# Chaos: act on pods + helpers in target namespaces
- apiGroups: [""]
  resources: [pods]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
- apiGroups: [""]
  resources: [pods/log]
  verbs: [get, list, watch]
- apiGroups: [""]
  resources: [pods/exec]
  verbs: [create, get, list, watch]
- apiGroups: [networking.k8s.io]
  resources: [networkpolicies]
  verbs: [create, delete, get, list]
# Optional: metrics. Only needed if a probe calls `kubectl top`.
# Remove this rule (or `metrics-server`) if you do not use metric probes.
- apiGroups: [metrics.k8s.io]
  resources: [pods, nodes]
  verbs: [get, list]
# Optional: OpenShift parent resources. Remove if the target cluster is not OpenShift.
- apiGroups: [apps.openshift.io]
  resources: [deploymentconfigs]
  verbs: [get, list]
# Optional: Argo Rollouts parent resources. Remove if Argo Rollouts is not installed.
- apiGroups: [argoproj.io]
  resources: [rollouts]
  verbs: [get, list]
```

**4. Onboard namespaces.** Either bind cluster-wide (all namespaces) or per app namespace.

Cluster-wide:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: chaos-rolebinding
subjects:
- kind: ServiceAccount
  name: chaos-delegate
  namespace: harness-delegate-ng
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: chaos-clusterrole
```

Per app namespace (repeat per onboarded namespace, replacing `app1` with the namespace name):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: chaos-rolebinding-app1
  namespace: app1
subjects:
- kind: ServiceAccount
  name: chaos-delegate
  namespace: harness-delegate-ng
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: chaos-clusterrole
```

</details>

<details>
<summary>Centralized delegate approach (Delegate outside target cluster)</summary>

Pairs with the [centralized delegate install](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/centralized-delegate). Apply these manifests to the **target cluster** (not the cluster running the Delegate). The Kubernetes connector's service account is the chaos service account.

**1. Service account and token secret:**

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: chaos-sa
  namespace: harness-delegate-chaos
---
apiVersion: v1
kind: Secret
metadata:
  name: chaos-sa-secret
  namespace: harness-delegate-chaos
  annotations:
    kubernetes.io/service-account.name: chaos-sa
type: kubernetes.io/service-account-token
```

Use a dedicated namespace such as `harness-delegate-chaos` on the target cluster.

**2. Namespace `Role` and `RoleBinding`** (chaos runner permissions in the chaos namespace):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: chaos-runner-role
  namespace: harness-delegate-chaos
rules:
- apiGroups: [apps]
  resources: [deployments, replicasets, daemonsets, statefulsets]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
- apiGroups: [""]
  resources: [pods, pods/log, secrets, services, configmaps]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
- apiGroups: [""]
  resources: [pods/exec]
  verbs: [create, get, list, watch]
- apiGroups: [batch]
  resources: [jobs, cronjobs]
  verbs: [create, delete, get, list, patch, update, watch, deletecollection]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: chaos-runner-rolebinding
  namespace: harness-delegate-chaos
subjects:
- kind: ServiceAccount
  name: chaos-sa
  namespace: harness-delegate-chaos
roleRef:
  kind: Role
  name: chaos-runner-role
  apiGroup: rbac.authorization.k8s.io
```

**3. Generate the SA token:**

```bash
kubectl -n harness-delegate-chaos get secret chaos-sa-secret \
  -o jsonpath='{.data.token}' | base64 --decode
```

Use this token plus the cluster master URL (`kubectl cluster-info`) when you create the Kubernetes connector in Harness.

**4. Chaos `ClusterRole`.** Apply the same `chaos-clusterrole` from the in-cluster example above (it is identical for both topologies).

**5. Bind the `ClusterRole`.** Either cluster-wide (chaos can target every namespace) or per onboarded namespace.

Cluster-wide:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: chaos-rolebinding
subjects:
- kind: ServiceAccount
  name: chaos-sa
  namespace: harness-delegate-chaos
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: chaos-clusterrole
```

Per app namespace (repeat per onboarded namespace, replacing `app1` with the namespace name):

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: chaos-rolebinding-app1
  namespace: app1
subjects:
- kind: ServiceAccount
  name: chaos-sa
  namespace: harness-delegate-chaos
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: chaos-clusterrole
```

</details>

## Next steps

- [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes): create the chaos infrastructure that uses these permissions.
- [Network configuration](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/network-config): mTLS and proxy settings for the Delegate and Discovery Agent.
- [Governance and RBAC](/docs/resilience-testing/chaos-testing/governance/rbac): control who in your Harness account can manage chaos resources.
