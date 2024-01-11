---
id: pod-api-modify-body
title: Pod API modify body
redirect_from:
  - /docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-api-modify-body
---
## Introduction

Pod API modify body is a Kubernetes pod-level chaos fault that modifies the api request and response body by replacing any portions that match a specified regular expression with a provided value. This is achieved by starting the proxy server and redirecting the traffic through the proxy server.

![Pod API Modify Body](./static/images/pod-api-modify-body.png)

## Use cases
Pod API modify body:
- It can be used for API testing, by replacing specific portions of the request or response body to simulate different scenarios and validate how your application handles different data variations.
- Simulate error conditions and test the error handling capabilities of API by replacing specific patterns in the response body with error messages or custom error codes to test error handling and reporting mechanisms are in place.
- It can be useful for obscuring or redacting personally identifiable information (PII), such as email addresses or phone numbers, before logging or transmitting the data for security and privacy compliance.

:::info note
- Kubernetes> 1.17 is required to execute this fault.
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
        <td> TARGET_CONTAINER </td>
        <td> Name of the container subject to API body modification. </td>
        <td> None. For more information, go to <a href="../pod/common-tunables-for-pod-faults#target-specific-container">target specific container</a></td>
      </tr>
      <tr>
        <td> TARGET_SERVICE_PORT </td>
        <td> Port of the target service.</td>
        <td> Defaults to port 80. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#target-service-port">target service port</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
        <td> Node label used to filter the target node if <code>TARGET_NODE</code> environment variable is not set. </td>
        <td> It is mutually exclusive with the <code>TARGET_NODE</code> environment variable. If both are provided, the fault uses <code>TARGET_NODE</code>. For more information, go to <a href="../node/common-tunables-for-node-faults#target-nodes-with-labels">node label.</a></td>
      </tr>
      <tr>
        <td> RESPONSE_BODY </td>
        <td> String body to overwrite the HTTP response body.</td>
        <td> If no value is provided, response will be an empty body. Defaults to empty body. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#response-body">response body </a></td>
      </tr>
      <tr>
        <td> PATH_FILTER </td>
        <td> Api path or route used for the filtering </td>
        <td> For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#path-filter">path filter </a></td>
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
        <td> PROXY_PORT </td>
        <td> Port where the proxy listens for requests.</td>
        <td> Default: 20000. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#advanced-fault-tunables">proxy port</a></td>
      </tr>
      <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to inject chaos. </td>
        <td> Default: <code>chaosnative/chaos-go-runner:main-latest</code>. For more information, go to <a href = "../../common-tunables-for-all-faults#image-used-by-the-helper-pod">image used by the helper pod.</a></td>
      </tr>
      <tr>
        <td> SERVICE_DIRECTION </td>
        <td> Direction of the flow of control, ingress or egress </td>
        <td> Default: `ingress`. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#advanced-fault-tunables">service direction </a></td>
      </tr>
      <tr>
        <td> DATA_DIRECTION </td>
        <td> API payload type, request or response </td>
        <td> Default: `both`. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#advanced-fault-tunables">data direction </a></td>
      </tr>
      <tr>
        <td> DESTINATION_PORTS </td>
        <td> comma-separated list of the destination service or host ports for which `egress` traffic should be affected </td>
        <td> Default: 80,8443. For more information, go to <a href="#destination-ports">destination ports</a></td>
      </tr>
      <tr>
        <td> HTTPS_ENABLED </td>
        <td> facilitate HTTPS support for both incoming and outgoing traffic </td>
        <td> Default: false. For more information, go to <a href="#https-enabled">https enabled</a></td>
      </tr>
      <tr>
        <td> NETWORK_INTERFACE </td>
        <td> Network interface used for the proxy.</td>
        <td> Default: `eth0`. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#advanced-fault-tunables">network interface </a></td>
      </tr>
      <tr>
        <td> CONTAINER_RUNTIME </td>
        <td> Container runtime interface for the cluster</td>
        <td> Default: containerd. Support values: docker, containerd and crio. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#container-runtime-and-socket-path">container runtime </a> </td>
      </tr>
      <tr>
        <td> SOCKET_PATH </td>
        <td> Path of the containerd or crio or docker socket file. </td>
        <td> Default: <code>/run/containerd/containerd.sock</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-api-modify-body#container-runtime-and-socket-path">socket path </a></td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration of chaos injection (in seconds). </td>
        <td> Default: 60 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos </a></td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma-separated list of application pod names subject to pod HTTP modify body.</td>
        <td> If not provided, the fault selects target pods randomly based on provided appLabels. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#target-specific-pods"> target specific pods</a></td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> Percentage of total pods to target. Provide numeric values. </td>
        <td> Default: 0 (corresponds to 1 replica). For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#pod-affected-percentage">pod affected percentage </a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods. </td>
        <td> Default: parallel. Supports serial and parallel. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/technical-reference/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution">sequence of chaos execution</a></td>
      </tr>
    </table>

