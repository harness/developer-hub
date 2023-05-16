The following table lists the major support features for Harness Self-Managed Enterprise Edition offerings.

| Solution                                                          | Supported Platform           | Connected\* | HA Supported\*\* | Monitoring          | Disaster Recovery | Auto Restart | Features Under Controlled Release |
| ----------------------------------------------------------------- | ---------------------------- | ----------- | ---------------- | ------------------- | ----------------- | ------------ | --------------------------------- |
| Kubernetes Cluster                   | Kubernetes - GKE - AKS - EKS | Yes         | Yes              | Prometheus, Grafana | Supported         | Supported    |                                   |

### Supported Kubernetes versions for Harness Self-Managed Enterprise Edition

* Self-Managed Enterprise Edition supports Kubernetes v.1.24. Self-Managed Enterprise Edition additionally supports Kubernetes versions 1.23, 1.22, 1.21, and 1.20.
* Effective October 7, 2022, with the release of version 76918, Self-Managed Enterprise Edition no longer supports Kubernetes open-source versions 1.18 and earlier.
* Self-Managed Enterprise Edition supports the other versions of Kubernetes you use on a best-effort basis.
* Harness commits to support new minor versions of Kubernetes within three months of the first stable release. For example, if the stable release of 1.25.0 occurs on August 31, Harness extends compatibility by November 30.

### Terms of support for Harness Self-Managed Enterprise Edition

Harness Self-Managed Enterprise Edition does not introduce changes that break compatibility with supported versions of Kubernetes. For example, Self-Managed Enterprise Edition does not use features from Kubernetes version n that do not work in Kubernetes version n-2.

Installation and upgrade preflight checks provide warnings when you use Kubernetes versions that are not supported.

In cases where you encounter a problem that is related to an incompatibility issue, you must upgrade your cluster. Harness will not issue a patch to accommodate the use of unsupported Kubernetes versions.
