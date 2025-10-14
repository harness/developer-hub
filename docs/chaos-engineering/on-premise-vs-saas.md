---
title: On-premise vs SaaS
description: Choose between Harness Chaos Engineering SaaS and Self-Managed Enterprise Edition deployment options
sidebar_position: 3
---

# On-premise vs SaaS

Harness Chaos Engineering offers two deployment options to meet your organization's requirements. Choose between the fully managed SaaS solution or deploy the Self-Managed Enterprise Edition on-premises.

## Harness Chaos Engineering SaaS

### Overview
Harness SaaS is a fully managed, cloud-hosted solution that provides immediate access to chaos engineering capabilities without infrastructure setup or maintenance overhead.

### Key Features
- **Quick Setup**: Start running chaos experiments within minutes
- **Managed Infrastructure**: No need to manage underlying platform components
- **Automatic Updates**: Always access the latest features and patches
- **Enterprise ChaosHub**: Built-in access to 200+ pre-built chaos faults
- **AIDA Support**: AI Development Assistant for creating governance policies

### What's Included
- **Complete Platform**: Full chaos engineering capabilities out-of-the-box
- **Enterprise ChaosHub**: Access to comprehensive fault library
- **Harness AIDA**: AI assistant for policy creation and optimization
- **Managed Services**: Platform maintenance handled by Harness
- **Standard Integrations**: Built-in connectors for popular tools    

### Ideal For
- Organizations wanting to get started quickly
- Teams focused on application development over infrastructure
- Companies with standard compliance requirements
- Development and testing environments

## Self-Managed Enterprise Edition (On-Premise)

### Overview
The Self-Managed Enterprise Edition allows you to run Harness Chaos Engineering entirely within your own infrastructure, providing complete control over your chaos engineering environment.

### Key Features
- **Complete Data Control**: All data remains within your infrastructure
- **Feature Parity**: Same capabilities as SaaS with minor timeline differences
- **Network Isolation**: Deploy in air-gapped or restricted environments
- **Custom Configuration**: Tailor the platform to your specific needs
- **Enterprise Integration**: LDAP, SSO, and custom authentication

### Architecture Components
- **Chaos Control Plane**: Manages experiments and orchestration
- **Database Layer**: MongoDB and TimescaleDB for data storage
- **Monitoring Stack**: Prometheus and Grafana for observability
- **Authentication Service**: User management and access control
- **Load Balancer**: NGINX or Istio virtual services

### Infrastructure Requirements

#### Minimum Requirements
- **CPU**: 16 cores total
- **Memory**: 32 GB RAM
- **Storage**: 500 GB SSD
- **Kubernetes**: v1.21+ (any CNCF-certified distribution)

#### Recommended for Production
- **CPU**: 32+ cores
- **Memory**: 64+ GB RAM
- **Storage**: 1+ TB NVMe SSD
- **High Availability**: Multi-node setup with redundancy

### Deployment Options
- **Cloud**: Deploy on public cloud Kubernetes services
- **Connected**: On-premises with internet connectivity
- **Air-gapped**: Completely isolated environments
- **Signed Certificates**: Custom certificate management

### Limitations Compared to SaaS
- **Enterprise ChaosHub**: Not connected by default
  - Contact [Harness Support](mailto:support@harness.io) for access
  - Can be added as a [custom ChaosHub](/docs/chaos-engineering/guides/chaoshub)
- **Harness AIDA**: AI Development Assistant not available
- **Updates**: Manual deployment of platform updates required
- **Maintenance**: Customer responsibility for platform operations

## Feature Comparison

| Feature | SaaS | Self-Managed Enterprise |
|---------|------|-------------------------|
| **Setup Time** | Minutes | Days to Weeks |
| **Platform Maintenance** | Managed by Harness | Customer Responsibility |
| **Feature Updates** | Automatic | Manual Deployment |
| **Enterprise ChaosHub** | ✅ Included | ❌ Requires Setup |
| **Harness AIDA** | ✅ Available | ❌ Not Available |
| **Data Location** | Harness Cloud | Customer Infrastructure |
| **Air-gapped Deployment** | ❌ Not Supported | ✅ Supported |
| **Custom Integrations** | Standard APIs | Full API Access |
| **Compliance Control** | Shared Responsibility | Full Customer Control |

## Supported Platforms (Both Deployments)

Both SaaS and Self-Managed Enterprise Edition support the same target platforms:

### Kubernetes Distributions
- Amazon EKS (k8s 1.21+)
- Azure AKS (k8s 1.21+)
- Google GKE (k8s 1.21+)
- Red Hat OpenShift (k8s 1.21+)
- Rancher (k8s 1.21+)
- VMware Tanzu (k8s 1.21+)
- Self-managed clusters (k8s 1.21+)

### Operating Systems
- Ubuntu 16.04+
- Red Hat Enterprise Linux 7+
- CentOS 7+
- Debian 10+
- Fedora 30+
- openSUSE Leap 15.4+

### Chaos Fault Categories
Both deployments support the same fault types across Linux, Kubernetes, Windows, VMware, AWS, GCP, and Azure platforms.

## Making the Decision

### Choose SaaS If You:
- Want to get started quickly with minimal setup
- Prefer managed services and automatic updates
- Need immediate access to Enterprise ChaosHub
- Want to use Harness AIDA for policy creation
- Have standard security and compliance requirements

### Choose Self-Managed Enterprise Edition If You:
- Have strict data sovereignty requirements
- Need to deploy in air-gapped environments
- Require complete control over the platform
- Operate in highly regulated industries
- Have existing on-premises infrastructure expertise
- Need custom security implementations

## Getting Started

### SaaS Deployment
1. **Sign Up**: Create your Harness account at [app.harness.io](https://app.harness.io)
2. **Create Project**: Set up your first chaos engineering project
3. **Connect Infrastructure**: Link your Kubernetes clusters or cloud accounts
4. **Run First Experiment**: Follow the [getting started guide](./get-started)

### Self-Managed Enterprise Edition
1. **Contact Sales**: Discuss licensing and requirements
2. **Plan Infrastructure**: Review [system requirements](./guides/on-premises-smp)
3. **Install Platform**: Deploy using Helm charts
4. **Configure Access**: Set up authentication and networking
5. **Connect ChaosHub**: Request Enterprise ChaosHub access if needed

## Support

### SaaS Support
- **Included Support**: Platform maintenance and updates
- **Community Resources**: Documentation, forums, and examples
- **Enterprise Support**: Available for enterprise customers

### Self-Managed Support
- **Installation Guidance**: Professional services available
- **Platform Updates**: Customer-managed deployment
- **Enterprise Support**: Dedicated support for enterprise customers
- **Community Resources**: Access to documentation and forums

## Next Steps

1. **Review Requirements**: Assess your security, compliance, and operational needs
2. **Compare Options**: Use the feature comparison to evaluate both deployments
3. **Plan Deployment**: Choose the option that best fits your organization
4. **Get Started**: Follow the appropriate getting started guide

For detailed information about supported platforms and limitations, see [What's Supported](./whats-supported).
