---
title: Chaos Faults
description: Comprehensive library of pre-built chaos faults for testing system resilience
sidebar_position: 1
---

# Chaos Faults

Chaos faults are the failures injected into the chaos infrastructure as part of a chaos experiment. Every fault is associated with a target resource, and you can customize the fault using the fault tunables, which you can define as part of the Chaos Experiment CR and Chaos Engine CR.

The fault execution is triggered when the chaos engine resource is created. Typically, the chaos engine is embedded within the **steps** of a chaos fault. However, you can also create the chaos engine manually, and the chaos operator reconciles this resource and triggers the fault execution.

You can customize a fault execution by changing the tunables (or parameters). Some tunables are common across all the faults (for example, **chaos duration**), and every fault has its own set of tunables: default and mandatory ones. You can update the default tunables when required and always provide values for mandatory tunables (as the name suggests).

## Fault Status

Fault status indicates the current status of the fault executed as a part of the chaos experiment. A fault can have 0, 1, or more associated [probes](/docs/chaos-engineering-new/guides/probes/). Other steps in a chaos experiment include resource creation and cleanup.

In a chaos experiment, a fault can be in one of six different states. It transitions from **running**, **stopped** or **skipped** to **completed**, **completed with error** or **error** state.

- **Running**: The fault is currently being executed.
- **Stopped**: The fault stopped after running for some time.
- **Skipped**: The fault skipped, that is, the fault is not executed.
- **Completed**: The fault completes execution without any **failed** or **N/A** probe statuses.
- **Completed with Error**: When the fault completes execution with at least one **failed** probe status but no **N/A** probe status, it is considered to be **completed with error**.
- **Error**: When the fault completes execution with at least one **N/A** probe status, it is considered to be **error** because you can't determine if the probe status was **passed** or **failed**. A fault is considered to be in an **error** state when it has 0 probes because there are no health checks to validate the sanity of the chaos experiment.

## Fault Categories

Harness Chaos Engineering provides a comprehensive library of pre-built chaos faults organized by target infrastructure and platform. Below are tables with links to individual fault documentation for easy navigation.

<!-- Custom component -->

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './chaos-faults/categories'

<ChaosFaults categories={categories} />

## Common Fault Tunables

All chaos faults share a set of common tunables that control basic execution parameters. These are provided at `.spec.experiment[*].spec.components.env` in the chaosengine.

### Duration of the Chaos

Total duration of the chaos injection (in seconds). Tune it by using the `TOTAL_CHAOS_DURATION` environment variable.

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

The delay between each chaos iteration. Multiple iterations of chaos are tuned by setting the `CHAOS_INTERVAL` environment variable.

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

Period to wait before and after injecting chaos. It is in units of seconds. Tune it by using the `RAMP_TIME` environment variable.

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

### Sequence of Chaos Execution

The sequence of the chaos execution for multiple targets. Its default value is **parallel**. Tune it by using the `SEQUENCE` environment variable. It supports the following modes:

- `parallel`: The chaos is injected in all the targets at once.
- `serial`: The chaos is injected in all the targets one by one.

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

## Getting Started with Chaos Faults

### Using ChaosHub

1. **Browse Faults**: Explore the fault library in ChaosHub
2. **Select Fault**: Choose appropriate fault for your test scenario
3. **Configure Parameters**: Set fault-specific parameters and targets
4. **Add to Experiment**: Include fault in your chaos experiment

### Best Practices

- **Start Small**: Begin with low-impact faults in non-production environments
- **Gradual Progression**: Increase complexity and scope over time
- **Monitor Closely**: Use probes and monitoring to track system behavior
- **Document Results**: Record learnings and system improvements
- **Safety First**: Always have rollback procedures and safety mechanisms in place

## Related Resources

- [Common Tunables for All Faults](./chaos-faults/common-tunables-for-all-faults)
- [Creating Chaos Experiments](../guides/chaos-experiments/)
- [Resilience Probes](../guides/probes/)
- [Security Best Practices](../security/)
