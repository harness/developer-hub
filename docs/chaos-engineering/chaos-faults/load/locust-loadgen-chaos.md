---
id: locust-loadgen-chaos
title: Locust Loadgen Chaos
---
Locust loadgen chaos fault causes load generation on the given target hosts for a specified chaos duration
- It can result in the slowness or unavailability of the target host due to heavy load.
- This fault checks the performance of the application (or process) running on the instance.

![Locust Loadgen Chaos](./static/images/locust-loadgen-chaos.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
This fault determines the resilience of an application under heavy load. It determines how quickly the target application recovers from such a failure. 
</div>
</details>

## Prerequisites
- Kubernetes > 1.17

- Create a Kubernetes configmap that contains the `config.py` file used as a locustfile to generate load in the `CHAOS_NAMESPACE`. Below is a sample configmap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: load
  namespace: <CHAOS-NAMESPACE>
data:
  config.py: |
    import time
    from locust import HttpUser, task, between
    class QuickstartUser(HttpUser):
        wait_time = between(1, 5)
        @task
        def hello_world(self):
            self.client.get("")
```

- If you change the `config.py` file, ensure that you update the `CONFIG_MAP_FILE` environment variable in the chaos experiment with the new name.

## Default validations
The target host should be accessible

## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
        <tr>
            <th> Variables </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
            <td> HOST </td>
            <td> Name of the target host under chaos</td>
            <td> Provide the name of target host ex: <code>https://google.com</code> </td>
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
            <td> Duration for which chaos is injected into the target resource (in seconds).</td>
            <td> Defaults to 60s </td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval between two successive instance poweroffs (in seconds). </td>
            <td> Defaults to 60s. </td>
        </tr>
        <tr>
            <td> USERS </td>
            <td> Peak number of concurrent Locust users causing load</td>
            <td> Defaults <code>30</code>. </td>
        </tr>
        <tr>
            <td> SPAWN_RATE </td>
            <td> Rate to spawn users at (users per second).</td>
            <td> Defaults <code>30</code>. </td>
        </tr>
        <tr>
            <td> REPLICA </td>
            <td> Number of helper pod replicas generating load</td>
            <td> Defaults to <code>1</code>. </td>
        </tr>
        <tr>
            <td> LOAD_IMAGE </td>
            <td> Image used in helper pod (contains the chaos injection logic)</td>
            <td> Defaults <code>chaosnative/locust-loadgen:latest</code></td>
        </tr>
        <tr>
            <td> LOAD_TYPE </td>
            <td> Used as suffix in load file name</td>
            <td> Defaults to <code>load</code> </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. </td>
        </tr>
    </table>
</details>

## Fault examples

### Common fault tunables

Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Target Host

It contains a value of target host under load chaos. You can tune it using the `HOST` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/locust-loadgen-chaos/host.yaml yaml)
```yaml
# generate load on the target host
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: load-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: locust-loadgen-chaos
    spec:
      components:
        env:
        - name: HOST
          value: 'https://www.google.com'
```

### Number of Users

It contains the number of users/workers involved in load generation. You can tune it using the `USERS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/locust-loadgen-chaos/users.yaml yaml)
```yaml
# provid number of users for loadgen
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: load-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: locust-loadgen-chaos
    spec:
      components:
        env:
        - name: USERS
          value: '100'
        - name: HOST
          value: 'https://www.google.com'
```

### Number of Spawn rate

It contains the rate to spawn users at (users per second). You can tune it using the `LOAD_IMAGE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/locust-loadgen-chaos/spawn-rate.yaml yaml)
```yaml
# provid number of spawn users at (users per second)
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: load-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: locust-loadgen-chaos
    spec:
      components:
        env:
        - name: SPAWN_RATE
          value: '100'
        - name: HOST
          value: 'https://www.google.com'
```

### Custom Load Image

It contains custom image name of load generation. You can tune it using the `SPAWN_RATE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/locust-loadgen-chaos/load-image.yaml yaml)
```yaml
# provid a custom image for load generation
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: load-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: locust-loadgen-chaos
    spec:
      components:
        env:
        - name: LOAD_IMAGE
          value: 'chaosnative/locust-loadgen:latest'
```
