---
title: Built-in Probe Templates
sidebar_position: 7
description: Pre-built Command Probe templates for common validation scenarios
---

Harness provides built-in Command Probe templates to help you quickly validate common scenarios in your chaos experiments. These templates are ready to use, and you can customize their inputs to fit your requirements.

:::info Built-in template coverage
Built-in templates are Command Probes that run on Kubernetes chaos infrastructure. They cover Kubernetes resource checks (pod status, node health, restart counts, replica counts, startup time, and resource utilisation) as well as AWS and GCP resource checks (EC2, ECS, Lambda, load balancer, security group, Compute Engine VM, persistent disk, and Cloud SQL). More probe types and platforms will be added in future releases.
:::

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { probeTemplateCategories } from '../../content/probes/probe-templates';

<ChaosFaults categories={probeTemplateCategories} />
