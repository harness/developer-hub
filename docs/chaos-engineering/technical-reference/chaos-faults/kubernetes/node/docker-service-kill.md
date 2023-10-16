---
id: docker-service-kill
title: Docker service kill
---
## Introduction
Docker service kill makes the application unreachable on the account of the node turning unschedulable (in **NotReady** status).
- Docker service is stopped (or killed) on a node to make it unschedulable for a specific duration.
- The application node goes back to normal state and services are resumed after a specific duration. 

![Docker Service Kill](./static/images/docker-service-kill.png)

## Use cases
Docker service kill fault determines the resilience of an application when a node becomes unschedulable, that is, NotReady state.

:::info note
- Kubernetes > 1.16 is required to execute this fault.
- Node specified in the <code>TARGET_NODE</code> environment variable (the node for which Docker service would be killed) should be cordoned before executing the chaos fault. This ensures that the fault resources are not scheduled on it or subject to eviction. This is achieved using the following steps:
  - Get node names against the applications pods using command <code>kubectl get pods -o wide</code>.
  - Cordon the node using command <code>kubectl cordon &lt;nodename&gt;</code>.
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
        <td> TARGET_NODE </td>
        <td> Name of the target node. </td>
        <td> For example, <code>node-1</code>. For For more information, go to <a href = "/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/common-tunables-for-node-faults/#target-single-node">target node.</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
        <td> Node label used to filter the target node if <code>TARGET_NODE</code> environment variable is not set. </td>
        <td> It is mutually exclusive with the <code>TARGET_NODE</code> environment variable. If both are provided, the fault uses <code>TARGET_NODE</code>. For more information, go to <a href="/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/common-tunables-for-node-faults/#target-nodes-with-labels">node label.</a></td>
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
        <td> Default: 60 s. For more information, go to <a href = "/docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults/#duration-of-the-chaos">duration of the chaos.</a></td>
      </tr>
      <tr>
        <td> SERVICE_NAME </td>
        <td> Provide the name of service you want to stop. Supported <code>docker</code> and <code>containerd</code> </td>
        <td> Default: <code>containerd</code>. For more information, go to <a href="#kill-target-service">service name</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href = "/docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults/#ramp-time">ramp time.</a></td>
      </tr>
    </table>

### Target Node

Name of the target node. Tune it by using the `TARGET_NODE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/docker-service-kill/docker-service-kill.yaml yaml)
```yaml
# kill the docker service of the target node
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: docker-service-kill
    spec:
      components:
        env:
        # name of the target node
        - name: TARGET_NODE
          value: 'node01'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Kill target service

Name of the target service. Tune it by using the `SERVICE_NAME` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/docker-service-kill/target-service.yaml yaml)

```yaml
# kill the target service of the target node
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: docker-service-kill
    spec:
      components:
        env:
        # name of the target node
        # supported 'containerd' and 'docker'
        - name: SERVICE_NAME
          value: 'containerd'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
