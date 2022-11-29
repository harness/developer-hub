---
id: pod-cpu-hog-exec
title: Pod CPU Hog Exec
---

## Introduction
- This fault consumes the CPU resources of the application container.

- It simulates conditions where app pods experience CPU spikes either due to expected/undesired processes thereby testing how the overall application stack behaves when this occurs.

:::tip Fault execution flow chart
![Pod CPU Hog Exec](./static/images/pod-stress.png)
:::

## Uses
<details>
<summary>View the uses of the fault</summary>
<div>
Disk Pressure or CPU hogs is another very common and frequent scenario we find in kubernetes applications that can result in the eviction of the application replica and impact its delivery. Such scenarios that can still occur despite whatever availability aids K8s provides. These problems are generally referred to as "Noisy Neighbor"  problems.

Injecting a rogue process into a target container, we starve the main microservice process (typically pid 1) of the resources allocated to it (where limits are defined) causing slowness in application traffic or in other cases unrestrained use can cause node to exhaust resources leading to eviction of all pods. So this category of chaos fault helps to build the immunity of the application undergoing any such stress scenario.
</div>
</details>

## Prerequisites
:::info
- Ensure that Kubernetes Version > 1.16.
:::

## Default Validations
:::note
The application pods should be in running state before and after chaos injection.
:::

## Fault Tunables
<details>
    <summary>Check the Fault Tunables</summary>
    <h2>Optional Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> CPU_CORES </td>
        <td> Number of the CPU cores subjected to CPU stress </td>
        <td> Default to 1 </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos insertion (seconds) </td>
        <td> Default to 60s </td>
      </tr>
      <tr>
        <td> LIB </td>
        <td> The chaos lib used to inject the chaos. Available libs are <code>litmus</code></td>
        <td> Default to <code>litmus</code> </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod CPU hog chaos</td>
        <td> If not provided, it will select target pods randomly based on provided appLabels</td>
      </tr> 
      <tr> 
        <td> TARGET_CONTAINER </td>
        <td> Name of the target container under chaos </td>
        <td> If not provided, it will select the first container of the target pod </td>
      </tr> 
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr>
      <tr>
        <td> CHAOS_INJECT_COMMAND </td>
        <td> The command to inject the CPU chaos </td>
        <td> Default to <code>md5sum /dev/zero</code> </td>
      </tr>
      <tr>
        <td> CHAOS_KILL_COMMAND </td>
        <td> The command to kill the chaos process</td>
        <td> Default to <code>kill $(find /proc -name exe -lname '*/md5sum' 2>&1 | grep -v 'Permission denied' | awk -F/ '&#123;print $(NF-1)&#125;')</code>. Another useful one that generally works (in case the default doesn't) is <code>kill -9 $(ps afx | grep \"[md5sum] /dev/zero\" | awk '&#123;print $1&#125;' | tr '\n' ' ')</code>. In case neither works, please check whether the target pod's base image offers a shell. If yes, identify appropriate shell command to kill the chaos process. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before injection of chaos in sec </td>
        <td> Eg. 30 </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple target pods </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
    </table>
</details>

## Fault Examples

### Common and Pod specific tunables
Refer the [common attributes](../../common-tunables-for-all-faults) and [Pod specific tunable](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### CPU Cores

It stresses the `CPU_CORE` CPU cores of the targeted pod for the `TOTAL_CHAOS_DURATION` duration.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-cpu-hog-exec/cpu-cores.yaml yaml)
```yaml
# CPU cores for the stress
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
  - name: pod-cpu-hog-exec
    spec:
      components:
        env:
        # CPU cores for stress
        - name: CPU_CORES
          value: '1'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Chaos Inject and Kill Commands

It defines the `CHAOS_INJECT_COMMAND` and `CHAOS_KILL_COMMAND` ENV to set the chaos inject and chaos kill commands respectively.
Default values of commands:

- `CHAOS_INJECT_COMMAND`: "md5sum /dev/zero"
- `CHAOS_KILL_COMMAND`: "kill $(find /proc -name exe -lname '*/md5sum' 2>&1 | grep -v 'Permission denied' | awk -F/ '{print $(NF-1)}')"

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-cpu-hog-exec/inject-and-kill-commands.yaml yaml)
```yaml
# provide the chaos kill, used to kill the chaos process
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
  - name: pod-cpu-hog-exec
    spec:
      components:
        env:
        # command to create the md5sum process to stress the cpu
        - name: CHAOS_INJECT_COMMAND
          value: 'md5sum /dev/zero'
        # command to kill the md5sum process
        # alternative command: "kill -9 $(ps afx | grep \"[md5sum] /dev/zero\" | awk '{print$1}' | tr '\n' ' ')"
        - name: CHAOS_KILL_COMMAND
          value: "kill $(find /proc -name exe -lname '*/md5sum' 2>&1 | grep -v 'Permission denied' | awk -F/ '{print $(NF-1)}')"
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```
