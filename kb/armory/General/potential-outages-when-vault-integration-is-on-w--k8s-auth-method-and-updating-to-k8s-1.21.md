---
title: Potential outages when Vault integration is on (w/ K8s auth method) and updating to K8s 1.21
---

## Issue
On Kubernetes 1.21 the [ServiceAccount Issuer Discovery feature](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#service-account-issuer-discovery) is on stable release and is enabled by default. This means that the JSON Web Token (JWT) format of the service accounts is changing to have a more secure formatPrevious format:

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
The change in formatting will potentially break the Vault Kubernetes authentication method depending on the Vault Kubernetes backend configuration, throwing the message:

```ISS claim invalid```

 
Therefore, this will cause Spinnaker and Spinnaker-operator not to be able to retrieve secrets from Vault.

