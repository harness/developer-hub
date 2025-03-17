---
title: Helm Charts Guide for Amazon EKS
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Elastic Kubernetes Service (EKS) using a Helm chart.
sidebar_label: Helm Charts for EKS
sidebar_position: 1
---

## Overview
This guide provides detailed instructions for deploying Harness SMP on Amazon Elastic Kubernetes Service (EKS) using Helm charts. It covers EKS-specific configurations, requirements, and best practices.

## Prerequisites

### EKS Cluster Requirements
```yaml
eks:
  version: "1.24"  # Minimum Kubernetes version
  nodes:
    minCount: 3
    instanceType: "t3.xlarge"
    zones: 3
```

### Required Tools
- AWS CLI v2.x
- kubectl (matching EKS version)
- Helm v3.x
- eksctl (for cluster management)

### IAM Requirements
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:*",
                "ec2:*",
                "elasticloadbalancing:*",
                "autoscaling:*",
                "cloudwatch:*"
            ],
            "Resource": "*"
        }
    ]
}
```

## Installation Steps

### 1. Add Harness Repository
```bash
helm repo add harness https://harness.github.io/helm-charts
helm repo update
```

### 2. Create EKS-specific values file
```yaml
# eks-values.yaml
global:
  ha:
    enabled: true
    provider: "aws"
  
  storageClass: "gp3"
  
  aws:
    region: "us-west-2"
    zone: "us-west-2a"
    
  loadbalancer:
    type: "nlb"
    annotations:
      service.beta.kubernetes.io/aws-load-balancer-type: nlb
      service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"

platform:
  bootstrap:
    database:
      mongodb:
        persistence:
          storageClass: "gp3"
          size: "100Gi"
      postgresql:
        persistence:
          storageClass: "gp3"
          size: "50Gi"
```

### 3. Install Harness
```bash
kubectl create namespace harness
helm install harness harness/harness \
  -n harness \
  -f eks-values.yaml
```

## EKS-Specific Configurations

### Storage Classes
```yaml
storage:
  class: "gp3"
  encryption:
    enabled: true
    kmsKeyId: "arn:aws:kms:region:account:key/key-id"
  provisioner:
    type: "ebs"
```

### Network Policies
```yaml
networkPolicies:
  enabled: true
  vpc:
    cidr: "10.0.0.0/16"
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

### AWS Service Integration
```yaml
aws:
  integration:
    enabled: true
    serviceAccount:
      create: true
      annotations:
        eks.amazonaws.com/role-arn: "arn:aws:iam::account:role/harness-role"
    services:
      - s3
      - dynamodb
      - kms
```

## High Availability Configuration

### Multi-AZ Deployment
```yaml
global:
  ha:
    enabled: true
    zones:
      - us-west-2a
      - us-west-2b
      - us-west-2c
    
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
  provider: "aws"
  s3:
    bucket: "harness-backup"
    region: "us-west-2"
  schedule: "0 2 * * *"
  retention:
    days: 30
```

## Security Configuration

### AWS KMS Integration
```yaml
security:
  encryption:
    provider: "aws"
    kms:
      enabled: true
      keyId: "arn:aws:kms:region:account:key/key-id"
      region: "us-west-2"
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

### CloudWatch Integration
```yaml
monitoring:
  cloudwatch:
    enabled: true
    region: "us-west-2"
    logGroups:
      - name: "/harness/platform"
        retention: 30
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
            storageClassName: gp3
```

## Performance Optimization

### Node Groups
```yaml
nodeGroups:
  - name: platform
    instanceType: t3.xlarge
    minSize: 3
    maxSize: 10
    labels:
      role: platform
  - name: workload
    instanceType: t3.2xlarge
    minSize: 2
    maxSize: 20
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
  s3:
    enabled: true
    bucket: "harness-backup"
    region: "us-west-2"
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
- [EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Harness EKS Integration](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-reference/)
- [AWS Best Practices](https://aws.amazon.com/eks/best-practices/)
