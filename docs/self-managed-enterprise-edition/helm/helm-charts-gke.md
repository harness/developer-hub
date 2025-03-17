---
title: Helm Charts Guide for Google Kubernetes Engine (GKE)
description: This Guide provides detailed instructions for deploying Harness Self-Managed Enterprise Edition on Google Kubernetes Engine (GKE) using Helm chart.
sidebar_label: Helm Charts for GKE
sidebar_position: 2
---

# Helm Charts Guide for Google Kubernetes Engine (GKE)

## Overview
This guide provides detailed instructions for deploying Harness SMP on Google Kubernetes Engine (GKE) using Helm charts. It covers GKE-specific configurations, requirements, and best practices.

## Prerequisites

### GKE Cluster Requirements
```yaml
gke:
  version: "1.24"  # Minimum Kubernetes version
  nodes:
    minCount: 3
    machineType: "e2-standard-4"
    zones: 3
```

### Required Tools
- Google Cloud SDK
- kubectl (matching GKE version)
- Helm v3.x
- gcloud CLI

### IAM Requirements
```yaml
iam:
  serviceAccount:
    roles:
      - roles/container.admin
      - roles/storage.admin
      - roles/monitoring.admin
      - roles/logging.admin
```

## Installation Steps

### 1. Add Harness Repository
```bash
helm repo add harness https://harness.github.io/helm-charts
helm repo update
```

### 2. Create GKE-specific values file
```yaml
# gke-values.yaml
global:
  ha:
    enabled: true
    provider: "gcp"
  
  storageClass: "standard-rwo"
  
  gcp:
    project: "your-project-id"
    region: "us-central1"
    zone: "us-central1-a"
    
  loadbalancer:
    type: "gclb"
    annotations:
      cloud.google.com/load-balancer-type: "External"
      networking.gke.io/v1beta1.FrontendConfig: "harness-frontend-config"

platform:
  bootstrap:
    database:
      mongodb:
        persistence:
          storageClass: "standard-rwo"
          size: "100Gi"
      postgresql:
        persistence:
          storageClass: "standard-rwo"
          size: "50Gi"
```

### 3. Install Harness
```bash
kubectl create namespace harness
helm install harness harness/harness \
  -n harness \
  -f gke-values.yaml
```

## GKE-Specific Configurations

### Storage Classes
```yaml
storage:
  class: "standard-rwo"
  encryption:
    enabled: true
    kmsKeyName: "projects/your-project/locations/global/keyRings/harness/cryptoKeys/data-key"
  provisioner:
    type: "pd-standard"
```

### Network Policies
```yaml
networkPolicies:
  enabled: true
  vpc:
    network: "default"
    subnetwork: "default"
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

### GCP Service Integration
```yaml
gcp:
  integration:
    enabled: true
    serviceAccount:
      create: true
      annotations:
        iam.gke.io/gcp-service-account: "harness@your-project.iam.gserviceaccount.com"
    services:
      - storage
      - monitoring
      - logging
      - cloudkms
```

## High Availability Configuration

### Multi-Zone Deployment
```yaml
global:
  ha:
    enabled: true
    zones:
      - us-central1-a
      - us-central1-b
      - us-central1-c
    
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
  provider: "gcp"
  gcs:
    bucket: "harness-backup"
    location: "us-central1"
  schedule: "0 2 * * *"
  retention:
    days: 30
```

## Security Configuration

### Cloud KMS Integration
```yaml
security:
  encryption:
    provider: "gcp"
    kms:
      enabled: true
      keyName: "projects/your-project/locations/global/keyRings/harness/cryptoKeys/data-key"
      location: "global"
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

### Cloud Operations Integration
```yaml
monitoring:
  cloudOperations:
    enabled: true
    project: "your-project-id"
    logName: "harness-platform"
    metrics:
      enabled: true
      prefix: "harness"
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
            storageClassName: standard-rwo
```

## Performance Optimization

### Node Pools
```yaml
nodePools:
  - name: platform
    machineType: e2-standard-4
    minCount: 3
    maxCount: 10
    labels:
      role: platform
  - name: workload
    machineType: e2-standard-8
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
  gcs:
    enabled: true
    bucket: "harness-backup"
    location: "us-central1"
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
    preemptibleNodes:
      enabled: true
      maxPercentage: 50
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
- [GKE Documentation](https://cloud.google.com/kubernetes-engine/docs)
- [Harness GCP Integration](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcp-connector-reference/)
- [GCP Best Practices](https://cloud.google.com/kubernetes-engine/docs/best-practices)
