---
title: Supported features and integrations
description: Self-Managed Enterprise Edition supported features and integrations. 
# sidebar_position: 10
---

This topic lists the supported features and integrations you can use to install and update Harness Self-Managed Enterprise Edition.

## Deployment infrastructure

### Compute infrastructure 
* Kubernetes supported version: 1.24
* Required module-specific infrastructure:

   | **Modules** | **Pods** | **CPU** | **Memory (GB)** | **Storage (GB)** |
   | :-- | :--: | :--: | :--: | :--: |
   | Platform (including CD, GitOps, OPA) | 40 | 50.4 | 125.4 | 1090 |
   | Continuous Integration | 2 | 2 | 12 | 0 |
   | Security Testing Orchestration | 4 | 3| 7 | 0 |
   | Feature Flags | 3 | 3 | 6 | 0 |
   | Service Reliability Management | 6 | 8 | 18 | 0 |

### Ingress
* Istio supported version: 1-15-3
* NGINX supported version: v1.0.0-alpha.2

### RBAC requirement 
* Permission required to deploy Helm
* Permission to add roles
* Permission to add a secret/edit

### License requirements
* Reach out to Harness support (support@harness.io) to get the license information.

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
* [Chaos Engineering (Beta)](https://developer.harness.io/docs/chaos-engineering/)
