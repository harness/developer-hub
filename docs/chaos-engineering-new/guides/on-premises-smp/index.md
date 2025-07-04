---
title: Overview
sidebar_position: 1
description: Deploy and manage Harness Chaos Engineering in your on-premises environment using Self-Managed Platform
redirect_from:
- /docs/chaos-engineering/get-started/ce-on-smp/ce-smp-roadmap
- /docs/category/ce-on-harness-self-managed-enterprise-edition
---

# On-premises (SMP)

Deploy Harness Chaos Engineering in your own infrastructure using the Self-Managed Platform (SMP) for complete control over your chaos engineering environment.

## Overview

The Self-Managed Platform (SMP) allows organizations to run Harness Chaos Engineering entirely within their own infrastructure. Harness Chaos Engineering is available in the SMP version, where you will need to create, manage and maintain your clusters. You will be responsible for providing permissions to projects and handling the issues associated with them.

**Feature availability on Harness Chaos Engineering SaaS and SMP are on par, with minor timeline changes in the SMP feature releases.**

### Deployment Models

Harness Chaos Engineering is offered as:
- **SaaS**: Fully managed cloud service
- **On-Premise (SMP)**: Self-managed deployment in your infrastructure

The capabilities of Harness Chaos Engineering are the same in both **SaaS** and **On-Premise** models.

## Feature Roadmap

The table below outlines the roadmap for the Harness Self-Managed Enterprise Edition of Chaos Engineering:

| **Release version** | **Feature set** | **Deployment infrastructure** | **Supported platforms** | **Supported ingress** |
| --- | --- | --- | --- | --- |
| Limited GA (Current version) | Feature parity with SaaS | <ul><li>Cloud</li><li>Connected</li><li>Air-gapped</li><li>Signed certificates</li></ul> | Kubernetes clusters | <ul><li>NGINX</li><li>Istio virtual services</li></ul> |
| General Availability (Coming soon) | Feature parity with SaaS | | | |

## Prerequisites

Before deploying Harness Chaos Engineering on SMP, ensure you meet all technical requirements including infrastructure, networking, security, and storage specifications.

**For detailed requirements, see [Prerequisites](./prerequisites.md)**

Key requirements include:
- **Kubernetes cluster** with minimum 3 nodes
- **Container runtime** (Docker 20.10+, containerd 1.5+, or CRI-O 1.20+)
- **Database support** for MongoDB, Redis, and TimescaleDB
- **Network connectivity** for ingress controllers and external services
- **Storage** with persistent volume support
- **Security** configurations including RBAC and service accounts

## Air-gapped Environment Setup

:::info note
To install SMP in an air-gapped environment, go to [SMP in air-gapped environment](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment).
:::

### Enterprise ChaosHub Connection

If you don't have access to [GitHub](https://github.com/), you will not be able to deploy Harness SMP in an air-gapped cluster completely. As a consequence, the Enterprise ChaosHub will be in a `DISCONNECTED` state.

