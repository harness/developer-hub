---
title: K8s v1.21 causing Valut intergation outages (with kuberenetes auth method)
---

## Issue
On ```Kubernetes 1.21```, the ServiceAccount issuer Discovery [feature](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-issuer-discovery) is on stable release and is enabled by default. 

This means that the ***JWT format of the service accounts is changing to have a more secure format***.


Previous format:
```
{
  "iss": "kubernetes/serviceaccount",
  "kubernetes.io/serviceaccount/namespace": "spinnaker",
  "kubernetes.io/serviceaccount/secret.name": "test-token-5v2cp",
  "kubernetes.io/serviceaccount/service-account.name": "test",
  "kubernetes.io/serviceaccount/service-account.uid": "0ecb5560-7d43-4883-ae85-d07cf635d2d2",
  "sub": "system:serviceaccount:spinnaker:test"
}
```

New format:
```
{
  "aud": [
    "https://kubernetes.default.svc"
  ],
  "exp": 1661509326,
  "iat": 1629973326,
  "iss": "https://oidc.server.something",
  "kubernetes.io": {
    "namespace": "spinnaker",
    "pod": {
      "name": "debugging-tools-6464df994b-46wsq",
      "uid": "90451169-29cb-4e2d-8ee8-4c1e2c293a3c"
    },
    "serviceaccount": {
      "name": "test",
      "uid": "affc78ef-fa4b-4ba8-bb00-f9cc51d65408"
    },
    "warnafter": 1629976933
  },
  "nbf": 1629973326,
  "sub": "system:serviceaccount:spinnaker:test"
} 
```

## Cause
This breaks the vault ***kubernetes auth method*** with vault throwing the message:```***ISS claim invalid***```

This is causing Spinnaker and Spinnaker-operator not to be able to retrieve secrets from Vault***``````***

