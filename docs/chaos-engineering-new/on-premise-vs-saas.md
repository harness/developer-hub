---
title: On-premise vs SaaS
description: Choose between Harness Chaos Engineering SaaS and on-premise deployment options
sidebar_position: 3
---

# On-premise vs SaaS

Harness Chaos Engineering offers flexible deployment options to meet your organization's security, compliance, and operational requirements. Choose between our fully managed SaaS solution or deploy on-premises for complete control.

## Harness Chaos Engineering SaaS

### Overview
The SaaS offering is a fully managed, cloud-hosted solution that provides immediate access to chaos engineering capabilities without infrastructure setup or maintenance overhead.

### Key Benefits

#### Quick Time to Value
- **Instant Setup**: Start running chaos experiments within minutes
- **No Infrastructure Management**: Focus on chaos engineering, not platform maintenance
- **Automatic Updates**: Always access the latest features and security patches
- **Global Availability**: 99.9% uptime SLA with global redundancy

#### Scalability and Performance
- **Auto-scaling**: Handles experiment load automatically
- **Global Edge**: Reduced latency with worldwide presence
- **High Availability**: Multi-region deployment with automatic failover
- **Performance Optimization**: Continuously optimized for speed and reliability

#### Cost Effectiveness
- **No Capital Expenditure**: Pay-as-you-use pricing model
- **Reduced Operational Costs**: No need for dedicated infrastructure teams
- **Predictable Pricing**: Transparent, usage-based billing
- **Free Tier Available**: Get started without upfront costs

### Ideal For
- **Startups and SMBs**: Organizations wanting to get started quickly
- **Cloud-First Companies**: Teams already using cloud services
- **Development Teams**: Groups focused on application development
- **Proof of Concepts**: Testing chaos engineering before full commitment

### Security and Compliance
- **SOC 2 Type II Certified**: Rigorous security controls
- **ISO 27001 Compliant**: International security standards
- **GDPR Compliant**: European data protection regulations
- **Data Encryption**: End-to-end encryption in transit and at rest

## Harness Chaos Engineering On-Premise

### Overview
The on-premise deployment gives you complete control over your chaos engineering platform, running entirely within your own infrastructure and security perimeter.

### Key Benefits

#### Complete Control
- **Data Sovereignty**: All data remains within your infrastructure
- **Custom Security Policies**: Implement organization-specific security controls
- **Network Isolation**: Run in air-gapped or highly restricted environments
- **Compliance Flexibility**: Meet specific regulatory requirements

#### Enterprise Integration
- **LDAP/AD Integration**: Seamless authentication with existing systems
- **Custom SSO**: Integration with enterprise identity providers
- **Network Policies**: Align with existing network security architecture
- **Audit Logging**: Comprehensive logging for compliance and security

#### Customization Options
- **Custom Faults**: Develop organization-specific fault types
- **API Extensions**: Build custom integrations and workflows
- **Branding**: White-label the platform for your organization
- **Resource Allocation**: Optimize for your specific workload patterns

### Ideal For
- **Large Enterprises**: Organizations with complex compliance requirements
- **Regulated Industries**: Financial services, healthcare, government
- **High-Security Environments**: Organizations with strict data policies
- **Custom Requirements**: Teams needing specialized functionality

### Infrastructure Requirements

#### Minimum Requirements
- **CPU**: 8 cores per node (minimum 3 nodes)
- **Memory**: 32 GB RAM per node
- **Storage**: 500 GB SSD per node
- **Network**: 1 Gbps connectivity

#### Recommended Requirements
- **CPU**: 16 cores per node (5+ nodes for HA)
- **Memory**: 64 GB RAM per node
- **Storage**: 1 TB NVMe SSD per node
- **Network**: 10 Gbps connectivity with redundancy

#### Supported Platforms
- **Kubernetes**: Any CNCF-certified distribution
- **Operating Systems**: RHEL 8+, Ubuntu 20.04+, CentOS 8+
- **Container Runtime**: Docker, containerd, CRI-O
- **Load Balancer**: NGINX, HAProxy, cloud load balancers

## Comparison Matrix

| Feature | SaaS | On-Premise |
|---------|------|------------|
| **Setup Time** | Minutes | Days to Weeks |
| **Maintenance** | Managed by Harness | Customer Responsibility |
| **Updates** | Automatic | Manual/Scheduled |
| **Scalability** | Auto-scaling | Manual scaling |
| **Data Location** | Harness Cloud | Customer Infrastructure |
| **Customization** | Limited | Extensive |
| **Integration** | Standard APIs | Full API + Custom |
| **Compliance** | Standard Certifications | Customer-Controlled |
| **Cost Model** | Usage-Based | License + Infrastructure |
| **Support** | 24/7 Included | Enterprise Support Plans |

## Security Considerations

### SaaS Security
- **Shared Responsibility Model**: Harness secures the platform, you secure your experiments
- **Data Encryption**: AES-256 encryption for data at rest and in transit
- **Network Security**: VPC isolation and private networking options
- **Access Control**: Multi-factor authentication and RBAC

### On-Premise Security
- **Full Control**: Complete ownership of security implementation
- **Air-Gapped Deployment**: Isolated from external networks if required
- **Custom Encryption**: Implement organization-specific encryption standards
- **Audit Trail**: Complete visibility into all system activities

## Migration Path

### SaaS to On-Premise
- **Export Configurations**: Download all experiment definitions and settings
- **Data Migration**: Transfer historical data and results
- **Team Training**: Transition support and training programs
- **Gradual Migration**: Phased approach to minimize disruption

### On-Premise to SaaS
- **Configuration Import**: Upload existing experiment definitions
- **Data Synchronization**: Migrate historical data to cloud
- **Team Onboarding**: Training on SaaS-specific features
- **Hybrid Operation**: Run both environments during transition

## Making the Decision

### Choose SaaS If You:
- Want to get started quickly with minimal setup
- Prefer managed services and automatic updates
- Have standard compliance requirements
- Want predictable, usage-based pricing
- Focus on application development over infrastructure

### Choose On-Premise If You:
- Have strict data sovereignty requirements
- Need extensive customization capabilities
- Operate in highly regulated industries
- Require air-gapped or isolated deployments
- Have existing infrastructure and operational expertise

## Getting Started

### SaaS
1. **Sign Up**: Create your free Harness account
2. **Connect Infrastructure**: Link your cloud accounts or Kubernetes clusters
3. **Run First Experiment**: Follow our quick start guide
4. **Scale Up**: Add team members and expand experiment scope

### On-Premise
1. **Contact Sales**: Discuss requirements and licensing
2. **Infrastructure Planning**: Design your deployment architecture
3. **Installation**: Deploy using Helm charts or operators
4. **Configuration**: Set up authentication, networking, and integrations
5. **Training**: Onboard your team with expert guidance

## Support and Services

Both deployment options include:
- **Technical Support**: Expert assistance for setup and operations
- **Professional Services**: Implementation and best practices consulting
- **Training Programs**: Comprehensive chaos engineering education
- **Community Resources**: Access to documentation, forums, and examples

Ready to choose your deployment model? [Contact our team](https://harness.io/contact-sales) to discuss your specific requirements and get personalized recommendations.
