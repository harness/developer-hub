---
id: pod-delete
title: Pod delete
---

Pod delete is a Kubernetes pod-level chaos fault that causes specific (or random) replicas of an application resource to fail forcibly (or gracefully).
- It tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.


![Pod Delete](./static/images/pod-delete.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
In distributed systems like Kubernetes, your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to failures.
It is important to ensure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases, and how the horizontal pod autoscaler scales based on the observed resource utilization. It is also important to understand how much time it takes for persistent volume to after rescheduling. 
It simulates graceful delete (or reschedule) of pods as a result of upgrades, forced delete of pods as a result of eviction, and leader-election in complex applications.
It verifies disk (or volume) re-attachment times in stateful applications, application start-up times, readiness probe configuration (health endpoints and delays), topology constraints are adhered to (node selectors, tolerations, zone distribution, affinity(or anti-affinity) policies), proxy registration times in service-mesh environments, post (lifecycle)-hooks and terminationSeconds configuration for the microservices (under active load) - i.e. graceful termination handling, resource budgeting on cluster nodes (whether request(or limit) settings honored on available nodes for successful schedule).

</div>
</details>

## Prerequisites

- Kubernetes> 1.16.


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
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos insertion (in sec) </td>
        <td> Defaults to 15s, <b>:</b> Overall run duration of the fault may exceed the <code>TOTAL_CHAOS_DURATION</code> by a few min </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval b/w two successive pod failures (in sec) </td>
        <td> Defaults to 5s </td>
      </tr>
      <tr>
        <td> RANDOMNESS </td>
        <td> Introduces randomness to pod deletions with a minimum period defined by <code>CHAOS_INTERVAL</code> </td>
        <td> It supports true or false. Default value: false </td>
      </tr>
      <tr>
        <td> FORCE </td>
        <td> Application Pod deletion mode. <code>false</code> indicates graceful deletion with default termination period of 30s. <code>true</code> indicates an immediate forceful deletion with 0s grace period</td>
        <td> Default to <code>true</code>, With <code>terminationGracePeriodSeconds=0</code> </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod delete chaos</td>
        <td> If not provided, it will select target pods randomly based on provided appLabels</td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> For example, 30 </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple target pods </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and pod-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod-specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables. 

### Force delete

The targeted pod can be deleted `forcefully` or `gracefully`. It can be tuned with the `FORCE` env. It will delete the pod forcefully if `FORCE` is provided as `true` and it will delete the pod gracefully if `FORCE` is provided as `false`.

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-delete/force.yaml yaml"

```yaml
# tune the deletion of target pods forcefully or gracefully
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
    - name: pod-delete
      spec:
        components:
          env:
            # provided as true for the force deletion of pod
            # supports true and false value
            - name: FORCE
              value: "true"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Random interval

The randomness in the chaos interval can be enabled via setting `RANDOMNESS` ENV to `true`. It supports boolean values. The default value is `false`.
The chaos interval can be tuned via `CHAOS_INTERVAL` ENV.

- If `CHAOS_INTERVAL` is set in the form of `l-r` i.e, `5-10` then it will select a random interval between l & r.
- If `CHAOS_INTERVAL` is set in the form of `value` i.e, `10` then it will select a random interval between 0 & value.

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-delete/randomness-interval.yaml yaml"

```yaml
# contains random chaos interval with lower and upper bound of range i.e [l,r]
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
    - name: pod-delete
      spec:
        components:
          env:
            # randomness enables iterations at random time interval
            # it supports true and false value
            - name: RANDOMNESS
              value: "true"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
            # it will select a random interval within this range
            # if only one value is provided then it will select a random interval within 0-CHAOS_INTERVAL range
            - name: CHAOS_INTERVAL
              value: "5-10"
```
