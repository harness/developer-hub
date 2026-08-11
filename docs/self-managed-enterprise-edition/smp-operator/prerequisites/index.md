---
title: Prerequisites
sidebar_label: Prerequisites
description: Review the environment requirements before you install the SMP Operator.
sidebar_position: 1
keywords:
  - prerequisites
  - requirements
  - smp operator
  - kubernetes cluster
  - storage class
  - registry
  - DNS
  - TLS certificates
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

Before you install the Harness SMP Operator, ensure your environment meets all requirements outlined in this section. Each requirement has a dedicated topic that covers the supported options and the configuration details.

---

## Checklist

Confirm each of the following requirements before you begin the installation.

| Requirement | Description |
| --- | --- |
| **Kubernetes Cluster** | Multi-node cluster with sufficient resources |
| **Storage Class** | Dynamic volume provisioning (gp2, managed-csi, local-path, etc.) |
| **Registry** | Access to `pkg.harness.io` (online) or private registry (air-gap) |
| **DNS** | Externally resolvable hostname pointing to your load balancer |
| **TLS Certificates** | Self-signed (auto-generated) or bring your own |

---

## Sections

Each topic below covers one requirement from the checklist in detail.

- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/kubernetes-cluster-requirements" target="_blank">Kubernetes cluster requirements</a>: Resource profiles (small/medium/large) and node sizing.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/storage-classes" target="_blank">Storage classes</a>: Platform-specific storage configuration.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/dns-and-tls-certificates" target="_blank">DNS and TLS certificates</a>: DNS configuration and certificate management.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/prerequisites/registry-setup" target="_blank">Registry setup</a>: Online and air-gapped registry configuration.

---

## Next steps

After your environment meets every requirement in this section, continue with the installation.

- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator" target="_blank">Install with the SMP Operator</a>: Install the Harness Platform using Helm or the clustermgr CLI.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks" target="_blank">Post-installation checks</a>: Validate your installation after it completes.
- <a href="/docs/self-managed-enterprise-edition/smp-operator/cli-reference" target="_blank">CLI reference</a>: Review installation parameters across both the helm and clustermgr flows.
