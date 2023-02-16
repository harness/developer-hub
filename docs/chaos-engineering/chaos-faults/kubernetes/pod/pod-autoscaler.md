---
id: pod-autoscaler
title: Pod autoscaler
---

Pod autoscaler is a Kubernetes pod-level chaos fault that determines whether nodes can accomodate multiple replicas of a given application pod.
- It examines the node auto-scaling feature by determining whether the pods were successfully rescheduled within a specified time frame if the existing nodes are running at the specified limits.

![Pod Autoscaler](./static/images/pod-autoscaler.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault determines how an application accomodates multiple replicas of a given application pod at unexpected point in time.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.


## Default validations

The application pods should be in running state before and after chaos injection.


## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> REPLICA_COUNT </td>
        <td> Number of replicas to which you wish to scale. </td>
        <td> <code>nil</code> </td>
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
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and pod-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod-specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Replica counts

It defines the number of replicas that are required to be present in the target application during chaos. You can tune it using the `REPLICA_COUNT` environment variable.

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-autoscaler/replica-count.yaml yaml"

```yaml
# provide the number of replicas
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-autoscaler
      spec:
        components:
          env:
            # number of replica, needs to scale
            - name: REPLICA_COUNT
              value: "3"
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```