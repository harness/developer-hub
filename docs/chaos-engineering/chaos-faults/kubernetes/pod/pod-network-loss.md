---
id: pod-network-loss
title: Pod Network Loss
---
## Introduction
- It injects packet loss on the specified container by starting a traffic control (tc) process with netem rules to add egress/ingress loss.
- It can test the application's resilience to lossy/flaky network.

:::tip Fault execution flow chart
![Pod Network Loss](./static/images/network-chaos.png)
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
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> NETWORK_INTERFACE </td>
        <td> Name of ethernet interface considered for shaping traffic </td>
        <td> </td>
      </tr>
      <tr>
        <td> TARGET_CONTAINER </td>
        <td> Name of container which is subjected to network loss </td>
        <td> Optional </td>
        <td> Applicable for containerd & CRI-O runtime only. Even with these runtimes, if the value is not provided, it injects chaos on the first container of the pod</td>
      </tr>
      <tr>
        <td> NETWORK_PACKET_LOSS_PERCENTAGE </td>
        <td> The packet loss in percentage </td>
        <td> Optional </td>
        <td> Default to 100 percentage </td>
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
        <td> if not provided, it will induce network chaos for all ips/destinations or <code>DESTINATION_IPS</code> if already defined</td>
      </tr>      
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr> 
    <tr>
        <td> LIB </td>
        <td> The chaos lib used to inject the chaos </td>
        <td> Default value: litmus, supported values: pumba and litmus </td>
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

### Network Packet Loss

It defines the network packet loss percentage to be injected in the targeted application. It can be tuned via `NETWORK_PACKET_LOSS_PERCENTAGE` ENV. 

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-network-loss/network-loss.yaml yaml)
```yaml
# it injects network-loss for the egress traffic
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
  - name: pod-network-loss
    spec:
      components:
        env:
        # network packet loss percentage
        - name: NETWORK_PACKET_LOSS_PERCENTAGE
          value: '100'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```
### Destination IPs And Destination Hosts

The network faults interrupt traffic for all the IPs/hosts by default. The interruption of specific IPs/Hosts can be tuned via `DESTINATION_IPS` and `DESTINATION_HOSTS` ENV.

- `DESTINATION_IPS`: It contains the IP addresses of the services or pods or the CIDR blocks(range of IPs), the accessibility to which is impacted.
- `DESTINATION_HOSTS`: It contains the DNS Names/FQDN names of the services, the accessibility to which, is impacted.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-network-loss/destination-ips-and-hosts.yaml yaml)
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
  - name: pod-network-loss
    spec:
      components:
        env:
        # supports comma separated destination ips
        - name: DESTINATION_IPS
          value: '8.8.8.8,192.168.5.6'
        # supports comma separated destination hosts
        - name: DESTINATION_HOSTS
          value: 'nginx.default.svc.cluster.local,google.com'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Network Interface

The defined name of the ethernet interface, which is considered for shaping traffic. It can be tuned via `NETWORK_INTERFACE` ENV. Its default value is `eth0`.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-network-loss/network-interface.yaml yaml)
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
  - name: pod-network-loss
    spec:
      components:
        env:
        # name of the network interface 
        - name: NETWORK_INTERFACE
          value: 'eth0'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Container Runtime Socket Path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `docker`.
- `SOCKET_PATH`: It contains path of docker socket file by default(`/var/run/docker.sock`). For other runtimes provide the appropriate path.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-network-loss/container-runtime-and-socket-path.yaml yaml)
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
  - name: pod-network-loss
    spec:
      components:
        env:
        # runtime for the container
        # supports docker, containerd, crio
        - name: CONTAINER_RUNTIME
          value: 'docker'
        # path of the socket file
        - name: SOCKET_PATH
          value: '/var/run/docker.sock'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Pumba Chaos Library

It specifies the Pumba chaos library for the chaos injection. It can be tuned via `LIB` ENV. The defaults chaos library is `litmus`.
Provide the traffic control image via `TC_IMAGE` ENV for the Pumba library.

Use the following example to tune this:

[embedmd]:# (./static/manifests/pod-network-loss/pumba-lib.yaml yaml)
```yaml
# use pumba chaoslib for the network chaos
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
  - name: pod-network-loss
    spec:
      components:
        env:
        # name of the chaoslib
        # supports litmus and pumba lib
        - name: LIB
          value: 'pumba'
        # image used for the traffic control in linux
        # applicable for pumba lib only
        - name: TC_IMAGE
          value: 'gaiadocker/iproute2'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```
