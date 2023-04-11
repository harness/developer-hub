---
title: Common tunables for all faults
---
Fault tunables common to all the faults are provided at `.spec.experiment[*].spec.components.env` in the chaosengine.

### Duration of the chaos

It defines the total duration of the chaos injection (in seconds). Tune it by using the `TOTAL_CHAOS_DURATION` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifest/common/chaos-duration.yaml yaml)
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

It specifies the delay between each chaos iteration. Multiple iterations of chaos can be tuned by setting the `CHAOS_INTERVAL` environment variable. 

Use the following example to tune it:

[embedmd]:# (./static/manifest/common/chaos-interval.yaml yaml)
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

It specifies the period to wait before and after injecting chaos. It is in units of seconds. Tune it by using the `RAMP_TIME` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifest/common/ramp-time.yaml yaml)
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

It specifies the sequence of the chaos execution for multiple targets. Its default value is **parallel**. Tune it by using the `SEQUENCE` environment variable. It supports the following modes:

- `parallel`: The chaos is injected in all the targets at once.
- `serial`: The chaos is injected in all the targets one by one.

Use the following example to tune it:

[embedmd]:# (./static/manifest/common/sequence.yaml yaml)
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

It specifies a user-defined string that holds metadata or information about the current run or instance of chaos. For example, `04-05-2020-9-00`. This string is appended as a suffix in the chaosresult CR name. Tune it by using the `INSTANCE_ID` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifest/common/instance-id.yaml yaml)
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

It specifies the image used to launch the helper pod, if applicable. Tune it by using the `LIB_IMAGE` environment variable.
It is supported by **container-kill**, **network-faults**, **stress-faults**, **dns-faults**, **disk-fill**, **kubelet-service-kill**, **docker-service-kill**, and **node-restart** faults.

Use the following example to tune it:

[embedmd]:# (./static/manifest/common/lib-image.yaml yaml)
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
          value: 'litmuschaos/go-runner:latest'
```
