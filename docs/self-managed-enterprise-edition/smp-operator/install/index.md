---
title: Installation
sidebar_label: Installation
description: Install the SMP Operator with Helm or the clustermgr CLI.
sidebar_position: 1
keywords:
  - install
  - helm
  - clustermgr
  - air-gapped
  - fips
  - discovery
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

This topic covers how you install the Harness SMP Operator into an existing Kubernetes cluster. You can deploy it with either Helm, using the `platform-installer` Helm chart directly, or with the clustermgr CLI.

---

## Installation methods

Both methods deploy the same underlying Helm chart, so select the one that fits your operational workflow.

- **helm**: Use the `platform-installer` Helm chart directly with `helm install`.
- **clustermgr**: Use the `clustermgr` CLI, which bootstraps the Helm chart for you.

For more information on cluster sizing, storage class, registry access, DNS, and TLS certificate requirements, see [Prerequisites](/docs/self-managed-enterprise-edition/smp-operator/prerequisites).

:::info Tooling
If you install with Helm, install `kubectl` and `helm` and configure `kubectl` with cluster admin access. The clustermgr package bundles both tools.
:::

---

## Installation paths

The install guide covers the full deployment with either Helm or clustermgr. The remaining topics apply to specific environments: use the air-gapped topic if your cluster has no internet access, the discovery topic if you already run Harness SMP and want the operator to discover it, and the FIPS topic if you deploy in a regulated environment. The post-installation checks confirm that the deployment succeeded.

- [Install with the SMP Operator](/docs/self-managed-enterprise-edition/smp-operator/install/install-with-smp-operator): Deploy the Harness Platform with Helm or clustermgr, using either Nginx or Istio ingress.
- [Air-gapped installation](/docs/self-managed-enterprise-edition/smp-operator/install/install-in-an-air-gapped-environment): Mirror images to a private registry and install offline.
- [Discovery](/docs/self-managed-enterprise-edition/smp-operator/install/discovery): Extract configuration from an existing Harness SMP installation so the operator discovers it.
- [FIPS-compliant installation](/docs/self-managed-enterprise-edition/smp-operator/install/fips-compliant-installation): Configure Istio components to enforce FIPS cryptographic standards.
- [Post-installation checks](/docs/self-managed-enterprise-edition/smp-operator/install/post-installation-checks): Verify that the operator deployed successfully.

---

## Next steps

After the installation completes and your checks pass, tune the deployment and look up the parameters you used.

- [CLI reference](/docs/self-managed-enterprise-edition/smp-operator/cli-reference): Review the complete `helm` and `clustermgr` parameter reference.
- [Advanced configuration](/docs/self-managed-enterprise-edition/smp-operator/advanced-configuration): Tune resource sizing and pod security context.
- [Upgrade](/docs/self-managed-enterprise-edition/smp-operator/upgrade): Upgrade an existing SMP Operator installation.
