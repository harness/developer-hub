---
title: Node IO stress
id: node-io-stress
---

Node IO stress causes I/O stress on the Kubernetes node. 
- The amount of I/O stress is specifed as the size in percentage of the total free space available on the file system using `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable or in gigabytes(GB) using `FILESYSTEM_UTILIZATION_BYTES` environment variable. 
- When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precendence. 
- It tests application resiliency on replica evictions that occur due I/O stress on the available disk space.


![Node CPU Hog](./static/images/node-stress.png)


## Use cases
- The fault verifies the resilience of applications that share the disk resource for ephemeral or persistent storage during high disk I/O usage.
- It simulates slower disk operations by the application and noisy neighbour problems by hogging the disk bandwidth. 
- It also verifies the disk performance on increasing I/O threads and varying I/O block sizes. 
- It checks if the application functions under high disk latency conditions. when I/O traffic is very high and includes large I/O blocks, and when other services monopolize the I/O disks. 

**Note**
- Kubernetes > 1.16 is required to execute this fault.
- The target nodes should be in the ready state before and after injecting chaos.


## Fault tunables

### Mandatory Fields

| Variables    | Description                                                         | Notes                                                                                                                                                                                                                                                                                                                                |
|--------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TARGET_NODES | Comma-separated list of nodes subject to node CPU hog.              | More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes">here.</a>                                                                                                                                                        |
| NODE_LABEL   | It contains the node label that is used to filter the target nodes. | It is mutually exclusive with the <code>TARGET_NODES</code> environment variable. If both are provided, <code>TARGET_NODES</code> takes precedence. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">here.</a> |

### Optional fields

| Variables                         | Description                                                                                                                                                                                                                 | Notes                                                                                                                                                                                                                       |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TOTAL_CHAOS_DURATION              | Duration that you specify, through which chaos is injected into the target resource (in seconds).                                                                                                                           | Defaults to 60s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">here.</a>                                               |
| LIB_IMAGE                         | Image used to inject stress.                                                                                                                                                                                                | Defaults to <code>litmuschaos/go-runner:latest</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">here.</a>  |
| RAMP_TIME                         | Period to wait before and after injecting chaos (in seconds).                                                                                                                                                               | For example, 30s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">here.</a>                                                          |
| FILESYSTEM_UTILIZATION_PERCENTAGE | Specify the size as a percentage of free space on the file system.                                                                                                                                                          | Default to 10%. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-io-stress/#filesystem-utilization-percentage">here.</a>                                            |
| FILESYSTEM_UTILIZATION_BYTES      | Specify the size of the files used per worker (in GB). FILESYSTEM_UTILIZATION_PERCENTAGE and FILESYSTEM_UTILIZATION_BYTES are mutually exclusive. If both are provided, FILESYSTEM_UTILIZATION_PERCENTAGE takes precedence. | More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-io-stress/#filesystem-utilization-bytes"> here.</a>                                                                |
| NODES_AFFECTED_PERC               | Percentage of total nodes to target, that takes numeric values only.                                                                                                                                                        | Defaults to 0 (corresponds to 1 node). More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#node-affected-percentage">here.</a>     |
| CPU                               | Number of cores of the CPU that will be used.                                                                                                                                                                               | Defaults to 1. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-cpu-hog/#cpu_cores"> here.</a>                                                                      |
| NUMBER_OF_WORKERS                 | Number of I/O workers involved in I/O stress.                                                                                                                                                                               | Defaults to 4. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress/#workers-for-stress"> here.</a>                                                    |
| VM_WORKERS                        | Number of VM workers involved in I/O stress.                                                                                                                                                                                | Defaults to 1. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress/#workers-for-stress"> here.</a>                                                    |
| SEQUENCE                          | Sequence of chaos execution for multiple target pods.                                                                                                                                                                       | Defaults to parallel. Supports serial sequence as well. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> here.</a> |


### File system utilization percentage

It specifies the amount of free space available on the node (in percentage). Tune it by using the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. 

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-io-stress/filesystem-utilization-percentage.yaml yaml)
```yaml
# stress the I/O of the targeted node with FILESYSTEM_UTILIZATION_PERCENTAGE of total free space 
# it is mutually exclusive with the FILESYSTEM_UTILIZATION_BYTES.
# if both are provided then it will use FILESYSTEM_UTILIZATION_PERCENTAGE for stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-io-stress
    spec:
      components:
        env:
        # percentage of total free space of file system
        - name: FILESYSTEM_UTILIZATION_PERCENTAGE
          value: '10' # in percentage
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### File system utilization bytes

It specifies the amount of free space available on the node (in gigabytes). Tune it by using the `FILESYSTEM_UTILIZATION_BYTES` environment variable. It is mutually exclusive with the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precedence.

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-io-stress/filesystem-utilization-bytes.yaml yaml)
```yaml
# stress the i/o of the targeted node with given FILESYSTEM_UTILIZATION_BYTES
# it is mutually exclusive with the FILESYSTEM_UTILIZATION_PERCENTAGE.
# if both are provided then it will use FILESYSTEM_UTILIZATION_PERCENTAGE for stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-io-stress
    spec:
      components:
        env:
        # file system to be stress in GB
        - name: FILESYSTEM_UTILIZATION_BYTES
          value: '500' # in GB
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Limit CPU utilization

It specifies the CPU usage limit while the CPU undergoes I/O stress. Tune it by using the `CPU` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-io-stress/limit-cpu-utilization.yaml yaml)
```yaml
# limit the CPU uses to the provided value while performing io stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-io-stress
    spec:
      components:
        env:
        # number of CPU cores to be stressed
        - name: CPU
          value: '1' 
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Workers for stress

It specifies the number of I/O and VM workers for the stress. Tune it by using the `NUMBER_OF_WORKERS` and `VM_WORKERS` environment variables, respectively. 

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-io-stress/workers.yaml yaml)
```yaml
# define the workers count for the i/o and vm
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-io-stress
    spec:
      components:
        env:
        # total number of io workers involved in stress
        - name: NUMBER_OF_WORKERS
          value: '4' 
          # total number of vm workers involved in stress
        - name: VM_WORKERS
          value: '1'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
