---
id: linux-network-latency
title: Linux network latency
---
Linux Network Latency injects chaos to disrupt network connectivity in linux machine by adding delay to the network requests.

## Use cases

- Induces Network Latency on the target Linux machines.
- Simulates latency in connectivity access by delaying the network requests of the machine

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
        <td> latency </td>
        <td> Amount of latency to added to connection in ms. eg: <code> 2000 </code> </td>
        <td> Defaults to 2000 </td>
      </tr>
      <tr>
        <td> jitter </td>
        <td> Amount of jitter to be added in ms. Jitter will define the max randomised deviation from the provided latency value. eg: <code> 100 </code> </td>
        <td> Defaults to 0 </td>
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
    destinationHosts: '["google.com"]'
    networkInterface: "eth0"
```

```yaml
# target host names
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  dnsChaos/inputs:
    hostNames: '["litmuschaos.io","google.com"]'
```

### Destination IPs

It specifies the comma-separated name of the target IPs subjected to chaos. Tune it by using the `destinationIPs` input.

Use the following example to tune match scheme:

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
    destinationIPs: '["1.1.1.1"]'
    networkInterface: "eth0"
```

```yaml
# dns query match scheme
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-network-latency
  labels:
    name: network-latency
spec:
  stressChaos/inputs:
    matchScheme: 'exact'
```

### Latency and Jitter

It specifies the Latency and Jiiter to be added to the connection. Tune it by using the `latency` and `jitter` input.

Use the following example to tune match scheme:

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
