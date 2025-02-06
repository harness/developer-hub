The following table lists the major supported features for Harness Self-Managed Enterprise Edition offerings.

| Feature                | Supported                                                      | 
|------------------------|----------------------------------------------------------------|
| Cloud Platform         | <li>EKS</li><li>GKE</li><li>AKS</li>                           |
| Databases              | <li>[Mongo](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-self-managed-mongodb)</li><li>[Postgres](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-postgres-database)</li> <li>CloudSQL</li> <li>RDS [Learn more](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/configure-external-databases#database-options).</li> |
| High availability(HA)  | [Yes](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-postgres-database/#high-availability)                                                            |
| Disaster Recovery (DR) | [Active-Passive](/docs/self-managed-enterprise-edition/advanced-configurations/set-up-disaster-recovery/)                                                 |
| Backup and Restore     | Yes ([Velero](/docs/self-managed-enterprise-edition/back-up-and-restore-helm))                                                         |
| Networking             | <li>Istio/Nginx</li><li>[ALB/NLB/GCLB](/docs/self-managed-enterprise-edition/install/install-using-helm/#add-a-load-balancer).</li>                      |
| Monitoring             | <li>[Prometheus](/docs/self-managed-enterprise-edition/monitor-harness-on-prem#set-up-prometheus-in-cluster).</li><li>[Grafana](/docs/self-managed-enterprise-edition/monitor-harness-on-prem#view-metrics-on-the-grafana-dashboard).</li>                             |
| Air-gapped             | [Yes](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment/)                                                            |

### Self-Managed Enterprise Edition Release cadence
Harness releases Self-Managed Enterprise Edition on a monthly basis. Additionally, periodic hot-fixes are released as needed. Self-Managed Enterprise Edition takes a branch cut of Harness SaaS release and creates a Release Candidate which goes through the iteration of testing and bug fixing process after which the release candidate is released.

### Supported Kubernetes versions

| Kubernetes Version                        | Supported | Notes                                                                                                                                                                                                                                                                                                                                                                        |
|-------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <li>1.30</li>                                      | Yes       | Starting with EKS 1.30 (AWS), the support for default annotation on the storage class has been removed. For Harness to work, please update your overrides to include the `storageClassName` (gp2, gp3, etc) by updating the following values: <br /><br /> global: <br /> &nbsp;&nbsp;&nbsp;&nbsp;storageClass: "gp3" <br /> &nbsp;&nbsp;&nbsp;&nbsp;storageClassName: "gp3" |
| <li>1.29</li> <li>1.28</li> <li>1.27</li> | Yes       |                                                                                                                                                                                                                                                                                                                                                                              |


* Self-Managed Enterprise Edition supports the other versions of Kubernetes you use on a best-effort basis.

### Terms of support

The support policy is 12 months of full support, followed by 6 months of limited support for critical security fixes only.

The Harness Self-Managed Enterprise Edition ensures compatibility with supported Kubernetes versions and does not introduce changes that could break this compatibility. For instance, it does not utilize features from Kubernetes version n that are incompatible with version n-2.

Installation and upgrade preflight checks provide warnings when you use unsupported Kubernetes versions.

In cases where you encounter a problem related to an incompatibility issue, you must upgrade your cluster. Harness does not issue a patch to accommodate the use of unsupported Kubernetes versions.