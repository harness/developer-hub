---
description: KB - Grant a Delegate cross-namespace access for container steps
title: Cross-namespace access for Harness Delegates
---

## Install delegate

[Install a delegate](https://developer.harness.io/docs/platform/delegates/install-delegates/overview/#install-the-helm-chart) into your kubernetes cluster using helm.

The service account created via the delegate helm chart has the same as the delegate.

## Create Role

Create a Role in the target namespace with the nessesary permissions launch container based steps:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: harness-container-steps
  namespace: target
rules:
  - apiGroups: [""]
    resources: ["pods", "secrets"]
    verbs: ["get", "list", "watch", "create", "update", "delete"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["list", "watch"]
```

## Create RoleBinding

Create a RoleBinding object in the target namespace to bind the Role to the delegate service account:

```
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: harness-container-steps
  namespace: target
subjects:
  - kind: ServiceAccount
    name: <delegate service account name>
    namespace: <delegate namspace>
roleRef:
  kind: Role
  name: harness-container-steps
  apiGroup: rbac.authorization.k8s.io
```

## Conclusion

Now the delegate service account has access to create pods for Harness CI/IacM/Container Steps in the target namespace.
