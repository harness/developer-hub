---
title: Chaos Faults
description: Comprehensive library of pre-built chaos faults for testing system resilience
sidebar_position: 1
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults
- /docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults
---

# Chaos Faults

Chaos faults are the failures injected into the chaos infrastructure as part of a chaos experiment. Every fault is associated with a target resource, and you can customize the fault using the fault tunables, which you can define as part of the Chaos Experiment CR and Chaos Engine CR.

The fault execution is triggered when the chaos engine resource is created. Typically, the chaos engine is embedded within the **steps** of a chaos fault. However, you can also create the chaos engine manually, and the chaos operator reconciles this resource and triggers the fault execution.

You can customize a fault execution by changing the tunables (or parameters). Some tunables are common across all the faults (for example, **chaos duration**), and every fault has its own set of tunables: default and mandatory ones. You can update the default tunables when required and always provide values for mandatory tunables (as the name suggests).

## Fault Status

Fault status indicates the current status of the fault executed as a part of the chaos experiment. A fault can have 0, 1, or more associated [probes](/docs/chaos-engineering/guides/probes/). Other steps in a chaos experiment include resource creation and cleanup.

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

Fault tunables common to all the faults are provided at `.spec.experiment[*].spec.components.env` in the chaosengine.

### Duration of the chaos

Total duration of the chaos injection (in seconds). Tune it by using the `TOTAL_CHAOS_DURATION` environment variable.

The following YAML snippet illustrates the use of this environment variable:

```yaml
# defines total time duration of the chaos
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # time duration for the chaos execution
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Chaos interval

The delay between each chaos iteration. Multiple iterations of chaos are tuned by setting the `CHAOS_INTERVAL` environment variable. 

The following YAML snippet illustrates the use of this environment variable:

```yaml
# defines delay between each successive iteration of the chaos
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # delay between each iteration of chaos
        - name: CHAOS_INTERVAL
          value: '15'
        # time duration for the chaos execution
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Ramp time

Period to wait before and after injecting chaos. It is in units of seconds. Tune it by using the `RAMP_TIME` environment variable.

The following YAML snippet illustrates the use of this environment variable:

```yaml
# waits for the ramp time before and after injection of chaos
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # waits for the time interval before and after injection of chaos
        - name: RAMP_TIME
          value: '10' # in seconds
```

### Sequence of chaos execution

The sequence of the chaos execution for multiple targets. Its default value is **parallel**. Tune it by using the `SEQUENCE` environment variable. It supports the following modes:

- `parallel`: The chaos is injected in all the targets at once.
- `serial`: The chaos is injected in all the targets one by one.

The following YAML snippet illustrates the use of this environment variable:

```yaml
# define the order of execution of chaos in case of multiple targets
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # define the sequence of execution of chaos in case of mutiple targets
        # supports: serial, parallel. default: parallel
        - name: SEQUENCE
          value: 'parallel'
```

### Instance ID

A user-defined string that holds metadata or information about the current run or instance of chaos. For example, `04-05-2020-9-00`. This string is appended as a suffix in the chaosresult CR name. Tune it by using the `INSTANCE_ID` environment variable.

The following YAML snippet illustrates the use of this environment variable:

```yaml
# provide to append user-defined suffix in the end of chaosresult name
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        # user-defined string appended as suffix in the chaosresult name
        - name: INSTANCE_ID
          value: '123'
```

### Image used by the helper pod

The image used to launch the helper pod, if applicable. Tune it by using the `LIB_IMAGE` environment variable.
It is supported by **container-kill**, **network-faults**, **stress-faults**, **dns-faults**, **disk-fill**, **kubelet-service-kill**, **docker-service-kill**, and **node-restart** faults.

The following YAML snippet illustrates the use of this environment variable:

```yaml
# it contains the lib image used for the helper pod
# it support [container-kill, network-faults, stress-faults, dns-faults, disk-fill,
# kubelet-service-kill, docker-service-kill, node-restart] faults
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: container-kill
    spec:
      components:
        env:
        # name of the lib image
        - name: LIB_IMAGE
          value: 'harness/chaos-go-runner:main-latest'
```

### Default health check

Determines if you wish to run the default health check which is present inside the fault. Its default value is 'true'. Tune it by using the `DEFAULT_HEALTH_CHECK` environment variable.

The following YAML snippet illustrates the use of this environment variable:

```yaml
## application status check as tunable
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: pod-delete
    spec:
      components:
        env:
        - name: DEFAULT_HEALTH_CHECK
          value: 'false'
```

### Status check timeout

Status check timeout is a configuration parameter that defines the maximum duration the chaos experiment will wait for a resource (like an application under test or a node) to reach the desired state (e.g., Running, Ready) before proceeding.

- If the resource doesn't attain the expected state within this timeframe, the experiment may be marked as failed.

The following YAML snippet illustrates its usage:

```yaml
# contains status check timeout for the experiment pod
# it will set this timeout as upper bound while checking application status, node status in experiments
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # status check timeout for the experiment pod
        statusCheckTimeouts:
          delay: 2
          timeout: 300
```
