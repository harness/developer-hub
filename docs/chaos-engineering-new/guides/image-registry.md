---
title: Image Registry
description: Configure custom container image registries for chaos experiments
sidebar_position: 11
---

# Image Registry

Configure custom container image registries to use private or internal images for chaos experiments, providing better security and control over the container images used in your chaos engineering workflows.

## Overview

Image registry configuration allows you to:
- **Use private container images** for chaos experiments
- **Control image sources** and versions
- **Implement security policies** for container usage
- **Support air-gapped environments** with internal registries
- **Ensure compliance** with organizational image policies

## Why Use Custom Image Registry

### Security Benefits
- **Private image access** for sensitive environments
- **Controlled image sources** to prevent unauthorized containers
- **Vulnerability scanning** integration with your registry
- **Access control** through registry authentication

### Operational Benefits
- **Consistent image versions** across environments
- **Faster image pulls** from local or regional registries
- **Reduced external dependencies** for critical experiments
- **Better compliance** with organizational policies

## Configuration Levels

Image registry can be configured at multiple levels:

### Account Level
- **Global default** for all projects and infrastructures
- **Centralized management** by platform administrators
- **Consistent policies** across the organization
- **Override permissions** for lower levels

### Organization Level
- **Organization-specific** image policies
- **Inherits from account** if not overridden
- **Department or team** specific configurations
- **Flexible policy management**

### Project Level
- **Project-specific** image requirements
- **Development team** control over images
- **Environment-specific** configurations
- **Granular policy application**

### Infrastructure Level
- **Infrastructure-specific** image sources
- **Environment isolation** through different registries
- **Performance optimization** with local registries
- **Compliance requirements** per environment

## Registry Types

### Public Registries
For publicly accessible images:
- **Docker Hub** - Default public registry
- **Google Container Registry** - GCR public images
- **Amazon ECR Public** - AWS public registry
- **GitHub Container Registry** - Public GitHub packages

### Private Registries
For restricted access images:
- **Docker Hub Private** - Private repositories on Docker Hub
- **Amazon ECR** - AWS Elastic Container Registry
- **Google Container Registry** - GCR private repositories
- **Azure Container Registry** - ACR private images
- **Harbor** - Open source enterprise registry
- **Artifactory** - JFrog enterprise registry

## Configuration Steps

### Basic Configuration

1. **Navigate to Settings**
   - Go to Account/Organization/Project Settings
   - Select "Image Registry (For Chaos)"

2. **Configure Registry Details**
   ```yaml
   registry:
     server: "your-registry.example.com"
     account: "your-account-name"
     type: "private"  # or "public"
   ```

3. **Set Authentication**
   - For private registries, provide authentication details
   - Use Kubernetes secrets for credential management
   - Configure pull secrets for image access

### Advanced Configuration

#### Custom Images
Specify custom images for different components:

```yaml
custom_images:
  chaos_runner: "your-registry.com/chaos/runner:v1.0.0"
  chaos_operator: "your-registry.com/chaos/operator:v1.0.0"
  log_watcher: "your-registry.com/chaos/log-watcher:v1.0.0"
  go_runner: "your-registry.com/chaos/go-runner:v1.0.0"
```

#### Registry Authentication
Configure authentication for private registries:

```yaml
authentication:
  type: "kubernetes_secret"
  secret_name: "registry-credentials"
  namespace: "harness-chaos"
```

#### Override Permissions
Enable lower-level overrides:
- **Allow Overrides** - Permit configuration at lower levels
- **Inheritance** - Use parent level configuration as default
- **Validation** - Ensure configuration consistency

## Required Images

### For Harness Delegate (DDCR)
```yaml
required_images:
  - "harness/chaos-ddcr:latest"
  - "harness/chaos-log-watcher:latest"
  - "harness/service-discovery-collector:latest"
  - "harness/chaos-ddcr-faults:latest"
```

### For Dedicated Infrastructure
```yaml
required_images:
  - "harness/chaos-log-watcher:latest"
  - "harness/chaos-workflow-controller:latest"
  - "harness/chaos-argoexec:latest"
  - "harness/chaos-exporter:latest"
  - "harness/chaos-operator:latest"
  - "harness/chaos-runner:latest"
  - "harness/chaos-subscriber:latest"
  - "harness/chaos-go-runner:latest"
  - "harness/k8s-chaos-infrastructure-upgrader:latest"
```

## Implementation Examples

### Docker Hub Private Registry
```yaml
image_registry:
  server: "docker.io"
  account: "your-dockerhub-username"
  type: "private"
  authentication:
    secret_name: "dockerhub-secret"
```

### Amazon ECR
```yaml
image_registry:
  server: "123456789012.dkr.ecr.us-west-2.amazonaws.com"
  account: "your-aws-account"
  type: "private"
  authentication:
    type: "aws_ecr"
    region: "us-west-2"
```

### Google Container Registry
```yaml
image_registry:
  server: "gcr.io"
  account: "your-gcp-project"
  type: "private"
  authentication:
    type: "gcp_service_account"
    key_file: "service-account-key.json"
```

### Harbor Registry
```yaml
image_registry:
  server: "harbor.company.com"
  account: "chaos-engineering"
  type: "private"
  authentication:
    username: "chaos-user"
    password_secret: "harbor-credentials"
```

## Security Considerations

### Access Control
- **Least privilege** access for chaos components
- **Separate credentials** for different environments
- **Regular credential rotation** for security
- **Audit logging** for registry access

### Image Security
- **Vulnerability scanning** of custom images
- **Image signing** and verification
- **Base image updates** for security patches
- **Compliance scanning** for policy adherence

### Network Security
- **Private network** access to internal registries
- **TLS encryption** for registry communication
- **Firewall rules** for registry access
- **VPN or private links** for secure connectivity

## Troubleshooting

### Common Issues

**Image pull failures:**
- Verify registry credentials and permissions
- Check network connectivity to registry
- Confirm image names and tags are correct
- Review Kubernetes pull secret configuration

**Authentication errors:**
- Validate credential format and encoding
- Check secret creation and namespace
- Verify registry authentication method
- Review RBAC permissions for service accounts

**Configuration not taking effect:**
- Confirm configuration level hierarchy
- Check override permissions and inheritance
- Verify infrastructure-specific settings
- Review experiment manifest generation

### Diagnostic Steps

1. **Test registry connectivity** from infrastructure
2. **Verify image availability** in configured registry
3. **Check authentication** with registry credentials
4. **Review experiment logs** for image pull errors
5. **Validate configuration** at appropriate level

## Best Practices

### Registry Management
- **Use dedicated registries** for chaos engineering images
- **Implement image lifecycle** management policies
- **Monitor registry usage** and performance
- **Maintain image documentation** and versioning

### Security
- **Regular security scans** of custom images
- **Credential management** through secure storage
- **Network isolation** for registry access
- **Audit trail** for configuration changes

### Operations
- **Test configurations** in non-production environments
- **Document registry policies** and procedures
- **Monitor image pull performance** and reliability
- **Plan for registry maintenance** and updates

## Next Steps

Ready to configure custom image registries for your chaos experiments?

1. **[Set up Infrastructure](./infrastructures)** - Configure infrastructure with custom registries
2. **[Create Experiments](./chaos-experiments)** - Use custom images in your experiments
3. **[Configure Security](../security)** - Implement security policies for image usage
4. **[Monitor with Probes](./probes)** - Track image registry performance and usage

Custom image registry configuration provides the foundation for secure, compliant, and efficient chaos engineering in enterprise environments.
