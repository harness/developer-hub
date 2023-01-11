---
id: pod-autoscaler
title: Pod autoscaler
---
Pod autoscaler is a Kubernetes pod-level chaos fault that:
- Checks the ability of nodes to accommodate multiple replicas a given application pod.
- Can be used to check node auto-scaling feature, that is, determine if the pods have been successfully rescheduled within a specified period in case the existing nodes are running at the specified limits.

:::tip Fault execution flow chart
![Pod Autoscaler](./static/images/pod-autoscaler.png)
:::

## Usage
<details>
<summary>View fault usage</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites
:::info
- Kubernetes > 1.16.
:::

## Default validation
:::note
The application pods should be running before and after injecting chaos.
:::

## Implementation

**NOTE:** It is assumed that you already have the boutique app set up in a namespace. If not, follow [this](provide link) to set up your boutique application.

* To execute autoscaler fault, [setup experiment](provide) and infrastructure.

* Choose the fault you wish to implement from the list of Kubernetes faults available on the right pane. 

![Select Kubernetes](./static/images/select-disk-fill.png)

* This leads you to a page where you can specify parameters for the **Target application**, **Tune fault**, and **Probes**. More information on these parameters [here](provide link).

* After completing the setup, close this pane by clicking on **X** at the top.

![Probe setup done](./static/images/mem-hog-probe-setup-done.png)

* The next step is [setting the fault weights](provide link).

* After setting the fault weights, **Run** the experiment.

![Run experiment](./static/images/disk-fill-run-exp.png)

* [Here](provide link) are the steps to set up Grafana dashboard to visualize the results before and after injecting chaos into the application. 

## Fault tunables
<details>
    <summary>Check the Fault Tunables</summary>
    <h2>Optional Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> REPLICA_COUNT </td>
        <td> Number of replicas upto which we want to scale </td>
        <td> <code>nil</code> </td>
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
        <td> The timeout for the chaos fault (in seconds) </td>
        <td> Defaults to 60 </td>
      </tr>
      <tr>
        <td> LIB </td>
        <td> The chaos lib used to inject the chaos </td>
        <td> Defaults to <code>litmus</code> </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> Eg. 30 </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and pod specific tunables
Refer the [common attributes](../../common-tunables-for-all-faults) and [Pod specific tunable](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Replica counts

It defines the number of replicas, which should be present in the targeted application during the chaos. It can be tuned via `REPLICA_COUNT` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-autoscaler/replica-count.yaml yaml)
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
          value: '3'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
