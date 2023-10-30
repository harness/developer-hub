---
id: linux-network-latency
title: Linux network latency
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'


Linux network latency injects chaos to disrupt network connectivity in linux machine by adding delay to the network requests.

![Linux network latency](./static/images/linux-network-latency.png)

## Use cases
- Induces Network Latency on the target Linux machines.
- Simulates latency in connectivity access by delaying the network requests of the machine.

<Ossupport />

<FaultPermissions />

## Fault tunables
<h3>Mandatory tunables</h3>
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> networkInterfaces </td>
    <td> Network interfaces to target as comma separated values. </td>
    <td> For example: <code>eth0,ens192</code> </td>
  </tr>
</table>
<h3>Optional tunables</h3>
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
    <tr>
    <td> destinationHosts </td>
    <td> List of the target hostnames or keywords. For example: <code>google.com,litmuschaos.io</code> </td>
    <td> If neither <code>destinationHosts</code> and <code> destinationIPs</code> is provided, all hostnames/domains will be targeted </td>
  </tr>
  <tr>
    <td> destinationIPs </td>
    <td> List of the target IPs. For example: <code>1.1.1.1,8.8.8.8</code> </td>
    <td> If neither <code>destinationHosts</code> and <code> destinationIPs</code> is provided, all hostnames/domains will be targeted</td>
  </tr>
  <tr>
    <td> latency </td>
    <td> Amount of latency to added to connection in ms. For example: <code> 2000 </code> </td>
    <td> Defaults to 2000 </td>
  </tr>
  <tr>
    <td> jitter </td>
    <td> Amount of jitter to be added in ms. Jitter will define the max randomised deviation from the provided latency value. For example: <code> 100 </code> </td>
    <td> Defaults to 0 </td>
  </tr>
  <tr>
    <td> sourcePorts </td>
    <td> Source ports to be filtered for chaos. For example: <code> 5000,8080 </code> </td>
    <td> Alternatively, the ports can also be filtered to be exempted from chaos i.e. whitelisted. To specify the exemption, prepend a <code>!</code> before the ports list. For example: <code> !5000,8080 </code> </td>
  </tr>
  <tr>
    <td> destinationPorts </td>
    <td> Destination ports to be filtered for chaos. For example: <code> 5000,8080 </code> </td>
    <td> Alternatively, the ports can also be filtered to be exempted from chaos i.e. whitelisted. To specify the exemption, prepend a <code>!</code> before the ports list. For example: <code> !5000,8080 </code> </td>
  </tr>
  <tr>
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource (in seconds). </td>
    <td> Defaults to 30. </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos (in seconds). </td>
    <td> Defaults to 0. </td>
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

### Source And Destination Ports

By default, the network experiments disrupt traffic for all the source and destination ports. The interruption of specific port(s) can be tuned via `sourcePorts` and `destinationPorts` inputs.

- `sourcePorts`: It contains ports of the target application, the accessibility to which is impacted
- `destinationPorts`: It contains the ports of the destination services or pods or the CIDR blocks(range of IPs), the accessibility to which is impacted

Use the following example to tune this:

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

### Ignore Source and Destination Ports

By default, the network experiments disrupt traffic for all the source and destination ports. The specific ports can be ignored via `sourcePorts` and `destinationPorts` inputs.

- `sourcePorts`: Provide the comma separated source ports preceded by `!`, that you'd like to ignore from the chaos.
- `destinationPorts`: Provide the comma separated destination ports preceded by `!` , that you'd like to ignore from the chaos.

Use the following example to tune this:
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

The `latency` and `jitter` input variables add delay and a small deviation to the delay, respectively, with respect to the connection.

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
