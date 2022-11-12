---
id: kubelet-service-kill
title: Kubelet Service Kill
---

## Introduction
- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to kubelet service kill.
- The kubelet service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be reaccessable.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to kubelet service down.

:::tip Fault execution flow chart 
![Kubelet Service Kill](./static/images/svc-kill.png)
:::

## Uses
<details>
<summary>View the uses of the experiment</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites
:::info
- Ensure that Kubernetes Version > 1.16.
- Ensure that the node specified in the experiment ENV variable <code>TARGET_NODE</code> (the node for which docker service need to be killed) should be cordoned before execution of the chaos experiment (before applying the chaosengine manifest) to ensure that the litmus experiment runner pods are not scheduled on it / subjected to eviction. This can be achieved with the following steps:
  - Get node names against the applications pods: <code>kubectl get pods -o wide</code>
  - Cordon the node <code>kubectl cordon &lt;nodename&gt;</code>
:::

## Default Validations
:::note
The target nodes should be in ready state before and after chaos injection.
:::

## Experiment tunables
<details>
    <summary>Check the Experiment Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_NODE </td>
        <td> Name of the target node</td>
        <td> </td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
        <td> It contains node label, which will be used to filter the target node if TARGET_NODE ENV is not set </td>
        <td>It is mutually exclusive with the TARGET_NODE ENV. If both are provided then it will use the TARGET_NODE</td>
      </tr>
    </table>
    <h2>Optional Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos insertion (seconds)  </td>
        <td> Defaults to 60s </td>
      </tr>
      <tr>
        <td> LIB  </td>
        <td> The chaos lib used to inject the chaos </td>
        <td> Defaults to <code>litmus</code> </td>
      </tr>
      <tr>
        <td> LIB_IMAGE  </td>
        <td> The lib image used to inject kubelet kill chaos the image should have systemd installed in it. </td>
        <td> Defaults to <code>ubuntu:16.04</code> </td>
      </tr>  
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before injection of chaos in sec </td>
        <td> </td>
      </tr>
    </table>
</details>

## Experiment Examples

### Common and Node specific tunables
Refer the [common attributes](../../common-tunables-for-all-experiments) and [Node specific tunable](./common-tunables-for-node-experiments) to tune the common tunables for all experiments and node specific tunables.

### Kill Kubelet Service

It contains name of target node subjected to the chaos. It can be tuned via `TARGET_NODE` ENV.

Use the following example to tune this:

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
  chaosServiceAccount: kubelet-service-kill-sa
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
