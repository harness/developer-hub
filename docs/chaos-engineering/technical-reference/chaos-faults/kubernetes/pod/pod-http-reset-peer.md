---
id: pod-http-reset-peer
title: Pod HTTP reset peer
---

Pod HTTP reset peer is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is specified using the `TARGET_SERVICE_PORT` environment variable. 
- This stops the outgoing HTTP requests by resetting the TCP connection by starting the proxy server and redirecting the traffic through the proxy server.
- It can test the application's resilience to lossy/flaky HTTP connection.


![Pod HTTP Reset Peer](./static/images/pod-http-reset-peer.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
It can test the application's resilience to lossy/flaky HTTP connection. It simulates premature connection loss (firewall issues or other issues) between microservices (verify connection timeout), and connection resets due to resource limitations on the server side like out of memory server (or process killed or overload on the server due to a high amount of traffic). 

</div>
</details>

## Prerequisites

- Kubernetes > 1.16.


## Default validations

The application pods should be in running state before and after chaos injection.


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
        <td> TARGET_SERVICE_PORT </td>
        <td> Port of the service to target</td>
        <td>Defaults to port 80 </td>
      </tr>
      <tr>
        <td> RESET_TIMEOUT </td>
        <td> Reset Timeout specifies after how much duration to reset the connection</td>
        <td> Defaults to 0 </td>
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
        <td> Defaults to containerd, supported values: docker, containerd and crio </td>
      </tr>
      <tr>
        <td> SOCKET_PATH </td>
        <td> Path of the containerd/crio/docker socket file </td>
        <td> Defaults to <code>/run/containerd/containerd.sock</code> </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The duration of chaos injection (seconds) </td>
        <td> Default (60s) </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod http reset peer chaos</td>
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

### Target service port

It defines the port of the targeted service that is being targeted. It can be tuned via `TARGET_SERVICE_PORT` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-reset-peer/target-service-port.yaml yaml"

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
    - name: pod-http-reset-peer
      spec:
        components:
          env:
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Proxy port

It defines the port on which the proxy server will listen for requests. It can be tuned via `PROXY_PORT` ENV.
Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-reset-peer/proxy-port.yaml yaml"

```yaml
## provide the port for proxy server
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
    - name: pod-http-reset-peer
      spec:
        components:
          env:
            # provide the port for proxy server
            - name: PROXY_PORT
              value: "8080"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Reset timeout

It defines the reset timeout value to be added to the http request. It can be tuned via `RESET_TIMEOUT` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-reset-peer/reset-timeout.yaml yaml"

```yaml
## provide the reset timeout value
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
    - name: pod-http-reset-peer
      spec:
        components:
          env:
            # reset timeout specifies after how much duration to reset the connection
            - name: RESET_TIMEOUT #in ms
              value: "2000"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Toxicity

It defines the toxicity value to be added to the http request. It can be tuned via `TOXICITY` ENV.
Toxicity value defines the percentage of the total number of http requests to be affected.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-reset-peer/toxicity.yaml yaml"

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
    - name: pod-http-reset-peer
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

### Network interface

It defines the network interface to be used for the proxy. It can be tuned via `NETWORK_INTERFACE` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-reset-peer/network-interface.yaml yaml"

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
    - name: pod-http-reset-peer
      spec:
        components:
          env:
            # provide the network interface for proxy
            - name: NETWORK_INTERFACE
              value: "eth0"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `containerd`.
- `SOCKET_PATH`: It contains path of containerd socket file by default(`/run/containerd/containerd.sock`). For `docker`, specify path as `/var/run/docker.sock`. For `crio`, specify path as `/var/run/crio/crio.sock`.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-reset-peer/container-runtime-and-socket-path.yaml yaml"

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
    - name: pod-http-reset-peer
      spec:
        components:
          env:
            # runtime for the container
            # supports docker, containerd, crio
            - name: CONTAINER_RUNTIME
              value: "containerd"
            # path of the socket file
            - name: SOCKET_PATH
              value: "/run/containerd/containerd.sock"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```