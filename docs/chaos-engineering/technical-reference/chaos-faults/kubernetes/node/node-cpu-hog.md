---
id: node-cpu-hog
title: Node CPU hog
---
## Introduction

Node CPU hog exhausts the CPU resources on a Kubernetes node. 
- The CPU chaos is injected using a helper pod running the Linux stress tool (a workload generator). 
- The chaos affects the application for a specific duration. 

![Node CPU Hog](./static/images/node-stress.png)


## Use cases
- Node CPU hog fault helps verify the resilience of applications whose replicas get evicted on the account of the nodes turning unschedulable (in **NotReady** state) or new replicas unable to be scheduled due to a lack of CPU resources.
- It causes CPU stress on the target node(s). 
- It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. 
- It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, that is, demand based CPU addition. 
- It helps scalability of nodes based on growth beyond budgeted pods. 
- It verifies the autopilot functionality of cloud managed clusters. 
- It also verifies multi-tenant load issues; that is, when the load increases on one container, it does not cause downtime in other containers. 

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
        <td> Comma-separated list of nodes subject to node CPU hog. </td>
        <td> For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-multiple-nodes">target nodes.</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
        <td> It contains the node label used to filter the target nodes.</td>
        <td>It is mutually exclusive with the <code>TARGET_NODES</code> environment variable. If both are provided, <code>TARGET_NODES</code> takes precedence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">node label.</a></td>
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
        <td> Default: 60 s. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos.</a></td>
      </tr>
        <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to inject stress. </td>
        <td> Default: <code>litmuschaos/go-runner:latest</code>. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">image used by the helper pod.</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time.</a></td>
        <td> </td>
      </tr>
      <tr>
        <td> NODE_CPU_CORE </td>
        <td> Number of cores of the CPU to be consumed. </td>
        <td> Default: <code>2</code>. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-cpu-hog#node-cpu-cores">node CPU cores.</a></td>
      </tr>  
        <tr>
            <td> NODES_AFFECTED_PERC </td>
            <td> Percentage of total nodes to target, that takes numeric values only. </td>
            <td> Default: 0 (corresponds to 1 node). For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#node-affected-percentage">node affected percentage.</a></td>
        </tr> 
        <tr>
            <td> SEQUENCE </td>
            <td> Sequence of chaos execution for multiple target pods. </td>
            <td> Default: parallel. Supports serial sequence as well. For more information, go to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
        </tr>
    </table>

### Node CPU cores
Number of cores of CPU that will be consumed. Tune it by using the `NODE_CPU_CORE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

Percentage of CPU that will be consumed. Tune it by using the `CPU_LOAD` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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
