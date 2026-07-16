---
id: datadog-cpu-check
title: Datadog CPU Check
sidebar_label: Datadog CPU Check
description: Built-in Datadog APM Probe template that validates container CPU utilisation during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - apm probe template
  - datadog probe
  - cpu check
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - datadog-probes
---

Datadog CPU check validates the CPU utilisation of a service using Datadog container metrics. The target service name and Kubernetes namespace are supplied at runtime via probe variables, allowing this probe to be reused across services.

## Infrastructure type

- **Kubernetes**

## Use cases

Datadog CPU Check probe helps you:
- Verify CPU stays within limits during pod CPU hog faults
- Monitor container CPU after resource stress experiments
- Validate autoscaling behavior under load chaos
- Detect CPU saturation before it affects latency

---

## Overview

This probe queries Datadog for `sum:container.cpu.usage` filtered by `kube_deployment` and `kube_namespace`, converts nanoseconds to CPU cores using the formula `cpu/1000000000`, and compares the mean aggregated value against your threshold.

### Probe type

**APM Probe (Datadog)**

### Prerequisites

- Kubernetes chaos infrastructure with Harness Delegate
- A configured [Datadog connector](/docs/resilience-testing/chaos-testing/probes/apm-probes)
- Datadog agent reporting `container.cpu.usage` for the target deployment
- Probe variables `SERVICE_NAME` and `NAMESPACE` set at experiment runtime

---

## Probe properties

### Comparator

| Type | Criteria | Default value |
|------|----------|---------------|
| float | &lt;= | 0.50 |

The probe passes when the mean CPU usage (in cores) is less than or equal to the comparator value.

### Datadog APM probe inputs

| Field | Description | Default |
|-------|-------------|---------|
| `connectorID` | Identifier of the Datadog connector | Required at runtime |
| `durationInMin` | Look-back window in minutes | 5 |
| `queryType` | Datadog query API version | v2 |
| `queries[0].name` | Query alias used in the formula | cpu |
| `queries[0].dataSource` | Metric source type | metrics |
| `queries[0].params.query` | Datadog metric query | `sum:container.cpu.usage{kube_deployment:<+probe.variables.SERVICE_NAME>,kube_namespace:<+probe.variables.NAMESPACE>}` |
| `formula` | Converts query result to CPU cores | cpu/1000000000 |
| `aggregation` | Aggregation over the time window | mean |

### Probe variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SERVICE_NAME` | Kubernetes deployment name of the target service | Yes |
| `NAMESPACE` | Kubernetes namespace of the target service | Yes |

### Configurable inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `CONNECTOR_ID` | Datadog connector identifier | Yes | - |
| `DURATION_IN_MIN` | Look-back window in minutes | No | 5 |
| `COMPARATOR_VALUE` | CPU threshold in cores | Yes | 0.50 |

---

## Run properties

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `timeout` | Maximum time to wait for the probe to complete | String | 30s |
| `interval` | Time between probe executions | String | 5s |
| `attempt` | Number of retry attempts before marking as failed | Integer | 1 |
| `pollingInterval` | Time between retry attempts | String | 30s |
| `initialDelay` | Initial delay before starting the probe | String | 1s |
| `stopOnFailure` | Stop the experiment if the probe fails | Boolean | false |
| `verbosity` | Log verbosity level | String | debug |

---

## Probe definition

You can define this probe in your chaos experiment as follows:

```yaml
probe:
  - name: datadog-cpu-check
    type: apmProbe
    mode: Continuous
    apmProbe/inputs:
      type: Datadog
      comparator:
        type: float
        value: "0.50"
        criteria: <=
      datadogApmProbeInputs:
        connectorID: <+connector.identifier>
        durationInMin: 5
        queryType: v2
        queries:
          - name: cpu
            dataSource: metrics
            params:
              query: sum:container.cpu.usage{kube_deployment:<+probe.variables.SERVICE_NAME>,kube_namespace:<+probe.variables.NAMESPACE>}
        formula: cpu/1000000000
        aggregation: mean
    runProperties:
      timeout: 30s
      interval: 5s
      attempt: 1
      pollingInterval: 30s
      initialDelay: 1s
      stopOnFailure: false
      verbosity: debug
```

---

## Next steps

- Go to [Datadog Memory Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-memory-check) to validate memory utilisation.
- Go to [Datadog APM Probe Templates](/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog) to browse all Datadog probe templates.
