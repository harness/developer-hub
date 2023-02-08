---
id: node-cpu-hog
title: Node CPU hog
---
Node CPU hog exhausts the CPU resources on a Kubernetes node. 
- The CPU chaos is injected using a helper pod running the Linux stress tool (a workload generator). 
- The chaos affects the application for a period defined by the `TOTAL_CHAOS_DURATION` environment variable.


![Node CPU Hog](./static/images/node-stress.png)


## Use cases
- This fault helps verify the resilience of applications whose replicas get evicted on the account of the nodes turning unschedulable (in **NotReady** state) or new replicas unable to be scheduled due to a lack of CPU resources.
- It causes CPU stress on the target node(s). 
- It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. 
- It also helps verify metrics-based horizontal pod autoscaling as well as vertical autoscale, i.e., demand based CPU addition. 
- It helps scalability of nodes based on growth beyond budgeted pods. 
- It verifies the autopilot functionality of (cloud) managed clusters. 
- It also verifies multi-tenant load issues (when the load increases on one container, it does not cause downtime in other containers). 

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
| Variables            | Description                                                                                       | Notes                                                                                                                                                                                                                       |
|----------------------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TOTAL_CHAOS_DURATION | Duration that you specify, through which chaos is injected into the target resource (in seconds). | Defaults to 60s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">here.</a>                                               |
| LIB_IMAGE            | Image used to inject stress.                                                                      | Defaults to <code>litmuschaos/go-runner:latest</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">here.</a>  |
| RAMP_TIME            | Period to wait before and after injecting chaos (in seconds).                                     | For example, 30s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">here.</a>                                                          |
| NODE_CPU_CORE        | Number of cores of the CPU to be consumed.                                                        | Defaults to <code>2</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/node-cpu-hog#node-cpu-cores">here.</a>                                             |
| NODES_AFFECTED_PERC  | Percentage of total nodes to target, that takes numeric values only.                              | Defaults to 0 (corresponds to 1 node). More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#node-affected-percentage">here.</a>     |
| SEQUENCE             | Sequence of chaos execution for multiple target pods.                                             | Defaults to parallel. Supports serial sequence as well. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> here.</a> |


### Node CPU cores
It contains the number of cores of CPU that will be consumed. Tune it by using the `NODE_CPU_CORE` environment variable.

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

It contains the percentage of CPU that will be consumed. Tune it by using the `CPU_LOAD` environment variable.

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
