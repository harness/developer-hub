---
id: datadog-memory-check
title: Datadog Memory Check
sidebar_label: Datadog Memory Check
description: Built-in Datadog APM Probe template that validates container memory utilisation during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - apm probe template
  - datadog probe
  - memory check
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - datadog-probes
---

Datadog memory check validates the memory utilisation of a service using Datadog container metrics. The target service name and Kubernetes namespace are supplied at runtime via probe variables, allowing this probe to be reused across services.

## Infrastructure type

- **Kubernetes**

## Use cases

Datadog Memory Check probe helps you:
- Verify memory stays within limits during memory hog faults
- Monitor container memory after OOM-related chaos
- Validate memory limits during stress experiments
- Detect memory leaks under sustained load

---

## Overview

This probe queries Datadog for `sum:container.memory.usage` filtered by `kube_deployment` and `kube_namespace`, converts bytes to MiB using the formula `memory/1048576`, and compares the mean aggregated value against your threshold.

### Probe type

**APM Probe (Datadog)**

### Prerequisites

- Kubernetes chaos infrastructure with Harness Delegate
- A configured [Datadog connector](/docs/resilience-testing/chaos-testing/probes/apm-probes)
- Datadog agent reporting `container.memory.usage` for the target deployment
- Probe variables `SERVICE_NAME` and `NAMESPACE` set at experiment runtime

---

## Probe properties

### Comparator

| Type | Criteria | Default value |
|------|----------|---------------|
| float | &lt;= | 1024 |

The probe passes when the mean memory usage (in MiB) is less than or equal to the comparator value.

### Datadog APM probe inputs

| Field | Description | Default |
|-------|-------------|---------|
| `connectorID` | Identifier of the Datadog connector | Required at runtime |
| `durationInMin` | Look-back window in minutes | 5 |
| `queryType` | Datadog query API version | v2 |
| `queries[0].name` | Query alias used in the formula | memory |
| `queries[0].dataSource` | Metric source type | metrics |
| `queries[0].params.query` | Datadog metric query | `sum:container.memory.usage{kube_deployment:<+probe.variables.SERVICE_NAME>,kube_namespace:<+probe.variables.NAMESPACE>}` |
| `formula` | Converts query result to MiB | memory/1048576 |
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
| `COMPARATOR_VALUE` | Memory threshold in MiB | Yes | 1024 |

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
  - name: datadog-memory-check
    type: apmProbe
    mode: Continuous
    apmProbe/inputs:
      type: Datadog
      comparator:
        type: float
        value: "1024"
        criteria: <=
      datadogApmProbeInputs:
        connectorID: <+connector.identifier>
        durationInMin: 5
        queryType: v2
        queries:
          - name: memory
            dataSource: metrics
            params:
              query: sum:container.memory.usage{kube_deployment:<+probe.variables.SERVICE_NAME>,kube_namespace:<+probe.variables.NAMESPACE>}
        formula: memory/1048576
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

- Go to [Datadog CPU Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-cpu-check) to validate CPU utilisation.
- Go to [Datadog APM Probe Templates](/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog) to browse all Datadog probe templates.
