---
id: pod-http-status-code
title: Pod HTTP status code
---
## Introduction

Pod HTTP status code is a Kubernetes pod-level fault that injects chaos inside the pod by modifying the status code of the response from the application server to the desired status code provided by the user. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.

![Pod HTTP Status Code](./static/images/pod-http-status-code.png)

## Use cases
Pod HTTP status code:
- Tests the application's resilience to error code HTTP responses from the provided application server.
- Simulates unavailability of specific API services (503, 404).
- Simulates unavailability of specific APIs for (or from) a given microservice.
- Simulates unauthorized requests for third party services (401 or 403), and API malfunction, that is internal server error (50x). 

:::info note
- Kubernetes > 1.16 is required to execute this fault.
- The application pods should be in the running state before and after injecting chaos.
:::

## Fault tunables

  <h3>Mandatory tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_SERVICE_PORT </td>
        <td> Port of the service to target, which refers to container that runs at pod-level. </td>
        <td> Default: port 80. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#target-service-port">target service port</a> </td>
      </tr>
      <tr>
        <td> STATUS_CODE </td>
        <td> Modified status code for the HTTP response. Multiple values can be provided as a comma-separated list. A random value from the provided list will be selected. Supported values include [200, 201, 202, 204, 300, 301, 302, 304, 307, 400, 401, 403, 404, 500, 501, 502, 503, 504].</td>
        <td> If no value is provided, a random value is selected from the list of supported values.
         Defaults to random status code. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#status-code">status code </a> </td>
      </tr>
      <tr>
        <td> MODIFY_RESPONSE_BODY </td>
        <td> Specifies whether to modify the body according to the status code provided.</td>
        <td> If true, the body is replaced by a default template for the status code. Defaults to true. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#modify-response-body">modify response body </a> </td>
      </tr>
    </table>
    <h3>Optional tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> RESPONSE_BODY </td>
        <td> String body to overwrite the HTTP response body. This is used only if <code>MODIFY_RESPONSE_BODY</code> is set to true. If no value is provided, response will be an empty body. </td>
        <td> Default: empty body. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#response-body"> response body</a></td>
      </tr>
      <tr>
        <td> CONTENT_ENCODING </td>
        <td> Encoding type to compress/encode the response body </td>
        <td> Accepted values are: gzip, deflate, br, identity. Defaults to none (no encoding). For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#content-encoding-and-content-type">content encoding </a> </td>
      </tr>
      <tr>
        <td> CONTENT_TYPE </td>
        <td> Content type of the response body </td>
        <td> Default: text or plain. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#content-encoding-and-content-type">content type </a> </td>
      </tr>
      <tr>
        <td> PROXY_PORT </td>
        <td> Port where the proxy will be listening for requests</td>
        <td> Default: 20000. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#proxy-port">proxy port </a> </td>
      </tr>
      <tr>
        <td> NETWORK_INTERFACE </td>
        <td> Network interface to be used for the proxy</td>
        <td> Default: `eth0`. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#network-interface">network interface </a> </td>
      </tr>
      <tr>
        <td> TOXICITY </td>
        <td> Percentage of HTTP requests to be affected. </td>
        <td> Default: 100. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#toxicity">toxicity </a> </td>
      </tr>
      <tr>
        <td> CONTAINER_RUNTIME </td>
        <td> Container runtime interface for the cluster. </td>
        <td> Default: containerd. Supports docker, containerd and crio. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-error#container-runtime-and-socket-path">container runtime </a> </td>
      </tr>
      <tr>
        <td> SOCKET_PATH </td>
        <td> Path of the containerd/crio/docker socket file </td>
        <td> Default: <code>/run/containerd/containerd.sock</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#container-runtime-and-socket-path">socket path </a> </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration for which to insert chaos (in seconds). </td>
        <td> Default: 60 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos</a></td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma-separated list of application pod names subject to pod HTTP status code. </td>
        <td> If not provided, the fault selects target pods randomly based on provided appLabels. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#target-specific-pods"> target specific pods</a></td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> Percentage of total pods to target. Provide numeric values. </td>
        <td> Default: 0 (corresponds to 1 replica). For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#pod-affected-percentage">pod affected percentage </a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods. </td>
        <td> Default: parallel. Supports serial and parallel. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution">sequence of chaos execution</a></td>
      </tr>
    </table>


### Target service port

Port of the target service. This is the port where the application runs at the pod-level. For example, if the application pod is running the service at port 8080 and you create a service exposing this service at port 80, the target service port should be 8080. 
Tune it by using the `TARGET_SERVICE_PORT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

Port where the proxy server listens for requests. Tune it by using the `PROXY_PORT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

Status code to be modified for the HTTP response. Tune it by using the `STATUS_CODE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

Specifies whether or not to modify the response body with a pre-defined template to match the status code value of the HTTP response. Tune it by using the `MODIFY_RESPONSE_BODY` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

Percentage of the total number of HTTP requests to be affected. Tune it by using the `TOXICITY` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

String body used to overwrite the HTTP response body. Tune it by using the `RESPONSE_BODY` environment variable.

:::info note
The `MODIFY_RESPONSE_BODY` environment variable should be set to `true` to enable this feature.
:::

The following YAML snippet illustrates the use of this environment variable:

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

Content encoding and content type of the response body. Tune it by using the `CONTENT_ENCODING` and `CONTENT_TYPE` environment variables, respectively.

The following YAML snippet illustrates the use of this environment variable:

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

Network interface used for the proxy. Tune it by using the `NETWORK_INTERFACE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

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

The `CONTAINER_RUNTIME` and `SOCKET_PATH` environment variables to set the container runtime and socket file path, respectively.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `containerd`.
- `SOCKET_PATH`: It contains path of containerd socket file by default(`/run/containerd/containerd.sock`). For `docker`, specify path as `/var/run/docker.sock`. For `crio`, specify path as `/var/run/crio/crio.sock`.

The following YAML snippet illustrates the use of this environment variable:

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
