---
id: node-memory-hog
title: Node memory hog
---

Node memory hog causes memory resource exhaustion on the Kubernetes node. 
- It is injected using a helper pod running the Linux stress-ng tool (a workload generator).
- The chaos affects the application for a duration specified by the `TOTAL_CHAOS_DURATION` environment variable.

![Node Memory Hog](./static/images/node-stress.png)


## Use cases

- This fault causes memory resource exhaustion on the Kubernetes node. 
- It aims to verify resilience of applications whose replicas may be evicted on account on nodes becoming unschedulable (in **NotReady** state) due to lack of memory resources.
- It simulates the situation of memory leaks in the deployment of microservices.
- It simulates application slowness due to memory starvation.
- It simulates noisy neighbour problems due to hogging. 
- It verifies pod priority and QoS setting for eviction purposes. 
- It also verifies application restarts on OOM kills. 

**Note**
- The target nodes should be in the ready state before and after injecting chaos.


## Fault tunables
<h3>Mandatory fields</h3>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_NODES </td>
        <td> Comma-separated list of nodes subject to node I/O stress.</td>
        <td> For example, <code>node-1,node-2</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes">here.</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
       <td> It contains the node label that is used to filter the target nodes.</td>
        <td>It is mutually exclusive with the <code>TARGET_NODES</code> environment variable. If both are provided, <code>TARGET_NODES</code> takes precedence. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">here.</a></td>
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
        <td> Default to 120s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">here.</a></td>
      </tr>
      <tr>    
        <td> LIB_IMAGE </td>
        <td> Image used to run the stress command. </td>
        <td> Defaults to <code>litmuschaos/go-runner:latest</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">here.</a></td>
      </tr>
      <tr>
        <td> MEMORY_CONSUMPTION_PERCENTAGE </td>
        <td> Percent of the total node memory capacity. </td>
        <td> Defaults to 30. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog/#memory-consumption-percentage"> here.</a></td>
      </tr>
      <tr>
        <td> MEMORY_CONSUMPTION_MEBIBYTES </td>
        <td> Amount of the total available memory (in mebibytes). It is mutually exclusive with <code>MEMORY_CONSUMPTION_PERCENTAGE</code>. </td>
        <td> For example, 256. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog/#memory-consumption-mebibytes"> here.</a></td>
      </tr>  
      <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of VM workers involved in the stress. </td>
        <td> Defaults to 1. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress/#workers-for-stress"> here.</a></td>
      </tr> 
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">here.</a></td>
      </tr>
      <tr>
        <td> NODES_AFFECTED_PERC </td>
        <td> Percentage of the total nodes to target. It takes numeric values only. </td>
        <td> Defaults to 0 (corresponds to 1 node). More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#node-affected-percentage"> here.</a></td>
      </tr> 
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods.</td>
        <td> Defaults to parallel. Supports serial sequence as well. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> here.</a></td>
      </tr>
    </table>


### Memory consumption percentage

It specifies the amount of memory consumed (in percentage). Tune it by using the `MEMORY_CONSUMPTION_PERCENTAGE` environment variable.

Use the following example to tune this:

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

It specifies the amount of memory available. Tune it by using the `MEMORY_CONSUMPTION_MEBIBYTES` environment variable. It is mutually exclusive with the `MEMORY_CONSUMPTION_PERCENTAGE` environment variable. If `MEMORY_CONSUMPTION_PERCENTAGE` environment variable is set, then it uses this value for the stress.

Use the following example to tune it:

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

It specifies the number of workers for stress. Tune it by using the `NUMBER_OF_WORKERS` environment variable.

Use the following example to tune it:

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
