---
title: Datadog APM Probe Templates
sidebar_position: 4
description: Pre-built Datadog APM Probe templates for CPU, memory, latency, and error rate validation
---

import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection";
import ProbeTemplateCard from "@site/src/components/ChaosEngineering/ProbeTemplateCard";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import { datadogProbeTemplates } from "./templates";

Pre-built Datadog APM Probe templates for validating service health using Datadog metrics during chaos experiments. These templates query Datadog container metrics or APM metrics and compare the result against a threshold you configure at runtime.

Here are Datadog probe templates that you can use in your chaos experiments.

<ExperimentListSection experiments={datadogProbeTemplates} />

<ProbeTemplateCard category="datadog">

### Datadog CPU Check

Validates the CPU utilisation of a service using Datadog container metrics. The template queries `container.cpu.usage` filtered by Kubernetes deployment and namespace.

**Required probe variables:**
- `SERVICE_NAME`: Kubernetes deployment name of the target service
- `NAMESPACE`: Kubernetes namespace of the target service

**Required inputs:**
- `CONNECTOR_ID`: Datadog connector identifier

<Accordion color="green">
<summary>Use cases</summary>

- Verify CPU stays within limits during pod CPU hog faults
- Monitor container CPU after resource stress experiments
- Validate autoscaling behavior under load chaos
- Detect CPU saturation before it affects latency

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="datadog">

### Datadog Memory Check

Validates the memory utilisation of a service using Datadog container metrics. The template queries `container.memory.usage` filtered by Kubernetes deployment and namespace.

**Required probe variables:**
- `SERVICE_NAME`: Kubernetes deployment name of the target service
- `NAMESPACE`: Kubernetes namespace of the target service

**Required inputs:**
- `CONNECTOR_ID`: Datadog connector identifier

<Accordion color="green">
<summary>Use cases</summary>

- Verify memory stays within limits during memory hog faults
- Monitor container memory after OOM-related chaos
- Validate memory limits during stress experiments
- Detect memory leaks under sustained load

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="datadog">

### Datadog P95 Latency Check

Validates the 95th percentile latency of a service using Datadog APM metrics (`latency_p95`).

**Required probe variables:**
- `SERVICE_NAME`: Datadog APM service name
- `ENV`: Datadog APM environment tag (optional)

**Required inputs:**
- `CONNECTOR_ID`: Datadog connector identifier

<Accordion color="green">
<summary>Use cases</summary>

- Verify tail latency stays within SLO during network chaos
- Monitor p95 latency after dependency failures
- Validate latency recovery after fault injection
- Detect latency regressions during rollout chaos

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="datadog">

### Datadog P99 Latency Check

Validates the 99th percentile latency of a service using Datadog APM metrics (`latency_p99`).

**Required probe variables:**
- `SERVICE_NAME`: Datadog APM service name
- `ENV`: Datadog APM environment tag (optional)

**Required inputs:**
- `CONNECTOR_ID`: Datadog connector identifier

<Accordion color="green">
<summary>Use cases</summary>

- Verify worst-case latency during high-percentile SLO checks
- Monitor p99 latency after infrastructure faults
- Validate tail latency recovery after chaos injection
- Detect outlier latency spikes during experiments

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="datadog">

### Datadog Avg Latency Check

Validates the average latency of a service using Datadog APM metrics (`latency_avg`).

**Required probe variables:**
- `SERVICE_NAME`: Datadog APM service name
- `ENV`: Datadog APM environment tag (optional)

**Required inputs:**
- `CONNECTOR_ID`: Datadog connector identifier

<Accordion color="green">
<summary>Use cases</summary>

- Verify mean latency stays within budget during chaos
- Monitor average response time after fault injection
- Validate latency stability across experiment phases
- Compare baseline and post-chaos average latency

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="datadog">

### Datadog Error Rate Check

Validates the error rate of a service using Datadog APM metrics (`error_rate`).

**Required probe variables:**
- `SERVICE_NAME`: Datadog APM service name
- `ENV`: Datadog APM environment tag (optional)

**Required inputs:**
- `CONNECTOR_ID`: Datadog connector identifier

<Accordion color="green">
<summary>Use cases</summary>

- Verify error rate stays below threshold during chaos
- Monitor error budget consumption during fault injection
- Validate service recovery after dependency failures
- Detect error spikes during network or pod chaos

</Accordion>
</ProbeTemplateCard>

---

## Next steps

- Go to [Datadog probe](/docs/resilience-testing/content/probes/datadog-probe) to configure a custom Datadog probe.
- Go to [APM probes](/docs/resilience-testing/chaos-testing/probes/apm-probes) to understand APM probe types and connectors.
- Go to [Built-in Probe Templates](/docs/resilience-testing/chaos-testing/probes/probe-templates) to browse all probe template categories.
