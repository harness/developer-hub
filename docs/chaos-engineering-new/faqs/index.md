---
title: Frequently Asked Questions
description: Common questions and answers about Harness Chaos Engineering
sidebar_position: 1
---

# Frequently Asked Questions

Find answers to the most common questions about Harness Chaos Engineering, from getting started to advanced implementation topics.

## Getting Started

### What is Chaos Engineering?
Chaos Engineering is the discipline of experimenting on a system to build confidence in the system's capability to withstand turbulent conditions in production. It involves intentionally introducing failures in a controlled manner to identify weaknesses before they cause outages.

### Why should I use Chaos Engineering?
Chaos Engineering helps you:
- **Identify weaknesses** before they cause production outages
- **Build confidence** in your system's resilience
- **Improve incident response** through practice and preparation
- **Reduce MTTR** (Mean Time To Recovery) during real incidents
- **Validate disaster recovery** procedures and assumptions

### Is Chaos Engineering safe?
Yes, when done properly. Chaos Engineering emphasizes:
- **Controlled experiments** with defined blast radius
- **Comprehensive monitoring** and automatic rollback
- **Starting small** and gradually increasing scope
- **Safety measures** and circuit breakers
- **Team coordination** and communication

### How is Harness Chaos Engineering different from other tools?
Harness Chaos Engineering offers:
- **Enterprise-grade platform** with advanced security and compliance
- **Comprehensive fault library** covering infrastructure, applications, and cloud services
- **Native CI/CD integration** for continuous resilience testing
- **Advanced automation** with intelligent rollback and remediation
- **Team collaboration features** including GameDays and shared experiments

## Implementation

### Where should I start with Chaos Engineering?
Follow this progression:
1. **Start in staging** environments, never production initially
2. **Begin with simple experiments** like pod restarts or CPU stress
3. **Use small blast radius** affecting only a few instances
4. **Set up comprehensive monitoring** before running experiments
5. **Gradually expand** scope and complexity as confidence grows

### What experiments should I run first?
Recommended first experiments:
- **Pod/Container deletion** - Test application restart resilience
- **CPU stress** - Validate auto-scaling and performance under load
- **Network latency** - Test timeout handling and user experience
- **Database connection failures** - Validate connection pooling and failover
- **Memory pressure** - Test memory management and garbage collection

### How do I choose what to test?
Consider these factors:
- **Business criticality** - Start with most important user journeys
- **Historical incidents** - Test scenarios based on past outages
- **System dependencies** - Focus on single points of failure
- **Recent changes** - Validate resilience of new features or infrastructure
- **Compliance requirements** - Test disaster recovery procedures

### How often should I run chaos experiments?
Frequency depends on your maturity:
- **Getting started**: Weekly experiments in staging
- **Intermediate**: Daily automated experiments, weekly production tests
- **Advanced**: Continuous chaos testing integrated into CI/CD
- **Mature**: Real-time chaos testing with intelligent automation

## Technical Questions

### What platforms does Harness Chaos Engineering support?
We support:
- **Kubernetes** (all major distributions: EKS, AKS, GKE, OpenShift)
- **Linux** (Ubuntu, RHEL, CentOS, Debian, Fedora)
- **Cloud platforms** (AWS, Azure, GCP)
- **Windows** (limited fault types)
- **VMware vSphere**
- **Container platforms** (Docker, containerd, CRI-O)

### Can I run chaos experiments in production?
Yes, but with proper precautions:
- **Start with staging** and build confidence first
- **Use small blast radius** (1-5% of instances initially)
- **Run during low-traffic periods** to minimize user impact
- **Have comprehensive monitoring** and automatic rollback
- **Coordinate with teams** and stakeholders
- **Follow change management** procedures

### How do I measure the success of chaos experiments?
Key metrics include:
- **Resilience score** - Overall system resilience rating
- **Recovery time** - How quickly systems return to normal
- **Error rates** - Impact on user-facing errors
- **Performance metrics** - Response time and throughput impact
- **Business metrics** - Revenue, user experience, SLA compliance

### What happens if an experiment goes wrong?
Harness Chaos Engineering includes multiple safety mechanisms:
- **Automatic rollback** when thresholds are breached
- **Manual stop** capability at any time
- **Blast radius limits** to contain impact
- **Comprehensive monitoring** to detect issues quickly
- **Team notifications** for immediate response

## Security and Compliance

### Is Harness Chaos Engineering secure?
Yes, we implement enterprise-grade security:
- **SOC 2 Type II** certified
- **ISO 27001** compliant
- **End-to-end encryption** for data in transit and at rest
- **RBAC** (Role-Based Access Control) for fine-grained permissions
- **Audit logging** for all activities and changes
- **SAML/SSO integration** with enterprise identity providers

### Can I use Chaos Engineering in regulated industries?
Absolutely. Many regulated industries use chaos engineering:
- **Financial services** - Test trading systems and payment processing
- **Healthcare** - Validate patient data systems and medical devices
- **Government** - Test critical infrastructure and citizen services
- **Aerospace** - Validate flight systems and ground operations

Key considerations:
- **Compliance documentation** - Maintain detailed experiment records
- **Change management** - Follow established change control procedures
- **Risk assessment** - Evaluate and document potential impacts
- **Stakeholder approval** - Get necessary approvals before testing

