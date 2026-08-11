---
title: Air-gapped installation
sidebar_label: Air-Gapped Install
description: Install the Harness Platform Installer in air-gapped environments with a private registry.
sidebar_position: 3
keywords:
  - air-gapped
  - offline install
  - private registry
  - image mirroring
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic covers installing the Harness Platform Installer in air-gapped (offline) environments.

In air-gapped mode, all container images are pre-loaded into a private registry. The installer pulls images from your private registry.

---

## Step 1: Download Required Artifacts

Download from the Harness Artifact Registry (from a machine with internet access):

**Clustermgr CLI:**

```bash
curl -L -o harness-clustermgr.tgz \
  "https://pkg.harness.io/pkg/G_iX-gJ_SiSGIITUoe06eQ/platform-installer/files/harness-clustermgr/<VERSION>/harness-clustermgr-<VERSION>-linux-amd64.tgz"
```

**Workflow Bundle (needed during platform upgrade):**

```bash
curl -L -o workflow-<VERSION>.tgz \
  "https://pkg.harness.io/pkg/G_iX-gJ_SiSGIITUoe06eQ/platform-installer-workflow/files/harness-workflow/<VERSION>/workflow-<VERSION>.tgz"
```

:::note Workflow Version

The workflow version mirrors the Harness SMP version.

:::

---

## Step 2: Mirror Images to Your Private Registry

### Required Images

| Image | Source Registry | Version Matches | Required |
| --- | --- | --- | --- |
| `platform-installer-min` | `pkg.harness.io/.../cxe-public-docker` | clustermgr (e.g., `1.0.6`) | Always |
| `tiw-airgap` | `pkg.harness.io/.../cxe-public-docker` | workflow (e.g., `0.43.0`) | Always |
| `ingress-nginx/controller` | `registry.k8s.io` | `v1.15.1` | When using nginx ingress (default) |
| `ingress-nginx/kube-webhook-certgen` | `registry.k8s.io` | `v1.6.9` | When using nginx ingress (default) |
| `release/pilot` | `registry.istio.io` | `1.30.3` | When using Istio (`-i istioInstall=true`) |
| `release/proxyv2` | `registry.istio.io` | `1.30.3` | When using Istio (`-i istioInstall=true`) |

### Push Installer Images

```bash
REGISTRY="your-private-registry.example.com"
PREFIX="harness"
CLUSTERMGR_VERSION="1.0.6"
WORKFLOW_VERSION="0.43.0"

docker login $REGISTRY

# 1. Platform installer
docker pull pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/platform-installer-min:$CLUSTERMGR_VERSION
docker tag pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/platform-installer-min:$CLUSTERMGR_VERSION $REGISTRY/$PREFIX/platform-installer-min:$CLUSTERMGR_VERSION
docker push $REGISTRY/$PREFIX/platform-installer-min:$CLUSTERMGR_VERSION

# 2. Workflow bundle image
docker pull pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/tiw-airgap:$WORKFLOW_VERSION
docker tag pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/tiw-airgap:$WORKFLOW_VERSION $REGISTRY/$PREFIX/tiw-airgap:$WORKFLOW_VERSION
docker push $REGISTRY/$PREFIX/tiw-airgap:$WORKFLOW_VERSION
```

### Push Nginx Ingress Images (default ingress)

```bash
# 3. Nginx controller
docker pull registry.k8s.io/ingress-nginx/controller:v1.15.1
docker tag registry.k8s.io/ingress-nginx/controller:v1.15.1 $REGISTRY/$PREFIX/controller:v1.15.1
docker push $REGISTRY/$PREFIX/controller:v1.15.1

# 4. Webhook cert generator
docker pull registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.6.9
docker tag registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.6.9 $REGISTRY/$PREFIX/kube-webhook-certgen:v1.6.9
docker push $REGISTRY/$PREFIX/kube-webhook-certgen:v1.6.9
```

### Push Istio Images (only if using Istio)

```bash
ISTIO_VERSION="1.30.3"

# 5. istiod (pilot)
docker pull registry.istio.io/release/pilot:$ISTIO_VERSION
docker tag registry.istio.io/release/pilot:$ISTIO_VERSION $REGISTRY/$PREFIX/pilot:$ISTIO_VERSION
docker push $REGISTRY/$PREFIX/pilot:$ISTIO_VERSION

# 6. Istio proxy (ingress gateway)
docker pull registry.istio.io/release/proxyv2:$ISTIO_VERSION
docker tag registry.istio.io/release/proxyv2:$ISTIO_VERSION $REGISTRY/$PREFIX/proxyv2:$ISTIO_VERSION
docker push $REGISTRY/$PREFIX/proxyv2:$ISTIO_VERSION
```

:::info Image Versions

- `platform-installer-min` version matches the **clustermgr** version (e.g., `1.0.6`)
- `tiw-airgap` version matches the **workflow** version (e.g., `0.43.0`)
- Nginx images: `controller:v1.15.1`, `kube-webhook-certgen:v1.6.9`
- Istio images: `pilot:1.30.3`, `proxyv2:1.30.3` from `registry.istio.io/release`

:::

For 0.41.0+, Harness uses a signed `manifest.yaml` with per-module download URLs instead of public bundles. See the [Harness air-gap guide](https://developer.harness.io/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment#choose-your-helm-chart-line) for details.

---

## Step 3: Run Installation

:::note Helm-based air-gapped install

See the [Install Guide](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator) for the Helm-based air-gapped install steps (under **Step 2 → helm → Air-gapped install** under **helm** tab).

:::

<Tabs>
<TabItem value="clustermgr-t1" label="clustermgr" default>

```bash
./clustermgr install-pi \
  --dns platform.internal.example.com \
  --namespace harness \
  --registry-host harbor.internal.example.com \
  --registry-prefix harness-platform \
  --registry-user admin \
  --registry-password 'Harbor@123' \
  --email admin@example.com \
  --password 'SecurePass123!' \
  --version 0.43.0 \
  --pi-set cluster.triggerInstall=false \
  --pi-set cluster.tfi.storageClass=local-path \
  --pi-set cluster.profile=medium \
  -i airgap=true
```

**Air-Gap with Istio:**

```bash
./clustermgr install-pi \
  --dns platform.internal.example.com \
  --registry-host harbor.internal.example.com \
  --registry-prefix harness-platform \
  --registry-user admin \
  --registry-password 'Harbor@123' \
  --version 0.43.0 \
  --pi-set cluster.triggerInstall=false \
  --pi-set cluster.profile=medium \
  -i ingressType=istio \
  -i istioInstall=true \
  -i airgap=true
```

</TabItem>
</Tabs>

---

## Registry Flags Reference

| Flag | Description | Example |
| --- | --- | --- |
| `--registry-host` | Registry hostname (can include namespace suffix) | `registry.example.com` or `registry.example.com/namespace` |
| `--registry-prefix` | Path prefix within the registry | `harness-platform` |
| `--registry-user` | Registry username | `admin` |
| `--registry-password` | Registry password or token | `pat.xxx.xxx` |
