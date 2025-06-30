---
title: FAQ
description: Frequently asked questions about Harness Chaos Engineering
sidebar_position: 2
---

# Frequently Asked Questions

This section covers frequently asked questions about Harness Chaos Engineering.

## General Questions

### What is Harness Chaos Engineering?

Harness Chaos Engineering is a comprehensive platform for implementing chaos engineering practices in your infrastructure. It helps you proactively identify weaknesses in your systems by introducing controlled failures and observing how your applications respond.

### How does Harness Chaos Engineering work?

Harness Chaos Engineering works by:
1. **Infrastructure Setup**: Deploy chaos infrastructure in your target environment
2. **Experiment Design**: Create chaos experiments using pre-built templates or custom configurations
3. **Execution**: Run experiments in a controlled manner with safety mechanisms
4. **Analysis**: Analyze results and resilience scores to identify improvements
5. **Continuous Improvement**: Iterate and improve system resilience based on findings

### What platforms does Harness Chaos Engineering support?

Harness Chaos Engineering supports:
- **Kubernetes**: Native support for Kubernetes clusters
- **Linux**: Linux-based infrastructure and applications
- **Windows**: Windows infrastructure (with some limitations)
- **Cloud Platforms**: AWS, GCP, Azure, and other cloud providers
- **On-premises**: Self-managed environments

## Infrastructure Questions

### How do I set up chaos infrastructure?

To set up chaos infrastructure:
1. Navigate to the Chaos Engineering module in Harness
2. Go to **Environments** and select **New Environment**
3. Choose your infrastructure type (Kubernetes, Linux, Windows)
4. Follow the installation instructions provided
5. Verify the infrastructure connection

### Can I run chaos experiments in production?

Yes, but with proper precautions:
- Start with non-critical environments first
- Use blast radius controls to limit impact
- Implement proper monitoring and alerting
- Have rollback procedures ready
- Use ChaosGuard policies for governance
- Schedule experiments during maintenance windows

### What are the minimum system requirements?

**For Kubernetes:**
- Kubernetes cluster version 1.16+
- Minimum 2 CPU cores and 4GB RAM
- Network connectivity to Harness platform

**For Linux:**
- Linux distribution with systemd support
- Minimum 1 CPU core and 2GB RAM
- Root or sudo access for installation

**For Windows:**
- Windows Server 2016+ or Windows 10+
- 64-bit architecture
- Administrator privileges

## Experiment Questions

### How do I create my first chaos experiment?

To create your first experiment:
1. Go to **Chaos Experiments** in the Harness platform
2. Click **New Experiment**
3. Choose a template from ChaosHub or start from scratch
4. Configure target infrastructure and fault parameters
5. Add resilience probes for validation
6. Save and run the experiment

### What types of faults are available?

Harness Chaos Engineering provides various fault categories:
- **Pod Faults**: Pod deletion, CPU stress, memory stress
- **Node Faults**: Node drain, network loss, disk stress
- **Network Faults**: Network latency, packet loss, DNS errors
- **Application Faults**: HTTP errors, database failures
- **Cloud Faults**: EC2 instance termination, EBS volume detachment
- **Custom Faults**: Build your own using the fault development framework

### How do I measure experiment success?

Experiment success is measured through:
- **Resilience Score**: Automated scoring based on probe results
- **Probe Results**: HTTP, command, and Kubernetes probes
- **SLI/SLO Compliance**: Service level indicators and objectives
- **Business Metrics**: Custom metrics relevant to your application
- **Recovery Time**: Time taken for system recovery

## Security Questions

### Is chaos engineering safe for my production environment?

When implemented properly, yes:
- Use proper RBAC and access controls
- Implement blast radius controls
- Start with low-impact experiments
- Use staging environments for validation
- Implement proper monitoring and alerting
- Have incident response procedures ready

### What security controls are available?

Harness Chaos Engineering provides:
- **Role-Based Access Control (RBAC)**: Control who can run experiments
- **ChaosGuard Policies**: Governance and compliance controls
- **Namespace Isolation**: Isolate experiments to specific namespaces
- **Security Templates**: Pre-built security policies (PSP, Kyverno, OPA)
- **Audit Logging**: Complete audit trail of all activities
- **Secrets Management**: Secure handling of sensitive information

