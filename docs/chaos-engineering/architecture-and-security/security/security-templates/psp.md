---
title: Pod Security Policy
sidebar_position: 3
description: Applying Pod Security Policy to pods in a cluster
redirect_from:
    - /docs/chaos-engineering/technical-reference/security/security-templates/psp
---

This section describes pod security policy and applying pod security policies to the pods in a cluster.
Restrictive policies are often enforced using [pod security policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) (PSP), with organizations opting for the default ["restricted"](https://kubernetes.io/docs/concepts/policy/pod-security-policy/#example-policies) policy.

## Using pod security policies with CE

While working in environments (clusters) that have restrictive security policies, you can inhibit the default HCE experiment execution procedure. This is due to the experiment pods running the chaos injection tasks in privileged mode. This, in turn, is required due to the mounting of container runtime-specific socket files from the Kubernetes nodes to invoke runtime APIs.

This is not required for all experiments (a considerable number of them use purely the K8s API). It is required for experiments that inject chaos processes into the network or process namespaces of other containers (for example, netem, stress).

### Applying pod security policies to HCE pods

To run the HCE pods with the operating characteristics described above, create a custom `PodSecurityPolicy` permitting the same configurations:

[embedmd]:# (https://raw.githubusercontent.com/harness/developer-hub/ed4773f7428e593c93a0cf7aa5a31e6e9c8128f8/docs/chaos-engineering/static/overview/manifest/psp/psp-litmus.yaml yaml)
```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
name: litmus
annotations:
    seccomp.security.alpha.kubernetes.io/allowedProfileNames: '*'
spec:
privileged: true
# Required to prevent escalations to root.
allowPrivilegeEscalation: true
# Allow core volume types.
volumes:
    # To mount script files/templates like ssm-docs in experiment
    - 'configMap'
    # Used for chaos injection like io chaos
    - 'emptyDir'
    - 'projected'
    # To authenticate with different cloud providers
    - 'secret'
    # To derive the experiment pod name in the experimemnt
    - 'downwardAPI'
    # Assume that persistentVolumes set up by the cluster admin are safe to use.
    - 'persistentVolumeClaim'
    # To mount the socket path directory used to perform container runtime operations
    - 'hostPath'

allowedHostPaths:
    # substitutes this path with an appropriate socket path
    # ex: '/var/run/docker.sock', '/run/containerd/containerd.sock', '/run/crio/crio.sock'
    - pathPrefix: "/run/containerd/containerd.sock"
    # substitutes this path with an appropriate container path
    # ex: '/var/lib/docker/containers', '/var/lib/containerd/io.containerd.runtime.v1.linux/k8s.io', '/var/lib/containers/storage/overlay/'
    - pathPrefix: "/var/lib/containerd/io.containerd.runtime.v1.linux/k8s.io"

allowedCapabilities:
    # NET_ADMIN & SYS_ADMIN: used in network chaos experiments to perform
    # network operations (running tc command in network ns of target container).
    - "NET_ADMIN"
    # SYS_ADMIN: used in stress chaos experiment to perform cgroup operations.
    - "SYS_ADMIN"
hostNetwork: false
hostIPC: false
    # To run fault injection on a target container using pid namespace.
    # It is used in stress, network, dns and http experiments.
hostPID: true
seLinux:
    # This policy assumes the nodes are using AppArmor rather than SELinux.
    rule: 'RunAsAny'
supplementalGroups:
    rule: 'MustRunAs'
    ranges:
    # Forbid adding the root group.
    - min: 1
      max: 65535
fsGroup:
    rule: 'MustRunAs'
    ranges:
    # Forbid adding the root group.
    - min: 1
      max: 65535
readOnlyRootFilesystem: false
```

:::tip
This `PodSecurityPolicy` is a sample configuration that works for a majority of the use cases. It is left to your (user) discretion to modify it based on your environment. For example, if the experiment doesn't need the socket file to be mounted, you can exclude the `allowedHostPaths` from the PSP specification. In the case of CRI-O runtime, network-chaos tests need the chaos pods to execute in privileged mode. You can use different PSP configurations in different namespaces based on the chaos experiments installed or executed in them.
:::

### Subscribe to the created PSP
Subscribe to the created PSP in the experiment RBAC (or in the [admin-mode](https://v1-docs.litmuschaos.io/docs/admin-mode/#prepare-rbac-manifest) RBAC), as applicable.
The [pod delete](/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete.md) experiment RBAC instrumented with the PSP is shown below:

[embedmd]:# (https://raw.githubusercontent.com/harness/developer-hub/ed4773f7428e593c93a0cf7aa5a31e6e9c8128f8/docs/chaos-engineering/static/overview/manifest/psp/rbac-psp.yaml yaml)
```yaml
---
apiVersion: v1
kind: ServiceAccount
metadata:
name: pod-delete-sa
namespace: default
labels:
    name: pod-delete-sa
    app.kubernetes.io/part-of: litmus
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
name: pod-delete-sa
namespace: default
labels:
    name: pod-delete-sa
    app.kubernetes.io/part-of: litmus
rules:
- apiGroups: [""]
resources: ["pods","events"]
verbs: ["create","list","get","patch","update","delete","deletecollection"]
- apiGroups: [""]
resources: ["pods/exec","pods/log","replicationcontrollers"]
verbs: ["create","list","get"]
- apiGroups: ["batch"]
resources: ["jobs"]
verbs: ["create","list","get","delete","deletecollection"]
- apiGroups: ["apps"]
resources: ["deployments","statefulsets","daemonsets","replicasets"]
verbs: ["list","get"]
- apiGroups: ["apps.openshift.io"]
resources: ["deploymentconfigs"]
verbs: ["list","get"]
- apiGroups: ["argoproj.io"]
resources: ["rollouts"]
verbs: ["list","get"]
- apiGroups: ["litmuschaos.io"]
resources: ["chaosengines","chaosexperiments","chaosresults"]
verbs: ["create","list","get","patch","update"]
- apiGroups: ["policy"]
resources: ["podsecuritypolicies"]
verbs: ["use"]
resourceNames: ["litmus"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
name: pod-delete-sa
namespace: default
labels:
    name: pod-delete-sa
    app.kubernetes.io/part-of: litmus
roleRef:
apiGroup: rbac.authorization.k8s.io
kind: Role
name: pod-delete-sa
subjects:
- kind: ServiceAccount
name: pod-delete-sa
namespace: default
```

### Verify the results of the chaos experiment
Execute the ChaosEngine and verify that the HCE experiment pods have been created successfully.
