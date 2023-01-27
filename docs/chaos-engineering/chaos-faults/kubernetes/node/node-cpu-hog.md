---
id: node-cpu-hog
title: Node CPU hog
---
Node CPU hog exhausts the CPU resources on a Kubernetes node. 
- The CPU chaos is injected using a helper pod running the Linux stress tool (a workload generator). 
- The chaos affects the application for a period defined by the `TOTAL_CHAOS_DURATION` environment variable.


![Node CPU Hog](./static/images/node-stress.png)


## Usage
<details>
<summary>View the uses of the fault</summary>
<div>
The fault aims to verify resiliency of applications whose replicas may be evicted on account on nodes turning unschedulable (Not Ready) due to lack of CPU resources.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.


## Default validations

The target nodes should be in the ready state before and after injecting chaos.

## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_NODES </td>
        <td> Comma-separated list of nodes subject to node CPU hog. </td>
        <td> </td>
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
        <td> Defaults to 60s. </td>
      </tr>
        <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to inject stress. </td>
        <td> Defaults to <code>litmuschaos/go-runner:latest</code>. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s.</td>
        <td> </td>
      </tr>
      <tr>
        <td> NODE_CPU_CORE </td>
        <td> Number of cores of the CPU to be consumed. </td>
        <td> Defaults to <code>2</code>. </td>
      </tr>  
        <tr>
            <td> NODES_AFFECTED_PERC </td>
            <td> Percentage of total nodes to target, that takes numeric values only. </td>
            <td> Defaults to 0 (corresponds to 1 node). </td>
        </tr> 
        <tr>
            <td> SEQUENCE </td>
            <td> Sequence of chaos execution for multiple target pods. </td>
            <td> Defaults to parallel. Supports serial sequence as well. </td>
        </tr>
    </table>
</details>

## Fault examples

### Common and node-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [node-specific tunables](./common-tunables-for-node-faults) to tune the common tunables for all faults and node specific tunables.

### Node CPU cores
It contains the number of cores of CPU that will be consumed. You can tune it using the `NODE_CPU_CORE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-cpu-hog/node-cpu-core.yaml yaml)
```yaml
# stress the CPU of the targeted nodes
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-cpu-hog
    spec:
      components:
        env:
        # number of CPU cores to be stressed
        - name: NODE_CPU_CORE
          value: '2'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Node CPU load

It contains the percentage of CPU that will be consumed. You can tune it using the `CPU_LOAD` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/node-cpu-hog/node-cpu-load.yaml yaml)
```yaml
# stress the CPU of the targeted nodes by load percentage
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-cpu-hog
    spec:
      components:
        env:
        # percentage of CPU to be stressed
        - name: CPU_LOAD
          value: "100"
        # node CPU core should be provided as 0 for CPU load
        # to work otherwise it will take CPU core as priority
        - name: NODE_CPU_CORE
          value: '0'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
