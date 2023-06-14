---
title: Kyverno
sidebar_position: 3
---
[Kyverno policies](https://kyverno.io/policies/pod-security/) block configurations that don't match a policy (enforce mode) or can generate policy violations (audit mode). It scans existing configurations and reports violations in the cluster.
CE recommends using the provided policy configuration to enable the execution of all supported (out-of-the-box) experiments listed in the Enterprise chaos hub. This is only a recommendation and left to user discretion depending on the experiments desired.

The details listed here are expected to aid users of Kyverno. If you are using alternate means to enforce runtime security, such as native Kubernetes PSPs (pod security policies), go [here](psp).

## Policies in CE

CE recommends using the following policies:

1. [Add capabilities](./manifest/kyverno-policies/allow-capabilities-for-litmus-experiments-which-uses-runtime-api.yaml): It restricts add capabilities except the `NET_ADMIN` and `SYS_ADMIN` for the pods that use runtime API.
2. [Host namespaces](./manifest/kyverno-policies/allow-host-namespaces-for-litmus-experiments-which-uses-runtime-api.yaml): It validates following host namespaces for the pods that use runtime API.
    1. HostPID: It allows hostPID. It should be set to `true`.
    2. HostIPC: It restricts the host IPC. It should be set to `false`.
    3. HostNetwork: It restricts the hostNetwork. It should be set to `false`.
3. [Host paths](./manifest/kyverno-policies/allow-host-paths-for-litmus-experiments-which-uses-hostPaths.yaml): It restricts hostPath except the `socket-path` and `container-path` host paths for the pods that uses runtime API. It allows hostPaths for service-kill experiments.
4. [Privilege escalation](./manifest/kyverno-policies/allow-privilege-escalation-for-litmus-experiments-which-uses-runtime-api.yaml): It restricts privilege escalation except for the pods that use runtime API.
5. [Privilege container](./manifest/kyverno-policies/allow-privileged-containers-for-litmus-experiments-which-uses-runtime-api.yaml): It restricts privileged containers except for the pods that use runtime API.
6. [User groups](./manifest/kyverno-policies/allow-user-groups-for-litmus-experiments.yaml): It allows users groups for all the experiment pods.

## Install policies

Kyverno policies are based on the [Kubernetes pod security standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) definitions. It is recommended that you apply all the pod security policies. To apply all the pod security policies, [install Kyverno](https://kyverno.io/docs/installation/) and [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/binaries/), and run:

```bash
kustomize build https://github.com/litmuschaos/chaos-charts/security/kyverno-policies | kubectl apply -f -
```

## Pod security policies in restricted setup

If a setup contains restricted policies, it will not allow CE experiments to be executed by default. For example, [disallow-privilege-escalation](https://kyverno.io/policies/pod-security/restricted/disallow-privilege-escalation/disallow-privilege-escalation/) policy doesn't allow privileged escalation. It denies all the pods of privileged escalation.

To allow CE pods to use the privileged escalation, add the CE service acccount or ClusterRole or Role inside the exclude block as:

[embedmd]:# (https://raw.githubusercontent.com/harness/developer-hub/ed4773f7428e593c93a0cf7aa5a31e6e9c8128f8/docs/chaos-engineering/static/overview/manifest/kyverno-policies/restricted-policies.yaml yaml)
```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privilege-escalation
  annotations:
    policies.kyverno.io/category: Pod Security Standards (Restricted)
    policies.kyverno.io/severity: medium
    policies.kyverno.io/subject: Pod
    policies.kyverno.io/description: >-
      Privilege escalation, such as via set-user-ID or set-group-ID file mode, should not be allowed.
      This policy ensures the `allowPrivilegeEscalation` fields are either undefined
      or set to `false`.      
spec:
  background: true
  validationFailureAction: enforce
  rules:
  - name: disallow-privilege-escalation
    match:
      resources:
        kinds:
        - Pod
    exclude:
      clusterRoles:
      # add litmus cluster roles here
      - litmus-admin
      roles:
      # add litmus roles here
      - litmus-roles
      subjects:
      # add serviceAccount name here
      - kind: ServiceAccount
        name: pod-network-loss-sa
    validate:
      message: >-
        Privilege escalation is disallowed. The fields
        spec.containers[*].securityContext.allowPrivilegeEscalation, and
        spec.initContainers[*].securityContext.allowPrivilegeEscalation must
        be undefined or set to `false`.        
      pattern:
        spec:
          =(initContainers):
          - =(securityContext):
              =(allowPrivilegeEscalation): "false"
          containers:
          - =(securityContext):
              =(allowPrivilegeEscalation): "false"
```
