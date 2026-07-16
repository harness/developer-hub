---
id: datadog-p95-latency-check
title: Datadog P95 Latency Check
sidebar_label: Datadog P95 Latency Check
description: Built-in Datadog APM Probe template that validates p95 latency during a chaos experiment.
keywords:
  - chaos engineering
  - resilience probe
  - apm probe template
  - datadog probe
  - p95 latency
tags:
  - chaos-engineering
  - resilience-probes
  - probe-templates
  - datadog-probes
---

Datadog APM P95 latency check validates the 95th percentile latency of a service using Datadog APM metrics. The target service and environment are supplied at runtime via probe variables, allowing this probe to be reused across services.

## Infrastructure type

- **Kubernetes**

## Use cases

Datadog P95 Latency Check probe helps you:
- Verify tail latency stays within SLO during network chaos
- Monitor p95 latency after dependency failures
- Validate latency recovery after fault injection
- Detect latency regressions during rollout chaos

---

## Overview

This probe queries Datadog APM for the `latency_p95` stat of the target service, converts seconds to milliseconds using the formula `p95*1000`, and compares the mean aggregated value against your threshold.

### Probe type

**APM Probe (Datadog)**

### Prerequisites

- Kubernetes chaos infrastructure with Harness Delegate
- A configured [Datadog connector](/docs/resilience-testing/chaos-testing/probes/apm-probes)
- Datadog APM instrumented on the target service
- Probe variable `SERVICE_NAME` set at experiment runtime

---

## Probe properties

### Comparator

| Type | Criteria | Default value |
|------|----------|---------------|
| float | &lt;= | 500 |

The probe passes when the mean p95 latency (in milliseconds) is less than or equal to the comparator value.

### Datadog APM probe inputs

| Field | Description | Default |
|-------|-------------|---------|
| `connectorID` | Identifier of the Datadog connector | Required at runtime |
| `durationInMin` | Look-back window in minutes | 10 |
| `queryType` | Datadog query API version | v2 |
| `queries[0].name` | Query alias used in the formula | p95 |
| `queries[0].dataSource` | Metric source type | apm_metrics |
| `queries[0].params.env` | Datadog APM environment | `<+probe.variables.ENV>` |
| `queries[0].params.service` | Datadog APM service name | `<+probe.variables.SERVICE_NAME>` |
| `queries[0].params.stat` | APM latency stat | latency_p95 |
| `formula` | Converts seconds to milliseconds | p95*1000 |
| `aggregation` | Aggregation over the time window | mean |

### Probe variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SERVICE_NAME` | Datadog APM service name | Yes |
| `ENV` | Datadog APM environment tag | No |

### Configurable inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `CONNECTOR_ID` | Datadog connector identifier | Yes | - |
| `DURATION_IN_MIN` | Look-back window in minutes | No | 10 |
| `COMPARATOR_VALUE` | p95 latency threshold in milliseconds | Yes | 500 |

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
  - name: datadog-p95-latency-check
    type: apmProbe
    mode: Continuous
    apmProbe/inputs:
      type: Datadog
      comparator:
        type: float
        value: "500"
        criteria: <=
      datadogApmProbeInputs:
        connectorID: <+connector.identifier>
        durationInMin: 10
        queryType: v2
        queries:
          - name: p95
            dataSource: apm_metrics
            params:
              env: <+probe.variables.ENV>
              service: <+probe.variables.SERVICE_NAME>
              stat: latency_p95
        formula: p95*1000
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

- Go to [Datadog P99 Latency Check](/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog/datadog-p99-latency-check) to validate p99 latency.
- Go to [Datadog APM Probe Templates](/docs/resilience-testing/chaos-testing/probes/probe-templates/datadog) to browse all Datadog probe templates.
