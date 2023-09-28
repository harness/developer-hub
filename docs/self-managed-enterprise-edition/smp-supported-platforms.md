---
title: What's supported in Self-Managed Enterprise Edition
description: Platforms and technologies supported by the on-prem Harness Self-Managed Enterprise Edition
sidebar_label: What's supported
sidebar_position: 1
---

import Smp from '/docs/self-managed-enterprise-edition/shared/smp-supported-platforms.md';

<Smp />

## Supported modules and features

* [Chaos Engineering](/docs/chaos-engineering/get-started/whats-supported)
* [Cloud Cost Management (Beta)](/docs/cloud-cost-management/getting-started-ccm/ccm-smp/smp-ccm-roadmap)
* [Continuous Delivery and GitOps](/docs/continuous-delivery/cd-integrations)
* [Continuous Error Tracking (Beta)](/docs/continuous-error-tracking/whats-supported)
* [Continuous Integration](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/#feature-compatibility-matrix)
* [Custom Dashboards](/docs/platform/Dashboards/cdb-whats-supported)
* [Feature Flags](/docs/feature-flags/ff-supported-platforms)
* [Security Test Orchestration](/docs/security-testing-orchestration/whats-supported)
* [Service Reliability Management](/docs/service-reliability-management/srm-whats-supported)

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies).

## Production environment deployment infrastructure

import Infra from '/docs/self-managed-enterprise-edition/shared/prod-env-infra.md';

<Infra />

## Development environment deployment infrastructure

import Infra2 from '/docs/self-managed-enterprise-edition/shared/dev-env-infra.md';

<Infra2 />

### Ingress
* Istio supported version: 1-15-3
* NGINX supported version: v1.3.0

### RBAC requirements

The following permissions are required:
* Deploy Helm
* Add roles
* Add/edit secrets

### License requirements
* Contact [Harness Support](mailto:support@harness.io) for license information.

## Supported functionality
* [Self-signed certificates](https://developer.harness.io/docs/self-managed-enterprise-edition/self-managed-helm-based-install/how-to-use-self-signed-certificates-with-self-managed/)
* [Air-gap mode](https://developer.harness.io/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-an-air-gapped-environment/)
* [Infrastructure monitoring](https://developer.harness.io/docs/self-managed-enterprise-edition/monitor-self-managed-enterprise-edition/monitor-harness-on-prem/)
* [Backup and restore](/docs/self-managed-enterprise-edition/back-up-and-restore-helm)
* [External Database](/tutorials/self-managed-enterprise-edition)
* Disaster Recovery (coming soon)

