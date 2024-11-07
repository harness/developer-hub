---
title: Restrict Discovery to Specific Namespace(s)
sidebar_position: 3
description: Restrict Discovery to Single and Multiple Namespaces.
redirect_from:
  - /docs/chaos-engineering/concepts/explore-concepts/service-discovery/user-defined-service-account
---

This topic describes how you can use user-defined service accounts in different scopes to discover services. You can create the necessary roles in your cluster, and provide the service account name in the UI.

### Cluster Scope
In this scope, the service account is created by default and the discovery runs in cluster scope by default.

:::tip
This is the default mode of operation and if you want to create service account, refer to the YAML below and provide the service account name in the UI.
:::

<details>
<summary> Cluster Scope </summary>

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cluster-discovery
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: da-mgmt
  namespace: hce-sa
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - create
  - delete
  - get
  - list
- apiGroups:
  - ""
  resources:
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
```

The YAML below describes how the role `da-discovery` is created in cluster scope and how RoleBinding is used with the role `da-mgmt`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: da-discovery
rules:
- apiGroups:
  - apps
  resources:
  - deployments
  - replicasets
  - daemonsets
  - statefulsets
  verbs:
  - watch
  - list
  - get
- apiGroups:
  - ""
  resources:
  - pods
  - replicationcontrollers
  - services
  - statefulsets
  - nodes
  - namespaces
  verbs:
  - watch
  - list
  - get
- apiGroups:
  - batch
  resources:
  - jobs
  - cronjobs
  verbs:
  - watch
  - list
  - get
```

The YAML describes how RoleBinding is used with the role `da-mgmt`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: da-mgmt
  namespace: hce-sa
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: da-mgmt
subjects:
- kind: ServiceAccount
  name: cluster-discovery
  namespace: hce-sa
```

The YAML describes how ClusterRoleBinding is used with the cluster role `da-discovery`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: da-discovery
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: da-discovery
subjects:
- kind: ServiceAccount
  name: cluster-discovery
  namespace: hce-sa
```

:::tip
The `da-mgmt` role is common to all ways creating service account for discovered services because managing the discovery is required for all scopes.
:::

</details>

### Single Namespace Scope
When you want to discover resources from a particular namespace, you can create a service account with the role, `da-mgmt`. This role is bound to the service account.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: namespace-discovery
```

The role `da-mgmt` is required during the process of service discovery to manage the discovery process.

To manage the entire process of discovery, it is required to create pods that are transient. Hence, the role `da-mgmt` is created (that is common to all modes) that is described below.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: da-mgmt
  namespace: hce-sa
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - create
  - delete
  - get
  - list
- apiGroups:
  - ""
  resources:
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
```

To discover services and metadata associated with it, you need to create a role `da-discovery`.
The YAML below describes creating a role `da-discovery` in the namespace `hce-sa`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: da-discovery
  namespace: hce-sa
rules:
- apiGroups:
  - apps
  resources:
  - deployments
  - replicasets
  - daemonsets
  - statefulsets
  verbs:
  - watch
  - list
  - get
- apiGroups:
  - ""
  resources:
  - pods
  - replicationcontrollers
  - services
  - statefulsets
  verbs:
  - watch
  - list
  - get
- apiGroups:
  - batch
  resources:
  - jobs
  - cronjobs
  verbs:
  - watch
  - list
  - get
```

The YAML below describes how the `da-mgmt` RoleBinding is applied to service account `namespace-discovery`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: da-mgmt
  namespace: hce-sa
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: da-mgmt
subjects:
- kind: ServiceAccount
  name: namespace-discovery
  namespace: hce-sa
```

The YAML below describes how the `da-discovery` role is bound to service account `namespace-discovery`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: da-discovery
  namespace: hce-sa
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: da-discovery
subjects:
- kind: ServiceAccount
  name: namespace-discovery
  namespace: hce-sa
```

### Multiple Namespaces

You can add [multiple namespaces in the UI](#multiple-namespace-scope) by selecting the **Inclusion** option in the UI. To exclude certain namespaces, select **Exclusion** and specify namespaces to exclude from the service discovery process.

The `da-mgmt` role remains constant, to help manage service discovery process.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: multiple-namespace-discovery
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: da-mgmt
  namespace: hce-sa
rules:
- apiGroups:
  - ""
  resources:
  - pods
  verbs:
  - create
  - delete
  - get
  - list
- apiGroups:
  - ""
  resources:
  - pods/log
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: da-mgmt
  namespace: hce-sa
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: da-mgmt
subjects:
- kind: ServiceAccount
  name: multiple-namespace-discovery
  namespace: hce-sa
```

The YAML below describes how the cluster role `da-discovery` is configured to discover services and metadata associated with it.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: da-discovery
rules:
- apiGroups:
  - apps
  resources:
  - deployments
  - replicasets
  - daemonsets
  - statefulsets
  verbs:
  - watch
  - list
  - get
- apiGroups:
  - ""
  resources:
  - pods
  - replicationcontrollers
  - services
  - statefulsets
  verbs:
  - watch
  - list
  - get
- apiGroups:
  - batch
  resources:
  - jobs
  - cronjobs
  verbs:
  - watch
  - list
  - get
```

If you want to have multiple namespaces when discovering services, you can create RoleBindings to bind the cluster role with the specific namespace.
To enable discovery for two namespaces, say `hce` and `cert-manager`, you need two role bindings.
The YAML below describes how you can achieve this.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: da-discovery
  namespace: hce
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: da-discovery
subjects:
- kind: ServiceAccount
  name: multiple-namespace-discovery
  namespace: hce-sa
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: da-discovery
  namespace: cert-manager
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: da-discovery
subjects:
- kind: ServiceAccount
  name: multiple-namespace-discovery
  namespace: hce-sa
```

### Additional Permissions for Multiple Namespaces

To discover traffic on multiple namespaces, additional permissions are necessary.
Without the additional permissions, connectivity can't be discovered in single and multiple namespaces.

The YAML below describes how you can attach additional permissions with the existing service account.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: da-discovery-extra
rules:
- apiGroups:
  - ""
  resources:
  - nodes
  verbs:
  - watch
  - list
  - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: da-discovery-extra
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: da-discovery-extra
subjects:
- kind: ServiceAccount
  name: multiple-namespace-discovery
  namespace: hce-sa
```

Once you create the necessary roles in your cluster, add the service account name in the UI. Follow the steps below.

1. Go to **Chaos** module and select **Projects**. Select **Discovery** and click **New Discovery Agent**.

  ![](./static/proxy/sd-1.png)

2. Provide the **Environment**, **Infrastructure**, **Discovery Agent Name**, and **Namespace**.

  ![](./static/proxy/sd-2.png)

:::info note
In case of cluster scope, you can provide the service account name in the UI to discover services.
:::

### Single Namespace Scope
To use single namespace, select **Inclusion** and provide the namespace. Disable the **Detect network trace connectivity**.

  ![](./static/proxy/sd-4.png)

### Multiple Namespace Scope

To use multiple namespaces, provide multiple namespaces and click **Create New Discovery Agent**.

  ![](./static/proxy/sd-5.png)

:::tip
- If you are not using additional permissions, disable the **Detect network trace connectivity** (it is enabled by default that corresponds to single namespace scope).
:::