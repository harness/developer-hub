---
title: Prerequisites
sidebar_position: 2
description: Prerequisites and requirements for deploying Harness Chaos Engineering on SMP
---

# Prerequisites

This guide outlines the prerequisites and requirements for deploying Harness Chaos Engineering on Self-Managed Platform (SMP).

## Infrastructure Requirements

### Kubernetes Cluster

| Component | Requirement | Notes |
|-----------|-------------|-------|
| **Kubernetes Version** | 1.20+ | Recommended: 1.24+ |
| **Cluster Size** | Minimum 3 nodes | Production: 5+ nodes |
| **Node Resources** | 4 CPU, 8GB RAM per node | Minimum per node |
| **Storage** | 100GB+ persistent storage | For databases and logs |
| **Network** | CNI compatible | Calico, Flannel, or Weave |

### Hardware Specifications

#### Minimum Requirements
- **CPU**: 12 cores total across cluster
- **Memory**: 24GB RAM total across cluster
- **Storage**: 200GB persistent storage
- **Network**: 1Gbps network connectivity

#### Recommended for Production
- **CPU**: 24+ cores total across cluster
- **Memory**: 48GB+ RAM total across cluster
- **Storage**: 500GB+ persistent storage with SSD
- **Network**: 10Gbps network connectivity

## Container Runtime

### Supported Runtimes
- **Docker**: 20.10+
- **containerd**: 1.5+
- **CRI-O**: 1.20+

### Container Registry Access
- Access to Harness container registry
- Private registry configuration (for air-gapped environments)
- Image pull secrets configuration

## Version Compatibility

### SMP and Chaos Manager Versions

The table below describes the SMP version and its equivalent chaos manager image required to connect to Enterprise ChaosHub:

| **SMP Version** | **Chaos Manager Image** | **Release Date** |
| --- | --- | --- |
| 0.26.x | docker.io/harness/smp-chaos-manager-signed:1.54.1 | Latest |
| 0.25.x | docker.io/harness/smp-chaos-manager-signed:1.53.2 | Previous |
| 0.24.x | docker.io/harness/smp-chaos-manager-signed:1.49.3 | Legacy |
| 0.23.x | docker.io/harness/smp-chaos-manager-signed:1.47.7 | Legacy |

### Update Configuration

Update the chaos-manager image tag in your helm-override file:

```yaml
chaos:
  chaos-manager:
    image:
      tag: "1.54.1" # Update to latest version
      repository: "harness/smp-chaos-manager-signed"
    resources:
      requests:
        memory: "512Mi"
        cpu: "500m"
      limits:
        memory: "1Gi"
        cpu: "1000m"
```

## Network Requirements

### Ingress Controllers

| Controller | Support Status | Configuration |
|------------|----------------|---------------|
| **NGINX** | ✅ Fully Supported | Default configuration |
| **Istio** | ✅ Virtual Services | Custom configuration required |
| **Traefik** | ⚠️ Community Support | Manual configuration |
| **HAProxy** | ⚠️ Community Support | Manual configuration |

### Network Connectivity

#### Outbound Connectivity (for connected environments)
- **GitHub**: https://github.com (for ChaosHub)
- **Docker Hub**: https://hub.docker.com (for images)
- **Harness Registry**: registry.harness.io
- **License Server**: app.harness.io (for license validation)

#### Internal Connectivity
- **Kubernetes API**: Port 6443
- **etcd**: Port 2379-2380
- **Node Communication**: Port 10250
- **Service Mesh**: Ports as configured

### Firewall Rules

