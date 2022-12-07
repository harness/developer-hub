---
id: ec2-http-reset-peer
title: EC2 HTTP Reset Peer
---

## Introduction

- It injects HTTP reset on the service whose port is provided as `TARGET_SERVICE_PORT` which stops outgoing HTTP requests by resetting the TCP connection for the requests.
- It can assess the application's resilience to a lossy/flaky http connection.

:::tip Fault execution flow chart
![EC2 HTTP Reset Peer](./static/images/ec2-http-reset-peer.png)
:::

## Prerequisites

:::info

- Kubernetes >= 1.17

**AWS EC2 Access Requirement:**

- SSM agent is installed and running in the target EC2 instance.
- Kubernetes secret with AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. A secret file looks like:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-secret
type: Opaque
stringData:
  cloud_config.yml: |-
    # Add the cloud AWS credentials respectively
    [default]
    aws_access_key_id = XXXXXXXXXXXXXXXXXXX
    aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- If you change the secret key name (from `cloud_config.yml`) please also update the `AWS_SHARED_CREDENTIALS_FILE` ENV value in the ChaosExperiment CR with the same name.

### NOTE

You can pass the VM credentials as secrets or as an chaosengine environment variable.
:::

## Default Validations

:::info

- The EC2 instance should be in a healthy state.

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
          <td> EC2_INSTANCE_ID </td>
          <td> ID of the target EC2 instance </td>
          <td> For example: <code>i-044d3cb4b03b8af1f</code> </td>
        </tr>
        <tr>
          <td> REGION </td>
          <td> The AWS region ID where the EC2 instance has been created </td>
          <td> For example: <code>us-east-1</code> </td>
        </tr>
        <tr>
            <td> RESET_TIMEOUT </td>
            <td> Reset Timeout specifies after how much duration to reset the connection</td>
            <td> Defaults to 0 </td>
        </tr>
        <tr>
            <td> TARGET_SERVICE_PORT </td>
            <td> Port of the service to target </td>
            <td> Defaults to port 80 </td>
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
            <td> The total time duration for chaos insertion (in sec) </td>
            <td> Defaults to 30s </td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> The interval (in sec) between successive instance termination </td>
            <td> Defaults to 30s </td>
        </tr>
        <tr>
            <td> AWS_SHARED_CREDENTIALS_FILE </td>
            <td> Provide the path for aws secret credentials</td>
            <td> Defaults to <code>/tmp/cloud_config.yml</code> </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> It defines sequence of chaos execution for multiple instance </td>
            <td> Default value: parallel. Supported: serial, parallel </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injection of chaos (in sec) </td>
            <td> For example: 30 </td>
        </tr>
        <tr>
            <td> INSTALL_DEPENDENCY </td>
            <td> Whether to install the dependency to run the fault </td>
            <td> If the dependency already exists, you can turn it off (defaults to True)</td>
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

It is the targeted service's port being targeted. You can tune it using the `TARGET_SERVICE_PORT` environment variable.

You can use the following example to tune it:

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
  - name: ec2-http-reset-peer
    spec:
      components:
        env:
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Proxy Port

It is the port where the proxy server listens for requests. You can tune it using the `PROXY_PORT` environment variable.

You can use the following example to tune it:

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
  - name: ec2-http-reset-peer
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

It defines the reset timeout value that is added to the http request. You can tune it using `RESET_TIMEOUT` environment variable.

You can use the following example to tune it:

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
  - name: ec2-http-reset-peer
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

It defines the toxicity value to be added to the http request. You can tune it using the `TOXICITY` environment variable.
Toxicity value defines the percentage of the total number of http requests that are affected.

You can use the following example to tune it:

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
  - name: ec2-http-reset-peer
    spec:
      components:
        env:
        # toxicity is the probability of the request that is affected
        # provide the percentage value in the range of 0-100
        # 0 means no request will be affected and 100 means all requests will be affected
        - name: TOXICITY
          value: "100"
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Network Interface

It defines the network interface used for the proxy. You can tune it using the `NETWORK_INTERFACE` environment variable.

You can use the following example to tune it:

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
  - name: ec2-http-reset-peer
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
