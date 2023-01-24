---
id: pod-dns-spoof
title: Pod DNS spoof
---

Pod DNS spoof is a Kubernetes pod-level chaos fault that:

- Injects chaos into pods to mimic DNS resolution.
- Resolves DNS target host names (or domains) to other IPs as specified in the `SPOOF_MAP` environment variable in the chaosengine configuration.

![Pod DNS Spoof](./static/images/dns-chaos.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16

## Default validation

The application pods should be running before and after injecting chaos.

## Implementation

**NOTE:** It is assumed that you already have the boutique application set up in a namespace. If not, follow this to set up your boutique application.

To execute pod DNS spoof fault, setup experiment and infrastructure.

After successful setup of chaos infrastructure:

- Choose the **pod-dns-spoof** fault from the list of Kubernetes faults available;
- Specify parameters for the **Target application**, **Tune fault**, and **Probes**;
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
            <td> Name of container subject to DNS spoof. </td>
            <td> None </td>
          </tr>
          <tr>
            <td> TOTAL_CHAOS_DURATION </td>
            <td> Duration to insert chaos (in seconds).</td>
            <td> Defaults to 60s. </td>
          </tr>
          <tr>
            <td> SPOOF_MAP </td>
            <td> Map of the target hostnames eg. '&#123;"abc.com":"spoofabc.com"&#125;' where key is the hostname that needs to be spoofed and value is the hostname where it will be spoofed/redirected to.</td>
            <td> If this is not provided, no host names (or domains) are spoofed. </td>
          </tr>
          <tr>
            <td> PODS_AFFECTED_PERC </td>
            <td> Percentage of total pods to target </td>
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
            <td> Sequence of chaos execution for multiple target pods. </td>
            <td> Default value: parallel. Supported: serial, parallel </td>
          </tr>
        </table>
    </details>

- Close this pane by clicking on **X** at the top.
- Set fault weights by clicking on **Set fault weights** tab present on top.
- Click **Run** to execute the experiment.

## Chaos fault validation

To validate the experiment you ran, execute the below commands on your terminal.

- Fetch all the pods in the boutique namespace (or the namespace where your application is housed).

```
kubectl get pods -n <namespace>
```

- Exec into the microservice on which you will execute the chaos fault.

```
kubectl exec -it <microservice_name> -n <namespace> sh
```

- This leads you into the pod, where you can execute the below command to check the disk usage.

```
/app # nslookup <spoof map key>
```

## Fault examples

### Common and pod specific tunables

Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Spoof map

It defines the map of the target host names. For example, '{"abc.com":"spoofabc.com"}' where the key is the host name that needs to be spoofed and the value is the host name to which the key is spoofed (or redirected). You can tune it using `SPOOF_MAP` environment variable.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-dns-spoof/spoof-map.yaml yaml"

```yaml
# contains the spoof map for the dns spoofing
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
    - name: pod-dns-spoof
      spec:
        components:
          env:
            # map of host names
            - name: SPOOF_MAP
              value: '{"abc.com":"spoofabc.com"}'
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` environment variables to set the container runtime and socket file path, respectively.

- `CONTAINER_RUNTIME`: It supports `docker` runtime only.
- `SOCKET_PATH`: It contains path of the docker socket file, which by default, is `/var/run/docker.sock`.

Use the following example to tune it:

[embedmd]: # "./static/manifests/pod-dns-spoof/container-runtime-and-socket-path.yaml yaml"

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
    - name: pod-dns-spoof
      spec:
        components:
          env:
            # runtime for the container
            # supports docker
            - name: CONTAINER_RUNTIME
              value: "docker"
            # path of the socket file
            - name: SOCKET_PATH
              value: "/var/run/docker.sock"
            # map of host names
            - name: SPOOF_MAP
              value: '{"abc.com":"spoofabc.com"}'
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```
