---
id: vmware-http-modify-response
title: VMware HTTP Modify Response
---

## Introduction

- It injects HTTP chaos which can affect the request/response by modifying either the status code, body or the headers by starting proxy server and then redirecting the traffic through the proxy server.
- It can test the application's resilience to error code http responses from the provided application server.
- It can test the application's resilience to error or incorrect http response body.
- It can cause modification of headers of requests and responses of the service. This can be used to test service resilience towards incorrect or incomplete headers

:::tip Fault execution flow chart
![VMware HTTP Modify Response](./static/images/vmware-http-modify-response.png)
:::

## Prerequisites

:::info

- Ensure that Kubernetes Version >= 1.17
- Ensure that you have sufficient Vcenter access to stop and start the VM.
- Ensure to create a Kubernetes secret having the Vcenter credentials in the `CHAOS_NAMESPACE`. A secret file looks like:

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: vcenter-secret
    namespace: litmus
type: Opaque
stringData:
    VCENTERSERVER: XXXXXXXXXXX
    VCENTERUSER: XXXXXXXXXXXXX
    VCENTERPASS: XXXXXXXXXXXXX
```

### NOTE

You can pass the VM credentials as secrets or as an chaosengine ENV variable.
:::

## Default Validations

:::info

- VM should be in healthy state.

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
            <td> VM_NAME </td>
            <td> Name of VMware VM</td>
            <td> Eg: test-vm </td>
        </tr>
        <tr>
            <td> VM_USER_NAME </td>
            <td> Username with sudo privileges.</td>
            <td> Eg: vm-user</td>
        </tr>
        <tr>
            <td> VM_PASSWORD </td>
            <td> Password of the provided user</td>
            <td> Eg: 1234</td>
        </tr>
        <tr>
            <td> TARGET_SERVICE_PORT </td>
            <td> Port of the service to target </td>
            <td> Defaults to port 80 </td>
        </tr>
        <tr>
            <td> HTTP_CHAOS_TYPE </td>
            <td> Type of HTTP Modify Response chaos to be injected. </td>
            <td> Accepted values are: status_code, body, header. Defaults to status_code. </td>
        </tr>
    </table>
    <h2> Status Code Modification Related Fields </h2>
    <table>
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
    <h2> Body Modification Related Fields </h2>
    <table>
        <tr>
            <td> RESPONSE_BODY </td>
            <td> Body string to overwrite the http response body</td>
            <td> If no value is provided, response will be an empty body. Defaults to empty body </td>
        </tr>
    </table>
    <h2> Header Modification Related Fields</h2>
    <table>
        <tr>
            <td> HEADERS_MAP </td>
            <td> Map of headers to modify/add </td>
            <td> Eg: &#123;"X-Litmus-Test-Header":"X-Litmus-Test-Value"&#125;. To remove a header, just set the value to ""; Eg: &#123;"X-Litmus-Test-Header": ""&#125; </td>
        </tr>
        <tr>
            <td> HEADER_MODE </td>
            <td> Whether to modify response headers or request headers. Accepted values: request, response</td>
            <td> Defaults to response </td>
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
            <td> The total time duration for chaos insertion (sec) </td>
            <td> Defaults to 30s </td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> The interval (in sec) between successive instance termination </td>
            <td> Defaults to 30s </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> It defines sequence of chaos execution for multiple instance </td>
            <td> Default value: parallel. Supported: serial, parallel </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injection of chaos in sec </td>
            <td> Eg: 30 </td>
        </tr>
        <tr>
            <td> INSTALL_DEPENDENCY </td>
            <td> Whether to install the dependency to run the fault </td>
            <td> If the dependency already exists, you can turn it off. Defaults to True.</td>
        </tr>
        <tr>
            <td> PROXY_PORT </td>
            <td> Port where the proxy will be listening for requests</td>
            <td> Defaults to 20000 </td>
        </tr>
        <tr>
            <td> TOXICITY </td>
            <td> Percentage of HTTP requests to be affected </td>
            <td> Defaults to 100 </td>
        </tr>
        <tr>
          <td> NETWORK_INTERFACE </td>
          <td> Network interface to be used for the proxy</td>
          <td> Defaults to `eth0` </td>
        </tr>
    </table>
</details>

## Fault Examples

### Common Fault Tunables

Refer the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Target Service Port

It defines the port of the targeted service that is being targeted. It can be tuned via `TARGET_SERVICE_PORT` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/http-modify-response/target-service-port.yaml yaml)
```yaml
## provide the port of the targeted service
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
    spec:
      components:
        env:
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Modifying the Response Status Code

