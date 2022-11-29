---
title: Common Tunables for All Faults
---
Fault tunables which are common for all the faults. These tunables can be provided at `.spec.experiment[*].spec.components.env` in chaosengine.

### Duration of the chaos

It defines the total time duration of the chaos injection. You can tune it using the `TOTAL_CHAOS_DURATION` environment variable. It is in unit of seconds.

Use the following example to tune this:

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

### Multiple Iterations Of Chaos

The multiple iterations of chaos can be tuned via setting `CHAOS_INTERVAL` ENV. Which defines the delay between each iteration of chaos.

Use the following example to tune this:

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

### Chaos Interval

The multiple iterations of chaos can be tuned via setting `CHAOS_INTERVAL` ENV. Which defines the delay between each iteration of chaos.

Use the following example to tune this:

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

### Ramp Time

It defines the period to wait before and after the injection of chaos. You can tune it using the `RAMP_TIME` environment variable. It is in unit of seconds.

Use the following example to tune this:

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

It defines the sequence of the chaos execution in the case of multiple targets. You can tune it using the `SEQUENCE` environment variable. It supports the following modes:

- `parallel`: The chaos is injected in all the targets at once.
- `serial`: The chaos is injected in all the targets one by one.
The default value of `SEQUENCE` is `parallel`.

Use the following example to tune this:

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

It defines a user-defined string that holds metadata/info about the current run/instance of chaos. For example: 04-05-2020-9-00. This string is appended as a suffix in the chaosresult CR name. It can be tuned with `INSTANCE_ID` ENV.

Use the following example to tune this:

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

It defines the image, which is used to launch the helper pod, if applicable. It can be tuned with the `LIB_IMAGE` ENV.
It is supported by [container-kill, network-faults, stress-faults, dns-faults, disk-fill, kubelet-service-kill, docker-service-kill, node-restart] faults.

Use the following example to tune this:

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
        # nane of the lib image
        - name: LIB_IMAGE
          value: 'litmuschaos/go-runner:latest'
```
