---
id: node-memory-hog
title: Node memory hog
---
## Introduction
Node memory hog causes memory resource exhaustion on the Kubernetes node. 
- It is injected using a helper pod running the Linux stress-ng tool (a workload generator).
- The chaos affects the application for a specific duration.

![Node Memory Hog](./static/images/node-stress.png)


## Use cases

- Node memory hog fault causes memory resource exhaustion on the Kubernetes node. 
- It aims to verify resilience of applications whose replicas may be evicted on account on nodes becoming unschedulable (in **NotReady** state) due to lack of memory resources.
- It simulates the situation of memory leaks in the deployment of microservices.
- It simulates application slowness due to memory starvation.
- It simulates noisy neighbour problems due to hogging. 
- It verifies pod priority and QoS setting for eviction purposes. 
- It also verifies application restarts on OOM kills. 

:::info note
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
       <td> It contains the node label that is used to filter the target nodes.</td>
        <td>It is mutually exclusive with the <code>TARGET_NODES</code> environment variable. If both are provided, <code>TARGET_NODES</code> takes precedence. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">target nodes with labels.</a></td>
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
        <td> LIB_IMAGE </td>
        <td> Image used to run the stress command. </td>
        <td> Default: <code>litmuschaos/go-runner:latest</code>. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">image used by the helper pod.</a></td>
      </tr>
      <tr>
        <td> MEMORY_CONSUMPTION_PERCENTAGE </td>
        <td> Percent of the total node memory capacity. </td>
        <td> Default: 30. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog/#memory-consumption-percentage"> memory consumption percentage.</a></td>
      </tr>
      <tr>
        <td> MEMORY_CONSUMPTION_MEBIBYTES </td>
        <td> Amount of the total available memory (in mebibytes). It is mutually exclusive with <code>MEMORY_CONSUMPTION_PERCENTAGE</code>. </td>
        <td> For example, 256. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog/#memory-consumption-mebibytes"> memory consumption bytes.</a></td>
      </tr>  
      <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of VM workers involved in the stress. </td>
        <td> Default: 1. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress/#workers-for-stress"> workers for stress.</a></td>
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


### Memory consumption percentage

Memory consumed (in percentage). Tune it by using the `MEMORY_CONSUMPTION_PERCENTAGE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/node-memory-hog/memory-consumption-percentage.yaml yaml)
```yaml
# stress the memory of the targeted node with MEMORY_CONSUMPTION_PERCENTAGE of node capacity
# it is mutually exclusive with the MEMORY_CONSUMPTION_MEBIBYTES.
# if both are provided then it will use MEMORY_CONSUMPTION_PERCENTAGE for stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-memory-hog
    spec:
      components:
        env:
        # percentage of total node capacity to be stressed
        - name: MEMORY_CONSUMPTION_PERCENTAGE
          value: '10' # in percentage
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Memory consumption mebibytes

Memory available (in mebibytes). Tune it by using the `MEMORY_CONSUMPTION_MEBIBYTES` environment variable. It is mutually exclusive with the `MEMORY_CONSUMPTION_PERCENTAGE` environment variable. If `MEMORY_CONSUMPTION_PERCENTAGE` environment variable is set, the fault uses this value for the stress.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/node-memory-hog/memory-consumption-mebibytes.yaml yaml)
```yaml
# stress the memory of the targeted node with given MEMORY_CONSUMPTION_MEBIBYTES
# it is mutually exclusive with the MEMORY_CONSUMPTION_PERCENTAGE.
# if both are provided then it will use MEMORY_CONSUMPTION_PERCENTAGE for stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-memory-hog
    spec:
      components:
        env:
        # node memory to be stressed
        - name: MEMORY_CONSUMPTION_MEBIBYTES
          value: '500' # in MiBi
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Workers for stress

Number of workers for stress. Tune it by using the `NUMBER_OF_WORKERS` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/node-memory-hog/workers.yaml yaml)
```yaml
# provide for the workers count for the stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: node-memory-hog
    spec:
      components:
        env:
        # total number of workers involved in stress
        - name: NUMBER_OF_WORKERS
          value: '1' 
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
