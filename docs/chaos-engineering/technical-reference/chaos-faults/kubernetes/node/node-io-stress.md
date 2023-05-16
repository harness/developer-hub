---
title: Node IO stress
id: node-io-stress
---
## Introduction

Node IO stress causes I/O stress on the Kubernetes node. 

![Node CPU Hog](./static/images/node-stress.png)


## Use cases
- Node IO stress fault verifies the resilience of applications that share the disk resource for ephemeral or persistent storage during high disk I/O usage.
- It tests application resilience on replica evictions that occur due to I/O stress on the available disk space.
- It simulates slower disk operations by the application and noisy neighbour problems by hogging the disk bandwidth. 
- It also verifies the disk performance on increasing I/O threads and varying I/O block sizes. 
- It checks if the application functions under high disk latency conditions. when I/O traffic is very high and includes large I/O blocks, and when other services monopolize the I/O disks. 

:::info note
- Kubernetes > 1.16 is required to execute this fault.
- The target nodes should be in the ready state before and after injecting chaos.
:::

## Fault tunables

   <h3>Mandatory tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_NODES </td>
        <td> Comma-separated list of nodes subject to node I/O stress.</td>
        <td> For example, <code>node-1,node-2</code>. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes">target nodes.</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
       <td> It contains the node label that is used to filter the target nodes. It is mutually exclusive with the <code>TARGET_NODES</code> environment variable.</td>
        <td>If both the environment variables are provided, <code>TARGET_NODES</code> takes precedence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">node label.</a></td>
      </tr>
    </table>
    <h3>Optional tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Default: 120 s. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos.</a></td>
      </tr>
      <tr>
        <td> FILESYSTEM_UTILIZATION_PERCENTAGE </td>
        <td> Specify the size as a percentage of free space on the file system.</td>
        <td> Default: 10 %. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-io-stress/#filesystem-utilization-percentage">file system utilization percentage.</a> </td>
      </tr>
      <tr>
        <td> FILESYSTEM_UTILIZATION_BYTES </td>
        <td> Specify the size of the files used per worker (in GB). <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> and <code>FILESYSTEM_UTILIZATION_BYTES</code> are mutually exclusive. </td>
        <td>If both are provided, <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> takes precedence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-io-stress/#filesystem-utilization-bytes"> file system utilization bytes.</a></td>
      </tr>
      <tr>
        <td> CPU </td>
        <td> Number of cores of the CPU that will be used. </td>
        <td> Default: 1. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-cpu-hog/#cpu_cores"> CPU cores.</a></td>
      </tr>    
      <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of I/O workers involved in I/O stress. </td>
        <td> Default: 4. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress/#workers-for-stress"> workers for stress.</a></td>
      </tr> 
      <tr>
        <td> VM_WORKERS </td>
        <td> Number of VM workers involved in I/O stress. </td>
        <td> Default: 1. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress/#workers-for-stress"> workers for stress.</a></td>
      </tr> 
      <tr>    
        <td> LIB_IMAGE </td>
        <td> Image used to run the stress command. </td>
        <td> Default: <code>litmuschaos/go-runner:latest</code>. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">image used by the helper pod.</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time.</a></td>
      </tr>
      <tr>
        <td> NODES_AFFECTED_PERC </td>
        <td> Percentage of the total nodes to target. It takes numeric values only. </td>
        <td> Default: 0 (corresponds to 1 node). For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#node-affected-percentage">node affected percentage.</a></td>
      </tr> 
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods.</td>
        <td> Default: parallel. Supports serial sequence as well. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
      </tr>
    </table>


### File system utilization percentage

Free space available on the node (in percentage). Tune it by using the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. 

The following YAML snippet illustrates the use of this environment variable:

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

Free space available on the node (in gigabytes). Tune it by using the `FILESYSTEM_UTILIZATION_BYTES` environment variable. It is mutually exclusive with the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precedence.

The following YAML snippet illustrates the use of this environment variable:

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

CPU usage limit while the CPU undergoes I/O stress. Tune it by using the `CPU` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

Number of I/O and VM workers for the stress. Tune it by using the `NUMBER_OF_WORKERS` and `VM_WORKERS` environment variables, respectively. 

The following YAML snippet illustrates the use of this environment variable:

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
