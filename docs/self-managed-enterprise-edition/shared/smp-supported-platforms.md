The following table lists the major supported features for Harness Self-Managed Enterprise Edition offerings.

Solution| Supported Platform| Connected | HA | Monitoring| Disaster Recovery | 
| ----------------------------------------------------------------- | ---------------------------- | ----------- | ---------------- | ------------------- | ----------------- | 
| Kubernetes Cluster| Kubernetes - GKE - AKS - EKS | Yes| Coming soon| Prometheus, Grafana | Coming soon                                  

### Supported Kubernetes versions

* Self-Managed Enterprise Edition supports Kubernetes v.1.25, as well as versions 1.24, 1.23, 1.22, 1.21, and 1.20.
* Effective October 7, 2022, with the release of version 76918, Self-Managed Enterprise Edition no longer supports Kubernetes open-source versions 1.18 and earlier.
* Self-Managed Enterprise Edition supports the other versions of Kubernetes you use on a best-effort basis.
* Harness commits to support new minor versions of Kubernetes within three months of the first stable release. For example, if the stable release of 1.25.0 occurs on August 31, Harness extends compatibility by November 30.

### Terms of support

Harness Self-Managed Enterprise Edition does not introduce changes that break compatibility with supported versions of Kubernetes. For example, Self-Managed Enterprise Edition does not use features from Kubernetes version n that do not work in Kubernetes version n-2.

Installation and upgrade preflight checks provide warnings when you use unsupported Kubernetes versions.

In cases where you encounter a problem related to an incompatibility issue, you must upgrade your cluster. Harness does not issue a patch to accommodate the use of unsupported Kubernetes versions.