---
title: Infrastructure settings
sidebar_label: Infrastructure settings
sidebar_position: 35
description: Reference for the Settings panel exposed when you create or edit a Kubernetes (Harness Infrastructure) chaos infrastructure.
keywords:
  - infrastructure settings
  - chaos infrastructure
  - kubernetes
  - service account
  - security context
  - node selector
  - toleration
  - resource requirements
  - image registry
tags:
  - chaos-engineering
  - infrastructure
  - kubernetes
---

The **Settings** panel appears when you create or edit a **Kubernetes (Harness Infrastructure)** chaos infrastructure. It controls where the chaos runner deploys, which identity it runs as, how it reaches the Harness control plane, and how its pods are scheduled and shaped. Every setting has a working default, so you configure only what your cluster requires.

---

## What you will learn

- What each section of the Settings panel controls.
- Which settings are required and which are optional.
- Where to go for the in-depth mTLS and proxy setup.

---

## Where to find these settings

To open the Settings panel on an existing infrastructure:

1. Go to **Resilience Testing → Project Settings → Resilience Testing Infrastructures**.
2. Select the **Kubernetes (Harness Infrastructure)** tab.
3. Open the infrastructure, either by clicking its name or by clicking the **⋮** menu on its row and selecting **Edit**.
4. On the **Overview** tab, the **Settings** panel is on the right. Expand each section described below to configure it.
5. Click **Save** to apply changes.

The same panel also appears during the create flow. Go to [Dedicated delegate approach](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/dedicated-delegate) or [Centralized delegate approach](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/centralized-delegate) for the full create steps.

:::tip YAML mode
The infrastructure detail page has a **YAML** tab next to **Overview**. It shows the same settings as raw YAML, which you can edit directly or commit to Git.
:::

---

## General settings

| Setting | Required | Description |
|---|---|---|
| **Enable AI** | No | Allow Harness AI to provide tailored recommendations for chaos experiments and system vulnerabilities. Off by default. |
| **Namespace** | Yes | The namespace where the chaos runner and helper pods deploy. The service account you reference must exist in this namespace. |
| **Use static name for configmap and secret** | No | Give the generated ConfigMap and Secret fixed names instead of generated ones. Enable this when a GitOps or policy workflow needs to reference them by a predictable name, and for **GKE Autopilot** clusters. |

---

## Security

Controls the identity and TLS behavior of the chaos runner.

| Setting | Required | Description |
|---|---|---|
| **Use this Service Account** | Yes | The Kubernetes service account the chaos runner uses. It must exist in the target namespace and carry the RBAC the faults need. Go to [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions) for the required `ClusterRole` and `Role` definitions. |
| **Skip SSL Certificate Validation** | No | Skip TLS verification on calls to the Harness control plane. Use only for testing against a cluster with self-signed certificates. Leave off in production. |

---

## Security context

Sets the pod-level `securityContext` for the chaos runner. Leave both fields empty to use the image defaults.

| Setting | Required | Description |
|---|---|---|
| **Run as user** | No | The UID the runner container runs as, for example `2000`. Set this when your cluster enforces a non-root UID through Pod Security Admission or an equivalent policy. |
| **Run as group** | No | The GID the runner container runs as, for example `2000`. |

---

## mTLS

Add mutual TLS on top of the default Harness token authentication. All fields are optional and left empty unless your cluster routes traffic through an mTLS endpoint.

| Setting | Required | Description |
|---|---|---|
| **Agent URL** | No | The mTLS endpoint the runner connects to, for example `https://agent.url`. |
| **Certificate Secret Name** | No | The Kubernetes secret that holds the client certificate and key. |
| **Certificate Path** | No | Path to the client certificate inside the mounted secret, for example `crt.crt`. |
| **Certificate Key Path** | No | Path to the client key inside the mounted secret, for example `key.crt`. |

Go to [Network configuration](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/network-config#use-mtls-with-ddcr-and-the-discovery-agent) to set up the secret and endpoint end to end.

---

## Proxy

Route the runner's outbound traffic through a proxy when the cluster cannot reach the Harness control plane directly. All fields are optional.

| Setting | Required | Description |
|---|---|---|
| **Proxy URL** | No | The proxy endpoint for Harness control-plane traffic, for example `https://proxy.url`. |
| **HTTP** | No | Value for the `HTTP_PROXY` environment variable. |
| **HTTPS** | No | Value for the `HTTPS_PROXY` environment variable. |
| **No Proxy** | No | Comma-separated list of hosts that bypass the proxy. Include the in-cluster `kubernetes` service so intra-cluster traffic is not proxied. |

Go to [Network configuration](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/network-config#configure-proxy-settings) for proxy and Harness Network Proxy (HNP) details.

---

## Scheduling and pod shape

These sections shape how the chaos runner pods are scheduled and what they mount. Each is a toggle that reveals the corresponding fields when enabled, and all default to off.

| Section | Toggle | Description |
|---|---|---|
| **Topology** | **Add NodeSelector in Chaos Infrastructure deployment** | Pin the runner to nodes that match the given labels. |
| **Topology** | **Add Toleration in Chaos Infrastructure deployment** | Let the runner schedule onto tainted nodes. |
| **Volumes** | **Add Volumes in Chaos Infrastructure deployment** | Attach extra volumes to the runner pods. |
| **Volumes** | **Add VolumeMounts in Chaos Infrastructure deployment** | Mount the attached volumes into the runner container. |
| **Labels and Annotations** | **Add Labels in Chaos Infrastructure deployment** | Apply custom labels to the runner pods. |
| **Labels and Annotations** | **Add Annotations in Chaos Infrastructure deployment** | Apply custom annotations to the runner pods. |
| **Env** | **Add Envs in Chaos Infrastructure deployment** | Inject extra environment variables into the runner container. |
| **Containers** | **Add InitContainers and Sidecars in Chaos Infrastructure deployment** | Add init containers or sidecars alongside the runner. |

---

## Resource requirements

Enable **Set CPU and Memory resource limits and requests** to override the default runner resource footprint. Go to [Kubernetes infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes#resource-requirements) for the default requests and limits and the helper pod footprint.

---

## Image registry

By default the chaos runner pulls images using the values inherited from **Project Settings** (for example, server `docker.io`, account `harness`, type `Public`).

| Setting | Required | Description |
|---|---|---|
| **Add custom Image Registry values to your infrastructure** | No | Override the inherited registry for this infrastructure only. |
| **Use custom images** | No | Point the runner at your own mirrored chaos images. Enable this in air-gapped or registry-restricted clusters. |

---

## Related concepts

- [Dedicated delegate approach](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/dedicated-delegate): install flow that exposes this panel.
- [Network configuration](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/network-config): full mTLS and proxy setup.
- [Cluster permissions](/docs/resilience-testing/chaos-testing/infrastructure/kubernetes/permissions): RBAC the service account needs.