### Target service port

Port of the targeted service. Tune it by using the `TARGET_SERVICE_PORT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/pod-api-modify-body/target-service-port.yaml yaml"

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
    - name: pod-api-modify-body
      spec:
        components:
          env:
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            # provide the body string to overwrite the response body
            - name: RESPONSE_BODY
              value: "/.+/test"
            - name: PATH_FILTER
              value: '/status'   
```

### Response body

String body that overwrites the API request and response body. Tune it by using the `RESPONSE_BODY` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/pod-api-modify-body/response-body.yaml yaml"

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
    - name: pod-api-modify-body
      spec:
        components:
          env:
            # provide the body string to overwrite the response body
            - name: RESPONSE_BODY
              value: "/.+/test"
            - name: PATH_FILTER
              value: '/status'   
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
```

### Path Filter

API sub path/route to filter the api calls. Tune it by using the `PATH_FILTER` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/pod-api-modify-body/path-filter.yaml yaml"

```yaml
## provide api path filter
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
    - name: pod-api-modify-body
      spec:
        components:
          env:
            # provide the api path filter
            - name: PATH_FILTER
              value: '/status'
            - name: RESPONSE_BODY
              value: "/.+/test"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"         
```

### Destination ports

A comma-separated list of the destination service or host ports for which `egress` traffic should be affected as a result of chaos testing on the target application. Tune it by using the `DESTINATION_PORTS` environment variable.

:::note

It is applicable only for the egress `SERVICE_DIRECTION`.

:::

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/pod-api-modify-body/destination-ports.yaml yaml"

```yaml
## provide destination ports
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
    - name: pod-api-modify-body
      spec:
        components:
          env:
            # provide destination ports
            - name: DESTINATION_PORTS
              value: '80,443'
            # provide the api path filter
            - name: PATH_FILTER
              value: '/status'
            - name: RESPONSE_BODY
              value: "/.+/test"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"        
```

### HTTPS enabled

This item is employed to facilitate HTTPS for both incoming and outgoing traffic, and its usage can vary depending on whether it's applied to `ingress` or `egress` scenarios. Tune it by using the `HTTPS_ENABLED` environment variable.

* When applied to `ingress` traffic, it should be configured as `true` if the HTTPS URL of the target application includes a port, following the format `https://<hostname>:port`. However, for HTTPS URLs in the form of `https://<hostname>` without a port, this setting is not required.

* For egress traffic, setting it to `true` is necessary to enable HTTPS support for external services, which will then establish TLS certificates for the proxy within the target application.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/pod-api-modify-body/https-enabled.yaml yaml"

```yaml
## enable https support
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
    - name: pod-api-modify-body
      spec:
        components:
          env:
            # enable https support
            - name: HTTPS_ENABLED
              value: 'true'
            # provide the api path filter
            - name: PATH_FILTER
              value: '/status'
            - name: RESPONSE_BODY
              value: "/.+/test"
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"        
```

### Advanced fault tunables

- `PROXY_PORT`: Port where the proxy listens for requests and responses.
- `SERVICE_DIRECTION`: Direction of the flow of control, either ingress or egress. It supports `ingress`, `egress` values.
- `DATA_DIRECTION`: API payload type, request, or response. It supports `request`, `response`, and `both` values.
- `NETWORK_INTERFACE`: Network interface used for the proxy.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/pod-api-modify-body/advanced-fault-tunables.yaml yaml)
```yaml
# it injects the api modify body fault
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
    - name: pod-api-modify-body
      spec:
        components:
          env:
            # provide the proxy port
            - name: PROXY_PORT
              value: '20000'
            # provide the connection type
            - name: SERVICE_DIRECTION
              value: 'ingress'
            # provide the payload type
            - name: DATA_DIRECTION
              value: 'both'
            # provide the network interface
            - name: NETWORK_INTERFACE
              value: 'eth0'
            # provide the api path filter
            - name: PATH_FILTER
              value: '/status'
            # provide the port of the targeted service
            - name: TARGET_SERVICE_PORT
              value: "80"
            - name: RESPONSE_BODY
              value: "/.+/test"
```

### Container runtime and socket path

The `CONTAINER_RUNTIME` and `SOCKET_PATH` environment variable to set the container runtime and socket file path, respectively.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `containerd`.
- `SOCKET_PATH`: It contains path of containerd socket file by default(`/run/containerd/containerd.sock`). For `docker`, specify path as `/var/run/docker.sock`. For `crio`, specify path as `/var/run/crio/crio.sock`.

The following YAML snippet illustrates the use of these environment variables:

[embedmd]: # "./static/manifests/pod-api-modify-body/container-runtime-and-socket-path.yaml yaml"

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
    - name: pod-api-modify-body
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
            # provide the api path filter
            - name: PATH_FILTER
              value: '/status'
            - name: RESPONSE_BODY
              value: "/.+/test"
```
