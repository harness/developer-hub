---
id: pod-memory-hog-exec
title: Pod memory hog exec
---
Pod memory hog exec is a Kubernetes pod-level chaos fault that consumes memory resources on the application container on specified memory in megabytes.
- It simulates conditions where app pods experience Memory spikes either due to expected/undesired processes thereby testing how the overall application stack behaves when this occurs.

![Pod Memory Hog Exec](./static/images/pod-stress.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
Memory usage within containers is subject to various constraints in Kubernetes. If the limits are specified in their spec, exceeding them results in termination of the container (due to OOMKill of the primary process, often pid 1).
This restarts container dependng on policy specified. For containers with no limits on memory, node can be killed based on their oom_score. This results in a bigger blast radius. 

This fault causes stress within the target container, which may result in the primary process in the container to be constrained or eat up the available system memory on the node.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.


## Default validations

The application pods should be in running state before and after chaos injection.


## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> MEMORY_CONSUMPTION </td>
        <td> The amount of memory used of hogging a Kubernetes pod (megabytes)</td>
        <td> Defaults to 500MB (Up to 2000MB)</td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos insertion (seconds) </td>
        <td> Defaults to 60s </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod memory hog chaos</td>
        <td> If not provided, it will select target pods randomly based on provided appLabels</td>
      </tr>
      <tr> 
        <td> TARGET_CONTAINER </td>
        <td> Name of the target container under chaos </td>
        <td> If not provided, it will select the first container of the target pod </td>
      </tr> 
      <tr>
        <td> CHAOS_KILL_COMMAND </td>
        <td> The command to kill the chaos process </td>
        <td> Defaults to <code>kill $(find /proc -name exe -lname '*/dd' 2>&1 | grep -v 'Permission denied' | awk -F/ '&#123;print $(NF-1)&#125;' | head -n 1)</code>. Another useful one that generally works (in case the default doesn't) is <code>kill -9 $(ps afx | grep \"[dd] if=/dev/zero\" | awk '&#123;print $1&#125;' | tr '\n' ' ')</code>. In case neither works, please check whether the target pod's base image offers a shell. If yes, identify appropriate shell command to kill the chaos process. </td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before injection of chaos in sec </td>
        <td> For example, 30s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple target pods </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and pod-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod-specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Memory consumption

It specifies the amount of memory consumed by the tatget pod for a duration specified by the `TOTAL_CHAOS_DURATION` environment variable. You can tune it using the `MEMORY_CONSUMPTION` environment variable.
The memory consumption limit is 2000 MB.

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-memory-hog-exec/memory-consumption.yaml yaml"

```yaml
# memory to be stressed in MB
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
    - name: pod-memory-hog
      spec:
        components:
          env:
            # memory consumption value in MB
            # it is limited to 2000MB
            - name: MEMORY_CONSUMPTION
              value: "500" #in MB
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Chaos kill commands

It defines kill command that is set to exhaust the resources. Ypu can tune it using the `CHAOS_KILL_COMMAND` environment variable.

- `CHAOS_KILL_COMMAND`: "kill $(find /proc -name exe -lname '\*/dd' 2>&1 | grep -v 'Permission denied' | awk -F/ '{print $(NF-1)}' | head -n 1)"

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-memory-hog-exec/kill-command.yaml yaml"

```yaml
# provide the chaos kill command used to kill the chaos process
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
    - name: pod-memory-hog-exec
      spec:
        components:
          env:
            # command to kill the dd process
            # alternative command: "kill -9 $(ps afx | grep \"[dd] if=/dev/zero\" | awk '{print $1}' | tr '\n' ' ')"
            - name: CHAOS_KILL_COMMAND
              value: "kill $(find /proc -name exe -lname '*/dd' 2>&1 | grep -v 'Permission denied' | awk -F/ '{print $(NF-1)}' | head -n 1)"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```
