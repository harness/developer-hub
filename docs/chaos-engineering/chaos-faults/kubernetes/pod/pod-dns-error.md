---
id: pod-dns-error
title: Pod DNS Error
---
## Introduction
- Pod-dns-error injects chaos to disrupt dns resolution in kubernetes pods.
- It causes loss of access to services by blocking dns resolution of hostnames/domains.

:::tip Fault execution flow chart
![Pod DNS Error](./static/images/dns-chaos.png)
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
    <h2>Optional Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description  </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TARGET_CONTAINER </td>
        <td> Name of container which is subjected to dns-error </td>
        <td> None </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos insertion (seconds) </td>
        <td> Default (60s) </td>
      </tr>
      <tr>
        <td> TARGET_HOSTNAMES </td>
        <td> List of the target hostnames or keywords eg. '["litmuschaos","chaosnative.com"]'</td>
        <td> If not provided, all hostnames/domains will be targeted</td>
      </tr>
      <tr>
        <td> MATCH_SCHEME </td>
        <td> Determines whether the dns query has to match exactly with one of the targets or can have any of the targets as substring. Can be either <code>exact</code> or <code>substring</code> </td>
        <td> if not provided, it will be set as <code>exact</code></td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr>
      <tr>
        <td> CONTAINER_RUNTIME </td>
        <td> container runtime interface for the cluster</td>
        <td> Defaults to docker, supported values: docker</td>
      </tr>
      <tr>
        <td> SOCKET_PATH </td>
        <td> Path of the docker socket file </td>
        <td> Defaults to <code>/var/run/docker.sock</code> </td>
      </tr>
      <tr>
        <td> LIB </td>
        <td> The chaos lib used to inject the chaos </td>
        <td> Default value: litmus, supported values: litmus </td>
      </tr>
      <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to run the netem command </td>
        <td> Defaults to <code>litmuschaos/go-runner:latest</code> </td>
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

### Target Host Names

It defines the comma-separated name of the target hosts subjected to chaos. It can be tuned with the `TARGET_HOSTNAMES` ENV.
If `TARGET_HOSTNAMES`not provided then all hostnames/domains will be targeted.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-dns-error/target-hostnames.yaml yaml)
```yaml
# contains the target host names for the dns error
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
  - name: pod-dns-error
    spec:
      components:
        env:
        ## comma separated list of host names
        ## if not provided, all hostnames/domains will be targeted
        - name: TARGET_HOSTNAMES
          value: '["litmuschaos","chaosnative.com"]'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Match Scheme

It determines whether the DNS query has to match exactly with one of the targets or can have any of the targets as a substring. It can be tuned with `MATCH_SCHEME` ENV. It supports `exact` or `substring` values.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-dns-error/match-scheme.yaml yaml)
```yaml
# contains match scheme for the dns error
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
  - name: pod-dns-error
    spec:
      components:
        env:
        ## it supports 'exact' and 'substring' values
        - name: MATCH_SCHEME
          value: 'exact' 
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Container Runtime Socket Path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker` runtime only.
- `SOCKET_PATH`: It contains path of docker socket file by default(`/var/run/docker.sock`).

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-dns-error/container-runtime-and-socket-path.yaml yaml)
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
  - name: pod-dns-error
    spec:
      components:
        env:
        # runtime for the container
        # supports docker
        - name: CONTAINER_RUNTIME
          value: 'docker'
        # path of the socket file
        - name: SOCKET_PATH
          value: '/var/run/docker.sock'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
