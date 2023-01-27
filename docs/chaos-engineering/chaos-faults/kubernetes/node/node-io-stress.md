---
title: Node IO stress
id: node-io-stress
---

Node IO stress causes I/O stress on the Kubernetes node. 
- The amount of I/O stress is specifed as the size in percentage of the total free space available on the file system using `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable or in gigabytes(GB) using `FILESYSTEM_UTILIZATION_BYTES` environment variable. 
- When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precendence. 
- It tests application resiliency on replica evictions that occur due I/O stress on the available disk space.


![Node CPU Hog](./static/images/node-stress.png)


## Usage
<details>
<summary>View the uses of the fault</summary>
<div>
The fault aims to verify the resilience of applications that share the disk resource for ephemeral or persistent storage purposes.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.

## Default validations

The target nodes should be in the ready state before and after injecting chaos.


## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Mandatory fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_NODES </td>
        <td> Comma-separated list of nodes subject to node I/O stress.</td>
        <td> For example, <code>node-1,node-2</code>. </td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
       <td> It contains the node label that is used to filter the target nodes.</td>
        <td>It is mutually exclusive with the <code>TARGET_NODES</code> environment variable. If both are provided, <code>TARGET_NODES</code> takes precedence.</td>
      </tr>
    </table>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Default to 120s. </td>
      </tr>
      <tr>
        <td> FILESYSTEM_UTILIZATION_PERCENTAGE </td>
        <td> Specify the size as a percentage of free space on the file system.</td>
        <td> Default to 10%</td>
      </tr>
      <tr>
        <td> FILESYSTEM_UTILIZATION_BYTES </td>
        <td> Specify the size of the files used per worker (in GB). <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> and <code>FILESYSTEM_UTILIZATION_BYTES</code> are mutually exclusive. If both are provided, <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> takes precedence. </td>
        <td> </td>
      </tr>
      <tr>
        <td> CPU </td>
        <td> Number of cores of the CPU that will be used. </td>
        <td> Defaults to 1. </td>
      </tr>    
      <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of I/O workers involved in I/O stress. </td>
        <td> Defaults to 4. </td>
      </tr> 
      <tr>
        <td> VM_WORKERS </td>
        <td> Number of VM workers involved in I/O stress. </td>
        <td> Defaults to 1. </td>
      </tr> 
      <tr>    
        <td> LIB_IMAGE </td>
        <td> Image used to run the stress command. </td>
        <td> Defaults to <code>litmuschaos/go-runner:latest</code> .</td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
      <tr>
        <td> NODES_AFFECTED_PERC </td>
        <td> Percentage of the total nodes to target. It takes numeric values only. </td>
        <td> Defaults to 0 (corresponds to 1 node). </td>
      </tr> 
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods.</td>
        <td> Defaults to parallel. Supports serial sequence as well. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and node-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [node-specific tunables](./common-tunables-for-node-faults) to tune the common tunables for all faults and node specific tunables.

### File system utilization percentage

It specifies the amount of free space available on the node (in percentage). You can tune it using the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. 

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-io-stress/filesystem-utilization-percentage.yaml yaml)
```yaml
# stress the i/o of the targeted node with FILESYSTEM_UTILIZATION_PERCENTAGE of total free space 
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

It specifies the amount of free space available on the node (in gigabytes). You can tune it using the `FILESYSTEM_UTILIZATION_BYTES` environment variable. It is mutually exclusive with the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precedence.

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

It specifies the CPU usage limit while the CPU undergoes I/O stress. You can tune it using the `CPU` environment variable.

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

It specifies the number of I/O and VM workers for the stress. You can tune it using the `NUMBER_OF_WORKERS` and `VM_WORKERS` environment variables, respectively. 

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
