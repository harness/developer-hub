---
title: Helm Charts Guide for Azure Kubernetes Service (AKS)
description: This Guide provides detailed instructions for deploying Harness Self-Managed Enterprise Edition on Azure Kubernetes Service (AKS) using Helm chart.
sidebar_label: Helm Charts for AKS
sidebar_position: 3
---

## Overview
This guide provides detailed instructions for deploying Harness SMP on Azure Kubernetes Service (AKS) using Helm charts. It covers AKS-specific configurations, requirements, and best practices.

## Prerequisites

### AKS Cluster Requirements
```yaml
aks:
  version: "1.24"  # Minimum Kubernetes version
  nodes:
    minCount: 3
    vmSize: "Standard_D4s_v3"
    zones: 3
```

### Required Tools
- Azure CLI
- kubectl (matching AKS version)
- Helm v3.x
- az aks CLI

### Azure RBAC Requirements
```yaml
rbac:
  roles:
    - name: "Azure Kubernetes Service Cluster Admin"
    - name: "Storage Blob Data Owner"
    - name: "Monitoring Metrics Publisher"
    - name: "Key Vault Secrets Officer"
```

## Installation Steps

### 1. Add Harness Repository
```bash
helm repo add harness https://harness.github.io/helm-charts
helm repo update
```

### 2. Create AKS-specific values file
```yaml
# aks-values.yaml
global:
  ha:
    enabled: true
    provider: "azure"
  
  storageClass: "managed-premium"
  
  azure:
    resourceGroup: "harness-rg"
    location: "eastus"
    
  loadbalancer:
    type: "standard"
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-resource-group: "harness-rg"
      service.beta.kubernetes.io/azure-load-balancer-internal: "false"

platform:
  bootstrap:
    database:
      mongodb:
        persistence:
          storageClass: "managed-premium"
          size: "100Gi"
      postgresql:
        persistence:
          storageClass: "managed-premium"
          size: "50Gi"
```

### 3. Install Harness
```bash
kubectl create namespace harness
helm install harness harness/harness \
  -n harness \
  -f aks-values.yaml
```

## AKS-Specific Configurations

### Storage Classes
```yaml
storage:
  class: "managed-premium"
  encryption:
    enabled: true
    keyVaultName: "harness-kv"
    keyName: "data-encryption-key"
  provisioner:
    type: "disk.csi.azure.com"
```

### Network Policies
```yaml
networkPolicies:
  enabled: true
  vnet:
    name: "harness-vnet"
    resourceGroup: "harness-rg"
  additionalPolicies:
    - name: "allow-monitoring"
      podSelector:
        matchLabels:
          role: monitoring
      ingress:
        - from:
            - namespaceSelector:
                matchLabels:
                  name: monitoring
```

### Azure Service Integration
```yaml
azure:
  integration:
    enabled: true
    identity:
      type: "managed"
      clientId: "system-assigned"
    services:
      - storage
      - keyvault
      - monitor
```

## High Availability Configuration

### Multi-Zone Deployment
```yaml
global:
  ha:
    enabled: true
    zones:
      - "1"
      - "2"
      - "3"
    
platform:
  topology:
    distribution:
      enabled: true
      antiAffinity:
        type: "hard"
```

### Backup and Recovery
```yaml
backup:
  enabled: true
  provider: "azure"
  storage:
    account: "harnessbackup"
    container: "backups"
  schedule: "0 2 * * *"
  retention:
    days: 30
```

## Security Configuration

### Key Vault Integration
```yaml
security:
  encryption:
    provider: "azure"
    keyVault:
      enabled: true
      name: "harness-kv"
      keyName: "data-encryption-key"
      identity:
        clientId: "system-assigned"
```

### Pod Security Policies
```yaml
podSecurityPolicy:
  enabled: true
  policies:
    - name: restricted
      spec:
        privileged: false
        seLinux:
          rule: RunAsAny
        runAsUser:
          rule: MustRunAsNonRoot
        fsGroup:
          rule: RunAsAny
```

## Monitoring and Logging

### Azure Monitor Integration
```yaml
monitoring:
  azureMonitor:
    enabled: true
    workspace:
      id: "/subscriptions/sub-id/resourceGroups/harness-rg/providers/Microsoft.OperationalInsights/workspaces/harness-logs"
    metrics:
      enabled: true
      namespace: "Harness"
```

### Prometheus Configuration
```yaml
prometheus:
  serviceMonitor:
    enabled: true
    namespace: monitoring
  alertmanager:
    enabled: true
    alertmanagerSpec:
      storage:
        volumeClaimTemplate:
          spec:
            storageClassName: managed-premium
```

## Performance Optimization

### Node Pools
```yaml
nodePools:
  - name: platform
    vmSize: "Standard_D4s_v3"
    minCount: 3
    maxCount: 10
    labels:
      role: platform
  - name: workload
    vmSize: "Standard_D8s_v3"
    minCount: 2
    maxCount: 20
    labels:
      role: workload
```

### Resource Quotas
```yaml
quotas:
  enabled: true
  specs:
    - name: compute-resources
      hard:
        requests.cpu: "30"
        requests.memory: 100Gi
        limits.cpu: "40"
        limits.memory: 120Gi
```

## Troubleshooting

### Common Issues

1. **Storage Issues**
```yaml
storage:
  debug:
    enabled: true
    provisioner:
      logs: true
```

2. **Network Connectivity**
```yaml
networking:
  diagnostics:
    enabled: true
    tools:
      - tcpdump
      - netcat
```

3. **Pod Scheduling**
```yaml
scheduling:
  debug:
    enabled: true
    events: true
```

## Maintenance

### Upgrade Process
```yaml
upgrade:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 25%
  hooks:
    pre:
      - backup
      - healthcheck
    post:
      - validation
```

### Backup Strategy
```yaml
backup:
  azure:
    enabled: true
    storage:
      account: "harnessbackup"
      container: "backups"
    schedule:
      full: "0 0 * * 0"
      incremental: "0 0 * * 1-6"
```

## Cost Optimization

### Resource Management
```yaml
resources:
  optimization:
    enabled: true
    spotInstances:
      enabled: true
      maxPrice: "on-demand"
    autoScaling:
      enabled: true
      targetCPUUtilization: 70
```

### Storage Optimization
```yaml
storage:
  optimization:
    enabled: true
    retention:
      enabled: true
      days: 30
    compression:
      enabled: true
```

## Additional Resources
- [AKS Documentation](https://docs.microsoft.com/en-us/azure/aks/)
- [Harness Azure Integration](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/azure-connector-reference/)
- [Azure Best Practices](https://docs.microsoft.com/en-us/azure/aks/best-practices)
