---
title: Supported Features in Self-Managed Enterprise Edition
description: Platforms and technologies supported by the on-prem Harness Self-Managed Enterprise Edition
sidebar_label: What's supported
sidebar_position: 1
---

import Smp from '/docs/self-managed-enterprise-edition/shared/smp-supported-platforms.md';

<Smp />

## Supported modules and features

* [Chaos Engineering](/docs/chaos-engineering/whats-supported)
* [Cloud Cost Management (Beta)](/docs/cloud-cost-management/get-started/ccm-smp/smp-ccm-roadmap)
* [Continuous Delivery and GitOps](/docs/continuous-delivery/cd-integrations)
* [Continuous Integration](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix)
* [Custom Dashboards](/docs/platform/dashboards/cdb-whats-supported)
* [Feature Flags](/docs/feature-flags/ff-supported-platforms)
* [Security Test Orchestration](/docs/security-testing-orchestration/whats-supported)
* [Service Reliability Management](/docs/service-reliability-management/srm-whats-supported)

For details on the supported features of other Harness modules and the overall Harness Platform, visit [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).

## Enviroment Deployment infrastructure

### Production

import Infra from '/docs/self-managed-enterprise-edition/shared/prod-env-infra.md';

<Infra />

### Development 

import Infra2 from '/docs/self-managed-enterprise-edition/shared/dev-env-infra.md';

<Infra2 />

### Ingress
* Istio supported version: 1.15.3 to 1.24.2
* NGINX supported version: v1.3.0

:::note Admin Access required for Kubernetes
Ensure you have admin access to Kubernetes before proceeding with the installation.
:::

### License requirements
* Contact [Harness Support](mailto:support@harness.io) for license information.

## Supported functionality
* [Self-signed certificates](/docs/self-managed-enterprise-edition/install/install-using-helm/#use-self-signed-certificates-with-helm-based-installations)
* [Air-gap mode](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment)
* [Infrastructure monitoring](/docs/self-managed-enterprise-edition/monitor-harness-on-prem)
* [Backup and restore](/docs/self-managed-enterprise-edition/back-up-and-restore-helm)
* [External Database](./advanced-configurations/external-db/configure-external-databases)
* [Disaster Recovery](./advanced-configurations/set-up-disaster-recovery)

## What's not supported
* Self-Managed Enterprise Edition is not validated with the FIPS-enabled K8S environment.

