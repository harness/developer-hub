---
title: OpenShift
sidebar_label: OpenShift
sidebar_position: 60
description: Run Kubernetes chaos infrastructure on OpenShift, including the Security Context Constraint (SCC) the chaos service account needs and the CRI-O fault tunables.
keywords:
  - openshift
  - SCC
  - security context constraint
  - CRI-O
  - chaos infrastructure
  - DDCR
tags:
  - chaos-engineering
  - infrastructure
  - kubernetes
  - openshift
redirect_from:
  - /docs/chaos-engineering/guides/infrastructures/types/legacy-infra/openshift
  - /docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/openshift
  - /docs/resilience-testing/chaos-testing/infrastructure/kubernetes-harness/openshift
---

OpenShift runs the same Delegate-Driven Chaos Runner (DDCR) as any other Kubernetes target, but adds two product-level requirements:

- The chaos service account must be bound to a **Security Context Constraint (SCC)** that allows host PID, host network, and the privileged operations that stress, network, DNS, and HTTP faults rely on.
- Faults that interact with the container runtime must be told to use **CRI-O** instead of `containerd` or `docker`.

This page covers the SCC manifest, how to bind it to the chaos service account, and the CRI-O fault tunables. Use it on top of the standard install instructions for either the [Dedicated delegate](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/dedicated-delegate) or [Centralized delegate](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/centralized-delegate) approach.

---

## Before you begin

- **OpenShift cluster** with `oc` configured against it. The SCC binding command runs as `system:admin`. Tested against OpenShift 4.x; the SCC API is `security.openshift.io/v1`.
- **Harness Delegate** installed by your standard install flow (dedicated or centralized). Go to [Set up Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes) for the platform-agnostic steps.
- **The chaos service account already exists.** Either it is the Delegate's own service account (dedicated install) or the service account behind your Kubernetes connector (centralized install). Go to [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions) for the standard RBAC.

