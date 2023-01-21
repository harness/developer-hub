---
id: pod-autoscaler
title: Pod autoscaler
---

Pod autoscaler is a Kubernetes pod-level chaos fault that:

- Determines whether nodes can accomodate multiple replicas of a given application pod.
- Examines the node auto-scaling feature by determining whether the pods were successfully rescheduled within a specified time frame if the existing nodes are running at the specified limits.

![Pod Autoscaler](./static/images/pod-autoscaler.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16

## Default validation

The application pods should be running before and after injecting chaos.

## Implementation

**NOTE:** It is assumed that you already have the boutique application set up in a namespace. If not, follow this to set up your boutique application.

To execute pod autoscaler fault, setup experiment and infrastructure.

After successful setup of chaos infrastructure:

- Choose the **pod-autoscaler**fault from the list of Kubernetes faults available;
- Specify parameters for the **Target application**, **Tune fault**, and **Probes**;
    <details>
        <summary> Fault Tunables</summary>
        <h2>Optional Fields</h2>
        <table>
          <tr>
            <th> Variables </th>
            <th> Description </th>
            <th> Notes </th>
          </tr>
          <tr>
            <td> REPLICA_COUNT </td>
            <td> Number of replicas to which you wish to scale. </td>
            <td> <code>NIL</code> </td>
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
            <td> Timeout for the chaos fault (in seconds). </td>
            <td> Defaults to 60s </td>
          </tr>
          <tr>
            <td> LIB </td>
            <td> The chaos library used to inject chaos. </td>
            <td> Defaults to <code>litmus</code> </td>
          </tr>
          <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. </td>
          </tr>
        </table>
    </details>

- Close this pane by clicking on **X** at the top.
- Set fault weights by clicking on **Set fault weights** tab present on top.
- Click **Run** to execute the experiment.

## Chaos fault validation

To validate the experiment you ran, execute the below commands on your terminal.

- Fetch all the pods in the boutique namespace (or the namespace where your application is housed).

```
kubectl get pods -n <namespace>
```

- Keep a watch on the pod that you wish to replicate. This is the same pod that you specified in the 'Target application -> App Label'.

```
watch kubectl get pods -n <namespace>
```

When the chaos starts, the number of replicas of the specific pod increases (since there is only 1 pod to begin with) to the number you specified in the tunables. Once the chaos execution is complete, the number of pods comes back to its original number.

### Common and pod specific tunables

Refer to the [common attributes](../../common-tunables-for-all-faults) and [Pod specific tunable](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

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
