---
title: Overview
description: Introduction to Harness Chaos Engineering
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering
---

# Chaos Engineering Overview

Harness Chaos Engineering is a comprehensive platform that helps you build confidence in your system's resilience through controlled chaos experiments. By intentionally introducing failures in a controlled manner, you can identify weaknesses before they cause outages in production.

For information about general Harness Platform concepts and features, go to [Harness Platform key concepts](/docs/platform/get-started/key-concepts).

## What is Chaos Engineering?

Chaos Engineering is the discipline of experimenting on a system to build confidence in the system's capability to withstand turbulent conditions in production. It involves:

- **Proactive Testing**: Instead of waiting for failures to happen, you create them intentionally
- **Controlled Environment**: Experiments are conducted safely with proper safeguards
- **Learning from Failures**: Each experiment provides insights into system behavior
- **Continuous Improvement**: Regular chaos testing builds long-term resilience

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
