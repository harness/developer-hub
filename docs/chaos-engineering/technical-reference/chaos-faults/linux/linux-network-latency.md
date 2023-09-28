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
    <td> networkInterface </td>
    <td> The network interface to target. </td>
    <td> For example: <code>eth0</code> </td>
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
    <td> networkInterface </td>
    <td> The network interface to target. For example: <code> eth0 </code> </td>
    <td>  </td>
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
    networkInterface: "eth0"
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
    networkInterface: "eth0"
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
    networkInterface: "eth0"
```