### How do I implement security best practices?

Follow these security best practices:
1. Use least privilege access principles
2. Implement proper network segmentation
3. Use security templates and policies
4. Enable comprehensive audit logging
5. Regular security reviews and assessments
6. Implement defense in depth strategies

## Integration Questions

### Can I integrate with CI/CD pipelines?

Yes, Harness Chaos Engineering integrates with:
- **Harness CD**: Native integration with deployment pipelines
- **Jenkins**: Plugin available for Jenkins integration
- **GitLab CI**: API-based integration
- **GitHub Actions**: Custom actions for GitHub workflows
- **Other CI/CD Tools**: REST API for custom integrations

### What monitoring tools are supported?

Harness Chaos Engineering integrates with:
- **Prometheus**: Metrics collection and alerting
- **Grafana**: Visualization and dashboards
- **Datadog**: APM and infrastructure monitoring
- **New Relic**: Application performance monitoring
- **Splunk**: Log analysis and SIEM
- **Custom Tools**: REST API for custom integrations

### How do I integrate with incident management tools?

Integration options include:
- **PagerDuty**: Automated incident creation
- **ServiceNow**: ITSM integration
- **Slack**: Real-time notifications
- **Microsoft Teams**: Collaboration and alerts
- **Webhooks**: Custom integrations via REST API

## Troubleshooting Questions

### My experiment is stuck in QUEUED state. What should I do?

Check the following:
1. Verify infrastructure connectivity
2. Check resource availability in the cluster
3. Review chaos infrastructure logs
4. Ensure proper RBAC permissions
5. Check for resource quotas or limits

### How do I debug failed experiments?

To debug failed experiments:
1. Check experiment execution logs
2. Review infrastructure and target application logs
3. Verify probe configurations
4. Check network connectivity
5. Review security policies and permissions
6. Use the troubleshooting guide for specific error patterns

### Where can I get help?

For additional support:
- **Documentation**: [Harness Chaos Engineering Docs](/docs/chaos-engineering-new/)
- **Community**: [Harness Community Forum](https://community.harness.io/)
- **Support**: [Harness Support Portal](https://support.harness.io/)
- **Training**: [Harness University](https://university.harness.io/)

## Pricing and Licensing

### How is Harness Chaos Engineering priced?

Harness Chaos Engineering offers:
- **Free Tier**: Limited experiments and infrastructure
- **Team Plan**: For small to medium teams
- **Enterprise Plan**: For large organizations with advanced features
- **Custom Plans**: Tailored solutions for specific needs

Contact [Harness Sales](https://harness.io/pricing/) for detailed pricing information.

### What's included in the free tier?

The free tier includes:
- Up to 5 chaos experiments per month
- Basic fault library access
- Community support
- Standard integrations
- Basic reporting and analytics

## Best Practices

### What are the key principles of chaos engineering?

Key principles include:
1. **Build a Hypothesis**: Define what you expect to happen
2. **Vary Real-world Events**: Simulate realistic failure scenarios
3. **Run Experiments in Production**: Test in real environments (safely)
4. **Automate Experiments**: Make chaos engineering part of your regular practice
5. **Minimize Blast Radius**: Limit the scope of potential impact

### How often should I run chaos experiments?

Recommended frequency:
- **Development**: Daily or with each deployment
- **Staging**: Weekly or before major releases
- **Production**: Monthly or quarterly (depending on risk tolerance)
- **Critical Systems**: More frequent testing with smaller blast radius

### How do I get started with chaos engineering?

Getting started steps:
1. **Learn the Principles**: Understand chaos engineering fundamentals
2. **Start Small**: Begin with non-critical systems
3. **Build Confidence**: Gradually increase experiment complexity
4. **Automate**: Integrate into your development workflow
5. **Measure and Improve**: Use results to enhance system resilience

For more detailed guidance, see our [Getting Started Guide](/docs/chaos-engineering-new/get-started/).
