---
id: linux-network-corruption
title: Linux network corruption
---
Linux network corruption injects chaos to disrupt network connectivity on a Linux machine by corrupting the network requests.

## Use cases
- Induces network corruption on the target Linux machines.
- Simulates network corruption by corrupting requests of the machine.

:::note
- This fault is compatible with Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in active state and the infrastructure should be in `CONNECTED` state.
:::

## Fault tunables
<h3>Mandatory fields</h3>
<table>
  <tr>
    <th> Variables </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> networkInterface </td>
    <td> The network interface to target. </td>
    <td> For example: <code>eth0</code> </td>
  </tr>
</table>
<h3>Optional fields</h3>
<table>
  <tr>
    <th> Variables </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> destinationHosts </td>
    <td> List of the target host names or keywords. For example. <code>["google.com","litmuschaos.io"]</code> </td>
    <td> If neither <code>destinationHosts</code> nor <code> destinationIPs</code> is provided, all host names/domains are targeted </td>
  </tr>
  <tr>
    <td> destinationIPs </td>
    <td> List of the target IPs. For example: <code>["1.1.1.1","8.8.8.8"]</code> </td>
    <td> If neither <code>destinationHosts</code> nor <code> destinationIPs</code> is provided, all host names/domains are targeted</td>
  </tr>
  <tr>
    <td> packetCorruptionPercentage </td>
    <td> Percentage of packets to corrupt. For example: <code> 50 </code> </td>
    <td> Default: 100% </td>
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

The `destinationHosts` input variable subjects the comma-separated target host names to chaos.

Use the following example to tune the destination hosts:

[embedmd]:# (./static/manifests/linux-network-corruption/destination-hosts.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-corruption
  labels:
    name: network-corruption
spec:
  networkChaos/inputs:
    destinationHosts: '["google.com"]'
    networkInterface: "eth0"
```

### Destination IPs

The `destinationIPs` input variable subjects the comma-separated names of target IPs to chaos.

Use the following example to tune the destination IPs:

[embedmd]:# (./static/manifests/linux-network-corruption/destination-ips.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-corruption
  labels:
    name: network-corruption
spec:
  networkChaos/inputs:
    destinationIPs: '["1.1.1.1"]'
    networkInterface: "eth0"
```

### Packet corruption percentage

The `packetCorruptionPercentage` input variable corrupts a specific percentage of data packets. 

Use the following example to tune the the packet corruption percentage:

[embedmd]:# (./static/manifests/linux-network-corruption/packet-corruption-percentage.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-corruption
  labels:
    name: network-corruption
spec:
  networkChaos/inputs:
    packetCorruptionPercentage: '50'
    networkInterface: "eth0"
```
