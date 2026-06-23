---
title: Overview
description: Introduction to Harness Resilience Testing
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering
---

# Resilience Testing Overview 

Resilience Testing is the practice of proactively validating that your systems can withstand and recover from failures, performance degradation, and disasters. By testing how your applications and infrastructure behave under stress, failure, and catastrophic scenarios, you can identify weaknesses before they impact your users and business.

Harness Resilience Testing provides a comprehensive platform to build confidence in your system's reliability through three integrated testing approaches: Chaos Testing, Load Testing, and Disaster Recovery Testing.

<DocVideo src="https://youtu.be/ghXqnIbqs2Y" height={450} />

## Why Resilience Testing Matters

Modern distributed systems are complex. A single application might depend on dozens of microservices, multiple cloud providers, third-party APIs, and various infrastructure components. Any of these can fail, and often do.

Without resilience testing, you're discovering these weaknesses in production - when the stakes are highest. Resilience testing shifts this discovery left, helping you:

- **Reduce downtime costs**: Identify and fix issues before they cause outages
- **Meet SLA commitments**: Validate that your systems can handle real-world conditions
- **Build customer trust**: Deliver reliable experiences even when things go wrong
- **Improve incident response**: Practice recovery procedures before you need them in production
- **Accelerate development**: Deploy with confidence knowing your systems are battle-tested

## The Three Pillars of Resilience Testing

Harness Resilience Testing brings together three complementary testing approaches, each addressing a different dimension of system reliability:

### Chaos Testing

Tests your system's resilience against **unexpected failures**. Chaos Testing introduces controlled faults - like pod failures, network latency, or resource exhaustion - to validate that your system can detect, withstand, and recover from infrastructure and application failures.

**When to use**: Validate fault tolerance, test auto-healing mechanisms, verify monitoring and alerting, practice incident response.

### Load Testing

Tests your system's resilience under **expected and peak demand**. Load Testing simulates realistic user traffic patterns to validate that your system maintains performance, availability, and reliability as load increases.

**When to use**: Validate performance under normal and peak traffic, identify bottlenecks, test auto-scaling policies, prepare for high-traffic events.

### Disaster Recovery Testing

Tests your system's resilience during **catastrophic scenarios**. DR Testing validates that your backup systems, failover mechanisms, and recovery procedures work as expected when entire regions, data centers, or critical services become unavailable.

**When to use**: Validate backup and restore procedures, test failover mechanisms, verify RTO/RPO targets, ensure business continuity.

## How They Work Together

True resilience requires all three approaches working in concert. Here's how they complement each other:

**During normal operations**: Load Testing validates your system can handle expected traffic while Chaos Testing ensures it remains resilient when individual components fail.

**During peak events**: Combine Load Testing with Chaos Testing to simulate Black Friday traffic while a database replica fails - the most realistic test of production conditions.

**During disasters**: DR Testing validates your recovery procedures, while Chaos Testing can verify that your failover systems are themselves resilient to failures.

**In your pipeline**: Integrate all three into your deployment process for continuous resilience validation alongside functional and security testing.

## Use Cases

**Continuous resilience validation**: Integrate resilience tests into your deployment pipelines to validate system reliability alongside functional and performance testing. Catch resilience issues before they reach production.

**Peak traffic preparation**: Combine load testing with chaos experiments to simulate high-traffic events like product launches or seasonal sales while validating that your system remains resilient to infrastructure failures.

**Disaster recovery validation**: Systematically test backup systems, failover mechanisms, and recovery procedures to ensure your DR plans work when you need them most.

**Multi-region resilience**: Validate that your system can handle region failures, network partitions, and cross-region failover scenarios while maintaining performance and availability.

## Platform Capabilities

**200+ Built-in Faults**: Ready-to-use chaos faults covering Kubernetes, cloud platforms, Linux, Windows, and application runtimes.

**Load Testing**: Simulate realistic user traffic patterns to validate system performance, identify bottlenecks, and test auto-scaling under expected and peak demand.

**DR Testing**: Validate disaster recovery procedures, backup systems, and failover mechanisms to ensure business continuity during catastrophic scenarios.

**Resilience Probes**: Programmatically validate system behavior and steady state through integrations with APMs and applications - no manual observation required.

**Actions**: Execute custom tasks within experiments for notifications, webhooks, load testing triggers, and more.

**Risk Management**: Identify and track resilience, performance, and compliance risks across your systems with automated discovery and continuous monitoring.

**Enterprise Governance**: Fine-grained control over who can run which tests on what systems and during which time periods through ChaosGuard.

**Seamless Integrations**: Connect with CI/CD pipelines, monitoring tools, and cloud service providers through built-in connectors.

**AI-Powered Insights**: Get intelligent recommendations for experiment creation, optimization, and failure resolution from the AI Reliability Agent.

<!-- **MCP Tools**: Interact with your Harness Resilience Testing projects using natural language prompts from AI editors like Claude Desktop, Windsurf, and Cursor through the Harness MCP server. -->

The platform includes enterprise features like RBAC, SSO, comprehensive logging, and audit capabilities. Available in SaaS and on-premise deployments with a free plan that includes all capabilities. For information about general Harness Platform concepts and features, go to [Harness Platform key concepts](/docs/platform/get-started/key-concepts).

## Next Steps

- [Key Concepts](./key-concepts): Understand core resilience testing terminology and concepts
- [Get Started with Chaos Testing](./chaos-testing/get-started): Run your first chaos experiment
- [Explore Chaos Faults](/docs/chaos-engineering/faults/chaos-faults): Browse 200+ ready-to-use fault scenarios
- [Set Up Governance](/docs/resilience-testing/access-control/rbac): Configure RBAC and ChaosGuard for safe testing
- [Get Started with Load Testing](./load-testing/get-started): Simulate traffic and test performance
- [Get Started with DR Testing](#): Validate disaster recovery procedures

<!-- ## Chaos Fault Library

Browse from 200+ ready-to-use battle-tested chaos faults covering every layer of your infrastructure:

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './faults/chaos-faults/categories'

<ChaosFaults categories={categories} /> -->

<!-- ## New Chaos Studio

:::info New Chaos Studio Features
Harness Chaos Engineering now offers an enhanced **New Chaos Studio** experience with advanced capabilities and enhanced UX. The studio version you see depends on your onboarding date:

- **New Chaos Studio**: Available for customers onboarded on or after August 21, 2025
- **Old Chaos Studio**: Available for customers onboarded before August 21, 2025

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
::: -->
