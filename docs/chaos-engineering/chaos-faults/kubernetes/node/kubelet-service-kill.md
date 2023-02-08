---
id: kubelet-service-kill
title: Kubelet service kill
---

Kubelet service kill makes the application unreachable on the account of the node turning unschedulable (in **NotReady** state).
- Kubelet service is stopped (or killed) on a node to make it unschedulable for a specific duration defined by the `TOTAL_CHAOS_DURATION` environment variable. 
- The application node goes back to normal state and services are resumed after the chaos duration. 


![Kubelet Service Kill](./static/images/svc-kill.png)

## Use cases
You can use this fault to determine the resilience of an application when a node becomes unschedulable, i.e. when the node is in **NotReady** state.

**Note**
- Kubernetes > 1.16 is required to execute this fault.
- Node specified in the <code>TARGET_NODE</code> environment variable (the node for which Docker service would be killed) should be cordoned before executing the chaos fault. This ensures that the fault resources are not scheduled on it (or subject to eviction). This is achieved by the following steps:
  - Get node names against the applications pods using command <code>kubectl get pods -o wide</code>.
  - Cordon the node using command <code>kubectl cordon &lt;nodename&gt;</code>.
- Ensure that the target nodes are in a ready state before and after injecting chaos.


## Fault tunables
   <h3>Mandatory fields</h3>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_NODE </td>
        <td> Name of the target node. </td>
        <td> For example, <code>node-1</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-single-node">here.</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
        <td> Node label used to filter the target node if TARGET_NODE ENV is not set </td>
        <td> It is mutually exclusive with the TARGET_NODE ENV. If both are provided then it will use the <code>TARGET_NODE</code>. More information <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">here.</a></td>
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
        <td> Defaults to 60s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">here.</a></td>
      </tr>
      <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to inject chaos. </td>
        <td> Defaults to <code>ubuntu:16.04</code>. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">here.</a></td>
      </tr>  
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. More information <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">here.</a></td>
      </tr>
    </table>

### Kill kubelet service

It contains the name of the target node subject to the chaos. Tune it by using the `TARGET_NODE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/kubelet-service-kill/kubelet-service-kill.yaml yaml)
```yaml
# kill the kubelet service of the target node
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: kubelet-service-kill
    spec:
      components:
        env:
        # name of the target node
        - name: TARGET_NODE
          value: 'node01'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
