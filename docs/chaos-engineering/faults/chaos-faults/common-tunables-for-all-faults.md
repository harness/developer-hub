---
title: Common Tunables for All Faults
description: Configuration parameters shared across all chaos faults
sidebar_position: 2
redirect_from:
  - /docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults
---

# Common Tunables for All Faults

Fault tunables common to all chaos faults are provided at `.spec.experiment[*].spec.components.env` in the ChaosEngine specification. These tunables control the basic execution behavior of chaos experiments.

## Core Tunables

### Duration of the Chaos

Total duration of the chaos injection in seconds. Configure using the `TOTAL_CHAOS_DURATION` environment variable.

**Default**: 30 seconds

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Chaos Interval

The delay between each chaos iteration in seconds. Configure using the `CHAOS_INTERVAL` environment variable.

**Default**: 10 seconds

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: CHAOS_INTERVAL
          value: '15'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Ramp Time

Period to wait before and after injecting chaos in seconds. Configure using the `RAMP_TIME` environment variable.

**Default**: 0 seconds

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: RAMP_TIME
          value: '10'
```

## Execution Control

### Sequence of Chaos Execution

The sequence of chaos execution for multiple targets. Configure using the `SEQUENCE` environment variable.

**Default**: parallel

**Options**:
- `parallel`: Chaos is injected in all targets simultaneously
- `serial`: Chaos is injected in targets one by one

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: SEQUENCE
          value: 'parallel'
```

### Instance ID

A user-defined string that holds metadata about the current chaos run. This string is appended as a suffix in the ChaosResult CR name. Configure using the `INSTANCE_ID` environment variable.

**Default**: Empty string

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: INSTANCE_ID
          value: '123'
```

## Advanced Configuration

### Helper Pod Image

The container image used to launch helper pods for fault execution. Configure using the `LIB_IMAGE` environment variable.

**Default**: `harness/chaos-go-runner:main-latest`

**Supported Faults**: container-kill, network-faults, stress-faults, dns-faults, disk-fill, kubelet-service-kill, docker-service-kill, node-restart

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: container-kill
    spec:
      components:
        env:
        - name: LIB_IMAGE
          value: 'harness/chaos-go-runner:main-latest'
```

### Default Health Check

Determines whether to run the default health check included with the fault. Configure using the `DEFAULT_HEALTH_CHECK` environment variable.

**Default**: true

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: DEFAULT_HEALTH_CHECK
          value: 'false'
```

### Status Check Timeout

Maximum duration the chaos experiment will wait for a resource to reach the desired state before proceeding. If the resource doesn't attain the expected state within this timeframe, the experiment may be marked as failed.

**Default**: 180 seconds

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  experiments:
  - name: pod-delete
    spec:
      components:
        statusCheckTimeouts:
          delay: 2
          timeout: 300
```

## Variables

Variables allow you to define reusable, parameterized values that can be referenced in fault properties during fault configuration. This applies to all fault types.

Variables are useful when you want to:
- **Reuse values** across multiple fault configuration fields without repeating them
- **Inject runtime values** into fault properties at experiment execution time
- **Centralize configuration** - update a variable once and have it reflected wherever it is used

### Adding a Variable

When creating or editing a fault, navigate to the **Variables** step and click **+ Add Variable**. Each variable has the following fields:

| Field | Description |
|-------|-------------|
| **Type** | Data type of the variable. Supported types: `String`, `Number` |
| **Name** | Identifier used to reference the variable in fault properties |
| **Value** | The value assigned to the variable - can be a fixed value or a runtime input |
| **Set variable as required during runtime** | When checked, the variable must be supplied at experiment run time |
| **Description** | Optional description for the variable |

### Value Types

- **Fixed value** - A static value set at fault creation time. The value remains constant across experiment runs.
- **Runtime input** - The value is provided at experiment execution time (shown as `<+input>`). Use this when the value may differ between runs.

### Using Variables in Chaos Studio

When you add a fault to an experiment in the **Chaos Studio**, the fault panel shows a **Variables** tab. Any input variables defined on the fault appear here, allowing you to supply or override values for that specific experiment run before applying changes.

## Summary

These common tunables provide fine-grained control over chaos fault execution. Use them to:

- **Control timing**: Set duration, intervals, and ramp times
- **Manage execution**: Configure sequence and health checks
- **Customize behavior**: Set instance IDs and helper images
- **Ensure reliability**: Configure appropriate timeouts

For fault-specific tunables, refer to the individual fault documentation in each category.

## Related Resources

- [Chaos Faults Overview](../chaos-faults)
- [Creating Chaos Experiments](../../guides/chaos-experiments/)
- [Resilience Probes](../../guides/probes/)
