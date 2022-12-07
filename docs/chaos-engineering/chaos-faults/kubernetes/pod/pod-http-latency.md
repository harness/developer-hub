---
id: pod-http-latency
title: Pod HTTP Latency
---

## Introduction
- It injects http response latency on the service whose port is provided as `TARGET_SERVICE_PORT` by starting proxy server and then redirecting the traffic through the proxy server.
- It can test the application's resilience to lossy/flaky http responses.

:::tip Fault execution flow chart
![Pod HTTP Latency](./static/images/pod-http.png)
:::

## Uses
<details>
<summary>View the uses of the fault</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites
:::info
- Ensure that Kubernetes Version > 1.16.
:::

## Default Validations
:::note
The application pods should be in running state before and after chaos injection.
:::

## Fault Tunables
<details>
    <summary>Check the Fault Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
    <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_SERVICE_PORT </td>
        <td> Port of the service to target</td>
        <td>Defaults to port 80 </td>
      </tr>
      <tr>
        <td> LATENCY </td>
        <td> Latency value in ms to be added to requests</td>
        <td> Defaults to 2000 </td>
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
        <td> PROXY_PORT </td>
        <td> Port where the proxy will be listening for requests</td>
        <td> Defaults to 20000 </td>
      </tr>
      <tr>
        <td> NETWORK_INTERFACE </td>
        <td> Network interface to be used for the proxy</td>
        <td> Defaults to `eth0` </td>
      </tr>
      <tr>
        <td> TOXICITY </td>
        <td> Percentage of HTTP requests to be affected </td>
        <td> Defaults to 100 </td>
      </tr>
      <tr>
        <td> CONTAINER_RUNTIME </td>
        <td> container runtime interface for the cluster</td>
        <td> Defaults to docker, supported values: docker, containerd and crio for litmus and only docker for pumba LIB </td>
      </tr>
      <tr>
        <td> SOCKET_PATH </td>
        <td> Path of the containerd/crio/docker socket file </td>
        <td> Defaults to `/var/run/docker.sock` </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The duration of chaos injection (seconds) </td>
        <td> Default (60s) </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod http latency chaos</td>
        <td> If not provided, it will select target pods randomly based on provided appLabels</td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr>
      <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to run the netem command </td>
        <td> Defaults to `litmuschaos/go-runner:latest` </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> Eg. 30 </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple target pods </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
    </table>
</details>

## Fault Examples

### Common and Pod specific tunables
Refer the [common attributes](../../common-tunables-for-all-faults) and [Pod specific tunable](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Target Service Port

It defines the port of the targeted service that is being targeted. It can be tuned via `TARGET_SERVICE_PORT` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-http-latency/target-service-port.yaml yaml)
```yaml
## provide the port of the targeted service
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
  - name: pod-http-latency
    spec:
      components:
        env:
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```
### Proxy Port

It defines the port on which the proxy server will listen for requests. It can be tuned via `PROXY_PORT` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-http-latency/proxy-port.yaml yaml)
```yaml
# provide the port for proxy server
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
  - name: pod-http-latency
    spec:
      components:
        env:
        # provide the port for proxy server
        - name: PROXY_PORT
          value: '8080'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Latency

It defines the latency value to be added to the http request. It can be tuned via `LATENCY` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-http-latency/latency.yaml yaml)
```yaml
## provide the latency value
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
  - name: pod-http-latency
    spec:
      components:
        env:
        # provide the latency value
        - name: LATENCY
          value: '2000'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Toxicity
It defines the toxicity value to be added to the http request. It can be tuned via `TOXICITY` ENV.
Toxicity value defines the percentage of the total number of http requests to be affected.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-http-latency/toxicity.yaml yaml)
```yaml
## provide the toxicity
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
  - name: pod-http-latency
    spec:
      components:
        env:
        # toxicity is the probability of the request to be affected
        # provide the percentage value in the range of 0-100
        # 0 means no request will be affected and 100 means all request will be affected
        - name: TOXICITY
          value: "100"
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Network Interface
It defines the network interface to be used for the proxy. It can be tuned via `NETWORK_INTERFACE` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-http-latency/network-interface.yaml yaml)
```yaml
## provide the network interface for proxy
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
  - name: pod-http-latency
    spec:
      components:
        env:
        # provide the network interface for proxy
        - name: NETWORK_INTERFACE
          value: "eth0"
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: '80'
```

### Container Runtime Socket Path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `docker`.
- `SOCKET_PATH`: It contains path of docker socket file by default(`/var/run/docker.sock`). For other runtimes provide the appropriate path.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-http-latency/container-runtime-and-socket-path.yaml yaml)
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
  - name: pod-http-latency
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
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```
