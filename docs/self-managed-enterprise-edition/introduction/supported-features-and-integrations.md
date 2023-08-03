---
title: Supported features and integrations
description: Self-Managed Enterprise Edition supported features and integrations.
sidebar_position: 4
---

This topic lists the supported features and integrations you can use to install and update Harness Self-Managed Enterprise Edition. For supported platforms, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies#harness-self-managed-enterprise-edition).

## Deployment infrastructure

### Infrastructure
* Required module-specific infrastructure:

   | **Modules** | **Pods** | **CPU** | **Memory (GB)** | **Storage (GB)** |
   | :-- | :--: | :--: | :--: | :--: |
   | Platform (including CD, GitOps, OPA) | 40 | 50.4 | 125.4 | 1090 |
   | Continuous Integration | 2 | 2 | 12 | 0 |
   | Security Testing Orchestration | 4 | 3| 7 | 0 |
   | Feature Flags | 3 | 3 | 6 | 0 |
   | Service Reliability Management | 6 | 8 | 18 | 0 |
   | Chaos Engineering | 15 | 12 | 24 | 50 |


### Ingress
* Istio supported version: 1-15-3
* NGINX supported version: v1.0.0-alpha.2

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
* [Backup and restore](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-recover/back-up-and-restore-helm/)
* External Database (coming soon)
* Disaster Recovery (coming soon)

## Supported Harness modules

* [Continuous Delivery and GitOps](https://developer.harness.io/docs/continuous-delivery/)
* [Continuous Integration](https://developer.harness.io/docs/continuous-integration/)
* [Security Test Orchestration](https://developer.harness.io/docs/security-testing-orchestration/)
* [Service Reliability Management](https://developer.harness.io/docs/service-reliability-management/)
* [Feature Flags](https://developer.harness.io/docs/feature-flags/)
* [Cloud Cost Management (Beta)](https://developer.harness.io/docs/cloud-cost-management/)
* [Chaos Engineering](https://developer.harness.io/docs/chaos-engineering/)
* [Continuous Error Tracking (Beta)](https://developer.harness.io/docs/continuous-error-tracking/)
