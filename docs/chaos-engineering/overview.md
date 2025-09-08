---
title: Overview
description: Introduction to Harness Chaos Engineering
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering
---

# Chaos Engineering Overview 

:::info New Chaos Studio Features
Harness Chaos Engineering now offers an enhanced **New Chaos Studio** experience with advanced capabilities and enhanced UX. The studio version you see depends on your onboarding date:

- **New Chaos Studio**: Available for customers onboarded on or after August 21, 2025
- **Old Chaos Studio**: Available for customers onboarded before August 21, 2025

### New Chaos Studio Features
The New Chaos Studio includes these enhanced capabilities:
- **[New Chaos Studio](/docs/chaos-engineering/guides/experiments#2.newchaosstudio)**: Enhanced and streamlined approach to chaos experiment design.
- **[Timeline View](/docs/chaos-engineering/guides/experiments#2.newchaosstudio)**: Visual timeline representation of experiment execution and results
- **[Experiment Level Probes](/docs/chaos-engineering/guides/probes/experiment-level-probes/)**: Advanced probing capabilities at the experiment level
- **[Actions](/docs/chaos-engineering/guides/actions/)**: Execute custom operations, delays, and scripts during experiments
- **[Chaos Hubs Across Different Scopes](/docs/chaos-engineering/guides/chaoshub)**: Enhanced chaos hub management with flexible scoping options
- **[Runtime Variable Support](/docs/chaos-engineering/guides/experiments#2.newchaosstudio)**: Dynamic variable handling during experiment execution
- **[Templates](/docs/chaos-engineering/guides/templates/)**: Reusable fault, probe, and action templates for standardized chaos engineering
- **[Custom Faults](/docs/category/custom-faults)**: Create and manage custom fault definitions for specific use cases

If you're an existing customer and want to access the New Chaos Studio features, contact your Harness support representative.
:::

Chaos Engineering is the practice of proactively introducing faults into your applications or infrastructure and test the resilience of business services. Developers, QA teams, Performance test teams and SREs run chaos experiments to measure the resilience of the systems and find the weaknesses in that process.

Harness Chaos Engineering provides end-to-end tooling to resilience testing via the chaos engineering principles. Enterprises can build highly scalable resilience testing practice with Harness because of the following capabilities:

- **Experiments** - faults and probes
- **ChaosGuard** for governance
- **Delegates** - scalability
- **Connectors** for integration
- **Resilience management** - Resilience scores, coverages, weaknesses and mitigation plans
- **AI Powered**: Recommendations


In addition, the Harness platform provides the required enterprise capabilities like RBACs, SSO, logs and auditing making the entire solution scalable and easy to implement.

For information about general Harness Platform concepts and features, go to [Harness Platform key concepts](/docs/platform/get-started/key-concepts).

## Why Harness Chaos Engineering?

### Enterprise-Ready Platform
- **Scalable Architecture**: Handle experiments across large, distributed systems
- **Security First**: Enterprise-grade security and compliance features
- **Multi-Cloud Support**: Works across AWS, Azure, GCP, and on-premises infrastructure

### Comprehensive Fault Library
- **Infrastructure Faults**: CPU, memory, network, and disk-level failures
- **Application Faults**: Service failures, latency injection, and error simulation
- **Platform Faults**: Kubernetes and cloud provider-specific experiments

### Advanced Automation
- **Scheduled Experiments**: Automate chaos testing as part of your regular operations
- **CI/CD Integration**: Embed resilience testing in your deployment pipelines
- **Intelligent Rollback**: Automatic experiment termination when safety thresholds are breached

## Key Benefits

### Improved System Reliability
- Identify single points of failure before they impact users
- Validate disaster recovery procedures and failover mechanisms
- Build confidence in system architecture and design decisions

### Reduced Mean Time to Recovery (MTTR)
- Train teams to handle failures through controlled practice
- Improve incident response procedures and runbooks
- Build muscle memory for handling production incidents

### Cost Optimization
- Prevent costly outages through proactive testing
- Optimize resource allocation and capacity planning
- Reduce over-provisioning by understanding actual failure modes

## How It Works

1. **Hypothesis Formation**: Define what you expect to happen during the experiment
2. **Experiment Design**: Choose appropriate faults and target systems
3. **Safety Measures**: Set up monitoring, alerts, and rollback mechanisms
4. **Execution**: Run the experiment in a controlled manner
5. **Analysis**: Review results and system behavior
6. **Learning**: Document findings and improve system resilience

## Getting Started

Ready to begin your chaos engineering journey? Explore the following sections:

- **[What's Supported](./whats-supported)**: Learn about supported platforms and integrations
- **[On-premise vs SaaS](./on-premise-vs-saas)**: Choose the right deployment model
- **[Key Concepts](./key-concepts)**: Understand fundamental chaos engineering concepts

## Next Steps

Once you understand the basics, you can:
- Explore our [Key Concepts](./key-concepts) section for deeper technical knowledge
- Follow our [Tutorials](./tutorials) for hands-on experience
- Check out [Integrations](./integrations/cicd/jenkins) to connect with your existing tools
