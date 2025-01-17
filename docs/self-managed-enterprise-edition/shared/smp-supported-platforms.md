The following table lists the major supported features for Harness Self-Managed Enterprise Edition offerings.

Solution| Supported Platform| Air Gap | HA | Monitoring| Disaster Recovery |
| :-----------------------------------------------------------------: | :----------------------------: | :-----------: | :----------------: | :-------------------: | :-----------------: |
| Kubernetes Cluster|  GKE - AKS - EKS | Yes| Yes | Prometheus, Grafana | Yes

### Self-Managed Enterprise Edition Release cadence
Harness releases Self-Managed Enterprise Edition on a monthly basis. Additionally, periodic hot-fixes are released as needed. Self-Managed Enterprise Edition takes a branch cut of Harness SaaS release and creates a Release Candidate which goes through the iteration of testing and bug fixing process after which the release candidate is released.

### Supported Kubernetes versions

| Kubernetes Version | Supported | Notes                                                                                                        |
|--------------------|-----------|--------------------------------------------------------------------------------------------------------------|
| 1.30               | Yes       | Starting with EKS 1.30 (AWS), the support for default annotation on the storage class has been removed. For Harness to work, please update your overrides to include the `storageClassName` (gp2, gp3, etc) by updating the following values: <br /><br /> global: <br /> &nbsp;&nbsp;&nbsp;&nbsp;storageClass: "gp3" <br /> &nbsp;&nbsp;&nbsp;&nbsp;storageClassName: "gp3" |
| 1.27, 1.28, 1.29               | Yes       |                                                                                                              |

* Self-Managed Enterprise Edition supports the other versions of Kubernetes you use on a best-effort basis.

### Terms of support

The support policy is 12 months of full support, followed by 6 months of limited support for critical security fixes only.

The Harness Self-Managed Enterprise Edition ensures compatibility with supported Kubernetes versions and does not introduce changes that could break this compatibility. For instance, it does not utilize features from Kubernetes version n that are incompatible with version n-2.

Installation and upgrade preflight checks provide warnings when you use unsupported Kubernetes versions.

In cases where you encounter a problem related to an incompatibility issue, you must upgrade your cluster. Harness does not issue a patch to accommodate the use of unsupported Kubernetes versions.
