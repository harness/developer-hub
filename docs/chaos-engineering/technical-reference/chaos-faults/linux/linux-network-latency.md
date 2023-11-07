---
id: linux-network-latency
title: Linux network latency
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'


Linux network latency injects chaos to disrupt network connectivity by adding a delay to the network requests on a Linux machine.

![Linux network latency](./static/images/linux-network-latency.png)

## Use cases
Linux network latency:
- Induces network latency on the target Linux machines.
- Simulates a delay in connectivity access by delaying the incoming and outgoing network requests on the machine.

<Ossupport />

<FaultPermissions />

## Fault tunables
<h3>Mandatory fields</h3>
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> networkInterfaces </td>
    <td> Comma-separated values of target network interfaces. </td>
    <td> For example, <code>eth0,ens192</code> </td>
  </tr>
</table>
<h3>Optional fields</h3>
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
    <tr>
    <td> destinationHosts </td>
    <td> List of the target host names or keywords. For example, <code>google.com,litmuschaos.io</code>.</td>
    <td> If neither <code>destinationHosts</code> nor <code> destinationIPs</code> is present, the fault injects chaos for all host names or domains. </td>
  </tr>
  <tr>
    <td> destinationIPs </td>
    <td> List of target IPs. For example, <code>1.1.1.1,8.8.8.8</code>. </td>
    <td> If neither <code>destinationHosts</code> nor <code> destinationIPs</code> is provided, all host names or domains are targeted.</td>
  </tr>
  <tr>
    <td> latency </td>
    <td> Delay added to the connection (in milliseconds). For example, <code> 2000 </code>. </td>
    <td> Default: 2000ms </td>
  </tr>
  <tr>
    <td> jitter </td>
    <td> Amount of jitter to be added (in milliseconds). Jitter defines the maximum randomised deviation from the latency value provided. For example, <code> 100 </code>.</td>
    <td> Default: 0ms </td>
  </tr>
  <tr>
    <td> sourcePorts </td>
    <td> Source ports to be filtered for chaos. For example: <code> 5000,8080 </code> </td>
    <td> Alternatively, the ports can be whitelisted, that is, filtered to be exempt from chaos. Prepend a <code>!</code> to the list of ports to be exempted. For example, <code> !5000,8080 </code>. </td>
  </tr>
  <tr>
    <td> destinationPorts </td>
    <td> Destination ports to be filtered for chaos. For example: <code> 5000,8080 </code> </td>
    <td> Alternatively, the ports can be whitelisted, that is, filtered to be exempt from chaos. Prepend a <code>!</code> to the list of ports to be exempted. For example, <code> !5000,8080 </code>. </td>
  </tr>
  <tr>
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource (in seconds). </td>
    <td> Default: 30s </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos (in seconds). </td>
    <td> Default: 0s </td>
  </tr>
</table>

### Destination hosts

The `destinationHosts` input variable subjects the comma-separated names of the target hosts to chaos.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-network-latency/destination-hosts.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  networkChaos/inputs:
    destinationHosts: 'google.com'
    networkInterfaces: "eth0"
```

### Destination IPs

The `destinationIPs` input variable subjects the comma-separated names of the target IPs to chaos.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-network-latency/destination-ips.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  networkChaos/inputs:
    destinationIPs: '1.1.1.1'
    networkInterfaces: "eth0"
```

### Source and destination ports

By default, the network experiments disrupt traffic for all the source and destination ports. Tune the interruption of specific port(s) using `sourcePorts` and `destinationPorts` inputs, respectively.

- `sourcePorts`: Ports of the target application whose accessibility is impacted.
- `destinationPorts`: Ports of the destination services or pods or the CIDR blocks(range of IPs) whose accessibility is impacted.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-network-latency/source-and-destination-ports.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  networkChaos/inputs:
    destinationIPs: '1.1.1.1'
    networkInterfaces: "eth0"
    sourcePorts: "8080,3000"
    destinationPorts: "5000,3000"
```

### Ignore source and destination ports

By default, the network experiments disrupt traffic for all the source and destination ports. Ignore specific ports using `sourcePorts` and `destinationPorts` inputs, respectively.

- `sourcePorts`: Provide source ports that are not subject to chaos as comma-separated values preceded by `!`.
- `destinationPorts`: Provide destination ports that are not subject to chaos as comma-separated values preceded by `!`.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-network-latency/ignore-source-and-destination-ports.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  networkChaos/inputs:
    destinationIPs: '1.1.1.1'
    networkInterfaces: "eth0"
    sourcePorts: "!8080,3000"
    destinationPorts: "!5000,3000"
```

### Latency and jitter

With respect to the connection, the `latency` and `jitter` input variables add a delay and a small deviation to the delay, respectively.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-network-latency/latency-jitter.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  networkChaos/inputs:
    latency: "1000"
    jitter: "200"
    networkInterfaces: "eth0"
```
