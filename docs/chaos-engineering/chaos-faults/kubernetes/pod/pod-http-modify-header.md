---
id: pod-http-modify-header
title: Pod HTTP modify header
---

Pod HTTP modify header is a Kubernetes pod-level chaos fault that injects chaos on the service whose port is provided using the `TARGET_SERVICE_PORT` environment variable.
- This is done by starting the proxy server and redirecting the traffic through the proxy server.
- It can cause modification of headers of requests and responses of the service. This can be used to test service resilience towards incorrect or incomplete headers.

![Pod HTTP Modify Header](./static/images/pod-http.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
This can be used to test service resilience towards incorrect or incomplete headers.
</div>
</details>

## Prerequisites

- Kubernetes> 1.16.


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
        <td> HEADERS_MAP </td>
        <td> Map of headers to modify/add </td>
        <td> For example, &#123;"X-Litmus-Test-Header": "X-Litmus-Test-Value"&#125;. To remove a header, just set the value to ""; For example, &#123;"X-Litmus-Test-Header": ""&#125; </td>
      </tr>
      <tr>
        <td> HEADER_MODE </td>
        <td> Whether to modify response headers or request headers. Accepted values: request, response</td>
        <td> Defaults to response </td>
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
        <td> Comma separated list of application pod name subjected to pod http modify header chaos</td>
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

[embedmd]: # "./static/manifests/pod-http-modify-header/target-service-port.yaml yaml"

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
    - name: pod-http-chaos
      spec:
        components:
          env:
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # map of headers to modify/add
            - name: HEADERS_MAP
              value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
```

### Proxy port

It defines the port on which the proxy server will listen for requests. It can be tuned via `PROXY_PORT`

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-modify-header/proxy-port.yaml yaml"

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
    - name: pod-http-chaos
      spec:
        components:
          env:
            # provide the port for proxy server
            - name: PROXY_PORT
              value: "8080"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # map of headers to modify/add
            - name: HEADERS_MAP
              value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
```

### Headers map

It is the map of headers that are to be modified or added to the Http request/response. It can be tuned via `HEADERS_MAP` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-modify-header/headers-map.yaml yaml"

```yaml
## provide the headers as a map
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
    - name: pod-http-chaos
      spec:
        components:
          env:
            # map of headers to modify/add; Eg: {"X-Litmus-Test-Header": "X-Litmus-Test-Value"}
            # to remove a header, just set the value to ""; Eg: {"X-Litmus-Test-Header": ""}
            - name: HEADERS_MAP
              value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Header mode

It defined whether the request or the response header has to be modified. It can be tuned via `HEADER_MODE` ENV.

Use the following example to tune this:
[embedmd]:# (./static/manifests/pod-http-modify-header/header-mode.yaml yaml)

```yaml
## provide the mode of the header modification; request/response
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
    - name: pod-http-chaos
      spec:
        components:
          env:
            # whether to modify response headers or request headers. Accepted values: request, response
            - name: HEADER_MODE
              value: "response"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # map of headers to modify/add
            - name: HEADERS_MAP
              value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
```

### Toxicity

It defines the toxicity value to be added to the http request. It can be tuned via `TOXICITY` environment variable.
Toxicity value defines the percentage of the total number of http requests to be affected.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-modify-header/toxicity.yaml yaml"

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
    - name: pod-http-modify-header
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

It defines the network interface to be used for the proxy. It can be tuned via `NETWORK_INTERFACE` environment variable.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-modify-header/network-interface.yaml yaml"

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
    - name: pod-http-chaos
      spec:
        components:
          env:
            # provide the network interface for proxy
            - name: NETWORK_INTERFACE
              value: "eth0"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # map of headers to modify/add
            - name: HEADERS_MAP
              value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` environment variables to set the container runtime and socket file path, respectively.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `docker`.
- `SOCKET_PATH`: It contains path of docker socket file by default(`/var/run/docker.sock`). For `containerd`, specify path as `/var/containerd/containerd.sock`. For `crio`, speecify path as `/var/run/crio/crio.sock`.

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-http-modify-header/container-runtime-and-socket-path.yaml yaml"

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
    - name: pod-http-chaos
      spec:
        components:
          env:
            # runtime for the container
            # supports docker, containerd, crio
            - name: CONTAINER_RUNTIME
              value: "docker"
            # path of the socket file
            - name: SOCKET_PATH
              value: "/var/run/docker.sock"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # map of headers to modify/add
            - name: HEADERS_MAP
              value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
```