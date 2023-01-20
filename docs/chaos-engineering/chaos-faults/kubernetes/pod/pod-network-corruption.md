---
id: pod-network-corruption
title: Pod network corruption
---
Pod network corruption is a Kubernetes pod-level chaos fault that:
- Injects corrupted packets of data into the specified container by starting a traffic control (tc) process with netem rules to add egress packet corruption.
- Tests the application's resilience to lossy (or flaky) network.

:::tip Fault execution flow chart
![Pod Network Corruption](./static/images/network-chaos.png)
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

To execute pod network corruption fault, [setup experiment](provide) and infrastructure.

After successful setup of chaos infrastructure:
* Choose the **pod-network-corruption** fault from the list of Kubernetes faults available;
* Specify parameters for the **Target application**, **Tune fault**, and **Probes**;
    <details>
        <summary>Fault Tunables</summary>
        <h2>Optional Fields</h2>
        <table>
          <tr>
            <th> Variables </th>
            <th> Description </th>
            <th> Notes </th>
          </tr>
          <tr>
            <td> NETWORK_INTERFACE </td>
            <td> Name of ethernet interface considered to shape traffic. </td>
            <td> </td>
          </tr>
          <tr>
            <td> TARGET_CONTAINER </td>
            <td> Name of container subject to network corruption. </td>
            <td> Applicable for containerd & CRI-O runtime only. Even with these runtimes, if the value is not provided, it injects chaos on the first container of the pod </td>
          </tr>
          <tr>
            <td> NETWORK_PACKET_CORRUPTION_PERCENTAGE </td>
            <td> Packet corruption in percentage </td>
            <td> Default (100) </td>
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
/app # ping <destination ip>
```

When chaos starts, trying to access the above specified `destination ip` leads to `bad address`. This is because the destination IP has been impacted and becomes inaccessible during the period of chaos.

## Fault examples

### Common and pod specific tunables
Refer the [common attributes](../../common-tunables-for-all-faults) and [Pod specific tunable](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Network packet corruption

It defines the network packet corruption percentage that is injected in the target application. You can tune it using the `NETWORK_PACKET_CORRUPTION_PERCENTAGE` environment variable. 

Use the following example to tune it:

[embedmd]:# (./static/manifests/pod-network-corruption/network-corruption.yaml yaml)
```yaml
# it injects network-corruption for the egress traffic
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
  - name: pod-network-corruption
    spec:
      components:
        env:
        # network packet corruption percentage
        - name: NETWORK_PACKET_CORRUPTION_PERCENTAGE
          value: '100' #in percentage
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Destination IPs and destination hosts

By default, network faults interrupt traffic for all the IPs (or hosts). You can interrupt specific IPs (or hosts) by tuning `DESTINATION_IPS` and `DESTINATION_HOSTS` environment variables.

- `DESTINATION_IPS`: IP addresses of the services or pods whose accessibility you want to affect. You can also specify a CIDR block.
- `DESTINATION_HOSTS`: DNS names (or FQDN names) of the services whose accessibility you want to affect.

Use the following example to tune it:

[embedmd]:# (./static/manifests/pod-network-corruption/destination-ips-and-hosts.yaml yaml)
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
  - name: pod-network-corruption
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

### Network interface

The name of the ethernet interface considered to shape the traffic. You can tune it using the `NETWORK_INTERFACE` environment variable. Its default value is `eth0`.

Use the following example to tune it:

[embedmd]:# (./static/manifests/pod-network-corruption/network-interface.yaml yaml)
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
  - name: pod-network-corruption
    spec:
      components:
        env:
        # name of the network interface 
        - name: NETWORK_INTERFACE
          value: 'eth0'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` environment variables to set the container runtime and socket file path, respectively.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. It defaults to `docker`.
- `SOCKET_PATH`: It contains the path to the docker socket file. By default, the path is `/var/run/docker.sock`. For containerd, the path is `/var/containerd/containerd.sock`, and for crio, the path is

Use the following example to tune it:

[embedmd]:# (./static/manifests/pod-network-corruption/container-runtime-and-socket-path.yaml yaml)
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
  - name: pod-network-corruption
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

### Pumba chaos library

It specifies the Pumba chaos library for the chaos injection. It can be tuned via `LIB` ENV. The defaults chaos library is `litmus`.
Provide the traffic control image via `TC_IMAGE` ENV for the pumba library.

Use the following example to tune it:

[embedmd]:# (./static/manifests/pod-network-corruption/pumba-lib.yaml yaml)
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
  - name: pod-network-corruption
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
