---
title: SMP Operator overview
sidebar_label: Overview
description: Understand how the SMP Operator bootstraps the Harness Platform in your Kubernetes cluster.
sidebar_position: 1
keywords:
  - smp operator
  - clustermgr
  - platform-installer
  - self-managed enterprise edition
  - kubernetes
  - helm
  - air-gapped installation
  - ingress
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

import DocVideo from '@site/src/components/DocVideo';

The Harness SMP Operator is a tool that bootstraps the Harness Platform in your Kubernetes cluster. It handles namespace creation, registry credentials, Helm chart deployment, and ingress integration, providing a streamlined installation experience for both online and air-gapped environments.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Identify what the operator manages](#operator-capabilities) during a Harness Platform installation.
- [Choose a deployment method](#deployment-methods) between Helm and the clustermgr CLI.
- [Follow the quick start path](#quick-start) from prerequisites through to the installer UI.
- [Navigate the SMP Operator documentation](#structure) to find prerequisites, installation, upgrade, and troubleshooting topics.

---

## Before you begin

Before you install the Harness Platform with the SMP Operator, ensure you have the following:

- **Kubernetes cluster**: A cluster that meets the required resource profiles and node sizing. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/kubernetes-cluster-requirements" target="_blank">Kubernetes cluster requirements</a>.
- **Storage classes**: Storage classes configured for EKS, AKS, or GKE. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/storage-classes" target="_blank">Storage classes</a>.
- **DNS and TLS certificates**: DNS resolution and certificate management for your installation. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/dns-and-tls-certificates" target="_blank">DNS and TLS certificates</a>.
- **Registry access**: Online or air-gapped registry configuration for pulling platform images. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/registry-setup" target="_blank">Registry setup</a>.

---

## Interactive walkthrough

Watch this video to learn how to use the Harness SMP Operator to bootstrap the Harness Platform in your Kubernetes cluster.

<DocVideo src="https://www.youtube.com/watch?v=_uxMA-B749k" title="Bootstrap the Harness Platform with the Harness SMP Operator" />

---

## Operator capabilities

The operator manages the components required to run the Harness Platform in your cluster, so you do not configure each one separately.

- **Deploys** the Harness Platform Installer Helm chart into your cluster
- **Configures** registry credentials for pulling platform images
- **Manages** ingress integration
- **Supports** air-gapped installations with private registries
- **Handles** upgrades of existing installations

---

## Deployment methods

Select the method that matches how much of the bootstrap you want to control directly.

The operator can be deployed in two ways:

- Install the `platform-installer` Helm chart directly with `helm install`
- Use the `clustermgr` CLI to bootstrap the chart for you.

The <a href="/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator" target="_blank">Install with the SMP Operator</a> guide covers both methods.

---

## Quick start

Complete these steps in order to reach a running installation and open the installer UI.

1. Review the <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites" target="_blank">Prerequisites</a>
2. Follow the <a href="/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator" target="_blank">Install with the SMP Operator</a> guide using **helm** or **clustermgr**
3. Run <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>
4. Access the installer UI at `https://<your-dns>/pi`

---

## Structure

The SMP Operator documentation is organized into the following sections.

### Prerequisites

Essential requirements before installing. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites" target="_blank">Prerequisites</a>.

- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/kubernetes-cluster-requirements" target="_blank">Kubernetes cluster requirements</a>: Resource profiles and node sizing.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/storage-classes" target="_blank">Storage classes</a>: EKS, AKS, GKE.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/dns-and-tls-certificates" target="_blank">DNS and TLS certificates</a>: DNS resolution and certificate management.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/registry-setup" target="_blank">Registry setup</a>: Online and air-gapped registry configuration.

### Installation

Installation methods and post-installation validation. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/install" target="_blank">Installation</a>.

- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator" target="_blank">Install with the SMP Operator</a>: Online and air-gapped installation.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/cli-reference" target="_blank">CLI reference</a>: All flags and options.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/fips-compliant-installation" target="_blank">FIPS-compliant installation</a>
- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>

### Upgrade

Operator and platform upgrades. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/upgrade" target="_blank">Upgrade</a>.

### Workflow tasks

Pre-defined automation tasks. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/workflow-tasks" target="_blank">Workflow tasks</a>.

### Advanced configuration

Deep-dive configuration topics. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/advanced-configuration" target="_blank">Advanced configuration</a>.

### Support and troubleshooting

Common issues and how to resolve them. For more information, see <a href="/docs/self-managed-enterprise-edition/smp-operator/troubleshooting" target="_blank">Support and troubleshooting</a>.

---

## Related articles

- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites" target="_blank">Prerequisites</a>: Review cluster, storage, DNS, TLS, and registry requirements before you install.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator" target="_blank">Install with the SMP Operator</a>: Install the Harness Platform using Helm or the clustermgr CLI.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/cli-reference" target="_blank">CLI reference</a>: Review installation parameters across both the helm and clustermgr flows.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/troubleshooting" target="_blank">Support and troubleshooting</a>: Resolve common issues with your installation.
