---
title: Built-in Probe Templates
sidebar_position: 7
description: Pre-built Command Probe templates for common validation scenarios
---

Harness provides built-in Command Probe templates to help you quickly validate common scenarios in your chaos experiments. These templates are ready to use, and you can customize their inputs to fit your requirements.

:::info Built-in template coverage
Built-in templates include Command Probes for Kubernetes, AWS, and GCP resource checks, and Datadog APM Probes for CPU, memory, latency (p95, p99, average), and error rate validation on Kubernetes chaos infrastructure. More probe types and platforms will be added in future releases.
:::

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { probeTemplateCategories } from '../../content/probes/probe-templates';

<ChaosFaults categories={probeTemplateCategories} />
