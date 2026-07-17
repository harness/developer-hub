---
title: Deployment Options
sidebar_position: 3
description: Choose between SaaS and Self-Managed Platform deployments
---

Harness Resilience Testing can be deployed in two ways to meet your organization's needs.

## SaaS

**Fully managed cloud service** hosted by Harness with automatic updates and scaling.

### Benefits
- Quick setup with minimal configuration
- Automatic updates and maintenance
- Scalable infrastructure managed by Harness
- Access from anywhere with internet connectivity

### Prerequisites
- Harness account
- Network connectivity to Harness SaaS endpoints
- Appropriate firewall rules for outbound HTTPS (port 443)

### Getting Started
1. [Sign up for Harness](https://app.harness.io/auth/#/signup)
2. Create your first project
3. [Install chaos infrastructure](./chaos-testing/infrastructure)
4. [Run your first chaos experiment](./chaos-testing/get-started)

## On-Premise (Self-Managed Platform)

**Deploy in your own infrastructure** for complete control over data and compliance.

### Benefits
- Full control over deployment environment
- Data remains within your infrastructure
- Custom security policies and compliance
- Air-gapped deployment support

### Prerequisites
- Kubernetes cluster for Harness Platform
- Sufficient resources for control plane components
- Network connectivity between components
- Valid Harness license

### Getting Started
1. Review [SMP installation guide](/docs/self-managed-enterprise-edition/install/install-using-helm)
2. Install Harness Platform in your environment
3. Configure [chaos infrastructure](./chaos-testing/infrastructure)
4. [Run your first chaos experiment](./chaos-testing/get-started)

For more information about SMP, see [Self-Managed Platform documentation](./chaos-testing/on-premises-smp).

## Comparison

| Feature | SaaS | Self-Managed Platform |
|---------|------|----------------------|
| **Setup Time** | Minutes | Hours to Days |
| **Maintenance** | Managed by Harness | Self-managed |
| **Updates** | Automatic | Manual |
| **Data Location** | Harness Cloud | Your Infrastructure |
| **Customization** | Standard | Full Control |
| **Air-gapped Support** | No | Yes |

## Next Steps

- [Understand key concepts](./key-concepts)
- [Learn about architecture](./architecture)
- [Explore chaos testing features](./chaos-testing/get-started)
