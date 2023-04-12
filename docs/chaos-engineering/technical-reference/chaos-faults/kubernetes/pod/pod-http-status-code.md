---
id: pod-http-status-code
title: Pod HTTP status code
---

Pod HTTP status code is a Kubernetes pod-level fault injects chaos inside the pod by modifying the status code of the response from the application server to the desired status code provided by the user.
- The port for the service is specified using the `TARGET_SERVICE_PORT` environment variable by starting the proxy server and redirecting the traffic through the proxy server.
- It tests the application's resilience to error code HTTP responses from the provided application server.

tip Fault execution flow chart
![Pod HTTP Status Code](./static/images/pod-http-status-code.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
It tests the application's resilience to error code HTTP responses from the provided application server. It simulates unavailability of specific API services (503, 404), unavailability of specific APIs for(or from) a given microservice (TBD or Path Filter) (404), unauthorized requests for 3rd party services (401 or 403), and API malfunction (internal server error) (50x). 
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
        <th> s </th>
      </tr>
      <tr>
        <td> TARGET_SERVICE_PORT </td>
        <td> Port of the service to target</td>
        <td>This should be the port on which the application container runs at the pod level, not at the service level. Defaults to port 80 </td>
      </tr>
      <tr>
        <td> STATUS_CODE </td>
        <td> Modified status code for the HTTP response</td>
        <td> If no value is provided, then a random value is selected from the list of supported values.
        Multiple values can be provided as comma separated, a random value from the provided list will be selected
        Supported values: [200, 201, 202, 204, 300, 301, 302, 304, 307, 400, 401, 403, 404, 500, 501, 502, 503, 504].
        Defaults to random status code </td>
      </tr>
      <tr>
        <td> MODIFY_RESPONSE_BODY </td>
        <td> Whether to modify the body as per the status code provided.</td>
        <td> If true, then the body is replaced by a default template for the status code. Defaults to true </td>
      </tr>
    </table>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> s </th>
      </tr>
      <tr>
        <td> RESPONSE_BODY </td>
        <td> Body string to overwrite the http response body</td>
        <td> This will be used only if MODIFY_RESPONSE_BODY is set to true. If no value is provided, response will be an empty body. Defaults to empty body </td>
      </tr>
      <tr>
        <td> CONTENT_ENCODING </td>
        <td> Encoding type to compress/encodde the response body </td>
        <td> Accepted values are: gzip, deflate, br, identity. Defaults to none (no encoding) </td>
      </tr>
      <tr>
        <td> CONTENT_TYPE </td>
        <td> Content type of the response body </td>
        <td> Defaults to text/plain </td>
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
        <td> Comma separated list of application pod name subjected to pod http status code chaos</td>
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
This should be the port where the application runs at the pod level, not at the service level. This means if the application pod is running the service at port 8080 and we create a service exposing that at port 80, then the target service port should be 8080 and not 80, which is the port at pod-level.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/target-service-port.yaml yaml"

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
    - name: pod-http-status-code
      spec:
        components:
          env:
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
```

### Proxy port

It defines the port on which the proxy server will listen for requests. It can be tuned via `PROXY_PORT` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/proxy-port.yaml yaml"

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
    - name: pod-http-status-code
      spec:
        components:
          env:
            # provide the port for proxy server
            - name: PROXY_PORT
              value: "8080"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
```

### Status code

It defines the status code value for the http response. It can be tuned via `STATUS_CODE` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/status-code.yaml yaml"

```yaml
## modified status code for the http response
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
    - name: pod-http-status-code
      spec:
        components:
          env:
            # modified status code for the http response
            # if no value is provided, a random status code from the supported code list will selected
            # if multiple comma separated values are provided, then a random value from the provided list will be selected
            # if an invalid status code is provided, the fault will fail
            # supported status code list: [200, 201, 202, 204, 300, 301, 302, 304, 307, 400, 401, 403, 404, 500, 501, 502, 503, 504]
            - name: STATUS_CODE
              value: "500"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Modify response body

It defines whether to modify the respone body with a pre-defined template to match with the status code value of the http response. It can be tuned via `MODIFY_RESPONSE_BODY` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/modify-body-with-response-pre-defined.yaml yaml"

```yaml
##  whether to modify the body as per the status code provided
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
    - name: pod-http-status-code
      spec:
        components:
          env:
            #  whether to modify the body as per the status code provided
            - name: "MODIFY_RESPONSE_BODY"
              value: "true"
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Toxicity

It defines the toxicity value to be added to the http request. It can be tuned via `TOXICITY` ENV.
Toxicity value defines the percentage of the total number of http requests to be affected.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/toxicity.yaml yaml"

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
    - name: pod-http-status-code
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

### Response body

It defines the body string that will overwrite the http response body. It can be tuned via `RESPONSE_BODY` and `MODIFY_RESPONSE_BODY` ENV.
The `MODIFY_RESPONSE_BODY` ENV should be set to `true` to enable this feature.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/modify-body-with-response.yaml yaml"

```yaml
## provide the response body value
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
    - name: pod-http-status-code
      spec:
        components:
          env:
            # provide the body string to overwrite the response body. This will be used only if MODIFY_RESPONSE_BODY is set to true
            - name: RESPONSE_BODY
              value: "<h1>Hello World</h1>"
            #  whether to modify the body as per the status code provided
            - name: "MODIFY_RESPONSE_BODY"
              value: "true"
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Content encoding and content type

It defines the content encoding and content type of the response body. It can be tuned via `CONTENT_ENCODING` and `CONTENT_TYPE` ENV.

Use the following example to tune this:
[embedmd]:# (./static/manifests/pod-http-status-code/modify-body-with-encoding-type.yaml yaml)

```yaml
##  whether to modify the body as per the status code provided
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
    - name: pod-http-status-code
      spec:
        components:
          env:
            # provide the encoding type for the response body
            # currently supported value are gzip, deflate
            # if empty no encoding will be applied
            - name: CONTENT_ENCODING
              value: "gzip"
            # provide the content type for the response body
            - name: CONTENT_TYPE
              value: "text/html"
            #  whether to modify the body as per the status code provided
            - name: "MODIFY_RESPONSE_BODY"
              value: "true"
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Network interface

It defines the network interface to be used for the proxy. It can be tuned via `NETWORK_INTERFACE` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/network-interface.yaml yaml"

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
    - name: pod-http-status-code
      spec:
        components:
          env:
            # provide the network interface for proxy
            - name: NETWORK_INTERFACE
              value: "eth0"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `containerd`.
- `SOCKET_PATH`: It contains path of containerd socket file by default(`/run/containerd/containerd.sock`). For `docker`, specify path as `/var/run/docker.sock`. For `crio`, specify path as `/var/run/crio/crio.sock`.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-http-status-code/container-runtime-and-socket-path.yaml yaml"

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
    - name: pod-http-status-code
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
            # modified status code for the http response
            - name: STATUS_CODE
              value: "500"
```
