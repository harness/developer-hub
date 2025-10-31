---
title: Overview
description: Introduction to Harness Chaos Engineering
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering
---

# Chaos Engineering Overview 

Chaos Engineering is the practice of proactively introducing controlled faults into applications and infrastructure to test the resilience of business services. Developers, QA teams, performance engineers, and Site Reliability Engineers (SREs) run chaos experiments to measure system resilience and discover weaknesses before they impact production.

Harness Chaos Engineering provides end-to-end tooling for resilience testing at enterprise scale through proven chaos engineering principles.

<DocVideo src="https://www.youtube.com/watch?v=dk8WPek1P-w" height={450} />

## Core Capabilities

**Chaos Experiments**: Run chaos experiments with 200+ built-in faults, probes, and actions covering Kubernetes, cloud platforms, Linux, Windows, and application runtimes.

**Resilience Probes**: Avoid the manual observation of the impact of chaos fault injection in the experiments. Use resilience probes to programmatically observe the expected behaviour or steady state through the interactions with APMs and applications.

**Actions**: Perform custom tasks within a chaos experiment. Helpful for notifications via email, slack, teams etc, triggering webhooks and starting load testing scripts within the experiment.

**Enterprise Governance**: ChaosGuard provides fine-grained control over who can run which experiments on what systems and during which time periods.

**Centralised Chaos Execution Plane**: Scalable architecture with centralized execution and distributed agents for enterprise environments, made possible by Harness Delegate.

**Connectors**: Seamless integration with CI/CD pipelines, monitoring tools like and cloud service providers.

**AI-Powered**: AI Reliability Agent that provides recommendations for experiment creation, optimization, and failure resolution.

**MCP(Model-Context-Protocol) Tools**: Chaos tools are provided through Harness MCP server. Use natural language prompts from your AI editors like Claude Desktop, Windsurf, Cursor to interact with your Harness Chaos Engineering project and understand the resilience testing details of your systems.

**GameDay Portal**: A portal for controlled chaos experimentation by SREs in production environments.

The platform includes enterprise features like RBACs, SSO, comprehensive logging, and audit capabilities. Available in SaaS and on-premise deployments with a free plan that includes all capabilities. For information about general Harness Platform concepts and features, go to [Harness Platform key concepts](/docs/platform/get-started/key-concepts).

## Use Cases

**Resilience testing in deployment pipelines**: Add chaos experiments to deployment pipelines for continuous resilience validation alongside functional and performance testing.

**Enhance Load Testing with Resilience Testing**: Run chaos experiments with load testing tools to simulate real-world failure scenarios under traffic stress.

**GameDay Exercises**: Conduct controlled production testing using the GameDay portal to validate incident response procedures and system recovery capabilities.

**Disaster Recovery Testing**: Validate backup systems, failover mechanisms, and recovery procedures through systematic fault injection.

## Deployment Modes

**[SaaS](./on-premise-vs-saas#saas)**: Fully managed cloud service with automatic updates and scaling to help you get started quickly with minimal setup.

**[On-Premise](./on-premise-vs-saas#on-premise)**: Deploy in your own infrastructure for complete control.

## Chaos Fault Library

Browse from 200+ ready-to-use battle-tested chaos faults covering every layer of your infrastructure:

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './faults/chaos-faults/categories'

<ChaosFaults categories={categories} />

## New Chaos Studio

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
:::