Use this example to modify the status code of the response.

***Note***: `HTTP_CHAOS_TYPE` should be provided as `status_code`

[embedmd]:# (./static/manifests/http-modify-response/status-code.yaml yaml)
```yaml
## provide the headers as a map
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
    spec:
      components:
        env:
        # HTTP response modification chaos type
        - name: HTTP_CHAOS_TYPE
          value: "status_code"
        # modified status code for the http response
        # if no value is provided, a random status code from the supported code list will selected
        # if multiple comma separated values are provided, then a random value
        # from the provided list will be selected
        # if an invalid status code is provided, the fault will fail
        # supported status code list:
        # [200, 201, 202, 204, 300, 301, 302, 304, 307, 400, 401, 403, 404, 500, 501, 502, 503, 504]
        - name: STATUS_CODE
          value: '500'
        # whether to modify the body as per the status code provided
        - name: "MODIFY_RESPONSE_BODY"
          value: "true"
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Modifying the Response Headers

Use this example to modify the headers of the response.

***Note***: `HTTP_CHAOS_TYPE` should be provided as `header`

[embedmd]:# (./static/manifests/http-modify-response/response-headers.yaml yaml)
```yaml
## provide the headers as a map
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
    spec:
      components:
        env:
        # HTTP response modification chaos type
        - name: HTTP_CHAOS_TYPE
          value: "header"
        # map of headers to modify/add; Eg: {"X-Litmus-Test-Header": "X-Litmus-Test-Value"}
        # to remove a header, just set the value to ""; Eg: {"X-Litmus-Test-Header": ""}
        - name: HEADERS_MAP
          value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
        # whether to modify response headers or request headers. Accepted values: request, response
        - name: HEADER_MODE
          value: 'response'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Modifying the Request Headers

Use this example to modify the headers of the response.

***Note***: `HTTP_CHAOS_TYPE` should be provided as `header`

[embedmd]:# (./static/manifests/http-modify-response/response-headers.yaml yaml)
```yaml
## provide the headers as a map
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
    spec:
      components:
        env:
        # HTTP response modification chaos type
        - name: HTTP_CHAOS_TYPE
          value: "header"
        # map of headers to modify/add; Eg: {"X-Litmus-Test-Header": "X-Litmus-Test-Value"}
        # to remove a header, just set the value to ""; Eg: {"X-Litmus-Test-Header": ""}
        - name: HEADERS_MAP
          value: '{"X-Litmus-Test-Header": "X-Litmus-Test-Value"}'
        # whether to modify response headers or request headers. Accepted values: request, response
        - name: HEADER_MODE
          value: 'response'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Modifying the Response Body

Use this example to modify the body of the response.

***Note***: `HTTP_CHAOS_TYPE` should be provided as `body`

[embedmd]:# (./static/manifests/http-modify-response/response-body.yaml yaml)
```yaml
## provide the headers as a map
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
    spec:
      components:
        env:
        # HTTP response modification chaos type
        - name: HTTP_CHAOS_TYPE
          value: "body"
        # provide the body string to overwrite the response body
        - name: RESPONSE_BODY
          value: '2000'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Proxy Port

It defines the port on which the proxy server will listen for requests. It can be tuned via `PROXY_PORT` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/http-modify-response/proxy-port.yaml yaml)
```yaml
# provide the port for proxy server
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
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

### Toxicity

It defines the toxicity value to be added to the http request. It can be tuned via `TOXICITY` ENV.
Toxicity value defines the percentage of the total number of http requests to be affected.

Use the following example to tune this:

[embedmd]:# (./static/manifests/http-modify-response/toxicity.yaml yaml)
```yaml
## provide the toxicity
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
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

[embedmd]:# (./static/manifests/http-modify-response/network-interface.yaml yaml)
```yaml
## provide the network interface for proxy
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-modify-response
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
