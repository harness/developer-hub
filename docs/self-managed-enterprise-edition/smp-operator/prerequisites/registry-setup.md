---
title: Registry setup
sidebar_label: Registry Setup
description: Configure image registry credentials for online and air-gapped SMP Operator installations.
sidebar_position: 5
keywords:
  - registry
  - air-gapped
  - image mirroring
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Online install

For online installations, the operator pulls images from the Harness public registry.

The following table lists each registry the installation reaches and the images it provides.

| Registry | Images |
| --- | --- |
| `pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker` | `platform-installer-min`, `tiw-airgap` |
| `registry.k8s.io` | `ingress-nginx/controller`, `ingress-nginx/kube-webhook-certgen` |
| `registry.istio.io/release` | `pilot`, `proxyv2` (only if using Istio) |

## Air-gapped and private registry

For air-gapped environments, mirror all images to your private registry before you install.

### Required images

Mirror each of the following images. The Version Matches column tells you which version to use for each one.

| Image | Source Registry | Version Matches |
| --- | --- | --- |
| `platform-installer-min` | `pkg.harness.io/.../cxe-public-docker` | clustermgr version (e.g., `1.0.6`) |
| `tiw-airgap` | `pkg.harness.io/.../cxe-public-docker` | workflow version (e.g., `0.43.0`) |
| `ingress-nginx/controller` | `registry.k8s.io` | `v1.15.1` |
| `ingress-nginx/kube-webhook-certgen` | `registry.k8s.io` | `v1.6.9` |
| `release/pilot` | `registry.istio.io` | `1.30.3` (only if using Istio) |
| `release/proxyv2` | `registry.istio.io` | `1.30.3` (only if using Istio) |

### Mirror images

Run the following commands to pull each image, retag it for your private registry, and push it. Replace the variable values with your own registry details.

```bash
REGISTRY="your-private-registry.example.com"
PREFIX="harness"
CLUSTERMGR_VERSION="1.0.6"
WORKFLOW_VERSION="0.43.0"

docker login $REGISTRY

# Platform installer
docker pull pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/platform-installer-min:$CLUSTERMGR_VERSION
docker tag pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/platform-installer-min:$CLUSTERMGR_VERSION $REGISTRY/$PREFIX/platform-installer-min:$CLUSTERMGR_VERSION
docker push $REGISTRY/$PREFIX/platform-installer-min:$CLUSTERMGR_VERSION

# Workflow bundle image
docker pull pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/tiw-airgap:$WORKFLOW_VERSION
docker tag pkg.harness.io/g_ix-gj_sisgiituoe06eq/cxe-public-docker/tiw-airgap:$WORKFLOW_VERSION $REGISTRY/$PREFIX/tiw-airgap:$WORKFLOW_VERSION
docker push $REGISTRY/$PREFIX/tiw-airgap:$WORKFLOW_VERSION

# Nginx ingress (default)
docker pull registry.k8s.io/ingress-nginx/controller:v1.15.1
docker tag registry.k8s.io/ingress-nginx/controller:v1.15.1 $REGISTRY/$PREFIX/controller:v1.15.1
docker push $REGISTRY/$PREFIX/controller:v1.15.1

docker pull registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.6.9
docker tag registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.6.9 $REGISTRY/$PREFIX/kube-webhook-certgen:v1.6.9
docker push $REGISTRY/$PREFIX/kube-webhook-certgen:v1.6.9
```

### Istio images

Run these additional commands only if you use Istio.

```bash
ISTIO_VERSION="1.30.3"

docker pull registry.istio.io/release/pilot:$ISTIO_VERSION
docker tag registry.istio.io/release/pilot:$ISTIO_VERSION $REGISTRY/$PREFIX/pilot:$ISTIO_VERSION
docker push $REGISTRY/$PREFIX/pilot:$ISTIO_VERSION

docker pull registry.istio.io/release/proxyv2:$ISTIO_VERSION
docker tag registry.istio.io/release/proxyv2:$ISTIO_VERSION $REGISTRY/$PREFIX/proxyv2:$ISTIO_VERSION
docker push $REGISTRY/$PREFIX/proxyv2:$ISTIO_VERSION
```

## Registry flags

Provide your registry details to the installation so the operator can authenticate and pull images.

<Tabs>
<TabItem value="helm-t1" label="helm" default>

When you install with Helm, set the registry details in `values.yaml` under `cluster`.

| Value | Description | Example |
| --- | --- | --- |
| `cluster.imageRegistryHost` | Registry hostname | `pkg.harness.io/g_ix-gj_sisgiituoe06eq` |
| `cluster.imageRegistryPathPrefix` | Path prefix within the registry | `cxe-public-docker` |
| `cluster.imageRegistryUsername` | Registry username | `admin` |
| `cluster.imageRegistryPassword` | Registry password or token | `pat.xxx.xxx` |

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

When you install with clustermgr, pass the registry details as flags.

| Flag | Description | Example |
| --- | --- | --- |
| `--registry-host` | Registry hostname | `registry.example.com` |
| `--registry-prefix` | Path prefix within the registry | `harness-platform` |
| `--registry-user` | Registry username | `admin` |
| `--registry-password` | Registry password or token | `pat.xxx.xxx` |

</TabItem>
</Tabs>