**To address this:**
1. Use a proxy that can access [GitHub](https://github.com/)
2. Provide the configuration under chaos manager deployment
3. Use this setup in the `override.yaml` file of the Helm chart before deployment

#### Proxy Configuration Example

```yaml
chaos-manager:
  config:
    HTTP_PROXY: http://<proxy-ip>:<proxy-port>
    HTTPS_PROXY: https://<proxy-ip>:<proxy-port>
    NO_PROXY: <cluster-ip>
    GIT_SSL_NO_VERIFY: true
```

**Environment Variables:**
- `HTTP_PROXY`: Set only if connecting to an SCM server deployed over HTTP (optional for Enterprise ChaosHub)
- `HTTPS_PROXY`: Set if connecting to an SCM server deployed over HTTPS or [GitHub](https://github.com) (required for Enterprise ChaosHub)
- `NO_PROXY`: Set with the cluster IP where you deploy the chaos infrastructure
- `GIT_SSL_NO_VERIFY`: Set when using self-signed certificates to skip SSL certificate validation

:::tip Proxy with Credentials
You can provide `HTTP_PROXY` and `HTTPS_PROXY` with endpoints that have credentials. First URL encode the username and password:

```
http://<url-encoded-username>:<url-encoded-password>@<proxy-ip>:<proxy-port>
```
:::

## Infrastructure Connection via Proxy

To connect your chaos infrastructure to the control plane via proxy when using a [dedicated chaos infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/):

### Environment Variables Configuration

Configure the following environment variables for the subscriber:

- `HTTP_PROXY`: Set if you deploy the SMP control plane over HTTP
- `HTTPS_PROXY`: Set if you deploy the SMP control plane over HTTPS or connecting to app.harness.io
- `NO_PROXY`: Set with the cluster IP to direct requests to Kube API server directly
- `INDIRECT_UPLOAD`: Set to "true" for experiment log streaming

### Experiment Configuration

When the infrastructure is `CONNECTED`, configure proxy settings in experiment manifests:

1. Select **YAML** view in the **Experiment Builder**
2. Click **Edit Yaml**
3. Provide values for proxy environment variables

![Proxy Configuration](./static/change-vals.png)

## Known Limitations

### HTTP vs HTTPS Access
- The **Copy to clipboard** facility only works when accessing SMP over HTTPS-based connections
- HTTP-based connections will not support clipboard functionality

### Command Probes
- Command probes in **source** mode for Kubernetes are available for both SMP and Harness Chaos Engineering SaaS
- In SMP, command probe in **source** mode is only available for Linux

### Linux Chaos Infrastructure (LCI)
- LCI currently does not support executing [parallel faults](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments) in SaaS
- The self-managed platform (SMP) supports executing parallel faults on LCI

## Feature Flags

Certain features in Harness Self-Managed Enterprise Edition require feature flags to be enabled. To enable these feature flags, go to [Add Feature Flags](/docs/self-managed-enterprise-edition/install/manage-feature-flags/#add-feature-flags-to-your-installation).

## Additional Resources

- [What's supported](/docs/chaos-engineering/whats-supported.md)
- [SMP Release Notes](/release-notes/self-managed-enterprise-edition)
- [Upgrade Infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/upgrade-infra#smp)
- [DDCR Proxy Configuration](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/proxy-support)

## Support

For assistance with SMP deployment and configuration:
- Contact [Harness Support](mailto:support@harness.io)
- Review [SMP documentation](/docs/self-managed-enterprise-edition/)
- Check [SMP Release Notes](/release-notes/self-managed-enterprise-edition) for latest updates

---

**Next Steps:**
- Review [supported platforms](/docs/chaos-engineering/whats-supported.md)
- Plan your [infrastructure setup](/docs/chaos-engineering/use-harness-ce/infrastructures/)
- Configure [chaos experiments](/docs/chaos-engineering/use-harness-ce/experiments/)
- Set up [monitoring and observability](/docs/chaos-engineering/use-harness-ce/probes/)

### Infrastructure Requirements

#### Minimum System Requirements
- **CPU**: 16 cores
- **Memory**: 32 GB RAM
- **Storage**: 500 GB SSD
- **Network**: 1 Gbps connectivity

#### Recommended System Requirements
- **CPU**: 32 cores
- **Memory**: 64 GB RAM
- **Storage**: 1 TB NVMe SSD
- **Network**: 10 Gbps connectivity

### Software Prerequisites

#### Kubernetes Cluster
```yaml
# Minimum Kubernetes version: 1.20+
# Recommended: 1.24+
apiVersion: v1
kind: Namespace
metadata:
  name: harness-chaos-smp
```

#### Required Tools
- **kubectl**: v1.20+
- **Helm**: v3.8+
- **Docker**: v20.10+
- **Git**: v2.30+

### Network Requirements

#### Inbound Ports
- **443**: HTTPS traffic
- **80**: HTTP traffic (redirect to HTTPS)
- **9090**: Prometheus metrics
- **3000**: Grafana dashboard

#### Outbound Connectivity
- **Container Registry**: Access to pull Harness images
- **License Server**: Periodic license validation
- **Update Server**: Platform updates and patches

## Installation

### Step 1: Prepare the Environment

Create the namespace and required resources:

```bash
# Create namespace
kubectl create namespace harness-chaos-smp

# Create service account
kubectl create serviceaccount harness-chaos-sa -n harness-chaos-smp

# Apply RBAC permissions
kubectl apply -f - <<EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: harness-chaos-role
rules:
- apiGroups: [""]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["apps", "extensions"]
  resources: ["*"]
  verbs: ["*"]
EOF
```

### Step 2: Configure Storage

Set up persistent storage for databases:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: chaos-mongodb-pvc
  namespace: harness-chaos-smp
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  storageClassName: fast-ssd
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: chaos-timescaledb-pvc
  namespace: harness-chaos-smp
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 200Gi
  storageClassName: fast-ssd
```

### Step 3: Install Using Helm

Add the Harness Helm repository:

```bash
# Add Harness Helm repo
helm repo add harness https://harness.github.io/helm-charts
helm repo update

# Create values file
cat > chaos-smp-values.yaml <<EOF
global:
  license:
    cg: "YOUR_LICENSE_KEY"
  ingress:
    enabled: true
    className: "nginx"
    hosts:
      - host: chaos.your-domain.com
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: chaos-tls-secret
        hosts:
          - chaos.your-domain.com

chaos:
  enabled: true
  mongodb:
    persistence:
      enabled: true
      existingClaim: chaos-mongodb-pvc
  timescaledb:
    persistence:
      enabled: true
      existingClaim: chaos-timescaledb-pvc
  
  resources:
    limits:
      cpu: 4
      memory: 8Gi
    requests:
      cpu: 2
      memory: 4Gi
EOF

# Install Harness Chaos Engineering SMP
helm install harness-chaos harness/harness \
  -n harness-chaos-smp \
  -f chaos-smp-values.yaml
```

### Step 4: Configure TLS

Set up SSL/TLS certificates:

```bash
# Create TLS secret (replace with your certificates)
kubectl create secret tls chaos-tls-secret \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key \
  -n harness-chaos-smp
```

### Step 5: Verify Installation

Check the deployment status:

```bash
# Check pod status
kubectl get pods -n harness-chaos-smp

# Check services
kubectl get svc -n harness-chaos-smp

# Check ingress
kubectl get ingress -n harness-chaos-smp

# View logs
kubectl logs -l app=harness-chaos -n harness-chaos-smp
```

## Configuration

### Database Configuration

#### MongoDB Settings
```yaml
mongodb:
  auth:
    enabled: true
    rootPassword: "secure-root-password"
    username: "chaosuser"
    password: "secure-user-password"
    database: "chaosdb"
  persistence:
    size: 100Gi
  resources:
    limits:
      cpu: 2
      memory: 4Gi
```

#### TimescaleDB Settings
```yaml
timescaledb:
  auth:
    postgresPassword: "secure-postgres-password"
  persistence:
    size: 200Gi
  resources:
    limits:
      cpu: 4
      memory: 8Gi
```

### Authentication Configuration

#### LDAP Integration
```yaml
auth:
  ldap:
    enabled: true
    url: "ldap://your-ldap-server:389"
    bindDN: "cn=admin,dc=example,dc=com"
    bindPassword: "admin-password"
    userSearchBase: "ou=users,dc=example,dc=com"
    groupSearchBase: "ou=groups,dc=example,dc=com"
```

#### SAML Integration
```yaml
auth:
  saml:
    enabled: true
    idpMetadataUrl: "https://your-idp.com/metadata"
    entityId: "harness-chaos-smp"
    callbackUrl: "https://chaos.your-domain.com/auth/saml/callback"
```

### Monitoring Configuration

#### Prometheus Settings
```yaml
prometheus:
  enabled: true
  retention: "30d"
  storage:
    size: 50Gi
  resources:
    limits:
      cpu: 2
      memory: 4Gi
```

#### Grafana Settings
```yaml
grafana:
  enabled: true
  adminPassword: "secure-admin-password"
  persistence:
    enabled: true
    size: 10Gi
  dashboards:
    chaos:
      enabled: true
```

## Management

### Backup and Recovery

#### Database Backup
```bash
# MongoDB backup
kubectl exec -it mongodb-pod -n harness-chaos-smp -- \
  mongodump --host localhost --port 27017 \
  --username chaosuser --password secure-user-password \
  --db chaosdb --out /backup/

# TimescaleDB backup
kubectl exec -it timescaledb-pod -n harness-chaos-smp -- \
  pg_dump -h localhost -U postgres chaosdb > /backup/chaosdb.sql
```

#### Configuration Backup
```bash
# Backup Kubernetes resources
kubectl get all,configmaps,secrets,pvc -n harness-chaos-smp -o yaml > chaos-smp-backup.yaml

# Backup Helm values
helm get values harness-chaos -n harness-chaos-smp > chaos-values-backup.yaml
```

### Updates and Upgrades

#### Platform Updates
```bash
# Update Helm repository
helm repo update harness

# Check available versions
helm search repo harness/harness --versions

# Upgrade to new version
helm upgrade harness-chaos harness/harness \
  -n harness-chaos-smp \
  -f chaos-smp-values.yaml \
  --version NEW_VERSION
```

#### Rolling Updates
```bash
# Update specific components
kubectl patch deployment chaos-control-plane \
  -n harness-chaos-smp \
  -p '{"spec":{"template":{"spec":{"containers":[{"name":"chaos-control-plane","image":"harness/chaos-control-plane:NEW_TAG"}]}}}}'
```

### Scaling

#### Horizontal Scaling
```yaml
# Scale control plane
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chaos-control-plane
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: chaos-control-plane
        resources:
          limits:
            cpu: 2
            memory: 4Gi
          requests:
            cpu: 1
            memory: 2Gi
```

#### Vertical Scaling
```bash
# Scale resources
kubectl patch deployment chaos-control-plane \
  -n harness-chaos-smp \
  -p '{"spec":{"template":{"spec":{"containers":[{"name":"chaos-control-plane","resources":{"limits":{"cpu":"4","memory":"8Gi"},"requests":{"cpu":"2","memory":"4Gi"}}}]}}}}'
```

## Security

### Network Security

#### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: chaos-network-policy
  namespace: harness-chaos-smp
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
```

#### Pod Security Standards
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: chaos-control-plane
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
  - name: chaos-control-plane
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
```

### Data Encryption

#### Encryption at Rest
```yaml
# Enable encryption for MongoDB
mongodb:
  auth:
    enabled: true
  encryption:
    enabled: true
    keyFile: "/etc/mongodb-encryption/key"

# Enable encryption for TimescaleDB
timescaledb:
  encryption:
    enabled: true
    tdeKey: "your-tde-key"
```

#### Encryption in Transit
```yaml
# TLS configuration
tls:
  enabled: true
  certManager:
    enabled: true
    issuer: "letsencrypt-prod"
  certificates:
    - name: chaos-tls
      secretName: chaos-tls-secret
      dnsNames:
        - chaos.your-domain.com
```

## Troubleshooting

### Common Issues

#### Pod Startup Issues
```bash
# Check pod events
kubectl describe pod POD_NAME -n harness-chaos-smp

# Check logs
kubectl logs POD_NAME -n harness-chaos-smp --previous

# Check resource constraints
kubectl top pods -n harness-chaos-smp
```

#### Database Connection Issues
```bash
# Test MongoDB connection
kubectl exec -it mongodb-pod -n harness-chaos-smp -- \
  mongo --host localhost --port 27017 \
  --username chaosuser --password secure-user-password

# Test TimescaleDB connection
kubectl exec -it timescaledb-pod -n harness-chaos-smp -- \
  psql -h localhost -U postgres -d chaosdb
```

#### Network Connectivity Issues
```bash
# Test internal connectivity
kubectl exec -it chaos-control-plane-pod -n harness-chaos-smp -- \
  nslookup mongodb-service.harness-chaos-smp.svc.cluster.local

# Test external connectivity
kubectl exec -it chaos-control-plane-pod -n harness-chaos-smp -- \
  curl -I https://your-external-service.com
```

### Performance Optimization

#### Resource Tuning
```yaml
# Optimize JVM settings
env:
- name: JAVA_OPTS
  value: "-Xms2g -Xmx4g -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Optimize database connections
- name: DB_POOL_SIZE
  value: "20"
- name: DB_POOL_TIMEOUT
  value: "30000"
```

#### Monitoring and Alerting
```yaml
# Prometheus alerts
groups:
- name: chaos-smp-alerts
  rules:
  - alert: ChaosControlPlaneDown
    expr: up{job="chaos-control-plane"} == 0
    for: 5m
    labels:
      severity: critical
    annotations:
      summary: "Chaos Control Plane is down"
      
  - alert: HighMemoryUsage
    expr: container_memory_usage_bytes{pod=~"chaos-.*"} / container_spec_memory_limit_bytes > 0.8
    for: 10m
    labels:
      severity: warning
    annotations:
      summary: "High memory usage detected"
```

## Best Practices

### Deployment
1. **Use Infrastructure as Code**: Manage deployments with Terraform or similar tools
2. **Implement GitOps**: Use ArgoCD or Flux for continuous deployment
3. **Environment Separation**: Maintain separate environments for dev/staging/prod
4. **Resource Limits**: Always set appropriate resource limits and requests

### Operations
1. **Regular Backups**: Implement automated backup procedures
2. **Monitoring**: Set up comprehensive monitoring and alerting
3. **Security Updates**: Keep the platform and dependencies updated
4. **Capacity Planning**: Monitor resource usage and plan for growth

### Security
1. **Principle of Least Privilege**: Grant minimal necessary permissions
2. **Network Segmentation**: Use network policies to isolate components
3. **Regular Audits**: Conduct security audits and vulnerability assessments
4. **Compliance**: Ensure adherence to organizational security policies

## Support

For on-premises SMP support:

- **Documentation**: Refer to the official Harness documentation
- **Community**: Join the Harness community forums
- **Enterprise Support**: Contact Harness support for enterprise customers
- **Professional Services**: Engage Harness professional services for implementation assistance

## Next Steps

1. **Plan Your Deployment**: Assess infrastructure requirements and design architecture
2. **Prepare Environment**: Set up Kubernetes cluster and prerequisites
3. **Install Platform**: Follow the installation guide step by step
4. **Configure Security**: Implement security best practices
5. **Start Testing**: Begin with simple chaos experiments to validate the setup
