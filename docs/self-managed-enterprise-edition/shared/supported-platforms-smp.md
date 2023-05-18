The following table lists the major supported features for Harness Self-Managed Enterprise Edition offerings.

| Solution                                                          | Supported Platform           | Connected | HA | Monitoring          | Disaster Recovery | Features Under Controlled Release |
| ----------------------------------------------------------------- | ---------------------------- | ----------- | ---------------- | ------------------- | ----------------- | ------------ | --------------------------------- |
| Kubernetes Cluster                   | Kubernetes - GKE - AKS - EKS | Yes         | Coming soon              | Prometheus, Grafana | Coming soon        |                           |

### Supported Kubernetes versions for Harness Self-Managed Enterprise Edition

* Self-Managed Enterprise Edition supports Kubernetes v.1.24. Self-Managed Enterprise Edition additionally supports Kubernetes versions 1.23, 1.22, 1.21, and 1.20.
* Effective October 7, 2022, with the release of version 76918, Self-Managed Enterprise Edition no longer supports Kubernetes open-source versions 1.18 and earlier.
* Self-Managed Enterprise Edition supports the other versions of Kubernetes you use on a best-effort basis.
* Harness commits to support new minor versions of Kubernetes within three months of the first stable release. For example, if the stable release of 1.25.0 occurs on August 31, Harness extends compatibility by November 30.

### Terms of support for Harness Self-Managed Enterprise Edition

Harness Self-Managed Enterprise Edition does not introduce changes that break compatibility with supported versions of Kubernetes. For example, Self-Managed Enterprise Edition does not use features from Kubernetes version n that do not work in Kubernetes version n-2.

Installation and upgrade preflight checks provide warnings when you use unsupported Kubernetes versions.

In cases where you encounter a problem related to an incompatibility issue, you must upgrade your cluster. Harness will not issue a patch to accommodate the use of unsupported Kubernetes versions.

### Deployment infrastructure

#### Infrastructure 
* Required module-specific infrastructure:

   | **Modules** | **Pods** | **CPU** | **Memory (GB)** | **Storage (GB)** |
   | :-- | :--: | :--: | :--: | :--: |
   | Platform (including CD, GitOps, OPA) | 40 | 50.4 | 125.4 | 1090 |
   | Continuous Integration | 2 | 2 | 12 | 0 |
   | Security Testing Orchestration | 4 | 3| 7 | 0 |
   | Feature Flags | 3 | 3 | 6 | 0 |
   | Service Reliability Management | 6 | 8 | 18 | 0 |

#### Ingress
* Istio supported version: 1-15-3
* NGINX supported version: v1.0.0-alpha.2

#### RBAC requirements

The following permissions are required:
* Deploy Helm
* Add roles
* Add/edit secrets

#### License requirements
* Contact [Harness Support](mailto:support@harness.io) for license information.

### Supported functionality
* [Self-signed certificates](https://developer.harness.io/docs/self-managed-enterprise-edition/self-managed-helm-based-install/how-to-use-self-signed-certificates-with-self-managed/)
* [Air-gap mode](https://developer.harness.io/docs/self-managed-enterprise-edition/self-managed-helm-based-install/install-in-an-air-gapped-environment/)
* [Infrastructure monitoring](https://developer.harness.io/docs/self-managed-enterprise-edition/monitor-self-managed-enterprise-edition/monitor-harness-on-prem/)
* [Backup and restore](https://developer.harness.io/docs/self-managed-enterprise-edition/back-up-and-recover/back-up-and-restore-helm/)
* External Database (coming soon)
* Disaster Recovery (coming soon)

### Supported Harness modules

* [Continuous Delivery and GitOps](https://developer.harness.io/docs/continuous-delivery/)
* [Continuous Integration](https://developer.harness.io/docs/continuous-integration/)
* [Security Test Orchestration](https://developer.harness.io/docs/security-testing-orchestration/)
* [Service Reliability Management](https://developer.harness.io/docs/service-reliability-management/)
* [Feature Flags](https://developer.harness.io/docs/feature-flags/)
* [Cloud Cost Management (Beta)](https://developer.harness.io/docs/cloud-cost-management/)
* [Chaos Engineering (Beta)](https://developer.harness.io/docs/chaos-engineering/)
