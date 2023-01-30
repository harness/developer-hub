---
id: pod-network-latency
title: Pod network latency
---

Pod network latency is a Kubernetes pod-level chaos fault that introduces latency (delay) to a specific container by initiating a traffic control (tc) process with netem rules to add egress delays.
- It tests the application's resilience to lossy (or flaky) networks.

![Pod Network Latency](./static/images/network-chaos.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
The fault degrades the network without the pod being marked as unhealthy (or unworthy) of traffic by kube-proxy (unless there is a liveness probe that measures thw latency and restarts (or crashes) the container). This fault simulates issues within the pod network (or microservice communication) across services in different availability zones(or regions). 

This can be resolved by using middleware that switches traffic based on certain SLOs or performance parameters. 
Another way is to set up alerts and notifications to highlight a degradation, so that it can be addressed, and fixed. Another way is to understand the impact of the failure and determine the last point in the application stack before degradation. 

The applications may stall or get corrupted while waiting endlessly for a packet. This fault limits the impact (blast radius) to only the traffic that you wish to test by specifying the IP addresses. This fault will help to improve the resilience of your services over time.

It simulates a consistently slow network connection between microservices (for example, cross-region connectivity between active-active peers of a given service or across services or poor cni-performance in the inter-pod-communication network). It also simulates jittery connection with transient latency spikes between microservices, slow response on specific third party (or dependent) components (or services), and degraded data-plane of service-mesh infrastructure.  
</div>
</details>

## Prerequisites

- Kubernetes> 1.16.


## Default validations

The application pods should be in running state before and after chaos injection.


## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> s </th>
      </tr>
      <tr>
        <td> NETWORK_INTERFACE </td>
        <td> Name of ethernet interface considered for shaping traffic </td>
        <td> </td>
      </tr>
      <tr>
        <td> TARGET_CONTAINER </td>
        <td> Name of container which is subjected to network latency </td>
        <td> Applicable for containerd & CRI-O runtime only. Even with these runtimes, if the value is not provided, it injects chaos on the first container of the pod </td>
      </tr>
      <tr>
        <td> NETWORK_LATENCY </td>
        <td> The latency/delay in milliseconds </td>
        <td> Default 2000, provide numeric value only </td>
      </tr>
      <tr>
        <td> JITTER </td>
        <td> The network jitter value in ms </td>
        <td> Default 0, provide numeric value only </td>
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
        <td> The time duration for chaos insertion (seconds) </td>
        <td> Default (60s) </td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod network corruption chaos</td>
        <td> If not provided, it will select target pods randomly based on provided appLabels</td>
      </tr> 
      <tr>
        <td> DESTINATION_IPS </td>
        <td> IP addresses of the services or pods or the CIDR blocks(range of IPs), the accessibility to which is impacted </td>
        <td> comma separated IP(S) or CIDR(S) can be provided. if not provided, it will induce network chaos for all ips/destinations</td>
      </tr>  
      <tr>
        <td> DESTINATION_HOSTS </td>
        <td> DNS Names/FQDN names of the services, the accessibility to which, is impacted </td>
        <td> if not provided, it will induce network chaos for all ips/destinations or DESTINATION_IPS if already defined</td>
      </tr>      
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr> 
      <tr>
        <td> TC_IMAGE </td>
        <td> Image used for traffic control in linux </td>
        <td> default value is `gaiadocker/iproute2` </td>
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

### Network latency

It defines the network latency(in ms) to be injected in the targeted application. It can be tuned via `NETWORK_LATENCY` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-latency/network-latency.yaml yaml"

```yaml
# it injects network-latency for the egress traffic
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
    - name: pod-network-latency
      spec:
        components:
          env:
            # network latency to be injected
            - name: NETWORK_LATENCY
              value: "2000" #in ms
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Destination IPs and destination hosts

The network faults interrupt traffic for all the IPs/hosts by default. The interruption of specific IPs/Hosts can be tuned via `DESTINATION_IPS` and `DESTINATION_HOSTS` ENV.

- `DESTINATION_IPS`: It contains the IP addresses of the services or pods or the CIDR blocks(range of IPs), the accessibility to which is impacted.
- `DESTINATION_HOSTS`: It contains the DNS Names/FQDN names of the services, the accessibility to which, is impacted.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-latency/destination-ips-and-hosts.yaml yaml"

```yaml
# it injects the chaos for the egress traffic for specific ips/hosts
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
    - name: pod-network-latency
      spec:
        components:
          env:
            # supports comma separated destination ips
            - name: DESTINATION_IPS
              value: "8.8.8.8,192.168.5.6"
            # supports comma separated destination hosts
            - name: DESTINATION_HOSTS
              value: "nginx.default.svc.cluster.local,google.com"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Network interface

The defined name of the ethernet interface, which is considered for shaping traffic. It can be tuned via `NETWORK_INTERFACE` ENV. Its default value is `eth0`.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-latency/network-interface.yaml yaml"

```yaml
# provide the network interface
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
    - name: pod-network-latency
      spec:
        components:
          env:
            # name of the network interface
            - name: NETWORK_INTERFACE
              value: "eth0"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Jitter

It defines the jitter (in ms), a parameter that allows introducing a network delay variation. It can be tuned via `JITTER` ENV. Its default value is `0`.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-latency/network-latency-jitter.yaml yaml"

```yaml
# provide the network latency jitter
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
    - name: pod-network-latency
      spec:
        components:
          env:
            # value of the network latency jitter (in ms)
            - name: JITTER
              value: "200"
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `docker`.
- `SOCKET_PATH`: It contains path of docker socket file by default(`/var/run/docker.sock`). For `containerd`, specify path as `/var/containerd/containerd.sock`. For `crio`, speecify path as `/var/run/crio/crio.sock`.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-latency/container-runtime-and-socket-path.yaml yaml"

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
    - name: pod-network-latency
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
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```