:::tip Scope down if you only run pod-level chaos
The SCC below grants every privilege the full Harness chaos fault catalog needs. If your account only runs pod-level faults such as `pod-delete`, `pod-cpu-hog-exec`, or `pod-memory-hog-exec`, you can drop `allowHostPID`, `allowHostNetwork`, the `NET_ADMIN` and `SYS_ADMIN` capabilities, and `allowPrivilegedContainer` from the manifest. Go to [Step 2](#step-2-apply-the-litmus-scc) to see which fault category each privilege unlocks.
:::

---

## Step 1. Create the chaos namespace

Pick a namespace for the chaos runner. The examples below use `hce`, but any namespace works as long as the chaos service account lives there.

```bash
oc create ns hce
```

If the chaos service account is in a namespace that already exists (for example `harness-delegate-ng` for the dedicated delegate install), skip this step.

---

## Step 2. Apply the Litmus SCC

The Security Context Constraint below grants the privileges chaos needs to run network, stress, DNS, and HTTP faults on OpenShift.

### What this SCC grants and why

| SCC field | Why chaos needs it | Affected fault categories |
|---|---|---|
| `allowHostDirVolumePlugin: true` | Mount the container runtime socket (`/run/crio/crio.sock`) into the helper pod. | `pod-network-*`, `pod-stress-*`, `pod-dns-*`, `pod-http-*` |
| `allowHostNetwork: true` | Resolve target container interfaces from the host network namespace. | `pod-network-*`, `pod-dns-*`, `pod-http-*` |
| `allowHostPID: true` | Enter the target container's PID namespace to inject the fault. | `pod-network-*`, `pod-stress-*`, `pod-dns-*`, `pod-http-*` |
| `allowPrivilegeEscalation: true` and `allowPrivilegedContainer: true` | Run `tc`, `iptables`, and cgroup mutations inside the target's namespaces. | `pod-network-*`, `pod-stress-*`, `pod-dns-*` |
| `allowedCapabilities: [NET_ADMIN, SYS_ADMIN]` | `NET_ADMIN` for `tc` and `iptables` rules; `SYS_ADMIN` for cgroup operations. | `pod-network-*` (NET_ADMIN), `pod-stress-*` (SYS_ADMIN) |
| `runAsUser.type: RunAsAny` | Helper pod starts as root to mount the runtime socket; drops privileges immediately after. | All runtime-touching faults |

Pod-only faults (`pod-delete`, `pod-autoscaler`, `pod-io-stress`) only need the default `restricted-v2` SCC and can skip this manifest.

```yaml
apiVersion: security.openshift.io/v1
kind: SecurityContextConstraints
# To mount the socket path directory in the helper pod.
allowHostDirVolumePlugin: true
allowHostIPC: false
allowHostNetwork: true
# To run fault injection on a target container using the pid namespace.
# Used in stress, network, dns, and http experiments.
allowHostPID: true
allowHostPorts: false
allowPrivilegeEscalation: true
# To run privileged modules in dns, stress, and network chaos.
allowPrivilegedContainer: true
# NET_ADMIN + SYS_ADMIN: used in network chaos experiments to run `tc`
# inside the target container's network namespace.
# SYS_ADMIN: used in stress chaos for cgroup operations.
allowedCapabilities:
  - NET_ADMIN
  - SYS_ADMIN
defaultAddCapabilities: null
fsGroup:
  type: MustRunAs
groups: []
metadata:
  name: litmus-scc
priority: null
readOnlyRootFilesystem: false
requiredDropCapabilities: null
runAsUser:
  type: RunAsAny
seLinuxContext:
  type: MustRunAs
supplementalGroups:
  type: RunAsAny
users: []
volumes:
  - configMap
  - downwardAPI
  - emptyDir
  - hostPath
  - persistentVolumeClaim
  - projected
  - secret
```

Save the manifest as `litmus-scc.yaml` and apply it:

```bash
oc apply -f litmus-scc.yaml
```

Expected output:

```
securitycontextconstraints.security.openshift.io/litmus-scc created
```

---

## Step 3. Bind the SCC to the chaos service account

Bind `litmus-scc` to the chaos service account in the namespace you chose. Replace `<SERVICE-ACCOUNT-NAME>` and `<CHAOS-NAMESPACE>` to match your install:

| Install topology | `<SERVICE-ACCOUNT-NAME>` | `<CHAOS-NAMESPACE>` |
|---|---|---|
| Dedicated delegate (Delegate inside the target cluster) | The Delegate's service account, for example `chaos-delegate` | The Delegate's namespace, for example `harness-delegate-ng` |
| Centralized delegate (Delegate outside the target cluster) | The connector's service account, for example `chaos-sa` | The chaos namespace on the target cluster, for example `harness-delegate-chaos` |

```bash
oc adm policy add-scc-to-user litmus-scc \
  -z <SERVICE-ACCOUNT-NAME> \
  --as system:admin \
  -n <CHAOS-NAMESPACE>
```

Expected output:

```
clusterrole.rbac.authorization.k8s.io/system:openshift:scc:litmus-scc added: ["<SERVICE-ACCOUNT-NAME>"]
```

---

## Step 4. Verify the binding

Confirm the binding took effect:

```bash
oc get scc litmus-scc -o yaml | grep -A 2 'users:'
```

The chaos service account should be listed under `users:`. If it is missing, re-run the `add-scc-to-user` command with the correct `-z` and `-n` values.

---

## Step 5. Set CRI-O fault tunables

OpenShift uses CRI-O instead of `containerd` or `docker`. Faults that touch the container runtime (network, stress, DNS, HTTP) read three environment variables to pick the right socket.

Before configuring the fault, confirm the CRI-O socket exists on the nodes where the helper pod will run:

```bash
oc debug node/<NODE-NAME> -- chroot /host ls -l /run/crio/crio.sock
```

The command should return a non-empty path with a `socket` file type. If the socket is missing, the node is not running CRI-O and the fault will fail with `failed to connect to runtime socket`.

Then set the three environment variables on the relevant faults before executing experiments:

```yaml
env:
  - name: CONTAINER_RUNTIME
    value: crio
  - name: SOCKET_PATH
    value: /run/crio/crio.sock
  - name: SET_HELPER_DATA
    value: "false"
```

Apply the env block under `spec.experiments[].spec.components.env` in the experiment YAML, or set the same three keys in the UI fault tunables. If you skip this step, the fault either fails to find the container runtime or operates against the wrong socket.

---

## Verify the install with a smoke test

Run a pod-level fault first (no SCC privileges required) to confirm the chaos service account, Delegate, and runner are all wired up. A `pod-delete` against a non-critical workload is the fastest check. Once that passes, run a `pod-network-latency` against the same workload to confirm the SCC binding and CRI-O tunables took effect. Go to [Get started with Chaos](/docs/resilience-testing/chaos-testing/get-started) to walk through the experiment creation flow.

---

## Next steps

- [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions): standard chaos RBAC reference; OpenShift uses the same `ClusterRole` and `Role` manifests.
- [Dedicated delegate approach](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/dedicated-delegate): install the Delegate inside the OpenShift cluster.
- [Centralized delegate approach](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/centralized-delegate): orchestrate OpenShift from a Delegate on a separate cluster.