```bash
# Kubernetes API Server
iptables -A INPUT -p tcp --dport 6443 -j ACCEPT

# Node Communication
iptables -A INPUT -p tcp --dport 10250 -j ACCEPT

# Service NodePort Range
iptables -A INPUT -p tcp --dport 30000:32767 -j ACCEPT

# Ingress HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## Database Requirements

### Supported Databases

| Database | Version | Purpose | Storage |
|----------|---------|---------|---------|
| **MongoDB** | 4.4+ | Primary data store | 50GB+ |
| **Redis** | 6.0+ | Caching and sessions | 10GB+ |
| **TimescaleDB** | 2.0+ | Time-series metrics | 100GB+ |

### Database Configuration

#### MongoDB
```yaml
mongodb:
  enabled: true
  architecture: replicaset
  replicaCount: 3
  auth:
    enabled: true
    rootPassword: "secure-password"
  persistence:
    enabled: true
    size: 100Gi
    storageClass: "fast-ssd"
```

#### Redis
```yaml
redis:
  enabled: true
  architecture: standalone
  auth:
    enabled: true
    password: "secure-password"
  master:
    persistence:
      enabled: true
      size: 20Gi
```

## Security Requirements

### RBAC Configuration

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: chaos-engineering-admin
rules:
- apiGroups: [""]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["apps"]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["litmuschaos.io"]
  resources: ["*"]
  verbs: ["*"]
```

### Service Accounts

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: chaos-engineering-sa
  namespace: harness-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: chaos-engineering-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: chaos-engineering-admin
subjects:
- kind: ServiceAccount
  name: chaos-engineering-sa
  namespace: harness-system
```

### Pod Security Standards

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: harness-system
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

## Storage Requirements

### Persistent Volume Claims

```yaml
# Database storage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi
  storageClassName: fast-ssd
---
# Log storage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: chaos-logs
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 200Gi
  storageClassName: shared-storage
```

### Storage Classes

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
reclaimPolicy: Retain
allowVolumeExpansion: true
```

## Tools and Dependencies

### Required Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Helm** | 3.8+ | Package management |
| **kubectl** | 1.20+ | Cluster management |
| **Docker** | 20.10+ | Container operations |
| **Git** | 2.30+ | Source control |

### Installation Commands

```bash
# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Verify installations
helm version
kubectl version --client
```

## Pre-installation Checks

### Cluster Validation Script

```bash
#!/bin/bash
# cluster-check.sh

echo "🔍 Checking Kubernetes cluster prerequisites..."

# Check kubectl connectivity
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Cannot connect to Kubernetes cluster"
    exit 1
fi

# Check node resources
NODES=$(kubectl get nodes --no-headers | wc -l)
if [ $NODES -lt 3 ]; then
    echo "⚠️  Warning: Less than 3 nodes detected ($NODES)"
fi

# Check storage classes
STORAGE_CLASSES=$(kubectl get storageclass --no-headers | wc -l)
if [ $STORAGE_CLASSES -eq 0 ]; then
    echo "❌ No storage classes found"
    exit 1
fi

# Check ingress controller
if ! kubectl get pods -A | grep -E "(nginx|istio|traefik)" &> /dev/null; then
    echo "⚠️  Warning: No ingress controller detected"
fi

echo "✅ Cluster validation completed"
```

### Resource Availability Check

```bash
#!/bin/bash
# resource-check.sh

echo "📊 Checking resource availability..."

# Check CPU and memory
kubectl top nodes 2>/dev/null || echo "⚠️  Metrics server not available"

# Check storage
kubectl get pv,pvc -A

# Check network policies
kubectl get networkpolicies -A

echo "✅ Resource check completed"
```

## Additional Resources

- [SMP Installation Guide](/docs/self-managed-enterprise-edition/install/)
- [Helm Installation Guide](/docs/self-managed-enterprise-edition/install/install-using-helm)
- [Security Best Practices](/docs/chaos-engineering/security/)
- [Troubleshooting Guide](/docs/chaos-engineering/troubleshooting/)

---

**Next Steps:**
- Review [installation guide](/docs/self-managed-enterprise-edition/install/)
- Configure [proxy settings](/docs/chaos-engineering-new/guides/on-premises-smp/connect-infrastructure) (if needed)
- Set up [Enterprise ChaosHub](/docs/chaos-engineering-new/guides/on-premises-smp/connect-enterprise-chaoshub)
