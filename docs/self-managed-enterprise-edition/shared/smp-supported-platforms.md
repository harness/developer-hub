The table below outlines the key features supported in the Harness Self-Managed Enterprise Edition.

| Feature | Supported |
| --- | --- |
| Cloud Platform | <ul><li>EKS</li><li>GKE</li><li>AKS</li></ul> |
| External Databases | <ul><li>MongoDB<ul><li>[MongoDB Atlas](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/mongo-db/use-an-external-mongodb-database/)</li><li>[Self-Managed MongoDB](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/mongo-db/use-an-external-self-managed-mongodb)</li></ul></li><li>MinIO<ul><li>[AWS S3](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/minio/configure-aws-s3-for-pipeline-logs)</li><li>GCP buckets</li><li>[Self-Managed MinIO](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/minio/use-self-managed-minio-object-storage/)</li></ul></li><li>[TimeScaleDB](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/timescaledb/use-an-external-sm-timescaledb)</li><li>Postgres<ul><li>[Self-Managed Postgres](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/postgresql/use-an-external-postgres-database)</li><li>CloudSQL</li></ul></li><li>NoSQL<ul><li>[Self-Managed Redis](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/redis/use-an-external-redis-database)</li><li>[ElastiCache](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/redis/use-aws-elasticache)</li><li>GCP Memorystore</li></ul></li></ul> |
| High availability (HA) | [Yes](/docs/self-managed-enterprise-edition/advanced-configurations/external-db/postgresql/use-an-external-postgres-database/#high-availability) |
| Disaster Recovery (DR) | [Active-Passive](/docs/self-managed-enterprise-edition/advanced-configurations/set-up-disaster-recovery/) |
| Backup and Restore | [Velero](/docs/self-managed-enterprise-edition/back-up-and-restore-helm) |
| Networking | <ul><li>Istio (1.15.3 to 1.24.2)</li><li>NGINX (v1.3.0)</li><li>[ALB/NLB/GCLB](/docs/self-managed-enterprise-edition/install/install-using-helm/#add-a-load-balancer)</li></ul> |
| Monitoring | <ul><li>[Prometheus](/docs/self-managed-enterprise-edition/monitoring/install-prometheus)</li><li>[Grafana](/docs/self-managed-enterprise-edition/monitoring/install-grafana)</li></ul> |
| Air-gapped | [Yes](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment/) |
| FIPS-enabled K8S | No |

### Supported Kubernetes versions

Harness Self-Managed Enterprise Edition supports Kubernetes versions **1.30 through 1.35**.

:::info EKS 1.30+ storage class
Starting with EKS 1.30 (AWS), support for the default annotation on the storage class has been removed. For Harness to work, update your overrides to include the `storageClassName` (gp2, gp3, etc.):

```yaml
global:
  storageClass: "gp3"
  storageClassName: "gp3"
```
:::
