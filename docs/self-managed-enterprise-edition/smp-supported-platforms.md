---
title: What's supported
description: Platforms and technologies supported by the on-prem Harness Self-Managed Enterprise Edition
sidebar_label: What's supported
sidebar_position: 2
---

Self-Managed Enterprise Edition allows organizations to leverage nearly all Harness modules and features available on Harness SaaS, ensuring a powerful and flexible on-premises experience. 

This section provides a clear overview of the Supported features, integrations, and capabilities available in the system.  

### Supported Modules 

* [Chaos Engineering](/docs/chaos-engineering/whats-supported)
* [Cloud Cost Management (Beta)](/docs/cloud-cost-management/get-started/ccm-smp/smp-ccm-roadmap)
* [Continuous Delivery and GitOps](/docs/continuous-delivery/cd-integrations)
* [Continuous Integration](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix)
* [Custom Dashboards](/docs/platform/dashboards/cdb-whats-supported)
* [Security Test Orchestration](/docs/security-testing-orchestration/whats-supported/sto-deployments)
* [AI SRE (Beta)](/docs/incident-response/get-started/overview)
* [Supply Chain Security (Beta)](/docs/software-supply-chain-assurance/ssca-supported)
* [Code Repository](/docs/code-repository)

For more details on the supported features of other Harness modules, visit [Harness Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

### Supported Features

import Smp from '/docs/self-managed-enterprise-edition/shared/smp-supported-platforms.md';

<Smp />

## Supported functionality
* [Self-signed certificates](/docs/self-managed-enterprise-edition/install/install-using-helm/#use-self-signed-certificates-with-helm-based-installations)
* [Air-gap mode](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment)
* Infrastructure monitoring
    - [Prometheus](/docs/self-managed-enterprise-edition/monitoring/install-prometheus).
    - [Grafana](/docs/self-managed-enterprise-edition/monitoring/install-grafana)
* [Backup and restore](/docs/self-managed-enterprise-edition/back-up-and-restore-helm)
* [External Database](./advanced-configurations/external-db/configure-external-databases)
* [Disaster Recovery](./advanced-configurations/set-up-disaster-recovery)

## Kubernetes Networking 

* Istio supported version: 1.15.3 to 1.24.2
* NGINX supported version: v1.3.0

## Terms of support

The support policy is 12 months of full support, followed by 6 months of limited support for critical security fixes only.

Harness Self-Managed Enterprise Edition does not introduce changes that break compatibility with supported versions of Kubernetes. For example, Self-Managed Enterprise Edition does not use features from Kubernetes version n that do not work in Kubernetes version n-2.

Installation and upgrade preflight checks provide warnings when you use unsupported Kubernetes versions.

In cases where you encounter a problem related to an incompatibility issue, you must upgrade your cluster. Harness does not issue a patch to accommodate the use of unsupported Kubernetes versions.
