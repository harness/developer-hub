---
id: pod-delete
title: Pod delete
---

Pod delete is a Kubernetes pod-level chaos fault that causes specific (or random) replicas of an application resource to fail forcibly (or gracefully).
- It simulates:
  - Graceful delete, or rescheduling, of pods as a result of upgrades; 
  - Forced deletion of pods as a result of eviction 
  - Leader-election in complex applications
- In distributed systems like Kubernetes, your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when certain replicas are unavailable.
- To ensure smooth usage, applications must have a minimum number of available replicas.
- When the pressure on other replicas increases, the horizontal pod autoscaler scales based on the observed resource utilization.

![Pod Delete](./static/images/pod-delete.png)

## Use cases

- Pod delete can be used to check the application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.
- It can be used to verify:
  - Disk (or volume) re-attachment times in stateful applications
  - Application start-up times, and readiness probe configuration (health endpoints and delays)
  - Adherence to topology constraints (node selectors, tolerations, zone distribution, and affinity (or anti-affinity) policies)
  - Proxy registration times in service-mesh environments
  - Post (lifecycle) hooks and termination seconds configuration for the microservices (under active load)- i.e. graceful termination handling
  - Resource budgeting on cluster nodes (whether request or limit settings are honored on available nodes for successful schedule)


**Note**
- Kubernetes > 1.16 is required to execute this fault.
- Ensure that application pods are in running state before and after chaos injection.


## Fault tunables
<h3>Optional fields</h3>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Defaults to 15s. Overall run duration of the fault may exceed the <code>TOTAL_CHAOS_DURATION</code> by a few minutes. For more information, refer to <a href = "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">total chaos duration.</a></td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive pod failures (in seconds). </td>
        <td> Defaults to 5s. For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval">chaos interval.</a></td>
      </tr>
      <tr>
        <td> RANDOMNESS </td>
        <td> Introduces randomness into pod deletions with a minimum period defined by <code>CHAOS_INTERVAL</code> </td>
        <td> Defaults to false. Supports true as well. For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete#random-interval">random interval.</a> </td>
      </tr>
      <tr>
        <td> FORCE </td>
        <td> Application Pod deletion mode. <code>false</code> indicates graceful deletion with the default termination period of 30s. <code>true</code> indicates an immediate forceful deletion with 0s grace period</td>
        <td> Defaults to <code>true</code>, with <code>terminationGracePeriodSeconds=0</code>. For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete#force-delete">force delete.</a> </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma-separated list of application pod names subject to chaos. </td>
        <td> If it is not provided, it selects target pods based on provided appLabels. For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#target-specific-pods">target specific pods.</a> </td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> Percentage of total pods to target (takes numeric values only). </td>
        <td> Defaults to 0 (corresponds to 1 replica). For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#pod-affected-percentage">pod affected percentage.</a> </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time.</a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods. </td>
        <td> Defaults to parallel. Supports serial as well. For more information, refer to <a href= "https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution">sequence of chaos execution.</a></td>
      </tr>
    </table>


### Force delete

The target pod can be deleted `forcefully` or `gracefully`. Tune it by using the `FORCE` environment variable. It will delete the pod forcefully if `FORCE` is set to `true` and gracefully if `FORCE` is set to `false`.

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

The randomness in the chaos interval can be enabled by setting `RANDOMNESS` environment variable to `true`. It supports boolean values. The default value is `false`.
Tune it by using the `CHAOS_INTERVAL` environment variable.

- If `CHAOS_INTERVAL` is set in the form of `l-r` i.e, `5-10` then it will select a random interval between l and r.
- If `CHAOS_INTERVAL` is set in the form of `value` i.e, `10` then it will select a random interval between 0 and value.

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
