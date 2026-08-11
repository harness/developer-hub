---
title: CLI reference
sidebar_label: CLI Reference
description: Reference for installation parameters across both the helm and clustermgr flows.
sidebar_position: 7
keywords:
  - cli reference
  - clustermgr
  - helm
  - flags
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic lists the installation parameters for both the **helm** and **clustermgr** flows. Select the tab that matches the method you use. The two flows accept different names for the same setting.

## Installation Parameters for YAML

<Tabs>
<TabItem value="helm-t1" label="helm" default>

Base values are provided through `override.yaml` and optional override files.

| Parameter | Default | Description |
| --- | --- | --- |
| `cluster.version` | - | Workflow / installer package version |
| `cluster.name` | `harness` | Cluster name |
| `cluster.tfi.dns` | - | External DNS name for the platform |
| `cluster.tfi.userEmail` | - | Admin user email |
| `cluster.tfi.userPassword` | - | Admin user password |
| `cluster.tfi.storageClass` | - | Storage class for persistent volumes |
| `cluster.tfi.ingressType` | `nginx` | Ingress type (`nginx` or `istio`) |
| `cluster.airGapEnabled` | `false` | Enable air-gapped mode |
| `cluster.imageRegistryHost` | - | Private registry host (air-gap) |
| `cluster.imageRegistryPathPrefix` | - | Private registry path prefix (air-gap) |
| `cluster.imageRegistryUsername` | - | Private registry username (air-gap) |
| `cluster.imageRegistryPassword` | - | Private registry password/token (air-gap) |

## Installation Parameters for command line

The following table lists the parameters you pass on the `helm` command line:

| Parameter | Description |
| --- | --- |
| `-n, --namespace` | Kubernetes namespace for installation |
| `--create-namespace` | Create namespace if it does not exist |
| `-f override.yaml` | Base values file |
| `-f override-<ingress>.yaml` | Ingress-specific override file |
| `--set-file cluster.helmValues.harness=...` | Inject `harness-values.yaml` during discovery flow |

</TabItem>
<TabItem value="clustermgr-t1" label="clustermgr">

| Flag | Default | Description |
| --- | --- | --- |
| `--dns` | `$(hostname -f)` | External DNS name for the platform |
| `--version` | - | Platform installer version |
| `-n, --namespace` | `harness` | Kubernetes namespace for installation |
| `--email` | `admin@<domain>` | Admin user email |
| `--password` | Auto-generated | Admin user password |
| `--release-name` | `platform-installer` | Helm release name |
| `--dry-run` | `false` | Preview without executing |
| `--registry-host` | - | Registry hostname (e.g., `registry.example.com` or `registry.example.com/namespace`) |
| `--registry-prefix` | - | Path prefix within registry |
| `--registry-user` | - | Registry username |
| `--registry-password` | - | Registry password or token |
| `--pi-set` | - | Additional Helm `--set` values (full path, e.g., `cluster.tfi.storageClass=gp2`) |
| `--pi-values` | - | Additional Helm values files (`-f` equivalent) |
| `--pi-set-file` | - | Additional Helm `--set-file` values |
| `-i, --pi-args` | - | Input args to the installer, auto-prefixed with `cluster.tfi.` |

</TabItem>
</Tabs>
