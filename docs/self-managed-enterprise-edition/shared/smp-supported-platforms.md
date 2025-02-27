The following table lists the major supported features for Harness Self-Managed Enterprise Edition offerings.

| Feature                | Supported                                                      | 
|------------------------|----------------------------------------------------------------|
| Cloud Platform         | <li>EKS</li><li>GKE</li><li>AKS</li>                           |
| Databases              | <li>[Mongo](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-self-managed-mongodb)</li><li>[Postgres](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-postgres-database)</li> <li>CloudSQL</li> <li>RDS [Learn more](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/configure-external-databases#database-options).</li> |
| High availability(HA)  | [Yes](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/use-an-external-postgres-database/#high-availability)                                                            |
| Disaster Recovery (DR) | [Active-Passive](/docs/self-managed-enterprise-edition/advanced-configurations/set-up-disaster-recovery/)                                                 |
| Backup and Restore     | Yes - [Velero](/docs/self-managed-enterprise-edition/back-up-and-restore-helm)                                                         |
| Networking             | <li>Istio/Nginx</li><li>[ALB/NLB/GCLB](/docs/self-managed-enterprise-edition/install/install-using-helm/#add-a-load-balancer).</li>                      |
| Monitoring             | <li>[Prometheus](/docs/self-managed-enterprise-edition/monitor-harness-on-prem#set-up-prometheus-in-cluster).</li><li>[Grafana](/docs/self-managed-enterprise-edition/monitor-harness-on-prem#view-metrics-on-the-grafana-dashboard).</li>                             |
| Air-gapped             | [Yes](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment/)                                                            |

### Supported Kubernetes versions

:::note Important Note
    Starting with EKS 1.30 (AWS), the support for default annotation on the storage class has been removed. For Harness to work, please update your overrides to include the `storageClassName` (gp2, gp3, etc) by updating the following values: <br /><br /> global: <br /> &nbsp;&nbsp;&nbsp;&nbsp;storageClass: "gp3" <br /> &nbsp;&nbsp;&nbsp;&nbsp;storageClassName: "gp3"
:::

| Kubernetes Version                        | 
|-------------------------------------------|
| <li>1.30</li>                             |
| <li>1.29</li> <li>1.28</li> <li>1.27</li> |