### How do you handle data privacy?
We protect data privacy through:
- **Data minimization** - Collect only necessary experiment data
- **Encryption** - All data encrypted in transit and at rest
- **Access controls** - Strict access controls and audit trails
- **Data retention** - Configurable retention policies
- **Regional compliance** - Support for GDPR, CCPA, and other regulations

## Troubleshooting

### My experiment won't start. What should I check?
Common issues and solutions:
1. **Permissions** - Verify RBAC permissions for target resources
2. **Connectivity** - Check network connectivity to target systems
3. **Resource availability** - Ensure target resources exist and are healthy
4. **Configuration** - Validate experiment configuration and parameters
5. **Dependencies** - Check if required services or tools are running

### Experiments are failing unexpectedly. How do I debug?
Debugging steps:
1. **Check experiment logs** for error messages and details
2. **Verify target system health** before and during experiments
3. **Review monitoring data** for system behavior patterns
4. **Validate success criteria** and thresholds
5. **Test in isolation** to identify specific failure points

### How do I handle false positives in monitoring?
Strategies for reducing false positives:
- **Tune thresholds** based on historical data and normal variation
- **Use multiple metrics** to validate actual impact
- **Implement grace periods** to account for temporary fluctuations
- **Regular threshold review** and adjustment based on system changes
- **Composite health checks** combining multiple indicators

### My team is resistant to Chaos Engineering. How do I get buy-in?
Building team support:
- **Start with education** about chaos engineering benefits
- **Share success stories** from other organizations
- **Begin with low-risk experiments** to build confidence
- **Involve skeptics** in experiment design and execution
- **Demonstrate value** through improved incident response
- **Address concerns** about safety and potential impact

## Advanced Topics

### Can I create custom faults?
Yes, through several methods:
- **BYOC (Bring Your Own Chaos)** - Upload custom fault scripts
- **API integration** - Use REST APIs to trigger custom failures
- **Webhook actions** - Integrate with external systems
- **Custom probes** - Create application-specific health checks
- **Script execution** - Run custom scripts during experiments

### How do I integrate with my existing monitoring tools?
Harness integrates with popular tools:
- **Prometheus/Grafana** - Native metrics integration
- **Datadog** - Real-time monitoring and alerting
- **New Relic** - APM and infrastructure monitoring
- **Splunk** - Log analysis and correlation
- **PagerDuty** - Incident management and escalation

### Can I automate chaos experiments in CI/CD pipelines?
Yes, we provide:
- **GitHub Actions** integration
- **Jenkins plugins** and pipeline steps
- **GitLab CI** integration
- **Azure DevOps** extensions
- **Native Harness CI/CD** integration
- **REST API** for custom integrations

### How do I scale chaos engineering across multiple teams?
Scaling strategies:
- **Standardized templates** for common experiment types
- **Shared experiment library** for reusable scenarios
- **Team-specific permissions** and resource isolation
- **Centralized reporting** and analytics
- **Training programs** and best practice sharing
- **Center of Excellence** for chaos engineering governance

## Pricing and Licensing

### How is Harness Chaos Engineering priced?
Pricing is based on:
- **Infrastructure targets** - Number of nodes/instances under test
- **Experiment executions** - Number of experiments run per month
- **Advanced features** - Enterprise features and support levels
- **Deployment model** - SaaS vs. Self-Managed pricing

Contact [sales](https://harness.io/contact-sales) for detailed pricing information.

### Is there a free tier available?
Yes, we offer:
- **Free tier** with limited experiments and targets
- **Trial period** for full feature evaluation
- **Developer accounts** for learning and experimentation
- **Open source** components for basic chaos testing

### What support options are available?
Support tiers include:
- **Community support** - Forums and documentation
- **Standard support** - Business hours email support
- **Premium support** - 24/7 support with SLA guarantees
- **Enterprise support** - Dedicated customer success manager

## Getting Help

### Where can I find more information?
Resources available:
- **[Documentation](../overview)** - Comprehensive guides and tutorials
- **[Community Forum](https://community.harness.io)** - Ask questions and share experiences
- **[Slack Community](https://harnesscommunity.slack.com)** - Real-time chat with users and experts
- **[Knowledge Base](/kb/chaos-engineering)** - Searchable articles and solutions
- **[Training Programs](https://university.harness.io)** - Structured learning paths

### How do I contact support?
Support channels:
- **In-app support** - Submit tickets directly from the platform
- **Email support** - [support@harness.io](mailto:support@harness.io)
- **Phone support** - Available for premium customers
- **Emergency support** - 24/7 for critical issues (enterprise customers)

### Can I request new features?
Yes, we welcome feedback:
- **Feature requests** through in-app feedback
- **Community voting** on proposed features
- **Direct feedback** to customer success managers
- **Beta programs** for early access to new features

---

## Still have questions?

If you can't find the answer you're looking for:

1. **Search our [Knowledge Base](/kb/chaos-engineering)** for detailed articles
2. **Join our [Community Forum](https://community.harness.io)** to ask questions
3. **Contact [Support](mailto:support@harness.io)** for technical assistance
4. **Schedule a [demo](https://harness.io/demo)** to speak with our experts

:::tip Quick Help
For immediate assistance, use the in-app help chat or check our [Resources](../resources/troubleshooting) section for common issues and solutions.
:::
