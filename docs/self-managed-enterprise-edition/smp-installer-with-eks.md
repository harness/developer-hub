---
title: Self-Managed Enterprise Edition for Amazon EKS
description: This guide provides detailed instructions for deploying the Harness Self-Managed Enterprise Edition on Elastic Kubernetes Service (EKS).
sidebar_label: SMP Installer for EKS
sidebar_position: 5
---

## Overview
This guide provides step-by-step instructions for using the Harness SMP Installer to deploy Harness on Amazon EKS. The installer simplifies the deployment process by automating cluster preparation, dependency installation, and configuration.

### AWS Requirements
```yaml
aws:
  credentials:
    type: "iam"  # or "access-key"
    region: "us-west-2"
  permissions:
    - "eks:*"
    - "ec2:*"
    - "elasticloadbalancing:*"
    - "autoscaling:*"
    - "iam:*"
```

### Cluster Requirements
```yaml
cluster:
  kubernetes:
    version: "1.24"
    nodes:
      count: 3
      type: "t3.xlarge"
  networking:
    vpc:
      new: true  # Set to false to use existing VPC
      cidr: "10.0.0.0/16"
    subnets:
      public: 3
      private: 3
```

## Installation Methods

### 1. Interactive Installation
```bash
# Download and run the installer
curl -O https://harness.io/downloads/smp-installer-eks
chmod +x smp-installer-eks

# Run in interactive mode
./smp-installer-eks install --interactive
```

### 2. Automated Installation
```bash
# Using configuration file
./smp-installer-eks install \
  --config harness-config.yaml \
  --non-interactive
```

## Configuration File

### Basic Configuration
```yaml
# harness-config.yaml
installer:
  version: "1.0.0"
  mode: "production"

cluster:
  name: "harness-smp"
  region: "us-west-2"
  zones:
    - "us-west-2a"
    - "us-west-2b"
    - "us-west-2c"

harness:
  version: "1.0.0"
  license:
    ng: "your-ng-license"
    looker: "your-looker-license"
  
  modules:
    platform: true
    ci: true
    cd: true
    ccm: true
    sto: true
```

### Advanced Configuration
```yaml
networking:
  vpc:
    id: "vpc-xxxxxx"  # For existing VPC
    subnets:
      private:
        - "subnet-xxxxx1"
        - "subnet-xxxxx2"
        - "subnet-xxxxx3"
      public:
        - "subnet-xxxxx4"
        - "subnet-xxxxx5"
        - "subnet-xxxxx6"
  
  loadBalancer:
    type: "nlb"
    internal: false
    ssl:
      enabled: true
      acmArn: "arn:aws:acm:region:account:certificate/cert-id"

storage:
  class: "gp3"
  encryption:
    enabled: true
    kmsKeyId: "arn:aws:kms:region:account:key/key-id"

security:
  encryption:
    enabled: true
    provider: "aws"
    kms:
      create: true
      keyAlias: "harness-encryption"
```

## Installation Process

### 1. Pre-flight Checks
```yaml
preflight:
  checks:
    - aws-credentials
    - permissions
    - network-connectivity
    - resource-requirements
```

### 2. Infrastructure Setup
```yaml
infrastructure:
  setup:
    order:
      - vpc
      - subnets
      - security-groups
      - iam-roles
      - eks-cluster
      - node-groups
```

### 3. Dependency Installation
```yaml
dependencies:
  install:
    - aws-load-balancer-controller
    - external-dns
    - cert-manager
    - prometheus-operator
```

### 4. Harness Deployment
```yaml
deployment:
  sequence:
    - namespace-creation
    - secrets-setup
    - platform-installation
    - module-enablement
    - validation
```

## Customization Options

### Node Groups
```yaml
nodeGroups:
  - name: platform
    instanceType: t3.xlarge
    minSize: 3
    maxSize: 10
    labels:
      role: platform
    taints: []
    
  - name: workload
    instanceType: t3.2xlarge
    minSize: 2
    maxSize: 20
    labels:
      role: workload
    taints:
      - key: workload
        value: ci
        effect: NoSchedule
```

### Monitoring Setup
```yaml
monitoring:
  prometheus:
    enabled: true
    retention: 15d
    storage:
      size: 100Gi
  
  grafana:
    enabled: true
    adminPassword: "auto-generate"
    persistence:
      enabled: true
      size: 10Gi
```

## Security Configurations

### Network Policies
```yaml
security:
  networkPolicies:
    enabled: true
    default:
      deny: true
    custom:
      - name: allow-monitoring
        pods:
          selector:
            role: monitoring
        ingress:
          - from:
              - namespaceSelector:
                  name: monitoring
```

### Pod Security
```yaml
security:
  podSecurity:
    enabled: true
    policies:
      - name: restricted
        enforce:
          - runAsNonRoot
          - restrictPrivilegeEscalation
```

## Backup Configuration

### Automated Backups
```yaml
backup:
  enabled: true
  provider: aws
  schedule: "0 2 * * *"
  retention: 30
  storage:
    bucket: "harness-backup"
    region: "us-west-2"
```

## Troubleshooting

### Installation Logs
```yaml
logging:
  level: debug
  output:
    file: "install.log"
    console: true
  components:
    - installer
    - kubernetes
    - aws
```

### Common Issues

1. **Cluster Creation Failure**
```yaml
debug:
  cluster:
    logs: true
    events: true
    timeout: 30m
```

2. **Network Issues**
```yaml
debug:
  network:
    connectivity: true
    dns: true
    loadbalancer: true
```

3. **Permission Issues**
```yaml
debug:
  permissions:
    check: true
    verbose: true
```

## Maintenance

### Upgrade Process
```yaml
upgrade:
  strategy:
    type: rolling
    maxUnavailable: 25%
  backup:
    enabled: true
    verify: true
  rollback:
    enabled: true
    automatic: true
```

### Health Checks
```yaml
health:
  checks:
    enabled: true
    interval: 5m
    timeout: 1m
    components:
      - platform
      - database
      - modules
```

