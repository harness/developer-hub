---
id: pod-dns-error
title: Pod DNS error
---
Pod DNS error is a Kubernetes pod-level chaos fault that:
- Injects chaos to disrupt DNS resolution in pods.
- Removes access to services by blocking the DNS resolution of host names (or domains).

:::tip Fault execution flow chart
![Pod DNS Error](./static/images/dns-chaos.png)
:::

## Usage
<details>
<summary>View fault usage</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites
:::info
- Kubernetes > 1.16
:::

## Default validation
The application pods should be running before and after injecting chaos.

## Implementation

**NOTE:** It is assumed that you already have the boutique application set up in a namespace. If not, follow [this](provide link) to set up your boutique application.

To execute pod DNS error fault, [setup experiment](provide) and infrastructure.

After successful setup of chaos infrastructure:
* Choose the **pod-dns-error** fault from the list of Kubernetes faults available;
* Specify parameters for the **Target application**, **Tune fault**, and **Probes**;
    <details>
        <summary>Fault Tunables</summary>
        <h2>Optional Fields</h2>
        <table>
          <tr>
            <th> Variables </th>
            <th> Description  </th>
            <th> Notes </th>
          </tr>
          <tr>
            <td> TARGET_CONTAINER </td>
            <td> Name of the container subject to DNS error. </td>
            <td> None </td>
          </tr>
          <tr>
            <td> TOTAL_CHAOS_DURATION </td>
            <td> Duration to insert chaos (in seconds). </td>
            <td> Defaults to 60s. </td>
          </tr>
          <tr>
            <td> TARGET_HOSTNAMES </td>
            <td> List of the target host names (or keywords). For example, '["litmuschaos","chaosnative.com"]'.</td>
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

* Close this pane by clicking on **X** at the top.
* Set fault weights by clicking on **Set fault weights** tab present on top. 
* Click **Run** to execute the experiment.


## Chaos fault validation

To validate the experiment you ran, execute the below commands on your terminal. 

* Fetch all the pods in the boutique namespace (or the namespace where your application is housed).
```
kubectl get pods -n <namespace>
```

* Exec into the microservice on which you will execute the chaos fault.
```
kubectl exec -it <microservice_name> -n <namespace> sh
``` 

* This leads you into the pod, where you can execute the below command to check the disk usage.
```
/app # ping <target_hostname>
```
When the chaos is in action, accessing the target_hostname leads to a 'bad address' error. 

## Fault examples

### Common and pod specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Target host names

It defines the comma-separated name of the target hosts subject to chaos. You can tune it using the `TARGET_HOSTNAMES` environment variable.
If `TARGET_HOSTNAMES` environment variable has not been provided, all host names (or domains) are targeted.

Use the following example to tune it:

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

### Match scheme

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

### Container runtime and socket path

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
