---
id: vmware-http-reset-peer
title: VMware HTTP Reset Peer
---

## Introduction

- It injects HTTP reset on the service whose port is provided as `TARGET_SERVICE_PORT`. It stops outgoing HTTP requests by resetting the TCP connection for the requests.
- It tests the application's resilience to lossy or flaky HTTP connection.

:::tip Fault execution flow chart
![VMware HTTP Reset Peer](./static/images/vmware-http-reset-peer.png)
:::

## Prerequisites

:::info

- Kubernetes >= 1.17
- Vcenter access to stop and start the VM.
- Kubernetes secret that has the Vcenter credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:

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

You can pass the VM credentials as a secret or as a chaosengine environment variable.
:::

## Default Validations

:::info

- The VM should be in a healthy state.

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
            <td> Name of VMware VM. </td>
            <td> For example: test-vm. </td>
        </tr>
        <tr>
            <td> VM_USER_NAME </td>
            <td> Username with sudo priviliges.</td>
            <td> For example: vm-user</td>
        </tr>
        <tr>
            <td> VM_PASSWORD </td>
            <td> User password. </td>
            <td> For example: 1234. </td>
        </tr>
        <tr>
            <td> RESET_TIMEOUT  </td>
            <td> It specifies the duration after which the connect is reset. </td>
            <td> Its default value is 0. </td>
        </tr>
        <tr>
            <td> TARGET_SERVICE_PORT </td>
            <td> Service port to target </td>
            <td> Its default value is port 80. </td>
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
            <td> The total duration to insert chaos (in seconds). </td>
            <td> Its default value is 30s. </td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> The interval between successive instance terminations (in seconds). </td>
            <td> Its default value is 30s. </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> It defines sequence of chaos execution for multiple instance </td>
            <td> Its default value is 'parallel', and it supports 'serial' value too. </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injection of chaos (in seconds). </td>
            <td> For example: 30. </td>
        </tr>
        <tr>
            <td> INSTALL_DEPENDENCY </td>
            <td> Whether to install the dependancy to run the experiment. </td>
            <td> If the dependency already exists, you can turn it off. Its default value is 'True'.</td>
        </tr>
        <tr>
            <td> PROXY_PORT  </td>
            <td> Port where the proxy listens for requests.</td>
            <td> Its default value is 20000. </td>
        </tr>
        <tr>
            <td> TOXICITY </td>
            <td> Percentage of HTTP requests affected. </td>
            <td> Its default value is 100. </td>
        </tr>
        <tr>
          <td> NETWORK_INTERFACE  </td>
          <td> Network interface used for the proxy. </td>
          <td> Its default value is `eth0`. </td>
        </tr>
    </table>
</details>

## Fault Examples

### Common Fault Tunables

Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Target Service Port

It defines the port of the target service. You can tune it using the `TARGET_SERVICE_PORT` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/http-reset-peer/target-service-port.yaml yaml)
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
  - name: vmware-http-reset-peer
    spec:
      components:
        env:
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Proxy Port

It defines the port where proxy server listens for requests. You can tune it using the `PROXY_PORT` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/http-reset-peer/proxy-port.yaml yaml)
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
  - name: vmware-http-reset-peer
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

### Reset Timeout

It defines the reset timeout value that is added to the HTTP request. You can tune it using the `RESET_TIMEOUT` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/http-reset-peer/reset-timeout.yaml yaml)
```yaml
## provide the reset timeout value
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-http-reset-peer
    spec:
      components:
        env:
        # reset timeout specifies after how much duration to reset the connection
        - name: RESET_TIMEOUT #in ms
          value: '2000'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Toxicity

It defines the toxicity value that is added to the HTTP request. You can tune it using the `TOXICITY` environment variable.
It defines the percentage of the total number of HTTP requests that are affected.

Use the following example to tune it:

[embedmd]:# (./static/manifests/http-reset-peer/toxicity.yaml yaml)
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
  - name: vmware-http-reset-peer
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

It defines the network interface that is used for the proxy. You can tune it using the `NETWORK_INTERFACE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/http-reset-peer/network-interface.yaml yaml)
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
  - name: vmware-http-reset-peer
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
