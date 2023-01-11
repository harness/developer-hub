---
id: container-kill
title: Container kill
---
Container kill is a Kubernetes pod-level chaos fault that:
- Results in container failure on specific (or random) application resource replicas.
- Tests an application's deployment sanity (replica availability and uninterrupted service) and recovery workflow.
- Tests the recovery of pods that possess sidecar containers.

:::tip Fault execution flow chart
![Container Kill](./static/images/pod-delete.png)
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
- Kubernetes > 1.16
:::

## Default validation
:::note
The application pods should be running before and after injecting chaos.
:::

## Implementation

**NOTE:** It is assumed that you already have the boutique app set up in a namespace. If not, follow [this](provide link) to set up your boutique application.

To execute disk fill fault, [setup experiment](provide) and infrastructure.

After successful setup of chaos infrastructure:
* Choose the **disk-fill** fault from the list of Kubernetes faults available;
* Specify parameters for the **Target application**, **Tune fault**, and **Probes**;
    <details>
        <summary>Check the Fault Tunables</summary>
        <h2>Optional Fields</h2>
        <table>
          <tr>
            <th> Variables </th>
            <th> Description  </th>
            <th> Notes </th>
          </tr>
          <tr>
            <td> TARGET_CONTAINER </td>
            <td> The name of container to be killed inside the pod </td>
            <td> If the TARGET_CONTAINER is not provided it will delete the first container </td>
          </tr>
          <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval b/w two successive container kill (in sec) </td>
            <td> If the CHAOS_INTERVAL is not provided it will take the default value of 10s </td>
          </tr>
          <tr>
            <td> TOTAL_CHAOS_DURATION </td>
            <td> The time duration for chaos injection (seconds) </td>
            <td> Defaults to 20s </td>
          </tr>
          <tr>
            <td> PODS_AFFECTED_PERC </td>
            <td> The Percentage of total pods to target </td>
            <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
          </tr> 
          <tr>
            <td> TARGET_PODS </td>
            <td> Comma separated list of application pod name subjected to container kill chaos</td>
            <td> If not provided, it will select target pods randomly based on provided appLabels</td>
          </tr>
          <tr>
            <td> LIB_IMAGE </td>
            <td> LIB Image used to kill the container </td>
            <td> Defaults to <code>litmuschaos/go-runner:latest</code></td>
          </tr>
          <tr>
            <td> LIB </td>
            <td> The category of lib use to inject chaos </td>
            <td> Default value: litmus, supported values: pumba and litmus </td>
          </tr>
          <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before injection of chaos in sec </td>
            <td> Eg. 30 </td>
          </tr>
          <tr>
            <td> SEQUENCE </td>
            <td> It defines sequence of chaos execution for multiple target pods </td>
            <td> Default value: parallel. Supported: serial, parallel </td>
          </tr>
          <tr>
            <td> SIGNAL </td>
            <td> It contains termination signal used for container kill </td>
            <td> Default value: SIGKILL </td>
          </tr>
          <tr>
            <td> SOCKET_PATH </td>
            <td> Path of the containerd/crio/docker socket file </td>
            <td> Defaults to `/var/run/docker.sock` </td>
          </tr>
          <tr>
            <td> CONTAINER_RUNTIME </td>
            <td> container runtime interface for the cluster</td>
            <td>  Defaults to docker, supported values: docker, containerd and crio for litmus and only docker for pumba LIB </td>
          </tr>
        </table>
    </details>

## Fault examples

### Common and pod specific tunables
Refer the [common attributes](../../common-tunables-for-all-faults) and [Pod specific tunable](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Kill specific container

It defines the name of the targeted container subjected to chaos. It can be tuned via `TARGET_CONTAINER` ENV. If `TARGET_CONTAINER` is provided as empty then it will use the first container of the targeted pod.

[embedmd]:# (./static/manifests/container-kill/kill-specific-container.yaml yaml)
```yaml
# kill the specific target container
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
  - name: container-kill
    spec:
      components:
        env:
        # name of the target container
        - name: TARGET_CONTAINER
          value: 'nginx'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Container runtime socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path:

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `docker`.
- `SOCKET_PATH`: It contains path of docker socket file by default(`/var/run/docker.sock`). For other runtimes provide the appropriate path.

[embedmd]:# (./static/manifests/container-kill/container-runtime-and-socket-path.yaml yaml)
```yaml
## provide the container runtime and socket file path
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
  - name: container-kill
    spec:
      components:
        env:
        # runtime for the container
        # supports docker, containerd, crio
        - name: CONTAINER_RUNTIME
          value: 'docker'
        # path of the socket file
        - name: SOCKET_PATH
          value: '/var/run/docker.sock'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Signal for kill

It defines the Linux signal passed while killing the container. It can be tuned via `SIGNAL` ENV. It defaults to the `SIGTERM`.
 
[embedmd]:# (./static/manifests/container-kill/signal.yaml yaml)
```yaml
# specific linux signal passed while kiiling container
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
  - name: container-kill
    spec:
      components:
        env:
        # signal passed while killing container
        # defaults to SIGTERM
        - name: SIGNAL
          value: 'SIGKILL'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Pumba chaos library

It specifies the Pumba chaos library for the chaos injection. It can be tuned via `LIB` ENV. The defaults chaos library is `litmus`.

[embedmd]:# (./static/manifests/container-kill/pumba.yaml yaml)
```yaml
# pumba chaoslib used to kill the container
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
  - name: container-kill
    spec:
      components:
        env:
        # name of the lib
        # supoorts pumba and litmus
        - name: LIB
          value: 'pumba'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
