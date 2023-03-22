---
id: linux-network-corruption
title: Linux Network Corruption
---
Linux Network Corruption injects chaos to disrupt network connectivity in linux machine

## Use cases

- Induces Network Corruption on the target Linux machines.
- Simulates corruption in network by corrupting the network requests of the machine

:::note

- This fault has been tested for compatibility in Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in an active state and the infrastructure should be in a `CONNECTED` state.
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
        <td> The network interface to target. eg: <code> eth0 </code> </td>
        <td>  </td>
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
        <td> List of the target hostnames or keywords eg. <code>["google.com","litmuschaos.io"]</code> </td>
        <td> If neither <code>destinationHosts</code> and <code> destinationIPs</code> is provided, all hostnames/domains will be targeted </td>
      </tr>
      <tr>
        <td> destinationIPs </td>
        <td> List of the target IPs. eg: <code>["1.1.1.1","8.8.8.8"]</code> </td>
        <td> If neither <code>destinationHosts</code> and <code> destinationIPs</code> is provided, all hostnames/domains will be targeted</td>
      </tr>
      <tr>
        <td> packetCorruptionPercentage </td>
        <td> Percentage of packets to be corrupted. eg: <code> 50 </code> </td>
        <td> Defaults to 100% </td>
      </tr>
      <tr>
        <td> networkInterface </td>
        <td> The network interface to target. eg: <code> eth0 </code> </td>
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


### Destination Hosts

It specifies the comma-separated name of the target hosts subjected to chaos. Tune it by using the `destinationHosts` input.

Use the following example to tune the host names:

[embedmd]:# (./static/manifests/linux-network-corruption/destination-hosts.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-loss
  labels:
    name: network-loss
spec:
  networkChaos/inputs:
    destinationHosts: '["google.com"]'
    networkInterface: "eth0"
```

```yaml
# target host names
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-corruption
  labels:
    name: network-corruption
spec:
  dnsChaos/inputs:
    hostNames: '["litmuschaos.io","google.com"]'
```

### Destination IPs

It specifies the comma-separated name of the target IPs subjected to chaos. Tune it by using the `destinationIPs` input.

Use the following example to tune match scheme:

[embedmd]:# (./static/manifests/linux-network-corruption/destination-ips.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-loss
  labels:
    name: network-loss
spec:
  networkChaos/inputs:
    destinationIPs: '["1.1.1.1"]'
    networkInterface: "eth0"
```

```yaml
# dns query match scheme
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-corruption
  labels:
    name: network-corruption
spec:
  stressChaos/inputs:
    matchScheme: 'exact'
```

### Packet Corruption Percentage

It specifies the percentage of packet corruption. Tune it by using the `packetCorruptionPercentage` input.

Use the following example to tune match scheme:

[embedmd]:# (./static/manifests/linux-network-corruption/packet-corruption-percentage.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-loss
  labels:
    name: network-loss
spec:
  networkChaos/inputs:
    packetCorruptionPercentage: '50'
    networkInterface: "eth0"
```

```yaml
# dns query match scheme
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-corruption
  labels:
    name: network-corruption
spec:
  stressChaos/inputs:
    matchScheme: 'exact'
```
